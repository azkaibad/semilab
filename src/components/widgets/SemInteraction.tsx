"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";

/** Kanaya-Okayama range in µm is `factor · E^1.67` with E in keV. */
const MATERIALS = [
  { label: "Silikon", factor: 0.0318 },
  { label: "Emas", factor: 0.00577 },
];

const SIGNALS = [
  {
    label: "Elektron sekunder",
    depth: 0.06,
    color: "#5ad1ff",
    text: "Elektron berenergi rendah yang terlepas dari atom sampel. Hanya yang berasal dari beberapa nanometer teratas yang bisa keluar, jadi sinyal ini memberi gambar bentuk permukaan yang paling tajam.",
  },
  {
    label: "Elektron terhambur balik",
    depth: 0.45,
    color: "#34d399",
    text: "Elektron dari berkas yang terpantul oleh inti atom. Atom berat memantulkan lebih banyak, sehingga daerah dengan unsur berat tampak lebih terang. Sinyal ini menunjukkan beda komposisi.",
  },
  {
    label: "Sinar-X",
    depth: 1,
    color: "#f5a524",
    text: "Tiap unsur memancarkan sinar-X dengan energi yang khas. Dengan mengukur energinya (EDS), unsur-unsur di dalam sampel bisa dikenali. Sinyal ini berasal dari seluruh volume interaksi, sehingga ketajamannya paling rendah.",
  },
];

const TOP = 44;
const MAX_DRAWN = 128;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function teardrop(depth: number) {
  const width = depth * 0.6;
  return (
    `M180,${TOP} C${180 + width * 0.9},${TOP + depth * 0.25} ${180 + width},${TOP + depth * 0.95} 180,${TOP + depth} ` +
    `C${180 - width},${TOP + depth * 0.95} ${180 - width * 0.9},${TOP + depth * 0.25} 180,${TOP} Z`
  );
}

export function SemInteraction() {
  const [material, setMaterial] = useState(0);
  const [voltage, setVoltage] = useState(10);
  const [signal, setSignal] = useState(0);

  const { factor } = MATERIALS[material];
  const range = factor * voltage ** 1.67;
  const largest = factor * 30 ** 1.67;
  // Square-root scale keeps the small volumes at low voltage visible.
  const drawn = 10 + Math.sqrt(range / largest) * (MAX_DRAWN - 10);

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 190"
        role="img"
        aria-label={`Volume interaksi berkas elektron ${voltage} kilovolt di dalam ${MATERIALS[material].label}, sedalam ${format(range)} mikrometer`}
        className="w-full bg-bg"
      >
        <rect x="20" y={TOP} width="320" height="140" fill="#475569" />
        {SIGNALS.map((item, i) => (
          <path
            key={item.label}
            d={teardrop(Math.max(5, drawn * item.depth))}
            fill={item.color}
            opacity={i === signal ? 0.9 : 0.22}
          />
        )).reverse()}
        <line x1="180" x2="180" y1="6" y2={TOP} stroke="#f8fafc" strokeWidth="2.5" />
        <text x="188" y="18" fontSize="9" fill="var(--ink)">
          berkas elektron {voltage} kV
        </text>
        <text x="28" y={TOP + 14} fontSize="9" fill="#e2e8f0">
          sampel
        </text>
        <line x1="300" x2="300" y1={TOP} y2={TOP + drawn} stroke="#e2e8f0" strokeWidth="1" />
        <text x="306" y={TOP + drawn / 2 + 3} fontSize="9" fill="#e2e8f0">
          {format(range)} µm
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Sampel">
          {MATERIALS.map((item, i) => (
            <Chip key={item.label} active={i === material} onClick={() => setMaterial(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Tegangan pemercepat"
          value={voltage}
          min={1}
          max={30}
          step={1}
          onChange={setVoltage}
          display={`${voltage} kV`}
        />
        <ControlRow label="Sinyal">
          {SIGNALS.map((item, i) => (
            <Chip key={item.label} active={i === signal} onClick={() => setSignal(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2">
          <Stat label="Kedalaman jangkauan elektron" value={`${format(range)} µm`} />
          <Stat
            label="Asal sinyal yang dipilih"
            value={
              <span className="text-sm">
                {signal === 0
                  ? "Beberapa nm teratas"
                  : `Sampai sekitar ${format(range * SIGNALS[signal].depth)} µm`}
              </span>
            }
          />
        </dl>
        <p className="text-sm text-muted">{SIGNALS[signal].text}</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Kedalaman dihitung dengan rumus Kanaya-Okayama. Ukuran volume pada
        gambar memakai skala akar agar tetap terlihat pada tegangan rendah, dan
        bentuknya skematis.
      </figcaption>
    </figure>
  );
}
