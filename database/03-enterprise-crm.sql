-- ============================================================
-- VirtualBNB — Update Schema Enterprise CRM (versione corretta)
-- ============================================================
-- Corregge 2 problemi della versione originale:
-- 1. Il trigger non usa più il nome "on_auth_user_created" (rischio
--    concreto di sovrascrivere silenziosamente il trigger che crea
--    i profili al signup, descritto in supabase-trigger.sql).
-- 2. Aggiunge una restrizione a livello di COLONNA (non solo di riga)
--    così un owner non può, nemmeno con una chiamata diretta alle API
--    Supabase che bypassa la UI, scriversi da solo `role` o `fee_percentage`.

-- ------------------------------------------------------------
-- 1. Nuove colonne — tutte nullable, non rompe onboarding esistente
-- ------------------------------------------------------------
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS ragione_sociale TEXT,
ADD COLUMN IF NOT EXISTS p_iva TEXT,
ADD COLUMN IF NOT EXISTS sdi_pec TEXT,
ADD COLUMN IF NOT EXISTS indirizzo_fatturazione TEXT,
ADD COLUMN IF NOT EXISTS iban TEXT,
ADD COLUMN IF NOT EXISTS fee_percentage NUMERIC,
ADD COLUMN IF NOT EXISTS email TEXT;

-- ------------------------------------------------------------
-- 2. Sincronizzazione email — nome trigger nuovo, non riusato.
--    Non tocca né sostituisce il trigger di creazione profilo
--    esistente (qualunque sia il suo nome reale): si limita ad
--    aggiornare l'email quando cambia, senza mai fare INSERT.
--    Se il profilo non esiste ancora nel millisecondo in cui
--    questo trigger scatta, l'UPDATE non fa nulla silenziosamente
--    (nessun errore) — l'email verrà comunque sincronizzata al
--    primo evento successivo su auth.users (es. login).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_email_sync()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles SET email = NEW.email WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_email_sync ON auth.users;
CREATE TRIGGER on_auth_user_email_sync
  AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_email_sync();

-- ------------------------------------------------------------
-- 3. Policy RLS — invariata nella logica (riga propria),
--    riaffermata per sicurezza.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "L'utente può aggiornare il proprio profilo" ON profiles;
CREATE POLICY "L'utente può aggiornare il proprio profilo"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

-- ------------------------------------------------------------
-- 4. Restrizione a livello di COLONNA — la parte che mancava.
--    RLS controlla QUALI RIGHE, non QUALI COLONNE. Senza questo,
--    un owner autenticato potrebbe, con una chiamata diretta alle
--    API (bypassando la UI React), scriversi da solo `role` o
--    `fee_percentage` sulla propria riga, perché la policy sopra
--    lo permetterebbe. Questo blocco lo impedisce a livello di
--    permessi Postgres, indipendentemente dalla UI.
-- ------------------------------------------------------------
REVOKE UPDATE ON profiles FROM authenticated;
GRANT UPDATE (
  full_name,
  phone,
  ragione_sociale,
  p_iva,
  sdi_pec,
  indirizzo_fatturazione,
  iban
) ON profiles TO authenticated;

-- Nota: `role`, `fee_percentage` ed `email` restano scrivibili
-- SOLO da chi usa la service_role_key (i tuoi endpoint admin) —
-- mai dall'owner stesso, né dalla UI né da una chiamata diretta.

-- ------------------------------------------------------------
-- VERIFICA — esegui subito dopo, controlla l'output con i tuoi occhi
-- ------------------------------------------------------------
-- SELECT grantee, privilege_type, column_name
-- FROM information_schema.column_privileges
-- WHERE table_name = 'profiles' AND grantee = 'authenticated' AND privilege_type = 'UPDATE'
-- ORDER BY column_name;
-- Deve mostrare ESATTAMENTE 7 righe (le colonne elencate nel GRANT sopra).
-- Se vedi "role" o "fee_percentage" nella lista, qualcosa è andato storto.
