import type { ReactNode } from "react";
import katex from "katex";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="prose-bab mt-4">{children}</div>
    </section>
  );
}

/** Inline or block formula rendered on the server with KaTeX. */
export function Formula({ tex, block = false }: { tex: string; block?: boolean }) {
  const html = katex.renderToString(tex, {
    displayMode: block,
    throwOnError: false,
  });
  return block ? (
    <div
      className="my-5 overflow-x-auto rounded-xl bg-surface px-4 py-4 text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

const CALLOUT_STYLES = {
  analogi: { label: "Analogi", className: "border-accent bg-accent-soft" },
  penting: { label: "Penting", className: "border-warm bg-warm-soft" },
  catatan: { label: "Catatan", className: "border-line bg-surface" },
};

export function Callout({
  kind,
  children,
}: {
  kind: keyof typeof CALLOUT_STYLES;
  children: ReactNode;
}) {
  const style = CALLOUT_STYLES[kind];
  return (
    <aside className={`my-6 rounded-xl border-l-4 px-4 py-3 ${style.className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {style.label}
      </p>
      <div className="mt-1 [&>p]:my-1">{children}</div>
    </aside>
  );
}

export function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function Summary({ points }: { points: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {points.map((point, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
