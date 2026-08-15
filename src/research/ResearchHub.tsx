import { useMemo, useState } from "react";
import { Search, BookOpen, FlaskConical, ChevronRight } from "lucide-react";

const candidates = [
  { name: "Selank", priority: "A", role: "Candidato prioritário", evidence: "Estudos humanos específicos de ansiedade", tags: ["GABA", "estresse", "amígdala"] },
  { name: "Oxitocina", priority: "B", role: "Candidato contextual", evidence: "Dados humanos, especialmente contexto social", tags: ["social", "amígdala"] },
  { name: "DSIP", priority: "B/C", role: "Sono / estresse", evidence: "Literatura humana antiga + pré-clínica", tags: ["sono", "estresse"] },
  { name: "Semax", priority: "B/C", role: "Neuroativo complementar", evidence: "Dados humanos + pré-clínicos", tags: ["BDNF", "cognição"] },
  { name: "Neuropeptide Y (NPY)", priority: "B/C", role: "Alvo mecanístico", evidence: "Forte literatura experimental", tags: ["Y1", "estresse"] },
  { name: "Neuropeptide S (NPS)", priority: "C", role: "Alvo mecanístico", evidence: "Predominantemente experimental", tags: ["arousal", "ansiedade"] },
  { name: "Galanina", priority: "C", role: "Alvo mecanístico", evidence: "Predominantemente experimental", tags: ["GalR", "estresse"] },
];

const systems = [
  ["GABA", "Modulação inibitória", "Selank"],
  ["NPY", "Freio da resposta ao estresse", "NPY"],
  ["CRH", "Ativação do eixo de estresse", "CRH/CRF"],
  ["Amígdala", "Processamento de ameaça", "Selank · Oxitocina"],
];

export default function ResearchHub() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => candidates.filter(c =>
    `${c.name} ${c.role} ${c.evidence} ${c.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return (
    <main className="research-hub">
      <section className="research-hero">
        <div className="eyebrow"><FlaskConical size={16} /> RESEARCH HUB</div>
        <h1>Peptídeos, evidência e mecanismos.</h1>
        <p>Uma camada científica sobre o catálogo: comparar candidatos por evidência, mecanismo, aplicabilidade e redundância — sem transformar hipótese em certeza.</p>
        <div className="research-search"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar peptídeo, mecanismo ou sistema..." /></div>
      </section>

      <section className="research-section">
        <div className="section-heading"><div><span className="eyebrow">MÓDULO 01</span><h2>Ansiedade / Estresse</h2></div><span className="status-pill">Em pesquisa</span></div>
        <p className="section-intro">O primeiro módulo organiza candidatos, mecanismos e limitações. A classificação é de interesse científico para o projeto, não uma recomendação terapêutica.</p>

        <div className="candidate-grid">
          {filtered.map(candidate => (
            <article className="candidate-card" key={candidate.name}>
              <div className="card-top"><span className={`priority priority-${candidate.priority[0].toLowerCase()}`}>{candidate.priority}</span><ChevronRight size={18} /></div>
              <h3>{candidate.name}</h3>
              <strong>{candidate.role}</strong>
              <p>{candidate.evidence}</p>
              <div className="tag-row">{candidate.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section mechanism-section">
        <div className="section-heading"><div><span className="eyebrow">MAPA MECANÍSTICO</span><h2>Como estamos pensando</h2></div><BookOpen size={22} /></div>
        <div className="mechanism-grid">{systems.map(([name, desc, relation]) => <div className="mechanism-card" key={name}><span>{name}</span><h3>{desc}</h3><p>{relation}</p></div>)}</div>
      </section>
    </main>
  );
}
