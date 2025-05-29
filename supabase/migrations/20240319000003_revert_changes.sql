-- Drop the approval function
DROP FUNCTION IF EXISTS approve_content;

-- Drop the RLS policies
DROP POLICY IF EXISTS "Anyone can view approved experiences" ON visa_experiences;
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON testimonials;

-- Remove approval columns from visa_experiences
ALTER TABLE visa_experiences 
DROP COLUMN IF EXISTS is_approved,
DROP COLUMN IF EXISTS approved_at,
DROP COLUMN IF EXISTS approved_by;

-- Remove approval columns from testimonials
ALTER TABLE testimonials
DROP COLUMN IF EXISTS is_approved,
DROP COLUMN IF EXISTS approved_at,
DROP COLUMN IF EXISTS approved_by; 