export default function GuidePage() {
  return (
    <div className="min-h-screen pt-14">
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
        <div className="border border-border rounded-xl p-8 bg-card text-center text-muted-foreground">
          <p className="text-sm">O Guia de Peptídeos será migrado na próxima iteração.</p>
          <p className="text-xs mt-2">Incluirá todos os {">"}60 peptídeos com fichas detalhadas, filtros por categoria e busca.</p>
        </div>
      </div>
    </div>
  );
}
