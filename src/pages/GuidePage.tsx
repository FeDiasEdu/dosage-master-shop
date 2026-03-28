import { useState, useMemo } from "react";
import { GUIDE_CARDS, GUIDE_SECTIONS, SECTION_CATEGORY_MAP, type GuideCard } from "@/data/guide-cards";
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_LED_CLASSES } from "@/data/store-products";
import CategoryNav from "@/components/CategoryNav";
import PeptideInfoModal from "@/components/store/PeptideInfoModal";

const GUIDE_CATEGORIES = [
  "all", "recovery", "bulking", "cutting", "glp1", "cognitivo", "sono",
  "imune", "longevidade", "hormonal", "bioreguladores", "blends", "estetica", "suprimentos",
];

function groupCardsBySections(cards: GuideCard[], sections: typeof GUIDE_SECTIONS) {
  const groups: { section: typeof GUIDE_SECTIONS[0]; cards: GuideCard[] }[] = sections.map(s => ({ section: s, cards: [] }));

  for (const card of cards) {
    const cats = card.cats.split(" ");
    let assigned = false;
    for (let i = 0; i < sections.length; i++) {
      const secCat = SECTION_CATEGORY_MAP[sections[i].id];
      if (secCat && cats.includes(secCat)) {
        groups[i].cards.push(card);
        assigned = true;
        break;
      }
    }
    if (!assigned && groups.length > 0) {
      groups[groups.length - 1].cards.push(card);
    }
  }
  return groups.filter(g => g.cards.length > 0);
}

export default function GuidePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProduct, setModalProduct] = useState<string | null>(null);

  const filteredCards = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return GUIDE_CARDS.filter(card => {
      const catMatch = activeCategory === "all" || card.cats.split(" ").includes(activeCategory);
      const searchMatch = !q || card.name.toLowerCase().includes(q) ||
        card.tagline.toLowerCase().includes(q) ||
        card.tags.some(t => t.toLowerCase().includes(q));
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const groupedCards = useMemo(() => {
    if (activeCategory !== "all" || searchQuery) {
      return [{ section: null as typeof GUIDE_SECTIONS[0] | null, cards: filteredCards }];
    }
    return groupCardsBySections(filteredCards, GUIDE_SECTIONS);
  }, [filteredCards, activeCategory, searchQuery]);

  const visibleCount = filteredCards.length;

  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-10">
        <p className="font-mono text-[10.5px] font-semibold tracking-[.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-muted-foreground" />
          AURA | Guia
        </p>
        <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-3.5">
          Guia de<br />
          <em className="not-italic text-muted-foreground">Peptídeos</em>
        </h1>
        <p className="max-w-[520px] text-muted-foreground text-[.95rem] leading-[1.75] mb-7">
          Referência completa sobre peptídeos — mecanismos, dosagens, sinergias e protocolos.
        </p>
        <div className="flex gap-8 flex-wrap pt-6 border-t border-border">
          <div>
            <div className="text-2xl font-extrabold tracking-[-0.04em] leading-none">{visibleCount}</div>
            <div className="text-[10.5px] uppercase tracking-[.1em] text-muted-foreground mt-1">Compostos</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-[-0.04em] leading-none">{GUIDE_SECTIONS.length}</div>
            <div className="text-[10.5px] uppercase tracking-[.1em] text-muted-foreground mt-1">Categorias</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-[1100px] mx-auto px-6 pb-5">
        <div className="bg-secondary border border-border border-l-2 border-l-muted-foreground rounded-r-lg px-3.5 py-2.5 text-[11.5px] text-muted-foreground leading-relaxed">
          ⚠ Conteúdo educativo e científico. Não constitui prescrição ou recomendação médica. Consulte um profissional de saúde.
        </div>
      </div>

      {/* Sticky filter bar — same CategoryNav as Store */}
      <div className="sticky top-14 z-[91] bg-background border-b border-border backdrop-blur-[18px]">
        <CategoryNav categories={GUIDE_CATEGORIES} active={activeCategory} onChange={setActiveCategory} useLedColors />
        <div className="px-6 py-2 flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px] mx-auto">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-[13px] pointer-events-none">⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar peptídeo…"
              className="w-full bg-card border border-border rounded-lg py-1.5 pl-8 pr-3 text-foreground text-xs outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] font-semibold tracking-[.15em] text-muted-foreground uppercase mt-7 mb-3.5 pb-2.5 border-b border-border">
          {visibleCount} composto{visibleCount !== 1 ? "s" : ""} encontrado{visibleCount !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
          {groupedCards.map((group, gi) => (
            <div key={gi} className="contents">
              {group.section && (
                <div className="col-span-full text-[.7rem] font-bold tracking-[.12em] uppercase text-muted-foreground opacity-60 px-5 pt-3 pb-1 border-b border-border/20 bg-card">
                  {group.section.label}
                </div>
              )}
              {group.cards.map((card, ci) => (
                <div
                  key={`${gi}-${ci}`}
                  onClick={() => setModalProduct(card.modalId)}
                  className="bg-card p-5 cursor-pointer transition-colors hover:bg-secondary relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-foreground scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />

                  <div className="flex items-start justify-between mb-2.5">
                    <div className="text-[1.3rem] font-extrabold tracking-[-0.02em] leading-none">{card.name}</div>
                    <div className="flex flex-wrap gap-1 items-end justify-end max-w-[50%]">
                      {card.badges.map((b, bi) => {
                        const catKey = Object.entries(CATEGORY_LABELS).find(([, v]) => v.toLowerCase() === b.toLowerCase())?.[0];
                        const ledClass = catKey && CATEGORY_LED_CLASSES[catKey] ? CATEGORY_LED_CLASSES[catKey] : "bg-secondary text-muted-foreground";
                        return (
                          <span key={bi} className={`font-mono text-[9.5px] font-semibold tracking-[.06em] uppercase px-[7px] py-[2px] rounded-[3px] border ${ledClass}`}>
                            {b}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-[.8rem] text-muted-foreground mb-3 leading-relaxed italic">{card.tagline}</p>

                  <div className="flex flex-wrap gap-[5px] mb-3.5">
                    {card.tags.map((tag, ti) => (
                      <span key={ti} className="text-[10.5px] text-muted-foreground bg-secondary border border-border px-[7px] py-[2px] rounded-[4px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <div className="text-[9.5px] uppercase tracking-[.1em] text-muted-foreground/60">{card.doseLbl}</div>
                      <div className="font-mono text-[12.5px] font-semibold mt-0.5">{card.doseVal}</div>
                    </div>
                    <span className="text-[12px] text-muted-foreground/40 group-hover:text-foreground transition-colors">→</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            Nenhum composto encontrado.
          </div>
        )}
      </div>

      <PeptideInfoModal productName={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  );
}
