-- Esegui questo script nell'Editor SQL di Supabase per automatizzare i profili

-- 1. Crea la funzione che copia i dati dal sistema Auth alla tabella Profiles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, phone)
  VALUES (
    NEW.id, 
    'owner', -- Ruolo di default per i clienti invitati
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Nuovo Proprietario'), 
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Aggancia la funzione all'evento di registrazione (INSERT su auth.users)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
