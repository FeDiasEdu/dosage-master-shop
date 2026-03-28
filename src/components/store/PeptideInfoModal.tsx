import { AnimatePresence, motion } from "framer-motion";
import { useStoreCatalog } from "@/hooks/use-store-catalog";
import { CATEGORY_LABELS, CATEGORY_LED_CLASSES } from "@/data/store-products";
import { PEPTIDE_INFO, SYN_MAP, type PeptideInfo } from "@/data/peptide-guide";

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

function DoseBadge({ level, label }: { level: string; label: string }) {
  const colors: Record<string, string> = {
    iniciante: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
    intermediario: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
    avancado: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-800/40",
  };
  const labels: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };
  return (
    <span className={`text-[.6rem] font-bold uppercase px-2 py-0.5 rounded border ${colors[level] || "bg-muted text-muted-foreground border-border"}`}>
      {labels[level] || label}
    </span>
  );
}

/** Find guide info by product name, modalId, or guide_key */
function findGuide(productName: string, guideKey?: string | null): PeptideInfo | null {
  // Try direct key (modalId from guide cards)
  if (PEPTIDE_INFO[productName]) return PEPTIDE_INFO[productName];
  // Try guide_key from store catalog
  if (guideKey && PEPTIDE_INFO[guideKey]) return PEPTIDE_INFO[guideKey];
  // Try matching by name in SYN_MAP (name → key)
  const keyFromName = SYN_MAP[productName];
  if (keyFromName && PEPTIDE_INFO[keyFromName]) return PEPTIDE_INFO[keyFromName];
  // Try matching by info.name
  for (const [, info] of Object.entries(PEPTIDE_INFO)) {
    if (info.name === productName) return info;
  }
  return null;
}

export default function PeptideInfoModal({ productName, onClose }: PeptideInfoModalProps) {
  const { products } = useStoreCatalog();
  const product = productName ? products[productName] : null;
  const guide = productName ? findGuide(productName, product?.guide_key) : null;

  // Allow opening even without a store product (for guide page)
  const showModal = productName && (product || guide);

  return (
    <AnimatePresence>
      {showModal && (
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
                <h2 className="text-xl font-black tracking-tight text-foreground">{guide?.name || productName}</h2>
                {guide?.sub && (
                  <p className="text-[.75rem] text-muted-foreground mt-1 italic leading-snug max-w-[420px]">{guide.sub}</p>
                )}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {product && (
                    <span className={`text-[.6rem] uppercase tracking-[.08em] font-semibold px-2 py-0.5 rounded-sm border ${CATEGORY_LED_CLASSES[product.category] || "bg-muted text-muted-foreground border-border"}`}>
                      {CATEGORY_LABELS[product.category] || product.category}
                    </span>
                  )}
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
              {/* Quick pills */}
              {guide && (
                <div className="flex flex-wrap gap-2">
                  {guide.dosage && (
                    <div className="border border-border rounded-lg px-3 py-1.5 bg-background">
                      <div className="text-[.55rem] font-bold uppercase tracking-wider text-muted-foreground">💊 Dosagem</div>
                      <div className="text-[.75rem] font-semibold mt-0.5">{guide.dosage}</div>
                    </div>
                  )}
                  {guide.route && (
                    <div className="border border-border rounded-lg px-3 py-1.5 bg-background">
                      <div className="text-[.55rem] font-bold uppercase tracking-wider text-muted-foreground">💉 Via</div>
                      <div className="text-[.75rem] font-semibold mt-0.5">{guide.route}</div>
                    </div>
                  )}
                  {guide.cycle && (
                    <div className="border border-border rounded-lg px-3 py-1.5 bg-background">
                      <div className="text-[.55rem] font-bold uppercase tracking-wider text-muted-foreground">🔄 Ciclo</div>
                      <div className="text-[.75rem] font-semibold mt-0.5">{guide.cycle}</div>
                    </div>
                  )}
                  {guide.storage && (
                    <div className="border border-border rounded-lg px-3 py-1.5 bg-background">
                      <div className="text-[.55rem] font-bold uppercase tracking-wider text-muted-foreground">❄️ Conservação</div>
                      <div className="text-[.75rem] font-semibold mt-0.5">{guide.storage}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {guide?.description && (
                <Section icon="📖" title="Sobre este composto">
                  <p className="text-sm text-foreground leading-relaxed">{guide.description}</p>
                </Section>
              )}

              {/* Mechanism */}
              {guide?.mechanism && (
                <Section icon="⚙" title="Mecanismo de Ação">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.mechanism}</p>
                </Section>
              )}

              {/* Benefits */}
              {guide?.benefits && (
                <Section icon="✦" title="Indicações & Benefícios">
                  {Array.isArray(guide.benefits) ? (
                    <ul className="space-y-1">
                      {guide.benefits.map((b, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{guide.benefits}</p>
                  )}
                </Section>
              )}

              {/* Dosage by Profile */}
              {guide?.dosageLevels && (
                <Section icon="📊" title="Dosagem por Perfil">
                  <div className="space-y-2">
                    {Object.entries(guide.dosageLevels).map(([level, val]) => (
                      <div key={level} className="flex items-center gap-3 bg-background border border-border rounded-lg px-3 py-2">
                        <DoseBadge level={level} label={level} />
                        <span className="text-sm text-foreground font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Protocol / Notes */}
              {guide?.notes && (
                <Section icon="📋" title="Protocolo & Notas Clínicas">
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.notes}</p>
                </Section>
              )}

              {/* Synergies */}
              {guide?.synergies && guide.synergies.length > 0 && (
                <Section icon="🔗" title="Sinergias & Stacks">
                  <div className="flex flex-wrap gap-1.5">
                    {guide.synergies.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-foreground text-[.72rem] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Side Effects */}
              {guide?.sideEffects && (
                <div className="border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-4 py-3">
                  <p className="text-[.7rem] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">⚠ Efeitos adversos / atenção</p>
                  <p className="text-sm text-amber-900 dark:text-amber-300/80 leading-relaxed">{guide.sideEffects}</p>
                </div>
              )}

              {/* Variants (from store) */}
              {product && product.variants.length > 0 && (
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
              )}

              {/* No guide data fallback */}
              {!guide && (
                <div className="border border-border rounded-lg p-4 bg-background">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As informações completas sobre este peptídeo estão sendo adicionadas ao guia.
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
