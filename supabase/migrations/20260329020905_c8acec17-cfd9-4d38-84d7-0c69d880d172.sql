
-- Drop and re-add order_items to realtime publication with all columns
ALTER PUBLICATION supabase_realtime DROP TABLE order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
