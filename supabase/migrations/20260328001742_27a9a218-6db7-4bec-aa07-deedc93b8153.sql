-- Public read access for interest (store needs to show counts)
CREATE POLICY "interest_public_read" ON public.aura_interest FOR SELECT TO anon, authenticated USING (true);

-- Public upsert for interest (anyone can register interest)
CREATE POLICY "interest_public_insert" ON public.aura_interest FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "interest_public_update" ON public.aura_interest FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Public read for aura_store_sku (store needs prices)
CREATE POLICY "sku_public_read" ON public.aura_store_sku FOR SELECT TO anon, authenticated USING (true);

-- Admin write policies for aura_store_sku (temporary - should use auth later)
CREATE POLICY "sku_public_write" ON public.aura_store_sku FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "sku_public_update" ON public.aura_store_sku FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "sku_public_delete" ON public.aura_store_sku FOR DELETE TO anon, authenticated USING (true);

-- Stock movements - public read/write (temporary)
CREATE POLICY "movements_public_read" ON public.stock_movements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "movements_public_insert" ON public.stock_movements FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Products and variants - admin write (temporary)
CREATE POLICY "products_admin_insert" ON public.products FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "products_admin_update" ON public.products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_admin_delete" ON public.products FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "variants_admin_insert" ON public.product_variants FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "variants_admin_update" ON public.product_variants FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "variants_admin_delete" ON public.product_variants FOR DELETE TO anon, authenticated USING (true);

-- aura_deleted and aura_custom_products
CREATE POLICY "deleted_public_all" ON public.aura_deleted FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "custom_public_all" ON public.aura_custom_products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);