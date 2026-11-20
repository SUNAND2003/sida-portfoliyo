import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across a full viewport pass. Negative moves slower than the page. */
  speed?: number;
  axis?: "y" | "x";
}

/**
 * Scroll-linked parallax on a single axis.
 *
 * Sets an inline transform, so it must wrap the target rather than share an
 * element with ScrollReveal or any Tailwind transform utility.
 * Honors `prefers-reduced-motion`.
 */
export function Parallax({ children, className = "", speed = 30, axis = "y" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 when the element sits just below the fold, 1 when it has just left
      // the top of the screen, 0 when it is centred.
      const progress =
        (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2 || 1);
      const offset = progress * speed;
      el.style.transform =
        axis === "y"
          ? `translate3d(0, ${offset.toFixed(2)}px, 0)`
          : `translate3d(${offset.toFixed(2)}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, axis]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
