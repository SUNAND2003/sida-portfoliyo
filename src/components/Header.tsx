import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  // Render GooeyNav only on desktop; mobile must not mount it at all.
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the gooey pill and the mobile drawer in sync with the section in view.
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

  // Close the drawer if the viewport grows into desktop width while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

          {isDesktop && (
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
          )}

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wider text-primary-foreground uppercase transition hover:opacity-90 lg:inline-block"
            >
              Get in touch
            </a>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition hover:border-gold/50 hover:text-gold md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="h-dvh w-[86vw] max-w-[22rem] border-border bg-background/95 p-0 backdrop-blur-xl sm:max-w-[22rem] md:hidden"
              >
                <div className="flex h-full flex-col p-6">
                  <SheetTitle className="font-display text-2xl tracking-wide">SADEEDA</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation</SheetDescription>

                  <nav className="mt-10 flex flex-col gap-2">
                    {links.map((link, index) => (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setActiveIndex(index)}
                          className={`group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition ${
                            index === activeIndex
                              ? "border-gold/50 bg-gold/10 text-gold"
                              : "border-transparent text-foreground hover:border-border hover:bg-secondary/60 hover:text-gold"
                          }`}
                        >
                          <span className="text-[11px] tracking-[0.25em] text-muted-foreground">
                            0{index + 1}
                          </span>
                          <span className="font-display text-xl tracking-wide">{link.label}</span>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>

                  <SheetClose asChild>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 rounded-full bg-primary px-4 py-3 text-center text-xs font-medium tracking-wider text-primary-foreground uppercase transition hover:opacity-90"
                    >
                      Get in touch
                    </a>
                  </SheetClose>

                  <p className="mt-auto border-t border-border pt-5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Calicut, Kerala, India
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
