-- Allow admins to SELECT all products (including inactive)
CREATE POLICY "products_admin_read"
ON public.products FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()) OR active = true);

-- Drop the old public read policy that's too restrictive
DROP POLICY IF EXISTS "products_public_read" ON public.products;
