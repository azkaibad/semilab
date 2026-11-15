"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { spectrumToColor } from "@/lib/color";

const MATERIALS = [
  { label: "ZnO", gap: 3.3 },
  { label: "TiO₂", gap: 3.2 },
  { label: "CdS", gap: 2.42 },
  { label: "Perovskit MAPbI₃", gap: 1.55 },
  { label: "GaAs", gap: 1.42 },
];

/** Fraction of light transmitted through a direct-gap film of the given thickness in nm. */
function transmittance(gap: number, thickness: number, nm: number) {
  const energy = 1240 / nm;
  if (energy <= gap) return 0.88;
  // Absorption coefficient in 1/cm, rising as the square root above the gap.
  const absorption = (5e4 * Math.sqrt(energy - gap)) / energy;
  return 0.88 * Math.exp(-absorption * thickness * 1e-7 * 10);
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function UvVisSpectrum() {
  const [material, setMaterial] = useState(2);
  const [thickness, setThickness] = useState(300);
  const { gap } = MATERIALS[material];
  const edge = 1240 / gap;

  const x = (nm: number) => 44 + ((nm - 300) / 700) * 280;
  const y = (value: number) => 150 - value * 134;
  const path = Array.from({ length: 141 }, (_, i) => {
    const nm = 300 + i * 5;
    return `${i === 0 ? "M" : "L"}${x(nm).toFixed(1)},${y(transmittance(gap, thickness, nm)).toFixed(1)}`;
  }).join(" ");
  const color = spectrumToColor((nm) => transmittance(gap, thickness, nm), 1.1);
  const region = edge < 380 ? "Ultraungu" : edge > 780 ? "Inframerah" : "Cahaya tampak";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 184"
        role="img"
        aria-label={`Spektrum transmisi ${MATERIALS[material].label}: cahaya dengan panjang gelombang di bawah ${format(edge)} nanometer diserap`}
        className="w-full bg-bg"
      >
        <rect x={x(380)} y="16" width={x(780) - x(380)} height="134" fill="var(--ink)" opacity="0.04" />
        <line x1="44" x2="324" y1="150" y2="150" stroke="var(--line)" />
        <line x1="44" x2="44" y1="16" y2="150" stroke="var(--line)" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
        {edge >= 300 && edge <= 1000 && (
          <>
            <line x1={x(edge)} x2={x(edge)} y1="16" y2="150" stroke="var(--warm)" strokeDasharray="4 3" />
            <text x={x(edge) + 4} y="26" fontSize="8.5" fill="var(--warm)" fontWeight="700">
              tepi serapan
            </text>
          </>
        )}
        {[400, 600, 800, 1000].map((nm) => (
          <text key={nm} x={x(nm)} y="164" textAnchor="middle" fontSize="9" fill="var(--muted)">
            {nm}
          </text>
        ))}
        <text x="184" y="180" textAnchor="middle" fontSize="9" fill="var(--muted)">
          panjang gelombang (nm)
        </text>
        {[0, 0.5, 1].map((value) => (
          <text key={value} x="38" y={y(value) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
            {value * 100}%
          </text>
        ))}
        <text x="48" y="12" fontSize="9" fill="var(--muted)">
          cahaya yang diteruskan
        </text>
        <text x={x(580)} y="144" textAnchor="middle" fontSize="8" fill="var(--muted)">
          daerah cahaya tampak
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Bahan film">
          {MATERIALS.map((item, i) => (
            <Chip key={item.label} active={i === material} onClick={() => setMaterial(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Tebal film"
          value={thickness}
          min={50}
          max={1000}
          step={50}
          onChange={setThickness}
          display={`${thickness} nm`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Tepi serapan" value={`${format(edge)} nm`} />
          <Stat label="Celah pita" value={`${format(gap, 2)} eV`} />
          <Stat label="Letak tepi" value={<span className="text-sm">{region}</span>} />
          <Stat
            label="Warna film kira-kira"
            value={
              <span
                role="img"
                aria-label="Contoh warna"
                className="mt-1 block h-6 w-full rounded border border-line"
                style={{ background: color }}
              />
            }
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Model sederhana untuk bahan bercelah langsung di atas kaca, tanpa riak
        interferensi. Celah pita adalah nilai yang umum, dan warna adalah
        perkiraan kasar.
      </figcaption>
    </figure>
  );
}
