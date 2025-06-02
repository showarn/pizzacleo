"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) setDropdownOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMenuOpen(false);
        setMobileSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isClient]);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 300);
  };
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  if (!isClient) return null;

  const darkBackgroundPages = ["/", "/om-oss", "/kontakt"];
  const isDarkBackground = darkBackgroundPages.includes(pathname);
  const textColor = isDarkBackground ? "text-white" : "text-black";
  const hoverColor = isDarkBackground ? "hover:text-[#e7dfd3]" : "hover:text-black";
  const underlineColor = isDarkBackground ? "bg-[#e7dfd3]" : "bg-black";

  const navItems = [
    { name: "Hem", href: "/" },
    {
      name: "Meny", href: "#meny",
      submenu: [
        { name: "Pizzor", href: "#meny-meny-1" },
        { name: "Sallader", href: "#meny-salladsmeny" },
        { name: "Grill", href: "#meny-grillmeny" },
        { name: "Rullar", href: "#meny-kebab-och-rullar" },
      ],
    },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.substring(1);
      if (pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/?scrollTo=${encodeURIComponent(id)}`);
      }
    } else {
      router.push(href);
    }
    setDropdownOpen(false);
    setMenuOpen(false);
    setMobileSubmenuOpen(false);
  };

  const fadeVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>

      <motion.header
        className="fixed top-[-20px] left-0 w-full flex items-center justify-between px-4 py-3 bg-transparent z-[100] h-[120px]"
        variants={fadeVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          suppressHydrationWarning
          className={`${textColor} text-3xl focus:outline-none z-[110] pt-2 md:hidden`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
          variants={fadeVariant}
        >
          {menuOpen ? <X size={36} /> : <Menu size={36} />}
        </motion.button>

        <motion.nav
          className={`hidden md:flex gap-6 items-center ${textColor} text-lg pl-12 z-[110]`}
          ref={menuRef}
          variants={fadeVariant}
        >
          {navItems.map((item, index) => {
            if (item.submenu) {
              return (
                <div key={index} className="relative cursor-pointer select-none" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative group bg-transparent border-none cursor-pointer ${hoverColor} transition-colors ${
                      pathname === "/" && item.href === "#meny" ? "font-bold" : ""
                    }`}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    variants={fadeVariant}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] ${underlineColor} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
                  </motion.button>
                  {dropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-2 w-40 bg-black bg-opacity-90 rounded-lg shadow-lg py-2 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => scrollToSection(subItem.href)}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#e7dfd3] hover:text-black transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            }

            return (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`relative group bg-transparent border-none cursor-pointer ${hoverColor} transition-colors ${
                  pathname === item.href ? "font-bold" : ""
                }`}
                variants={fadeVariant}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] ${underlineColor} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
              </motion.button>
            );
          })}
        </motion.nav>

        <div
          ref={mobileMenuRef}
          className={`absolute left-4 top-[100px] bg-black bg-opacity-90 text-white text-lg rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-2 flex flex-col items-start gap-1 px-3">
            {navItems.map((item, index) => (
              <li key={index} className="w-full">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (!item.submenu) scrollToSection(item.href);
                      else setMobileSubmenuOpen(!mobileSubmenuOpen);
                    }}
                    className={`block w-full text-left py-1 px-2 relative group hover:text-[#e7dfd3] transition-colors ${
                      pathname === item.href ? "font-bold" : ""
                    }`}
                    aria-haspopup={!!item.submenu}
                    aria-expanded={mobileSubmenuOpen}
                  >
                    {item.name}
                  </button>
                  {item.submenu && (
                    <button onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)} aria-label="Visa undermeny" className="p-1 focus:outline-none">
                      <ChevronDown
                        size={20}
                        className={`transform transition-transform duration-300 bounce ${
                          mobileSubmenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.submenu && mobileSubmenuOpen && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => scrollToSection(subItem.href)}
                          className="block w-full text-left py-1 px-2 text-white hover:bg-[#e7dfd3] hover:text-black transition-colors rounded"
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.header>
    </>
  );
}
