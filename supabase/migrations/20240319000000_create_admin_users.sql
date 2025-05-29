-- Create admin users table with secure password hashing
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create secure password hashing function
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create secure password verification function
CREATE OR REPLACE FUNCTION verify_password(email TEXT, password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT password_hash INTO stored_hash
  FROM admin_users
  WHERE admin_users.email = verify_password.email;
  
  RETURN stored_hash IS NOT NULL AND stored_hash = crypt(password, stored_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin authentication function
CREATE OR REPLACE FUNCTION authenticate_admin(admin_email TEXT, admin_password TEXT)
RETURNS TABLE (
  authenticated BOOLEAN,
  admin_id UUID
) AS $$
DECLARE
  v_admin_id UUID;
BEGIN
  IF verify_password(admin_email, admin_password) THEN
    SELECT id INTO v_admin_id
    FROM admin_users
    WHERE email = admin_email;
    
    UPDATE admin_users
    SET last_login = NOW()
    WHERE id = v_admin_id;
    
    RETURN QUERY SELECT TRUE, v_admin_id;
  ELSE
    RETURN QUERY SELECT FALSE, NULL::UUID;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 