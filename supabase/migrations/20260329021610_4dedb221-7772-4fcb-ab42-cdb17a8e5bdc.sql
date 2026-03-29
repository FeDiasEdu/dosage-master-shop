
CREATE OR REPLACE FUNCTION public.prevent_duplicate_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM orders
    WHERE customer_id = NEW.customer_id
      AND created_at > NOW() - INTERVAL '30 seconds'
      AND status = 'pending'
  ) THEN
    RAISE EXCEPTION 'Pedido duplicado detectado. Aguarde antes de criar outro pedido.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_duplicate_order
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_order();
