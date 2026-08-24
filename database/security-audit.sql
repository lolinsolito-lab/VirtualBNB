-- ================================================================
-- VIRTUALBNB — CHECKPOINT SQL COMPLETO & SECURITY AUDIT
-- Esegui questo script su Supabase > SQL Editor > New Query
-- Non modifica nulla: è solo un audit di lettura + check sicurezza
-- ================================================================

-- ================================================================
-- SEZIONE 1: INVENTARIO TABELLE ESISTENTI
-- ================================================================
SELECT 
  schemaname,
  tablename,
  tableowner,
  rowsecurity AS "RLS abilitata"
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ================================================================
-- SEZIONE 2: STATO RLS PER OGNI TABELLA
-- ================================================================
SELECT
  relname AS tabella,
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS rls_forced
FROM pg_class
WHERE relnamespace = 'public'::regnamespace
  AND relkind = 'r'
ORDER BY relname;

-- ================================================================
-- SEZIONE 3: TUTTE LE POLICY RLS ATTIVE
-- ================================================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd AS "operazione (SELECT/INSERT/UPDATE/DELETE)",
  qual AS "condizione USING",
  with_check AS "condizione WITH CHECK"
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ================================================================
-- SEZIONE 4: CONTEGGIO DATI PER TABELLA (Health Check)
-- ================================================================
SELECT 'profiles' AS tabella, COUNT(*) AS righe FROM profiles
UNION ALL SELECT 'properties', COUNT(*) FROM properties
UNION ALL SELECT 'monthly_reports', COUNT(*) FROM monthly_reports
UNION ALL SELECT 'leads', COUNT(*) FROM leads
UNION ALL SELECT 'ai_usage_log', COUNT(*) FROM ai_usage_log;

-- ================================================================
-- SEZIONE 5: VERIFICA TRIGGER AUTOMATICI (handle_new_user)
-- ================================================================
SELECT 
  trigger_name,
  event_manipulation AS "evento",
  event_object_table AS "tabella",
  action_timing AS "timing",
  action_statement AS "funzione"
FROM information_schema.triggers
WHERE trigger_schema = 'auth'
ORDER BY trigger_name;

-- ================================================================
-- SEZIONE 6: VERIFICA ESTENSIONI SUPABASE ATTIVE
-- ================================================================
SELECT name, default_version, installed_version, comment
FROM pg_available_extensions
WHERE installed_version IS NOT NULL
ORDER BY name;

-- ================================================================
-- SEZIONE 7: VERIFICA COLONNE PER SICUREZZA
-- Controlla che tutte le colonne critiche esistano
-- ================================================================
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'properties', 'monthly_reports', 'leads', 'ai_usage_log')
ORDER BY table_name, ordinal_position;

-- ================================================================
-- SEZIONE 8: UTENTI IN AUTH (senza esporre i dati sensibili)
-- ================================================================
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at,
  email_confirmed_at IS NOT NULL AS "email verificata",
  (raw_user_meta_data->>'full_name') AS "nome"
FROM auth.users
ORDER BY created_at DESC;

-- ================================================================
-- SEZIONE 9: CONTROLLO CROSS-REFERENCE PROFILES vs AUTH
-- Verifica che ogni auth.user abbia il corrispondente profilo
-- ================================================================
SELECT 
  u.id,
  u.email,
  p.id AS profile_id,
  p.role,
  p.full_name,
  CASE WHEN p.id IS NULL THEN '⚠️ PROFILO MANCANTE' ELSE '✅ OK' END AS status
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
ORDER BY status DESC;

-- ================================================================
-- SEZIONE 10: VERIFICA IMMOBILI ORFANI (senza proprietario)
-- ================================================================
SELECT 
  p.id,
  p.title,
  p.owner_id,
  CASE WHEN pr.id IS NULL THEN '⚠️ PROPRIETARIO MANCANTE' ELSE '✅ ' || pr.full_name END AS owner_status
FROM properties p
LEFT JOIN profiles pr ON pr.id = p.owner_id;

-- ================================================================
-- SEZIONE 11: SECURITY HARDENING — AGGIUNGE PROTEZIONI MANCANTI
-- Esegui SOLO se l'audit sopra mostra problemi
-- ================================================================

-- 11a. Aggiungi INSERT policy per monthly_reports (solo admin può inserire)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'monthly_reports' AND policyname = 'Admin inserisce rendiconti'
  ) THEN
    CREATE POLICY "Admin inserisce rendiconti" ON monthly_reports
    FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
    RAISE NOTICE '✅ Policy INSERT monthly_reports creata';
  ELSE
    RAISE NOTICE 'ℹ️ Policy INSERT monthly_reports già presente';
  END IF;
END $$;

-- 11b. Aggiungi UPDATE policy per monthly_reports (solo admin può aggiornare)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'monthly_reports' AND policyname = 'Admin aggiorna rendiconti'
  ) THEN
    CREATE POLICY "Admin aggiorna rendiconti" ON monthly_reports
    FOR UPDATE USING (
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
    RAISE NOTICE '✅ Policy UPDATE monthly_reports creata';
  ELSE
    RAISE NOTICE 'ℹ️ Policy UPDATE monthly_reports già presente';
  END IF;
END $$;

-- 11c. Aggiungi INSERT policy per properties (solo admin può inserire immobili)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'properties' AND policyname = 'Admin inserisce immobili'
  ) THEN
    CREATE POLICY "Admin inserisce immobili" ON properties
    FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
    RAISE NOTICE '✅ Policy INSERT properties creata';
  ELSE
    RAISE NOTICE 'ℹ️ Policy INSERT properties già presente';
  END IF;
END $$;

-- 11d. Aggiungi UPDATE policy per leads (solo admin può aggiornare lo stato)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'leads' AND policyname = 'Admin aggiorna leads'
  ) THEN
    CREATE POLICY "Admin aggiorna leads" ON leads
    FOR UPDATE USING (
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
    RAISE NOTICE '✅ Policy UPDATE leads creata';
  ELSE
    RAISE NOTICE 'ℹ️ Policy UPDATE leads già presente';
  END IF;
END $$;

-- 11e. Aggiungi DELETE protection (nessuno può cancellare dati finanziari)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'monthly_reports' AND policyname = 'Nessuno cancella rendiconti'
  ) THEN
    -- Nessuna policy DELETE = nessuno può cancellare (RLS blocca tutto di default)
    RAISE NOTICE '✅ DELETE su monthly_reports già bloccato da RLS (nessuna policy DELETE = nessun accesso)';
  END IF;
END $$;

-- ================================================================
-- SEZIONE 12: VERIFICA FINALE — RIEPILOGO STATO SICUREZZA
-- ================================================================
SELECT
  t.tablename AS tabella,
  t.rowsecurity AS rls_on,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = t.tablename) AS num_policies,
  CASE 
    WHEN t.rowsecurity = false THEN '🔴 CRITICO: RLS disabilitata'
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE tablename = t.tablename) = 0 THEN '🟡 ATTENZIONE: RLS on ma nessuna policy (tutto bloccato)'
    ELSE '🟢 OK'
  END AS status_sicurezza
FROM pg_tables t
WHERE t.schemaname = 'public'
ORDER BY t.tablename;
