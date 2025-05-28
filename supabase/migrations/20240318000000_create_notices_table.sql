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
  created_by UUID REFERENCES auth.users(id),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Policy for reading notices (public)
CREATE POLICY "Notices are viewable by everyone" ON notices
  FOR SELECT
  USING (deleted_at IS NULL);

-- Policy for creating notices (admin only)
CREATE POLICY "Only admins can create notices" ON notices
  FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'preshak@springfallus.org'
  ));

-- Policy for updating notices (admin only)
CREATE POLICY "Only admins can update notices" ON notices
  FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'preshak@springfallus.org'
  ));

-- Policy for deleting notices (admin only)
CREATE POLICY "Only admins can delete notices" ON notices
  FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'preshak@springfallus.org'
  )); 