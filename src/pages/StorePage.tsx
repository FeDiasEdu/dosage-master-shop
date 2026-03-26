import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_PRODUCTS, CATEGORY_LABELS, CATEGORY_ICONS, type StoreVariant } from "@/data/store-products";
import { useCartStore } from "@/stores/cart-store";
import StoreCard from "@/components/store/StoreCard";
import CartDrawer from "@/components/store/CartDrawer";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const cartStore = useCartStore();

  const categories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(STORE_PRODUCTS).forEach((p) => cats.add(p.category));
    return ["all", ...Array.from(cats).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return Object.entries(STORE_PRODUCTS)
      .filter(([name, product]) => {
        const catMatch = activeCategory === "all" || product.category === activeCategory;
        const searchMatch = !q || name.toLowerCase().includes(q) ||
          product.variants.some((v) => v.label.toLowerCase().includes(q) || v.sku.toLowerCase().includes(q));
        return catMatch && searchMatch;
      })
      .sort(([a], [b]) => a.localeCompare(b));
  }, [activeCategory, searchQuery]);

  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (productName: string, variant: StoreVariant) => {
    if (variant.price === null || variant.stock <= 0) return;
    cartStore.addItem({
      productName,
      sku: variant.sku,
      label: variant.label,
      price: variant.price,
    });
  };

  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-10">
        <div className="inline-flex flex-col gap-1.5 mb-7">
          {[
            { id: "guia", icon: "◈", label: "Guia de Peptídeos", active: false },
            { id: "calc", icon: "⊙", label: "Calculadora", active: false },
            { id: "store", icon: "🛒", label: "Loja", active: true },
          ].map((tab) => (
            <span
              key={tab.id}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-[10px] border text-xs font-semibold transition-all cursor-default
                ${tab.active
                  ? "bg-foreground border-foreground text-card"
                  : "bg-transparent border-border text-muted-foreground"
                }`}
            >
              <span className="text-[13px]">{tab.icon}</span>
              {tab.label}
            </span>
          ))}
        </div>

        <p className="font-mono text-[10.5px] font-semibold tracking-[.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-muted-foreground" />
          Peptídeos — AURA
        </p>
        <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-3.5">
          Loja<br />
          <em className="not-italic text-muted-foreground">Aura</em>
        </h1>
        <p className="max-w-[520px] text-muted-foreground text-[.95rem] leading-[1.75] mb-7">
          Peptídeos liofilizados de alta pureza. Selecione o produto, escolha a dosagem e adicione ao carrinho.
        </p>
        <div className="flex gap-8 flex-wrap pt-6 border-t border-border">
          <div>
            <div className="text-2xl font-extrabold tracking-[-0.04em] leading-none">{filteredProducts.length}</div>
            <div className="text-[10.5px] uppercase tracking-[.1em] text-muted-foreground mt-1">Produtos</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-[-0.04em] leading-none">{cartStore.totalItems()}</div>
            <div className="text-[10.5px] uppercase tracking-[.1em] text-muted-foreground mt-1">No carrinho</div>
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-[91] bg-background border-b border-border backdrop-blur-[18px]">
        <nav className="overflow-x-auto whitespace-nowrap scrollbar-none px-6 border-b border-border/50">
          <div className="inline-flex gap-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.06em] border-b-2 transition-all whitespace-nowrap
                  ${activeCategory === cat
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                  }`}
              >
                <span className="text-[13px] leading-none">{CATEGORY_ICONS[cat] || "📦"}</span>
                {cat === "all" ? "Todos" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </nav>
        <div className="px-6 py-2 flex items-center">
          <div className="relative flex-1 max-w-[400px] mx-auto">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-[13px] pointer-events-none">⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produto…"
              className="w-full bg-card border border-border rounded-lg py-1.5 pl-8 pr-3 text-foreground text-xs outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] font-semibold tracking-[.15em] text-muted-foreground uppercase mt-7 mb-3.5 pb-2.5 border-b border-border">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} disponíve{filteredProducts.length !== 1 ? "is" : "l"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(([name, product]) => (
              <motion.div
                key={name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <StoreCard
                  name={name}
                  product={product}
                  onAddToCart={(variant) => handleAddToCart(name, variant)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            Nenhum produto encontrado.
          </div>
        )}
      </div>

      {/* Cart FAB */}
      {cartStore.totalItems() > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-20 right-6 z-[400] bg-foreground text-card border-none rounded-full px-4 py-2.5 text-sm font-bold cursor-pointer shadow-lg flex items-center gap-1.5 font-sans transition-transform hover:-translate-y-0.5"
        >
          🛒 <span>{cartStore.totalItems()}</span>
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
