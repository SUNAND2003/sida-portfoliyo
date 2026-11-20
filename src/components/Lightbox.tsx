import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories, getLogoById, img } from "@/lib/work";

interface LightboxProps {
  /** Project id currently open, or null when closed. */
  openId: string | null;
  /** Every project id, in gallery order. */
  ids: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function Lightbox({ openId, ids, onSelect, onClose }: LightboxProps) {
  const index = openId ? ids.indexOf(openId) : -1;
  const currentLogo = openId ? getLogoById(openId) : undefined;
  const currentCategory = openId
    ? categories.find((c) => (c.ids as readonly string[]).includes(openId))
    : undefined;

  const stepTo = useCallback(
    (step: number) => {
      if (index === -1 || ids.length === 0) return;
      const target = ids[(index + step + ids.length) % ids.length];
      if (target) onSelect(target);
    },
    [index, ids, onSelect],
  );

  useEffect(() => {
    if (!openId) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") stepTo(-1);
      else if (e.key === "ArrowRight") stepTo(1);
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openId, stepTo, onClose]);

  if (!openId) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-secondary hover:text-gold"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          stepTo(-1);
        }}
        className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-secondary hover:text-gold"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          stepTo(1);
        }}
        className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:bg-secondary hover:text-gold"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
      >
        {currentLogo ? (
          <div
            style={{ backgroundColor: currentLogo.bg }}
            className="flex max-h-[75vh] w-[88vw] max-w-2xl items-center justify-center rounded-3xl border border-border/80 p-10 shadow-2xl sm:p-16"
          >
            <img
              src={img(openId)}
              alt={`${currentLogo.name} logo preview`}
              className="max-h-[55vh] max-w-[90%] object-contain drop-shadow-xl"
            />
          </div>
        ) : (
          <img
            src={img(openId)}
            alt="Project preview"
            className="max-h-[80vh] max-w-full rounded-2xl border border-border/80 object-contain shadow-2xl"
          />
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="font-semibold uppercase text-gold">
            {currentCategory?.title ?? "Project"}
          </span>
          <span aria-hidden>·</span>
          <span className="text-foreground">{currentLogo ? currentLogo.name : `#${openId}`}</span>
          {currentLogo && (
            <>
              <span aria-hidden>·</span>
              <span className="text-gold">{currentLogo.category}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>
            {index + 1} of {ids.length}
          </span>
        </div>
      </div>
    </div>
  );
}
