-- Delete orphan products that are duplicates (their SKUs already exist under other product names)
-- Hexarelin Acetate = Hexarelin, Lipo-B = Lipo C, LL-37 = Liraglutide conflict, etc.
DELETE FROM products WHERE name IN (
  'Hexarelin Acetate',
  'Lipo-B', 
  'LL-37',
  'P21 (No Adamantane)',
  'P21 (With Adamax)',
  'Retatrutide + Tirzepatide',
  'Semaglutide + Cagrilintide',
  'TB-500 (Thymosin B4 Acetate)',
  'Thymulin'
) AND id NOT IN (SELECT DISTINCT product_id FROM product_variants)