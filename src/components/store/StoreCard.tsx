import { useState } from "react";
import { type StoreProduct, type StoreVariant, CATEGORY_LABELS } from "@/data/store-products";

interface StoreCardProps {
  name: string;
  product: StoreProduct;
  onAddToCart: (variant: StoreVariant) => void;
}

export default function StoreCard({ name, product, onAddToCart }: StoreCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<StoreVariant | null>(null);
  const active = selectedVariant;

  const hasAvailable = product.variants.some((v) => v.stock > 0 && v.price !== null);

  return (
    <div className="bg-card p-0 relative overflow-hidden group transition-colors hover:bg-background">
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-foreground scale-x-0 origin-left transition-transform group-hover:scale-x-100" />

      {/* Vial SVG */}
      <div className="bg-secondary border-b border-border min-h-[148px] flex items-center justify-center">
        <svg width="48" height="100" viewBox="0 0 48 100" className="text-muted-foreground opacity-30">
          <rect x="16" y="0" width="16" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="21" y="12" width="6" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8" y="28" width="32" height="68" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="34" width="20" height="56" rx="4" fill="currentColor" opacity="0.1" />
        </svg>
      </div>

      {/* Body */}
      <div className="px-4 pt-4 pb-2.5">
        <h3 className="text-xl font-bold text-foreground mb-0.5 tracking-tight">{name}</h3>
        <p className="text-[.68rem] uppercase tracking-[.08em] text-muted-foreground mb-2.5">
          {CATEGORY_LABELS[product.category] || product.category}
        </p>

        {/* Variant pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.variants.map((v) => {
            const outOfStock = v.stock <= 0;
            const isActive = active?.sku === v.sku;
            return (
              <button
                key={v.sku}
                disabled={outOfStock && v.price === null}
                onClick={() => setSelectedVariant(isActive ? null : v)}
                className={`px-2.5 py-1 rounded-full text-[.72rem] font-semibold border transition-all
                  ${isActive
                    ? "bg-foreground text-card border-foreground"
                    : outOfStock
                      ? "border-dashed border-border text-muted-foreground opacity-65 hover:opacity-100 hover:border-warning hover:text-warning"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }
                  ${outOfStock && v.price === null ? "opacity-35 cursor-not-allowed line-through" : "cursor-pointer"}
                `}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border flex items-center justify-between bg-foreground/[0.02] mt-auto">
        <div>
          {active ? (
            active.price !== null ? (
              <>
                <div className="text-lg font-extrabold text-foreground">
                  R$ {active.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[.68rem] text-muted-foreground">{active.label}</div>
              </>
            ) : (
              <div className="text-[.75rem] text-muted-foreground italic">Preço sob consulta</div>
            )
          ) : (
            <div className="text-[.75rem] text-muted-foreground italic">Selecione uma dosagem</div>
          )}
        </div>
        <div className="flex gap-2">
          {active && active.stock <= 0 && (
            <button className="px-2.5 py-1.5 rounded-[10px] bg-transparent border border-border text-muted-foreground text-[.78rem] cursor-pointer font-sans transition-all hover:border-foreground hover:text-foreground">
              🔔 Avisar
            </button>
          )}
          <button
            disabled={!active || active.price === null || active.stock <= 0}
            onClick={() => active && onAddToCart(active)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-foreground text-card border-none text-[.78rem] font-bold cursor-pointer font-sans transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
