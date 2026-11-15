"use client";

import { useState } from "react";
import { Chip, ControlRow, Stat } from "@/components/three/controls";

/** ISO 14644-1 classes. `dots` is how many particles are drawn, which is not to scale. */
const CLASSES = [
  { iso: 3, old: "Kelas 1", dots: 1, use: "Litografi chip paling maju" },
  { iso: 4, old: "Kelas 10", dots: 3, use: "Fabrikasi chip" },
  { iso: 5, old: "Kelas 100", dots: 8, use: "Fabrikasi chip, laboratorium litografi" },
  { iso: 6, old: "Kelas 1.000", dots: 20, use: "Laboratorium penelitian thin film" },
  { iso: 7, old: "Kelas 10.000", dots: 50, use: "Perakitan, ruang ganti cleanroom" },
  { iso: 8, old: "Kelas 100.000", dots: 120, use: "Pengemasan, farmasi" },
  { iso: 9, old: "Udara ruangan biasa", dots: 300, use: "Kantor, rumah" },
];

/** Maximum particles of 0.5 µm and larger per cubic metre. */
const limit = (iso: number) => 10 ** iso * (0.1 / 0.5) ** 2.08;

const format = (value: number) =>
  value.toLocaleString("id-ID", { maximumSignificantDigits: 3 });

export function CleanroomClass() {
  const [iso, setIso] = useState(5);
  const current = CLASSES.find((item) => item.iso === iso) ?? CLASSES[2];
  const particles = limit(iso);

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 150"
        role="img"
        aria-label={`Udara kelas ISO ${iso}: paling banyak ${format(particles)} partikel berukuran 0,5 mikrometer atau lebih per meter kubik`}
        className="w-full bg-bg"
      >
        <rect x="20" y="14" width="320" height="122" rx="6" fill="none" stroke="var(--line)" />
        {Array.from({ length: current.dots }, (_, i) => (
          <circle
            key={i}
            cx={28 + ((i * 0.618034) % 1) * 304}
            cy={22 + ((i * 0.754878) % 1) * 106}
            r="2.2"
            fill="var(--warm)"
            opacity="0.85"
          />
        ))}
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Kelas ISO">
          {CLASSES.map((item) => (
            <Chip key={item.iso} active={item.iso === iso} onClick={() => setIso(item.iso)}>
              ISO {item.iso}
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Partikel ≥ 0,5 µm per m³" value={format(particles)} />
          <Stat label="Nama lama" value={<span className="text-sm">{current.old}</span>} />
          <Stat
            label="Dibanding udara biasa"
            value={iso === 9 ? "sama" : `${format(limit(9) / particles)} kali lebih bersih`}
          />
          <Stat label="Dipakai untuk" value={<span className="text-sm">{current.use}</span>} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Setiap turun satu kelas ISO, jumlah partikel yang diizinkan turun
        sepuluh kali. Jumlah titik pada gambar tidak berskala. Nama lama
        menyatakan jumlah partikel per kaki kubik.
      </figcaption>
    </figure>
  );
}
