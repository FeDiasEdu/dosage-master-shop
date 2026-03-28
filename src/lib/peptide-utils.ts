import type { GuideCard } from "@/data/guide-cards";
import { PEPTIDE_INFO, SYN_MAP } from "@/data/peptide-guide";
import type { StoreProductMap } from "@/data/store-products";

export function normalizePeptideKey(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

export function getPrimaryCategory(cats: string) {
  return cats.split(/\s+/).filter(Boolean)[0] ?? "suprimentos";
}

export function resolveGuideModalId(identifier: string) {
  if (!identifier) return null;
  if (PEPTIDE_INFO[identifier]) return identifier;
  if (SYN_MAP[identifier]) return SYN_MAP[identifier];

  const normalizedIdentifier = normalizePeptideKey(identifier);

  for (const [label, modalId] of Object.entries(SYN_MAP)) {
    if (normalizePeptideKey(label) === normalizedIdentifier) return modalId;
  }

  for (const [modalId, info] of Object.entries(PEPTIDE_INFO)) {
    if (normalizePeptideKey(info.name) === normalizedIdentifier || normalizePeptideKey(modalId) === normalizedIdentifier) {
      return modalId;
    }
  }

  return null;
}

export function findMatchingStoreProduct(products: StoreProductMap, identifier: string) {
  const modalId = resolveGuideModalId(identifier);
  const normalizedIdentifier = normalizePeptideKey(identifier);

  for (const [name, product] of Object.entries(products)) {
    if (name === identifier) {
      return { name, product };
    }

    if (modalId && product.guide_key === modalId) {
      return { name, product };
    }

    if (normalizePeptideKey(name) === normalizedIdentifier) {
      return { name, product };
    }

    if (modalId && normalizePeptideKey(product.guide_key || "") === normalizePeptideKey(modalId)) {
      return { name, product };
    }
  }

  return null;
}

export function resolveGuideCategory(card: GuideCard, products: StoreProductMap) {
  const storeMatch = findMatchingStoreProduct(products, card.name) ?? findMatchingStoreProduct(products, card.modalId);
  return storeMatch?.product.category ?? getPrimaryCategory(card.cats);
}