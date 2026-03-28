-- Drop view, fix column, recreate view
DROP VIEW IF EXISTS store_catalog;

ALTER TABLE product_variants DROP COLUMN available;
ALTER TABLE product_variants ADD COLUMN available boolean DEFAULT true;

CREATE OR REPLACE VIEW store_catalog WITH (security_invoker = true) AS
SELECT
  p.id,
  p.name,
  p.slug,
  p.category,
  p.guide_key,
  p.active,
  p.scientific_name,
  p.mechanism_of_action,
  p.benefits,
  p.side_effects,
  p.half_life,
  p.basic_protocol,
  p.reconstitution_guide,
  json_agg(
    json_build_object(
      'id', v.id,
      'sku', v.sku,
      'label', v.label,
      'dosage_value', v.dosage_value,
      'dosage_unit', v.dosage_unit,
      'price', v.price,
      'stock_qty', v.stock_qty,
      'available', v.available
    ) ORDER BY v.dosage_value
  ) AS variants
FROM products p
LEFT JOIN product_variants v ON v.product_id = p.id
WHERE p.active = true
GROUP BY p.id;