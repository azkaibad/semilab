"use client";

import type { ReactNode } from "react";

export function SceneFrame({
  canvas,
  children,
  caption,
}: {
  canvas: ReactNode;
  children?: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-square w-full bg-[#0b1020] sm:aspect-[16/10]">
        {canvas}
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>
      {children && <div className="space-y-4 p-4 sm:p-5">{children}</div>}
      {caption && (
        <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ControlRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-28 shrink-0 text-sm font-medium text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      title={title}
      onClick={onClick}
      className={`min-h-9 rounded-lg border px-3 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-line bg-bg text-ink hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-28 shrink-0 text-sm font-medium text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-9 min-w-0 flex-1 accent-[var(--accent)]"
      />
      <span className="w-28 shrink-0 text-sm font-semibold tabular-nums">
        {display}
      </span>
    </label>
  );
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg bg-bg px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-base font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
