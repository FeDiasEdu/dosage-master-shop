
-- Fix remaining permissive RLS policies

-- aura_interest: restrict write to authenticated users only
DROP POLICY IF EXISTS "interest_public_insert" ON public.aura_interest;
DROP POLICY IF EXISTS "interest_public_update" ON public.aura_interest;
DROP POLICY IF EXISTS "interest_public_delete" ON public.aura_interest;

CREATE POLICY "interest_auth_insert" ON public.aura_interest
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "interest_auth_update" ON public.aura_interest
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "interest_auth_delete" ON public.aura_interest
  FOR DELETE TO authenticated USING (true);

-- orders: restrict insert to authenticated users who own the customer_id
DROP POLICY IF EXISTS "orders_insert" ON public.orders;
CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());

-- order_items: restrict insert to authenticated users who own the order
DROP POLICY IF EXISTS "items_insert" ON public.order_items;
CREATE POLICY "items_insert_own" ON public.order_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
  );
