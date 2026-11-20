import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import GooeyNav from "./GooeyNav";
import { ScrollProgress } from "./ScrollProgress";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the gooey pill on the section currently in view.
  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + 160;
      let next = 0;

      links.forEach((link, index) => {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
          next = index;
        }
      });

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="font-display text-2xl tracking-wide">
            SADEEDA
          </a>

          <GooeyNav
            items={links}
            activeIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
            theme="dark"
            color="#e3bd7b"
            size="md"
            frame={true}
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect={true}
            className="hidden md:inline-flex"
          />

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wider text-primary-foreground uppercase transition hover:opacity-90 lg:inline-block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition hover:border-gold/50 hover:text-gold md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-3.5 text-sm tracking-[0.2em] text-muted-foreground uppercase transition hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-4 mb-3 rounded-full bg-primary px-4 py-3 text-center text-xs font-medium tracking-wider text-primary-foreground uppercase transition hover:opacity-90"
              >
                Get in touch
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
