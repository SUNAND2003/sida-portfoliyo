import { type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { img } from "@/lib/work";
import { WHATSAPP_URL } from "@/lib/contact";
import { CountUp } from "./CountUp";
import { Marquee } from "./Marquee";
import { Parallax } from "./Parallax";
import { ScrollReveal } from "./ScrollReveal";

const marqueeItems = [
  "Branding",
  "Logo Design",
  "Packaging",
  "Social Media",
  "Print Media",
  "Posters",
  "Typography",
  "Photo Editing",
];

const stats = [
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "", label: "Design Categories" },
];

/** One headline line, revealed from behind a mask so it wipes up into place. */
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <ScrollReveal
        as="span"
        className="block whitespace-nowrap"
        delay={delay}
        duration={950}
        distance="110%"
      >
        {children}
      </ScrollReveal>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh_-_4rem)] flex-col overflow-hidden"
    >
      {/* Ambient background: blueprint grid + two soft glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-40 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-gold/12 blur-[130px]" />
        <div className="absolute bottom-[-25%] left-[-12%] h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-14 md:grid-cols-12 md:items-center md:gap-8 md:py-16 lg:gap-12">
          {/* ---------------- Copy ---------------- */}
          <div className="min-w-0 md:col-span-7">
            <ScrollReveal delay={60} distance={22} blur={4}>
              <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-gold/30 bg-gold/8 px-3 py-2 text-[10px] font-medium tracking-[0.2em] text-gold uppercase whitespace-nowrap backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.25em]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                Graphic Designer · Kerala
              </span>
            </ScrollReveal>

            <p className="mt-6 text-[11px] leading-relaxed tracking-[0.3em] text-muted-foreground uppercase sm:text-xs">
              <ScrollReveal as="span" className="block" delay={140} distance="110%">
                Hi, I&apos;m Sadeeda — Junior Graphic Designer
              </ScrollReveal>
            </p>

            <h1 className="mt-3 font-display text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.92] tracking-tight uppercase">
              <Line delay={220}>Crafting</Line>
              <Line delay={330}>
                <span className="text-gold">Bold</span> Visuals
              </Line>
              <Line delay={440}>
                <span className="text-outline">That Speak.</span>
              </Line>
            </h1>

            <ScrollReveal delay={560} distance={26}>
              <p className="mt-6 max-w-[32rem] leading-relaxed text-muted-foreground sm:text-lg">
                Visual identities, scroll-stopping social content, elegant packaging and print that
                people remember — designed with care, down to the last pixel.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={650} distance={26}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/40 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  View my work
                  <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-gold/60 hover:text-gold sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={740} distance={26}>
              <div className="mt-10 grid max-w-[32rem] grid-cols-3 gap-4 border-t border-border pt-7 sm:gap-8 sm:pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <p className="font-display text-2xl text-gold sm:text-3xl md:text-4xl">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-[10px] leading-tight tracking-wider text-muted-foreground uppercase sm:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ---------------- Portrait ---------------- */}
          <div className="md:col-span-5">
            <div className="relative mx-auto h-[26rem] w-full max-w-[19rem] sm:h-[29rem] sm:max-w-[21rem] md:max-w-[18rem] lg:h-[33rem] lg:max-w-[22rem]">
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/25"
              />
              <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-gold/10 blur-3xl" />

              {/* Your photo — the focal point of the hero */}
              <Parallax speed={-22} className="absolute inset-0 z-10">
                <ScrollReveal delay={280} direction="up" distance={64} className="h-full">
                  <div className="group relative h-full w-full -rotate-2 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-black/50">
                    <img
                      src={img("007")}
                      alt="Sadeeda — Graphic Designer"
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] tracking-[0.3em] text-gold uppercase">
                        Hello, I&apos;m
                      </p>
                      <p className="font-display text-3xl uppercase">Sadeeda</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Graphic Designer · Kerala
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </Parallax>

              {/* Floating availability card */}
              <Parallax speed={26} className="absolute -top-5 -left-5 z-20 w-40 sm:-left-8">
                <ScrollReveal delay={520} direction="down" distance={42}>
                  <div className="rotate-3">
                    <div
                      className="animate-float rounded-2xl border border-gold/30 bg-card/95 p-4 shadow-xl shadow-black/40 backdrop-blur"
                      style={{ animationDuration: "7s" }}
                    >
                      <p className="text-[10px] tracking-[0.25em] text-gold uppercase">
                        Available for
                      </p>
                      <p className="mt-1 font-display text-xl uppercase">Freelance</p>
                      <p className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                        </span>
                        Open to projects
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </Parallax>

              {/* Floating stat chip */}
              <Parallax speed={16} className="absolute -right-5 bottom-10 z-20 w-32">
                <ScrollReveal delay={640} direction="left" distance={40}>
                  <div className="-rotate-3">
                    <div
                      className="animate-float rounded-2xl border border-border bg-background/90 px-4 py-3 text-center shadow-xl shadow-black/40 backdrop-blur"
                      style={{ animationDuration: "8.5s", animationDelay: "-2.5s" }}
                    >
                      <p className="font-display text-2xl text-gold">40+</p>
                      <p className="text-[9px] tracking-widest text-muted-foreground uppercase">
                        Projects done
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </Parallax>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="mx-auto hidden items-center gap-4 pb-6 text-[11px] tracking-[0.3em] text-muted-foreground uppercase md:flex">
        <span aria-hidden className="h-px w-12 bg-border" />
        Scroll to explore
        <ArrowDown aria-hidden className="h-3.5 w-3.5 animate-scroll-hint text-gold" />
        <span aria-hidden className="h-px w-12 bg-border" />
      </div>

      {/* Marquee */}
      <div className="border-y border-border/60 bg-background/30 py-4 backdrop-blur-sm">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
