"use client";

import { useState } from "react";
import { Slider, Stat } from "@/components/three/controls";

const SUBSHELLS = [
  { name: "1s", orbitals: 1, shell: "K" },
  { name: "2s", orbitals: 1, shell: "L" },
  { name: "2p", orbitals: 3, shell: "L" },
  { name: "3s", orbitals: 1, shell: "M" },
  { name: "3p", orbitals: 3, shell: "M" },
];

const ELEMENTS = [
  "Hidrogen", "Helium", "Litium", "Berilium", "Boron", "Karbon", "Nitrogen",
  "Oksigen", "Fluor", "Neon", "Natrium", "Magnesium", "Aluminium", "Silikon",
  "Fosfor", "Belerang", "Klor", "Argon",
];

/** Electrons in each orbital of a subshell: singles first, then pairs (Hund's rule). */
function fillOrbitals(orbitals: number, electrons: number) {
  return Array.from({ length: orbitals }, (_, i) =>
    electrons > orbitals + i ? 2 : electrons > i ? 1 : 0,
  );
}

/** Distributes electrons over the subshells, lowest energy first. */
function fillSubshells(electrons: number) {
  let placed = 0;
  return SUBSHELLS.map((subshell) => {
    const count = Math.min(electrons - placed, subshell.orbitals * 2);
    placed += count;
    return { ...subshell, count, boxes: fillOrbitals(subshell.orbitals, count) };
  });
}

export function LevelFiller() {
  const [electrons, setElectrons] = useState(14);
  const filled = fillSubshells(electrons);

  const shellTotals = ["K", "L", "M"]
    .map((shell) => ({
      shell,
      total: filled.filter((s) => s.shell === shell).reduce((a, s) => a + s.count, 0),
    }))
    .filter((s) => s.total > 0);

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="bg-bg px-4 py-5 sm:px-6">
        <p className="mb-3 text-xs text-muted">Energi makin tinggi ↑</p>
        <ol className="flex flex-col-reverse gap-3">
          {filled.map((subshell) => (
            <li key={subshell.name} className="flex items-center gap-4">
              <span className="w-8 text-sm font-semibold">{subshell.name}</span>
              <span className="flex gap-1.5">
                {subshell.boxes.map((count, i) => (
                  <span
                    key={i}
                    aria-label={`${count} elektron`}
                    className={`grid h-11 w-11 place-items-center rounded-lg border text-lg font-semibold ${
                      count > 0
                        ? "border-accent bg-accent-soft text-ink"
                        : "border-line text-transparent"
                    }`}
                  >
                    {count === 2 ? "↑↓" : count === 1 ? "↑" : "·"}
                  </span>
                ))}
              </span>
              <span className="text-xs text-muted">kulit {subshell.shell}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Jumlah elektron"
          value={electrons}
          min={1}
          max={18}
          step={1}
          onChange={setElectrons}
          display={`${electrons} · ${ELEMENTS[electrons - 1]}`}
        />
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Stat
            label="Konfigurasi elektron"
            value={
              <span>
                {filled
                  .filter((s) => s.count > 0)
                  .map((s) => (
                    <span key={s.name} className="mr-1.5">
                      {s.name}
                      <sup>{s.count}</sup>
                    </span>
                  ))}
              </span>
            }
          />
          <Stat
            label="Isi tiap kulit"
            value={shellTotals.map((s) => `${s.shell} ${s.total}`).join(" · ")}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Setiap kotak adalah satu orbital dan memuat paling banyak dua elektron
        dengan spin berlawanan (↑ dan ↓). Jarak antar-tingkat pada gambar tidak
        berskala.
      </figcaption>
    </figure>
  );
}
