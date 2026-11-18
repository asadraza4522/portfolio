import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight, Check, Copy, Download, Fingerprint, GraduationCap, HeartPulse, Languages, Mail, MapPin, Phone, ShoppingBag, Wallet,
} from "lucide-react";
import { domains, education, experience, languages, marquee, moreWork, profile, projects, skills, stats } from "./data";
import { Counter, Magnetic, Reveal, ScrollWords, SplitReveal, ease, useMedia } from "./fx";
import reactApp from "./assets/react-app.jpg";

// { onelinedraw: "/assets/onelinedraw-xxxx.jpg", ... } keyed by file name.
const shots = Object.fromEntries(
  Object.entries(import.meta.glob("./assets/projects/*.jpg", { eager: true, import: "default" }))
    .map(([path, url]) => [path.match(/([\w-]+)\.jpg$/)[1], url]),
);
import portrait from "./assets/asad.jpg";

const icons = import.meta.glob("./assets/skills/*.svg", { eager: true, import: "default" });
const icon = (n) => icons[`./assets/skills/${n}.svg`];

function Eyebrow({ n, children }) {
  return (
    <Reveal className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
      <span className="text-accent">{n}</span><span className="h-px w-10 bg-line" />{children}
    </Reveal>
  );
}

const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/* ---------------- Stats + marquee ---------------- */

export function Stats() {
  return (
    <section className={`${wrap} pb-24`}>
      <div className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className={`py-8 md:px-6 ${i % 2 ? "pl-4 border-l border-line" : ""} ${i === 2 ? "md:border-l border-t md:border-t-0 border-line" : ""} ${i === 3 ? "border-t md:border-t-0" : ""}`}>
            <p className="text-5xl font-light tracking-tight sm:text-6xl"><Counter to={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const half = Math.ceil(marquee.length / 2);
  const rows = [marquee.slice(0, half), marquee.slice(half)];
  return (
    <section aria-label="Technologies" className="marquee-wrap relative space-y-4 overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className={`marquee flex w-max gap-4 ${r ? "reverse" : ""}`} style={{ "--dur": `${45 + r * 10}s` }}>
          {[...row, ...row].map(([k, label], i) => (
            <div key={i} aria-hidden={i >= row.length} className="flex items-center gap-3 rounded-full border border-line bg-ink-2 py-2.5 pl-2.5 pr-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-bone/90 p-1.5"><img src={icon(k)} alt="" className="h-full w-full object-contain" loading="lazy" /></span>
              <span className="whitespace-nowrap text-sm text-bone/80">{label}</span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

/* ---------------- About + domains ---------------- */

const domainIcon = { fintech: Wallet, health: HeartPulse, security: Fingerprint, commerce: ShoppingBag, edtech: GraduationCap };

export function About() {
  return (
    <section id="about" className={`${wrap} py-28 md:py-40`}>
      <Eyebrow n="01">About</Eyebrow>
      <ScrollWords
        as="h2"
        text="I turn complex, high-stakes products into mobile apps that feel effortless — from wallets and health records to evidence that has to stand up in court."
        className="max-w-5xl text-[clamp(1.75rem,4.6vw,3.6rem)] font-light leading-[1.12] tracking-[-0.03em]"
      />
      <div className="mt-16 grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Portrait />
        <div>
          <Reveal className="text-lg leading-relaxed text-bone/65">{profile.summary}</Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[["Based in", profile.location], ["Experience", "7+ years"], ["Focus", "React Native · Expo"], ["Languages", languages.join(", ")]].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="bg-ink p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{k}</dt>
                <dd className="mt-2 text-[15px] text-bone/90">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {domains.map((d, i) => {
          const Icon = domainIcon[d.key];
          return (
            <Reveal key={d.key} delay={i * 0.06} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <Spotlight className="h-full p-7">
                <Icon className="text-accent" size={26} strokeWidth={1.5} />
                <h3 className="mt-10 text-2xl font-light tracking-tight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/55">{d.text}</p>
              </Spotlight>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// Photo unmasks upward on entry and drifts with scroll (parallax).
function Portrait() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <m.figure
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, ease }}
      className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-ink-2"
    >
      <m.img
        src={portrait}
        alt="Asad Raza in downtown Dubai"
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover object-center grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-white/10 bg-ink/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/80 backdrop-blur-md">
        <span>Asad Raza</span>
        <span className="flex items-center gap-2"><span className="pulse-dot relative h-1.5 w-1.5 rounded-full bg-emerald-400" />Available</span>
      </figcaption>
    </m.figure>
  );
}

// Card with a radial highlight that follows the pointer.
function Spotlight({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-bone/20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x)_var(--y),rgba(255,95,46,.12),transparent_60%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------------- Work ---------------- */

export function Work() {
  const desktop = useMedia("(min-width: 1024px)");
  return (
    <section id="work" className="relative">
      {desktop ? <HorizontalWork /> : (
        <div className={`${wrap} py-24`}>
          <WorkIntro />
          <div className="mt-12 space-y-6">
            {projects.map((p, i) => <Reveal key={p.name}><ProjectCard p={p} i={i} /></Reveal>)}
          </div>
        </div>
      )}
      <MoreWork />
    </section>
  );
}

function WorkIntro() {
  return (
    <div className="lg:w-[30rem] lg:shrink-0">
      <Eyebrow n="02">Selected work</Eyebrow>
      <h2 className="text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.045em]">
        <SplitReveal text="Apps in" /> <span className="font-serif italic text-accent"><SplitReveal text="people’s" delay={0.1} /></span>
        <br /><SplitReveal text="pockets." delay={0.2} />
      </h2>
      <Reveal className="mt-6 max-w-sm text-bone/55">Shipped to the App Store and Google Play for clients in the US, UK, Qatar and Pakistan.</Reveal>
    </div>
  );
}

function HorizontalWork() {
  const ref = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  useLayoutEffect(() => {
    const measure = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    return () => ro.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), { stiffness: 140, damping: 30, mass: 0.3 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <m.div ref={track} style={{ x }} className="flex w-max items-center gap-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-[8vw]">
          <WorkIntro />
          {projects.map((p, i) => (
            <div key={p.name} className="w-[min(36rem,44vw)] shrink-0"><ProjectCard p={p} i={i} /></div>
          ))}
        </m.div>
        <div className="mx-auto mt-10 h-px w-full max-w-6xl bg-line">
          <m.div style={{ width: bar }} className="h-px bg-accent" />
        </div>
      </div>
    </div>
  );
}

function ProjectArt({ p }) {
  if (p.image === "react") {
    return <img src={reactApp} alt="REACT app screenshot" className="h-full w-full object-cover object-[50%_35%] transition-transform duration-[1.2s] ease-out group-hover:scale-105" loading="lazy" />;
  }
  const h = p.hue;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `radial-gradient(120% 90% at 20% 10%, hsl(${h} 90% 60% / .55), transparent 55%), radial-gradient(90% 80% at 90% 100%, hsl(${(h + 60) % 360} 80% 55% / .4), transparent 60%), #141416` }}>
      <div className="grid-bg absolute inset-0 opacity-60" />
      {p.logo ? (
        <img src={shots[p.logo]} alt={`${p.name} logo`} loading="lazy" className="absolute right-[9%] top-1/2 aspect-square w-[34%] -translate-y-1/2 rounded-[22%] object-cover shadow-2xl shadow-black/50 ring-1 ring-white/15 transition-transform duration-[1.2s] ease-out group-hover:-translate-y-[56%] group-hover:rotate-[-4deg]" />
      ) : (
        <div className={`absolute right-[10%] aspect-[9/19] w-[34%] rounded-[1.8rem] border border-white/20 bg-black/40 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-sm transition-transform duration-[1.2s] ease-out group-hover:-translate-y-4 group-hover:rotate-[-3deg] ${p.shot ? "top-[9%]" : "bottom-[-18%] p-2"}`}>
          {p.shot ? (
            <img src={shots[p.shot]} alt={`${p.name} app screen`} loading="lazy" className="h-full w-full rounded-[1.45rem] object-cover object-top" />
          ) : (
            <div className="h-full rounded-[1.4rem] border border-white/10" style={{ background: `linear-gradient(180deg, hsl(${h} 70% 55% / .35), transparent)` }}>
              <div className="space-y-2 p-3 pt-6">
                <div className="h-2 w-2/3 rounded-full bg-white/40" />
                <div className="h-2 w-1/2 rounded-full bg-white/20" />
                <div className="mt-4 h-14 rounded-xl bg-white/10" />
                <div className="h-8 rounded-xl bg-white/10" />
              </div>
            </div>
          )}
        </div>
      )}
      <span className="absolute left-6 top-5 max-w-[52%] font-serif text-[clamp(3rem,6vw,5rem)] italic leading-none text-white/90 mix-blend-overlay">{p.name}</span>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const Tag = p.link ? "a" : "div";
  return (
    <Tag
      {...(p.link ? { href: p.link, target: "_blank", rel: "noreferrer", "data-cursor": "Open" } : {})}
      className="group block overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 transition-colors duration-500 hover:border-bone/20"
    >
      <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[44vh]"><ProjectArt p={p} /></div>
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          <span>{String(i + 1).padStart(2, "0")} · {p.year}</span>
          <span className="flex items-center gap-1.5">{p.store}{p.link && <ArrowUpRight size={14} className="text-accent transition-transform duration-500 group-hover:rotate-45" />}</span>
        </div>
        <h3 className="mt-4 text-3xl font-light tracking-tight">{p.name}<span className="ml-3 text-base text-bone/45">{p.kind}</span></h3>
        <p className="mt-3 text-sm leading-relaxed text-bone/60 lg:line-clamp-3">{p.text}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-bone/70">{t}</span>)}
        </div>
      </div>
    </Tag>
  );
}

function MoreWork() {
  return (
    <div className={`${wrap} py-24`}>
      <Reveal className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Also built</Reveal>
      <ul className="border-t border-line">
        {moreWork.map((w, i) => {
          const Row = w.link ? "a" : "div";
          return (
            <Reveal as="li" key={w.name} delay={i * 0.03}>
              <Row {...(w.link ? { href: w.link, target: "_blank", rel: "noreferrer" } : {})} className="group relative grid grid-cols-[1fr_auto] items-center gap-4 overflow-hidden border-b border-line py-5 sm:grid-cols-[1.2fr_1fr_auto]">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                <span className="relative text-2xl font-light tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-ink sm:text-3xl">{w.name}</span>
                <span className="relative hidden text-sm text-bone/50 transition-colors duration-500 group-hover:text-ink/70 sm:block">{w.kind}</span>
                <span className="relative flex items-center gap-3 font-mono text-[11px] text-mute transition-all duration-500 group-hover:-translate-x-4 group-hover:text-ink">
                  {w.stack}{w.link && <ArrowUpRight size={14} />}
                </span>
              </Row>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------- Experience ---------------- */

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className={`${wrap} py-28 md:py-36`}>
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow n="03">Experience</Eyebrow>
          <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.045em]">
            <SplitReveal text="Seven" /> <span className="font-serif italic text-accent"><SplitReveal text="companies," delay={0.08} /></span><br />
            <SplitReveal text="seven years." delay={0.16} />
          </h2>
          <Reveal className="mt-6 max-w-xs text-bone/55">From native Android in 2018 to leading secure React Native builds today.</Reveal>
          <Reveal>
            <a href={profile.resume} download className="mt-8 inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm transition hover:border-accent hover:text-accent">
              <Download size={15} /> Full résumé (PDF)
            </a>
          </Reveal>
        </div>

        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <m.div style={{ scaleY }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" />
          <ol className="space-y-16">
            {experience.map((e, i) => (
              <m.li
                key={e.company}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease }}
                className="relative"
              >
                <m.span
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className={`absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink sm:-left-12 ${i === 0 ? "bg-accent shadow-[0_0_0_6px_rgba(255,95,46,.18)]" : "bg-bone"}`}
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{e.period} · {e.location}</p>
                <h3 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl">{e.role}</h3>
                <p className="mt-1 font-serif text-xl italic text-accent">{e.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-bone/65"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-bone/30" />{pt}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => <span key={t} className="rounded-full bg-bone/[0.06] px-3 py-1 text-xs text-bone/70">{t}</span>)}
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills + education ---------------- */

export function Skills() {
  return (
    <section id="skills" className={`${wrap} py-28 md:py-36`}>
      <Eyebrow n="04">Toolkit</Eyebrow>
      <h2 className="max-w-3xl text-[clamp(2.8rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.045em]">
        <SplitReveal text="Native at heart," /> <span className="font-serif italic text-accent"><SplitReveal text="full-stack" delay={0.1} /></span> <SplitReveal text="by habit." delay={0.18} />
      </h2>

      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06} className="bg-ink p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{g.group}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s, k) => (
                <m.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + k * 0.035, ease }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-line bg-ink-2 px-3.5 py-1.5 text-sm text-bone/80 transition-colors hover:border-accent/60 hover:text-bone"
                >{s}</m.span>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.3} className="bg-ink p-7">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute"><GraduationCap size={14} /> Education</p>
          {education.map((e) => (
            <div key={e.school} className="mt-5">
              <p className="text-lg font-light">{e.degree}</p>
              <p className="text-sm text-bone/50">{e.school} · {e.period}{e.note ? ` · ${e.note}` : ""}</p>
            </div>
          ))}
          <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute"><Languages size={14} /> {languages.join(" · ")}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact + footer ---------------- */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 28]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };

  return (
    <section id="contact" ref={ref} className="px-3 pb-3 sm:px-4 sm:pb-4">
      <m.div style={{ scale, borderRadius: radius }} className="relative overflow-hidden bg-bone px-5 pb-8 pt-24 text-ink sm:px-10 md:pt-32">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-accent/40 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50"><span className="text-accent">05</span> — Contact</p>
          <h2 className="mt-6 text-[clamp(3rem,10vw,9rem)] font-light leading-[0.88] tracking-[-0.055em]">
            <SplitReveal text="Let’s build" /><br />
            <span className="font-serif italic"><SplitReveal text="something trusted." delay={0.12} /></span>
          </h2>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} data-cursor="Write" className="flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-bone transition hover:bg-accent hover:text-ink">
                <Mail size={18} /> {profile.email}
              </a>
            </Magnetic>
            <button onClick={copy} aria-label="Copy email address" className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-bone">
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <m.span animate={{ opacity: copied ? 1 : 0, x: copied ? 0 : -8 }} className="font-mono text-xs text-ink/60" aria-live="polite">{copied ? "Copied!" : ""}</m.span>
          </div>

          <div className="mt-20 grid gap-8 border-t border-ink/10 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <FootLink href={profile.linkedin} label="LinkedIn" value="in/asadraza4522" icon={<LinkedIn />} />
            <FootLink href={`tel:${profile.phone.replace(/\s/g, "")}`} label="Phone / WhatsApp" value={profile.phone} icon={<Phone size={15} />} />
            <FootLink href={profile.resume} label="Résumé" value="Download PDF" icon={<Download size={15} />} download />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Local time</p>
              <p className="mt-2 flex items-center gap-2"><MapPin size={15} /> Rawalpindi · <Clock /></p>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45 sm:flex-row">
            <span>© {new Date().getFullYear()} Asad Raza</span>
            <a href="#top" className="hover:text-ink">Back to top ↑</a>
          </div>
        </div>
      </m.div>
    </section>
  );
}

function FootLink({ href, label, value, icon, download }) {
  return (
    <a href={href} {...(download ? { download: true } : { target: "_blank", rel: "noreferrer" })} className="group">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{label}</p>
      <p className="mt-2 flex items-center gap-2">{icon}<span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{value}</span></p>
    </a>
  );
}

function Clock() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return <span className="tabular-nums">{t} PKT</span>;
}

// lucide v1 dropped brand icons.
function LinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
