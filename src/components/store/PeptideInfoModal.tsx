import { AnimatePresence, motion } from "framer-motion";
import { useStoreCatalog } from "@/hooks/use-store-catalog";
import { CATEGORY_LABELS } from "@/data/store-products";

interface PeptideInfoModalProps {
  productName: string | null;
  onClose: () => void;
}

export default function PeptideInfoModal({ productName, onClose }: PeptideInfoModalProps) {
  const { products } = useStoreCatalog();
  const product = productName ? products[productName] : null;

  return (
    <AnimatePresence>
      {productName && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-[2000]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 sm:inset-auto sm:top-[5%] sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-[640px] sm:max-h-[90vh] z-[2001] bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 shrink-0" />
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border shrink-0">
              <div>
                <h2 className="text-xl font-black tracking-tight text-foreground">{productName}</h2>
                <span className="text-[.7rem] text-muted-foreground mt-1 block">
                  {CATEGORY_LABELS[product.category] || product.category} · Peptídeo liofilizado
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer bg-transparent text-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">💉 Categoria</div>
                  <div className="text-sm font-semibold mt-1">{CATEGORY_LABELS[product.category] || product.category}</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">🧬 Forma</div>
                  <div className="text-sm font-semibold mt-1">Liofilizado</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">❄️ Conservação</div>
                  <div className="text-sm font-semibold mt-1">2–8°C</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">💧 Reconstituição</div>
                  <div className="text-sm font-semibold mt-1">Água Bacteriostática</div>
                </div>
              </div>

              <div>
                <h3 className="text-[.65rem] font-bold uppercase tracking-wider text-muted-foreground mb-2 pb-1.5 border-b border-border">
                  📦 Dosagens Disponíveis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <div
                      key={v.sku}
                      className={`border rounded-lg px-3 py-2 text-sm ${
                        v.stock > 0
                          ? "border-border bg-background"
                          : "border-dashed border-border/50 opacity-60"
                      }`}
                    >
                      <span className="font-semibold">{v.label}</span>
                      <span className="text-muted-foreground text-xs ml-2">
                        {v.stock > 0 ? (v.price ? `R$ ${v.price.toFixed(2).replace(".", ",")}` : "Sob consulta") : "Esgotado"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[.65rem] font-bold uppercase tracking-wider text-muted-foreground mb-2 pb-1.5 border-b border-border">
                  📖 Informações de Pesquisa
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As informações completas sobre este peptídeo — incluindo mecanismo de ação, dosagens por perfil,
                  sinergias e protocolos — estão disponíveis no <strong className="text-foreground">Guia de Peptídeos</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  Acesse a aba <strong className="text-foreground">Guia</strong> no menu para consultar a ficha completa.
                </p>
              </div>

              <div className="border-t border-border pt-4 text-[.7rem] text-muted-foreground italic leading-relaxed">
                ⚠ Informação estritamente educativa e científica. Não constitui prescrição ou orientação médica.
                Consulte sempre um profissional de saúde habilitado antes de utilizar qualquer substância.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
