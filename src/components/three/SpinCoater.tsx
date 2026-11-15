"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const WAFER_RADIUS = 1.5;
const RPM_MIN = 500;
const RPM_MAX = 6000;

/** Thickness in nm is `factor / sqrt(rpm)`. */
const LIQUIDS = [
  { label: "Encer", factor: 30000 },
  { label: "Sedang", factor: 63000 },
  { label: "Kental", factor: 160000 },
];
const thickness = (factor: number, rpm: number) => factor / Math.sqrt(rpm);

type Phase = "Teteskan" | "Menyebar" | "Menipis" | "Selesai";

const PHASE_TEXT: Record<Phase, string> = {
  Teteskan: "Cairan diteteskan di tengah wafer yang masih diam. Tekan Mulai putar.",
  Menyebar: "Wafer mulai berputar. Gaya sentrifugal mendorong cairan ke tepi, dan sebagian besar terlempar keluar.",
  Menipis: "Lapisan yang tersisa terus menipis. Pelarut menguap, cairan makin kental, sampai akhirnya berhenti mengalir.",
  Selesai: "Lapisan sudah tidak mengalir lagi. Tebal akhirnya ditentukan oleh kecepatan putar dan kekentalan cairan.",
};

function Coater({
  rpm,
  finalHeight,
  run,
  instant,
  onPhase,
}: {
  rpm: number;
  /** Height of the finished film in scene units. */
  finalHeight: number;
  run: number;
  instant: boolean;
  onPhase: (phase: Phase) => void;
}) {
  const spinner = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const state = useRef({ run: -1, time: 0, phase: "" });

  useFrame((_, rawDelta) => {
    const current = state.current;
    if (current.run !== run) {
      current.run = run;
      // Run 0 is the idle state before the first start.
      current.time = run === 0 ? 0 : instant ? 99 : 0.001;
    } else if (current.time > 0) {
      current.time += Math.min(rawDelta, 0.1);
    }
    const time = current.time;

    const spread = Math.min(1, Math.max(0, time / 1.5));
    const thinning = Math.min(1, Math.max(0, (time - 1.5) / 3));
    const radius = 0.35 + (WAFER_RADIUS - 0.37) * spread;
    const height =
      time === 0 ? 0.22 : 0.22 - (0.22 - 0.06) * spread - (0.06 - finalHeight) * thinning;
    liquid.current?.scale.set(radius, height, radius);
    liquid.current?.position.setY(0.03 + height / 2);

    const speed = time > 0 && time < 6 ? (rpm / RPM_MAX) * 22 * Math.min(1, time / 1.2) : 0;
    if (spinner.current) spinner.current.rotation.y += speed * Math.min(rawDelta, 0.1);

    const phase: Phase =
      time === 0 ? "Teteskan" : time < 1.5 ? "Menyebar" : time < 4.5 ? "Menipis" : "Selesai";
    if (phase !== current.phase) {
      current.phase = phase;
      onPhase(phase);
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 1.2, 20]} />
        <meshStandardMaterial color="#8892a6" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.12, 48]} />
        <meshStandardMaterial color="#252b40" roughness={0.8} />
      </mesh>
      <group ref={spinner}>
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.6, 0.5, 0.26, 32]} />
          <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[WAFER_RADIUS, WAFER_RADIUS, 0.05, 64]} />
          <meshStandardMaterial color="#7b86ad" metalness={0.6} roughness={0.25} />
        </mesh>
        {/* A mark near the edge so the rotation is visible. */}
        <mesh position={[WAFER_RADIUS - 0.2, 0.03, 0]}>
          <boxGeometry args={[0.3, 0.012, 0.08]} />
          <meshBasicMaterial color="#f8fafc" toneMapped={false} />
        </mesh>
        <mesh ref={liquid} position={[0, 0.14, 0]} scale={[0.35, 0.22, 0.35]}>
          <cylinderGeometry args={[1, 1, 1, 64]} />
          <meshStandardMaterial color="#f5a524" transparent opacity={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function ThicknessPlot({ rpm, selected }: { rpm: number; selected: number }) {
  const x = (value: number) => 44 + ((value - RPM_MIN) / (RPM_MAX - RPM_MIN)) * 240;
  const y = (nm: number) => 150 - (Math.min(nm, 8000) / 8000) * 132;
  const curve = (factor: number) =>
    Array.from({ length: 56 }, (_, i) => {
      const value = RPM_MIN + (i / 55) * (RPM_MAX - RPM_MIN);
      return `${i === 0 ? "M" : "L"}${x(value).toFixed(1)},${y(thickness(factor, value)).toFixed(1)}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Grafik tebal lapisan terhadap kecepatan putar. Pada ${rpm} rpm tebalnya ${Math.round(
        thickness(LIQUIDS[selected].factor, rpm),
      )} nanometer`}
      className="h-full w-full"
    >
      <line x1="44" x2="284" y1="150" y2="150" stroke="var(--line)" />
      <line x1="44" x2="44" y1="16" y2="150" stroke="var(--line)" />
      {LIQUIDS.map((liquid, i) => (
        <g key={liquid.label}>
          <path
            d={curve(liquid.factor)}
            fill="none"
            stroke={i === selected ? "var(--accent)" : "var(--muted)"}
            strokeWidth={i === selected ? 2.4 : 1}
            opacity={i === selected ? 1 : 0.55}
          />
          <text x="282" y={y(thickness(liquid.factor, RPM_MAX)) + (i === 0 ? 10 : -4)} textAnchor="end" fontSize="8" fill="var(--muted)">
            {liquid.label.toLowerCase()}
          </text>
        </g>
      ))}
      <circle cx={x(rpm)} cy={y(thickness(LIQUIDS[selected].factor, rpm))} r="5" fill="var(--warm)" />
      {[1000, 2000, 3000, 4000, 5000, 6000].map((value) => (
        <text key={value} x={x(value)} y="164" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {value / 1000}
        </text>
      ))}
      <text x="164" y="180" textAnchor="middle" fontSize="9" fill="var(--muted)">
        kecepatan putar (ribu rpm)
      </text>
      {[2, 4, 6, 8].map((um) => (
        <text key={um} x="38" y={y(um * 1000) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
          {um}
        </text>
      ))}
      <text x="48" y="12" fontSize="9" fill="var(--muted)">
        tebal lapisan (µm)
      </text>
    </svg>
  );
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export default function SpinCoater() {
  const [rpm, setRpm] = useState(3000);
  const [liquid, setLiquid] = useState(1);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<Phase>("Teteskan");
  const reducedMotion = usePrefersReducedMotion();

  const nm = thickness(LIQUIDS[liquid].factor, rpm);
  // Edge speed of a 100 mm wafer.
  const edgeSpeed = ((rpm * 2 * Math.PI) / 60) * 0.05 * 3.6;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.5, 0.6, 1]}
            distance={7.5}
            label={`Spin coater pada ${rpm} rpm, tahap ${phase}`}
          >
            <Coater
              rpm={rpm}
              finalHeight={0.008 + (nm / 8000) * 0.04}
              run={run}
              instant={reducedMotion}
              onPhase={setPhase}
            />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:col-span-2 sm:aspect-auto">
          <ThicknessPlot rpm={rpm} selected={liquid} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Kecepatan putar"
          value={rpm}
          min={RPM_MIN}
          max={RPM_MAX}
          step={100}
          onChange={setRpm}
          display={`${format(rpm)} rpm`}
        />
        <ControlRow label="Kekentalan">
          {LIQUIDS.map((item, i) => (
            <Chip key={item.label} active={i === liquid} onClick={() => setLiquid(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Tahap" value={phase} />
          <Stat
            label="Tebal akhir"
            value={nm >= 1000 ? `${format(nm / 1000, 2)} µm` : `${format(nm)} nm`}
          />
          <Stat label="Kecepatan tepi wafer 100 mm" value={`${format(edgeSpeed)} km/jam`} />
        </dl>
        <p className="text-sm text-muted">{PHASE_TEXT[phase]}</p>
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
        >
          {run === 0 ? "Mulai putar" : "Ulangi"}
        </button>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Tebal lapisan pada model 3D sangat dilebih-lebihkan. Hubungan tebal
        terhadap kecepatan putar mengikuti aturan satu per akar kecepatan,
        dengan tetapan yang mewakili photoresist yang umum.
      </figcaption>
    </figure>
  );
}
