"use client";

import { useState } from "react";
import { Chip, ControlRow, Stat } from "@/components/three/controls";

type Material = {
  name: string;
  kind: "Konduktor" | "Semikonduktor" | "Isolator";
  /** Band gap in eV at room temperature; 0 for a metal. */
  gap: number;
  note: string;
};

const MATERIALS: Material[] = [
  {
    name: "Tembaga",
    kind: "Konduktor",
    gap: 0,
    note: "Pita terluarnya hanya terisi sebagian, jadi elektron selalu punya tempat kosong untuk berpindah. Arus mengalir dengan mudah.",
  },
  {
    name: "Germanium",
    kind: "Semikonduktor",
    gap: 0.66,
    note: "Celahnya kecil, sehingga pada suhu ruang cukup banyak elektron yang sudah naik sendiri. Inilah sebabnya devais germanium mudah bocor saat panas.",
  },
  {
    name: "Silikon",
    kind: "Semikonduktor",
    gap: 1.12,
    note: "Celahnya cukup besar agar devais tetap stabil saat panas, tetapi cukup kecil untuk dikendalikan dengan doping dan tegangan.",
  },
  {
    name: "GaAs",
    kind: "Semikonduktor",
    gap: 1.42,
    note: "Galium arsenida. Celahnya langsung, sehingga efisien memancarkan cahaya inframerah.",
  },
  {
    name: "GaN",
    kind: "Semikonduktor",
    gap: 3.4,
    note: "Galium nitrida, bahan LED biru dan putih. Celah selebar ini disebut celah pita lebar.",
  },
  {
    name: "Intan",
    kind: "Isolator",
    gap: 5.47,
    note: "Struktur kristalnya sama dengan silikon, tetapi celahnya hampir lima kali lebih lebar.",
  },
  {
    name: "SiO₂",
    kind: "Isolator",
    gap: 9,
    note: "Silikon dioksida, isolator utama dalam chip. Hampir tidak ada elektron yang bisa menyeberangi celah selebar ini.",
  },
];

/** Thermal energy kT at 300 K, in eV. */
const KT = 0.0259;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function lightRange(nm: number) {
  if (nm < 380) return "ultraungu";
  if (nm <= 750) return "cahaya tampak";
  return "inframerah";
}

export function BandCompare() {
  const [name, setName] = useState("Silikon");
  const material = MATERIALS.find((m) => m.name === name) ?? MATERIALS[2];
  const isMetal = material.gap === 0;

  const gapHeight = material.gap * 12;
  const valenceTop = 160;
  const conductionBottom = valenceTop - gapHeight;
  const wavelength = isMetal ? 0 : 1240 / material.gap;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 210"
        role="img"
        aria-label={
          isMetal
            ? `${material.name}: pita terisi sebagian, tanpa celah`
            : `${material.name}: celah pita ${format(material.gap)} elektronvolt`
        }
        className="w-full bg-bg"
      >
        {isMetal ? (
          <>
            <rect x="90" y="60" width="150" height="110" rx="6" fill="none" stroke="var(--muted)" />
            <rect x="90" y="115" width="150" height="55" rx="6" fill="var(--accent)" opacity="0.85" />
            <text x="250" y="92" fontSize="11" fill="var(--muted)">
              tempat kosong
            </text>
            <text x="250" y="146" fontSize="11" fill="var(--accent)">
              terisi elektron
            </text>
          </>
        ) : (
          <>
            <rect
              x="90"
              y={conductionBottom - 34}
              width="150"
              height="34"
              rx="6"
              fill="none"
              stroke="var(--muted)"
            />
            <rect x="90" y={valenceTop} width="150" height="44" rx="6" fill="var(--accent)" opacity="0.85" />
            <line
              x1="165"
              x2="165"
              y1={conductionBottom + 2}
              y2={valenceTop - 2}
              stroke="var(--warm)"
              strokeWidth="2"
            />
            <text
              x="82"
              y={(conductionBottom + valenceTop) / 2 + 4}
              textAnchor="end"
              fontSize="11"
              fontWeight="700"
              fill="var(--warm)"
            >
              {format(material.gap)} eV
            </text>
            <text x="250" y={conductionBottom - 13} fontSize="11" fill="var(--muted)">
              Pita konduksi
            </text>
            <text x="250" y={valenceTop + 26} fontSize="11" fill="var(--accent)">
              Pita valensi
            </text>
          </>
        )}
      </svg>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Bahan">
          {MATERIALS.map((m) => (
            <Chip key={m.name} active={m.name === name} onClick={() => setName(m.name)}>
              {m.name}
            </Chip>
          ))}
        </ControlRow>
        <p className="text-sm text-muted">{material.note}</p>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Jenis" value={<span className="text-sm">{material.kind}</span>} />
          <Stat label="Celah pita" value={isMetal ? "Tidak ada" : `${format(material.gap)} eV`} />
          <Stat
            label="Dibanding energi termal"
            value={isMetal ? "–" : `${format(material.gap / KT, 0)} kali`}
          />
          <Stat
            label="Menyerap cahaya di bawah"
            value={
              isMetal ? (
                "–"
              ) : (
                <span className="text-sm">
                  {format(wavelength, 0)} nm ({lightRange(wavelength)})
                </span>
              )
            }
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Tinggi celah digambar sebanding dengan nilainya. Energi termal pada suhu
        ruang hanya sekitar 0,026 eV.
      </figcaption>
    </figure>
  );
}
