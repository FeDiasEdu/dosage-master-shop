import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_LABELS } from "@/data/store-products";
import { AURA_DICTIONARY, type DictEntry } from "@/data/dictionary";
import { toast } from "sonner";

// ── Types ──
interface SkuRow {
  sku: string;
  price: number | null;
  stock: number;
  cost_price: number | null;
  stock_min: number;
}

interface ProductRow {
  id: string;
  name: string;
  category: string;
  slug: string;
  active: boolean;
}

interface VariantRow {
  id: string;
  product_id: string;
  sku: string;
  label: string;
  dosage_value: number;
  dosage_unit: string;
  price: number | null;
  stock_qty: number;
  available: boolean;
}

interface InterestRow {
  sku: string;
  count: number;
}

interface MovementRow {
  id: string;
  sku: string;
  product_name: string | null;
  variant_label: string | null;
  mov_type: string;
  direction: number;
  quantity: number;
  balance_after: number | null;
  unit_cost: number | null;
  notes: string | null;
  created_at: string | null;
}

interface FlatRow {
  productId: string;
  productName: string;
  category: string;
  variantId: string;
  sku: string;
  label: string;
  dosage_value: number;
  dosage_unit: string;
  price: number | null;
  stock: number;
  cost_price: number | null;
  stock_min: number;
  intCount: number;
  isBaixo: boolean;
}

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

// Category auto-detection from dictionary
const DICT_CATEGORIES: Record<string, string> = {};
// Build category map from existing products
function detectCategory(name: string): string {
  return DICT_CATEGORIES[name] || "suprimentos";
}

async function sha256(str: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
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
  const [selectedSkus, setSelectedSkus] = useState<Set<string>>(new Set());
  const [movModal, setMovModal] = useState<{ sku: string; pname: string; label: string; type: string } | null>(null);
  const [histOpen, setHistOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [tab, setTab] = useState<"estoque" | "adicionar">("estoque");

  // Data state
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [skuData, setSkuData] = useState<Record<string, SkuRow>>({});
  const [interests, setInterests] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

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

  // Load all data from Supabase
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, varRes, skuRes, intRes] = await Promise.all([
        supabase.from("products").select("id, name, category, slug, active"),
        supabase.from("product_variants").select("id, product_id, sku, label, dosage_value, dosage_unit, price, stock_qty, available"),
        supabase.from("aura_store_sku").select("sku, price, stock, cost_price, stock_min"),
        supabase.from("aura_interest").select("sku, count"),
      ]);

      setProducts((prodRes.data as ProductRow[]) || []);
      setVariants((varRes.data as VariantRow[]) || []);

      const skuMap: Record<string, SkuRow> = {};
      for (const row of (skuRes.data as SkuRow[]) || []) {
        skuMap[row.sku] = row;
      }
      setSkuData(skuMap);

      const intMap: Record<string, number> = {};
      for (const row of (intRes.data as InterestRow[]) || []) {
        intMap[row.sku] = row.count || 0;
      }
      setInterests(intMap);

      // Build category map
      for (const p of (prodRes.data as ProductRow[]) || []) {
        DICT_CATEGORIES[p.name] = p.category;
      }
    } catch (e) {
      console.error("Admin load error:", e);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  // Build flat rows
  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const result: FlatRow[] = [];

    for (const prod of products) {
      if (catFilter && prod.category !== catFilter) continue;
      if (q && !prod.name.toLowerCase().includes(q)) continue;

      const prodVariants = variants.filter(v => v.product_id === prod.id);
      for (const v of prodVariants) {
        const sd = skuData[v.sku];
        const stock = v.stock_qty || 0;
        const cost = sd?.cost_price ?? null;
        const stMin = sd?.stock_min ?? 0;
        const avail = stock > 0;
        const isBaixo = stMin > 0 && stock < stMin;

        if (statusFilter === "ativo" && !avail) continue;
        if (statusFilter === "inativo" && avail) continue;
        if (statusFilter === "baixo" && !isBaixo) continue;
        if (statusFilter === "interesse" && !(interests[v.sku] > 0)) continue;

        result.push({
          productId: prod.id,
          productName: prod.name,
          category: prod.category,
          variantId: v.id,
          sku: v.sku,
          label: v.label,
          dosage_value: v.dosage_value,
          dosage_unit: v.dosage_unit,
          price: v.price,
          stock,
          cost_price: cost,
          stock_min: stMin,
          intCount: interests[v.sku] || 0,
          isBaixo,
        });
      }
    }
    return result.sort((a, b) => a.productName.localeCompare(b.productName) || a.dosage_value - b.dosage_value);
  }, [products, variants, skuData, interests, search, catFilter, statusFilter]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  }, [products]);

  // KPIs
  const kpis = useMemo(() => {
    let total = 0, ativos = 0, valor = 0, baixo = 0, totalInt = 0;
    for (const v of variants) {
      total++;
      if (v.stock_qty > 0) ativos++;
      const sd = skuData[v.sku];
      const cost = sd?.cost_price ?? 0;
      const stMin = sd?.stock_min ?? 0;
      valor += (v.stock_qty || 0) * cost;
      if (stMin > 0 && (v.stock_qty || 0) < stMin) baixo++;
      totalInt += (interests[v.sku] || 0);
    }
    return { total, ativos, valor, baixo, totalInt };
  }, [variants, skuData, interests]);

  // Field update handlers — optimistic update (no full reload, no scroll jump)
  const handleFieldChange = async (sku: string, variantId: string, field: string, value: string) => {
    const numVal = value === "" ? null : parseFloat(value);

    if (field === "price") {
      setVariants(prev => prev.map(v => v.id === variantId ? { ...v, price: numVal } : v));
      await supabase.from("product_variants").update({ price: numVal }).eq("id", variantId);
    } else if (field === "stock") {
      const stockVal = numVal ?? 0;
      setVariants(prev => prev.map(v => v.id === variantId ? { ...v, stock_qty: stockVal } : v));
      await supabase.from("product_variants").update({ stock_qty: stockVal }).eq("id", variantId);
    } else if (field === "cost_price" || field === "stock_min") {
      setSkuData(prev => ({ ...prev, [sku]: { ...prev[sku], sku, [field]: numVal ?? 0, stock: prev[sku]?.stock ?? 0, price: prev[sku]?.price ?? null, cost_price: prev[sku]?.cost_price ?? null, stock_min: prev[sku]?.stock_min ?? 0 } }));
      await supabase.from("aura_store_sku").upsert(
        { sku, [field]: numVal ?? 0 },
        { onConflict: "sku" }
      );
    }
  };

  const handleMovement = async (sku: string, pname: string, label: string, type: string, qty: number, cost: number | null, notes: string) => {
    const movType = MOV_TYPES.find(m => m.id === type);
    if (!movType || qty <= 0) return;

    const variant = variants.find(v => v.sku === sku);
    if (!variant) return;

    const newStock = Math.max(0, (variant.stock_qty || 0) + movType.dir * qty);

    // Optimistic update
    setVariants(prev => prev.map(v => v.id === variant.id ? { ...v, stock_qty: newStock } : v));
    if (cost !== null) {
      setSkuData(prev => ({ ...prev, [sku]: { ...prev[sku], sku, cost_price: cost, stock: newStock, price: prev[sku]?.price ?? null, stock_min: prev[sku]?.stock_min ?? 0 } }));
    }

    // Persist
    await supabase.from("product_variants").update({ stock_qty: newStock }).eq("id", variant.id);
    if (cost !== null) {
      await supabase.from("aura_store_sku").upsert({ sku, cost_price: cost }, { onConflict: "sku" });
    }
    await supabase.from("stock_movements").insert({
      sku, product_name: pname, variant_label: label,
      mov_type: type, direction: movType.dir, quantity: qty,
      balance_after: newStock, unit_cost: cost, notes: notes || null,
    });

    toast.success(`Movimentação registrada: ${pname} ${label}`);
  };

  const handleDelete = async (row: FlatRow) => {
    if (!confirm(`Excluir "${row.productName} — ${row.label}"?\nSe for a última variante, o produto será removido.`)) return;

    // Optimistic removal
    setVariants(prev => prev.filter(v => v.id !== row.variantId));

    await supabase.from("product_variants").delete().eq("id", row.variantId);

    const remaining = variants.filter(v => v.product_id === row.productId && v.id !== row.variantId);
    if (remaining.length === 0) {
      setProducts(prev => prev.filter(p => p.id !== row.productId));
      await supabase.from("products").delete().eq("id", row.productId);
      await supabase.from("aura_deleted").upsert({ pname: row.productName }, { onConflict: "pname" });
    }

    toast.success(`Excluído: ${row.productName} — ${row.label}`);
  };

  const bulkDelete = async () => {
    if (!selectedSkus.size || !confirm(`Excluir ${selectedSkus.size} SKU(s) selecionados?`)) return;

    // Optimistic removal
    const skusToDelete = new Set(selectedSkus);
    setVariants(prev => prev.filter(v => !skusToDelete.has(v.sku)));

    for (const sku of selectedSkus) {
      const v = variants.find(x => x.sku === sku);
      if (v) {
        await supabase.from("product_variants").delete().eq("id", v.id);
        const remaining = variants.filter(x => x.product_id === v.product_id && x.sku !== sku);
        if (remaining.length === 0) {
          setProducts(prev => prev.filter(p => p.id !== v.product_id));
          await supabase.from("products").delete().eq("id", v.product_id);
        }
      }
    }

    toast.success(`${selectedSkus.size} SKU(s) excluídos`);
    setSelectedSkus(new Set());
  };

  const bulkZero = async () => {
    if (!selectedSkus.size || !confirm(`Zerar estoque de ${selectedSkus.size} SKU(s)?`)) return;

    // Optimistic update
    setVariants(prev => prev.map(v => selectedSkus.has(v.sku) ? { ...v, stock_qty: 0 } : v));

    for (const sku of selectedSkus) {
      const v = variants.find(x => x.sku === sku);
      if (v) {
        await supabase.from("product_variants").update({ stock_qty: 0 }).eq("id", v.id);
      }
    }

    toast.success(`Estoque zerado para ${selectedSkus.size} SKU(s)`);
    setSelectedSkus(new Set());
  };

  const clearInterest = async (sku: string) => {
    setInterests(prev => { const next = { ...prev }; delete next[sku]; return next; });
    await supabase.from("aura_interest").delete().eq("sku", sku);
    toast.success("Interesse zerado");
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
      setSelectedSkus(new Set(rows.map(r => r.sku)));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-background overflow-y-auto">
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
            <button onClick={handleLogin} className="w-full py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer">
              Entrar
            </button>
            {passError && <p className="text-xs text-destructive mt-2">{passError}</p>}
          </div>
          <button onClick={onClose} className="text-muted-foreground text-xs cursor-pointer bg-transparent border-none hover:text-foreground">← Voltar</button>
        </div>
      ) : (
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h1 className="text-xl font-extrabold">📦 Controle de Estoque</h1>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setAddModal(true)} className="px-3 py-1.5 rounded-lg bg-foreground text-card text-xs font-bold cursor-pointer border-none hover:opacity-85">
                ➕ Adicionar Item
              </button>
              <button onClick={() => setHistOpen(true)} className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold cursor-pointer hover:border-foreground">
                📋 Histórico
              </button>
              <button onClick={onClose} className="px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground text-xs font-semibold cursor-pointer hover:border-foreground hover:text-foreground">
                ✕ Fechar
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 mb-5">
            <KpiBox label="SKUs Ativos" value={`${kpis.ativos}`} sub={`/ ${kpis.total} variantes`} />
            <KpiBox label="Valor em Estoque" value={`R$ ${kpis.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} sub="custo × quantidade" warn={kpis.valor === 0} />
            <KpiBox label="Abaixo do Mínimo" value={`${kpis.baixo}`} sub="SKUs críticos" alert={kpis.baixo > 0} />
            <KpiBox label="Interesse Pendente" value={`${kpis.totalInt}`} sub="registros" warn={kpis.totalInt > 0} />
            <KpiBox label="Produtos" value={`${products.length}`} sub="no catálogo" />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-4">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto…"
              className="px-3 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs flex-1 max-w-[250px] outline-none focus:border-foreground" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-2 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs outline-none cursor-pointer">
              <option value="">Todas categorias</option>
              {categories.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c] || c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 border border-border rounded-lg bg-card text-foreground text-xs outline-none cursor-pointer">
              <option value="">Todos status</option>
              <option value="ativo">Ativo (em estoque)</option>
              <option value="inativo">Inativo (zerado)</option>
              <option value="baixo">Abaixo do mínimo</option>
              <option value="interesse">🔔 Com interesse</option>
            </select>
          </div>

          {/* Bulk bar */}
          {selectedSkus.size > 0 && (
            <div className="flex items-center gap-2.5 bg-foreground text-card px-4 py-2.5 rounded-lg mb-3 sticky top-0 z-10">
              <span className="flex-1 text-xs font-bold">{selectedSkus.size} SKU{selectedSkus.size !== 1 ? "s" : ""} selecionado{selectedSkus.size !== 1 ? "s" : ""}</span>
              <button onClick={bulkZero} className="px-3 py-1 rounded-md border border-card/30 bg-transparent text-card text-[.72rem] font-semibold cursor-pointer hover:bg-card/15">
                Zerar estoque
              </button>
              <button onClick={bulkDelete} className="px-3 py-1 rounded-md border border-card/30 bg-transparent text-card text-[.72rem] font-semibold cursor-pointer hover:bg-card/15">
                🗑 Excluir
              </button>
              <button onClick={() => setSelectedSkus(new Set())} className="px-3 py-1 rounded-md border border-card/30 bg-transparent text-card text-[.72rem] font-semibold cursor-pointer hover:bg-card/15">
                Limpar
              </button>
            </div>
          )}

          {/* Table */}
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Carregando…</div>
          ) : (
            <div className="overflow-x-auto border border-border rounded-xl bg-card">
              <table className="w-full border-collapse text-[.82rem]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-2 text-left w-7">
                      <input type="checkbox" checked={selectedSkus.size === rows.length && rows.length > 0}
                        onChange={toggleSelectAll} className="w-3.5 h-3.5 cursor-pointer accent-foreground" />
                    </th>
                    <Th>Produto</Th><Th>Dosagem</Th><Th>SKU</Th><Th>Custo</Th><Th>Margem</Th><Th>Preço</Th><Th>Estoque</Th><Th>Mín</Th><Th>Status</Th><Th>🔔</Th><Th>Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const margin = row.cost_price !== null && row.price !== null && row.price > 0
                      ? ((row.price - row.cost_price) / row.price * 100) : null;
                    return (
                      <tr key={row.sku} className={`border-b border-border ${row.isBaixo ? "bg-destructive/5" : ""}`}>
                        <td className="p-2">
                          <input type="checkbox" checked={selectedSkus.has(row.sku)}
                            onChange={() => toggleSelect(row.sku)} className="w-3.5 h-3.5 cursor-pointer accent-foreground" />
                        </td>
                        <td className="p-2">
                          <strong>{row.productName}</strong>
                          {row.isBaixo && <span className="ml-1.5 bg-destructive/10 text-destructive text-[.6rem] font-bold px-1.5 py-0.5 rounded">⚠ BAIXO</span>}
                        </td>
                        <td className="p-2">{row.label}</td>
                        <td className="p-2"><code className="text-[.7rem] text-muted-foreground">{row.sku}</code></td>
                        <td className="p-2">
                          <input type="number" step="0.01" min="0" defaultValue={row.cost_price ?? ""}
                            placeholder="0,00" key={`c-${row.sku}-${row.cost_price}`}
                            onBlur={e => handleFieldChange(row.sku, row.variantId, "cost_price", e.target.value)}
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
                          <input type="number" step="0.01" min="0" defaultValue={row.price ?? ""}
                            placeholder="0,00" key={`p-${row.sku}-${row.price}`}
                            onBlur={e => handleFieldChange(row.sku, row.variantId, "price", e.target.value)}
                            className="w-20 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                        </td>
                        <td className="p-2">
                          <input type="number" step="1" min="0" defaultValue={row.stock}
                            key={`s-${row.sku}-${row.stock}`}
                            onBlur={e => handleFieldChange(row.sku, row.variantId, "stock", e.target.value)}
                            className="w-16 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                        </td>
                        <td className="p-2">
                          <input type="number" step="1" min="0" defaultValue={row.stock_min}
                            key={`m-${row.sku}-${row.stock_min}`}
                            onBlur={e => handleFieldChange(row.sku, row.variantId, "stock_min", e.target.value)}
                            className="w-14 px-1.5 py-1 border border-border rounded-md bg-card text-foreground text-[.82rem] outline-none focus:border-foreground" />
                        </td>
                        <td className="p-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[.68rem] font-semibold ${
                            row.stock > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                          }`}>{row.stock > 0 ? "Ativo" : "Inativo"}</span>
                        </td>
                        <td className="p-2">
                          {row.intCount > 0 ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-[.7rem] font-bold">🔔 {row.intCount}</span>
                              <button onClick={() => clearInterest(row.sku)} className="text-muted-foreground text-[.7rem] cursor-pointer bg-transparent border-none hover:text-foreground" title="Zerar">✕</button>
                            </span>
                          ) : <span className="text-muted-foreground text-[.72rem]">—</span>}
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <button onClick={() => setMovModal({ sku: row.sku, pname: row.productName, label: row.label, type: "entrada" })}
                              className="px-2 py-1 rounded-md bg-secondary border border-border text-foreground text-[.72rem] font-semibold cursor-pointer hover:border-foreground">⇅</button>
                            <button onClick={() => handleDelete(row)}
                              className="px-2 py-1 rounded-md bg-transparent border-none text-muted-foreground cursor-pointer text-base hover:text-destructive">🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {rows.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">Nenhum produto encontrado.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Movement Modal */}
      {movModal && (
        <MovementModal
          sku={movModal.sku} pname={movModal.pname} label={movModal.label} initialType={movModal.type}
          onConfirm={async (type, qty, cost, notes) => {
            await handleMovement(movModal.sku, movModal.pname, movModal.label, type, qty, cost, notes);
            setMovModal(null);
          }}
          onClose={() => setMovModal(null)}
        />
      )}

      {histOpen && <HistoryDrawer onClose={() => setHistOpen(false)} />}
      {addModal && <AddItemModal onClose={() => setAddModal(false)} existingProducts={products} onAdded={loadData} />}
    </div>
  );
}

// ── Sub-components ──

function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-2 text-left text-[.7rem] uppercase tracking-wider text-muted-foreground font-semibold">{children}</th>;
}

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
        <div className="grid grid-cols-3 gap-2 mb-4">
          {MOV_TYPES.map(m => (
            <button key={m.id} onClick={() => setType(m.id)}
              className={`py-2 px-1.5 border rounded-lg text-[.72rem] font-semibold cursor-pointer transition-all text-center leading-tight ${
                type === m.id ? "border-foreground bg-foreground text-card" : "border-border bg-secondary text-foreground hover:border-foreground"
              }`}>{m.label}</button>
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
              <input type="number" step="0.01" min="0" value={cost} onChange={e => setCost(e.target.value)} placeholder="Opcional"
                className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground" />
            </div>
          )}
          <div>
            <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Observação</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Opcional"
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground resize-y h-16" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={() => onConfirm(type, qty, cost ? parseFloat(cost) : null, notes)}
            className="flex-1 py-2.5 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer hover:opacity-85">Confirmar</button>
          <button onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-border bg-transparent text-foreground text-sm cursor-pointer hover:border-foreground">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function HistoryDrawer({ onClose }: { onClose: () => void }) {
  const [movements, setMovements] = useState<MovementRow[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("stock_movements").select("*").order("created_at", { ascending: false }).limit(500);
      setMovements((data as MovementRow[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return movements.filter(m => {
      const mq = !q || m.sku?.toLowerCase().includes(q) || m.product_name?.toLowerCase().includes(q);
      const mt = !typeFilter || m.mov_type === typeFilter;
      return mq && mt;
    });
  }, [movements, search, typeFilter]);

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
        {loading ? (
          <div className="text-center py-10 text-muted-foreground text-sm">Carregando…</div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">{filtered.length} movimentaç{filtered.length !== 1 ? "ões" : "ão"}</p>
            <div className="flex gap-2 mb-4">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar…"
                className="flex-1 px-2.5 py-1.5 border border-border rounded-lg bg-secondary text-foreground text-xs outline-none focus:border-foreground" />
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="px-2 py-1.5 border border-border rounded-lg bg-secondary text-foreground text-xs cursor-pointer outline-none">
                <option value="">Todos</option>
                {Object.entries(MOV_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-0">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhuma movimentação encontrada.</p>
              ) : filtered.map((m) => {
                const dt = m.created_at ? new Date(m.created_at).toLocaleString("pt-BR", {
                  day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
                }) : "—";
                const isPlus = (m.direction || 1) > 0;
                return (
                  <div key={m.id} className="flex gap-2.5 items-start py-2.5 border-b border-border text-[.78rem]">
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
          </>
        )}
      </div>
    </>
  );
}

// ── Add Item Modal ──
function AddItemModal({ onClose, existingProducts, onAdded }: {
  onClose: () => void;
  existingProducts: ProductRow[];
  onAdded: () => Promise<void>;
}) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  // Group dictionary by product name
  const dictByProduct = useMemo(() => {
    const map: Record<string, DictEntry[]> = {};
    for (const entry of AURA_DICTIONARY) {
      if (!map[entry.name]) map[entry.name] = [];
      map[entry.name].push(entry);
    }
    return map;
  }, []);

  const productNames = useMemo(() => {
    const q = search.toLowerCase();
    return Object.keys(dictByProduct)
      .filter(name => !q || name.toLowerCase().includes(q))
      .sort();
  }, [search, dictByProduct]);

  const selectedEntryList = selectedProduct ? (dictByProduct[selectedProduct] || []) : [];

  const toggleEntry = (sku: string) => {
    setSelectedEntries(prev => {
      const next = new Set(prev);
      next.has(sku) ? next.delete(sku) : next.add(sku);
      return next;
    });
  };

  const handleAdd = async () => {
    if (!selectedProduct || selectedEntries.size === 0) return;
    setSaving(true);

    try {
      // Check if product exists
      let productId: string;
      const existing = existingProducts.find(p => p.name === selectedProduct);

      if (existing) {
        productId = existing.id;
      } else {
        // Detect category from dictionary or existing data
        const category = DICT_CATEGORIES[selectedProduct] || detectCategoryFromDict(selectedProduct);
        const slug = selectedProduct.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        const { data: newProd, error } = await supabase.from("products").insert({
          name: selectedProduct,
          category,
          slug,
          active: true,
        }).select("id").single();

        if (error) throw error;
        productId = newProd.id;
      }

      // Add selected variants
      for (const sku of selectedEntries) {
        const entry = AURA_DICTIONARY.find(e => e.sku === sku && e.name === selectedProduct);
        if (!entry) continue;

        const qty = quantities[sku] || 0;

        // Insert variant
        await supabase.from("product_variants").insert({
          product_id: productId,
          sku: entry.sku,
          label: `${entry.dosage} ${entry.unit}`,
          dosage_value: entry.dosage,
          dosage_unit: entry.unit,
          stock_qty: qty,
          available: qty > 0,
        });

        // Save cost/price to aura_store_sku
        if (entry.cost !== null || entry.price !== null) {
          await supabase.from("aura_store_sku").upsert({
            sku: entry.sku,
            cost_price: entry.cost,
            price: entry.price,
            stock: qty,
            stock_min: 0,
          }, { onConflict: "sku" });
        }

        // Also set price on variant if available
        if (entry.price !== null) {
          await supabase.from("product_variants").update({ price: entry.price }).eq("sku", entry.sku);
        }

        // Record entry movement if qty > 0
        if (qty > 0) {
          await supabase.from("stock_movements").insert({
            sku: entry.sku,
            product_name: selectedProduct,
            variant_label: `${entry.dosage} ${entry.unit}`,
            mov_type: "entrada",
            direction: 1,
            quantity: qty,
            balance_after: qty,
            unit_cost: entry.cost,
            notes: "Adição inicial via painel",
          });
        }
      }

      toast.success(`${selectedEntries.size} variante(s) adicionada(s) para ${selectedProduct}`);
      await onAdded();
      onClose();
    } catch (e) {
      console.error("Add item error:", e);
      toast.error("Erro ao adicionar item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/55 z-[2500] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-[min(600px,95vw)] max-h-[88vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-5 pb-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold">➕ Adicionar Item do Dicionário</h3>
            <button onClick={onClose} className="text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground text-lg">✕</button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{AURA_DICTIONARY.length} SKUs disponíveis · {Object.keys(dictByProduct).length} produtos</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!selectedProduct ? (
            <>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar peptídeo…"
                className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground" autoFocus />
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {productNames.map(name => {
                  const variants = dictByProduct[name];
                  const exists = existingProducts.some(p => p.name === name);
                  return (
                    <button key={name} onClick={() => { setSelectedProduct(name); setSelectedEntries(new Set()); setQuantities({}); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg border border-border bg-background hover:border-foreground transition-colors cursor-pointer flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm text-foreground">{name}</span>
                        <span className="text-muted-foreground text-xs ml-2">{variants.length} variante{variants.length !== 1 ? "s" : ""}</span>
                      </div>
                      {exists && <span className="text-[.6rem] bg-muted text-muted-foreground px-2 py-0.5 rounded font-semibold">JÁ EXISTE</span>}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedProduct(null)} className="text-sm text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground">
                ← Voltar
              </button>
              <h4 className="text-lg font-bold">{selectedProduct}</h4>
              <p className="text-xs text-muted-foreground">Selecione as variações e informe quantidades:</p>
              <div className="space-y-2">
                {selectedEntryList.map(entry => (
                  <div key={entry.sku} className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg transition-colors ${
                    selectedEntries.has(entry.sku) ? "border-foreground bg-foreground/5" : "border-border"
                  }`}>
                    <input type="checkbox" checked={selectedEntries.has(entry.sku)} onChange={() => toggleEntry(entry.sku)}
                      className="w-4 h-4 cursor-pointer accent-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{entry.dosage} {entry.unit}</div>
                      <div className="text-[.7rem] text-muted-foreground">
                        SKU: {entry.sku}
                        {entry.cost !== null && ` · Custo: R$${entry.cost.toFixed(2).replace(".", ",")}`}
                        {entry.price !== null && ` · Venda: R$${entry.price.toFixed(2).replace(".", ",")}`}
                      </div>
                    </div>
                    {selectedEntries.has(entry.sku) && (
                      <input type="number" min="0" value={quantities[entry.sku] || 0}
                        onChange={e => setQuantities(prev => ({ ...prev, [entry.sku]: parseInt(e.target.value) || 0 }))}
                        placeholder="Qtd"
                        className="w-16 px-2 py-1 border border-border rounded-md bg-secondary text-foreground text-sm outline-none focus:border-foreground text-center" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {selectedProduct && (
          <div className="px-6 py-4 border-t border-border shrink-0 flex gap-2">
            <button onClick={handleAdd} disabled={selectedEntries.size === 0 || saving}
              className="flex-1 py-2.5 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed">
              {saving ? "Salvando…" : `Adicionar ${selectedEntries.size} variante(s)`}
            </button>
            <button onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border bg-transparent text-foreground text-sm cursor-pointer hover:border-foreground">
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to detect category from dictionary context
function detectCategoryFromDict(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("water") || lower.includes("acid") || lower.includes("syringe") || lower.includes("needle")) return "suprimentos";
  if (lower.includes("blend")) return "blends";
  return "suprimentos";
}
