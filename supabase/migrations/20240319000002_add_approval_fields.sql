-- Add approval fields to visa_experiences table
ALTER TABLE visa_experiences
ADD COLUMN is_approved BOOLEAN DEFAULT false,
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN approved_by UUID REFERENCES admin_users(id);

-- Add approval fields to testimonials table
ALTER TABLE testimonials
ADD COLUMN is_approved BOOLEAN DEFAULT false,
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN approved_by UUID REFERENCES admin_users(id);

-- Create RLS policies for approved content
CREATE POLICY "Anyone can view approved experiences" ON visa_experiences
  FOR SELECT
  USING (is_approved = true AND deleted_at IS NULL);

CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT
  USING (is_approved = true AND deleted_at IS NULL);

-- Create function to approve content
CREATE OR REPLACE FUNCTION approve_content(
  p_table_name TEXT,
  p_content_id UUID,
  p_admin_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  EXECUTE format('
    UPDATE %I 
    SET 
      is_approved = true,
      approved_at = NOW(),
      approved_by = $1
    WHERE id = $2
    RETURNING id', p_table_name)
  USING p_admin_id, p_content_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 