"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Slider, Stat } from "./controls";

const SEGMENTS = 48;
const SEGMENT_HEIGHT = 0.07;
const MELT_Y = -1.15;
const NECK = 5;
const SHOULDER = 12;
const TAIL = 42;
/** Length of a finished ingot, metres. */
const INGOT_LENGTH = 2;

/** Ingot diameter in mm for a pull speed in mm/min: pulling faster gives a thinner crystal. */
const diameter = (speed: number) => 300 * Math.sqrt(0.4 / speed);

function radiusAt(index: number, body: number) {
  if (index < NECK) return 0.06;
  if (index < SHOULDER) return 0.06 + ((index - NECK + 1) / (SHOULDER - NECK)) * (body - 0.06);
  if (index < TAIL) return body;
  return body - ((index - TAIL + 1) / (SEGMENTS - TAIL)) * (body - 0.04);
}

function Puller({
  speed,
  run,
  instant,
  onProgress,
}: {
  speed: number;
  run: number;
  instant: boolean;
  onProgress: (progress: number) => void;
}) {
  const ingot = useRef<THREE.Group>(null);
  const crucible = useRef<THREE.Group>(null);
  const state = useRef({ run: -1, progress: 0, reported: -1 });
  const body = (diameter(speed) / 300) * 0.62;

  useFrame((_, rawDelta) => {
    const current = state.current;
    const delta = Math.min(rawDelta, 0.1);
    if (current.run !== run) {
      current.run = run;
      current.progress = run === 0 ? 0 : instant ? 1 : 0.0001;
    } else if (current.progress > 0 && current.progress < 1) {
      current.progress = Math.min(1, current.progress + (delta * speed) / 14);
    }
    const grown = current.progress * SEGMENTS;

    if (ingot.current) {
      ingot.current.position.y = MELT_Y + grown * SEGMENT_HEIGHT;
      ingot.current.rotation.y += delta * 1.4;
      ingot.current.children.forEach((child, i) => {
        // Children 0 and 1 are the seed holder and cable.
        if (i >= 2) child.visible = i - 2 < grown;
      });
    }
    if (crucible.current) crucible.current.rotation.y -= delta * 0.5;

    const rounded = Math.round(current.progress * 50) / 50;
    if (rounded !== current.reported) {
      current.reported = rounded;
      onProgress(rounded);
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      <group ref={crucible}>
        <mesh position={[0, MELT_Y - 0.3, 0]}>
          <cylinderGeometry args={[1.25, 1.1, 0.95, 12, 1, true]} />
          <meshStandardMaterial color="#e2e8f0" transparent opacity={0.35} side={2} depthWrite={false} />
        </mesh>
        <mesh position={[0, MELT_Y - 0.37, 0]}>
          <cylinderGeometry args={[1.2, 1.08, 0.74, 12]} />
          <meshStandardMaterial color="#ff9a3c" emissive="#ff5a00" emissiveIntensity={1.3} />
        </mesh>
      </group>
      {[-0.1, -0.4, -0.7].map((offset) => (
        <mesh key={offset} position={[0, MELT_Y + offset, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 10, 48]} />
          <meshStandardMaterial color="#ff8a3c" emissive="#ff5a00" emissiveIntensity={1.6} />
        </mesh>
      ))}
      <group ref={ingot}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.24, 12]} />
          <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 4, 6]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <mesh key={i} position={[0, -(i + 0.5) * SEGMENT_HEIGHT, 0]} visible={false}>
            <cylinderGeometry
              args={[radiusAt(i - 1, body), radiusAt(i, body), SEGMENT_HEIGHT, 12]}
            />
            <meshStandardMaterial color="#9aa5c8" metalness={0.75} roughness={0.25} flatShading />
          </mesh>
        ))}
      </group>
      <TextSprite text="lelehan silikon 1.420 °C" position={[3.0, MELT_Y - 0.9, 0]} height={0.24} color="#ff9a3c" />
      <TextSprite text="pemanas" position={[-2.4, MELT_Y - 0.9, 0]} height={0.24} color="#ff8a3c" />
    </group>
  );
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function phaseOf(progress: number) {
  const index = progress * SEGMENTS;
  if (progress === 0) return { name: "Benih dicelupkan", text: "Sepotong kecil kristal tunggal, yang disebut benih, dicelupkan ke permukaan lelehan. Tekan Mulai tarik." };
  if (index < NECK) return { name: "Leher", text: "Benih ditarik cepat sehingga kristal tumbuh sangat kurus. Cacat kristal dari benih tidak bisa merambat melewati leher sesempit ini." };
  if (index < SHOULDER) return { name: "Bahu", text: "Tarikan diperlambat dan suhu diturunkan sedikit, sehingga kristal melebar sampai diameter yang diinginkan." };
  if (index < TAIL) return { name: "Badan", text: "Diameter dijaga tetap dengan mengatur kecepatan tarik dan suhu. Bagian inilah yang nanti dipotong menjadi wafer." };
  if (progress < 1) return { name: "Ekor", text: "Kristal diruncingkan perlahan sebelum dilepas dari lelehan, agar kejutan panas tidak menimbulkan cacat yang merambat ke badan." };
  return { name: "Selesai", text: "Ingot kristal tunggal selesai. Setiap atom di dalamnya mengikuti susunan benih yang kecil tadi." };
}

export default function CzochralskiExplorer() {
  const [speed, setSpeed] = useState(1);
  const [run, setRun] = useState(0);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const phase = phaseOf(progress);
  const length = progress * INGOT_LENGTH;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.4, 0.3, 1]}
          distance={9.5}
          label={`Penarikan kristal Czochralski, tahap ${phase.name}, panjang ingot ${format(length, 1)} meter`}
        >
          <Puller speed={speed} run={run} instant={reducedMotion} onProgress={setProgress} />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Kecepatan tarik"
          value={speed}
          min={0.4}
          max={2}
          step={0.1}
          onChange={setSpeed}
          display={`${format(speed, 1)} mm/menit`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Tahap" value={phase.name} />
          <Stat label="Diameter badan" value={`${format(diameter(speed))} mm`} />
          <Stat label="Panjang ingot" value={`${format(length, 2)} m`} />
          <Stat
            label="Waktu untuk 2 m"
            value={`${format((INGOT_LENGTH * 1000) / speed / 60)} jam`}
          />
        </dl>
        <p className="text-sm text-muted">{phase.text}</p>
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
        >
          {run === 0 ? "Mulai tarik" : "Ulangi"}
        </button>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Gambar skematis dan dipercepat. Penarikan yang sebenarnya makan waktu
        satu sampai dua hari. Hubungan kecepatan tarik dan diameter di sini
        disederhanakan: menarik lebih cepat menghasilkan kristal lebih kurus.
      </figcaption>
    </figure>
  );
}
