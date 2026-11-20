import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  /** Right-hand side of the heading row — filters, a link, a count… */
  action?: ReactNode;
  align?: "left" | "center";
  delay?: number;
}

export function SectionHeading({
  kicker,
  title,
  action,
  align = "left",
  delay = 0,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <ScrollReveal delay={delay} className={centered ? "text-center" : ""}>
      <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold">{kicker}</span>
        <span aria-hidden className="h-px w-16 bg-gradient-to-r from-gold/60 to-transparent" />
      </div>

      {centered ? (
        <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] md:text-6xl">{title}</h2>
      ) : (
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl uppercase leading-[0.95] md:text-7xl">{title}</h2>
          {action}
        </div>
      )}
    </ScrollReveal>
  );
}
