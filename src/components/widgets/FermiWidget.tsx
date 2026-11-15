"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import {
  fermi,
  intrinsicDensity,
  K_B,
  MATERIALS,
  Scientific,
} from "@/lib/semiconductor";

const E_MIN = -0.4;
const E_MAX = 1.85;
const y = (energy: number) => 200 - ((energy - E_MIN) / (E_MAX - E_MIN)) * 185;

const format = (value: number, digits = 3) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function FermiWidget() {
  const [name, setName] = useState("Silikon");
  const [temperature, setTemperature] = useState(300);
  const material = MATERIALS.find((m) => m.name === name) ?? MATERIALS[0];

  const fermiLevel = material.gap / 2;
  const density = intrinsicDensity(material, temperature);
  const curve = Array.from({ length: 151 }, (_, i) => {
    const energy = E_MIN + (i / 150) * (E_MAX - E_MIN);
    const x = 205 + fermi(energy, fermiLevel, temperature) * 120;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y(energy).toFixed(1)}`;
  }).join(" ");

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 220"
        role="img"
        aria-label={`Diagram pita ${material.name} dan peluang terisi tiap energi pada ${temperature} kelvin`}
        className="w-full bg-bg"
      >
        {/* bands */}
        <rect x="28" y={y(E_MAX)} width="120" height={y(material.gap) - y(E_MAX)} fill="none" stroke="var(--muted)" rx="4" />
        <rect x="28" y={y(0)} width="120" height={y(E_MIN) - y(0)} fill="var(--accent)" opacity="0.85" rx="4" />
        <text x="88" y={y(material.gap) - 8} textAnchor="middle" fontSize="10" fill="var(--muted)">
          Pita konduksi
        </text>
        <text x="88" y={y(0) + 16} textAnchor="middle" fontSize="10" fill="var(--on-accent)">
          Pita valensi
        </text>
        <line x1="20" x2="340" y1={y(fermiLevel)} y2={y(fermiLevel)} stroke="var(--warm)" strokeDasharray="5 4" />
        <text x="152" y={y(fermiLevel) - 4} fontSize="10" fontWeight="700" fill="var(--warm)">
          Level Fermi
        </text>

        {/* occupation probability */}
        <line x1="205" x2="205" y1="12" y2="202" stroke="var(--line)" />
        <line x1="325" x2="325" y1="12" y2="202" stroke="var(--line)" strokeDasharray="2 4" />
        <path d={curve} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <text x="205" y="214" textAnchor="middle" fontSize="9" fill="var(--muted)">
          0
        </text>
        <text x="265" y="214" textAnchor="middle" fontSize="9" fill="var(--muted)">
          peluang terisi
        </text>
        <text x="325" y="214" textAnchor="middle" fontSize="9" fill="var(--muted)">
          1
        </text>
      </svg>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Bahan">
          {MATERIALS.map((m) => (
            <Chip key={m.name} active={m.name === name} onClick={() => setName(m.name)}>
              {m.name}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Suhu"
          value={temperature}
          min={200}
          max={600}
          step={10}
          onChange={setTemperature}
          display={`${temperature} K (${temperature - 273} °C)`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Celah pita" value={`${format(material.gap, 2)} eV`} />
          <Stat label="Energi termal kT" value={`${format(K_B * temperature)} eV`} />
          <Stat
            label="Elektron bebas = hole"
            value={
              <>
                <Scientific value={density} /> cm⁻³
              </>
            }
          />
          <Stat
            label="Satu pasangan tiap"
            value={
              <>
                <Scientific value={material.atoms / density} digits={0} /> atom
              </>
            }
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Kiri: pita energi. Kanan: peluang sebuah keadaan terisi elektron pada
        tiap energi. Naikkan suhu dan perhatikan kurvanya melandai sehingga
        ekornya mulai menyentuh pita konduksi.
      </figcaption>
    </figure>
  );
}
