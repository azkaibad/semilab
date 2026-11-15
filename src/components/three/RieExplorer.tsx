"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/lib/lattice";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const HX = 1.9;
const HY = 1.3;
const HZ = 1.2;
const WAFER_Y = -HY + 0.3;
const TOP_Y = HY - 0.25;
const IONS = 40;
const RADICALS = 44;
const PRODUCTS = 22;

type Particle = { position: Vec3; velocity: Vec3 };

const randomUnit = (): Vec3 => {
  const v: Vec3 = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

const inPlasma = (): Vec3 => [
  (Math.random() * 2 - 1) * 1.3,
  WAFER_Y + 0.5 + Math.random() * (TOP_Y - WAFER_Y - 0.7),
  (Math.random() * 2 - 1) * 0.8,
];

const onWafer = (): Vec3 => [
  (Math.random() * 2 - 1) * 1.1,
  WAFER_Y + 0.05,
  (Math.random() * 2 - 1) * 0.7,
];

function Particles({
  power,
  scatter,
  moving,
}: {
  power: number;
  /** Sideways wander of the ions, 0 for none. */
  scatter: number;
  moving: boolean;
}) {
  const state = useRef<{ ions: Particle[]; radicals: Particle[]; products: Particle[] } | null>(null);
  const ionGroup = useRef<THREE.Group>(null);
  const radicalGroup = useRef<THREE.Group>(null);
  const productGroup = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    if (!state.current) {
      state.current = {
        ions: Array.from({ length: IONS }, () => ({ position: inPlasma(), velocity: [0, -1, 0] })),
        radicals: Array.from({ length: RADICALS }, () => ({ position: inPlasma(), velocity: randomUnit() })),
        products: Array.from({ length: PRODUCTS }, () => {
          const position = onWafer();
          position[0] += Math.random() * 1.5;
          position[1] += Math.random() * 0.6;
          return { position, velocity: [0.7, 0.35, 0] };
        }),
      };
    }
    const delta = moving ? Math.min(rawDelta, 0.1) : 0;
    const shown = (count: number) => Math.round(count * (0.3 + power * 0.7));

    state.current.ions.forEach((ion, i) => {
      const mesh = ionGroup.current?.children[i];
      if (!mesh) return;
      mesh.visible = i < shown(IONS);
      ion.position[1] -= delta * (1.2 + power * 1.6);
      ion.position[0] += (Math.random() - 0.5) * delta * scatter * 5;
      ion.position[2] += (Math.random() - 0.5) * delta * scatter * 5;
      if (ion.position[1] < WAFER_Y) ion.position = inPlasma();
      mesh.position.set(...ion.position);
    });

    state.current.radicals.forEach((radical, i) => {
      const mesh = radicalGroup.current?.children[i];
      if (!mesh) return;
      mesh.visible = i < shown(RADICALS);
      if (delta > 0 && Math.random() < delta * 2.5) radical.velocity = randomUnit();
      const limits = [1.5, 0, 1.0];
      for (const axis of [0, 2]) {
        radical.position[axis] += radical.velocity[axis] * delta * 0.9;
        if (Math.abs(radical.position[axis]) > limits[axis]) radical.velocity[axis] *= -1;
      }
      radical.position[1] += radical.velocity[1] * delta * 0.9;
      if (radical.position[1] < WAFER_Y + 0.05 || radical.position[1] > TOP_Y - 0.1) {
        radical.velocity[1] *= -1;
        radical.position[1] = Math.min(TOP_Y - 0.1, Math.max(WAFER_Y + 0.05, radical.position[1]));
      }
      mesh.position.set(...radical.position);
    });

    state.current.products.forEach((product, i) => {
      const mesh = productGroup.current?.children[i];
      if (!mesh) return;
      mesh.visible = i < shown(PRODUCTS);
      for (let axis = 0; axis < 3; axis++) product.position[axis] += product.velocity[axis] * delta;
      if (product.position[0] > HX) product.position = onWafer();
      mesh.position.set(...product.position);
    });
  });

  const dots = (count: number, radius: number, color: string) =>
    Array.from({ length: count }, (_, i) => (
      <mesh key={i} visible={false}>
        <sphereGeometry args={[radius, 10, 10]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    ));

  return (
    <>
      <group ref={ionGroup}>{dots(IONS, 0.04, "#c084fc")}</group>
      <group ref={radicalGroup}>{dots(RADICALS, 0.035, "#4ade80")}</group>
      <group ref={productGroup}>{dots(PRODUCTS, 0.03, "#cbd5e1")}</group>
    </>
  );
}

function Chamber({ power }: { power: number }) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(HX * 2, HY * 2, HZ * 2)),
    [],
  );
  return (
    <group>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#5b6690" />
      </lineSegments>
      <mesh position={[0, TOP_Y + 0.08, 0]}>
        <boxGeometry args={[3, 0.16, 1.9]} />
        <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, WAFER_Y - 0.14, 0]}>
        <boxGeometry args={[3, 0.22, 1.9]} />
        <meshStandardMaterial color="#8892a6" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, WAFER_Y - 0.01, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.04, 48]} />
        <meshStandardMaterial color="#7b86ad" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, (TOP_Y + WAFER_Y) / 2 + 0.15, 0]}>
        <boxGeometry args={[2.9, TOP_Y - WAFER_Y - 0.5, 1.8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.07 + power * 0.14} depthWrite={false} toneMapped={false} />
      </mesh>
      <TextSprite text="gas masuk lewat elektrode atas" position={[0, HY + 0.3, 0]} height={0.24} color="#c9ced9" />
      <TextSprite text="wafer di elektrode RF" position={[0, -HY - 0.3, 0]} height={0.24} color="#aab4d4" />
      <TextSprite text="ke pompa" position={[HX + 0.6, WAFER_Y + 0.5, 0]} height={0.24} color="#cbd5e1" />
    </group>
  );
}

const MODES = [
  {
    label: "RIE, tekanan rendah",
    scatter: 0,
    pressure: "0,01 sampai 0,1 mbar",
    profile: "Tegak",
    text: "Pada tekanan rendah, ion hampir tidak bertabrakan saat melintasi lapisan gelap di atas wafer. Ion jatuh tegak lurus, menghantam dasar parit, dan hampir tidak menyentuh dindingnya.",
  },
  {
    label: "Plasma etch, tekanan tinggi",
    scatter: 1,
    pressure: "0,2 sampai 2 mbar",
    profile: "Miring sampai membulat",
    text: "Pada tekanan lebih tinggi, ion sering bertabrakan dan kehilangan arah. Etch lebih banyak dikerjakan oleh radikal yang bergerak ke segala arah, sehingga dinding ikut termakan.",
  },
];

export default function RieExplorer() {
  const [mode, setMode] = useState(0);
  const [power, setPower] = useState(0.6);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const current = MODES[mode];

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.4, 0.25, 1]}
          distance={8.6}
          label={`Ruang etch plasma, ${current.label}: plasma di antara dua elektrode, wafer di elektrode bawah`}
        >
          <Chamber power={power} />
          <Particles power={power} scatter={current.scatter} moving={!paused && !reducedMotion} />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Keadaan">
          {MODES.map((item, i) => (
            <Chip key={item.label} active={i === mode} onClick={() => setMode(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Daya RF"
          value={power}
          min={0.1}
          max={1}
          step={0.05}
          onChange={setPower}
          display={`${Math.round(power * 100)}%`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Tekanan kerja" value={<span className="text-sm">{current.pressure}</span>} />
          <Stat label="Arah ion" value={mode === 0 ? "Tegak lurus" : "Tersebar"} />
          <Stat label="Dinding hasil etch" value={<span className="text-sm">{current.profile}</span>} />
        </dl>
        <p className="text-sm text-muted">{current.text}</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Ungu: ion</span>
          <span>Hijau: radikal</span>
          <span>Abu-abu: gas hasil etch</span>
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
        Gambar skematis ruang etch pelat sejajar, tidak berskala. Jumlah
        partikel yang digambar tidak mewakili jumlah sebenarnya: di dalam
        plasma, radikal jauh lebih banyak daripada ion.
      </figcaption>
    </figure>
  );
}
