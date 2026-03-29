
-- FASE 1: Restrict RLS on write tables (products, product_variants, aura_store_sku, stock_movements)

-- Add public read for anon on products (active only)
CREATE POLICY "products_anon_read" ON public.products
  FOR SELECT TO anon USING (active = true);

-- Drop overly permissive write policies on products
DROP POLICY IF EXISTS "products_admin_insert" ON public.products;
DROP POLICY IF EXISTS "products_admin_update" ON public.products;
DROP POLICY IF EXISTS "products_admin_delete" ON public.products;

-- Recreate write policies restricted to admin only
CREATE POLICY "products_admin_insert" ON public.products
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "products_admin_update" ON public.products
  FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "products_admin_delete" ON public.products
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Drop overly permissive write policies on product_variants
DROP POLICY IF EXISTS "variants_admin_insert" ON public.product_variants;
DROP POLICY IF EXISTS "variants_admin_update" ON public.product_variants;
DROP POLICY IF EXISTS "variants_admin_delete" ON public.product_variants;

-- Recreate write policies restricted to admin only
CREATE POLICY "variants_admin_insert" ON public.product_variants
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "variants_admin_update" ON public.product_variants
  FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "variants_admin_delete" ON public.product_variants
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Drop overly permissive policies on aura_store_sku
DROP POLICY IF EXISTS "sku_public_write" ON public.aura_store_sku;
DROP POLICY IF EXISTS "sku_public_update" ON public.aura_store_sku;
DROP POLICY IF EXISTS "sku_public_delete" ON public.aura_store_sku;

-- Recreate restricted to admin
CREATE POLICY "sku_admin_write" ON public.aura_store_sku
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "sku_admin_update" ON public.aura_store_sku
  FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "sku_admin_delete" ON public.aura_store_sku
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Drop overly permissive insert on stock_movements  
DROP POLICY IF EXISTS "movements_public_insert" ON public.stock_movements;
CREATE POLICY "movements_admin_insert" ON public.stock_movements
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

-- Drop overly permissive policies on aura_custom_products
DROP POLICY IF EXISTS "custom_public_all" ON public.aura_custom_products;
CREATE POLICY "custom_admin_all" ON public.aura_custom_products
  FOR ALL TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- Drop overly permissive policies on aura_deleted
DROP POLICY IF EXISTS "deleted_public_all" ON public.aura_deleted;
CREATE POLICY "deleted_admin_all" ON public.aura_deleted
  FOR ALL TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- FASE 3: Prevent negative stock via constraint
ALTER TABLE public.product_variants ADD CONSTRAINT stock_qty_non_negative CHECK (stock_qty >= 0);
