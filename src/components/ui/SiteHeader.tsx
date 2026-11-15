import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-6 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M12 2 21 7v10l-9 5-9-5V7z" />
            <path d="M12 12 3 7m9 5 9-5m-9 5v10" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
          SemiLab
        </Link>
        <nav>
          <Link
            href="/#kurikulum"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-ink"
          >
            Daftar bab
          </Link>
        </nav>
      </div>
    </header>
  );
}
