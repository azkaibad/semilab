"use client";

import { useState } from "react";
import { Chip, ControlRow, Stat } from "@/components/three/controls";

type Profile = {
  id: string;
  label: string;
  /** Sidewall thickness at the top and bottom of the trench, relative to the flat surface. */
  wallTop: number;
  wallBottom: number;
  /** Thickness on the trench floor, relative to the flat surface. */
  floor: number;
  /** Extra bulge at the trench corners, in drawing units. */
  overhang: number;
  note: string;
};

const PROFILES: Profile[] = [
  {
    id: "evaporasi",
    label: "Evaporasi",
    wallTop: 0.05,
    wallBottom: 0.02,
    floor: 1,
    overhang: 0,
    note: "Atom datang lurus dari satu arah, jadi dinding tegak hampir tidak terlapisi. Kelemahan ini justru dimanfaatkan pada teknik lift-off (Bab 18).",
  },
  {
    id: "sputtering",
    label: "Sputtering",
    wallTop: 0.55,
    wallBottom: 0.25,
    floor: 0.5,
    overhang: 6,
    note: "Atom datang dari banyak arah, jadi dinding ikut terlapisi. Tetapi bagian atas parit menerima lebih banyak atom, sehingga muncul tonjolan di sudut dan lapisan menipis ke bawah.",
  },
  {
    id: "pecvd",
    label: "PECVD",
    wallTop: 0.7,
    wallBottom: 0.5,
    floor: 0.6,
    overhang: 4,
    note: "Reaksi dibantu plasma dan berlangsung cepat begitu molekul menyentuh permukaan, sehingga bagian yang mudah dijangkau gas tumbuh lebih tebal.",
  },
  {
    id: "lpcvd",
    label: "LPCVD",
    wallTop: 0.93,
    wallBottom: 0.88,
    floor: 0.9,
    overhang: 0,
    note: "Molekul gas memantul berkali-kali sebelum bereaksi, sehingga sempat menjangkau seluruh permukaan parit. Lapisannya hampir sama tebal di semua sisi.",
  },
  {
    id: "ald",
    label: "ALD",
    wallTop: 1,
    wallBottom: 1,
    floor: 1,
    overhang: 0,
    note: "Tiap siklus menambah tepat satu lapisan di setiap permukaan yang terjangkau gas. Tebalnya sama di mana-mana, bahkan pada parit yang sangat sempit dan dalam.",
  },
];

const SURFACE = 70;
const FLOOR = 160;
const LEFT = 140;
const RIGHT = 220;
const THICKNESS = 20;

export function StepCoverage({ methods }: { methods: string[] }) {
  const profiles = PROFILES.filter((profile) => methods.includes(profile.id));
  const [id, setId] = useState(profiles[0].id);
  const profile = profiles.find((item) => item.id === id) ?? profiles[0];

  const top = SURFACE - THICKNESS;
  const floorTop = FLOOR - THICKNESS * profile.floor;
  const wallTop = THICKNESS * profile.wallTop;
  const wallBottom = THICKNESS * profile.wallBottom;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 190"
        role="img"
        aria-label={`Penampang parit yang dilapisi dengan ${profile.label}. Tebal dinding bawah ${Math.round(
          profile.wallBottom * 100,
        )} persen dari tebal di permukaan atas`}
        className="w-full bg-bg"
      >
        <path
          d={`M20,${SURFACE} H${LEFT} V${FLOOR} H${RIGHT} V${SURFACE} H340 V184 H20 Z`}
          fill="#475569"
        />
        <g fill="var(--warm)">
          <rect x="20" y={top} width={LEFT - 20} height={THICKNESS} />
          <rect x={RIGHT} y={top} width={340 - RIGHT} height={THICKNESS} />
          <rect x={LEFT} y={floorTop} width={RIGHT - LEFT} height={FLOOR - floorTop} />
          <polygon
            points={`${LEFT},${top} ${LEFT + wallTop},${top} ${LEFT + wallBottom},${FLOOR} ${LEFT},${FLOOR}`}
          />
          <polygon
            points={`${RIGHT},${top} ${RIGHT - wallTop},${top} ${RIGHT - wallBottom},${FLOOR} ${RIGHT},${FLOOR}`}
          />
          {profile.overhang > 0 && (
            <>
              <circle cx={LEFT + wallTop * 0.6} cy={top + THICKNESS * 0.55} r={profile.overhang + wallTop * 0.4} />
              <circle cx={RIGHT - wallTop * 0.6} cy={top + THICKNESS * 0.55} r={profile.overhang + wallTop * 0.4} />
            </>
          )}
        </g>
        <text x="60" y={top - 6} fontSize="9" fill="var(--warm)" fontWeight="700">
          film
        </text>
        <text x="60" y="178" fontSize="9" fill="#cbd5e1">
          substrat
        </text>
        <text x="180" y="178" textAnchor="middle" fontSize="9" fill="#cbd5e1">
          parit
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Metode">
          {profiles.map((item) => (
            <Chip key={item.id} active={item.id === id} onClick={() => setId(item.id)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2">
          <Stat label="Tebal dinding bawah dibanding permukaan atas" value={`${Math.round(profile.wallBottom * 100)}%`} />
          <Stat label="Tebal dasar parit dibanding permukaan atas" value={`${Math.round(profile.floor * 100)}%`} />
        </dl>
        <p className="text-sm text-muted">{profile.note}</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Kemampuan melapisi dinding dan dasar parit disebut step coverage.
        Bentuk dan angka pada gambar adalah gambaran umum. Hasil sebenarnya
        bergantung pada bentuk parit dan pengaturan proses.
      </figcaption>
    </figure>
  );
}
