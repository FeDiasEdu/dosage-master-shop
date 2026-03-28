
-- Enable RLS on tables that have policies but RLS disabled
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aura_deleted ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aura_store_sku ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aura_interest ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aura_custom_products ENABLE ROW LEVEL SECURITY;
