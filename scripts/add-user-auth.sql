-- Add user_id column to properties table to associate properties with users
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better performance when querying user properties
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);

-- Update existing properties to have a default user_id (optional - you may want to leave them as NULL)
-- UPDATE properties SET user_id = 'some-default-uuid' WHERE user_id IS NULL;
