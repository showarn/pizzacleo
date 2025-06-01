"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Menu from "../components/MenuPizza";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
      </main>
      <Footer />
    </>
  );
}
