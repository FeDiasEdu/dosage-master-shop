import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { CALC_PRESETS, type CalcPreset } from "@/data/calc-presets";

function syringeMaxUI(type: string) {
  if (type === "u100-0_3") return 30;
  if (type === "u100-0_5") return 50;
  return 100;
}

function fmt(n: number, d: number) {
  return n.toFixed(d).replace(".", ",");
}

function roundUI(exact: number, step: number, rule: string) {
  if (step === 0) return exact;
  if (rule === "down") return Math.floor(exact / step) * step;
  return Math.round(exact / step) * step;
}

interface CalcResult {
  uiExact: number;
  mlExact: number;
  uiRounded: number;
  mlRounded: number;
  doseMg: number;
  valid: boolean;
}

export default function CalcPage() {
  const [doseValue, setDoseValue] = useState("0.25");
  const [doseUnit, setDoseUnit] = useState("mg");
  const [vialMg, setVialMg] = useState("10");
  const [dilutionMode, setDilutionMode] = useState("preset");
  const [dilutionPreset, setDilutionPreset] = useState("2");
  const [dilutionCustom, setDilutionCustom] = useState("2.0");
  const [syringeType, setSyringeType] = useState("u100-1");
  const [rounding, setRounding] = useState("2");
  const [tieRule, setTieRule] = useState("up");
  const [presetSearch, setPresetSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dilutionMl = dilutionMode === "custom" ? parseFloat(dilutionCustom) || 0 : parseFloat(dilutionPreset) || 0;
  const maxUI = syringeMaxUI(syringeType);
  const roundStep = parseInt(rounding);

  const result: CalcResult = useMemo(() => {
    const vMg = parseFloat(vialMg) || 0;
    const dVal = parseFloat(doseValue) || 0;
    if (vMg <= 0 || dilutionMl <= 0 || dVal <= 0) {
      return { uiExact: 0, mlExact: 0, uiRounded: 0, mlRounded: 0, doseMg: 0, valid: false };
    }
    const concMgMl = vMg / dilutionMl;
    let doseMg: number, uiExact: number;
    if (doseUnit === "ui") {
      uiExact = dVal;
      doseMg = (uiExact / 100) * concMgMl;
    } else {
      doseMg = doseUnit === "mcg" ? dVal / 1000 : dVal;
      uiExact = (doseMg / concMgMl) * 100;
    }
    const mlExact = doseMg / concMgMl;
    const uiRounded = roundUI(uiExact, roundStep, tieRule);
    const mlRounded = uiRounded / 100;
    return { uiExact, mlExact, uiRounded, mlRounded, doseMg, valid: true };
  }, [doseValue, doseUnit, vialMg, dilutionMl, roundStep, tieRule]);

  const alerts = useMemo(() => {
    if (!result.valid) return [];
    const a: { type: string; msg: string }[] = [];
    if (result.uiRounded > maxUI) a.push({ type: "bad", msg: "⚠ UI calculado excede capacidade da seringa. Use uma maior ou dilua mais." });
    if (result.doseMg > (parseFloat(vialMg) || 0)) a.push({ type: "bad", msg: "⚠ Dose maior que o conteúdo total do vial." });
    if (result.uiRounded > 0 && result.uiRounded <= maxUI) a.push({ type: "good", msg: "✓ Dose dentro da capacidade da seringa." });
    return a;
  }, [result, maxUI, vialMg]);

  const roundingDiff = result.valid && roundStep > 0 ? Math.abs(result.uiRounded - result.uiExact) : 0;

  const filteredPresets = useMemo(() => {
    const q = presetSearch.toLowerCase();
    return q ? CALC_PRESETS.filter(p => p.name.toLowerCase().includes(q)) : CALC_PRESETS;
  }, [presetSearch]);

  const selectPreset = (p: CalcPreset) => {
    setPresetSearch(p.name);
    setVialMg(String(p.vialMg));
    if (p.doseUnit === "ui") {
      setDoseUnit("ui");
      setDoseValue(String(p.defaultDoseMcg));
    } else {
      setDoseUnit(p.doseUnit);
      setDoseValue(p.doseUnit === "mcg" ? String(p.defaultDoseMcg) : String(p.defaultDoseMcg / 1000));
    }
    setShowDropdown(false);
  };

  const reset = () => {
    setDoseValue("0.25"); setDoseUnit("mg"); setVialMg("10");
    setDilutionMode("preset"); setDilutionPreset("2"); setDilutionCustom("2.0");
    setSyringeType("u100-1"); setRounding("2"); setTieRule("up");
    setPresetSearch("");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Syringe SVG
  const syringeRatio = result.valid ? Math.min(Math.max(result.uiRounded / maxUI, 0), 1) : 0;
  const totalH = 258;
  const bottomY = 354;
  const fillH = Math.round(totalH * syringeRatio);
  const fillY = bottomY - fillH;

  // Build tick marks
  const ticks = useMemo(() => {
    let minorStep: number, majorStep: number;
    if (maxUI <= 30) { minorStep = 1; majorStep = 5; }
    else if (maxUI <= 50) { minorStep = 2; majorStep = 10; }
    else { minorStep = 2; majorStep = 10; }
    const result: { y: number; isMajor: boolean; label?: string }[] = [];
    for (let u = minorStep; u <= maxUI + 0.001; u = Math.round((u + minorStep) * 1000) / 1000) {
      const isMaj = Math.round(u * 1000) % Math.round(majorStep * 1000) < 1;
      const y = bottomY - Math.round((u / maxUI) * totalH);
      result.push({ y, isMajor: isMaj, label: isMaj ? (Number.isInteger(u) ? String(u) : u.toFixed(1)) : undefined });
    }
    return result;
  }, [maxUI]);

  const inputClass = "w-full px-3 py-2.5 border border-border rounded-lg bg-card text-foreground text-sm outline-none focus:border-foreground transition-colors font-sans";
  const labelClass = "block text-[11px] text-muted-foreground mb-1 font-medium tracking-wider";
  const secClass = "border border-border rounded-[9px] p-3.5 mb-3 bg-secondary";
  const secTitle = "text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-3";

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
      </div>

      <div className="max-w-[1080px] mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-4">
          {/* Inputs */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-1.5">
              <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Entradas</h2>
            </div>
            <div className="p-5 space-y-0">
              {/* Dose */}
              <div className={secClass}>
                <p className={secTitle}>Dose desejada</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Valor</label>
                    <input type="number" step="0.01" min="0" value={doseValue} onChange={e => setDoseValue(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Unidade</label>
                    <select value={doseUnit} onChange={e => setDoseUnit(e.target.value)} className={inputClass}>
                      <option value="mg">mg</option>
                      <option value="mcg">mcg</option>
                      <option value="ui">UI</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Peptide */}
              <div className={secClass}>
                <p className={secTitle}>Peptídeo</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative" ref={dropdownRef}>
                    <label className={labelClass}>Produto</label>
                    <input type="text" value={presetSearch}
                      onChange={e => { setPresetSearch(e.target.value); setShowDropdown(true); }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="Buscar produto..." autoComplete="off" className={inputClass} />
                    {presetSearch && (
                      <span onClick={() => { setPresetSearch(""); setShowDropdown(false); }}
                        className="absolute right-2.5 top-8 cursor-pointer text-muted-foreground text-lg leading-none select-none">×</span>
                    )}
                    {showDropdown && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-[210px] overflow-y-auto">
                        {filteredPresets.length === 0 ? (
                          <div className="px-3 py-2.5 text-sm text-muted-foreground text-center">Nenhum produto encontrado</div>
                        ) : filteredPresets.slice(0, 50).map((p, i) => (
                          <div key={i} onClick={() => selectPreset(p)}
                            className="px-3 py-2.5 cursor-pointer border-b border-border last:border-none hover:bg-secondary text-[12.5px]">
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-[10.5px] text-muted-foreground mt-0.5">{p.vialMg} mg/vial</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Total no vial (mg)</label>
                    <input type="number" step="0.01" min="0" value={vialMg} onChange={e => setVialMg(e.target.value)} className={inputClass} />
                    <div className="text-[10.5px] text-muted-foreground mt-1 leading-snug">Preenchido ao selecionar produto.</div>
                  </div>
                </div>
              </div>

              {/* Dilution */}
              <div className={secClass}>
                <p className={secTitle}>Diluição</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Modo</label>
                    <select value={dilutionMode} onChange={e => setDilutionMode(e.target.value)} className={inputClass}>
                      <option value="preset">Padrão</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>
                  {dilutionMode === "preset" ? (
                    <div>
                      <label className={labelClass}>Volume (mL)</label>
                      <select value={dilutionPreset} onChange={e => setDilutionPreset(e.target.value)} className={inputClass}>
                        <option value="1">1 mL</option>
                        <option value="2">2 mL</option>
                        <option value="2.5">2,5 mL</option>
                        <option value="3">3 mL</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className={labelClass}>Volume personalizado (mL)</label>
                      <input type="number" step="0.01" min="0" value={dilutionCustom} onChange={e => setDilutionCustom(e.target.value)} className={inputClass} />
                    </div>
                  )}
                </div>
              </div>

              {/* Syringe */}
              <div className={secClass}>
                <p className={secTitle}>Seringa</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Tipo</label>
                    <select value={syringeType} onChange={e => setSyringeType(e.target.value)} className={inputClass}>
                      <option value="u100-1">1,0 mL — 100 UI</option>
                      <option value="u100-0_5">0,5 mL — 50 UI</option>
                      <option value="u100-0_3">0,3 mL — 30 UI</option>
                    </select>
                    <div className="text-[10.5px] text-muted-foreground mt-1">100 UI = 1 mL</div>
                  </div>
                  <div>
                    <label className={labelClass}>Arredondamento</label>
                    <select value={rounding} onChange={e => setRounding(e.target.value)} className={inputClass}>
                      <option value="2">2 UI (recomendado)</option>
                      <option value="1">1 UI</option>
                      <option value="0">Sem arredondamento</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className={labelClass}>Regra de empate</label>
                  <select value={tieRule} onChange={e => setTieRule(e.target.value)} className={`${inputClass} max-w-[200px]`}>
                    <option value="up">Arredondar para cima</option>
                    <option value="down">Arredondar para baixo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="px-4 py-2 rounded-lg bg-foreground text-card border-none text-xs font-semibold cursor-pointer hover:opacity-85">
                  {copied ? "Copiado!" : "Copiar link"}
                </button>
                <button onClick={reset}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground text-xs font-medium cursor-pointer hover:border-foreground">
                  Resetar
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Resultado</h2>
            </div>
            <div className="p-5">
              {/* Hero result */}
              <div className="bg-foreground text-card rounded-xl px-6 py-5 mb-3.5 text-center">
                <div className="text-[9.5px] tracking-wider uppercase opacity-40 font-semibold mb-1.5">Aspire até</div>
                <div className="text-[50px] font-extrabold tracking-[-2px] leading-none font-mono">
                  {result.valid ? `${fmt(result.uiRounded, 0)} UI` : "—"}
                </div>
                <div className="text-[12.5px] opacity-40 mt-2">
                  {result.valid ? `= ${fmt(result.mlRounded, 3)} mL` : "Preencha os campos para calcular"}
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                <div className="border border-border rounded-lg p-3 bg-secondary">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">UI exato</div>
                  <div className="text-xl font-bold mt-1 font-mono tracking-tight">{result.valid ? `${fmt(result.uiExact, 1)} UI` : "—"}</div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5">{result.valid ? `${fmt(result.mlExact, 3)} mL` : ""}</div>
                </div>
                <div className="border border-border rounded-lg p-3 bg-secondary">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">UI arredondado</div>
                  <div className="text-xl font-bold mt-1 font-mono tracking-tight">{result.valid ? `${fmt(result.uiRounded, 0)} UI` : "—"}</div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5">{result.valid ? `${fmt(result.mlRounded, 3)} mL` : ""}</div>
                </div>
              </div>

              {/* Alerts */}
              {alerts.length > 0 && (
                <div className="flex flex-col gap-2 mb-3.5">
                  {alerts.map((a, i) => (
                    <div key={i} className={`border-l-2 px-3 py-2 rounded-r-lg text-[11.5px] leading-relaxed ${
                      a.type === "bad" ? "border-l-destructive bg-destructive/5" :
                      a.type === "good" ? "border-l-green-500 bg-green-500/5" :
                      "border-l-muted-foreground bg-secondary"
                    }`}>{a.msg}</div>
                  ))}
                </div>
              )}

              {/* Syringe visual + Summary */}
              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col items-center">
                  <p className={secTitle}>Visual da seringa</p>
                  <div className="relative inline-block">
                    <svg width="120" height="420" viewBox="0 0 120 420" className="block text-foreground">
                      <rect x="0" y="0" width="120" height="420" fill="transparent" />
                      <rect x="22" y="74" width="76" height="16" rx="8" fill="none" stroke="currentColor" strokeWidth="2.2" opacity=".9" />
                      <rect x="40" y="8" width="40" height="26" rx="6" fill="none" stroke="currentColor" strokeWidth="2" opacity=".9" />
                      <rect x="56" y="34" width="8" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" opacity=".9" />
                      <rect x="28" y="90" width="64" height="270" rx="14" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".9" />
                      <clipPath id="bClip"><rect x="34" y="96" width="52" height="258" rx="10" /></clipPath>
                      <rect x="34" y={fillY} width="52" height={fillH} fill="currentColor" opacity=".35" clipPath="url(#bClip)" />
                      <rect x="44" y="360" width="32" height="14" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" opacity=".9" />
                      <line x1="60" y1="374" x2="60" y2="404" stroke="currentColor" strokeWidth="2.4" opacity=".9" />
                      <polygon points="60,412 52,402 68,402" fill="currentColor" opacity=".9" />
                      {/* Ticks */}
                      {ticks.map((t, i) => (
                        <g key={i}>
                          <line x1={t.isMajor ? 76 : 80} y1={t.y} x2={91} y2={t.y}
                            stroke="currentColor" strokeWidth={t.isMajor ? 1.4 : 0.9} opacity={t.isMajor ? 0.7 : 0.35} />
                          {t.label && (
                            <text x={74} y={t.y + 3} textAnchor="end" fill="currentColor" fontSize="8" opacity="0.65">{t.label}</text>
                          )}
                        </g>
                      ))}
                      {/* Plunger base */}
                      <line x1="28" y1={fillY} x2="92" y2={fillY} stroke="currentColor" strokeWidth="2.6" opacity="1" strokeDasharray="3 2" />
                    </svg>
                    {/* External indicator */}
                    {result.valid && result.uiRounded > 0 && (
                      <div className="absolute" style={{ left: 124, top: fillY, transform: "translateY(-50%)" }}>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-[1.5px] bg-foreground opacity-40" />
                          <div className="bg-foreground text-card rounded-[7px] px-2 py-1 text-center shadow-lg">
                            <div className="text-[12px] font-extrabold font-mono leading-tight">{fmt(result.uiRounded, result.uiRounded % 1 === 0 ? 0 : 1)} UI</div>
                            <div className="text-[9px] font-semibold opacity-65 mt-0.5 font-mono">{fmt(result.mlRounded, 3)} mL</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-[10.5px] text-muted-foreground mt-2 text-center">Leia pela <strong>base do êmbolo</strong></div>
                </div>

                <div className="flex-1 min-w-[160px]">
                  <p className={secTitle}>Resumo</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <SumItem label="Vial" value={result.valid ? `${fmt(parseFloat(vialMg) || 0, 2)} mg` : "—"} />
                    <SumItem label="Diluição" value={result.valid ? `${fmt(dilutionMl, 2)} mL` : "—"} />
                    <SumItem label="Dose" value={result.valid ? (doseUnit === "mcg" ? `${fmt(parseFloat(doseValue) || 0, 1)} mcg` : doseUnit === "ui" ? `${fmt(parseFloat(doseValue) || 0, 0)} UI` : `${fmt(parseFloat(doseValue) || 0, 3)} mg`) : "—"} />
                    <SumItem label="Aspire" value={result.valid ? `${fmt(result.uiRounded, 0)} UI` : "—"} />
                  </div>
                  {roundingDiff > 0 && (
                    <div className="text-[10.5px] text-muted-foreground mt-2">
                      Arredondamento: {fmt(roundingDiff, 1)} UI ({fmt((roundingDiff / result.uiExact) * 100, 1)}%)
                    </div>
                  )}
                  <div className="mt-4 border border-border rounded-lg p-3 bg-secondary text-[11px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">RUO</strong> — Research Use Only. Not for human or veterinary use.<br />
                    Este conversor é educativo e não substitui orientação profissional.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SumItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-lg p-2.5 bg-secondary">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</div>
      <div className="text-sm font-bold mt-1 font-mono tracking-tight">{value}</div>
    </div>
  );
}
