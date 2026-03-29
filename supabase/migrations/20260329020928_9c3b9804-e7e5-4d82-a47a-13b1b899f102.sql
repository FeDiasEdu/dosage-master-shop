
-- Disable all variants that have no price but are marked available
UPDATE product_variants SET available = false WHERE price IS NULL AND available = true;
