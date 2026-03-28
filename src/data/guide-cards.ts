// Auto-generated from original AURA site — DO NOT EDIT MANUALLY

export interface GuideCard {
  cats: string;
  modalId: string;
  name: string;
  badges: string[];
  tagline: string;
  tags: string[];
  doseLbl: string;
  doseVal: string;
  section?: string | null;
}

export interface GuideSection {
  id: string;
  label: string;
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    "id": "sec-recovery",
    "label": "Recuperação e Estética"
  },
  {
    "id": "sec-gh",
    "label": "GH e Performance"
  },
  {
    "id": "sec-cutting",
    "label": "Emagrecimento e Cutting"
  },
  {
    "id": "sec-glp1",
    "label": "GLP-1 e Metabólicos"
  },
  {
    "id": "sec-cognitivo",
    "label": "Cognitivo e Neurológico"
  },
  {
    "id": "sec-sono",
    "label": "Sono e Recuperação Noturna"
  },
  {
    "id": "sec-imune",
    "label": "Imunidade e Longevidade"
  },
  {
    "id": "sec-antiaging",
    "label": "Anti-Aging e Longevidade Celular"
  },
  {
    "id": "sec-hormonal",
    "label": "Hormonal e Sexual"
  },
  {
    "id": "sec-bioreguladores",
    "label": "Bioreguladores Russos (Khavinson Peptides)"
  },
  {
    "id": "sec-lipo",
    "label": "Lipo Blends e Estética"
  },
  {
    "id": "sec-estetica",
    "label": "Estética e Bem-Estar"
  },
  {
    "id": "sec-suprimentos",
    "label": "Suprimentos e Solventes"
  }
];

export const SECTION_CATEGORY_MAP: Record<string, string> = {
  "sec-recovery": "recovery",
  "sec-gh": "bulking",
  "sec-cutting": "cutting",
  "sec-glp1": "glp1",
  "sec-cognitivo": "cognitivo",
  "sec-sono": "sono",
  "sec-imune": "imune",
  "sec-antiaging": "longevidade",
  "sec-hormonal": "hormonal",
  "sec-bioreguladores": "bioreguladores",
  "sec-lipo": "blends",
  "sec-estetica": "estetica",
  "sec-suprimentos": "suprimentos",
};

export const GUIDE_CARDS: GuideCard[] = [
  {
    "cats": "recovery bulking",
    "modalId": "bpc157",
    "name": "BPC-157",
    "badges": [
      "Recovery",
      "Bulking"
    ],
    "tagline": "O peptídeo de reparo por excelência — tendões, ligamentos, intestino e sistema nervoso.",
    "tags": [
      "Tendões",
      "Intestino",
      "Anti-inflamatório"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 – 500 mcg/dia",
    "section": null
  },
  {
    "cats": "recovery bulking",
    "modalId": "tb500",
    "name": "TB-500",
    "badges": [
      "Recovery"
    ],
    "tagline": "Regeneração profunda sistêmica — vascularização, reparo muscular e mobilidade.",
    "tags": [
      "Angiogênese",
      "Reparo muscular",
      "Mobilidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 – 5 mg/semana",
    "section": null
  },
  {
    "cats": "recovery bulking",
    "modalId": "bpc_tb",
    "name": "BPC-157 + TB-500",
    "badges": [
      "Recovery",
      "Bulking"
    ],
    "tagline": "O combo clássico de reparo — sinergia máxima para lesões e recuperação atlética.",
    "tags": [
      "Combo",
      "Lesões",
      "Regeneração"
    ],
    "doseLbl": "Disponível em",
    "doseVal": "5+5 / 10+10 / 15+15 mg",
    "section": null
  },
  {
    "cats": "recovery estetica",
    "modalId": "ghkcu",
    "name": "GHK-Cu",
    "badges": [
      "Recovery",
      "Estética"
    ],
    "tagline": "Peptídeo de cobre clássico — colágeno, elastina, cicatrização e rejuvenescimento.",
    "tags": [
      "Colágeno",
      "Anti-aging",
      "Cicatrização"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 4 mg/dia",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery estetica",
    "modalId": "ahkcu",
    "name": "AHK-Cu",
    "badges": [
      "Recovery",
      "Estética"
    ],
    "tagline": "Análogo do GHK-Cu focado em crescimento capilar e regeneração folicular.",
    "tags": [
      "Cabelo",
      "Folículo",
      "Crescimento capilar"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 mg (frasco)",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery imune",
    "modalId": "kpv",
    "name": "KPV",
    "badges": [
      "Recovery",
      "Imune"
    ],
    "tagline": "Tripeptídeo anti-inflamatório potente — colites, dermatites e inflamação intestinal.",
    "tags": [
      "Intestino",
      "Colite",
      "MC1R"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "150 – 750 mcg/dia",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery imune",
    "modalId": "ara290",
    "name": "ARA-290",
    "badges": [
      "Recovery",
      "Imune"
    ],
    "tagline": "Mimético da eritropoetina sem efeito hematopoiético — neuroproteção e reparo tecidual.",
    "tags": [
      "Neuroproteção",
      "Neuropatia",
      "Anti-inflamatório"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery imune",
    "modalId": "ll37",
    "name": "LL-37",
    "badges": [
      "Imune",
      "Recovery"
    ],
    "tagline": "Peptídeo antimicrobiano endógeno — combate biofilmes e modula imunidade inata.",
    "tags": [
      "Antimicrobiano",
      "Biofilmes",
      "Imunidade inata"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "10 – 100 mcg",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery estetica",
    "modalId": "ghkbasic",
    "name": "GHK Basic",
    "badges": [
      "Estética"
    ],
    "tagline": "Versão base do GHK sem cobre — reparo de colágeno e aplicações dérmicas tópicas.",
    "tags": [
      "Colágeno",
      "Dérmico",
      "Capilar"
    ],
    "doseLbl": "Uso",
    "doseVal": "Tópico / SC",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery estetica blends",
    "modalId": "glow",
    "name": "GLOW Blend",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "GHK-Cu + TB-500 + BPC-157 — rejuvenescimento e regeneração em um blend premium.",
    "tags": [
      "Blend",
      "Pele",
      "Anti-aging"
    ],
    "doseLbl": "Disponível em",
    "doseVal": "20 / 35 / 50 mg GHK-Cu",
    "section": "sec-recovery"
  },
  {
    "cats": "recovery estetica blends imune",
    "modalId": "klow",
    "name": "KLOW Blend",
    "badges": [
      "Estética",
      "Imune"
    ],
    "tagline": "GLOW + KPV — versão aprimorada com modulação anti-inflamatória profunda.",
    "tags": [
      "Blend",
      "Anti-inflamatório",
      "Pele"
    ],
    "doseLbl": "Composição",
    "doseVal": "GHK 50 + TB 10 + BPC 10 + KPV 10",
    "section": "sec-recovery"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "ipamorelin",
    "name": "Ipamorelin",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "O GHRP mais seletivo e seguro — pulso de GH sem cortisol ou prolactina elevados.",
    "tags": [
      "GH",
      "Sono",
      "Regeneração"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 500 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "cjcnodac",
    "name": "CJC-1295 (no DAC)",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "GHRH análogo de curta duração — pulsos fisiológicos de GH múltiplos por dia.",
    "tags": [
      "GHRH",
      "GH pulsátil",
      "Recovery"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "200 – 300 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "cjcdac",
    "name": "CJC-1295 (with DAC)",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "GHRH de longa duração — uma injeção semanal mantém estímulo de GH por 7-10 dias.",
    "tags": [
      "GHRH longo",
      "Semanal",
      "GH"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 4 mg/semana",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal sono",
    "modalId": "cjcipa",
    "name": "CJC-1295 + Ipamorelin",
    "badges": [
      "Bulking",
      "Sono"
    ],
    "tagline": "O combo GH clássico — GHRH + GHRP em sinergia para máxima liberação de GH.",
    "tags": [
      "Combo",
      "GH máximo",
      "Composição corporal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "200/200 mcg por dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "ghrp2",
    "name": "GHRP-2",
    "badges": [
      "Bulking"
    ],
    "tagline": "Secretagogo de GH potente — alternativa clássica ao Ipamorelin com mais força.",
    "tags": [
      "GH",
      "Secretagogo",
      "Clássico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 300 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "ghrp6",
    "name": "GHRP-6",
    "badges": [
      "Bulking"
    ],
    "tagline": "O GHRP pioneiro — estímulo robusto de GH, com efeito adicional de aumento de apetite.",
    "tags": [
      "GH",
      "Apetite",
      "Clássico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 300 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "hexarelin",
    "name": "Hexarelin",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "O GHRP mais potente — pico máximo de GH, ideal para ciclos curtos e intensos.",
    "tags": [
      "GH máximo",
      "Cardioprotegido",
      "Intensivo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 200 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal cutting",
    "modalId": "sermorelin",
    "name": "Sermorelin",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "GHRH análogo natural — reposição hormonal de GH com perfil fisiológico suave.",
    "tags": [
      "GHRH natural",
      "Sono",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "200 – 500 mcg/noite",
    "section": "sec-gh"
  },
  {
    "cats": "bulking cutting hormonal",
    "modalId": "tesamorelin",
    "name": "Tesamorelin",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "GHRH aprovado pelo FDA — redução comprovada de gordura visceral e abdominal profunda.",
    "tags": [
      "Gordura visceral",
      "Metabólico",
      "FDA aprovado"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 2 mg/noite",
    "section": "sec-gh"
  },
  {
    "cats": "bulking cutting hormonal sono",
    "modalId": "tesaipa",
    "name": "Tesamorelin + Ipamorelin",
    "badges": [
      "Cutting",
      "Bulking"
    ],
    "tagline": "GHRH premium + GHRP seletivo — recomposição corporal avançada e anti-aging.",
    "tags": [
      "Combo",
      "Recomposição",
      "GH"
    ],
    "doseLbl": "Combo",
    "doseVal": "Noturno",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "hgh191",
    "name": "HGH 191AA",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "Hormônio do crescimento recombinante — anabolismo máximo, recuperação e anti-aging.",
    "tags": [
      "GH direto",
      "Anabolismo",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 – 6 UI/dia",
    "section": "sec-gh"
  },
  {
    "cats": "bulking hormonal",
    "modalId": "igf1lr3",
    "name": "IGF-1 LR3",
    "badges": [
      "Bulking"
    ],
    "tagline": "Fator de crescimento anabólico direto — hipertrofia celular e regeneração muscular intensa.",
    "tags": [
      "Anabolismo",
      "IGF-1",
      "Hipertrofia"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "20 – 120 mcg/dia",
    "section": "sec-gh"
  },
  {
    "cats": "bulking",
    "modalId": "igf1des",
    "name": "IGF-1 DES",
    "badges": [
      "Bulking"
    ],
    "tagline": "IGF-1 de ação local — anabolismo direcionado ao músculo específico pós-treino.",
    "tags": [
      "Anabolismo local",
      "Satélites",
      "Pós-treino"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "50 – 150 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking",
    "modalId": "mgf",
    "name": "MGF",
    "badges": [
      "Bulking"
    ],
    "tagline": "Isoforma mecanoativa do IGF-1 — ativa células satélite pós-exercício para hipertrofia.",
    "tags": [
      "Células satélite",
      "Pós-exercício",
      "Hipertrofia"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 300 mcg/dose",
    "section": "sec-gh"
  },
  {
    "cats": "bulking recovery",
    "modalId": "pegmgf",
    "name": "PEG-MGF",
    "badges": [
      "Bulking",
      "Recovery"
    ],
    "tagline": "MGF peguilado — meia-vida prolongada para regeneração muscular sistêmica.",
    "tags": [
      "MGF longo",
      "Regeneração",
      "Sistêmico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 400 mcg",
    "section": "sec-gh"
  },
  {
    "cats": "bulking",
    "modalId": "follistatin",
    "name": "Follistatin 344",
    "badges": [
      "Bulking"
    ],
    "tagline": "Inibidor da miostatina — libera o limite genético de crescimento muscular.",
    "tags": [
      "Anti-miostatina",
      "Hipertrofia",
      "Força"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "50 – 300 mcg/dia",
    "section": "sec-gh"
  },
  {
    "cats": "bulking cutting",
    "modalId": "gdf8",
    "name": "GDF-8 (Anti-Miostatina)",
    "badges": [
      "Bulking",
      "Cutting"
    ],
    "tagline": "Inibição direta da miostatina — ganho muscular e redução de gordura simultâneos.",
    "tags": [
      "Anti-miostatina",
      "Recomposição",
      "Força"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo personalizado",
    "section": "sec-gh"
  },
  {
    "cats": "bulking",
    "modalId": "ace031",
    "name": "ACE-031",
    "badges": [
      "Bulking"
    ],
    "tagline": "Receptor solúvel de ActRIIB — bloqueia miostatina e GDF-11 para máximo anabolismo.",
    "tags": [
      "ActRIIB",
      "Anti-miostatina",
      "Massa muscular"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 mg/frasco",
    "section": "sec-gh"
  },
  {
    "cats": "cutting",
    "modalId": "aod9604",
    "name": "AOD-9604",
    "badges": [
      "Cutting"
    ],
    "tagline": "Fragmento lipolítico do HGH — queima gordura sem alterar glicose ou IGF-1.",
    "tags": [
      "Lipólise",
      "Sem IGF-1",
      "Estética"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 – 600 mcg/dia",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting",
    "modalId": "hghfrag",
    "name": "HGH Fragment 176-191",
    "badges": [
      "Cutting"
    ],
    "tagline": "Idêntico ao AOD-9604 — fragmento C-terminal do GH com ação lipolítica seletiva.",
    "tags": [
      "Lipólise",
      "GH frag",
      "Gordura"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 – 500 mcg/dia",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting",
    "modalId": "adipotide",
    "name": "Adipotide (FTPP)",
    "badges": [
      "Cutting"
    ],
    "tagline": "Anti-angiogênico de tecido adiposo — mata células de gordura por corte de suprimento.",
    "tags": [
      "Apoptose de gordura",
      "Anti-angiogênico",
      "Lipólise"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo específico",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting longevidade",
    "modalId": "aminomq",
    "name": "5-Amino-1MQ",
    "badges": [
      "Cutting",
      "Longevidade"
    ],
    "tagline": "Inibidor de NNMT — aumenta NAD⁺, ativa mitocôndria e reduz gordura branca.",
    "tags": [
      "NAD⁺",
      "NNMT",
      "Mitocôndria"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "150 – 500 mcg 2x/dia",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting longevidade",
    "modalId": "aicar",
    "name": "AICAR",
    "badges": [
      "Cutting",
      "Longevidade"
    ],
    "tagline": "Ativador de AMPK — simula os benefícios do exercício em nível celular e metabólico.",
    "tags": [
      "AMPK",
      "Exercício mimético",
      "Endurance"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "50 – 100 mg/dia",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting longevidade",
    "modalId": "slupp",
    "name": "SLU-PP-332",
    "badges": [
      "Cutting",
      "Longevidade"
    ],
    "tagline": "Agonista de ERRα/γ — mimetiza endurance e ativa genes de longevidade mitocondrial.",
    "tags": [
      "ERRα",
      "Endurance",
      "Mitocôndria"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg/dia",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting recovery estetica",
    "modalId": "tbfrag",
    "name": "TB-500 (Frag)",
    "badges": [
      "Recovery"
    ],
    "tagline": "Fragmento ativo do TB-500 — ação mais direcionada para reparo de tecido conjuntivo.",
    "tags": [
      "Fragmento",
      "Tendão",
      "Reparo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo específico",
    "section": "sec-cutting"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "semaglutide",
    "name": "Semaglutide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "GLP-1 agonista semanal — o emagrecimento mais estudado e comprovado da atualidade.",
    "tags": [
      "GLP-1",
      "Saciedade",
      "Glicemia"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "0,25 – 2,4 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "tirzepatide",
    "name": "Tirzepatide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Duplo agonista GIP + GLP-1 — emagrecimento superior ao Semaglutide em estudos.",
    "tags": [
      "GIP + GLP-1",
      "Diabetes",
      "Emagrecimento"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2,5 – 15 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "retatrutide",
    "name": "Retatrutide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Triplo agonista GLP-1 + GIP + Glucagon — próxima geração do emagrecimento metabólico.",
    "tags": [
      "Triplo agonista",
      "Gordura máxima",
      "Nova geração"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 12 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "cagrilintide",
    "name": "Cagrilintide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Análogo de longa duração da amilina — saciedade potente e controle glicêmico.",
    "tags": [
      "Amilina",
      "Saciedade",
      "Semanal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 – 20 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "cagrisema",
    "name": "CagriSema (Combo)",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Cagrilintide + Semaglutide — o combo incretínico mais potente da atualidade.",
    "tags": [
      "Combo GLP-1",
      "Dupla saciedade",
      "Metabólico"
    ],
    "doseLbl": "Combo",
    "doseVal": "Semanal",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "retacagri",
    "name": "Retatrutide + Cagrilintide",
    "badges": [
      "Cutting"
    ],
    "tagline": "Combinação triplo agonista + amilina — emagrecimento de nova geração absoluto.",
    "tags": [
      "Combo avançado",
      "Máximo emagrecimento"
    ],
    "doseLbl": "Combo",
    "doseVal": "Semanal",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "liraglutide",
    "name": "Liraglutide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "GLP-1 diário clássico — controle de apetite e glicemia com perfil bem estabelecido.",
    "tags": [
      "GLP-1 diário",
      "Saciedade",
      "Clássico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "0,6 – 3 mg/dia",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "dulaglutide",
    "name": "Dulaglutide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "GLP-1 semanal de segunda geração — emagrecimento e controle glicêmico duradouros.",
    "tags": [
      "GLP-1 semanal",
      "Diabetes T2",
      "Saciedade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "0,75 – 1,5 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "mazdutide",
    "name": "Mazdutide",
    "badges": [
      "Cutting"
    ],
    "tagline": "Biagonista GLP-1 + Glucagon — queima de gordura aumentada pela via glucagon.",
    "tags": [
      "GLP-1 + GCG",
      "Biagonista",
      "Termogênico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 20 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "survodutide",
    "name": "Survodutide",
    "badges": [
      "Cutting"
    ],
    "tagline": "Biagonista de próxima geração — máxima termogênese e perda de gordura combinadas.",
    "tags": [
      "Biagonista",
      "NASH",
      "Emagrecimento"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg/semana",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "pramlintide",
    "name": "Pramlintide",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Análogo da amilina — retarda o esvaziamento gástrico e controla saciedade pós-refeição.",
    "tags": [
      "Amilina",
      "Pós-prandial",
      "Glicemia"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "30 – 120 mcg/refeição",
    "section": "sec-glp1"
  },
  {
    "cats": "cutting hormonal glp1",
    "modalId": "glp1",
    "name": "GLP-1",
    "badges": [
      "Cutting",
      "Hormonal"
    ],
    "tagline": "Peptídeo nativo GLP-1 — saciedade, glicemia e proteção cardiovascular naturais.",
    "tags": [
      "GLP-1 nativo",
      "Saciedade",
      "Cardio"
    ],
    "doseLbl": "Forma",
    "doseVal": "Peptídeo nativo",
    "section": "sec-glp1"
  },
  {
    "cats": "cognitivo",
    "modalId": "semax",
    "name": "Semax",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "Nootrópico russo — BDNF, dopamina e foco sem efeito ansiolítico excessivo.",
    "tags": [
      "BDNF",
      "Dopamina",
      "Memória"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 – 1000 mcg/dia",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo",
    "modalId": "nasemax",
    "name": "NA Semax Amidate",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "Semax N-acetilado e amidado — maior estabilidade e potência neurotrófica.",
    "tags": [
      "BDNF potenciado",
      "Estável",
      "Nootrópico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 500 mcg/dia",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo sono",
    "modalId": "selank",
    "name": "Selank",
    "badges": [
      "Cognitivo",
      "Sono"
    ],
    "tagline": "Ansiolítico nootrópico — GABA, foco e memória sem sedação ou dependência.",
    "tags": [
      "GABA",
      "Ansiedade",
      "Foco"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 – 1000 mcg/dia",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo sono",
    "modalId": "naselank",
    "name": "NA Selank Amidate",
    "badges": [
      "Cognitivo",
      "Sono"
    ],
    "tagline": "Selank modificado — efeito ansiolítico mais sustentado e biodisponibilidade superior.",
    "tags": [
      "Ansiolítico",
      "Estável",
      "GABA"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 500 mcg/dia",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo sono",
    "modalId": "semaxselank",
    "name": "Semax + Selank (Combo)",
    "badges": [
      "Cognitivo",
      "Sono"
    ],
    "tagline": "O protocolo intelectual — foco + calma em sinergia para performance cognitiva máxima.",
    "tags": [
      "Combo",
      "Foco + Calma",
      "Empresário"
    ],
    "doseLbl": "Combo",
    "doseVal": "Intranasal AM/PM",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo",
    "modalId": "pe2228",
    "name": "PE-22-28",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "Mimético de BDNF — antidepressivo e neuroprotetor com ação rápida via TrkB.",
    "tags": [
      "BDNF mimético",
      "TrkB",
      "Antidepressivo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "500 mcg – 1 mg",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo",
    "modalId": "p21adam",
    "name": "P21 Adamantane",
    "badges": [
      "Cognitivo",
      "Recovery"
    ],
    "tagline": "CNTF mimético com adamantane — neurogênese, plasticidade sináptica e reparo de cartilagem.",
    "tags": [
      "CNTF",
      "Neurogênese",
      "Cartilagem"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo específico",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo",
    "modalId": "p21",
    "name": "P21 (sem Adamantane)",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "CNTF mimético base — neuroproteção e suporte cognitivo sem o grupo adamantane.",
    "tags": [
      "CNTF",
      "Neuroproteção",
      "Sinapse"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo específico",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo",
    "modalId": "adamax",
    "name": "Adamax",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "Análogo do Semax com maior estabilidade — clareza mental, foco e resiliência neural.",
    "tags": [
      "Nootrópico",
      "BDNF",
      "TrkB"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo longevidade",
    "modalId": "cerebrolysin",
    "name": "Cerebrolysin",
    "badges": [
      "Cognitivo",
      "Longevidade"
    ],
    "tagline": "Hidrolisado de proteínas neurais — neuroproteção avançada e suporte em declínio cognitivo.",
    "tags": [
      "Alzheimer",
      "BDNF",
      "Neuroproteção"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo IV/IM",
    "section": "sec-cognitivo"
  },
  {
    "cats": "cognitivo sono",
    "modalId": "oxytocin",
    "name": "Oxytocin",
    "badges": [
      "Cognitivo",
      "Sono"
    ],
    "tagline": "Hormônio do vínculo — conexão social, redução de ansiedade e bem-estar emocional.",
    "tags": [
      "Social",
      "Ansiedade",
      "Humor"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "10 – 40 UI",
    "section": "sec-cognitivo"
  },
  {
    "cats": "sono cognitivo",
    "modalId": "dsip",
    "name": "DSIP",
    "badges": [
      "Sono"
    ],
    "tagline": "O indutor fisiológico do sono profundo — arquitetura restauradora e redução de despertares.",
    "tags": [
      "Sono profundo",
      "Delta",
      "Circadiano"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 mcg – 1 mg/noite",
    "section": "sec-sono"
  },
  {
    "cats": "sono",
    "modalId": "relaxpm",
    "name": "Relaxation PM Blend",
    "badges": [
      "Sono"
    ],
    "tagline": "Blend noturno de peptídeos — indução do sono, GABA e recuperação hormonal máxima.",
    "tags": [
      "Blend noturno",
      "GABA",
      "Recuperação"
    ],
    "doseLbl": "Uso",
    "doseVal": "45 min antes de dormir",
    "section": "sec-sono"
  },
  {
    "cats": "sono cognitivo",
    "modalId": "gabasleep",
    "name": "GABA Sleep Blend",
    "badges": [
      "Sono"
    ],
    "tagline": "Formulação GABAérgica para sono — indutor e mantenedor do sono profundo delta.",
    "tags": [
      "GABA",
      "Sono delta",
      "Blend"
    ],
    "doseLbl": "Uso",
    "doseVal": "Pré-sono",
    "section": "sec-sono"
  },
  {
    "cats": "imune longevidade",
    "modalId": "ta1",
    "name": "Thymosin Alpha-1",
    "badges": [
      "Imune",
      "Longevidade"
    ],
    "tagline": "O maestro da imunidade — ativa NK, T-CD8 e defesas antivirais profundas.",
    "tags": [
      "Imunidade tímica",
      "Antiviral",
      "NK cells"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "300 mcg – 2 mg",
    "section": "sec-imune"
  },
  {
    "cats": "imune longevidade",
    "modalId": "thymalin",
    "name": "Thymalin",
    "badges": [
      "Imune",
      "Longevidade"
    ],
    "tagline": "Bioregulador do timo — restaura função tímica e imunidade com o envelhecimento.",
    "tags": [
      "Timo",
      "Bioregulador",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 20 mg/ciclo",
    "section": "sec-imune"
  },
  {
    "cats": "imune longevidade",
    "modalId": "vip",
    "name": "VIP (Vasoactive Intestinal Peptide)",
    "badges": [
      "Imune",
      "Cognitivo"
    ],
    "tagline": "Neuropeptídeo anti-inflamatório sistêmico — pulmão, intestino, imunidade e neuroproteção.",
    "tags": [
      "MCAS",
      "Pulmão",
      "Anti-inflamatório"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg",
    "section": "sec-imune"
  },
  {
    "cats": "imune longevidade",
    "modalId": "epo",
    "name": "EPO (Eritropoetina)",
    "badges": [
      "Imune",
      "Bulking"
    ],
    "tagline": "Hormônio hematopoiético — aumenta hematócrito e capacidade aeróbica para endurance.",
    "tags": [
      "Hematócrito",
      "Endurance",
      "VO2max"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "3000 – 5000 IU",
    "section": "sec-imune"
  },
  {
    "cats": "imune longevidade",
    "modalId": "immuneblend",
    "name": "Immunological Enhancement",
    "badges": [
      "Imune"
    ],
    "tagline": "Blend imunológico avançado — modulação completa para defesa e equilíbrio imune.",
    "tags": [
      "Blend",
      "Imunomodulação",
      "Proteção"
    ],
    "doseLbl": "Forma",
    "doseVal": "Blend especializado",
    "section": "sec-imune"
  },
  {
    "cats": "longevidade sono imune",
    "modalId": "epithalon",
    "name": "Epithalon (Epitalon)",
    "badges": [
      "Longevidade",
      "Sono"
    ],
    "tagline": "Ativador de telomerase — anti-aging, melatonina e ritmo circadiano restaurados.",
    "tags": [
      "Telomerase",
      "Pineal",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 – 10 mg/dia (20 dias/ano)",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "naepithalon",
    "name": "N-Acetyl Epithalon Amidate",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Epithalon modificado — maior biodisponibilidade e estabilidade que a versão original.",
    "tags": [
      "Telomerase",
      "Estável",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 10 mg/dia",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "foxo4dri",
    "name": "FOXO4-DRI",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Peptídeo senolítico — elimina células senescentes que aceleram o envelhecimento.",
    "tags": [
      "Senolítico",
      "Senescência",
      "Rejuvenescimento"
    ],
    "doseLbl": "Uso",
    "doseVal": "Ciclo intermitente",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "foxo4",
    "name": "FOXO4",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Fator de transcrição da longevidade — regulação de FOXO para saúde celular prolongada.",
    "tags": [
      "FOXO",
      "Longevidade",
      "Celular"
    ],
    "doseLbl": "Uso",
    "doseVal": "Experimental",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade imune",
    "modalId": "ss31",
    "name": "SS-31 (Elamipretide)",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Peptídeo mitocondrial — repara membrana interna, reduz ROS e reverte fadiga celular.",
    "tags": [
      "Mitocôndria",
      "ROS",
      "Fadiga crônica"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 – 20 mg/dia",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade cutting",
    "modalId": "motsc",
    "name": "MOTS-C",
    "badges": [
      "Longevidade",
      "Cutting"
    ],
    "tagline": "Peptídeo mitocondrial da era moderna — AMPK, sensibilidade à insulina e longevidade.",
    "tags": [
      "AMPK",
      "Insulina",
      "Mitocôndria"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 15 mg/semana",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "nad",
    "name": "NAD+",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Coenzima essencial da longevidade — energia celular, reparo de DNA e sirtuínas.",
    "tags": [
      "Sirtuínas",
      "Energia",
      "Reparo DNA"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 – 1000 mg",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "humanin",
    "name": "Humanin",
    "badges": [
      "Longevidade",
      "Cognitivo"
    ],
    "tagline": "Peptídeo mitocondrial anti-apoptótico — proteção celular e suporte à longevidade cerebral.",
    "tags": [
      "Anti-apoptose",
      "Neuroproteção",
      "Mitocôndria"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5 – 20 mg/semana",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade imune estetica",
    "modalId": "glutathione",
    "name": "Glutathione",
    "badges": [
      "Longevidade",
      "Estética"
    ],
    "tagline": "O antioxidante mestre — desintoxicação, pele luminosa e imunidade celular profunda.",
    "tags": [
      "Antioxidante",
      "Detox",
      "Pele"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "600 – 1200 mg",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade",
    "modalId": "g610",
    "name": "G-610",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Peptídeo de longevidade experimental — modula vias epigenéticas do envelhecimento.",
    "tags": [
      "Epigenética",
      "Longevidade",
      "Experimental"
    ],
    "doseLbl": "Uso",
    "doseVal": "Protocolo específico",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade imune",
    "modalId": "pnc27",
    "name": "PNC-27",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Peptídeo oncológico — induz apoptose em células tumorais via HDM-2 seletivamente.",
    "tags": [
      "Anticâncer",
      "HDM-2",
      "Apoptose seletiva"
    ],
    "doseLbl": "Uso",
    "doseVal": "Experimental",
    "section": "sec-antiaging"
  },
  {
    "cats": "longevidade recovery",
    "modalId": "ptddbm",
    "name": "PTD-DBM",
    "badges": [
      "Longevidade",
      "Recovery"
    ],
    "tagline": "Ativador da via Wnt — regeneração de folículos capilares e tecido epitelial.",
    "tags": [
      "Wnt",
      "Cabelo",
      "Regeneração"
    ],
    "doseLbl": "Uso",
    "doseVal": "Tópico / SC",
    "section": "sec-antiaging"
  },
  {
    "cats": "hormonal",
    "modalId": "hcg",
    "name": "HCG",
    "badges": [
      "Hormonal"
    ],
    "tagline": "Gonadotrofina coriônica — fertilidade masculina, recuperação pós-ciclo e testosterona.",
    "tags": [
      "Fertilidade",
      "PCT",
      "Testosterona"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "500 – 5000 IU",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "hmg",
    "name": "HMG",
    "badges": [
      "Hormonal"
    ],
    "tagline": "Gonadotrofina menopáusica humana — FSH + LH para fertilidade masculina e feminina.",
    "tags": [
      "FSH",
      "LH",
      "Fertilidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "75 – 150 IU",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "gonadorelin",
    "name": "Gonadorelin",
    "badges": [
      "Hormonal"
    ],
    "tagline": "GnRH análogo — restaura eixo hipotálamo-hipófise-gonadal e produção endógena.",
    "tags": [
      "GnRH",
      "Eixo HPT",
      "Recuperação pós-ciclo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Pulsátil",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal estetica",
    "modalId": "pt141",
    "name": "PT-141 (Bremelanotide)",
    "badges": [
      "Hormonal",
      "Estética"
    ],
    "tagline": "Agonista de melanocortina para libido — o único peptídeo aprovado para disfunção sexual.",
    "tags": [
      "Libido",
      "Sexual",
      "FDA aprovado"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 2 mg/uso",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal estetica",
    "modalId": "mt1",
    "name": "Melanotan I",
    "badges": [
      "Estética",
      "Hormonal"
    ],
    "tagline": "Análogo de α-MSH — bronzeamento natural com menor estimulação de libido que MT-II.",
    "tags": [
      "Bronzeamento",
      "α-MSH",
      "Pigmentação"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 mcg – 1 mg/dia",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal estetica",
    "modalId": "mt2",
    "name": "Melanotan II",
    "badges": [
      "Estética",
      "Hormonal"
    ],
    "tagline": "MC1R agonista — bronzeamento intenso, proteção solar e libido aumentada.",
    "tags": [
      "Bronzeamento",
      "Libido",
      "MC1R"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "250 mcg – 1 mg/dia",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "kisspeptin",
    "name": "Kisspeptin-10",
    "badges": [
      "Hormonal"
    ],
    "tagline": "Regulador do eixo reprodutivo — estimula GnRH e pico de LH para fertilidade e libido.",
    "tags": [
      "GnRH",
      "LH",
      "Fertilidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo pulsátil",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "triptorelin",
    "name": "Triptorelin",
    "badges": [
      "Hormonal"
    ],
    "tagline": "GnRH agonista — recuperação pós-ciclo avançada com única injeção, reinicia HPTA.",
    "tags": [
      "PCT",
      "HPTA",
      "Recuperação"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "100 mcg (dose única PCT)",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "alprostadil",
    "name": "Alprostadil",
    "badges": [
      "Hormonal"
    ],
    "tagline": "PGE1 análogo — vasodilatação peniana direta para disfunção erétil refratária.",
    "tags": [
      "PGE1",
      "Ereção",
      "Vasodilatação"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2,5 – 20 mcg",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal",
    "modalId": "dermorphin",
    "name": "Dermorphin",
    "badges": [
      "Hormonal"
    ],
    "tagline": "Opioide peptídico natural — analgesia potente via receptores mu com alta seletividade.",
    "tags": [
      "Analgesia",
      "Opioide",
      "Receptor mu"
    ],
    "doseLbl": "Uso",
    "doseVal": "Protocolo específico",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal recovery estetica",
    "modalId": "hyaluronic",
    "name": "Hyaluronic Acid",
    "badges": [
      "Recovery",
      "Estética"
    ],
    "tagline": "Ácido hialurônico injetável — lubrificação articular, volumização e hidratação dérmica.",
    "tags": [
      "Articulação",
      "Pele",
      "Hidratação"
    ],
    "doseLbl": "Uso",
    "doseVal": "Intra-articular / SC",
    "section": "sec-hormonal"
  },
  {
    "cats": "hormonal recovery",
    "modalId": "teriparatide",
    "name": "Teriparatide",
    "badges": [
      "Hormonal",
      "Recovery"
    ],
    "tagline": "Fragmento do PTH — formação óssea anabólica, osteoporose e fraturas de alto risco.",
    "tags": [
      "PTH",
      "Osso",
      "Osteoporose"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "20 mcg/dia",
    "section": "sec-hormonal"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "vilon",
    "name": "Vilon",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Dipeptídeo do timo — imunomodulação e anti-aging pelo Dr. Khavinson.",
    "tags": [
      "Timo",
      "Khavinson",
      "Imunidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo sazonal",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade sono bioreguladores",
    "modalId": "pinealon",
    "name": "Pinealon",
    "badges": [
      "Longevidade",
      "Sono"
    ],
    "tagline": "Bioregulador da pineal — restaura ritmo circadiano, melatonina e neuroprotege.",
    "tags": [
      "Pineal",
      "Melatonina",
      "Neuroproteção"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo anual",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "livagen",
    "name": "Livagen",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador hepático — restaura função do fígado e metabolismo de lipoproteínas.",
    "tags": [
      "Fígado",
      "Hepático",
      "Lipídeos"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "vesugen",
    "name": "Vesugen",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador vascular — saúde endotelial, elasticidade arterial e longevidade cardiovascular.",
    "tags": [
      "Endotélio",
      "Vascular",
      "Cardiovascular"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "cardiogen",
    "name": "Cardiogen",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Bioregulador cardíaco — suporte ao miocárdio, função cardíaca e longevidade do coração.",
    "tags": [
      "Coração",
      "Miocárdio",
      "Bioregulador"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "bronchogen",
    "name": "Bronchogen",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Bioregulador pulmonar — restaura epitélio brônquico e função respiratória.",
    "tags": [
      "Pulmão",
      "Brônquio",
      "Respiração"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "chonluten",
    "name": "Chonluten",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador brônquico — tripeptídeo pulmonar para saúde respiratória e longevidade.",
    "tags": [
      "Brônquio",
      "Tripeptídeo",
      "Pulmão"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "cartalax",
    "name": "Cartalax",
    "badges": [
      "Longevidade",
      "Recovery"
    ],
    "tagline": "Bioregulador da cartilagem — regenera tecido cartilaginoso e reverte artrose.",
    "tags": [
      "Cartilagem",
      "Artrose",
      "Articulação"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "pancragen",
    "name": "Pancragen",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador pancreático — restaura função das ilhotas de Langerhans e insulina.",
    "tags": [
      "Pâncreas",
      "Insulina",
      "Glicemia"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "crystagen",
    "name": "Crystagen",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador do cristalino — saúde ocular, prevenção de catarata e longevidade visual.",
    "tags": [
      "Olho",
      "Cristalino",
      "Visão"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "testagen",
    "name": "Testagen",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador gonadal masculino — restaura função testicular e produção de androgênios.",
    "tags": [
      "Testículo",
      "Testosterona",
      "Hormonal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "prostamax",
    "name": "Prostamax",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador prostático — saúde da próstata, fluxo urinário e longevidade masculina.",
    "tags": [
      "Próstata",
      "Masculino",
      "Urinário"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "retinalamin",
    "name": "Retinalamin",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador retiniano — restaura retina, melhora acuidade visual e previne degeneração.",
    "tags": [
      "Retina",
      "Visão",
      "Degeneração"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "normoftal",
    "name": "Normoftal",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador ocular — saúde dos tecidos oculares e proteção contra envelhecimento visual.",
    "tags": [
      "Ocular",
      "Saúde visual",
      "Longevidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "endoluten",
    "name": "Endoluten",
    "badges": [
      "Longevidade",
      "Sono"
    ],
    "tagline": "Bioregulador epifisário — restaura produção de melatonina e ritmo circadiano.",
    "tags": [
      "Epífise",
      "Melatonina",
      "Circadiano"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "ovagen",
    "name": "Ovagen",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador ovariano — restaura função ovariana, ciclo e saúde hormonal feminina.",
    "tags": [
      "Ovário",
      "Hormônio feminino",
      "Ciclo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "glandokort",
    "name": "Glandokort",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador adrenal — restaura função da glândula suprarrenal e eixo do estresse.",
    "tags": [
      "Suprarrenal",
      "Cortisol",
      "Estresse"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "gotratix",
    "name": "Gotratix",
    "badges": [
      "Longevidade",
      "Bulking"
    ],
    "tagline": "Bioregulador muscular — mantém massa magra no envelhecimento, anti-sarcopenia.",
    "tags": [
      "Sarcopenia",
      "Massa muscular",
      "Envelhecimento"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "sigumir",
    "name": "Sigumir",
    "badges": [
      "Longevidade",
      "Recovery"
    ],
    "tagline": "Bioregulador osteoarticular — osso, cartilagem e articulações com abordagem sistêmica.",
    "tags": [
      "Osso",
      "Articulação",
      "Cartilagem"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "svetinorm",
    "name": "Svetinorm",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador hepático — restaura função do fígado e metabolismo lipídico avançado.",
    "tags": [
      "Fígado",
      "Metabolismo",
      "Lipídeos"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "thyreogen",
    "name": "Thyreogen",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador da tireoide — restaura função tireoidiana e metabolismo basal.",
    "tags": [
      "Tireoide",
      "T3/T4",
      "Metabolismo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "ventfort",
    "name": "Ventfort",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador vascular — restaura parede dos vasos e circulação periférica.",
    "tags": [
      "Vasos",
      "Circulação",
      "Aterosclerose"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "vesilut",
    "name": "Vesilut",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador renal — restaura função dos rins e saúde do sistema urinário.",
    "tags": [
      "Rim",
      "Renal",
      "Urinário"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "pielotax",
    "name": "Pielotax",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Bioregulador renal tubular — proteção dos néfrons e função de filtração renal.",
    "tags": [
      "Néfron",
      "Filtração",
      "Renal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "vladonix",
    "name": "Vladonix",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Bioregulador tímico peptídico — imunomodulação anti-aging de ação sistêmica.",
    "tags": [
      "Timo",
      "Imunidade",
      "Anti-aging"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade bioreguladores",
    "modalId": "bonomarlot",
    "name": "Bonomarlot",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Bioregulador da medula óssea — hematopoiese e produção celular sanguínea.",
    "tags": [
      "Medula",
      "Hematopoiese",
      "Sangue"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "bonothyrk",
    "name": "Bonothyrk",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador da paratireoide — regulação do cálcio, osso e metabolismo mineral.",
    "tags": [
      "Paratireoide",
      "Cálcio",
      "Osso"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "libidon",
    "name": "Libidon",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador prostático e de libido — saúde sexual masculina e função gonadal.",
    "tags": [
      "Próstata",
      "Libido",
      "Sexual"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "testoluten",
    "name": "Testoluten",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador gonadal avançado — restaura função testicular e produção de androgênios.",
    "tags": [
      "Testículo",
      "Androgênio",
      "Hormonal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade hormonal bioreguladores",
    "modalId": "zhenoluten",
    "name": "Zhenoluten",
    "badges": [
      "Longevidade",
      "Hormonal"
    ],
    "tagline": "Bioregulador ovariano feminino — saúde hormonal e ciclo reprodutivo feminino.",
    "tags": [
      "Ovário",
      "Feminino",
      "Ciclo"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "longevidade imune bioreguladores",
    "modalId": "cortagen",
    "name": "Cortagen",
    "badges": [
      "Longevidade",
      "Cognitivo"
    ],
    "tagline": "Bioregulador do córtex cerebral — neuroproteção, cognição e saúde do SNC.",
    "tags": [
      "Córtex",
      "SNC",
      "Neuroproteção"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Ciclo específico",
    "section": "sec-bioreguladores"
  },
  {
    "cats": "cutting estetica blends",
    "modalId": "lipob",
    "name": "Lipo-B",
    "badges": [
      "Cutting",
      "Estética"
    ],
    "tagline": "Blend lipotrófico com B12 — queima de gordura e energia aumentada combinadas.",
    "tags": [
      "Lipotrófico",
      "B12",
      "Energia"
    ],
    "doseLbl": "Forma",
    "doseVal": "Injetável",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting estetica blends",
    "modalId": "lipoc",
    "name": "Lipo-C",
    "badges": [
      "Cutting",
      "Estética"
    ],
    "tagline": "Blend lipotrófico premium — carnitina, colina e metionina para queima de gordura.",
    "tags": [
      "Carnitina",
      "Colina",
      "Lipólise"
    ],
    "doseLbl": "Forma",
    "doseVal": "Injetável",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting estetica blends",
    "modalId": "lipocfat",
    "name": "Lipo-C FAT BLASTER",
    "badges": [
      "Cutting"
    ],
    "tagline": "Versão intensificada do Lipo-C — máxima queima de gordura e termogênese.",
    "tags": [
      "Termogênico",
      "Fat loss",
      "Intensivo"
    ],
    "doseLbl": "Forma",
    "doseVal": "Injetável",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting cognitivo blends",
    "modalId": "lipocfocus",
    "name": "Lipo-C FOCUS",
    "badges": [
      "Cutting",
      "Cognitivo"
    ],
    "tagline": "Lipo-C + moduladores cognitivos — queima de gordura e foco mental combinados.",
    "tags": [
      "Fat loss",
      "Foco",
      "Blend"
    ],
    "doseLbl": "Forma",
    "doseVal": "Injetável",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting estetica blends",
    "modalId": "lipomino",
    "name": "Lipo Mino Mix",
    "badges": [
      "Cutting",
      "Estética"
    ],
    "tagline": "Blend lipotrófico completo com aminoácidos e vitaminas — suporte metabólico total.",
    "tags": [
      "Aminoácidos",
      "Vitaminas",
      "Lipólise"
    ],
    "doseLbl": "Forma",
    "doseVal": "Injetável",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting blends",
    "modalId": "shred",
    "name": "Shred",
    "badges": [
      "Cutting"
    ],
    "tagline": "Blend de cutting especializado — queima de gordura, definição e preservação de músculo.",
    "tags": [
      "Cutting",
      "Definição",
      "Blend"
    ],
    "doseLbl": "Forma",
    "doseVal": "Blend especializado",
    "section": "sec-lipo"
  },
  {
    "cats": "cutting blends",
    "modalId": "supershred",
    "name": "Super Shred",
    "badges": [
      "Cutting"
    ],
    "tagline": "Versão intensificada do Shred — protocolo de cutting máximo para competição.",
    "tags": [
      "Competição",
      "Cutting extremo",
      "Blend"
    ],
    "doseLbl": "Forma",
    "doseVal": "Blend avançado",
    "section": "sec-lipo"
  },
  {
    "cats": "bulking blends",
    "modalId": "superhuman",
    "name": "Super Human Blend",
    "badges": [
      "Bulking"
    ],
    "tagline": "Blend de alta performance — combinação avançada para force e composição corporal.",
    "tags": [
      "Performance",
      "Força",
      "Blend"
    ],
    "doseLbl": "Forma",
    "doseVal": "Blend especializado",
    "section": "sec-lipo"
  },
  {
    "cats": "estetica blends",
    "modalId": "hairskinnails",
    "name": "Healthy Hair Skin Nails",
    "badges": [
      "Estética"
    ],
    "tagline": "Blend estético holístico — cabelo, pele e unhas com suporte de peptídeos e nutrientes.",
    "tags": [
      "Cabelo",
      "Pele",
      "Unhas"
    ],
    "doseLbl": "Forma",
    "doseVal": "Blend estético",
    "section": "sec-estetica"
  },
  {
    "cats": "estetica",
    "modalId": "snap",
    "name": "Botulinum Toxin (SNAP)",
    "badges": [
      "Estética"
    ],
    "tagline": "Toxina botulínica estética — relaxamento muscular para rugas e linhas de expressão.",
    "tags": [
      "Botox",
      "Rugas",
      "Estética facial"
    ],
    "doseLbl": "Uso",
    "doseVal": "Protocolo específico",
    "section": "sec-estetica"
  },
  {
    "cats": "longevidade cutting",
    "modalId": "lcarnitine",
    "name": "L-Carnitine",
    "badges": [
      "Cutting",
      "Longevidade"
    ],
    "tagline": "Transportador de ácidos graxos — queima de gordura mitocondrial e energia muscular.",
    "tags": [
      "Beta-oxidação",
      "Energia",
      "Lipólise"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1 – 3 g/dose",
    "section": "sec-estetica"
  },
  {
    "cats": "longevidade imune",
    "modalId": "vitamind3",
    "name": "Vitamin D3",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Pró-hormônio essencial — imunidade, osso, hormônios e longevidade celular.",
    "tags": [
      "Imunidade",
      "Osso",
      "Hormônio"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "5000 – 20000 IU",
    "section": "sec-estetica"
  },
  {
    "cats": "longevidade",
    "modalId": "methionine",
    "name": "Methionine",
    "badges": [
      "Longevidade"
    ],
    "tagline": "Aminoácido sulfurado essencial — metilação, desintoxicação hepática e antioxidante.",
    "tags": [
      "Metilação",
      "Fígado",
      "Antioxidante"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "Protocolo específico",
    "section": "sec-estetica"
  },
  {
    "cats": "blends suprimentos",
    "modalId": "bacwater",
    "name": "BAC Water",
    "badges": [],
    "tagline": "Água bacteriostática estéril — solvente padrão para reconstituição de peptídeos.",
    "tags": [
      "Reconstituição",
      "Estéril",
      "Benzil álcool"
    ],
    "doseLbl": "Uso",
    "doseVal": "Solvente para peptídeos",
    "section": "sec-suprimentos"
  },
  {
    "cats": "blends suprimentos",
    "modalId": "aceticacid",
    "name": "Acetic Acid",
    "badges": [],
    "tagline": "Ácido acético para reconstituição — solvente para peptídeos hidrofóbicos difíceis.",
    "tags": [
      "Solvente",
      "Hidrofóbicos",
      "pH"
    ],
    "doseLbl": "Uso",
    "doseVal": "Diluído em água",
    "section": "sec-suprimentos"
  },
  {
    "cats": "imune longevidade suprimentos",
    "modalId": "b12",
    "name": "B12 (Cobalamina)",
    "badges": [
      "Longevidade",
      "Imune"
    ],
    "tagline": "Vitamina B12 injetável — energia, neuroproteção e formação de glóbulos vermelhos.",
    "tags": [
      "Energia",
      "Neurológico",
      "Hematopoiese"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1000 mcg/dose",
    "section": "sec-suprimentos"
  },
  {
    "cats": "cutting estetica suprimentos",
    "modalId": "lemonbottle",
    "name": "Lemon Bottle",
    "badges": [
      "Cutting",
      "Estética"
    ],
    "tagline": "Lipolítico injetável estético — dissolução de gordura localizada com aplicação local.",
    "tags": [
      "Gordura localizada",
      "Estética",
      "Lipolítico"
    ],
    "doseLbl": "Uso",
    "doseVal": "Injeção local",
    "section": "sec-suprimentos"
  },
  {
    "cats": "recovery bulking suprimentos",
    "modalId": "bpc_tb",
    "name": "BPC+TB Blend",
    "badges": [
      "Recovery",
      "Bulking"
    ],
    "tagline": "Blend sinérgico BPC-157 + TB-500 — protocolo dual de regeneração máxima.",
    "tags": [
      "Regeneração",
      "Tendão",
      "Sistêmico"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "500 mcg BPC + 2 mg TB",
    "section": "sec-suprimentos"
  },
  {
    "cats": "bulking hormonal suprimentos",
    "modalId": "hgh191",
    "name": "HGH (191AA)",
    "badges": [
      "Bulking",
      "Hormonal"
    ],
    "tagline": "Hormônio do crescimento humano recombinante — 191 aminoácidos idênticos ao endógeno.",
    "tags": [
      "GH",
      "Anti-aging",
      "Composição corporal"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "1–6 UI/dia SC",
    "section": "sec-suprimentos"
  },
  {
    "cats": "suprimentos",
    "modalId": "methionine",
    "name": "Methonine",
    "badges": [
      "Suprimento"
    ],
    "tagline": "Aminoácido lipotrópico essencial — precursor de glutationa, carnitina e SAM.",
    "tags": [
      "Lipotrópico",
      "Fígado",
      "Metilação"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "500 mg/dose IM",
    "section": "sec-suprimentos"
  },
  {
    "cats": "cognitivo neuro suprimentos",
    "modalId": "p21",
    "name": "P21 (without Adamantane)",
    "badges": [
      "Cognitivo"
    ],
    "tagline": "P21 puro sem componente adamantano — neuroplasticidade e neurogênese via CNTF.",
    "tags": [
      "Neurogênese",
      "Memória",
      "CNTF"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "300 mcg/dia SC",
    "section": "sec-suprimentos"
  },
  {
    "cats": "glp1 metabolico cutting suprimentos",
    "modalId": "retacagri",
    "name": "Reta+Cagri Blend",
    "badges": [
      "GLP-1",
      "Cutting"
    ],
    "tagline": "Retatrutide + Cagrilintide — 4 vias de perda de peso em uma formulação.",
    "tags": [
      "GLP-1/GIP/Glucagon",
      "Amilina",
      "Obesidade"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2–5 mg/semana SC",
    "section": "sec-suprimentos"
  },
  {
    "cats": "recovery suprimentos",
    "modalId": "tbfrag",
    "name": "TB500 Frag 17-23",
    "badges": [
      "Recovery"
    ],
    "tagline": "Fragmento ativo LKKTETQ do TB-500 — sequência mínima de regeneração.",
    "tags": [
      "Regeneração",
      "Tendão",
      "Actina G"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "500 mcg 2×/semana SC",
    "section": "sec-suprimentos"
  },
  {
    "cats": "bulking hormonal cutting suprimentos",
    "modalId": "tesaipa",
    "name": "Tesa+IPA Blend",
    "badges": [
      "Bulking",
      "Cutting"
    ],
    "tagline": "Tesamorelin + Ipamorelin — o combo de GH mais validado para composição corporal.",
    "tags": [
      "GHRH + GHRP",
      "Gordura visceral",
      "GH"
    ],
    "doseLbl": "Dosagem",
    "doseVal": "2 mg Tesa + 300 mcg Ipa",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica recovery suprimentos",
    "modalId": "bbg40",
    "name": "BBG40",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "Beauty Blend G 40 mg — GHK-Cu + peptídeos reparadores para rejuvenescimento cutâneo.",
    "tags": [
      "Colágeno",
      "Anti-aging",
      "GHK-Cu"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "40 mg total",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica recovery suprimentos",
    "modalId": "bbg50",
    "name": "BBG50",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "Beauty Blend G 50 mg — formulação premium de GHK-Cu e peptídeos anti-aging dérmicos.",
    "tags": [
      "Colágeno",
      "Elastina",
      "GHK-Cu"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "50 mg total",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica recovery suprimentos",
    "modalId": "bbg70",
    "name": "BBG70",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "Beauty Blend G 70 mg — versão máxima com maior concentração de peptídeos de cobre.",
    "tags": [
      "Colágeno",
      "Elastina",
      "Angiogênese"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "70 mg total",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica recovery suprimentos",
    "modalId": "ggh",
    "name": "GGH",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "Blend GHK-Cu + GHK + peptídeos de reparo — protocolo de rejuvenescimento cutâneo avançado.",
    "tags": [
      "GHK-Cu",
      "Pele",
      "Colágeno"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "402 mg total",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica recovery imune suprimentos",
    "modalId": "gkpblend",
    "name": "GKP Blend",
    "badges": [
      "Estética",
      "Recovery"
    ],
    "tagline": "GHK-Cu + KPV + peptídeos ativos — anti-aging com controle inflamatório integrado.",
    "tags": [
      "GHK-Cu",
      "KPV",
      "Anti-inflamatório"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "70 mg total",
    "section": "sec-suprimentos"
  },
  {
    "cats": "estetica cutting suprimentos",
    "modalId": "sz352",
    "name": "SZ352",
    "badges": [
      "Cutting",
      "Estética"
    ],
    "tagline": "Blend SZ 352 mg — formulação estético-metabólica para definição e composição corporal.",
    "tags": [
      "Lipolítico",
      "Composição corporal",
      "Blend"
    ],
    "doseLbl": "Conteúdo",
    "doseVal": "352 mg total",
    "section": "sec-suprimentos"
  }
];
