
-- Fix infinite recursion: create security definer function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = _user_id AND role = 'admin'
  )
$$;

-- Drop the recursive policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.users;

-- Recreate using the safe function
CREATE POLICY "Admins can manage all profiles" ON public.users
    FOR ALL TO authenticated
    USING (public.is_admin(auth.uid()));
