import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in ms — use it to cascade a group of siblings. */
  delay?: number;
  /** Transition duration in ms. */
  duration?: number;
  direction?: RevealDirection;
  /** Start offset. A number is px; a string is used as-is, e.g. "110%" for masked lines. */
  distance?: number | string;
  /** Initial blur radius in px (0 = none). */
  blur?: number;
  /** Intersection ratio required before revealing. */
  threshold?: number;
  /** Element to render — use "span" when the parent only accepts phrasing content (e.g. inside <h1>). */
  as?: "div" | "span";
}

/**
 * Reveals its children once they scroll into view.
 *
 * The transition itself lives in styles.css (`.reveal`), so every reveal across
 * the site shares one easing curve. Honors `prefers-reduced-motion`.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  direction = "up",
  distance = 40,
  blur = 0,
  threshold = 0.15,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    // Anything already on screen reveals on the next frame, so the browser has
    // a starting style to transition from instead of popping in.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": typeof distance === "number" ? `${distance}px` : distance,
    "--reveal-blur": `${blur}px`,
  } as CSSProperties;

  const shared = {
    "data-reveal": direction,
    className: `reveal ${isVisible ? "is-revealed" : ""} ${className}`.trim(),
    style,
  };

  if (as === "span") {
    return (
      <span ref={ref as Ref<HTMLSpanElement>} {...shared}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} {...shared}>
      {children}
    </div>
  );
}
