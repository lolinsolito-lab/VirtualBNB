-- ============================================================
-- VirtualBNB — Modulo Esperienze (B2C) — versione corretta
-- ============================================================
BEGIN;

CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    price_display TEXT,
    discount_percentage INT,
    voucher_code TEXT,
    contact_link TEXT,
    location_tag TEXT,
    status TEXT DEFAULT 'inactive',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION set_updated_at_experiences()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_experiences ON experiences;
CREATE TRIGGER set_timestamp_experiences
BEFORE UPDATE ON experiences
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_experiences();

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are visible to everyone"
ON experiences FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert experiences"
ON experiences FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update experiences"
ON experiences FOR UPDATE
USING (is_admin());

CREATE POLICY "Only admins can delete experiences"
ON experiences FOR DELETE
USING (is_admin());

COMMIT;
