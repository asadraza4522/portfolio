import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import Lenis from "lenis";
import { Cursor, Preloader, ScrollProgress } from "./fx";
import { Hero, Nav } from "./hero";
import { About, Contact, Experience, Marquee, Skills, Stats, Work } from "./sections";

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -20 } });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <div aria-hidden className="grain" />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Stats />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </MotionConfig>
  );
}
