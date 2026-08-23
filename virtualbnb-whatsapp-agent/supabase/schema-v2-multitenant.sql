-- VirtualBNB / VirtualTwin — Estensione multi-tenant
-- Da eseguire DOPO schema.sql. Aggiunge account_id ovunque serve isolamento,
-- e attiva Row Level Security come seconda linea di difesa oltre al codice.

-- ============================================================
-- ACCOUNTS — un account per ogni property manager cliente di VirtualTwin
-- ============================================================
create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  plan_tier text default 'solopreneur',      -- solopreneur | entrepreneur | conquistatore | imperatore
  owner_email text,
  created_at timestamptz default now()
);

-- ============================================================
-- USERS — chi puo' accedere alla dashboard, e con quale ruolo
-- ============================================================
create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,                  -- FK verso auth.users di Supabase Auth
  account_id uuid references accounts(id),   -- null per gli admin interni
  role text not null check (role in ('admin', 'client')),
  email text,
  created_at timestamptz default now()
);

-- ============================================================
-- Aggiungi lo scoping multi-tenant alle tabelle esistenti
-- ============================================================
alter table properties add column if not exists account_id uuid references accounts(id);
alter table leads add column if not exists account_id uuid references accounts(id);
alter table conversation_sessions add column if not exists account_id uuid references accounts(id);

create index if not exists idx_properties_account on properties(account_id);
create index if not exists idx_leads_account on leads(account_id);

-- ============================================================
-- CONTACT_MEMORY — fatti persistenti per contatto, tra una conversazione e l'altra
-- ============================================================
create table if not exists contact_memory (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id),
  phone_number text not null,
  facts jsonb default '{}',                  -- es. {"preferred_checkin": "late", "lingua": "en"}
  updated_at timestamptz default now(),
  unique(account_id, phone_number)
);

-- ============================================================
-- POLICY per proprieta' — cosa l'agente puo' gestire da solo vs. deve escalare
-- ============================================================
alter table properties add column if not exists auto_topics text[] default
  '{"wifi","checkin","checkout","house_rules","local_tips"}';
alter table properties add column if not exists escalation_topics text[] default
  '{"sconti","contestazioni","danni","richieste_fuori_standard"}';

-- ============================================================
-- ROW LEVEL SECURITY — seconda linea di difesa oltre al codice applicativo.
-- Anche se un bug nell'handler di un tool dimenticasse di filtrare per account_id,
-- Postgres rifiuta comunque la query. Questo e' l'unico punto che rende
-- l'isolamento multi-tenant davvero affidabile.
-- ============================================================
alter table properties enable row level security;
alter table leads enable row level security;
alter table conversation_sessions enable row level security;
alter table contact_memory enable row level security;

-- Un client autenticato vede SOLO le righe del proprio account_id.
-- auth.jwt() ->> 'account_id' presuppone che l'account_id sia stato inserito
-- nei custom claims del JWT al login (vedi report, sezione autenticazione).
create policy client_isolation_properties on properties
  for select using (account_id::text = auth.jwt() ->> 'account_id');

create policy client_isolation_leads on leads
  for select using (account_id::text = auth.jwt() ->> 'account_id');

create policy client_isolation_sessions on conversation_sessions
  for select using (account_id::text = auth.jwt() ->> 'account_id');

create policy client_isolation_memory on contact_memory
  for select using (account_id::text = auth.jwt() ->> 'account_id');

-- Il backend admin usa la service_role key, che bypassa RLS by design —
-- e' l'unico client autorizzato a fare query cross-tenant. Non esporre MAI
-- la service_role key al client agent o al frontend.
