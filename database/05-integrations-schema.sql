-- 05-integrations-schema.sql
-- Architettura B2B per integrazioni esterne e Manuale Immobile (Guest Guide)

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS lodgify_property_id TEXT,
ADD COLUMN IF NOT EXISTS pricelabs_connected BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS guest_guide JSONB DEFAULT '{}'::jsonb;

-- Tabella cache per le prenotazioni esterne
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_name TEXT,
  checkin DATE,
  checkout DATE,
  amount NUMERIC,
  source TEXT CHECK (source IN ('airbnb','booking','direct','vrbo')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner vede le prenotazioni dei propri immobili" ON bookings
FOR SELECT USING (
  EXISTS (SELECT 1 FROM properties WHERE id = bookings.property_id AND owner_id = auth.uid())
);
