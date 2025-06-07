"use client";

import { useEffect, useState, RefObject } from "react";

const sections = [
  { id: "meny-meny-1", name: "Pizzor" },
  { id: "meny-kebab-och-rullar", name: "Rullar" },
  { id: "meny-salladsmeny", name: "Sallader" },
  { id: "meny-grillmeny", name: "Grill" },
];

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};

const MenuSidebar: React.FC<Props> = ({ containerRef }) => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const handleScroll = () => {
      let currentId = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            currentId = section.id;
          }
        }
      }

      const bottomReached =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.body.scrollHeight;

      if (bottomReached) {
        currentId = sections[sections.length - 1].id;
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isInViewport) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const top = (activeIndex / (sections.length - 1)) * 100;

  return (
    <aside className="hidden md:flex sticky top-24 flex-col items-center w-20 h-[70vh]">
      {/* Linjen */}
      {activeIndex > 0 && (
        <div
          className="absolute w-px bg-[#555]"
          style={{ top: 0, height: `${top - 4}%`, left: "50%" }}
        />
      )}
      {activeIndex < sections.length - 1 && (
        <div
          className="absolute w-px bg-[#555]"
          style={{ top: `${top + 4}%`, bottom: 0, left: "50%" }}
        />
      )}

      {/* Prickar och text */}
      <div className="relative flex flex-col items-center justify-between h-full w-full">
        {sections.map((section, idx) => {
          const isActive = section.id === activeId;
          const sectionTop = `${(idx / (sections.length - 1)) * 100}%`;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="absolute left-1/2 flex flex-col items-center focus:outline-none"
              style={{ top: sectionTop, transform: "translate(-50%, -50%)" }}
              aria-label={section.name}
            >
              <span
                className={`block w-3 h-3 rounded-full mb-1 ${
                  isActive ? "bg-[#4ade80]" : "bg-[#888]"
                }`}
              />
              <span
                className={`text-[10px] sm:text-xs font-medium ${
                  isActive ? "text-[#4ade80]" : "text-[#888]"
                }`}
              >
                {section.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default MenuSidebar;
