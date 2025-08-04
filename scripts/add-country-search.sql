-- Add country column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS country VARCHAR(255);

-- Create index for better performance on country searches
CREATE INDEX IF NOT EXISTS idx_properties_country ON properties(country);

-- Update existing properties with country data extracted from location
-- This is a basic update - you may want to manually verify/update these
UPDATE properties 
SET country = CASE 
    WHEN location ILIKE '%New York%' OR location ILIKE '%NY%' OR location ILIKE '%California%' OR location ILIKE '%San Francisco%' OR location ILIKE '%Chicago%' OR location ILIKE '%Seattle%' THEN 'United States'
    WHEN location ILIKE '%Miami%' OR location ILIKE '%FL%' OR location ILIKE '%Florida%' THEN 'United States'
    WHEN location ILIKE '%Aspen%' OR location ILIKE '%CO%' OR location ILIKE '%Colorado%' THEN 'United States'
    WHEN location ILIKE '%IL%' OR location ILIKE '%Illinois%' THEN 'United States'
    WHEN location ILIKE '%WA%' OR location ILIKE '%Washington%' THEN 'United States'
    ELSE 'United States' -- Default for existing data
END
WHERE country IS NULL;
