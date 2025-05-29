-- Create notices table
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT false,
  is_emergency BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES admin_users(id),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Policy for reading active notices (public)
CREATE POLICY "Active notices are viewable by everyone" ON notices
  FOR SELECT
  USING (is_active = true AND deleted_at IS NULL);

-- Policy for reading all notices (admin only)
CREATE POLICY "Admins can view all notices" ON notices
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_sessions
    WHERE admin_id = notices.created_by
      AND expires_at > NOW()
  ));

-- Policy for creating notices (admin only)
CREATE POLICY "Only admins can create notices" ON notices
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_sessions
    WHERE admin_id = notices.created_by
      AND expires_at > NOW()
  ));

-- Policy for updating notices (admin only)
CREATE POLICY "Only admins can update notices" ON notices
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_sessions
    WHERE admin_id = notices.created_by
      AND expires_at > NOW()
  ));

-- Policy for soft deleting notices (admin only)
CREATE POLICY "Only admins can soft delete notices" ON notices
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_sessions
    WHERE admin_id = notices.created_by
      AND expires_at > NOW()
  ))
  WITH CHECK (deleted_at IS NOT NULL); 