"use client";

import { useEffect, useState } from "react";
import { Stat } from "@/components/three/controls";
import { usePrefersReducedMotion } from "@/lib/progress";

const SITES = 10;
const MAX_CYCLES = 8;
const LAYER = 10;
const BASE = 150;
/** Growth per cycle of aluminium oxide, nm. */
const PER_CYCLE = 0.11;

const STEPS = [
  {
    title: "1. Pulsa prekursor pertama",
    text: "Gas trimetilaluminium dialirkan. Molekulnya bereaksi dengan setiap tempat kosong di permukaan. Begitu semua tempat terisi, molekul berikutnya tidak punya tempat untuk menempel. Reaksi berhenti sendiri.",
  },
  {
    title: "2. Pembilasan",
    text: "Gas nitrogen menyapu keluar semua molekul yang tidak menempel. Yang tertinggal tepat satu lapis molekul.",
  },
  {
    title: "3. Pulsa prekursor kedua",
    text: "Uap air dialirkan. Air bereaksi dengan lapisan tadi dan mengubahnya menjadi aluminium oksida. Reaksi ini juga berhenti sendiri setelah seluruh lapisan bereaksi.",
  },
  {
    title: "4. Pembilasan",
    text: "Sisa uap air dan gas hasil samping disapu keluar. Satu siklus selesai, film bertambah satu lapis, dan permukaannya siap untuk siklus berikutnya.",
  },
];

const format = (value: number) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: 2 });

export function AldCycle() {
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const last = MAX_CYCLES * 4 - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setTick((value) => (value >= last ? value : value + 1));
    }, 900);
    return () => clearInterval(timer);
  }, [playing, last]);

  const cycle = Math.floor(tick / 4);
  const step = tick % 4;
  const layers = cycle + (step === 3 ? 1 : 0);
  const surface = BASE - layers * LAYER;
  const siteX = (i: number) => 54 + i * 28;
  const floating = step === 0 || step === 2;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 186"
        role="img"
        aria-label={`Siklus ALD, ${STEPS[step].title}. Film sudah ${layers} lapis`}
        className="w-full bg-bg"
      >
        <rect x="34" y={BASE} width="292" height="30" fill="#475569" />
        <text x="180" y={BASE + 19} textAnchor="middle" fontSize="9" fill="#cbd5e1">
          substrat
        </text>
        {Array.from({ length: layers }, (_, i) => (
          <rect
            key={i}
            x="40"
            y={BASE - (i + 1) * LAYER + 1}
            width="280"
            height={LAYER - 2}
            rx="3"
            fill="var(--warm)"
            opacity={0.55 + (i % 2) * 0.3}
          />
        ))}
        {step < 3 &&
          Array.from({ length: SITES }, (_, i) => (
            <g key={i}>
              <circle cx={siteX(i)} cy={surface - 7} r="6" fill="#5ad1ff" />
              {step === 2 && <circle cx={siteX(i)} cy={surface - 16} r="4" fill="#f472b6" />}
            </g>
          ))}
        {floating &&
          Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              cx={50 + ((i * 0.618) % 1) * 260}
              cy={18 + ((i * 0.37) % 1) * Math.max(8, surface - 60)}
              r={step === 0 ? 6 : 4}
              fill={step === 0 ? "#5ad1ff" : "#f472b6"}
              opacity="0.8"
            />
          ))}
        {(step === 1 || step === 3) && (
          <text x="180" y="30" textAnchor="middle" fontSize="10" fill="var(--muted)">
            nitrogen menyapu ruang →
          </text>
        )}
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="font-semibold">{STEPS[step].title}</p>
          <p className="mt-1 text-sm text-muted">{STEPS[step].text}</p>
        </div>
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Siklus selesai" value={`${layers}`} />
          <Stat label="Tebal film" value={`${format(layers * PER_CYCLE)} nm`} />
          <Stat label="Siklus untuk 10 nm" value={`${Math.round(10 / PER_CYCLE)}`} />
        </dl>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={tick >= last}
            onClick={() => setTick((value) => Math.min(last, value + 1))}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent disabled:opacity-40"
          >
            Langkah berikutnya
          </button>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
            >
              {playing ? "Hentikan" : "Putar otomatis"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setTick(0);
              setPlaying(false);
            }}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
          >
            Ulangi dari awal
          </button>
        </div>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Biru: trimetilaluminium</span>
          <span>Merah muda: air</span>
          <span>Jingga: aluminium oksida</span>
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Contoh ALD aluminium oksida, yang tumbuh sekitar 0,11 nm per siklus.
        Tebal film diatur hanya dengan menghitung jumlah siklus.
      </figcaption>
    </figure>
  );
}
