export default function CalcPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-10">
        <p className="font-mono text-[10.5px] font-semibold tracking-[.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-muted-foreground" />
          AURA | Calculadora
        </p>
        <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-3.5">
          Calculadora de<br />
          <em className="not-italic text-muted-foreground">Dosagens</em>
        </h1>
        <p className="max-w-[520px] text-muted-foreground text-[.95rem] leading-[1.75] mb-7">
          Converta mg ou mcg em unidades de insulina. Selecione o produto ou insira manualmente.
        </p>
        <div className="border border-border rounded-xl p-8 bg-card text-center text-muted-foreground">
          <p className="text-sm">A Calculadora será migrada na próxima iteração.</p>
          <p className="text-xs mt-2">Incluirá busca de presets, visualização da seringa e cálculo em tempo real.</p>
        </div>
      </div>
    </div>
  );
}
