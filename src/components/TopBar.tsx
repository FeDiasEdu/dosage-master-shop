import { useState, useEffect } from "react";
import logoHorizontal from "@/assets/logo-horizontal.png";
import type { User } from "@supabase/supabase-js";

type Tab = "guia" | "calc" | "store" | "research";
interface TopBarProps { activeTab: Tab; onTabChange: (tab: Tab) => void; user?: User | null; onAuthClick?: () => void; }

export default function TopBar({ activeTab, onTabChange, user, onAuthClick }: TopBarProps) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => { if (localStorage.getItem("aura_theme") === "dark") { setIsDark(true); document.documentElement.classList.add("dark"); } }, []);
  const toggleTheme = () => setIsDark((prev) => { const next = !prev; document.documentElement.classList.toggle("dark", next); localStorage.setItem("aura_theme", next ? "dark" : "light"); return next; });
  const tabs: { id: Tab; label: string; icon: string; pill?: string }[] = [
    { id: "guia", label: "Guia", icon: "◈" },
    { id: "research", label: "Pesquisa", icon: "⌁", pill: "RESEARCH" },
    { id: "store", label: "Loja", icon: "🛒" },
    { id: "calc", label: "Calculadora", icon: "⊙", pill: "mg → UI" },
  ];
  return <>
    <header className="fixed top-0 left-0 right-0 z-[200] h-14 border-b border-border bg-card/92 backdrop-blur-[14px]">
      <div className="h-full max-w-screen-2xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6"><div />
        <div className="flex items-center h-full gap-3"><button className="flex items-center gap-2.5 no-underline bg-transparent border-0" onClick={() => onTabChange("guia")}><img src={logoHorizontal} alt="AURA Peptides" className="h-6 dark:invert"/><div className="w-px h-5 bg-border mx-3"/></button>
          <nav className="hidden sm:flex items-stretch h-full">{tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`inline-flex items-center gap-2 px-4 text-xs font-medium border-b-2 transition-colors ${activeTab === tab.id ? "text-foreground border-foreground font-semibold" : "text-muted-foreground border-transparent hover:text-foreground"}`}><span className="text-[13px]">{tab.icon}</span><span>{tab.label}</span>{tab.pill && <span className="inline-flex items-center bg-foreground text-card text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-[3px]">{tab.pill}</span>}</button>)}</nav>
        </div>
        <div className="flex items-center justify-end gap-2"><button onClick={onAuthClick} className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full border border-border bg-card text-xs font-medium hover:border-foreground hover:bg-secondary">👤 <span className="hidden md:inline">{user ? user.email?.split("@")[0] : "Entrar"}</span></button><button onClick={toggleTheme} className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-lg">{isDark ? "🌙" : "☀️"}</button></div>
      </div>
    </header>
    <nav className="fixed bottom-0 left-0 right-0 z-[200] sm:hidden border-t border-border bg-card/95 backdrop-blur-[14px]"><div className="flex items-stretch h-14">{tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground"}`}><span className="text-[17px]">{tab.icon}</span><span>{tab.label}</span></button>)}</div></nav>
  </>;
}
