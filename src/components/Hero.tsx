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
    <LucideArrowDown size={60} color="white" />
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center"
    >
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

      {/* Fade overlay i toppen */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

      {/* Fade overlay i botten */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

      {/* Grå overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-30 z-10" />

      {/* Logotyp */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="relative z-20 mt-[0.5cm] w-32 h-32"
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
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow px-6 text-center text-white max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
          Välkommen till <br />
          Pizzeria Cleopatra i Sundsvall
        </h1>
        <p className="text-xl mb-8 drop-shadow-md">
          Smaken av Italien – Ugnsbakad pizza med kärlek
        </p>

        {/* Knappgrupp */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a
              href="#meny"
              className="inline-block bg-red-600 hover:bg-red-700 transition-colors px-6 py-3 rounded-full font-semibold drop-shadow-lg"
            >
              Se vår meny
            </a>
            <a
              href="https://www.foodora.se/restaurant/or81/pizzeria-cleopatra-or81"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-full font-semibold drop-shadow-lg"
            >
              Beställ hem
            </a>
          </div>

          <a
            href="tel:060100423"
            className="flex items-center gap-2 text-[#4ade80] font-semibold hover:underline"
            aria-label="Ring oss"
          >
            <Phone size={24} />
            Ring oss
          </a>
        </div>
      </div>

      {/* Pil nedåt */}
      <button
        onClick={scrollToMenu}
        aria-label="Scrolla ner till menyn"
        className="relative z-20 mb-6"
      >
        <ArrowDownWithBounce />
      </button>
    </motion.div>
  );
}
