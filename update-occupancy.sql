-- Esegui questo script nell'Editor SQL di Supabase per aggiornare la tabella

ALTER TABLE monthly_reports 
ADD COLUMN occupancy_rate INTEGER NOT NULL DEFAULT 0;

-- Fine dello script
