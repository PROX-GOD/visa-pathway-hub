-- Create admin sessions table
CREATE TABLE admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create session token generation function
CREATE OR REPLACE FUNCTION generate_session_token()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Create session management function
CREATE OR REPLACE FUNCTION create_admin_session(p_admin_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_session_token TEXT;
BEGIN
  -- Generate new session token
  v_session_token := generate_session_token();
  
  -- Delete any existing sessions for this admin
  DELETE FROM admin_sessions WHERE admin_id = p_admin_id;
  
  -- Create new session (valid for 24 hours)
  INSERT INTO admin_sessions (admin_id, session_token, expires_at)
  VALUES (p_admin_id, v_session_token, NOW() + INTERVAL '24 hours');
  
  RETURN v_session_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create session verification function
CREATE OR REPLACE FUNCTION verify_admin_session(p_session_token TEXT)
RETURNS TABLE (
  is_valid BOOLEAN,
  admin_id UUID
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TRUE,
    admin_sessions.admin_id
  FROM admin_sessions
  WHERE session_token = p_session_token
    AND expires_at > NOW()
    AND NOT EXISTS (
      SELECT 1
      FROM admin_sessions
      WHERE session_token = p_session_token
        AND expires_at <= NOW()
    );
    
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, NULL::UUID;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 