-- 06-guest-guide-security.sql
-- Livello di sicurezza 1: RLS per l'UPDATE
-- Livello di sicurezza 2: Trigger Anti-Escalation per proteggere i campi critici

-- 1. Aggiungiamo la policy UPDATE (che prima non esisteva affatto)
DROP POLICY IF EXISTS "Utenti aggiornano immobili" ON properties;
CREATE POLICY "Utenti aggiornano immobili" ON properties
FOR UPDATE USING (
  auth.uid() = owner_id OR is_admin()
);

-- 2. Creiamo il trigger che impedisce agli Owner di toccare campi riservati all'Admin
CREATE OR REPLACE FUNCTION prevent_property_privilege_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- Se l'utente NON è admin (quindi è un owner)
  IF NOT is_admin() THEN
    
    -- Blocco 1: Tentativo di rubare/cambiare proprietario
    IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN
      RAISE EXCEPTION 'P0001: Non autorizzato a modificare il proprietario dell''immobile (owner_id)';
    END IF;

    -- Blocco 2: Tentativo di modificare l'integrazione Lodgify
    IF NEW.lodgify_property_id IS DISTINCT FROM OLD.lodgify_property_id THEN
      RAISE EXCEPTION 'P0001: Non autorizzato a modificare il collegamento Lodgify';
    END IF;

    -- Blocco 3: Tentativo di modificare l'integrazione PriceLabs
    IF NEW.pricelabs_connected IS DISTINCT FROM OLD.pricelabs_connected THEN
      RAISE EXCEPTION 'P0001: Non autorizzato a modificare il collegamento PriceLabs';
    END IF;

    -- Blocco 4: Protezione campi core (l'owner può solo compilare la guest_guide)
    IF NEW.title IS DISTINCT FROM OLD.title OR NEW.address IS DISTINCT FROM OLD.address OR NEW.type IS DISTINCT FROM OLD.type THEN
      RAISE EXCEPTION 'P0001: Non autorizzato a modificare i dati anagrafici dell''immobile. Contatta l''amministrazione.';
    END IF;

  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attacchiamo il trigger alla tabella
DROP TRIGGER IF EXISTS enforce_property_privileges ON properties;
CREATE TRIGGER enforce_property_privileges
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION prevent_property_privilege_escalation();

-- 4. GRANT a livello di colonna: la prima barriera di difesa (Fail-safe)
-- Revoca i permessi generici di UPDATE a tutti gli utenti loggati
REVOKE UPDATE ON properties FROM authenticated;
-- Concede esplicitamente l'UPDATE SOLO sulla colonna guest_guide
GRANT UPDATE (guest_guide) ON properties TO authenticated;
