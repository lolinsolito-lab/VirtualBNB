-- Esegui questo intero script nell'Editor SQL di Supabase

-- 1. Tabella Profili (utenti estesi)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'owner')),
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sicurezza: Abilita RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profili visibili a tutti (per admin)" ON profiles FOR SELECT USING (true);
CREATE POLICY "L'utente può aggiornare il proprio profilo" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Tabella Immobili
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
-- I proprietari vedono solo i propri immobili, l'admin vede tutto
CREATE POLICY "Owner vede i propri immobili" ON properties FOR SELECT 
USING (auth.uid() = owner_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 3. Tabella Rendiconti Mensili
CREATE TABLE monthly_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) NOT NULL,
  month_year TEXT NOT NULL, -- es. '2026-07'
  gross_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  cleaning_fees DECIMAL(10,2) NOT NULL DEFAULT 0,
  virtualbnb_fees DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_payout DECIMAL(10,2) GENERATED ALWAYS AS (gross_revenue - virtualbnb_fees) STORED,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(property_id, month_year)
);

ALTER TABLE monthly_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner vede i propri report" ON monthly_reports FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM properties WHERE id = monthly_reports.property_id AND owner_id = auth.uid()) 
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. Tabella Leads (Per il form di Analisi)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  property_type TEXT,
  sqm INTEGER,
  guests INTEGER,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_analysis', 'contacted', 'rejected', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Solo l'admin può leggere i lead. Chiunque può inserire un lead anonimamente.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin legge i leads" ON leads FOR SELECT 
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Chiunque può inserire leads" ON leads FOR INSERT WITH CHECK (true);

-- 5. Configurazione Storage (Bucket documenti-legali)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documenti-legali', 'documenti-legali', false)
ON CONFLICT (id) DO NOTHING;

-- NOTA: Su Supabase, RLS su storage.objects è abilitato di default e la tabella 
-- è di proprietà del sistema, per cui ALTER TABLE dà errore. Creiamo solo le policy.

CREATE POLICY "Admin legge documenti-legali" ON storage.objects
FOR SELECT USING (bucket_id = 'documenti-legali' AND is_admin());

CREATE POLICY "Admin carica documenti-legali" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documenti-legali' AND is_admin());

CREATE POLICY "Admin aggiorna documenti-legali" ON storage.objects
FOR UPDATE USING (bucket_id = 'documenti-legali' AND is_admin());

CREATE POLICY "Admin elimina documenti-legali" ON storage.objects
FOR DELETE USING (bucket_id = 'documenti-legali' AND is_admin());

-- 6. Tabella Log Invio Documenti
CREATE TABLE document_sends_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destinatario_email TEXT NOT NULL,
  documento_nome TEXT NOT NULL,
  owner_profile_id UUID REFERENCES profiles(id), -- Nullabile, per lead non registrati
  inviato_da UUID REFERENCES profiles(id) NOT NULL,
  resend_message_id TEXT NOT NULL, -- ID univoco di Resend (es. eae07677-...)
  data_invio TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sicurezza: Solo gli admin possono leggere e scrivere il log
ALTER TABLE document_sends_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin legge document_sends_log" ON document_sends_log
FOR SELECT USING (is_admin());

CREATE POLICY "Admin inserisce in document_sends_log" ON document_sends_log
FOR INSERT WITH CHECK (is_admin());
