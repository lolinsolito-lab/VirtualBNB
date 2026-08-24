-- ============================================================
-- VirtualBNB — Fix RLS: elimina il buco USING(true) su profiles
-- + unifica il controllo ruolo admin in una funzione condivisa
-- ============================================================
-- Esegui tutto in un unico blocco su Supabase SQL Editor.
-- Se una qualsiasi istruzione fallisce, l'intera transazione
-- viene annullata (BEGIN/COMMIT) — nessuno stato "a metà".

BEGIN;

-- ------------------------------------------------------------
-- 1. Funzione condivisa per il check ruolo admin.
--    SECURITY DEFINER è necessario: senza, una policy su
--    'profiles' che interroga 'profiles' per sapere il ruolo
--    innescherebbe un loop RLS su se stessa.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- ------------------------------------------------------------
-- 2. profiles — elimina "USING (true)", il buco vero.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Profili visibili a tutti (per admin)" ON profiles;

CREATE POLICY "Owner vede solo il proprio profilo, admin vede tutti"
ON profiles FOR SELECT
USING (auth.uid() = id OR is_admin());

-- (invariata, non toccata: policy UPDATE "L'utente può aggiornare il proprio profilo")

-- ------------------------------------------------------------
-- 3. properties — stesso comportamento di prima, via is_admin()
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Owner vede i propri immobili" ON properties;
DROP POLICY IF EXISTS "Admin inserisce immobili" ON properties;

CREATE POLICY "Owner vede i propri immobili"
ON properties FOR SELECT
USING (auth.uid() = owner_id OR is_admin());

CREATE POLICY "Admin inserisce immobili"
ON properties FOR INSERT
WITH CHECK (is_admin());

-- ------------------------------------------------------------
-- 4. monthly_reports — stesso comportamento di prima, via is_admin()
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Owner vede i propri report" ON monthly_reports;
DROP POLICY IF EXISTS "Admin inserisce rendiconti" ON monthly_reports;
DROP POLICY IF EXISTS "Admin aggiorna rendiconti" ON monthly_reports;

CREATE POLICY "Owner vede i propri report"
ON monthly_reports FOR SELECT
USING (
  EXISTS (SELECT 1 FROM properties WHERE id = monthly_reports.property_id AND owner_id = auth.uid())
  OR is_admin()
);

CREATE POLICY "Admin inserisce rendiconti"
ON monthly_reports FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admin aggiorna rendiconti"
ON monthly_reports FOR UPDATE
USING (is_admin());

-- ------------------------------------------------------------
-- 5. leads — invariato l'INSERT pubblico (voluto, form del sito)
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Admin legge i leads" ON leads;
DROP POLICY IF EXISTS "Admin aggiorna leads" ON leads;

CREATE POLICY "Admin legge i leads"
ON leads FOR SELECT
USING (is_admin());

CREATE POLICY "Admin aggiorna leads"
ON leads FOR UPDATE
USING (is_admin());

-- (invariata, non toccata: policy INSERT "Chiunque può inserire leads" WITH CHECK (true))

-- ------------------------------------------------------------
-- 6. ai_usage_log
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Admin legge i log AI" ON ai_usage_log;

CREATE POLICY "Admin legge i log AI"
ON ai_usage_log FOR SELECT
USING (is_admin());

COMMIT;

-- ============================================================
-- VERIFICA — esegui subito dopo, guarda l'output con i tuoi occhi
-- ============================================================
-- Su 'profiles' devono comparire ESATTAMENTE 2 righe:
--   1) la nuova SELECT con is_admin()
--   2) la UPDATE "L'utente può aggiornare il proprio profilo" (invariata)
-- Se ne vedi 3, la vecchia policy bucata non è stata eliminata davvero.

SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('profiles','properties','monthly_reports','leads','ai_usage_log')
ORDER BY tablename, policyname;
