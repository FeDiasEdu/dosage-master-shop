
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'cancelled', 'shipped', 'delivered');

ALTER TABLE public.orders ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN status TYPE public.order_status USING status::public.order_status;
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending'::public.order_status;
