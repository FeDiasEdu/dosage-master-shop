
-- Fix variant_id NOT NULL
ALTER TABLE public.order_items ALTER COLUMN variant_id SET NOT NULL;

-- Fix price positive constraint  
ALTER TABLE public.order_items ADD CONSTRAINT order_items_price_positive CHECK (unit_price > 0);

-- Fix subtotal NOT NULL
ALTER TABLE public.order_items ALTER COLUMN subtotal SET NOT NULL;
