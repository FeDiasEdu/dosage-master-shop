import { AnimatePresence, motion } from "framer-motion";
import { useStoreCatalog } from "@/hooks/use-store-catalog";
import { CATEGORY_LABELS, CATEGORY_LED_CLASSES } from "@/data/store-products";
import { PEPTIDE_GUIDE } from "@/data/peptide-guide";

interface PeptideInfoModalProps {
  productName: string | null;
  onClose: () => void;
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[.65rem] font-bold uppercase tracking-wider text-muted-foreground mb-2 pb-1.5 border-b border-border flex items-center gap-1.5">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

export default function PeptideInfoModal({ productName, onClose }: PeptideInfoModalProps) {
  const { products } = useStoreCatalog();
  const product = productName ? products[productName] : null;
  const guide = productName ? PEPTIDE_GUIDE[productName] : null;

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
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {(guide?.categories || [CATEGORY_LABELS[product.category] || product.category]).map((cat) => {
                    const catKey = Object.entries(CATEGORY_LABELS).find(([, v]) => v === cat)?.[0] || product.category;
                    const ledClass = CATEGORY_LED_CLASSES[catKey] || "bg-muted text-muted-foreground";
                    return (
                      <span key={cat} className={`text-[.6rem] uppercase tracking-[.08em] font-semibold px-2 py-0.5 rounded-sm border ${ledClass}`}>
                        {cat}
                      </span>
                    );
                  })}
                  <span className="bg-foreground text-card text-[.5rem] font-bold uppercase px-1.5 py-0.5 rounded-[2px]">RUO</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer bg-transparent text-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Description */}
              {guide?.description && (
                <p className="text-sm text-foreground leading-relaxed font-medium">{guide.description}</p>
              )}

              {/* Tags */}
              {guide?.tags && guide.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[.65rem] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Quick info grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">💉 Categoria</div>
                  <div className="text-sm font-semibold mt-1">{CATEGORY_LABELS[product.category] || product.category}</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">🧬 Forma</div>
                  <div className="text-sm font-semibold mt-1">Liofilizado</div>
                </div>
                {guide?.route && (
                  <div className="border border-border rounded-lg p-3 bg-background">
                    <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">💉 Via</div>
                    <div className="text-sm font-semibold mt-1">{guide.route}</div>
                  </div>
                )}
                {guide?.halfLife && (
                  <div className="border border-border rounded-lg p-3 bg-background">
                    <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">⏱ Meia-vida</div>
                    <div className="text-sm font-semibold mt-1">{guide.halfLife}</div>
                  </div>
                )}
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">❄️ Conservação</div>
                  <div className="text-sm font-semibold mt-1">{guide?.storage || "2–8°C"}</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-background">
                  <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground">💧 Reconstituição</div>
                  <div className="text-sm font-semibold mt-1">{guide?.reconstitution ? "Ver abaixo" : "Água Bacteriostática"}</div>
                </div>
              </div>

              {/* Mechanism */}
              {guide?.mechanism && (
                <Section icon="🔬" title="Mecanismo de Ação">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.mechanism}</p>
                </Section>
              )}

              {/* Benefits */}
              {guide?.benefits && (
                <Section icon="✅" title="Benefícios">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.benefits}</p>
                </Section>
              )}

              {/* Dosage */}
              {guide?.dosage && (
                <Section icon="💊" title="Dosagem">
                  <p className="text-sm text-foreground font-semibold">{guide.dosage}</p>
                </Section>
              )}

              {/* Protocol */}
              {guide?.protocol && (
                <Section icon="📋" title="Protocolo Básico">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.protocol}</p>
                </Section>
              )}

              {/* Reconstitution */}
              {guide?.reconstitution && (
                <Section icon="💧" title="Reconstituição">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.reconstitution}</p>
                </Section>
              )}

              {/* Side Effects */}
              {guide?.sideEffects && (
                <Section icon="⚠️" title="Efeitos Colaterais">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.sideEffects}</p>
                </Section>
              )}

              {/* Synergies */}
              {guide?.synergies && guide.synergies.length > 0 && (
                <Section icon="🔗" title="Sinergias">
                  <div className="flex flex-wrap gap-1.5">
                    {guide.synergies.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-foreground text-[.72rem] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Notes */}
              {guide?.notes && (
                <Section icon="📝" title="Observações">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.notes}</p>
                </Section>
              )}

              {/* Variants */}
              <Section icon="📦" title="Dosagens Disponíveis">
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
              </Section>

              {/* No guide data fallback */}
              {!guide && (
                <div className="border border-border rounded-lg p-4 bg-background">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As informações completas sobre este peptídeo estão sendo adicionadas ao guia.
                    Consulte a aba <strong className="text-foreground">Guia</strong> para mais detalhes.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
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
