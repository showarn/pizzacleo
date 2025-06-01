"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#171717] py-16 px-6 sm:px-12 lg:px-24 flex justify-center">
        <article className="max-w-3xl bg-[#262626] rounded-2xl shadow-xl p-10 sm:p-16 ring-1 ring-[#4ade80]/50">
          <h1 className="text-5xl font-serif font-extrabold text-[#4ade80] mb-8 leading-tight">
            Kontakta oss
          </h1>

          <section className="prose prose-invert max-w-none mb-12" style={{ color: '#d1d5db' }}>
            <p>
              Vi på pizzerian finns här för dig. Har du frågor eller funderingar? Tveka inte att höra av dig via telefon eller e-post, eller besök oss på plats!
            </p>
          </section>

          <section className="border-t border-[#4ade80]/30 pt-8 space-y-6 text-[#d1d5db]">
            <div>
              <h2 className="text-3xl font-semibold text-[#4ade80] mb-2">Telefon</h2>
              <p className="flex items-center gap-2">
                <Phone size={20} className="text-[#4ade80]" />
                <a href="tel:060100423" className="hover:underline">
                  060-10 04 23
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={20} className="text-[#4ade80]" />
                <a href="tel:0728477519" className="hover:underline">
                  072 847 75 19
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#4ade80] mb-2">E-post</h2>
              <p className="flex items-center gap-2">
                <Mail size={20} className="text-[#4ade80]" />
                <a href="mailto:info@cleopatra.nu" className="hover:underline">
                  info@cleopatra.nu
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#4ade80] mb-2">Adress</h2>
              <address className="not-italic leading-relaxed">
                Bosvedjans Centrum<br />
                Bäckebovägen 12<br />
                856 53 SUNDSVALL
              </address>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#4ade80] mb-2">Öppettider</h2>
              <p>Mån - Tors  11.00 - 21.00</p>
              <p>Fre - Sön  11.00 - 21.00</p>
            </div>
          </section>

          <footer className="mt-12 text-right text-[#4ade80] font-serif italic tracking-wide">
            — Kawan
          </footer>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
