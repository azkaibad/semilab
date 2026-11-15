"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { Scientific } from "@/lib/semiconductor";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const IONS = 36;
const REJECTED = 10;
const BEAM_Y = 0.6;
const WAFER_X = 2.6;

/** Projected range and straggle in µm for an energy in keV (rough fits for silicon). */
const DOPANTS = [
  { name: "Boron", range: 0.0031, straggle: 0.007 },
  { name: "Fosfor", range: 0.00123, straggle: 0.0046 },
  { name: "Arsen", range: 0.00058, straggle: 0.0021 },
];
/** Doping already present in the wafer, cm⁻³. */
const BACKGROUND = 1e15;

function Beamline({ moving, speed }: { moving: boolean; speed: number }) {
  const ions = useRef<THREE.Group>(null);
  const rejected = useRef<THREE.Group>(null);
  const phases = useRef<number[] | null>(null);
  const [main, reject] = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.6, -1.1, 0),
        new THREE.Vector3(-2.6, 0, 0),
        new THREE.Vector3(-2.42, 0.45, 0),
        new THREE.Vector3(-1.95, BEAM_Y, 0),
        new THREE.Vector3(WAFER_X, BEAM_Y, 0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.6, -1.1, 0),
        new THREE.Vector3(-2.6, 0, 0),
        new THREE.Vector3(-2.52, 0.6, 0),
        new THREE.Vector3(-2.3, 1.05, 0),
      ]),
    ],
    [],
  );

  useFrame((_, rawDelta) => {
    if (!phases.current) {
      phases.current = Array.from({ length: IONS + REJECTED }, () => Math.random());
    }
    const delta = moving ? Math.min(rawDelta, 0.1) : 0;
    const point = new THREE.Vector3();
    ions.current?.children.forEach((mesh, i) => {
      phases.current![i] = (phases.current![i] + delta * speed * 0.22) % 1;
      main.getPointAt(phases.current![i], point);
      // After the scanner the beam is swept across the wafer.
      const sweep = Math.max(0, (point.x - 0.9) / (WAFER_X - 0.9));
      mesh.position.set(
        point.x,
        point.y + (((i * 0.618) % 1) - 0.5) * 1.1 * sweep,
        (((i * 0.371) % 1) - 0.5) * 1.1 * sweep,
      );
    });
    rejected.current?.children.forEach((mesh, i) => {
      const index = IONS + i;
      phases.current![index] = (phases.current![index] + delta * speed * 0.6) % 1;
      reject.getPointAt(phases.current![index], point);
      mesh.position.copy(point);
    });
  });

  return (
    <group position={[0, -0.1, 0]}>
      <mesh position={[-2.6, -1.25, 0]}>
        <boxGeometry args={[0.6, 0.45, 0.6]} />
        <meshStandardMaterial color="#f5a524" emissive="#f5a524" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-2.35, 0.5, 0]}>
        <boxGeometry args={[1.0, 1.0, 0.5]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      {[0.16, -0.16].map((offset) => (
        <mesh key={offset} position={[-1.5, BEAM_Y + offset * 1.6, 0]}>
          <boxGeometry args={[0.06, 0.34, 0.6]} />
          <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {[-1.0, -0.7, -0.4, -0.1].map((x) => (
        <mesh key={x} position={[x, BEAM_Y, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.3, 0.05, 10, 32]} />
          <meshStandardMaterial color="#8296ff" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      {[0.42, -0.42].map((offset) => (
        <mesh key={offset} position={[0.6, BEAM_Y + offset, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.5]} />
          <meshStandardMaterial color="#34d399" metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[WAFER_X + 0.04, BEAM_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.75, 0.75, 0.05, 48]} />
        <meshStandardMaterial color="#8892b8" metalness={0.6} roughness={0.3} />
      </mesh>
      <group ref={ions}>
        {Array.from({ length: IONS }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color="#5ad1ff" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={rejected}>
        {Array.from({ length: REJECTED }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color="#94a3b8" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <TextSprite text="sumber ion" position={[-2.6, -1.75, 0]} height={0.24} color="#f5a524" />
      <TextSprite text="magnet penyaring" position={[-2.2, 1.45, 0]} height={0.24} color="#fca5a5" />
      <TextSprite text="pemercepat" position={[-0.55, 0.05, 0]} height={0.24} color="#8296ff" />
      <TextSprite text="pemindai" position={[0.6, 1.3, 0]} height={0.24} color="#34d399" />
      <TextSprite text="wafer" position={[WAFER_X, -0.45, 0]} height={0.24} color="#aab4d4" />
    </group>
  );
}

function Profile({
  range,
  sigma,
  peak,
  junction,
}: {
  range: number;
  sigma: number;
  peak: number;
  junction: number;
}) {
  const x = (depth: number) => 44 + (depth / 1.2) * 240;
  const y = (concentration: number) =>
    150 - ((Math.log10(Math.max(concentration, 1e14)) - 14) / 7) * 134;
  const path = Array.from({ length: 121 }, (_, i) => {
    const depth = (i / 120) * 1.2;
    const value = peak * Math.exp(-((depth - range) ** 2) / (2 * sigma * sigma));
    return `${i === 0 ? "M" : "L"}${x(depth).toFixed(1)},${y(value).toFixed(1)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Profil dopan terhadap kedalaman. Puncak di ${range.toFixed(2)} mikrometer, kedalaman sambungan ${junction.toFixed(2)} mikrometer`}
      className="h-full w-full"
    >
      <line x1="44" x2="284" y1="150" y2="150" stroke="var(--line)" />
      <line x1="44" x2="44" y1="16" y2="150" stroke="var(--line)" />
      <line x1="44" x2="284" y1={y(BACKGROUND)} y2={y(BACKGROUND)} stroke="var(--muted)" strokeDasharray="4 4" />
      <text x="282" y={y(BACKGROUND) - 4} textAnchor="end" fontSize="8" fill="var(--muted)">
        doping wafer
      </text>
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.4" />
      {junction <= 1.2 && <circle cx={x(junction)} cy={y(BACKGROUND)} r="4.5" fill="var(--warm)" />}
      {[0, 0.4, 0.8, 1.2].map((depth) => (
        <text key={depth} x={x(depth)} y="164" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {depth.toLocaleString("id-ID")}
        </text>
      ))}
      <text x="164" y="180" textAnchor="middle" fontSize="9" fill="var(--muted)">
        kedalaman (µm)
      </text>
      {[15, 17, 19, 21].map((e) => (
        <text key={e} x="38" y={y(10 ** e) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
          10
          <tspan baselineShift="super" fontSize="6">
            {e}
          </tspan>
        </text>
      ))}
      <text x="48" y="12" fontSize="9" fill="var(--muted)">
        konsentrasi dopan (cm⁻³)
      </text>
    </svg>
  );
}

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export default function ImplantExplorer() {
  const [dopant, setDopant] = useState(0);
  const [energy, setEnergy] = useState(80);
  const [doseExponent, setDoseExponent] = useState(14);
  const [spread, setSpread] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const { range: perKev, straggle } = DOPANTS[dopant];
  const range = perKev * energy;
  // Annealing adds diffusion: variances add.
  const sigma = Math.hypot(straggle * Math.sqrt(energy), spread);
  const dose = 10 ** doseExponent;
  const peak = dose / (Math.sqrt(2 * Math.PI) * sigma * 1e-4);
  const junction =
    peak > BACKGROUND ? range + sigma * Math.sqrt(2 * Math.log(peak / BACKGROUND)) : 0;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.2, 0.25, 1]}
            distance={7.8}
            label={`Ion implanter: sumber ion, magnet penyaring, pemercepat, pemindai, dan wafer. Energi ${energy} kiloelektronvolt`}
          >
            <Beamline moving={!reducedMotion} speed={0.7 + energy / 200} />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:col-span-2 sm:aspect-auto">
          <Profile range={range} sigma={sigma} peak={peak} junction={junction} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Dopan">
          {DOPANTS.map((item, i) => (
            <Chip key={item.name} active={i === dopant} onClick={() => setDopant(i)}>
              {item.name}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Energi ion"
          value={energy}
          min={10}
          max={200}
          step={5}
          onChange={setEnergy}
          display={`${energy} keV`}
        />
        <Slider
          label="Dosis"
          value={doseExponent}
          min={12}
          max={16}
          step={0.25}
          onChange={setDoseExponent}
          display={
            <>
              <Scientific value={dose} /> cm⁻²
            </>
          }
        />
        <Slider
          label="Annealing"
          value={spread}
          min={0}
          max={0.2}
          step={0.01}
          onChange={setSpread}
          display={spread === 0 ? "Belum" : spread < 0.07 ? "Singkat" : spread < 0.14 ? "Sedang" : "Lama"}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Kedalaman puncak" value={`${format(range)} µm`} />
          <Stat
            label="Konsentrasi puncak"
            value={
              <>
                <Scientific value={peak} /> cm⁻³
              </>
            }
          />
          <Stat label="Kedalaman sambungan" value={junction > 0 ? `${format(junction)} µm` : "—"} />
        </dl>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Titik biru: ion dopan yang lolos</span>
          <span>Titik abu-abu: ion lain yang dibuang magnet</span>
          <span>Titik jingga pada grafik: sambungan p-n</span>
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Profil dianggap berbentuk lonceng (Gauss). Kedalaman dan lebar sebaran
        adalah pendekatan kasar untuk silikon, dan profil sebenarnya sedikit
        tidak simetris. Annealing melebarkan profil tanpa mengubah jumlah
        dopan.
      </figcaption>
    </figure>
  );
}
