import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import StorePage from "@/pages/StorePage";
import GuidePage from "@/pages/GuidePage";
import CalcPage from "@/pages/CalcPage";

type Tab = "guia" | "calc" | "store";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("store");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  return (
    <>
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "guia" && <GuidePage />}
      {activeTab === "calc" && <CalcPage />}
      {activeTab === "store" && <StorePage />}

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="max-w-[1100px] mx-auto px-6 py-5 pb-10 border-t border-border flex justify-between items-center flex-wrap gap-2.5 text-muted-foreground text-[11.5px]">
        <span>© {new Date().getFullYear()} AURA Peptides</span>
        <span className="font-mono">RUO — Research Use Only</span>
      </footer>
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-7 right-6 z-[500] w-11 h-11 rounded-full bg-foreground text-card border-none cursor-pointer text-lg font-bold flex items-center justify-center shadow-lg transition-all hover:-translate-y-0.5"
    >
      ↑
    </button>
  );
}
