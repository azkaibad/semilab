"use client";

import { useState } from "react";
import { Slider, Stat } from "@/components/three/controls";
import { spectrumToColor } from "@/lib/color";

const N_OXIDE = 1.46;
const N_SILICON = 3.9;

/** Reflectance of an oxide film on silicon at normal incidence, ignoring absorption. */
function reflectance(thickness: number, nm: number) {
  const top = (1 - N_OXIDE) / (1 + N_OXIDE);
  const bottom = (N_OXIDE - N_SILICON) / (N_OXIDE + N_SILICON);
  const phase = (4 * Math.PI * N_OXIDE * thickness) / nm;
  const cos = Math.cos(phase);
  const numerator = top * top + bottom * bottom + 2 * top * bottom * cos;
  const denominator = 1 + top * top * bottom * bottom + 2 * top * bottom * cos;
  return numerator / denominator;
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function ThinFilmColor() {
  const [thickness, setThickness] = useState(100);
  const x = (nm: number) => 44 + ((nm - 380) / 400) * 280;
  const y = (value: number) => 150 - (value / 0.5) * 130;
  const path = Array.from({ length: 81 }, (_, i) => {
    const nm = 380 + i * 5;
    return `${i === 0 ? "M" : "L"}${x(nm).toFixed(1)},${y(reflectance(thickness, nm)).toFixed(1)}`;
  }).join(" ");
  const color = spectrumToColor((nm) => reflectance(thickness, nm), 2.6);

  let peaks = 0;
  for (let nm = 385; nm < 780; nm += 5) {
    const here = reflectance(thickness, nm);
    if (here > reflectance(thickness, nm - 5) && here >= reflectance(thickness, nm + 5)) peaks++;
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 184"
        role="img"
        aria-label={`Spektrum pantulan oksida setebal ${thickness} nanometer di atas silikon, dengan ${peaks} puncak di daerah cahaya tampak`}
        className="w-full bg-bg"
      >
        <defs>
          <linearGradient id="visible-spectrum" x1="0" x2="1">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="0.2" stopColor="#2563eb" />
            <stop offset="0.4" stopColor="#22c55e" />
            <stop offset="0.6" stopColor="#facc15" />
            <stop offset="0.8" stopColor="#f97316" />
            <stop offset="1" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        <line x1="44" x2="44" y1="16" y2="150" stroke="var(--line)" />
        <rect x="44" y="150" width="280" height="5" fill="url(#visible-spectrum)" />
        <path d={path} fill="none" stroke="var(--ink)" strokeWidth="2.2" />
        {[400, 500, 600, 700].map((nm) => (
          <text key={nm} x={x(nm)} y="168" textAnchor="middle" fontSize="9" fill="var(--muted)">
            {nm}
          </text>
        ))}
        <text x="184" y="181" textAnchor="middle" fontSize="9" fill="var(--muted)">
          panjang gelombang (nm)
        </text>
        {[0, 0.25, 0.5].map((value) => (
          <text key={value} x="38" y={y(value) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
            {format(value * 100)}%
          </text>
        ))}
        <text x="48" y="12" fontSize="9" fill="var(--muted)">
          cahaya yang dipantulkan
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Tebal oksida"
          value={thickness}
          min={0}
          max={1000}
          step={5}
          onChange={setThickness}
          display={`${thickness} nm`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat
            label="Warna wafer kira-kira"
            value={
              <span
                role="img"
                aria-label="Contoh warna"
                className="mt-1 block h-6 w-full rounded border border-line"
                style={{ background: color }}
              />
            }
          />
          <Stat label="Puncak di cahaya tampak" value={`${peaks}`} />
          <Stat label="Tebal optik (n × d)" value={`${format(N_OXIDE * thickness)} nm`} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Dihitung untuk cahaya yang datang tegak lurus, dengan indeks bias tetap
        1,46 untuk oksida dan 3,9 untuk silikon, tanpa serapan. Warna adalah
        perkiraan kasar dan bergantung pada layar Anda.
      </figcaption>
    </figure>
  );
}
