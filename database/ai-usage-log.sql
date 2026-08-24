-- Esegui su Supabase SQL Editor
-- Tabella per tracciare l'utilizzo dell'AI per account

CREATE TABLE IF NOT EXISTS ai_usage_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  endpoint TEXT NOT NULL,              -- 'adminChat' o 'ownerChat'
  input_tokens INTEGER DEFAULT 0,
  cache_read_tokens INTEGER DEFAULT 0,
  cache_write_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE ai_usage_log ENABLE ROW LEVEL SECURITY;

-- Solo admin può leggere i log di utilizzo
CREATE POLICY "Admin legge i log AI" ON ai_usage_log FOR SELECT
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Il backend può inserire (usa service_role, bypassa RLS)
