"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider, Stat } from "./controls";

/** Scene width of the scanned square; it stands for 1 µm. */
const SIZE = 4;
const NM_PER_UNIT = 1000 / SIZE;
const PIXELS = 40;
const MAX_HEIGHT = 0.36;
const LINE_SECONDS = 0.22;

const SAMPLES: { label: string; height: (x: number, z: number) => number }[] = [
  {
    label: "Butir kristal",
    height: (x, z) =>
      0.3 * Math.abs(Math.sin(3.4 * x + 0.6 * Math.sin(2.1 * z)) * Math.sin(3.4 * z + 0.6 * Math.sin(2.3 * x))),
  },
  {
    label: "Garis hasil etch",
    height: (x) => (Math.floor((x + SIZE / 2) / 0.5) % 2 === 0 ? 0.3 : 0),
  },
  {
    label: "Film halus",
    height: (x, z) => 0.04 + 0.025 * Math.sin(7 * x) * Math.cos(6.3 * z) + 0.012 * Math.sin(15 * x + 9 * z),
  },
];

/** Height the tip actually records: the surface as felt by a rounded tip of the given radius. */
function measured(height: (x: number, z: number) => number, radius: number, x: number, z: number) {
  const reach = Math.sqrt(2 * radius * MAX_HEIGHT);
  let best = -Infinity;
  for (let i = -4; i <= 4; i++) {
    for (let j = -4; j <= 4; j++) {
      const dx = (i / 4) * reach;
      const dz = (j / 4) * reach;
      best = Math.max(best, height(x + dx, z + dz) - (dx * dx + dz * dz) / (2 * radius));
    }
  }
  return best;
}

const pixelCentre = (index: number) => -SIZE / 2 + ((index + 0.5) / PIXELS) * SIZE;

function heightColor(value: number) {
  const t = Math.min(1, Math.max(0, value / MAX_HEIGHT));
  const mix = (a: number, b: number, c: number) =>
    Math.round(t < 0.5 ? a + (b - a) * t * 2 : b + (c - b) * (t - 0.5) * 2);
  return `rgb(${mix(40, 230, 255)}, ${mix(16, 130, 245)}, ${mix(8, 30, 210)})`;
}

function Scanner({
  sample,
  radius,
  instant,
  image,
}: {
  sample: number;
  radius: number;
  instant: boolean;
  image: RefObject<HTMLCanvasElement | null>;
}) {
  const tip = useRef<THREE.Group>(null);
  const state = useRef({ key: "", position: 0, drawn: 0 });
  const { height } = SAMPLES[sample];

  const surface = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, 80, 80);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      positions.setY(i, SAMPLES[sample].height(positions.getX(i), positions.getZ(i)));
    }
    geometry.computeVertexNormals();
    return geometry;
  }, [sample]);

  useFrame((_, rawDelta) => {
    const context = image.current?.getContext("2d");
    const current = state.current;
    const key = `${sample}-${radius}`;
    const total = PIXELS * PIXELS;
    if (current.key !== key) {
      current.key = key;
      current.position = 0;
      current.drawn = 0;
      context?.clearRect(0, 0, PIXELS, PIXELS);
    }
    current.position = instant
      ? total
      : current.position + (Math.min(rawDelta, 0.1) / LINE_SECONDS) * PIXELS;
    // After a full image the scan starts again from the first line.
    if (!instant && current.position >= total + PIXELS) {
      current.position = 0;
      current.drawn = 0;
    }
    const reached = Math.min(total, Math.floor(current.position));
    for (; current.drawn < reached; current.drawn++) {
      const column = current.drawn % PIXELS;
      const row = Math.floor(current.drawn / PIXELS);
      if (context) {
        context.fillStyle = heightColor(measured(height, radius, pixelCentre(column), pixelCentre(row)));
        context.fillRect(column, row, 1, 1);
      }
    }
    const index = Math.min(total - 1, Math.floor(current.position));
    const x = pixelCentre(index % PIXELS);
    const z = pixelCentre(Math.floor(index / PIXELS));
    tip.current?.position.set(x, measured(height, radius, x, z), z);
  });

  return (
    <group position={[0, -0.4, 0]}>
      <mesh geometry={surface}>
        <meshStandardMaterial color="#c08a5a" roughness={0.55} side={2} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[SIZE, 0.2, SIZE]} />
        <meshStandardMaterial color="#3b425e" roughness={0.8} />
      </mesh>
      <group ref={tip}>
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.07 + radius * 0.25, 0.3, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.32, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.28]} />
          <meshStandardMaterial color="#aab4d4" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-0.35, 1.02, 0]} rotation={[0, 0, -0.47]}>
          <boxGeometry args={[0.025, 1.6, 0.025]} />
          <meshBasicMaterial color="#ef4444" toneMapped={false} />
        </mesh>
        <mesh position={[0.45, 1.02, 0]} rotation={[0, 0, 0.56]}>
          <boxGeometry args={[0.025, 1.65, 0.025]} />
          <meshBasicMaterial color="#ef4444" toneMapped={false} />
        </mesh>
        <TextSprite text="laser" position={[-0.8, 1.95, 0]} height={0.24} color="#fca5a5" />
        <TextSprite text="detektor" position={[1.0, 1.95, 0]} height={0.24} color="#fca5a5" />
      </group>
    </group>
  );
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

/** Root-mean-square roughness of a height function sampled on the image grid, in scene units. */
function roughness(value: (x: number, z: number) => number) {
  const samples: number[] = [];
  for (let row = 0; row < PIXELS; row++) {
    for (let column = 0; column < PIXELS; column++) {
      samples.push(value(pixelCentre(column), pixelCentre(row)));
    }
  }
  const mean = samples.reduce((sum, v) => sum + v, 0) / samples.length;
  return Math.sqrt(samples.reduce((sum, v) => sum + (v - mean) ** 2, 0) / samples.length);
}

export default function AfmExplorer() {
  const [sample, setSample] = useState(0);
  const [radius, setRadius] = useState(0.04);
  const image = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [actual, recorded] = useMemo(() => {
    const { height } = SAMPLES[sample];
    return [roughness(height), roughness((x, z) => measured(height, radius, x, z))];
  }, [sample, radius]);

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.55, 0.6, 1]}
            distance={8.5}
            label={`Ujung AFM memindai permukaan ${SAMPLES[sample].label} baris demi baris`}
          >
            <Scanner sample={sample} radius={radius} instant={reducedMotion} image={image} />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="grid place-items-center bg-bg p-4 sm:col-span-2">
          <div className="w-full max-w-56">
            <canvas
              ref={image}
              width={PIXELS}
              height={PIXELS}
              role="img"
              aria-label="Gambar ketinggian hasil pindaian AFM, terisi baris demi baris"
              className="aspect-square w-full rounded-md border border-line [image-rendering:pixelated]"
            />
            <p className="mt-2 text-center text-xs text-muted">
              Gambar hasil pindaian, 1 µm × 1 µm. Makin terang berarti makin tinggi.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Sampel">
          {SAMPLES.map((item, i) => (
            <Chip key={item.label} active={i === sample} onClick={() => setSample(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Jari-jari ujung"
          value={radius}
          min={0.02}
          max={0.5}
          step={0.02}
          onChange={setRadius}
          display={`${format(radius * NM_PER_UNIT)} nm`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Kekasaran sebenarnya" value={`${format(actual * NM_PER_UNIT, 1)} nm`} />
          <Stat label="Kekasaran terukur" value={`${format(recorded * NM_PER_UNIT, 1)} nm`} />
          <Stat
            label="Keadaan ujung"
            value={radius < 0.07 ? "Tajam" : radius < 0.2 ? "Agak tumpul" : "Tumpul"}
          />
        </dl>
        <p className="text-sm text-muted">
          Perbesar jari-jari ujung dan lihat gambar pindaiannya: celah menyempit, tonjolan
          melebar, dan lekukan yang lebih sempit daripada ujungnya tidak terjangkau.
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Ketinggian pada model 3D dilebih-lebihkan. Ujung dimodelkan sebagai
        lengkungan sederhana, dan kekasaran dihitung sebagai simpangan baku
        ketinggian.
      </figcaption>
    </figure>
  );
}
