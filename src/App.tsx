"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Header, Introduction, Portfolio } from "./components/index";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-black text-sm text-white lg:text-base">
      <Header />
      <div className="sticky top-0 z-50 rounded-4xl bg-blue-950 md:rounded-none md:bg-black">
        <Introduction />
        <Portfolio />
      </div>
    </div>
  );
}

export default App;
