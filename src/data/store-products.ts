export interface StoreVariant {
  id?: string;
  sku: string;
  label: string;
  dosage_value: number;
  dosage_unit: string;
  price: number | null;
  stock: number;
}

export interface StoreProduct {
  id?: string;
  slug?: string;
  category: string;
  guide_key?: string | null;
  variants: StoreVariant[];
}

export type StoreProductMap = Record<string, StoreProduct>;

export interface CartItem {
  productName: string;
  variantId: string;
  sku: string;
  label: string;
  price: number;
  quantity: number;
  maxStock: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  recovery: "Recovery",
  bulking: "Bulking & GH",
  cutting: "Cutting",
  glp1: "GLP-1",
  cognitivo: "Cognitivo",
  sono: "Sono",
  hormonal: "Hormonal",
  longevidade: "Anti-Aging",
  estetica: "Estética",
  bioreguladores: "Bioreguladores",
  suprimentos: "Suprimentos",
  blends: "Blends",
  imune: "Imune",
};

export const CATEGORY_ICONS: Record<string, string> = {
  all: "☰",
  recovery: "🩹",
  bulking: "⚡",
  cutting: "🔥",
  glp1: "💊",
  cognitivo: "🧠",
  sono: "🌙",
  hormonal: "⚗",
  longevidade: "⏳",
  estetica: "💎",
  bioreguladores: "🧬",
  suprimentos: "🧪",
  blends: "🧩",
  imune: "🛡",
};

// LED-style colors for dark mode categories
export const CATEGORY_LED_CLASSES: Record<string, string> = {
  bulking: "bg-muted text-muted-foreground dark:bg-red-950/60 dark:text-red-400 dark:border-red-800/40",
  cognitivo: "bg-muted text-muted-foreground dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800/40",
  cutting: "bg-muted text-muted-foreground dark:bg-orange-950/60 dark:text-orange-400 dark:border-orange-800/40",
  recovery: "bg-muted text-muted-foreground dark:bg-green-950/60 dark:text-green-400 dark:border-green-800/40",
  sono: "bg-muted text-muted-foreground dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/40",
  glp1: "bg-muted text-muted-foreground dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-800/40",
  hormonal: "bg-muted text-muted-foreground dark:bg-pink-950/60 dark:text-pink-400 dark:border-pink-800/40",
  longevidade: "bg-muted text-muted-foreground dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/40",
  estetica: "bg-muted text-muted-foreground dark:bg-fuchsia-950/60 dark:text-fuchsia-400 dark:border-fuchsia-800/40",
  bioreguladores: "bg-muted text-muted-foreground dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-800/40",
  suprimentos: "bg-muted text-muted-foreground dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700/40",
  blends: "bg-muted text-muted-foreground dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800/40",
  imune: "bg-muted text-muted-foreground dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40",
};

// Products that should NOT show "Acompanha Água Bacteriostática"
export const NO_WATER_PRODUCTS = ["Bacteriostatic Water", "Acetic Acid Water", "Acetic Acid"];
