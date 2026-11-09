import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";

type ProjectFrameProps = {
  project: Project;
  /** Alternates the placeholder's color weighting between cards. */
  index: number;
  /** Larger type in the placeholder (featured card). */
  large?: boolean;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function hostOf(url?: string) {
  if (!url) return "preview";
  try {
    return new URL(url).host;
  } catch {
    return "preview";
  }
}

/**
 * A browser window around the project's screenshot. With no `image`, it shows a
 * clearly labelled placeholder (hidden from assistive tech) until a real
 * screenshot is added to the project's content.
 */
export function ProjectFrame({ project, index, large = false }: ProjectFrameProps) {
  const { name, image, demo } = project;

  return (
    <div className="browser-frame overflow-hidden rounded-xl border border-border bg-surface-2">
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-border bg-surface px-3 py-2">
        <span className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-[#ff5f57]/70" />
          <i className="size-2.5 rounded-full bg-[#febc2e]/70" />
          <i className="size-2.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="mx-auto min-w-0 max-w-[75%] truncate rounded-md bg-bg/60 px-3 py-0.5 font-mono text-[11px] text-muted">
          {hostOf(demo)}
        </span>
        <span className="w-10 shrink-0 max-sm:hidden" />
      </div>

      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`Screenshot of ${name}`}
            width={800}
            height={450}
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 45vw, 90vw"
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`ph ${index % 2 ? "ph-blue" : "ph-violet"} absolute inset-0 flex flex-col gap-3 p-4 transition-transform duration-700 ease-out group-hover:scale-105`}
          >
            <div className="flex items-center gap-2">
              <i className="ph-dot" />
              <i className="ph-line w-10" style={step(0)} />
              <i className="ph-line ml-auto w-8" style={step(1)} />
            </div>
            <div className="space-y-2.5">
              <p
                className={`font-display font-bold leading-tight text-fg/90 ${large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
              >
                {name}
              </p>
              <i className="ph-line block w-3/4" style={step(2)} />
              <i className="ph-line block w-1/2" style={step(3)} />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2">
              <i className="ph-card" />
              <i className="ph-card" />
              <i className="ph-card" />
            </div>
            <span className="absolute bottom-2 right-3 rounded-full border border-dashed border-muted/60 bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-muted">
              Placeholder — screenshot coming
            </span>
          </div>
        )}

        <span aria-hidden="true" className="frame-sheen" />
        {demo && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center bg-gradient-to-t from-bg/80 via-bg/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-bg shadow-lg">
              Open live demo ↗
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
