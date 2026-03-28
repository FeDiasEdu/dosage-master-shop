import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { StoreProduct, StoreProductMap, StoreVariant } from "@/data/store-products";

interface CatalogRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  guide_key: string | null;
  active: boolean;
  variants: Array<{
    id: string;
    sku: string;
    label: string;
    dosage_value: number;
    dosage_unit: string;
    price: number | null;
    stock_qty: number;
    available: boolean | null;
  }>;
}

export function useStoreCatalog() {
  const [products, setProducts] = useState<StoreProductMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCatalog = async () => {
    try {
      const { data, error: err } = await supabase
        .from("store_catalog")
        .select("*");

      if (err) throw err;

      const map: StoreProductMap = {};
      for (const row of (data as unknown as CatalogRow[]) || []) {
        if (!row.name || !row.active) continue;
        const variants: StoreVariant[] = (row.variants || [])
          .filter((v) => v.available !== false)
          .map((v) => ({
            id: v.id,
            sku: v.sku,
            label: v.label,
            dosage_value: v.dosage_value,
            dosage_unit: v.dosage_unit,
            price: v.price,
            stock: v.stock_qty ?? 0,
          }));
        if (variants.length === 0) continue;
        map[row.name] = {
          id: row.id,
          slug: row.slug,
          category: row.category,
          guide_key: row.guide_key,
          variants,
        };
      }
      setProducts(map);
      setError(null);
    } catch (e) {
      console.error("Failed to load catalog:", e);
      setError("Erro ao carregar catálogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();

    const channel = supabase
      .channel(`store-catalog-sync`)
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, fetchCatalog)
      .on("postgres_changes", { event: "*", schema: "public", table: "product_variants" }, fetchCatalog)
      .on("postgres_changes", { event: "*", schema: "public", table: "aura_store_sku" }, fetchCatalog)
      .on("postgres_changes", { event: "*", schema: "public", table: "stock_movements" }, fetchCatalog)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading, error, refetch: fetchCatalog };
}
