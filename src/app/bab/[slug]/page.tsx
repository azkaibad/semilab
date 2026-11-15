import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { chapterContent } from "@/content";
import { chapters, getChapter, getNeighbors, getPartOf } from "@/lib/curriculum";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/bab/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: `Bab ${chapter.number}: ${chapter.title}`,
    description: chapter.summary,
  };
}

function ChapterSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6"
    >
      <div className="mt-11 h-4 w-40 rounded bg-surface" />
      <div className="mt-4 h-10 w-3/4 rounded bg-surface" />
      <div className="mt-4 h-5 w-full rounded bg-surface" />
      <div className="mt-8 h-40 w-full rounded-2xl bg-surface" />
    </div>
  );
}

// `params` is only known per URL, so it is read inside <Suspense>. The shell
// around it stays static and navigation between chapters is instant.
export default function ChapterPage({ params }: PageProps<"/bab/[slug]">) {
  return (
    <Suspense fallback={<ChapterSkeleton />}>
      <ChapterView params={params} />
    </Suspense>
  );
}

async function ChapterView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const part = getPartOf(slug);
  const { previous, next } = getNeighbors(slug);
  const content = chapterContent[slug];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <p className="text-sm text-muted">
        <Link href="/#kurikulum" className="hover:text-ink">
          Daftar bab
        </Link>
        {part && ` / Bagian ${part.id}: ${part.title}`}
      </p>

      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Bab {chapter.number}
          {chapter.minutes ? ` · sekitar ${chapter.minutes} menit` : ""}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
          {chapter.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{chapter.summary}</p>
      </header>

      {content ? (
        <>
          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Setelah bab ini kamu bisa
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {content.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </div>
          <content.Body />
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line p-6">
          <h2 className="text-xl font-semibold">Bab ini sedang disusun</h2>
          <p className="mt-2 text-muted">Yang akan dibahas di bab ini:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {chapter.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <p className="mt-4 text-muted">
            <span className="font-medium text-ink">Tampilan 3D:</span>{" "}
            {chapter.visual}.
          </p>
        </div>
      )}

      <nav
        aria-label="Navigasi bab"
        className="mt-16 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/bab/${previous.slug}`}
            className="rounded-xl border border-line p-4 hover:border-accent"
          >
            <span className="text-xs text-muted">Sebelumnya</span>
            <span className="block font-medium">
              Bab {previous.number}: {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/bab/${next.slug}`}
            className="rounded-xl border border-line p-4 hover:border-accent sm:text-right"
          >
            <span className="text-xs text-muted">Berikutnya</span>
            <span className="block font-medium">
              Bab {next.number}: {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
