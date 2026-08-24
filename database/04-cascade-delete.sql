-- ============================================================
-- VirtualBNB — Cascade Delete & Email Backfill
-- ============================================================

-- 1. Risoluzione Errore Cancellazione (Cascade Delete)
-- Rimuoviamo il vecchio vincolo di chiave esterna (se esiste) e lo 
-- ricreiamo dicendo a Postgres di cancellare automaticamente la riga 
-- in 'profiles' se l'utente corrispondente viene eliminato da 'auth.users'.

ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_id_fkey
FOREIGN KEY (id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Facciamo lo stesso per 'properties' e 'monthly_reports' per 
-- garantire che se un proprietario viene eliminato, i suoi 
-- immobili e i suoi report spariscano pulitamente, senza lasciare 
-- dati orfani o generare errori di Foreign Key.

ALTER TABLE public.properties
DROP CONSTRAINT IF EXISTS properties_owner_id_fkey;

ALTER TABLE public.properties
ADD CONSTRAINT properties_owner_id_fkey
FOREIGN KEY (owner_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

ALTER TABLE public.monthly_reports
DROP CONSTRAINT IF EXISTS monthly_reports_property_id_fkey;

ALTER TABLE public.monthly_reports
ADD CONSTRAINT monthly_reports_property_id_fkey
FOREIGN KEY (property_id)
REFERENCES public.properties(id)
ON DELETE CASCADE;


-- ------------------------------------------------------------
-- 2. Backfill Email per i vecchi utenti
-- Il nuovo trigger aggiorna le email solo per i *nuovi* update.
-- Questa query forza il riempimento della colonna email per tutti
-- gli utenti creati in passato che hanno ancora il campo vuoto.
-- ------------------------------------------------------------

UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');
