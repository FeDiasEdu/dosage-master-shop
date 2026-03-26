import { useState, useEffect } from "react";

type Tab = "guia" | "calc" | "store";

interface TopBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TopBar({ activeTab, onTabChange }: TopBarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aura_theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("aura_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("aura_theme", "light");
      }
      return next;
    });
  };

  const tabs: { id: Tab; label: string; icon: string; pill?: string }[] = [
    { id: "guia", label: "Guia", icon: "◈" },
    { id: "calc", label: "Calculadora", icon: "⊙", pill: "mg → UI" },
    { id: "store", label: "Loja", icon: "🛒" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] h-14 border-b border-border bg-card/92 backdrop-blur-[14px] transition-colors">
      <div className="h-full max-w-screen-2xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6">
        {/* Left spacer */}
        <div />

        {/* Center: brand + tabs */}
        <div className="flex items-center h-full gap-3">
          <a href="#" className="flex items-center gap-2.5 no-underline text-foreground" onClick={(e) => { e.preventDefault(); onTabChange("guia"); }}>
            <span className="text-base font-extrabold tracking-tight">AURA</span>
            <div className="w-px h-5 bg-border mx-3" />
          </a>
          <nav className="flex items-stretch h-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  inline-flex items-center gap-2 px-5 text-xs font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? "text-foreground border-foreground font-semibold"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                  }
                `}
              >
                <span className={`text-[13px] leading-none ${activeTab === tab.id ? "opacity-100" : "opacity-55"}`}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.pill && (
                  <span className="inline-flex items-center bg-foreground text-card text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-[3px]">
                    {tab.pill}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: theme toggle */}
        <div className="flex items-center justify-end">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-lg cursor-pointer transition-all hover:border-foreground hover:bg-secondary"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
