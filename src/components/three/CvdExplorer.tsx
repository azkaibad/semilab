"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { K_B } from "@/lib/semiconductor";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Slider, Stat } from "./controls";

const TUBE_HALF = 2.6;
const TUBE_RADIUS = 0.9;
const GAS = 70;
const BYPRODUCT = 30;
const WAFERS = 9;

/** Activation energy of the surface reaction, eV (polysilicon from silane). */
const ACTIVATION = 1.7;
const PREFACTOR = 3.9e10;
/** Growth rate when gas supply is the bottleneck, nm/min. */
const TRANSPORT_LIMIT = 200;

const reactionRate = (celsius: number) =>
  PREFACTOR * Math.exp(-ACTIVATION / (K_B * (celsius + 273.15)));
const growthRate = (celsius: number) =>
  1 / (1 / reactionRate(celsius) + 1 / TRANSPORT_LIMIT);

function Flow({ moving, speed }: { moving: boolean; speed: number }) {
  const gas = useRef<THREE.Group>(null);
  const byproduct = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    const delta = moving ? Math.min(rawDelta, 0.1) : 0;
    for (const group of [gas.current, byproduct.current]) {
      group?.children.forEach((mesh) => {
        mesh.position.x += delta * speed;
        mesh.position.y += (Math.random() - 0.5) * delta * 0.9;
        mesh.position.z += (Math.random() - 0.5) * delta * 0.9;
        const radius = Math.hypot(mesh.position.y, mesh.position.z);
        if (radius > TUBE_RADIUS * 0.85) {
          mesh.position.y *= (TUBE_RADIUS * 0.85) / radius;
          mesh.position.z *= (TUBE_RADIUS * 0.85) / radius;
        }
        if (mesh.position.x > TUBE_HALF) {
          // Fresh gas enters at the inlet; by-products are born at the wafers.
          mesh.position.x = group === gas.current ? -TUBE_HALF : -1.6 + Math.random() * 3.2;
        }
      });
    }
  });

  const scatter = (i: number, span: number, offset: number): [number, number, number] => [
    offset + ((i * 0.618) % 1) * span,
    (((i * 0.37) % 1) - 0.5) * TUBE_RADIUS * 1.3,
    (((i * 0.71) % 1) - 0.5) * TUBE_RADIUS * 1.3,
  ];

  return (
    <>
      <group ref={gas}>
        {Array.from({ length: GAS }, (_, i) => (
          <mesh key={i} position={scatter(i, TUBE_HALF * 2, -TUBE_HALF)}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color="#5ad1ff" toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={byproduct}>
        {Array.from({ length: BYPRODUCT }, (_, i) => (
          <mesh key={i} position={scatter(i, 4, -1.6)}>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color="#cbd5e1" toneMapped={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}

function Furnace({ heat }: { heat: number }) {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[TUBE_RADIUS, TUBE_RADIUS, TUBE_HALF * 2, 40, 1, true]} />
        <meshStandardMaterial color="#bfe3ff" transparent opacity={0.13} depthWrite={false} side={2} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[-1.8 + i * 0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[TUBE_RADIUS + 0.14, 0.05, 10, 48]} />
          <meshStandardMaterial color="#ff8a3c" emissive="#ff5a00" emissiveIntensity={0.3 + heat * 2.2} />
        </mesh>
      ))}
      {Array.from({ length: WAFERS }, (_, i) => (
        <mesh key={i} position={[-1.4 + i * 0.35, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.58, 0.58, 0.03, 40]} />
          <meshStandardMaterial color="#8892b8" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.3, 0.08, 0.5]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} />
      </mesh>
      <TextSprite text="gas masuk" position={[-TUBE_HALF - 0.1, 1.25, 0]} height={0.26} color="#5ad1ff" />
      <TextSprite text="ke pompa" position={[TUBE_HALF + 0.1, 1.25, 0]} height={0.26} color="#cbd5e1" />
      <TextSprite text="pemanas" position={[0, -1.4, 0]} height={0.26} color="#ff8a3c" />
    </group>
  );
}

const T_MIN = 500;
const T_MAX = 900;

function RatePlot({ celsius }: { celsius: number }) {
  // Horizontal axis is 1000/T in kelvin, so hot is on the left.
  const inverse = (c: number) => 1000 / (c + 273.15);
  const x = (c: number) => 44 + ((inverse(c) - inverse(T_MAX)) / (inverse(T_MIN) - inverse(T_MAX))) * 240;
  const y = (rate: number) => 150 - ((Math.log10(rate) + 1) / 3.6) * 130;
  const curve = (rate: (c: number) => number) =>
    Array.from({ length: 81 }, (_, i) => {
      const c = T_MAX - (i / 80) * (T_MAX - T_MIN);
      return `${i === 0 ? "M" : "L"}${x(c).toFixed(1)},${Math.min(150, Math.max(16, y(rate(c)))).toFixed(1)}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Grafik laju tumbuh terhadap suhu. Pada ${celsius} derajat Celsius lajunya ${growthRate(celsius).toFixed(1)} nanometer per menit`}
      className="h-full w-full"
    >
      <line x1="44" x2="284" y1="150" y2="150" stroke="var(--line)" />
      <line x1="44" x2="44" y1="16" y2="150" stroke="var(--line)" />
      <path d={curve(reactionRate)} fill="none" stroke="var(--muted)" strokeDasharray="4 4" opacity="0.6" />
      <line x1="44" x2="284" y1={y(TRANSPORT_LIMIT)} y2={y(TRANSPORT_LIMIT)} stroke="var(--muted)" strokeDasharray="4 4" opacity="0.6" />
      <path d={curve(growthRate)} fill="none" stroke="var(--accent)" strokeWidth="2.4" />
      <circle cx={x(celsius)} cy={y(growthRate(celsius))} r="5" fill="var(--warm)" />
      {[900, 800, 700, 600, 500].map((c) => (
        <text key={c} x={x(c)} y="164" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {c}
        </text>
      ))}
      <text x="164" y="180" textAnchor="middle" fontSize="9" fill="var(--muted)">
        suhu (°C), skala 1/T
      </text>
      {[0.1, 1, 10, 100].map((rate) => (
        <text key={rate} x="38" y={y(rate) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
          {rate.toLocaleString("id-ID")}
        </text>
      ))}
      <text x="48" y="12" fontSize="9" fill="var(--muted)">
        laju tumbuh (nm/menit)
      </text>
      <text x="282" y={y(TRANSPORT_LIMIT) - 5} textAnchor="end" fontSize="8.5" fill="var(--muted)">
        dibatasi pasokan gas
      </text>
      <text x="150" y="132" textAnchor="middle" fontSize="8.5" fill="var(--muted)">
        dibatasi reaksi
      </text>
    </svg>
  );
}

const format = (value: number, digits = 1) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export default function CvdExplorer() {
  const [celsius, setCelsius] = useState(620);
  const reducedMotion = usePrefersReducedMotion();
  const rate = growthRate(celsius);
  const reactionLimited = reactionRate(celsius) < TRANSPORT_LIMIT;
  const minutes = 100 / rate;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.35, 0.3, 1]}
            distance={9.5}
            label={`Tungku tabung LPCVD pada ${celsius} derajat Celsius dengan wafer berdiri berjajar`}
          >
            <Furnace heat={(celsius - T_MIN) / (T_MAX - T_MIN)} />
            <Flow moving={!reducedMotion} speed={1.1} />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:col-span-2 sm:aspect-auto">
          <RatePlot celsius={celsius} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Suhu tungku"
          value={celsius}
          min={T_MIN}
          max={T_MAX}
          step={10}
          onChange={setCelsius}
          display={`${celsius} °C`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Laju tumbuh" value={`${format(rate, rate < 10 ? 2 : 0)} nm/menit`} />
          <Stat
            label="Waktu untuk 100 nm"
            value={minutes >= 120 ? `${format(minutes / 60)} jam` : `${format(minutes, minutes < 10 ? 1 : 0)} menit`}
          />
          <Stat label="Laju dibatasi oleh" value={reactionLimited ? "Reaksi permukaan" : "Pasokan gas"} />
        </dl>
        <p className="text-sm text-muted">
          {reactionLimited
            ? "Gas tersedia lebih dari cukup di semua wafer. Yang menentukan laju adalah suhu, jadi selama suhu seragam, semua wafer mendapat tebal yang sama. Inilah daerah kerja LPCVD."
            : "Reaksi berlangsung lebih cepat daripada gas bisa dipasok. Wafer di dekat saluran masuk menghabiskan gas lebih dulu, sehingga tebal film tidak lagi seragam di sepanjang tabung."}
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Titik biru: gas prekursor</span>
          <span>Titik abu-abu: gas hasil samping</span>
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Model sederhana untuk polisilikon dari gas silana. Garis putus-putus
        adalah dua batas laju, dan kurva biru adalah gabungannya. Angka laju
        adalah nilai yang umum, bukan data satu tungku.
      </figcaption>
    </figure>
  );
}
