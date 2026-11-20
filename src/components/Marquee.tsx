import { Fragment, type ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
}

/**
 * Infinite horizontal marquee. The track holds two identical halves and the
 * animation translates by exactly -50%, so the loop has no seam.
 */
export function Marquee({ items, className = "", duration = 34 }: MarqueeProps) {
  const half = (id: string) => (
    <div key={id} className="flex shrink-0 items-center gap-8 pe-8" aria-hidden={id === "b"}>
      {items.map((item, i) => (
        <Fragment key={`${id}-${i}`}>
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="text-[0.6em] text-gold/70">
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden mask-fade-x ${className}`}>
      <div className="flex w-max animate-marquee" style={{ animationDuration: `${duration}s` }}>
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
