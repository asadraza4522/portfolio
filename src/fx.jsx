// Shared motion primitives.
import { useEffect, useRef, useState } from "react";
import {
  m, useInView, useMotionValue, useScroll, useSpring, useTransform, animate, useReducedMotion,
} from "motion/react";

export const ease = [0.22, 1, 0.36, 1];

export function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

export function Reveal({ children, delay = 0, y = 32, className = "", as = "div" }) {
  const M = m[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

// Each word slides up from behind a mask.
// `play` (optional) drives the reveal manually instead of on scroll-into-view.
export function SplitReveal({ text, className = "", delay = 0, stagger = 0.06, once = true, play }) {
  const words = text.split(" ");
  const trigger = play === undefined
    ? { whileInView: { y: "0%", rotate: 0 }, viewport: { once } }
    : { animate: play ? { y: "0%", rotate: 0 } : undefined };
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            {...trigger}
            transition={{ duration: 1, ease, delay: delay + i * stagger }}
          >
            {w}{i < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}

// Words light up one by one as the paragraph scrolls through the viewport.
export function ScrollWords({ text, className = "", as = "p" }) {
  const Tag = as;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>;
      })}
    </Tag>
  );
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <m.span style={{ opacity }} className="inline-block mr-[0.25em]">{children}</m.span>;
}

export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const fine = useMedia("(pointer: fine)");
  const move = (e) => {
    if (!fine) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <m.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </m.div>
  );
}

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Dot + trailing ring; ring grows over links/buttons and shows a label for [data-cursor].
export function Cursor() {
  const fine = useMedia("(pointer: fine)");
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [state, setState] = useState({ hover: false, label: "" });

  useEffect(() => {
    if (!fine || reduce) return;
    document.body.classList.add("has-cursor");
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      setState({ hover: !!t, label: t?.dataset.cursor || "" });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;
  const size = state.label ? 88 : state.hover ? 56 : 32;
  return (
    <>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full border border-bone/40 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, backgroundColor: state.label ? "#efede8" : "rgba(239,237,232,0)" }}
        transition={{ duration: 0.3, ease }}
      >
        {state.label && <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{state.label}</span>}
      </m.div>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <m.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent" />;
}

export function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.4, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)), onComplete: onDone });
    return () => c.stop();
  }, [onDone]);
  return (
    <m.div
      // dvh = height actually visible between mobile browser bars; inset-0 would tuck the counter under them.
      className="fixed left-0 top-0 z-[200] flex h-[100dvh] w-full items-end justify-between bg-bone p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-ink md:p-10"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-serif text-3xl italic md:text-5xl">Asad Raza</div>
      <div className="font-sans text-7xl font-light tabular-nums tracking-tighter md:text-[10rem] leading-none">{n}</div>
    </m.div>
  );
}
