import { useState, useRef, useEffect } from "react";
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_LED_CLASSES } from "@/data/store-products";

interface CategoryNavProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
  useLedColors?: boolean;
}

export default function CategoryNav({ categories, active, onChange, useLedColors = false }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftPos.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const getButtonClass = (cat: string) => {
    if (active === cat) {
      return "bg-foreground text-background border-foreground";
    }
    if (useLedColors && cat !== "all" && CATEGORY_LED_CLASSES[cat]) {
      return `${CATEGORY_LED_CLASSES[cat]} border-border hover:border-foreground/30`;
    }
    return "bg-muted text-muted-foreground border-border hover:border-foreground/30";
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}
      <div
        ref={scrollRef}
        className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border transition-colors ${getButtonClass(cat)}`}
          >
            <span>{CATEGORY_ICONS[cat] || "•"}</span>
            <span>{CATEGORY_LABELS[cat] || cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
