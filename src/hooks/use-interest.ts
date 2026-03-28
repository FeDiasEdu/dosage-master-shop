import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const INTEREST_STORAGE_KEY = "aura_user_interests";

// Get user's locally tracked interests (set of SKUs they've expressed interest in)
function getUserInterests(): Set<string> {
  try {
    const data = JSON.parse(localStorage.getItem(INTEREST_STORAGE_KEY) || "[]");
    return new Set(data);
  } catch {
    return new Set();
  }
}

function saveUserInterests(interests: Set<string>) {
  localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify([...interests]));
}

export function useInterest() {
  const [interestCounts, setInterestCounts] = useState<Record<string, number>>({});
  const [userInterests, setUserInterests] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchInterests = useCallback(async () => {
    try {
      const { data } = await supabase.from("aura_interest").select("sku, count");
      const counts: Record<string, number> = {};
      for (const row of data || []) {
        counts[row.sku] = row.count || 0;
      }
      setInterestCounts(counts);
    } catch (e) {
      console.error("Failed to load interests:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setUserInterests(getUserInterests());
    fetchInterests();
  }, [fetchInterests]);

  const toggleInterest = useCallback(async (sku: string): Promise<boolean> => {
    const current = getUserInterests();
    const wasInterested = current.has(sku);

    if (wasInterested) {
      // Remove interest
      current.delete(sku);
      saveUserInterests(current);
      setUserInterests(new Set(current));

      // Decrement in Supabase
      const currentCount = interestCounts[sku] || 0;
      const newCount = Math.max(0, currentCount - 1);
      if (newCount === 0) {
        await supabase.from("aura_interest").delete().eq("sku", sku);
      } else {
        await supabase.from("aura_interest").update({ count: newCount }).eq("sku", sku);
      }
      setInterestCounts((prev) => ({ ...prev, [sku]: newCount }));
      return false;
    } else {
      // Add interest
      current.add(sku);
      saveUserInterests(current);
      setUserInterests(new Set(current));

      // Increment in Supabase
      const currentCount = interestCounts[sku] || 0;
      const newCount = currentCount + 1;
      await supabase.from("aura_interest").upsert(
        { sku, count: newCount },
        { onConflict: "sku" }
      );
      setInterestCounts((prev) => ({ ...prev, [sku]: newCount }));
      return true;
    }
  }, [interestCounts]);

  const hasInterest = useCallback((sku: string) => userInterests.has(sku), [userInterests]);

  return { interestCounts, toggleInterest, hasInterest, loading, refetch: fetchInterests };
}
