"use client";

import { useHydrated, useProgress } from "@/lib/progress";

export function DoneBadge({ slug }: { slug: string }) {
  const hydrated = useHydrated();
  const done = useProgress((state) => state.completed.includes(slug));
  if (!hydrated || !done) return null;
  return (
    <span className="rounded-full bg-ok-soft px-2 py-0.5 text-xs font-semibold text-ok">
      Selesai
    </span>
  );
}

export function ProgressSummary({
  availableSlugs,
  total,
}: {
  availableSlugs: string[];
  total: number;
}) {
  const hydrated = useHydrated();
  const completed = useProgress((state) => state.completed);
  const done = hydrated
    ? availableSlugs.filter((slug) => completed.includes(slug)).length
    : 0;

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium">Progres belajar</p>
        <p className="text-sm tabular-nums text-muted">
          {done} dari {total} bab selesai
        </p>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-bg"
        role="progressbar"
        aria-label="Progres belajar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted">
        {availableSlugs.length} bab sudah bisa dipelajari. Bab lainnya sedang
        disusun.
      </p>
    </div>
  );
}
