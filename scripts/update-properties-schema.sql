-- Add new columns to properties table for contact information and accepted currencies
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS contact_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS preferred_contact VARCHAR(20) DEFAULT 'email',
ADD COLUMN IF NOT EXISTS accepted_currencies TEXT[];

-- Update existing properties to have default accepted currencies
UPDATE properties 
SET accepted_currencies = ARRAY[currency] 
WHERE accepted_currencies IS NULL;
