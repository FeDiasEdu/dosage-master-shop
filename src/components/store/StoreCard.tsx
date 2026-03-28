import { useState } from "react";
import { type StoreProduct, type StoreVariant, CATEGORY_LABELS, CATEGORY_LED_CLASSES, NO_WATER_PRODUCTS } from "@/data/store-products";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface StoreCardProps {
  name: string;
  product: StoreProduct;
  onAddToCart: (variant: StoreVariant) => void;
  onNotify?: (productName: string, variant: StoreVariant) => void;
  onInfo?: (productName: string) => void;
  isInterested?: (sku: string) => boolean;
}

export default function StoreCard({ name, product, onAddToCart, onNotify, onInfo, isInterested }: StoreCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<StoreVariant | null>(null);
  const active = selectedVariant;
  const showWater = !NO_WATER_PRODUCTS.includes(name);

  const catClass = CATEGORY_LED_CLASSES[product.category] || "bg-muted text-muted-foreground";

  return (
    <div className="bg-card relative group transition-colors hover:bg-background flex flex-col">
      {/* Label-style card */}
      <div className="mx-4 mt-4 mb-3 border-2 border-foreground rounded-sm flex flex-col overflow-hidden flex-1">
        {/* Header band */}
        <div className="border-b-2 border-foreground px-3 py-2.5 flex items-center justify-between gap-2">
          <img src={logoHorizontal} alt="AURA Peptides" className="h-6 dark:invert" />
          <span className={`text-[.6rem] uppercase tracking-[.1em] font-semibold px-2 py-0.5 rounded-sm border ${catClass}`}>
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {/* Product name + RUO */}
        <div className="px-3 py-3 border-b border-foreground/30 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight">{name}</h3>
          <span className="bg-foreground text-card text-[.55rem] font-bold uppercase px-1.5 py-0.5 rounded-[2px] shrink-0">RUO</span>
        </div>

        {/* Variant pills */}
        <div className="px-3 py-2.5 border-b border-foreground/30 flex-1">
          <p className="text-[.6rem] uppercase tracking-[.1em] text-muted-foreground font-semibold mb-1.5">
            Dosagem disponível
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => {
              const outOfStock = v.stock <= 0;
              const isActive = active?.sku === v.sku;
              const interested = isInterested?.(v.sku);
              return (
                <button
                  key={v.sku}
                  onClick={() => setSelectedVariant(isActive ? null : v)}
                  className={`px-2 py-0.5 rounded-sm text-[.7rem] font-semibold border transition-all cursor-pointer
                    ${isActive
                      ? "bg-foreground text-card border-foreground"
                      : outOfStock
                        ? `border-dashed border-foreground/30 text-muted-foreground opacity-65 hover:opacity-100 ${interested ? "ring-1 ring-amber-500/50" : ""}`
                        : "border-foreground/40 text-foreground hover:bg-foreground hover:text-card"
                    }
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
        <div className="border-t-2 border-foreground px-3 py-1.5 text-[.55rem] text-muted-foreground tracking-wide text-center font-medium flex items-center justify-center gap-2">
          {showWater && <span>💧 Acompanha Água Bacteriostática · 3 ml</span>}
          {!showWater && <span>Suprimento · Uso laboratorial</span>}
          <span className="bg-foreground text-card text-[.5rem] font-bold uppercase px-1 py-px rounded-[2px]">RUO</span>
        </div>
      </div>

      {/* Action footer (outside label) */}
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
          {/* Info button */}
          <button
            onClick={() => onInfo?.(name)}
            className="px-2.5 py-1.5 rounded-sm bg-transparent border border-border text-muted-foreground text-[.75rem] cursor-pointer font-sans transition-all hover:border-foreground hover:text-foreground"
          >
            ℹ Info
          </button>

          {active && active.stock <= 0 ? (
            <button
              onClick={() => onNotify?.(name, active)}
              className={`px-2.5 py-1.5 rounded-sm border text-[.75rem] cursor-pointer font-sans font-bold transition-all
                ${isInterested?.(active.sku)
                  ? "bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300"
                  : "bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500"
                }`}
            >
              {isInterested?.(active.sku) ? "✓ Interesse" : "🔔 Tenho Interesse"}
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
