
CREATE OR REPLACE FUNCTION public.enforce_price_on_available()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.available = true AND NEW.price IS NULL THEN
    RAISE EXCEPTION 'Não é possível ativar variante sem preço definido (SKU: %)', NEW.sku;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_price_on_available ON product_variants;
CREATE TRIGGER trg_enforce_price_on_available
  BEFORE INSERT OR UPDATE ON product_variants
  FOR EACH ROW
  EXECUTE FUNCTION enforce_price_on_available();
