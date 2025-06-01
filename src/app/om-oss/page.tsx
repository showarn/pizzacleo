"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#171717] py-16 px-6 sm:px-12 lg:px-24 flex justify-center">
        <article className="max-w-3xl bg-[#262626] rounded-2xl shadow-xl p-10 sm:p-16 ring-1 ring-[#4ade80]/50">
          <h1 className="text-5xl font-serif font-extrabold text-[#4ade80] mb-8 leading-tight">
            Välkommen till vår pizzeria
          </h1>

          <section className="prose prose-invert max-w-none mb-12" style={{ color: '#d1d5db' }}>
            <p>
              Jag heter Kawan, född 1975 och har bott i Bosvedjan i hela mitt liv. Sedan 1991 har jag bakat pizza här i Bosvedjans centrum — på samma plats, med samma passion och samma kärlek till hantverket.
            </p>
            <p>
              Att känna mina kunder är en självklarhet för mig. Jag har haft förmånen att välkomna många stamgäster genom åren, och det är något jag värdesätter högt. Varje dag strävar jag efter att ge alla som kommer hit en personlig och varm upplevelse. Jag är alltid trevlig och ser till att alla känner sig välkomna och hemma i min pizzeria.
            </p>
            <p>
              Min filosofi är enkel: genuint engagemang, kvalitet i varje ingrediens och en äkta smakupplevelse som gör att du vill komma tillbaka gång på gång.
            </p>
          </section>

          <section className="border-t border-[#4ade80]/30 pt-8">
            <h2 className="text-3xl font-semibold text-[#4ade80] mb-4">Lite mer om mig</h2>
            <p className="text-[#d1d5db] leading-relaxed">
              När jag inte är i pizzerian ägnar jag mig åt att planera nya idéer för menyn och hur vi kan göra varje besök ännu bättre. Jag är stolt över att vara en del av Bosvedjans hjärta och ser fram emot att fortsätta skapa minnen tillsammans med dig och alla andra i området.
            </p>
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

export default AboutUsPage;



