"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/lib/lattice";
import { usePrefersReducedMotion } from "@/lib/progress";
import { Scientific } from "@/lib/semiconductor";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Slider, Stat } from "./controls";

const HX = 1.7;
const HY = 1.4;
const HZ = 1.2;
const MAX_GAS = 140;
const VAPOUR = 26;
const GAS_SPEED = 1.5;
const VAPOUR_SPEED = 1.7;
const SUBSTRATE: Vec3 = [1.0, 0.04, 0.8];
/** Real chamber height the scene stands for, cm. */
const CHAMBER_CM = 30;

type Particle = { position: Vec3; velocity: Vec3 };

const randomUnit = (): Vec3 => {
  const v: Vec3 = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

function emit(): Particle {
  const v: Vec3 = [(Math.random() * 2 - 1) * 0.25, 1, (Math.random() * 2 - 1) * 0.25];
  const length = Math.hypot(...v);
  return {
    position: [0, -HY + 0.2, 0],
    velocity: [v[0] / length, v[1] / length, v[2] / length],
  };
}

function Chamber({
  gasCount,
  freePath,
  moving,
  onArrival,
}: {
  gasCount: number;
  /** Mean free path in scene units. */
  freePath: number;
  moving: boolean;
  onArrival: (fraction: number) => void;
}) {
  const gas = useRef<Particle[] | null>(null);
  const vapour = useRef<Particle[] | null>(null);
  const gasGroup = useRef<THREE.Group>(null);
  const vapourGroup = useRef<THREE.Group>(null);
  const arrival = useRef({ fraction: 1, clock: 0 });
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(HX * 2, HY * 2, HZ * 2)),
    [],
  );

  useFrame((_, rawDelta) => {
    if (!gas.current || !vapour.current) {
      gas.current = Array.from({ length: MAX_GAS }, () => ({
        position: [
          (Math.random() * 2 - 1) * HX,
          (Math.random() * 2 - 1) * HY,
          (Math.random() * 2 - 1) * HZ,
        ],
        velocity: randomUnit(),
      }));
      vapour.current = Array.from({ length: VAPOUR }, () => {
        const atom = emit();
        const head = Math.random() * 2.4;
        atom.position = [
          atom.velocity[0] * head,
          atom.position[1] + atom.velocity[1] * head,
          atom.velocity[2] * head,
        ];
        return atom;
      });
    }
    const delta = moving ? Math.min(rawDelta, 0.1) : 0;
    const scatters = (speed: number) => delta > 0 && Math.random() < (speed * delta) / freePath;
    const limits = [HX, HY, HZ];

    gas.current.forEach((molecule, i) => {
      const mesh = gasGroup.current?.children[i];
      if (!mesh) return;
      mesh.visible = i < gasCount;
      if (i >= gasCount) return;
      if (scatters(GAS_SPEED)) molecule.velocity = randomUnit();
      for (let axis = 0; axis < 3; axis++) {
        molecule.position[axis] += molecule.velocity[axis] * delta * GAS_SPEED;
        if (Math.abs(molecule.position[axis]) > limits[axis]) {
          molecule.position[axis] = Math.sign(molecule.position[axis]) * limits[axis];
          molecule.velocity[axis] *= -1;
        }
      }
      mesh.position.set(...molecule.position);
    });

    vapour.current.forEach((atom, i) => {
      if (scatters(VAPOUR_SPEED)) atom.velocity = randomUnit();
      for (let axis = 0; axis < 3; axis++) {
        atom.position[axis] += atom.velocity[axis] * delta * VAPOUR_SPEED;
      }
      const [px, py, pz] = atom.position;
      const landed = py >= HY - 0.1 && Math.abs(px) <= SUBSTRATE[0] && Math.abs(pz) <= SUBSTRATE[2];
      const lost = Math.abs(px) > HX || Math.abs(py) > HY || Math.abs(pz) > HZ;
      if (landed || lost) {
        arrival.current.fraction = arrival.current.fraction * 0.92 + (landed ? 0.08 : 0);
        vapour.current![i] = emit();
      }
      vapourGroup.current?.children[i]?.position.set(...vapour.current![i].position);
    });

    arrival.current.clock += delta;
    if (arrival.current.clock > 0.5) {
      arrival.current.clock = 0;
      onArrival(Math.round(arrival.current.fraction * 20) / 20);
    }
  });

  return (
    <group>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#5b6690" />
      </lineSegments>
      <mesh position={[0, HY - 0.04, 0]}>
        <boxGeometry args={[SUBSTRATE[0] * 2, 0.08, SUBSTRATE[2] * 2]} />
        <meshStandardMaterial color="#aab4d4" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, -HY + 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.22, 0.2, 24]} />
        <meshStandardMaterial color="#f5a524" emissive="#f5a524" emissiveIntensity={0.5} />
      </mesh>
      <group ref={gasGroup}>
        {Array.from({ length: MAX_GAS }, (_, i) => (
          <mesh key={i} visible={false}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color="#8fa0d8" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={vapourGroup}>
        {Array.from({ length: VAPOUR }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#f5a524" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <TextSprite text="substrat" position={[0, HY + 0.3, 0]} height={0.26} color="#aab4d4" />
      <TextSprite text="sumber uap" position={[0, -HY - 0.3, 0]} height={0.26} color="#f5a524" />
    </group>
  );
}

/** Working ranges as powers of ten in mbar: [highest, lowest]. */
const PUMPS: [string, number, number][] = [
  ["Rotary vane", 3, -3],
  ["Scroll", 3, -2],
  ["Roots", 1, -4],
  ["Difusi", -3, -9],
  ["Turbomolekuler", -2, -10],
  ["Kryo", -3, -10],
  ["Ion", -5, -11],
];
const GAUGES: [string, number, number][] = [
  ["Kapasitansi", 3, -4],
  ["Pirani", 2, -4],
  ["Penning", -2, -9],
  ["Bayard-Alpert", -3, -11],
];

function RangeChart({ exponent }: { exponent: number }) {
  const x = (e: number) => 100 + ((3 - e) / 14) * 250;
  const row = (label: string, high: number, low: number, y: number, color: string) => {
    const active = exponent <= high && exponent >= low;
    return (
      <g key={label}>
        <text x="94" y={y + 3} textAnchor="end" fontSize="8" fill={active ? "var(--ink)" : "var(--muted)"} fontWeight={active ? 700 : 400}>
          {label}
        </text>
        <rect x={x(high)} y={y - 4} width={x(low) - x(high)} height="8" rx="3" fill={color} opacity={active ? 1 : 0.28} />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 360 196"
      role="img"
      aria-label="Rentang kerja pompa vakum dan alat ukur tekanan pada sumbu tekanan logaritmik"
      className="w-full bg-bg"
    >
      <text x="8" y="12" fontSize="8.5" fontWeight="700" fill="var(--accent)">
        POMPA
      </text>
      {PUMPS.map(([label, high, low], i) => row(label, high, low, 24 + i * 13, "var(--accent)"))}
      <text x="8" y="124" fontSize="8.5" fontWeight="700" fill="#34d399">
        ALAT UKUR
      </text>
      {GAUGES.map(([label, high, low], i) => row(label, high, low, 136 + i * 13, "#34d399"))}
      <line x1={x(exponent)} x2={x(exponent)} y1="14" y2="180" stroke="var(--warm)" strokeWidth="1.5" />
      {[3, 0, -3, -6, -9].map((e) => (
        <text key={e} x={x(e)} y="192" textAnchor="middle" fontSize="8" fill="var(--muted)">
          10
          <tspan baselineShift="super" fontSize="5.5">
            {e}
          </tspan>
        </text>
      ))}
      <text x="352" y="192" textAnchor="end" fontSize="8" fill="var(--muted)">
        mbar
      </text>
    </svg>
  );
}

const format = (value: number, digits = 1) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function pick(value: number, units: [number, string][]) {
  const [scale, unit] = units.find(([s]) => value >= s) ?? units[units.length - 1];
  const scaled = value / scale;
  return `${format(scaled, scaled < 10 ? 1 : 0)} ${unit}`;
}

const formatLength = (metres: number) =>
  pick(metres, [
    [1000, "km"],
    [1, "m"],
    [1e-2, "cm"],
    [1e-3, "mm"],
    [1e-6, "µm"],
    [1e-9, "nm"],
  ]);

const formatTime = (seconds: number) =>
  pick(seconds, [
    [3600, "jam"],
    [60, "menit"],
    [1, "detik"],
    [1e-3, "ms"],
    [1e-6, "µs"],
    [1e-9, "ns"],
  ]);

export default function VacuumExplorer() {
  const [exponent, setExponent] = useState(3);
  const [arrival, setArrival] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const pressure = 10 ** exponent;
  // Air at 300 K: mean free path in cm is about 6.6e-3 divided by pressure in mbar.
  const freePathCm = 6.6e-3 / pressure;
  const density = (pressure * 100) / (1.381e-23 * 300) / 1e6;
  const monolayer = 3.5e-6 / pressure;
  const regime =
    exponent > 0
      ? "Vakum kasar"
      : exponent > -3
        ? "Vakum menengah"
        : exponent > -8
          ? "Vakum tinggi"
          : "Vakum ultra tinggi";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.45, 0.25, 1]}
          distance={8.2}
          label={`Ruang vakum pada tekanan 10 pangkat ${format(exponent)} milibar, ${regime}`}
        >
          <Chamber
            gasCount={Math.round(3 + ((exponent + 10) / 13) * (MAX_GAS - 3))}
            freePath={Math.max(0.1, (freePathCm / CHAMBER_CM) * HY * 2)}
            moving={!paused && !reducedMotion}
            onArrival={setArrival}
          />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>

      <RangeChart exponent={exponent} />

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Tekanan"
          value={exponent}
          min={-10}
          max={3}
          step={0.25}
          onChange={setExponent}
          display={
            <>
              <Scientific value={pressure} /> mbar
            </>
          }
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Daerah" value={regime} />
          <Stat
            label="Dalam satuan lain"
            value={
              <span className="text-sm">
                <Scientific value={pressure * 100} /> Pa · <Scientific value={pressure * 0.75} /> Torr
              </span>
            }
          />
          <Stat label="Jalan bebas rata-rata" value={formatLength(freePathCm / 100)} />
          <Stat
            label="Molekul gas"
            value={
              <>
                <Scientific value={density} /> cm⁻³
              </>
            }
          />
          <Stat label="Permukaan tertutup gas dalam" value={formatTime(monolayer)} />
          <Stat
            label="Atom uap sampai ke substrat"
            value={reducedMotion ? "—" : `${format(arrival * 100, 0)}%`}
          />
        </dl>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Titik biru keabuan: molekul gas sisa</span>
          <span>Titik jingga: atom yang diuapkan dari sumber</span>
        </p>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="text-sm font-medium text-accent hover:underline"
          >
            {paused ? "Jalankan animasi" : "Jeda animasi"}
          </button>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Ruang setinggi 30 cm berisi udara pada 300 K. Jumlah molekul yang
        digambar tidak berskala, tetapi jarak antartabrakan mengikuti jalan
        bebas rata-rata yang sebenarnya. Rentang kerja pompa dan alat ukur
        adalah nilai yang umum.
      </figcaption>
    </figure>
  );
}
