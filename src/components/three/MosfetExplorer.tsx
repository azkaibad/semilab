"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { ELECTRON_COLOR } from "./CarrierLattice";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Slider, Stat } from "./controls";

/** Threshold voltage, V. */
const V_TH = 0.7;
/** Transconductance parameter, mA/V². */
const K = 1;
const V_MAX = 3;
const CHANNEL_HALF = 1.4;
const DEPTH = 2.4;
const MAX_ELECTRONS = 36;

/** Drain current in mA from the square-law model. */
function drainCurrent(gate: number, drain: number) {
  const overdrive = gate - V_TH;
  if (overdrive <= 0) return 0;
  return drain < overdrive
    ? K * (overdrive * drain - (drain * drain) / 2)
    : (K / 2) * overdrive * overdrive;
}

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function ChannelElectrons({ count, speed }: { count: number; speed: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    group.current?.children.forEach((mesh, i) => {
      mesh.visible = i < count;
      mesh.position.x += Math.min(delta, 0.05) * speed;
      if (mesh.position.x > CHANNEL_HALF) mesh.position.x = -CHANNEL_HALF;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: MAX_ELECTRONS }, (_, i) => (
        <mesh
          key={i}
          position={[
            -CHANNEL_HALF + ((i * 0.618) % 1) * CHANNEL_HALF * 2,
            -0.04 - ((i * 0.37) % 1) * 0.1,
            DEPTH / 2 + 0.03,
          ]}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={ELECTRON_COLOR} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Device({ gate, drain, moving }: { gate: number; drain: number; moving: boolean }) {
  const overdrive = Math.max(0, gate - V_TH);
  const strength = overdrive / (V_MAX - V_TH);
  const current = drainCurrent(gate, drain);

  return (
    <group position={[0, 0.3, 0]}>
      {/* p-type substrate */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[6, 1.6, DEPTH]} />
        <meshStandardMaterial color="#6b4a63" roughness={0.8} />
      </mesh>
      {/* n+ source and drain */}
      {[-2.2, 2.2].map((x) => (
        <mesh key={x} position={[x, -0.27, 0]}>
          <boxGeometry args={[1.6, 0.55, DEPTH + 0.02]} />
          <meshStandardMaterial color="#34d399" roughness={0.6} />
        </mesh>
      ))}
      {/* inversion channel */}
      <mesh position={[0, -0.08, 0]} visible={overdrive > 0}>
        <boxGeometry args={[CHANNEL_HALF * 2, 0.16, DEPTH + 0.02]} />
        <meshBasicMaterial
          color={ELECTRON_COLOR}
          transparent
          opacity={0.2 + strength * 0.35}
          depthWrite={false}
        />
      </mesh>
      <ChannelElectrons
        count={Math.round(strength * MAX_ELECTRONS)}
        speed={moving ? Math.min(2.6, current * 1.4) : 0}
      />
      {/* gate oxide */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[CHANNEL_HALF * 2 + 0.2, 0.12, DEPTH]} />
        <meshStandardMaterial color="#bfe3ff" transparent opacity={0.75} />
      </mesh>
      {/* gate */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[CHANNEL_HALF * 2 + 0.2, 0.44, DEPTH]} />
        <meshStandardMaterial color="#8892a6" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* source and drain contacts */}
      {[-2.45, 2.45].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.9, 0.4, DEPTH]} />
          <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      <TextSprite text="Source" position={[-2.45, 0.75, 0]} height={0.28} />
      <TextSprite text="Gate" position={[0, 0.92, 0]} height={0.28} />
      <TextSprite text="Drain" position={[2.45, 0.75, 0]} height={0.28} />
      <TextSprite text="n⁺" position={[-2.2, -0.27, DEPTH / 2 + 0.05]} height={0.24} color="#06281c" />
      <TextSprite text="n⁺" position={[2.2, -0.27, DEPTH / 2 + 0.05]} height={0.24} color="#06281c" />
      <TextSprite text="substrat tipe-p" position={[0, -1.2, DEPTH / 2 + 0.05]} height={0.24} color="#f3c9e0" />
      <TextSprite text="oksida" position={[CHANNEL_HALF + 0.75, 0.06, DEPTH / 2 + 0.05]} height={0.2} color="#bfe3ff" />
    </group>
  );
}

function OutputCurves({ gate, drain }: { gate: number; drain: number }) {
  const x = (v: number) => 40 + (v / V_MAX) * 240;
  const y = (mA: number) => 176 - (mA / 2.8) * 158;
  const curve = (g: number) =>
    Array.from({ length: 61 }, (_, i) => {
      const v = (i / 60) * V_MAX;
      return `${i === 0 ? "M" : "L"}${x(v).toFixed(1)},${y(drainCurrent(g, v)).toFixed(1)}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 300 210"
      role="img"
      aria-label={`Kurva arus drain terhadap tegangan drain. Arus saat ini ${format(
        drainCurrent(gate, drain),
      )} miliampere`}
      className="h-full w-full"
    >
      <line x1="40" x2="284" y1="176" y2="176" stroke="var(--line)" />
      <line x1="40" x2="40" y1="14" y2="176" stroke="var(--line)" />
      {[1.5, 2, 2.5, 3].map((g) => (
        <g key={g}>
          <path d={curve(g)} fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.55" />
          <text x="282" y={y(drainCurrent(g, V_MAX)) - 3} textAnchor="end" fontSize="8" fill="var(--muted)">
            {format(g)} V
          </text>
        </g>
      ))}
      <path d={curve(gate)} fill="none" stroke="var(--accent)" strokeWidth="2.4" />
      <circle cx={x(drain)} cy={y(drainCurrent(gate, drain))} r="5" fill="var(--warm)" />
      {[0, 1, 2, 3].map((v) => (
        <text key={v} x={x(v)} y="190" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {v}
        </text>
      ))}
      <text x="162" y="205" textAnchor="middle" fontSize="9" fill="var(--muted)">
        tegangan drain (V)
      </text>
      <text x="44" y="12" fontSize="9" fill="var(--muted)">
        arus drain (mA)
      </text>
      {[1, 2].map((mA) => (
        <text key={mA} x="34" y={y(mA) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
          {mA}
        </text>
      ))}
    </svg>
  );
}

export default function MosfetExplorer() {
  const [gate, setGate] = useState(0);
  const [drain, setDrain] = useState(1);
  const reducedMotion = usePrefersReducedMotion();

  const overdrive = gate - V_TH;
  const current = drainCurrent(gate, drain);
  const region =
    overdrive <= 0
      ? "Mati"
      : drain < overdrive
        ? "Linear"
        : "Jenuh";
  const explanation =
    overdrive <= 0
      ? "Tegangan gate masih di bawah ambang 0,7 V. Tidak ada kanal, sehingga source dan drain terpisah oleh substrat tipe-p dan tidak ada arus."
      : drain < overdrive
        ? "Kanal elektron sudah terbentuk di bawah oksida. Arus naik hampir sebanding dengan tegangan drain, seperti resistor yang nilainya diatur oleh gate."
        : "Kanal terjepit di dekat drain. Arus tidak lagi naik terhadap tegangan drain dan hanya ditentukan oleh tegangan gate.";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.3, 0.3, 1]}
            distance={9}
            label={`Potongan melintang MOSFET, tegangan gate ${format(gate)} volt, keadaan ${region}`}
          >
            <Device gate={gate} drain={drain} moving={!reducedMotion} />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:col-span-2 sm:aspect-auto">
          <OutputCurves gate={gate} drain={drain} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Tegangan gate"
          value={gate}
          min={0}
          max={V_MAX}
          step={0.05}
          onChange={setGate}
          display={`${format(gate)} V`}
        />
        <Slider
          label="Tegangan drain"
          value={drain}
          min={0}
          max={V_MAX}
          step={0.05}
          onChange={setDrain}
          display={`${format(drain)} V`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Keadaan" value={region} />
          <Stat label="Arus drain" value={`${format(current)} mA`} />
          <Stat label="Tegangan ambang" value={`${format(V_TH)} V`} />
        </dl>
        <p className="text-sm text-muted">{explanation}</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        MOSFET kanal-n. Titik biru di sisi depan adalah elektron yang mengalir di
        kanal, tepat di bawah oksida.
      </figcaption>
    </figure>
  );
}
