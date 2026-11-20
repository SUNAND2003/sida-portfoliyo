import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { Instagram, Mail, Package, Palette, Phone, Printer, ArrowUp, ZoomIn } from "lucide-react";
import { categories, getLogoById, img } from "@/lib/work";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lightbox } from "@/components/Lightbox";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sadeeda — Graphic Designer, Kerala" },
      {
        name: "description",
        content: "Branding, logos, social media creatives, packaging and print design by Sadeeda.",
      },
      { property: "og:title", content: "Sadeeda — Graphic Designer, Kerala" },
      {
        property: "og:description",
        content: "Branding, logos, social media creatives, packaging and print design by Sadeeda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const skills = [
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Canva",
  "Branding",
  "Logo Design",
  "Packaging",
  "Posters",
  "Social Media",
];

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Logos, wordmarks and identity systems that give a business a face people remember.",
    tags: ["Logo design", "Brand marks", "Guidelines"],
  },
  {
    icon: Instagram,
    title: "Social Media",
    description:
      "Scroll-stopping creatives, campaign sets and templates built to perform feed by feed.",
    tags: ["Carousels", "Campaign sets", "Templates"],
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Labels and packaging that feel premium on the shelf and make sense in the hand.",
    tags: ["Labels", "Boxes", "Mockups"],
  },
  {
    icon: Printer,
    title: "Print & Collateral",
    description: "Posters, brochures, menus and print media — press-ready and pixel perfect.",
    tags: ["Posters", "Brochures", "Menus"],
  },
];

const tools = [
  { name: "Adobe Photoshop", level: 90 },
  { name: "Adobe Illustrator", level: 85 },
  { name: "Adobe InDesign", level: 75 },
  { name: "Canva", level: 95 },
];

const aboutCards = [
  {
    title: "Experience",
    items: [
      "Graphic Designer — Hexa Branding",
      "Junior Graphic Designer — Escent",
      "Graphic Designer — Monochrome FX",
    ],
  },
  { title: "Education", items: ["Diploma in Graphic Design", "Skillopt, Nilambur"] },
  { title: "Software", items: ["Photoshop", "Illustrator", "InDesign", "Canva"] },
  { title: "Soft skills", items: ["Attention to detail", "Creative thinking", "Time management"] },
  { title: "Interests", items: ["Design", "Art & Craft"] },
  { title: "Languages", items: ["Malayalam (Native)", "English (Intermediate)"] },
];

function Index() {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const shown = active === "all" ? categories : categories.filter((c) => c.key === active);
  const allProjectIds = categories.flatMap((c) => c.ids);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />

      <main className="mx-auto max-w-7xl px-5">
        {/* ------------------------------ About ------------------------------ */}
        <section id="about" className="py-24">
          <SectionHeading
            kicker="About"
            title={
              <>
                Designing with <span className="text-gold">intent</span>
              </>
            }
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ScrollReveal className="md:col-span-2">
              <div className="panel flex h-full flex-col justify-between gap-8 p-8 md:p-10">
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  I&apos;m a junior graphic designer based in Calicut, Kerala, working across
                  branding, social media, packaging and print. I like ideas that are simple, warm
                  and easy to remember — and I keep polishing until the details are right.
                </p>
                <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-gold uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  Open to freelance &amp; remote projects
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={90}>
              <div className="panel h-full p-8">
                <h3 className="text-sm tracking-[0.2em] text-gold uppercase">Now</h3>
                <ul className="mt-5 space-y-4">
                  <li>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">Role</p>
                    <p className="mt-1">Graphic Designer — Hexa Branding</p>
                  </li>
                  <li>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                      Based in
                    </p>
                    <p className="mt-1">Calicut, Kerala, India</p>
                  </li>
                  <li>
                    <p className="text-xs tracking-wider text-muted-foreground uppercase">
                      Focus areas
                    </p>
                    <p className="mt-1">Branding · Packaging · Social</p>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {aboutCards.map((info, i) => (
              <ScrollReveal key={info.title} delay={(i % 3) * 70} direction="up">
                <Info title={info.title} items={info.items} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ----------------------------- Services ---------------------------- */}
        <section id="services" className="py-16">
          <SectionHeading
            kicker="Services"
            title={
              <>
                What I <span className="text-gold">do</span>
              </>
            }
            delay={50}
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.title} delay={i * 90} direction="up">
                  <div className="group panel relative h-full overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10">
                    <span
                      aria-hidden
                      className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                    />
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-2xl tracking-wide uppercase">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wider text-muted-foreground uppercase"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ------------------------------- Work ------------------------------ */}
        <section id="work" className="py-16">
          <SectionHeading
            kicker="Portfolio"
            title={
              <>
                Selected <span className="text-gold">work</span>
              </>
            }
            delay={50}
            action={
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {[{ key: "all", title: "All" }, ...categories].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActive(c.key)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
                      active === c.key
                        ? "border-primary bg-primary font-medium text-primary-foreground shadow-md shadow-primary/20"
                        : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            }
          />

          {shown.map((c) => (
            <div key={c.key} className="mt-16">
              <ScrollReveal direction="up" delay={50}>
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-border/60 pb-4">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-display text-2xl text-gold">{c.no}</span>
                    <h3 className="font-display text-3xl tracking-wide uppercase md:text-4xl">
                      {c.title}
                    </h3>
                    {"subtitle" in c && c.subtitle && (
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-xs tracking-wider text-gold uppercase">
                        {c.subtitle}
                      </span>
                    )}
                  </div>
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    ({c.ids.length} {c.key === "logo" ? "logos" : "projects"})
                  </span>
                </div>
              </ScrollReveal>

              <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                {c.ids.map((id, idx) => {
                  const logo = getLogoById(id);
                  return (
                    <ScrollReveal
                      key={id}
                      delay={(idx % 3) * 100}
                      direction="up"
                      className="mb-6 break-inside-avoid"
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(id)}
                        style={logo ? { backgroundColor: logo.bg } : undefined}
                        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/10"
                      >
                        {logo ? (
                          <div className="flex aspect-[4/3] items-center justify-center p-8 sm:p-10">
                            <img
                              src={img(id)}
                              alt={`${logo.name} logo`}
                              loading="lazy"
                              className="max-h-28 w-auto max-w-[85%] object-contain drop-shadow transition duration-500 group-hover:scale-110"
                            />
                          </div>
                        ) : (
                          <img
                            src={img(id)}
                            alt={`${c.title} project`}
                            loading="lazy"
                            className="w-full transition duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
                          <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-background/90 px-4 py-2 text-xs font-medium tracking-wider text-gold uppercase shadow-xl backdrop-blur">
                            <ZoomIn className="h-4 w-4" aria-hidden />{" "}
                            {logo ? "View Logo" : "View Full"}
                          </span>
                        </div>
                      </button>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ------------------------------ Skills ----------------------------- */}
        <section id="skills" className="py-24">
          <SectionHeading
            kicker="Capabilities"
            title={
              <>
                Tools &amp; <span className="text-gold">skills</span>
              </>
            }
            align="center"
            delay={50}
          />

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Software proficiency
              </p>
              <div className="mt-6 space-y-5">
                {tools.map((tool, i) => (
                  <ScrollReveal key={tool.name} delay={i * 80} direction="up">
                    <div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-medium">{tool.name}</span>
                        <span className="font-display text-gold">{tool.level}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="bar-fill h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                          style={
                            {
                              "--bar-width": `${tool.level}%`,
                              "--bar-delay": `${i * 120}ms`,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Design capabilities
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((s, idx) => (
                  <ScrollReveal key={s} delay={idx * 45} direction="up">
                    <span className="block rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:border-gold/50 hover:text-gold hover:shadow-lg hover:shadow-gold/10">
                      {s}
                    </span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ Contact ---------------------------- */}
        <section id="contact" className="py-16">
          <ScrollReveal direction="up" delay={100}>
            <div className="panel relative overflow-hidden p-10 text-center md:p-16">
              <span
                aria-hidden
                className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
              />
              <p className="relative text-xs tracking-[0.3em] text-gold uppercase">
                Let&apos;s work together
              </p>
              <h2 className="relative mt-4 font-display text-6xl uppercase md:text-8xl">
                Thank you
              </h2>
              <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">
                Have a brand, product or campaign in mind? I&apos;d love to hear about it.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20ba5a] hover:shadow-xl hover:shadow-[#25D366]/30"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-90"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>{EMAIL}</span>
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition hover:bg-secondary"
                >
                  <Phone className="h-4 w-4 text-gold" aria-hidden />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Sadeeda · Graphic Designer, Calicut, Kerala</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase transition hover:text-gold"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </footer>

      <Lightbox
        openId={open}
        ids={allProjectIds}
        onSelect={setOpen}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="panel h-full p-6">
      <h3 className="text-sm tracking-[0.2em] text-gold uppercase">{title}</h3>
      <ul className="mt-4 space-y-1 text-lg">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
