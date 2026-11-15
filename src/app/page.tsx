import Link from "next/link";
import { HeroLattice } from "@/components/three/lazy";
import { DoneBadge, ProgressSummary } from "@/components/ui/ProgressBits";
import { chapters, parts, type Chapter } from "@/lib/curriculum";

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          Bab {chapter.number}
        </span>
        {chapter.available ? (
          <DoneBadge slug={chapter.slug} />
        ) : (
          <span className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
            Segera
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold">{chapter.title}</h3>
      <p className="mt-1 text-sm text-muted">{chapter.summary}</p>
      {chapter.available && (
        <p className="mt-4 text-sm font-medium text-accent">
          Mulai belajar{chapter.minutes ? ` · ${chapter.minutes} menit` : ""}
        </p>
      )}
    </>
  );

  const base = "block h-full rounded-2xl border p-5 transition-colors";

  return (
    <li>
      <Link
        href={`/bab/${chapter.slug}`}
        className={
          chapter.available
            ? `${base} border-line bg-surface hover:border-accent`
            : `${base} border-dashed border-line hover:border-muted`
        }
      >
        {body}
      </Link>
    </li>
  );
}

export default function HomePage() {
  const available = chapters.filter((chapter) => chapter.available);
  const first = available[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Dari atom sampai devais
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Belajar semikonduktor dan thin film dengan melihatnya langsung
          </h1>
          <p className="mt-4 max-w-prose text-lg text-muted">
            {chapters.length} bab yang berurutan dari nol. Setiap konsep punya
            model 3D yang bisa diputar dan diubah, jadi kamu tidak perlu
            membayangkannya sendiri.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/bab/${first.slug}`}
              className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 font-medium text-on-accent hover:opacity-90"
            >
              Mulai dari Bab 1
            </Link>
            <Link
              href="#kurikulum"
              className="inline-flex min-h-11 items-center rounded-xl border border-line px-5 font-medium hover:border-accent"
            >
              Lihat semua bab
            </Link>
          </div>
        </div>
        <div className="aspect-square w-full overflow-hidden rounded-3xl border border-line bg-[#0b1020] md:aspect-[5/4]">
          <HeroLattice />
        </div>
      </section>

      <ProgressSummary
        availableSlugs={available.map((chapter) => chapter.slug)}
        total={chapters.length}
      />

      <div id="kurikulum" className="scroll-mt-20 pb-16">
        {parts.map((part) => (
          <section key={part.id} className="mt-12">
            <p className="text-sm font-semibold text-accent">Bagian {part.id}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              {part.title}
            </h2>
            <p className="mt-1 text-muted">{part.description}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {part.chapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
