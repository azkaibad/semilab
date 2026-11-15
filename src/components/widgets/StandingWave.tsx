"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";

const LEVELS = [1, 2, 3, 4, 5];
/** Ground-state energy of an electron in a 1 nm wide box, in eV: h² / (8 m L²). */
const E1_AT_1NM = 0.376;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function StandingWave() {
  const [n, setN] = useState(1);
  const [width, setWidth] = useState(1);
  const [showProbability, setShowProbability] = useState(false);

  const e1 = E1_AT_1NM / (width * width);
  const boxLeft = 24;
  const boxWidth = 70 + ((width - 0.5) / 2.5) * 130;
  const baseline = showProbability ? 168 : 105;
  const amplitude = showProbability ? 120 : 62;

  const path = Array.from({ length: 121 }, (_, i) => {
    const t = i / 120;
    const wave = Math.sin(n * Math.PI * t);
    const value = showProbability ? wave * wave : wave;
    const x = boxLeft + t * boxWidth;
    const y = baseline - value * amplitude;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const ladderY = (level: number) => 186 - (level * level * 164) / 25;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Gelombang berdiri tingkat ${n} di dalam kotak selebar ${format(width)} nanometer`}
        className="w-full bg-bg"
      >
        {/* walls */}
        <rect x={boxLeft - 6} y="20" width="6" height="160" fill="var(--muted)" />
        <rect x={boxLeft + boxWidth} y="20" width="6" height="160" fill="var(--muted)" />
        <line
          x1={boxLeft}
          x2={boxLeft + boxWidth}
          y1={baseline}
          y2={baseline}
          stroke="var(--line)"
          strokeDasharray="4 4"
        />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <text x={boxLeft + boxWidth / 2} y="196" textAnchor="middle" fontSize="10" fill="var(--muted)">
          lebar kotak L = {format(width)} nm
        </text>

        {/* energy ladder */}
        <text x="300" y="14" textAnchor="middle" fontSize="10" fill="var(--muted)">
          Energi
        </text>
        {LEVELS.map((level) => (
          <g key={level}>
            <line
              x1="262"
              x2="322"
              y1={ladderY(level)}
              y2={ladderY(level)}
              stroke={level === n ? "var(--warm)" : "var(--muted)"}
              strokeWidth={level === n ? 3 : 1.5}
            />
            <text
              x="328"
              y={ladderY(level) + 3.5}
              fontSize="10"
              fontWeight={level === n ? 700 : 400}
              fill={level === n ? "var(--warm)" : "var(--muted)"}
            >
              n={level}
            </text>
          </g>
        ))}
      </svg>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Tingkat">
          {LEVELS.map((level) => (
            <Chip key={level} active={level === n} onClick={() => setN(level)}>
              n = {level}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Lebar kotak"
          value={width}
          min={0.5}
          max={3}
          step={0.1}
          onChange={setWidth}
          display={`${format(width, 1)} nm`}
        />
        <ControlRow label="Tampilkan">
          <Chip active={!showProbability} onClick={() => setShowProbability(false)}>
            Gelombang
          </Chip>
          <Chip active={showProbability} onClick={() => setShowProbability(true)}>
            Peluang posisi
          </Chip>
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Jumlah perut gelombang" value={n} />
          <Stat label={`Energi tingkat n = ${n}`} value={`${format(n * n * e1)} eV`} />
          <Stat
            label="Jarak ke tingkat berikutnya"
            value={`${format((2 * n + 1) * e1)} eV`}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Elektron yang terkurung di antara dua dinding. Hanya gelombang yang
        tepat muat di antara dinding yang diperbolehkan, dan setiap gelombang
        punya energinya sendiri.
      </figcaption>
    </figure>
  );
}
