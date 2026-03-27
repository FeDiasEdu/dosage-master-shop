import { useState, useEffect, useMemo, useCallback } from "react";
import { STORE_PRODUCTS, CATEGORY_LABELS, type StoreVariant } from "@/data/store-products";

// ── Types ──
interface SkuData {
  price: number | null;
  stock: number;
  cost_price: number | null;
  stock_min: number;
}

interface Movement {
  sku: string;
  product_name: string;
  variant_label: string;
  mov_type: string;
  direction: number;
  quantity: number;
  balance_after: number;
  unit_cost: number | null;
  notes: string | null;
  created_at: string;
}

const ADMIN_KEY = "aura_store_data";
const ADMIN_PASS_HASH = "6a6ad96e112ba326ab8d8e381f933e192cb27f6695926a52c5a1b41afb714add";
const MOV_TYPES = [
  { id: "entrada", label: "📥 Entrada", dir: 1 },
  { id: "saida", label: "📤 Saída", dir: -1 },
  { id: "ajuste", label: "🔧 Ajuste", dir: -1 },
  { id: "perda", label: "⚠ Perda", dir: -1 },
  { id: "devolucao", label: "↩ Devolução", dir: 1 },
  { id: "pedido_cliente", label: "🛒 Pedido", dir: -1 },
];
const MOV_LABELS: Record<string, string> = {
  entrada: "Entrada", saida: "Saída", ajuste: "Ajuste",
  perda: "Perda", devolucao: "Devolução", pedido_cliente: "Pedido",
};

async function sha256(str: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function loadData(): Record<string, SkuData> {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}"); } catch { return {}; }
}
function saveData(data: Record<string, SkuData>) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}
function loadInterest(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem("aura_interest") || "{}"); } catch { return {}; }
}

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState("");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [movModal, setMovModal] = useState<{ sku: string; pname: string; label: string; type: string } | null>(null);
  const [histOpen, setHistOpen] = useState(false);
  const [selectedSkus, setSelectedSkus] = useState<Set<string>>(new Set());

  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  useEffect(() => {
    if (open && sessionStorage.getItem("aura_admin_auth") === ADMIN_PASS_HASH) {
      setAuthed(true);
    }
  }, [open]);

  const handleLogin = async () => {
    const h = await sha256(passInput);
    if (h === ADMIN_PASS_HASH) {
      sessionStorage.setItem("aura_admin_auth", h);
      setAuthed(true);
      setPassError("");
    } else {
      setPassError("❌ Senha incorreta.");
      setPassInput("");
    }
  };

  // ── KPI data ──
  const kpis = useMemo(() => {
    const saved = loadData();
    const interest = loadInterest();
    let total = 0, ativos = 0, valor = 0, baixo = 0, totalInt = 0;
    for (const p of Object.values(STORE_PRODUCTS)) {
      p.variants.forEach(v => {
        total++;
        if (v.stock > 0) ativos++;
        const d = saved[v.sku] || {} as Partial<SkuData>;
        const cost = d.cost_price ?? 0;
        const stMin = d.stock_min ?? 0;
        valor += (v.stock || 0) * cost;
        if (stMin > 0 && (v.stock || 0) < stMin) baixo++;
        totalInt += (interest[v.sku] || 0);
      });
    }
    return { total, ativos, valor, baixo, totalInt };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // ── Filtered rows ──
  const rows = useMemo(() => {
    const saved = loadData();
    const interest = loadInterest();
    const q = search.toLowerCase();
    const result: Array<{
      pname: string; variant: StoreVariant; cost: number | null;
      stMin: number; margin: number | null; intCount: number; isBaixo: boolean;
    }> = [];

    for (const [pname, p] of Object.entries(STORE_PRODUCTS).sort(([a], [b]) => a.localeCompare(b))) {
      if (catFilter && p.category !== catFilter) continue;
      if (q && !pname.toLowerCase().includes(q)) continue;
      p.variants.forEach(v => {
        const d = saved[v.sku] || {} as Partial<SkuData>;
        const cost = d.cost_price ?? null;
        const stMin = d.stock_min ?? 0;
        const avail = v.stock > 0;
        const isBaixo = stMin > 0 && (v.stock || 0) < stMin;

        if (statusFilter === "ativo" && !avail) return;
        if (statusFilter === "inativo" && avail) return;
        if (statusFilter === "baixo" && !isBaixo) return;

        const margin = cost !== null && v.price !== null && v.price > 0
          ? ((v.price - cost) / v.price * 100) : null;

        result.push({
          pname, variant: v, cost, stMin,
          margin, intCount: interest[v.sku] || 0, isBaixo,
        });
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, catFilter, statusFilter, refreshKey]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(STORE_PRODUCTS).forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  }, []);

  const handleFieldChange = (sku: string, field: string, value: string) => {
    const data = loadData();
    const nullFields = ["price", "cost_price"];
    const val = value === "" ? (nullFields.includes(field) ? null : 0) : parseFloat(value);
    if (!data[sku]) data[sku] = { price: null, stock: 0, cost_price: null, stock_min: 0 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data[sku] as any)[field] = val;
    // Update in-memory
    for (const p of Object.values(STORE_PRODUCTS)) {
      const v = p.variants.find(x => x.sku === sku);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (v) (v as any)[field] = val;
    }
    saveData(data);
    refresh();
  };

  const handleMovement = (sku: string, pname: string, label: string, type: string, qty: number, cost: number | null, notes: string) => {
    const movType = MOV_TYPES.find(m => m.id === type);
    if (!movType || qty <= 0) return;
    const dir = movType.dir;
    const p = STORE_PRODUCTS[pname];
    const v = p?.variants.find(x => x.sku === sku);
    if (!v) return;
    const newStock = Math.max(0, (v.stock || 0) + dir * qty);
    v.stock = newStock;
    const data = loadData();
    if (!data[sku]) data[sku] = { price: null, stock: 0, cost_price: null, stock_min: 0 };
    data[sku].stock = newStock;
    if (cost !== null) data[sku].cost_price = cost;
    saveData(data);

    // Record movement
    const mov: Movement = {
      sku, product_name: pname, variant_label: label,
      mov_type: type, direction: dir, quantity: qty,
      balance_after: newStock, unit_cost: cost, notes: notes || null,
      created_at: new Date().toISOString(),
    };
    const hist: Movement[] = JSON.parse(localStorage.getItem("aura_movements") || "[]");
    hist.unshift(mov);
    if (hist.length > 500) hist.length = 500;
    localStorage.setItem("aura_movements", JSON.stringify(hist));
    refresh();
  };

  const handleDelete = (pname: string, sku: string) => {
    const p = STORE_PRODUCTS[pname];
    if (!p) return;
    const label = p.variants.find(v => v.sku === sku)?.label || sku;
    if (!confirm(`Excluir "${pname} — ${label}"?\nSe for a última variante, o produto será removido.`)) return;
    p.variants = p.variants.filter(v => v.sku !== sku);
    if (p.variants.length === 0) delete STORE_PRODUCTS[pname];
    const data = loadData();
    delete data[sku];
    saveData(data);
    // Save as deleted
    const deleted: string[] = JSON.parse(localStorage.getItem("aura_deleted") || "[]");
    if (!deleted.includes(pname) && !STORE_PRODUCTS[pname]) {
      deleted.push(pname);
      localStorage.setItem("aura_deleted", JSON.stringify(deleted));
    }
    refresh();
  };

  const clearInterest = (sku: string) => {
    const d = loadInterest();
    delete d[sku];
    localStorage.setItem("aura_interest", JSON.stringify(d));
    refresh();
  };

  const handleExport = () => {
    const data = loadData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aura_store_data.json";
    a.click();
  };

  const toggleSelect = (sku: string) => {
    setSelectedSkus(prev => {
      const next = new Set(prev);
      next.has(sku) ? next.delete(sku) : next.add(sku);
      return next;
    });
  };
  const toggleSelectAll = () => {
    if (selectedSkus.size === rows.length) {
      setSelectedSkus(new Set());
    } else {
      setSelectedSkus(new Set(rows.map(r => r.variant.sku)));
    }
  };

  const bulkZero = () => {
    if (!selectedSkus.size || !confirm(`Zerar estoque de ${selectedSkus.size} SKU(s)?`)) return;
    const data = loadData();
    selectedSkus.forEach(sku => {
      for (const p of Object.values(STORE_PRODUCTS)) {
        const v = p.variants.find(x => x.sku === sku);
        if (v) { v.stock = 0; break; }
      }
      if (!data[sku]) data[sku] = { price: null, stock: 0, cost_price: null, stock_min: 0 };
      data[sku].stock = 0;
    });
    saveData(data);
    setSelectedSkus(new Set());
    refresh();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-background overflow-y-auto">
      {/* Lock screen */}
      {!authed ? (
        <div className="fixed inset-0 z-[3000] bg-background flex flex-col items-center justify-center gap-5">
          <div className="bg-card border border-border rounded-2xl p-9 w-[min(360px,92vw)] text-center">
            <h3 className="text-xl font-extrabold mb-1.5">🔒 Painel Admin</h3>
            <p className="text-xs text-muted-foreground mb-5">Digite a senha para acessar o estoque.</p>
            <input
              type="password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Senha"
              className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm mb-2.5 outline-none focus:border-foreground"
              autoFocus
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer"
            >
              Entrar
            </button>
            {passError && <p className="text-xs text-destructive mt-2">{passError}</p>}
          </div>
          <button onClick={onClose} className="text-muted-foreground text-xs cursor-pointer bg-transparent border-none hover:text-foreground">
            ← Voltar
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h1 className="text-xl font-extrabold">📦 Controle de Estoque</h1>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setHistOpen(true)} className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold cursor-pointer hover:border-foreground transition-colors">
                📋 Histórico
              </button>
              <button onClick={handleExport} className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold cursor-pointer hover:border-foreground transition-colors">
                📥 Exportar JSON
              </button>
              <button onClick={onClose} className="px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground text-xs font-semibold cursor-pointer hover:border-foreground hover:text-foreground transition-colors">
                ✕ Fechar
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
            <KpiBox label="SKUs Ativos" value={`${kpis.ativos}`} sub={`/ ${kpis.total} variantes`} />
            <KpiBox label="Valor em Estoque" value={`R$ ${kpis.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} sub="custo × quantidade" warn={kpis.valor === 0} />
            <KpiBox label="Abaixo do Mínimo" value={`${kpis.baixo}`} sub="SKUs críticos" alert={kpis.baixo > 0} />
            <KpiBox label="Interesse Pendente" value={`${kpis.totalInt}`} sub="registros de interesse" warn={kpis.totalInt > 0} />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar produto…"
              className="px-3 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs flex-1 max-w-[250px] outline-none focus:border-foreground"
            />
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="px-2 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs outline-none cursor-pointer"
            >
              <option value="">Todas categorias</option>
              {categories.map(c => (
                <option key={c} value={c}>{CATEGORY_LABELS[c] || c}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs outline-none cursor-pointer"
            >
              <option value="">Todos status</option>
              <option value="ativo">Ativo (em estoque)</option>
              <option value="inativo">Inativo (zerado)</option>
              <option value="baixo">Abaixo do mínimo</option>
            </select>
          </div>

          {/* Bulk bar */}
          {selectedSkus.size > 0 && (
            <div className="flex items-center gap-2.5 bg-foreground text-card px-4 py-2.5 rounded-lg mb-3 sticky top-0 z-10">
              <span className="flex-1 text-xs font-bold">{selectedSkus.size} SKU{selectedSkus.size !== 1 ? "s" : ""} selecionado{selectedSkus.size !== 1 ? "s" : ""}</span>
              <button onClick={bulkZero} className="px-3 py-1 rounded-md border border-card/30 bg-transparent text-card text-[.72rem] font-semibold cursor-pointer hover:bg-card/15">
                Zerar estoque
              </button>
              <button onClick={() => setSelectedSkus(new Set())} className="px-3 py-1 rounded-md border border-card/30 bg-transparent text-card text-[.72rem] font-semibold cursor-pointer hover:bg-card/15">
                Limpar seleção
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto border border-border rounded-xl bg-card">
            <table className="w-full border-collapse text-[.82rem]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="p-2 text-left w-7">
                    <input type="checkbox" checked={selectedSkus.size === rows.length && rows.length > 0}
                      onChange={toggleSelectAll} className="w-3.5 h-3.5 cursor-pointer accent-foreground" />
                  </th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Produto</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Dosagem</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">SKU</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Custo</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Margem</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Preço</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Estoque</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Mín</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Status</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">🔔</th>
                  <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ pname, variant: v, cost, stMin, margin, intCount, isBaixo }) => (
                  <tr key={v.sku} className={`border-b border-border ${isBaixo ? "bg-destructive/5" : ""}`}>
                    <td className="p-2">
                      <input type="checkbox" checked={selectedSkus.has(v.sku)}
                        onChange={() => toggleSelect(v.sku)} className="w-3.5 h-3.5 cursor-pointer accent-foreground" />
                    </td>
                    <td className="p-2">
                      <strong>{pname}</strong>
                      {isBaixo && <span className="ml-1.5 bg-destructive/10 text-destructive text-[.6rem] font-bold px-1.5 py-0.5 rounded">⚠ BAIXO</span>}
                    </td>
                    <td className="p-2">{v.label}</td>
                    <td className="p-2"><code className="text-[.7rem] text-muted-foreground">{v.sku}</code></td>
                    <td className="p-2">
                      <input type="number" step="0.01" min="0" defaultValue={cost ?? ""}
                        placeholder="0,00"
                        onBlur={e => handleFieldChange(v.sku, "cost_price", e.target.value)}
                        className="w-20 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                    </td>
                    <td className="p-2">
                      {margin !== null ? (
                        <span className={`text-[.67rem] font-bold px-1.5 py-0.5 rounded-lg ${
                          margin < 20 ? "bg-destructive/10 text-destructive" : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        }`}>{margin.toFixed(0)}%</span>
                      ) : <span className="text-[.7rem] text-muted-foreground">—</span>}
                    </td>
                    <td className="p-2">
                      <input type="number" step="0.01" min="0" defaultValue={v.price ?? ""}
                        placeholder="0,00"
                        onBlur={e => handleFieldChange(v.sku, "price", e.target.value)}
                        className="w-20 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                    </td>
                    <td className="p-2">
                      <input type="number" step="1" min="0" defaultValue={v.stock || 0}
                        onBlur={e => handleFieldChange(v.sku, "stock", e.target.value)}
                        className="w-16 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                    </td>
                    <td className="p-2">
                      <input type="number" step="1" min="0" defaultValue={stMin}
                        onBlur={e => handleFieldChange(v.sku, "stock_min", e.target.value)}
                        className="w-14 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                    </td>
                    <td className="p-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[.68rem] font-semibold ${
                        v.stock > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                      }`}>{v.stock > 0 ? "Ativo" : "Inativo"}</span>
                    </td>
                    <td className="p-2">
                      {intCount > 0 ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-[.7rem] font-bold">🔔 {intCount}</span>
                          <button onClick={() => clearInterest(v.sku)} className="text-muted-foreground text-[.7rem] cursor-pointer bg-transparent border-none hover:text-foreground" title="Zerar">✕</button>
                        </span>
                      ) : <span className="text-muted-foreground text-[.72rem]">—</span>}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setMovModal({ sku: v.sku, pname, label: v.label, type: "entrada" })}
                          className="px-2 py-1 rounded-md bg-secondary border border-border text-foreground text-[.72rem] font-semibold cursor-pointer hover:border-foreground transition-colors"
                        >⇅</button>
                        <button
                          onClick={() => handleDelete(pname, v.sku)}
                          className="px-2 py-1 rounded-md bg-transparent border-none text-muted-foreground cursor-pointer text-base hover:text-destructive"
                        >🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm">Nenhum produto encontrado.</div>
            )}
          </div>
        </div>
      )}

      {/* Movement Modal */}
      {movModal && (
        <MovementModal
          sku={movModal.sku}
          pname={movModal.pname}
          label={movModal.label}
          initialType={movModal.type}
          onConfirm={(type, qty, cost, notes) => {
            handleMovement(movModal.sku, movModal.pname, movModal.label, type, qty, cost, notes);
            setMovModal(null);
          }}
          onClose={() => setMovModal(null)}
        />
      )}

      {/* History Drawer */}
      {histOpen && <HistoryDrawer onClose={() => setHistOpen(false)} />}
    </div>
  );
}

// ── Sub-components ──

function KpiBox({ label, value, sub, warn, alert: isAlert }: {
  label: string; value: string; sub: string; warn?: boolean; alert?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-3.5">
      <div className="text-[.6rem] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className={`text-xl font-extrabold font-mono leading-none ${isAlert ? "text-destructive" : warn ? "text-amber-500" : ""}`}>{value}</div>
      <div className="text-[.68rem] text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function MovementModal({ sku, pname, label, initialType, onConfirm, onClose }: {
  sku: string; pname: string; label: string; initialType: string;
  onConfirm: (type: string, qty: number, cost: number | null, notes: string) => void;
  onClose: () => void;
}) {
  const [type, setType] = useState(initialType);
  const [qty, setQty] = useState(1);
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");
  const showCost = ["entrada", "devolucao"].includes(type);

  return (
    <div className="fixed inset-0 bg-foreground/55 z-[2500] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-[min(420px,95vw)] max-h-[88vh] overflow-y-auto">
        <h3 className="text-base font-extrabold mb-1">Movimentação · {pname}</h3>
        <p className="text-xs text-muted-foreground mb-4">{label} — SKU: {sku}</p>

        {/* Type grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {MOV_TYPES.map(m => (
            <button
              key={m.id}
              onClick={() => setType(m.id)}
              className={`py-2 px-1.5 border rounded-lg text-[.72rem] font-semibold cursor-pointer transition-all text-center leading-tight ${
                type === m.id
                  ? "border-foreground bg-foreground text-card"
                  : "border-border bg-secondary text-foreground hover:border-foreground"
              }`}
            >{m.label}</button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Quantidade</label>
            <input type="number" min="1" value={qty} onChange={e => setQty(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground" autoFocus />
          </div>
          {showCost && (
            <div>
              <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Custo unitário (R$)</label>
              <input type="number" step="0.01" min="0" value={cost} onChange={e => setCost(e.target.value)}
                placeholder="Opcional"
                className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground" />
            </div>
          )}
          <div>
            <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Observação</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Opcional"
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground resize-y h-16" />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onConfirm(type, qty, cost ? parseFloat(cost) : null, notes)}
            className="flex-1 py-2.5 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer hover:opacity-85"
          >Confirmar</button>
          <button onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-border bg-transparent text-foreground text-sm cursor-pointer hover:border-foreground">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryDrawer({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const movs = useMemo(() => {
    const all: Movement[] = JSON.parse(localStorage.getItem("aura_movements") || "[]");
    const q = search.toLowerCase();
    return all.filter(m => {
      const mq = !q || m.sku?.toLowerCase().includes(q) || m.product_name?.toLowerCase().includes(q);
      const mt = !typeFilter || m.mov_type === typeFilter;
      return mq && mt;
    });
  }, [search, typeFilter]);

  const badgeClass = (type: string) => {
    const map: Record<string, string> = {
      entrada: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      saida: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
      ajuste: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
      perda: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400",
      devolucao: "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-400",
      pedido_cliente: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400",
    };
    return map[type] || "bg-secondary text-foreground";
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/50 z-[2500]" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[min(480px,95vw)] bg-card border-l border-border z-[2600] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold">📋 Histórico de Movimentações</h3>
          <button onClick={onClose} className="text-muted-foreground text-lg cursor-pointer bg-transparent border-none hover:text-foreground">✕</button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">{movs.length} movimentaç{movs.length !== 1 ? "ões" : "ão"}</p>

        <div className="flex gap-2 mb-4">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar…"
            className="flex-1 px-2.5 py-1.5 border border-border rounded-lg bg-secondary text-foreground text-xs outline-none focus:border-foreground" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="px-2 py-1.5 border border-border rounded-lg bg-secondary text-foreground text-xs cursor-pointer outline-none">
            <option value="">Todos</option>
            {Object.entries(MOV_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div className="space-y-0">
          {movs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhuma movimentação encontrada.</p>
          ) : movs.map((m, i) => {
            const dt = m.created_at ? new Date(m.created_at).toLocaleString("pt-BR", {
              day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
            }) : "—";
            const isPlus = (m.direction || 1) > 0;
            return (
              <div key={i} className="flex gap-2.5 items-start py-2.5 border-b border-border text-[.78rem]">
                <span className={`text-[.63rem] font-bold px-2 py-0.5 rounded-md shrink-0 ${badgeClass(m.mov_type)}`}>
                  {MOV_LABELS[m.mov_type] || m.mov_type}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground">{m.product_name} · {m.variant_label}</div>
                  <div className="text-muted-foreground text-[.7rem] mt-0.5">
                    {m.sku}{m.unit_cost ? ` · R$${parseFloat(String(m.unit_cost)).toFixed(2).replace(".", ",")}` : ""}
                    {m.balance_after != null ? ` → saldo: ${m.balance_after}` : ""}
                  </div>
                  {m.notes && <div className="text-muted-foreground text-[.7rem] italic mt-0.5">"{m.notes}"</div>}
                  <div className="text-muted-foreground text-[.7rem] mt-0.5">{dt}</div>
                </div>
                <span className={`font-extrabold font-mono text-[.88rem] shrink-0 ${isPlus ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {isPlus ? "+" : ""}{m.direction * m.quantity}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
