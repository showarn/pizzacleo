"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown as LucideArrowDown, Phone } from "lucide-react";

const ArrowDownWithBounce = () => (
  <motion.div
    animate={{ y: [0, 15, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
    className="flex justify-center cursor-pointer"
    aria-label="Pil nedåt"
    role="img"
  >
    <LucideArrowDown size={48} color="white" />
  </motion.div>
);

export default function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("meny");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-[600px] md:h-screen overflow-hidden flex flex-col items-center">
      {/* Bakgrundsvideo */}
      <video
        src="/pizzabackground.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Fade overlay i toppen och botten */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

      {/* Grå overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-30 z-10" />

      {/* Logotyp */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-20 mt-4 w-24 h-24 md:w-32 md:h-32"
      >
        <Image
          src="/logo.png"
          alt="Cleopatra Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </motion.div>

      {/* Hero-text */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow px-4 md:px-6 text-center text-white max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight"
        >
          Välkommen till <br />
          Pizzeria Cleopatra i Sundsvall
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl mb-6 md:mb-8 drop-shadow-md"
        >
          Smaken av Italien – Ugnsbakad pizza med kärlek
        </motion.p>

        {/* Knappgrupp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col items-center gap-3 md:gap-4"
        >
          <div className="flex gap-3 md:gap-4">
            <a
              href="#meny"
              className="inline-block bg-red-600 hover:bg-red-700 transition-colors px-5 py-2 md:px-6 md:py-3 rounded-full font-semibold drop-shadow-lg text-sm md:text-base"
            >
              Se vår meny
            </a>
            <a
              href="https://www.foodora.se/restaurant/or81/pizzeria-cleopatra-or81"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 md:px-6 md:py-3 rounded-full font-semibold drop-shadow-lg text-sm md:text-base"
            >
              Beställ hem
            </a>
          </div>

          <a
            href="tel:060100423"
            className="flex items-center gap-2 text-[#4ade80] font-semibold hover:underline text-sm md:text-base"
            aria-label="Ring oss"
          >
            <Phone size={20} className="md:w-6 md:h-6" />
            Ring oss
          </a>
        </motion.div>
      </div>

      {/* Pil nedåt */}
      <motion.button
        onClick={scrollToMenu}
        aria-label="Scrolla ner till menyn"
        className="relative z-20 mb-4 md:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <ArrowDownWithBounce />
      </motion.button>
    </div>
  );
}
