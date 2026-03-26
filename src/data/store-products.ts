export interface StoreVariant {
  sku: string;
  label: string;
  dosage_value: number;
  dosage_unit: string;
  price: number | null;
  stock: number;
}

export interface StoreProduct {
  key: string;
  category: string;
  variants: StoreVariant[];
}

export type StoreProductMap = Record<string, StoreProduct>;

export interface CartItem {
  productName: string;
  sku: string;
  label: string;
  price: number;
  quantity: number;
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

export const STORE_PRODUCTS: StoreProductMap = {
  "5-Amino-1MQ": { key: "aminomq", category: "cutting", variants: [{ sku: "5AM", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "10AM", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "50AM", label: "50 MG", dosage_value: 50, dosage_unit: "MG", price: null, stock: 0 }] },
  "Acetic Acid": { key: "aceticacid", category: "suprimentos", variants: [{ sku: "AA3", label: "3 ML", dosage_value: 3, dosage_unit: "ML", price: null, stock: 0 }, { sku: "AA5", label: "5 ML", dosage_value: 5, dosage_unit: "ML", price: null, stock: 0 }, { sku: "AA10", label: "10 ML", dosage_value: 10, dosage_unit: "ML", price: null, stock: 0 }] },
  "Adamax": { key: "adamax", category: "cognitivo", variants: [{ sku: "AD5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "AD10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "AOD-9604": { key: "aod9604", category: "cutting", variants: [{ sku: "AOD2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "AOD5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "AOD10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Bacteriostatic Water": { key: "bacwater", category: "suprimentos", variants: [{ sku: "BA3", label: "3 ML", dosage_value: 3, dosage_unit: "ML", price: null, stock: 0 }, { sku: "BA10", label: "10 ML", dosage_value: 10, dosage_unit: "ML", price: null, stock: 0 }] },
  "BPC-157": { key: "bpc157", category: "recovery", variants: [{ sku: "BC2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "BC5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "BC10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "BC15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }, { sku: "BC20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }, { sku: "BC30", label: "30 MG", dosage_value: 30, dosage_unit: "MG", price: null, stock: 0 }] },
  "Cerebrolysin": { key: "cerebrolysin", category: "cognitivo", variants: [{ sku: "CBL60", label: "60 MG", dosage_value: 60, dosage_unit: "MG", price: null, stock: 0 }] },
  "CJC-1295 (no DAC)": { key: "cjcnodac", category: "bulking", variants: [{ sku: "CND2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CND5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CND10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "CJC-1295 (with DAC)": { key: "cjcdac", category: "bulking", variants: [{ sku: "CD2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CD5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CD10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "DSIP": { key: "dsip", category: "sono", variants: [{ sku: "DS2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "DS5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "DS10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "DS12", label: "12 MG", dosage_value: 12, dosage_unit: "MG", price: null, stock: 0 }, { sku: "DS15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }] },
  "FOXO4": { key: "foxo4", category: "longevidade", variants: [{ sku: "F42", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "F45", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "F410", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "FOXO4-DRI": { key: "foxo4dri", category: "longevidade", variants: [{ sku: "FD2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "FD10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "GHK-Cu": { key: "ghkcu", category: "estetica", variants: [{ sku: "CU2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CU50", label: "50 MG", dosage_value: 50, dosage_unit: "MG", price: null, stock: 0 }, { sku: "CU100", label: "100 MG", dosage_value: 100, dosage_unit: "MG", price: null, stock: 0 }] },
  "Glow": { key: "glow", category: "estetica", variants: [{ sku: "BBG70", label: "70 MG", dosage_value: 70, dosage_unit: "MG", price: null, stock: 0 }] },
  "HCG": { key: "hcg", category: "hormonal", variants: [{ sku: "G5K", label: "5000 IU", dosage_value: 5000, dosage_unit: "IU", price: null, stock: 0 }, { sku: "G10K", label: "10000 IU", dosage_value: 10000, dosage_unit: "IU", price: null, stock: 0 }] },
  "HGH 191-AA": { key: "hgh191", category: "bulking", variants: [{ sku: "H6", label: "6 IU", dosage_value: 6, dosage_unit: "IU", price: null, stock: 0 }, { sku: "H12", label: "12 IU", dosage_value: 12, dosage_unit: "IU", price: null, stock: 0 }, { sku: "H24", label: "24 IU", dosage_value: 24, dosage_unit: "IU", price: null, stock: 0 }, { sku: "H36", label: "36 IU", dosage_value: 36, dosage_unit: "IU", price: null, stock: 0 }] },
  "HGH Fragment 176-191": { key: "hghfrag", category: "cutting", variants: [{ sku: "FR5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "FR10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "FR15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }] },
  "Humanin": { key: "humanin", category: "longevidade", variants: [{ sku: "HU10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "IGF-1 DES": { key: "igf1des", category: "bulking", variants: [{ sku: "IGFDES1", label: "1 MG", dosage_value: 1, dosage_unit: "MG", price: null, stock: 0 }, { sku: "IGFDES01", label: "100 MCG", dosage_value: 100, dosage_unit: "MCG", price: null, stock: 0 }] },
  "IGF-1 LR3": { key: "igf1lr3", category: "bulking", variants: [{ sku: "IG1", label: "1 MG", dosage_value: 1, dosage_unit: "MG", price: null, stock: 0 }, { sku: "IG01", label: "100 MCG", dosage_value: 100, dosage_unit: "MCG", price: null, stock: 0 }] },
  "Ipamorelin": { key: "ipamorelin", category: "bulking", variants: [{ sku: "IPA2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "IPA5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "IPA10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Kisspeptin-10": { key: "kisspeptin", category: "hormonal", variants: [{ sku: "KS5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "KS10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Klow": { key: "klow", category: "estetica", variants: [{ sku: "KL80", label: "80 MG", dosage_value: 80, dosage_unit: "MG", price: null, stock: 0 }] },
  "KPV": { key: "kpv", category: "recovery", variants: [{ sku: "KPV5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "KPV10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "L-Carnitine": { key: "lcarnitine", category: "cutting", variants: [{ sku: "LC200", label: "200 MG", dosage_value: 200, dosage_unit: "MG", price: null, stock: 0 }, { sku: "LC500", label: "500 MG", dosage_value: 500, dosage_unit: "MG", price: null, stock: 0 }, { sku: "LC1200", label: "1200 MG", dosage_value: 1200, dosage_unit: "MG", price: null, stock: 0 }] },
  "Lemon Bottle": { key: "lemonbottle", category: "estetica", variants: [{ sku: "LB10", label: "10 ML", dosage_value: 10, dosage_unit: "ML", price: null, stock: 0 }] },
  "Mazdutide": { key: "mazdutide", category: "glp1", variants: [{ sku: "MDT5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MDT10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MDT20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }] },
  "Melanotan I": { key: "mt1", category: "hormonal", variants: [{ sku: "MTI5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MTI10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Melanotan II": { key: "mt2", category: "hormonal", variants: [{ sku: "MTII5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MTII10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Melatonin": { key: "melatonin", category: "sono", variants: [{ sku: "MEL10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MEL15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }] },
  "MOTS-C": { key: "motsc", category: "longevidade", variants: [{ sku: "MOT10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MOT20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MOT30", label: "30 MG", dosage_value: 30, dosage_unit: "MG", price: null, stock: 0 }, { sku: "MOT40", label: "40 MG", dosage_value: 40, dosage_unit: "MG", price: null, stock: 0 }] },
  "NAD+": { key: "nad", category: "longevidade", variants: [{ sku: "NAD100", label: "100 MG", dosage_value: 100, dosage_unit: "MG", price: null, stock: 0 }, { sku: "NAD250", label: "250 MG", dosage_value: 250, dosage_unit: "MG", price: null, stock: 0 }, { sku: "NAD500", label: "500 MG", dosage_value: 500, dosage_unit: "MG", price: null, stock: 0 }, { sku: "NAD750", label: "750 MG", dosage_value: 750, dosage_unit: "MG", price: null, stock: 0 }, { sku: "NAD1000", label: "1000 MG", dosage_value: 1000, dosage_unit: "MG", price: null, stock: 0 }] },
  "PE-22-28": { key: "pe2228", category: "cognitivo", variants: [{ sku: "PE5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "PE10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Pinealon": { key: "pinealon", category: "bioreguladores", variants: [{ sku: "PN5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "PN10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "PN20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }] },
  "PT-141": { key: "pt141", category: "hormonal", variants: [{ sku: "PT10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Retatrutide": { key: "retatrutide", category: "glp1", variants: [{ sku: "RT15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }, { sku: "RT30", label: "30 MG", dosage_value: 30, dosage_unit: "MG", price: null, stock: 0 }, { sku: "RT60", label: "60 MG", dosage_value: 60, dosage_unit: "MG", price: null, stock: 0 }, { sku: "RT100", label: "100 MG", dosage_value: 100, dosage_unit: "MG", price: null, stock: 0 }] },
  "Selank": { key: "selank", category: "cognitivo", variants: [{ sku: "SLK5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SLK10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Semax": { key: "semax", category: "cognitivo", variants: [{ sku: "SMX5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SMX10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Sermorelin": { key: "sermorelin", category: "bulking", variants: [{ sku: "SRM2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SRM5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SRM10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SRM15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }] },
  "SLU-PP-332": { key: "slupp", category: "cutting", variants: [{ sku: "SLU5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SLU10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Snap-8": { key: "snap8", category: "estetica", variants: [{ sku: "SNP5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SNP10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SNP100", label: "100 MG", dosage_value: 100, dosage_unit: "MG", price: null, stock: 0 }] },
  "SS-31": { key: "ss31", category: "longevidade", variants: [{ sku: "SS5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SS10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SS20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SS50", label: "50 MG", dosage_value: 50, dosage_unit: "MG", price: null, stock: 0 }] },
  "TB-500": { key: "tb500", category: "recovery", variants: [{ sku: "TB2", label: "2 MG", dosage_value: 2, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TB5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TB10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TB20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }] },
  "Tesamorelin": { key: "tesamorelin", category: "bulking", variants: [{ sku: "TESA5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TESA10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TESA15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TESA20", label: "20 MG", dosage_value: 20, dosage_unit: "MG", price: null, stock: 0 }] },
  "Tirzepatide": { key: "tirzepatide", category: "glp1", variants: [{ sku: "TR15", label: "15 MG", dosage_value: 15, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TR30", label: "30 MG", dosage_value: 30, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TR60", label: "60 MG", dosage_value: 60, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TR100", label: "100 MG", dosage_value: 100, dosage_unit: "MG", price: null, stock: 0 }] },
  "Semaglutide": { key: "semaglutide", category: "glp1", variants: [{ sku: "SEM5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "SEM10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "Epithalon": { key: "epithalon", category: "longevidade", variants: [{ sku: "EP5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "EP10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }, { sku: "EP50", label: "50 MG", dosage_value: 50, dosage_unit: "MG", price: null, stock: 0 }] },
  "TA-1": { key: "ta1", category: "imune", variants: [{ sku: "TA5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "TA10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "LL-37": { key: "ll37", category: "imune", variants: [{ sku: "LL5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }, { sku: "LL10", label: "10 MG", dosage_value: 10, dosage_unit: "MG", price: null, stock: 0 }] },
  "VIP": { key: "vip", category: "imune", variants: [{ sku: "VIP5", label: "5 MG", dosage_value: 5, dosage_unit: "MG", price: null, stock: 0 }] },
  "Glutathione": { key: "glutathione", category: "longevidade", variants: [{ sku: "GLU500", label: "500 MG", dosage_value: 500, dosage_unit: "MG", price: null, stock: 0 }, { sku: "GLU1200", label: "1200 MG", dosage_value: 1200, dosage_unit: "MG", price: null, stock: 0 }] },
};
