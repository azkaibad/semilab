"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";

const PRESETS = [
  { label: "Wet etch", anisotropy: 0 },
  { label: "Plasma etch", anisotropy: 0.5 },
  { label: "RIE", anisotropy: 0.9 },
  { label: "DRIE", anisotropy: 1 },
];

const TOP = 60;
const FILM = 56;
const LEFT = 140;
const RIGHT = 220;
/** Film thickness the drawing stands for, nm. */
const FILM_NM = 500;

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function EtchProfile() {
  const [anisotropy, setAnisotropy] = useState(0);
  const [progress, setProgress] = useState(1);
  const [selectivity, setSelectivity] = useState(10);

  // Past 100% the etch continues into the layer below, slowed by the selectivity.
  const over = Math.max(0, progress - 1);
  const depth = Math.min(progress, 1) * FILM + (over * FILM) / selectivity;
  const undercut = progress * FILM * (1 - anisotropy);
  const bottom = TOP + depth;

  const cavity =
    `M${LEFT - undercut},${TOP} Q${LEFT - undercut},${bottom} ${LEFT},${bottom} ` +
    `H${RIGHT} Q${RIGHT + undercut},${bottom} ${RIGHT + undercut},${TOP} Z`;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 180"
        role="img"
        aria-label={`Profil hasil etch: kedalaman ${format((depth / FILM) * FILM_NM)} nanometer, undercut ${format((undercut / FILM) * FILM_NM)} nanometer di tiap sisi`}
        className="w-full bg-bg"
      >
        <rect x="20" y={TOP + FILM} width="320" height="54" fill="#475569" />
        <rect x="20" y={TOP} width="320" height={FILM} fill="#7dd3fc" />
        <path d={cavity} fill="var(--bg)" />
        <rect x="20" y={TOP - 16} width={LEFT - 20} height="16" fill="#e11d48" />
        <rect x={RIGHT} y={TOP - 16} width={340 - RIGHT} height="16" fill="#e11d48" />
        <text x="28" y={TOP - 22} fontSize="9" fill="#fb7185" fontWeight="700">
          resist
        </text>
        <text x="28" y={TOP + FILM / 2 + 3} fontSize="9" fill="#0f172a" fontWeight="700">
          film
        </text>
        <text x="28" y={TOP + FILM + 30} fontSize="9" fill="#cbd5e1">
          lapisan di bawahnya
        </text>
        <text x="180" y="20" textAnchor="middle" fontSize="9" fill="var(--muted)">
          bukaan pada resist
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Contoh">
          {PRESETS.map((preset) => (
            <Chip
              key={preset.label}
              active={preset.anisotropy === anisotropy}
              onClick={() => setAnisotropy(preset.anisotropy)}
            >
              {preset.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Anisotropi"
          value={anisotropy}
          min={0}
          max={1}
          step={0.05}
          onChange={setAnisotropy}
          display={anisotropy === 0 ? "0 (isotropik)" : anisotropy === 1 ? "1 (tegak sempurna)" : format(anisotropy, 2)}
        />
        <Slider
          label="Lama etch"
          value={progress}
          min={0.1}
          max={1.5}
          step={0.05}
          onChange={setProgress}
          display={
            progress <= 1
              ? `${format(progress * 100)}% tebal film`
              : `over-etch ${format((progress - 1) * 100)}%`
          }
        />
        <Slider
          label="Selektivitas"
          value={selectivity}
          min={1}
          max={50}
          step={1}
          onChange={setSelectivity}
          display={`${selectivity} : 1`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Undercut tiap sisi" value={`${format((undercut / FILM) * FILM_NM)} nm`} />
          <Stat
            label="Lebar bukaan melebar"
            value={`${format(((undercut * 2) / FILM) * FILM_NM)} nm`}
          />
          <Stat
            label="Lapisan bawah termakan"
            value={`${format(((over * FILM) / selectivity / FILM) * FILM_NM)} nm`}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Film setebal 500 nm. Model ini disederhanakan: laju etch dianggap tetap,
        resist dianggap tidak ikut terkikis, dan bentuk dindingnya didekati
        dengan lengkungan sederhana.
      </figcaption>
    </figure>
  );
}
