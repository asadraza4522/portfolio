import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValue, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowDownRight, Download, Fingerprint, HeartPulse, Menu, ShieldCheck, Wallet, X } from "lucide-react";
import { profile } from "./data";
import { Magnetic, SplitReveal, ease, useMedia } from "./fx";

const links = [["Work", "#work"], ["Experience", "#experience"], ["Skills", "#skills"], ["Contact", "#contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  // Menu is touch-only (md:hidden) and Lenis doesn't smooth touch, so native overflow lock is enough.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !open);
  });

  return (
    <>
      <m.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-line bg-ink/60 py-2 pl-5 pr-2 backdrop-blur-xl">
          <a href="#top" className="font-serif text-2xl italic leading-none">asad<span className="text-accent">.</span></a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([l, h]) => (
              <li key={h}>
                <a href={h} className="group relative block overflow-hidden rounded-full px-4 py-2 text-sm text-bone/70 transition-colors hover:text-bone">
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">{l}</span>
                  <span className="absolute inset-x-4 top-full block transition-transform duration-500 group-hover:-translate-y-full">{l}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="hidden rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent sm:block">
              Let’s talk
            </a>
            <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-2">
              {links.map(([l, h], i) => (
                <m.li key={h} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07, ease, duration: 0.6 }}>
                  <a href={h} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4 text-5xl font-light tracking-tight">
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>{l}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="space-y-1 font-mono text-xs text-mute">
              <p>{profile.email}</p>
              <p>{profile.location}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-32">
      {/* Aurora + grid */}
      <div aria-hidden className="grid-bg absolute inset-0" />
      <m.div aria-hidden style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[140px] motion-safe:animate-[spin_30s_linear_infinite]" />
        <div className="absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[140px]" />
      </m.div>

      <m.div style={{ opacity: fade }} className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          {/* Always mounted so layout is reserved (no CLS); intro plays once `ready`. */}
          <>
              <m.div
                initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/80 backdrop-blur"
              >
                <span className="pulse-dot relative h-2 w-2 rounded-full bg-emerald-400" />
                Open to new roles · Remote / Relocation
              </m.div>

              <h1 className="text-[clamp(3.4rem,13vw,9.5rem)] font-light leading-[0.88] tracking-[-0.055em]">
                <SplitReveal text="Asad" delay={0.15} play={ready} />
                <br />
                <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  <SplitReveal text="Raza" delay={0.3} play={ready} />
                </span>
              </h1>

              <m.p
                initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease, delay: 0.6 }}
                className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70 sm:text-xl"
              >
                Senior React Native engineer. For 7+ years I’ve built mobile apps people trust with their{" "}
                <em className="font-serif text-2xl text-bone not-italic sm:text-[1.6rem]"><i>money</i></em>,{" "}
                <em className="font-serif text-2xl text-bone not-italic sm:text-[1.6rem]"><i>health</i></em> and{" "}
                <em className="font-serif text-2xl text-bone not-italic sm:text-[1.6rem]"><i>data</i></em>.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease, delay: 0.75 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <a href="#work" data-cursor="View" className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-ink transition hover:bg-bone">
                    Selected work <ArrowDownRight size={18} className="transition-transform duration-500 group-hover:-rotate-45" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download className="flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-bone/90 transition hover:border-bone/40 hover:bg-bone/5">
                    <Download size={17} /> Résumé
                  </a>
                </Magnetic>
              </m.div>
          </>
        </div>

        <PhoneMock ready={ready} />
      </m.div>

      <m.div
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <m.span className="absolute inset-x-0 top-0 h-4 bg-bone" animate={{ y: [-16, 40] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
        </span>
      </m.div>
    </section>
  );
}

/* ---------- Interactive phone with rotating app screens ---------- */

const screens = [
  { key: "wallet", label: "Fintech · Web3", Icon: Wallet },
  { key: "health", label: "Health-tech", Icon: HeartPulse },
  { key: "secure", label: "Secure capture", Icon: ShieldCheck },
];
const chips = [
  { t: "Expo · EAS", c: "-left-6 top-16 sm:-left-14" },
  { t: "TypeScript", c: "-right-4 top-36 sm:-right-12" },
  { t: "WalletConnect v2", c: "-left-4 bottom-28 sm:-left-20" },
  { t: "mTLS", c: "-right-2 bottom-12 sm:-right-8" },
];

function PhoneMock({ ready }) {
  const [i, setI] = useState(0);
  const fine = useMedia("(pointer: fine)");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 14 });

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % screens.length), 3400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const move = (e) => { mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [fine, mx, my]);

  const S = screens[i];
  return (
    <m.div
      initial={{ opacity: 0, y: 80, rotateX: 25 }}
      animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      transition={{ duration: 1.4, ease, delay: 0.4 }}
      className="relative mx-auto w-[min(76vw,300px)] [perspective:1200px]"
    >
      <m.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        {/* glow */}
        <div className="absolute inset-6 -z-10 rounded-[3rem] bg-accent/30 blur-3xl" />
        {/* frame */}
        <div className="relative aspect-[9/19.2] rounded-[2.9rem] border border-white/15 bg-gradient-to-b from-[#2a2a2e] to-[#121214] p-[9px] shadow-[0_60px_120px_-30px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.12)]">
          <div className="relative h-full overflow-hidden rounded-[2.35rem] bg-[#0e0e10]">
            <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center justify-between px-6 pt-3 font-mono text-[10px] text-bone/70"><span>9:41</span><span>5G ▮▮▮</span></div>
            <AnimatePresence mode="wait">
              <m.div
                key={S.key}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease }}
                className="absolute inset-0 px-4 pt-14"
              >
                {S.key === "wallet" && <WalletScreen />}
                {S.key === "health" && <HealthScreen />}
                {S.key === "secure" && <SecureScreen />}
              </m.div>
            </AnimatePresence>
            {/* tab bar */}
            <div className="absolute inset-x-3 bottom-3 flex justify-around rounded-2xl border border-white/5 bg-white/[0.04] py-2.5 backdrop-blur">
              {screens.map((s, k) => (
                <s.Icon key={s.key} size={16} className={k === i ? "text-accent" : "text-bone/30"} />
              ))}
            </div>
          </div>
        </div>
        {/* glare */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.9rem] bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent" />
      </m.div>

      {chips.map((c, k) => (
        <m.span
          key={c.t}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, k % 2 ? 10 : -10, 0] }}
          transition={{ opacity: { delay: 1 + k * 0.12 }, scale: { delay: 1 + k * 0.12, ease }, y: { repeat: Infinity, duration: 4 + k, ease: "easeInOut" } }}
          className={`absolute ${c.c} z-10 whitespace-nowrap rounded-full border border-line bg-ink-2/80 px-3 py-1.5 font-mono text-[10px] text-bone/80 shadow-xl backdrop-blur-md`}
        >
          {c.t}
        </m.span>
      ))}

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
        <AnimatePresence mode="wait">
          <m.span key={S.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-block">
            {S.label}
          </m.span>
        </AnimatePresence>
      </p>
    </m.div>
  );
}

function WalletScreen() {
  const pts = "0,40 15,34 30,37 45,22 60,26 75,12 90,16 105,6 120,10";
  return (
    <div className="space-y-3">
      <p className="text-[10px] text-bone/50">Total balance</p>
      <p className="text-3xl font-light tracking-tight">$24,810<span className="text-bone/40">.42</span></p>
      <p className="text-[10px] text-emerald-400">▲ 4.2% today</p>
      <svg viewBox="0 0 120 46" className="h-20 w-full">
        <defs><linearGradient id="wg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ff5f2e" stopOpacity=".45" /><stop offset="1" stopColor="#ff5f2e" stopOpacity="0" /></linearGradient></defs>
        <m.polygon points={`${pts} 120,46 0,46`} fill="url(#wg)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        <m.polyline points={pts} fill="none" stroke="#ff5f2e" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease }} />
      </svg>
      {[["ETH", "Ethereum", "$12,400"], ["USDC", "USD Coin", "$8,210"], ["SOL", "Solana", "$4,200"]].map(([s, n, v], k) => (
        <m.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.1 }} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2">
          <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[8px]">{s[0]}</span><span className="text-[11px]">{n}</span></div>
          <span className="font-mono text-[10px] text-bone/70">{v}</span>
        </m.div>
      ))}
      <div className="rounded-xl border border-accent/30 bg-accent/10 py-2 text-center text-[10px] text-accent">WalletConnect · Connected</div>
    </div>
  );
}

function HealthScreen() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] text-bone/50">Good morning, Sarah</p>
      <div className="rounded-2xl bg-white/[0.04] p-3">
        <div className="flex items-center justify-between"><span className="text-[10px] text-bone/60">Heart rate</span><HeartPulse size={14} className="text-rose-400" /></div>
        <p className="mt-1 text-2xl font-light">72 <span className="text-xs text-bone/40">bpm</span></p>
        <svg viewBox="0 0 120 30" className="mt-1 h-8 w-full">
          <m.path d="M0 15 H30 L36 4 L42 26 L48 15 H70 L76 6 L82 24 L88 15 H120" fill="none" stroke="#fb7185" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[["Steps", "8,240", 0.72, "#a99bff"], ["Sleep", "7h 20m", 0.88, "#34d399"]].map(([l, v, p, c]) => (
          <div key={l} className="rounded-2xl bg-white/[0.04] p-3">
            <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
              <m.circle cx="18" cy="18" r="15" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: p }} transition={{ duration: 1.2, ease }} />
            </svg>
            <p className="mt-2 text-[9px] text-bone/50">{l}</p>
            <p className="text-xs">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-[10px] text-bone/70">Next: Dr. Patel · 10:30 AM</div>
    </div>
  );
}

function SecureScreen() {
  return (
    <div className="flex h-[78%] flex-col items-center justify-center gap-5 text-center">
      <div className="relative grid h-24 w-24 place-items-center rounded-full border border-emerald-400/30">
        <Fingerprint size={44} className="text-emerald-400" />
        <m.span className="absolute inset-x-3 h-px bg-emerald-300 shadow-[0_0_12px_#6ee7b7]" animate={{ top: ["15%", "85%", "15%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <div>
        <p className="text-sm">Verify to seal evidence</p>
        <p className="mt-1 text-[10px] text-bone/50">App Attest · on-device sealing</p>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 8 }).map((_, k) => (
          <m.span key={k} className="h-1 w-4 rounded-full" initial={{ backgroundColor: "rgba(255,255,255,.1)" }} animate={{ backgroundColor: k < 6 ? "#34d399" : "rgba(255,255,255,.1)" }} transition={{ delay: 0.2 + k * 0.12 }} />
        ))}
      </div>
      <p className="font-mono text-[9px] text-bone/40">STEP 6 / 8 · mTLS READY</p>
    </div>
  );
}

