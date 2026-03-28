
-- 1. Fix views: set security_invoker = true to prevent security definer view issues
DROP VIEW IF EXISTS public.store_catalog;
CREATE VIEW public.store_catalog WITH (security_invoker = true) AS
SELECT p.id,
    p.name,
    p.slug,
    p.category,
    p.active,
    p.guide_key,
    p.scientific_name,
    p.mechanism_of_action,
    p.benefits,
    p.side_effects,
    p.half_life,
    p.basic_protocol,
    p.reconstitution_guide,
    ( SELECT json_agg(json_build_object(
        'id', v.id,
        'sku', v.sku,
        'label', v.label,
        'dosage_value', v.dosage_value,
        'dosage_unit', v.dosage_unit,
        'price', v.price,
        'stock_qty', v.stock_qty,
        'available', v.available
    )) FROM product_variants v WHERE v.product_id = p.id) AS variants
FROM products p;

DROP VIEW IF EXISTS public.interest_counts;
CREATE VIEW public.interest_counts WITH (security_invoker = true) AS
SELECT sku, count(*) as count
FROM public.user_interests
GROUP BY sku;

-- 2. Fix function search paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, role)
    VALUES (
        NEW.id,
        NEW.email,
        CASE
            WHEN NEW.email = 'fe.dias.edu@gmail.com' THEN 'admin'
            ELSE 'user'
        END
    );
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE product_variants
  SET stock_qty = stock_qty - NEW.quantity
  WHERE id = NEW.variant_id
    AND stock_qty >= NEW.quantity;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Estoque insuficiente para variante %', NEW.variant_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.recalc_order_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE orders
  SET subtotal = (SELECT coalesce(sum(subtotal),0) FROM order_items WHERE order_id = NEW.order_id),
      total    = (SELECT coalesce(sum(subtotal),0) FROM order_items WHERE order_id = NEW.order_id) + shipping
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 3. Revoke is_admin from public, grant only to authenticated
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
