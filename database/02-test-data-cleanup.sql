-- ============================================================
-- VirtualBNB — Convenzione dati di test + pulizia per il Test P0
-- (isolamento multi-tenant: due account, tre tentativi di lettura incrociata)
-- ============================================================

-- ------------------------------------------------------------
-- CONVENZIONE DA SEGUIRE QUANDO CREI I DATI DI TEST
-- ------------------------------------------------------------
-- Account di test — creali tramite il vero flusso Supabase Auth
-- (signup), non con INSERT diretti in auth.users:
--   p0test-a@virtualbnb-test.internal
--   p0test-b@virtualbnb-test.internal
--
-- Proprietà di test — usa un prefisso riconoscibile nel nome,
-- così la query di pulizia sotto le trova senza ambiguità:
--   "__P0TEST__ Loft Alpha"   (owner: p0test-a)
--   "__P0TEST__ Loft Beta"    (owner: p0test-b)
--
-- Con questa convenzione, qualunque riga di test è identificabile
-- con certezza e non rischi di cancellare dati reali per errore.

-- ------------------------------------------------------------
-- PULIZIA — esegui a test P0 completato, in un unico blocco.
-- Cancella prima le tabelle figlie, poi properties, poi i profili.
-- Nota: la cancellazione degli utenti da auth.users NON è inclusa
-- qui — falla dal Supabase Dashboard > Authentication > Users,
-- così il cascade su sessioni/identità è gestito correttamente
-- dal sistema invece che con una DELETE manuale rischiosa.
-- ------------------------------------------------------------

BEGIN;

DELETE FROM monthly_reports
WHERE property_id IN (
  SELECT id FROM properties WHERE title LIKE '__P0TEST__%'
);

DELETE FROM properties
WHERE title LIKE '__P0TEST__%';

DELETE FROM leads
WHERE email LIKE '%virtualbnb-test.internal%';

-- profiles si ripulisce da sé se elimini gli utenti da auth.users
-- dal Dashboard (trigger esistente auto-crea/elimina il profilo).
-- Se il trigger non copre la DELETE, decommenta la riga sotto:
-- DELETE FROM profiles WHERE id IN (
--   SELECT id FROM auth.users WHERE email LIKE '%virtualbnb-test.internal%'
-- );

COMMIT;

-- ------------------------------------------------------------
-- VERIFICA POST-PULIZIA — deve restituire 0 righe su tutte e tre
-- ------------------------------------------------------------
SELECT 'properties' AS tabella, count(*) FROM properties WHERE title LIKE '__P0TEST__%'
UNION ALL
SELECT 'monthly_reports', count(*) FROM monthly_reports mr
  JOIN properties p ON p.id = mr.property_id WHERE p.title LIKE '__P0TEST__%'
UNION ALL
SELECT 'leads', count(*) FROM leads WHERE email LIKE '%virtualbnb-test.internal%';
