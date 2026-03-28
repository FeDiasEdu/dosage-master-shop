
-- Fix customers RLS: allow authenticated users to INSERT their own profile
CREATE POLICY "customers_insert_own" ON public.customers
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid()::text = id::text);
