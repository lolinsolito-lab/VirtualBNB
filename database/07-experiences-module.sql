-- ============================================================
-- VirtualBNB — Modulo Esperienze (B2C)
-- Tabella per le esperienze turistiche con voucher e affiliazione
-- ============================================================
BEGIN;

-- 1. Create the experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    price_display TEXT,       -- e.g. "Da 150€"
    discount_percentage INT,  -- e.g. 10 (optional)
    voucher_code TEXT,        -- e.g. VBNB10 (optional)
    contact_link TEXT,        -- e.g. https://wa.me/39... or provider URL
    location_tag TEXT,        -- e.g. "Milano Centrale" or "Per gli ospiti di Villa Gioia"
    status TEXT DEFAULT 'inactive', -- 'active' or 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Trigger for updated_at
CREATE TRIGGER set_timestamp_experiences
BEFORE UPDATE ON experiences
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- 3. Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Everyone (public guests) can read all experiences
CREATE POLICY "Experiences are visible to everyone" 
ON experiences FOR SELECT 
USING (true);

-- Only admins can insert, update, or delete
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
