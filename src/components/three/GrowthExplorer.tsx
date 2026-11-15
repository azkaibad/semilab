"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const N = 18;
const SPACING = 0.3;
const TARGET_LAYERS = 5;
const MAX_ATOMS = N * N * TARGET_LAYERS;
const ATOMS_PER_SECOND = 150;
/** Thickness of the wetting layer in Stranski-Krastanov growth. */
const WETTING = 2;
const LATERAL_BOND = 0.8;
const LAYER_COLORS = ["#8296ff", "#5ad1ff", "#34d399", "#f5a524", "#f472b6", "#f8fafc"];

type Mode = "fm" | "vw" | "sk";

const MODES: { id: Mode; label: string; text: string }[] = [
  {
    id: "fm",
    label: "Lapis demi lapis",
    text: "Frank–van der Merwe. Atom film lebih suka menempel ke substrat daripada ke sesamanya, sehingga satu lapisan penuh dulu sebelum lapisan berikutnya mulai.",
  },
  {
    id: "vw",
    label: "Pulau",
    text: "Volmer–Weber. Atom film lebih suka menempel ke sesamanya daripada ke substrat, sehingga membentuk gundukan tiga dimensi dan substrat lama terbuka.",
  },
  {
    id: "sk",
    label: "Lapisan lalu pulau",
    text: "Stranski–Krastanov. Satu atau dua lapisan pertama menutupi substrat dengan rata, lalu regangan yang menumpuk membuat pertumbuhan berikutnya berbentuk pulau.",
  },
];

/** Bond strength between an arriving atom and whatever it lands on. */
function verticalBond(mode: Mode, height: number) {
  if (mode === "fm") return height === 0 ? 3 : 2;
  if (mode === "vw") return height === 0 ? 0.2 : 2;
  if (height < WETTING) return 3;
  return height === WETTING ? 0.2 : 2;
}

const wrap = (value: number) => (value + N) % N;
const STEPS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function binding(heights: Uint8Array, mode: Mode, x: number, y: number) {
  const height = heights[x * N + y];
  let neighbours = 0;
  for (const [dx, dy] of STEPS) {
    if (heights[wrap(x + dx) * N + wrap(y + dy)] > height) neighbours++;
  }
  return verticalBond(mode, height) + neighbours * LATERAL_BOND;
}

/** Drops one atom, lets it hop across the surface, then fixes it in place. */
function deposit(heights: Uint8Array, mode: Mode, temperature: number) {
  let x = Math.floor(Math.random() * N);
  let y = Math.floor(Math.random() * N);
  const hops = Math.round(temperature * temperature * 120);
  const thermal = 0.12 + temperature * 0.2;
  for (let hop = 0; hop < hops; hop++) {
    const [dx, dy] = STEPS[Math.floor(Math.random() * 4)];
    const nx = wrap(x + dx);
    const ny = wrap(y + dy);
    // An atom can only climb a low step; island-forming films climb more readily.
    if (heights[nx * N + ny] - heights[x * N + y] > (mode === "fm" ? 1 : 2)) continue;
    const gain = binding(heights, mode, nx, ny) - binding(heights, mode, x, y);
    if (gain >= 0 || Math.random() < Math.exp(gain / thermal)) {
      x = nx;
      y = ny;
    }
  }
  heights[x * N + y]++;
}

type Stats = { layers: number; roughness: number; covered: number };

function Film({
  mode,
  temperature,
  run,
  moving,
  instant,
  onStats,
}: {
  mode: Mode;
  temperature: number;
  run: number;
  moving: boolean;
  /** Grow the whole film at once, for people who prefer no animation. */
  instant: boolean;
  onStats: (stats: Stats) => void;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const sim = useRef<{
    run: number;
    mode: Mode;
    heights: Uint8Array;
    atoms: number;
    budget: number;
    clock: number;
  } | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => LAYER_COLORS.map((color) => new THREE.Color(color)), []);

  useFrame((_, rawDelta) => {
    let state = sim.current;
    let changed = false;
    if (!state || state.run !== run || state.mode !== mode) {
      state = { run, mode, heights: new Uint8Array(N * N), atoms: 0, budget: 0, clock: 1 };
      sim.current = state;
      changed = true;
    }

    const delta = moving ? Math.min(rawDelta, 0.2) : 0;
    state.budget += instant ? MAX_ATOMS : delta * ATOMS_PER_SECOND;
    while (state.budget >= 1 && state.atoms < MAX_ATOMS) {
      deposit(state.heights, mode, temperature);
      state.atoms++;
      state.budget--;
      changed = true;
    }
    if (state.atoms >= MAX_ATOMS) state.budget = 0;

    const instances = mesh.current;
    if (changed && instances) {
      let index = 0;
      const offset = ((N - 1) * SPACING) / 2;
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          for (let z = 0; z < state.heights[x * N + y] && index < MAX_ATOMS; z++) {
            dummy.position.set(x * SPACING - offset, z * SPACING * 0.82 + 0.14, y * SPACING - offset);
            dummy.updateMatrix();
            instances.setMatrixAt(index, dummy.matrix);
            instances.setColorAt(index, colors[Math.min(z, colors.length - 1)]);
            index++;
          }
        }
      }
      instances.count = index;
      instances.instanceMatrix.needsUpdate = true;
      if (instances.instanceColor) instances.instanceColor.needsUpdate = true;
    }

    state.clock += rawDelta;
    if (state.clock > 0.3) {
      state.clock = 0;
      const mean = state.atoms / (N * N);
      let squares = 0;
      let covered = 0;
      for (const height of state.heights) {
        squares += (height - mean) ** 2;
        if (height > 0) covered++;
      }
      onStats({
        layers: Math.round(mean * 10) / 10,
        roughness: Math.round(Math.sqrt(squares / (N * N)) * 100) / 100,
        covered: Math.round((covered / (N * N)) * 100),
      });
    }
  });

  return (
    <group position={[0, -0.7, 0]}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[N * SPACING + 0.3, 0.4, N * SPACING + 0.3]} />
        <meshStandardMaterial color="#3b425e" roughness={0.7} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, MAX_ATOMS]} count={0} frustumCulled={false}>
        <sphereGeometry args={[0.17, 14, 14]} />
        <meshStandardMaterial roughness={0.45} />
      </instancedMesh>
    </group>
  );
}

const format = (value: number, digits = 1) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export default function GrowthExplorer() {
  const [mode, setMode] = useState<Mode>("fm");
  const [temperature, setTemperature] = useState(0.7);
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stats, setStats] = useState<Stats>({ layers: 0, roughness: 0, covered: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const current = MODES.find((item) => item.id === mode) ?? MODES[0];

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.7, 0.75, 1]}
          distance={9.5}
          label={`Pertumbuhan film mode ${current.label}: ${format(stats.layers)} lapis, ${stats.covered} persen substrat tertutup`}
        >
          <Film
            mode={mode}
            temperature={temperature}
            run={run}
            moving={!paused}
            instant={reducedMotion}
            onStats={setStats}
          />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Mode">
          {MODES.map((item) => (
            <Chip key={item.id} active={item.id === mode} onClick={() => setMode(item.id)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Suhu substrat"
          value={temperature}
          min={0}
          max={1}
          step={0.05}
          onChange={setTemperature}
          display={temperature < 0.3 ? "Rendah" : temperature < 0.65 ? "Sedang" : "Tinggi"}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Tebal rata-rata" value={`${format(stats.layers)} lapis`} />
          <Stat label="Substrat tertutup" value={`${stats.covered}%`} />
          <Stat label="Kekasaran" value={`${format(stats.roughness, 2)} lapis`} />
        </dl>
        <p className="text-sm text-muted">{current.text}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
          >
            Tumbuhkan ulang
          </button>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
            >
              {paused ? "Lanjutkan" : "Jeda"}
            </button>
          )}
        </div>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Setiap bola adalah satu atom film, dan warnanya menunjukkan lapisan ke
        berapa. Atom mendarat di tempat acak, lalu melompat di permukaan
        sebelum menetap. Makin tinggi suhu substrat, makin banyak lompatannya.
        Model ini disederhanakan: atom tersusun dalam kolom dan tidak pernah
        lepas kembali.
      </figcaption>
    </figure>
  );
}
