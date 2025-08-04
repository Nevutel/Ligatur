-- Insert sample agents
INSERT INTO agents (name, email, phone, wallet_address) VALUES
('Sarah Johnson', 'sarah@ligatur.com', '+1 (555) 123-4567', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'),
('Mike Chen', 'mike@ligatur.com', '+1 (555) 234-5678', '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'),
('Emma Rodriguez', 'emma@ligatur.com', '+1 (555) 345-6789', '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');

-- Insert sample properties
INSERT INTO properties (title, description, location, price, currency, type, bedrooms, bathrooms, sqft, year_built, features, images, featured) VALUES
(
    'Modern Downtown Penthouse',
    'Stunning penthouse apartment in the heart of downtown with panoramic city views. This modern unit features high-end finishes, floor-to-ceiling windows, and a private terrace.',
    'New York, NY',
    2.5,
    'BTC',
    'sale',
    3,
    2,
    2400,
    2020,
    ARRAY['Panoramic city views', 'Private terrace', 'High-end appliances', 'Floor-to-ceiling windows', 'Hardwood floors', 'In-unit laundry', 'Concierge service', 'Gym access'],
    ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    TRUE
),
(
    'Luxury Beach Villa',
    'Spectacular oceanfront villa with private beach access. Features include infinity pool, gourmet kitchen, and expansive outdoor living spaces.',
    'Miami, FL',
    0.8,
    'ETH',
    'rent',
    4,
    3,
    3200,
    2019,
    ARRAY['Ocean views', 'Private beach access', 'Infinity pool', 'Gourmet kitchen', 'Outdoor living spaces', 'Smart home technology'],
    ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    FALSE
),
(
    'Tech Hub Apartment',
    'Modern apartment in the heart of Silicon Valley. Perfect for tech professionals with high-speed internet, smart home features, and proximity to major tech companies.',
    'San Francisco, CA',
    1.2,
    'BTC',
    'sale',
    2,
    1,
    1800,
    2021,
    ARRAY['High-speed internet', 'Smart home features', 'Modern appliances', 'Rooftop access', 'Bike storage'],
    ARRAY['/placeholder.svg?height=400&width=600'],
    TRUE
),
(
    'Mountain Retreat Cabin',
    'Cozy cabin nestled in the mountains with stunning views and outdoor activities nearby. Perfect for a peaceful getaway or remote work retreat.',
    'Aspen, CO',
    0.5,
    'ETH',
    'rent',
    3,
    2,
    2000,
    2018,
    ARRAY['Mountain views', 'Fireplace', 'Hot tub', 'Ski access', 'Hiking trails nearby'],
    ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    FALSE
),
(
    'Urban Loft Space',
    'Industrial-style loft in trendy neighborhood. Features exposed brick, high ceilings, and modern amenities in a converted warehouse building.',
    'Chicago, IL',
    1.8,
    'BTC',
    'sale',
    2,
    2,
    1600,
    2017,
    ARRAY['Exposed brick', 'High ceilings', 'Industrial design', 'Modern kitchen', 'Warehouse conversion'],
    ARRAY['/placeholder.svg?height=400&width=600'],
    FALSE
),
(
    'Waterfront Condo',
    'Beautiful waterfront condominium with marina access. Enjoy stunning water views and luxury amenities in this prime location.',
    'Seattle, WA',
    0.6,
    'ETH',
    'rent',
    2,
    1,
    1400,
    2020,
    ARRAY['Water views', 'Marina access', 'Luxury amenities', 'Balcony', 'Concierge service'],
    ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    TRUE
);

-- Link properties to agents
INSERT INTO property_agents (property_id, agent_id) VALUES
(1, 1), -- Sarah handles the penthouse
(2, 2), -- Mike handles the beach villa
(3, 1), -- Sarah handles the tech apartment
(4, 3), -- Emma handles the mountain cabin
(5, 2), -- Mike handles the urban loft
(6, 3); -- Emma handles the waterfront condo
