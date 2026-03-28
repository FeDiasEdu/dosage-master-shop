-- Clean all product data for fresh import
DELETE FROM stock_movements;
DELETE FROM order_items;
DELETE FROM product_images;
DELETE FROM product_variants;
DELETE FROM products;
DELETE FROM aura_store_sku;
DELETE FROM aura_custom_products;
DELETE FROM aura_deleted;