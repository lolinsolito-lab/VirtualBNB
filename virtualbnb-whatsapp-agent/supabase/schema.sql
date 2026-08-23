-- VirtualBNB WhatsApp Agent — Schema Supabase
-- Esegui in Supabase SQL Editor

-- ============================================================
-- PROPERTIES — knowledge base per immobile (flusso ospiti)
-- ============================================================
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,                        -- es. "Loft Bergamo Città Alta"
  address text,
  wifi_name text,
  wifi_password text,
  checkin_instructions text,                 -- come entrare, dove ritirare chiavi/self check-in
  checkin_time text default '15:00',
  checkout_time text default '10:00',
  house_rules text,
  local_tips text,                           -- ristoranti, trasporti, consigli zona
  emergency_contact text,
  reservation_codes text[] default '{}',     -- codici prenotazione validi per matching, popolati manualmente o via futura integrazione booking
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- CONVERSATION_SESSIONS — stato per numero di telefono
-- ============================================================
create table if not exists conversation_sessions (
  phone_number text primary key,
  flow_type text check (flow_type in ('guest', 'lead')) default null,
  property_id uuid references properties(id),
  state jsonb default '{}',                  -- dati raccolti progressivamente (es. qualification lead)
  human_handoff boolean default false,       -- true se l'utente ha chiesto di parlare con una persona
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- LEADS — proprietari interessati, catturati dal flusso host
-- ============================================================
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null,
  property_location text,
  property_type text,                        -- monolocale, bilocale, ecc.
  current_status text,                       -- vuoto, affittato lungo termine, già su Airbnb, ecc.
  timeline text,                             -- quando vuole partire
  notes text,
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed_won', 'closed_lost')),
  notified boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- MESSAGES_LOG — audit/debug (opzionale ma consigliato)
-- ============================================================
create table if not exists messages_log (
  id bigint generated always as identity primary key,
  phone_number text not null,
  direction text check (direction in ('in', 'out')),
  content text,
  created_at timestamptz default now()
);

create index if not exists idx_messages_log_phone on messages_log(phone_number);
create index if not exists idx_sessions_updated on conversation_sessions(updated_at);
