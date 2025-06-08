"use client";

import React, { useRef, useState, useEffect } from "react";
import fallbackMenuItems, { MenuItem } from "../data/menuData";
import MenuSidebar from "@/components/MenuSidebar";
import { motion } from "framer-motion";
import { ArrowUp as LucideArrowUp } from "lucide-react";

const sections = [
  { id: "meny-meny-1", name: "Pizzor" },
  { id: "meny-kebab-och-rullar", name: "Rullar" },
  { id: "meny-salladsmeny", name: "Sallader" },
  { id: "meny-grillmeny", name: "Grill" },
];

const MobileQuickNav: React.FC = () => {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => {
      let currentId = "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            currentId = section.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#171717] border-t border-gray-700 flex justify-around items-center py-2 md:hidden z-50">
      {sections.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`text-sm px-3 py-1 rounded-full transition-colors duration-300 ${
            activeId === id ? "bg-[#4ade80] text-black font-bold" : "text-gray-400"
          }`}
        >
          {name}
        </button>
      ))}
    </nav>
  );
};

const ArrowUpWithBounce = () => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
    className="flex justify-center cursor-pointer"
    aria-label="Pil uppåt"
    role="img"
  >
    <LucideArrowUp size={48} color="white" />
  </motion.div>
);

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Scrolla upp"
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ArrowUpWithBounce />
    </motion.button>
  );
};

interface MenuPizzaProps {
  // ingen prop längre, styrs från server
}

const MenuPizza: React.FC<MenuPizzaProps> = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenuItems);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Hämta menydata
    fetch("/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error("Misslyckades med att hämta meny");
        return res.json();
      })
      .then((data) => setMenuItems(data))
      .catch((err) => {
        console.error("Fel vid menyhämtning, fallback till statisk meny:", err);
      })
      .finally(() => setLoading(false));

    // Hämta inställningen för visning av näringsinfo (tooltip)
    fetch("/api/settings/show-nutrition")
      .then((res) => {
        if (!res.ok) throw new Error("Misslyckades med att hämta inställning");
        return res.json();
      })
      .then((data) => {
        if (typeof data.showNutrition === "boolean") {
          setShowTooltip(data.showNutrition);
        }
      })
      .catch(() => {
        setShowTooltip(false);
      });
  }, []);
if (loading) {
  return (
    <div className="flex flex-col items-center justify-center text-white py-20 space-y-4">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-[#4ade80] rounded-full animate-spin"></div>
      <div className="text-lg font-medium">Laddar meny...</div>
    </div>
  );
}

  const groups: Record<string, MenuItem[]> = menuItems.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-[#171717] min-h-screen py-12 px-4 sm:px-6 relative pb-20">
      <div ref={menuRef} id="meny" className="relative max-w-6xl mx-auto flex gap-10">
        {/* Desktop sidomeny */}
        <div className="hidden md:flex sticky top-20 flex-col items-center w-20">
          <MenuSidebar containerRef={menuRef} />
        </div>

        {/* Menysektioner */}
        <div className="flex-1 space-y-10">
          {(Object.entries(groups) as [string, MenuItem[]][]).map(([groupName, groupItems]) => {
            const hasUniformPrice = groupItems.every(item => item.price === groupItems[0].price);
            const groupPrice = hasUniformPrice ? groupItems[0].price : null;
            const id = groupName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "och");

            return (
              <div
                id={`meny-${id}`}
                key={groupName}
                className="bg-[#262626] p-6 sm:p-8 rounded-xl shadow-lg border border-[#333333] hover:border-[#4ade80]/30 transition-colors duration-300 scroll-mt-32"
              >
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold font-serif text-[#f3f4f6] flex-grow">{groupName}</h3>
                  {hasUniformPrice && (
                    <span className="bg-[#333333] text-[#4ade80] px-3 py-1 rounded-full text-sm font-medium border border-[#4ade80]/30">
                      {groupPrice} kr
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupItems.map(({ name, ingredients, price, calories, protein, carbs, fat }, idx) => {
                    const uniqueId = `${groupName}-${idx}`;
                    const isHovered = hoveredIndex === uniqueId;

                    return (
                      <div
                        key={idx}
                        className="relative bg-[#333333] hover:bg-[#3a3a3a] p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-[#404040] hover:border-[#4ade80]/30 group"
                        onMouseEnter={() => setHoveredIndex(uniqueId)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-[#f9f9f9] font-serif group-hover:text-white transition-colors">
                              {name}
                            </h4>
                            <p className="text-[#d1d5db] text-sm mt-2 italic">{ingredients}</p>
                          </div>
                          {!hasUniformPrice && (
                            <span className="text-[#4ade80] font-medium whitespace-nowrap ml-3 group-hover:text-[#86efac] transition-colors">
                              {price} kr
                            </span>
                          )}
                        </div>

                        {/* Tooltip med näringsinfo */}
                        {showTooltip && isHovered && (calories || protein || carbs || fat) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 bg-[#1f2937] border border-[#4ade80] rounded-lg p-3 shadow-lg text-white text-xs z-50 pointer-events-none"
                          >
                            <p><span className="font-semibold">Kalorier:</span> cirka {calories ?? "N/A"} kcal</p>
                            <p><span className="font-semibold">Protein:</span> cirka {protein ?? "N/A"} g</p>
                            <p><span className="font-semibold">Kolhydrater:</span> cirka {carbs ?? "N/A"} g</p>
                            <p><span className="font-semibold">Fett:</span> cirka {fat ?? "N/A"} g</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileQuickNav />

      <ScrollToTopButton />
    </div>
  );
};

export default MenuPizza;
