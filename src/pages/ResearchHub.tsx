import { useEffect, useMemo, useState } from "react";

type Candidate = {
  peptide: string;
  priority: string;
  role: string;
  evidence: string;
  notes: string;
};

type ModuleData = { title: string; status: string; methodology: string; candidates: Candidate[] };

const priorityRank = (p: string) => p.startsWith("A") ? 0 : p.startsWith("B") ? 1 : p === "C" ? 2 : 3;

export default function ResearchHub() {
  const [data, setData] = useState<ModuleData | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Candidate | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/anxiety-module.json`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const candidates = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return [...data.candidates]
      .filter((c) => !q || `${c.peptide} ${c.role} ${c.evidence} ${c.notes}`.toLowerCase().includes(q))
      .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
  }, [data, query]);

  if (!data) return <main className="min-h-screen pt-14 flex items-center justify-center text-muted-foreground">Carregando Research Hub…</main>;

  return (
    <main className="min-h-screen pt-14 pb-20">
      <section className="max-w-[1100px] mx-auto px-6 pt-14 pb-8">
        <p className="font-mono text-[10px] font-semibold tracking-[.2em] uppercase text-muted-foreground mb-4">AURA | Research Hub</p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7">
          <div>
            <h1 className="text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">Pesquisa de<br/><span className="text-muted-foreground">Peptídeos</span></h1>
            <p className="max-w-[650px] text-sm leading-7 text-muted-foreground mt-5">Base estruturada para comparar evidência, mecanismo, aplicabilidade translacional, limitações e redundância. O objetivo é registrar também por que um candidato não foi priorizado.</p>
          </div>
          <div className="shrink-0 rounded-xl border border-border bg-card px-5 py-4 text-xs">
            <div className="font-mono uppercase tracking-wider text-muted-foreground">Módulo ativo</div>
            <div className="font-semibold mt-1">{data.title}</div>
            <div className="mt-2 inline-flex rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-wider">{data.status}</div>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-6">
        <div className="rounded-xl border border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground leading-6">⚠ Conteúdo de pesquisa/educação. A classificação não representa prescrição ou recomendação de tratamento.</div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-5">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar peptídeo, mecanismo ou evidência…" className="flex-1 h-11 rounded-lg border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <div className="text-xs text-muted-foreground whitespace-nowrap">{candidates.length} candidatos</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {candidates.map((c) => (
            <button key={c.peptide} onClick={() => setSelected(c)} className="text-left rounded-xl border border-border bg-card p-5 hover:bg-secondary transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-extrabold tracking-tight">{c.peptide}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.role}</div>
                </div>
                <span className="font-mono text-[10px] font-bold rounded-md border border-border px-2 py-1">{c.priority}</span>
              </div>
              <div className="mt-4 text-xs leading-5 text-muted-foreground"><b className="text-foreground">Evidência:</b> {c.evidence}</div>
              <div className="mt-3 pt-3 border-t border-border text-xs leading-5 text-muted-foreground">{c.notes}</div>
              <div className="mt-4 text-xs font-semibold group-hover:translate-x-1 transition-transform">Ver racional →</div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pt-10">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground mb-2">Metodologia</p>
          <p className="text-sm leading-7 text-muted-foreground">{data.methodology}</p>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[400] bg-black/45 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl p-6 sm:p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-4">
              <div><div className="text-2xl font-extrabold">{selected.peptide}</div><div className="text-xs text-muted-foreground mt-1">{selected.role}</div></div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full border border-border">×</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Info label="Prioridade" value={selected.priority}/>
              <Info label="Evidência" value={selected.evidence}/>
              <Info label="Racional / papel" value={selected.role}/>
              <Info label="Observação" value={selected.notes}/>
            </div>
            <div className="mt-6 text-[11px] text-muted-foreground leading-5 border-t border-border pt-4">Próxima camada do dossiê: mecanismo detalhado, estudos primários, vias de administração estudadas, limitações e análise de redundância.</div>
          </div>
        </div>
      )}
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-secondary/60 p-4"><div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div><div className="text-xs leading-5">{value}</div></div>;
}
