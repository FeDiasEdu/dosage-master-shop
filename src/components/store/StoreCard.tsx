import { useState } from "react";
import { type StoreProduct, type StoreVariant, CATEGORY_LABELS } from "@/data/store-products";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface StoreCardProps {
  name: string;
  product: StoreProduct;
  onAddToCart: (variant: StoreVariant) => void;
  onNotify?: (productName: string, variant: StoreVariant) => void;
}

export default function StoreCard({ name, product, onAddToCart, onNotify }: StoreCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<StoreVariant | null>(null);
  const active = selectedVariant;

  return (
    <div className="bg-card relative group transition-colors hover:bg-background flex flex-col">
      {/* ── Label-style card ── */}
      <div className="mx-4 mt-4 mb-3 border-2 border-foreground rounded-sm flex flex-col overflow-hidden flex-1">
        {/* Header band */}
        <div className="border-b-2 border-foreground px-3 py-2.5 flex items-baseline justify-between gap-2">
          <img src={logoHorizontal} alt="AURA Peptides" className="h-4.5 dark:invert" />
          <span className="text-[.55rem] uppercase tracking-[.12em] text-muted-foreground font-semibold">
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {/* Product name — main label area */}
        <div className="px-3 py-3 border-b border-foreground/30">
          <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight">{name}</h3>
        </div>

        {/* Variant pills as "Contém" info */}
        <div className="px-3 py-2.5 border-b border-foreground/30 flex-1">
          <p className="text-[.6rem] uppercase tracking-[.1em] text-muted-foreground font-semibold mb-1.5">
            Dosagem disponível
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => {
              const outOfStock = v.stock <= 0;
              const noPrice = v.price === null;
              const isActive = active?.sku === v.sku;
              return (
                <button
                  key={v.sku}
                  disabled={outOfStock && noPrice}
                  onClick={() => setSelectedVariant(isActive ? null : v)}
                  className={`px-2 py-0.5 rounded-sm text-[.7rem] font-semibold border transition-all
                    ${isActive
                      ? "bg-foreground text-card border-foreground"
                      : outOfStock
                        ? "border-dashed border-foreground/30 text-muted-foreground opacity-65 hover:opacity-100"
                        : "border-foreground/40 text-foreground hover:bg-foreground hover:text-card"
                    }
                    ${outOfStock && noPrice ? "opacity-30 cursor-not-allowed line-through" : "cursor-pointer"}
                  `}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom row — pharma style */}
        <div className="grid grid-cols-2 divide-x divide-foreground/30 text-[.6rem] text-muted-foreground">
          <div className="px-3 py-1.5">
            <span className="block font-semibold uppercase tracking-[.08em]">Conservar</span>
            <span>refrigerado (2–8°C)</span>
          </div>
          <div className="px-3 py-1.5">
            <span className="block font-semibold uppercase tracking-[.08em]">Peptídeo</span>
            <span>liofilizado</span>
          </div>
        </div>

        {/* Footer band */}
        <div className="border-t-2 border-foreground px-3 py-1.5 text-[.55rem] text-muted-foreground tracking-wide text-center font-medium">
          💧 Acompanha Água Bacteriostática · 3 ml
        </div>
      </div>

      {/* ── Action footer (outside label) ── */}
      <div className="px-4 py-2.5 border-t border-border flex items-center justify-between bg-foreground/[0.02] mt-auto">
        <div>
          {active ? (
            active.price !== null ? (
              <>
                <div className="text-lg font-extrabold text-foreground">
                  R$ {active.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[.65rem] text-muted-foreground">{active.label}</div>
              </>
            ) : (
              <div className="text-[.72rem] text-muted-foreground italic">Preço sob consulta</div>
            )
          ) : (
            <div className="text-[.72rem] text-muted-foreground italic">Selecione uma dosagem</div>
          )}
        </div>
        <div className="flex gap-2">
          {active && active.stock <= 0 ? (
            <button
              onClick={() => onNotify?.(name, active)}
              className="px-2.5 py-1.5 rounded-sm bg-transparent border border-border text-muted-foreground text-[.75rem] cursor-pointer font-sans transition-all hover:border-foreground hover:text-foreground"
            >
              Tenho Interesse
            </button>
          ) : (
            <button
              disabled={!active || active.price === null}
              onClick={() => active && onAddToCart(active)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-foreground text-card border-none text-[.75rem] font-bold cursor-pointer font-sans transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
