"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";

const SOURCES = [
  { name: "g-line", wavelength: 436, maxNa: 0.6, note: "Lampu merkuri. Dipakai sampai sekitar 1990." },
  { name: "i-line", wavelength: 365, maxNa: 0.65, note: "Lampu merkuri. Masih umum di laboratorium dan untuk lapisan yang tidak kritis." },
  { name: "KrF", wavelength: 248, maxNa: 0.85, note: "Laser excimer kripton fluorida, ultraungu dalam." },
  { name: "ArF", wavelength: 193, maxNa: 0.93, note: "Laser excimer argon fluorida." },
  { name: "ArF imersi", wavelength: 193, maxNa: 1.35, note: "Celah antara lensa dan wafer diisi air, sehingga apertur numerik bisa melebihi 1." },
  { name: "EUV", wavelength: 13.5, maxNa: 0.33, note: "Ultraungu ekstrem. Semua optiknya cermin dan seluruh lintasan cahayanya di dalam vakum." },
];

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function ResolutionCalculator() {
  const [index, setIndex] = useState(1);
  const [aperture, setAperture] = useState(0.5);
  const [factor, setFactor] = useState(0.5);
  const source = SOURCES[index];
  const na = Math.min(aperture, source.maxNa);

  const resolution = (factor * source.wavelength) / na;
  const focus = (0.5 * source.wavelength) / (na * na);
  // Line width on a log scale, from 5 nm to 1000 nm.
  const drawn = 3 + (Math.log10(Math.max(resolution, 5) / 5) / Math.log10(200)) * 26;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 110"
        role="img"
        aria-label={`Garis terkecil yang bisa dicetak selebar ${format(resolution)} nanometer`}
        className="w-full bg-bg"
      >
        {Array.from({ length: Math.floor(300 / (drawn * 2)) }, (_, i) => (
          <rect key={i} x={30 + i * drawn * 2} y="24" width={drawn} height="56" fill="var(--accent)" />
        ))}
        <text x="180" y="100" textAnchor="middle" fontSize="9" fill="var(--muted)">
          garis dan celah terkecil: {format(resolution, resolution < 20 ? 1 : 0)} nm (lebar digambar pada skala logaritmik)
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Sumber cahaya">
          {SOURCES.map((item, i) => (
            <Chip key={item.name} active={i === index} onClick={() => setIndex(i)}>
              {item.name}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Apertur numerik"
          value={na}
          min={0.2}
          max={source.maxNa}
          step={0.01}
          onChange={setAperture}
          display={format(na, 2)}
        />
        <Slider
          label="Faktor proses k₁"
          value={factor}
          min={0.25}
          max={0.8}
          step={0.01}
          onChange={setFactor}
          display={format(factor, 2)}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Panjang gelombang" value={`${format(source.wavelength, 1)} nm`} />
          <Stat label="Garis terkecil" value={`${format(resolution, resolution < 20 ? 1 : 0)} nm`} />
          <Stat label="Kedalaman fokus" value={`${format(focus)} nm`} />
        </dl>
        <p className="text-sm text-muted">{source.note}</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Dihitung dari rumus Rayleigh. Batas atas apertur numerik tiap sumber
        adalah nilai yang umum pada alat produksi.
      </figcaption>
    </figure>
  );
}
