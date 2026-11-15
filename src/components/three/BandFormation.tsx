"use client";

import { useState } from "react";
import type { Vec3 } from "@/lib/lattice";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, Slider } from "./controls";

const COUNTS = [1, 2, 4, 8, 27];
const NEAR = 1.2;
const FAR = 3.6;

/** Atom positions for a line, square, cube, or 3×3×3 block with the given spacing. */
function layout(count: number, spacing: number): Vec3[] {
  const size = count === 27 ? 3 : count === 1 ? 1 : 2;
  const dims: Vec3 =
    count === 1 ? [1, 1, 1] : count === 2 ? [2, 1, 1] : count === 4 ? [2, 2, 1] : [size, size, size];
  const points: Vec3[] = [];
  for (let i = 0; i < dims[0]; i++)
    for (let j = 0; j < dims[1]; j++)
      for (let k = 0; k < dims[2]; k++)
        points.push([
          (i - (dims[0] - 1) / 2) * spacing,
          (j - (dims[1] - 1) / 2) * spacing,
          (k - (dims[2] - 1) / 2) * spacing,
        ]);
  return points;
}

/**
 * Energy levels of a chain of N identical atoms (tight-binding model):
 * E_k = E0 − 2t·cos(kπ / (N + 1)). The coupling t grows as atoms get closer.
 */
function levels(center: number, coupling: number, count: number) {
  return Array.from(
    { length: count },
    (_, k) => center - 2 * coupling * Math.cos(((k + 1) * Math.PI) / (count + 1)),
  );
}

function EnergyDiagram({ count, spacing }: { count: number; spacing: number }) {
  const closeness = Math.exp(-(spacing - NEAR) / 0.6);
  const lower = levels(-1, 0.28 * closeness, count);
  const upper = levels(1, 0.48 * closeness, count);
  const y = (energy: number) => 110 - energy * 44;
  const isBand = count >= 8 && closeness > 0.25;
  const gapTop = y(Math.min(...upper));
  const gapBottom = y(Math.max(...lower));

  return (
    <svg
      viewBox="0 0 300 220"
      role="img"
      aria-label={`Diagram energi: ${count} tingkat di kelompok atas dan ${count} tingkat di kelompok bawah`}
      className="h-full w-full"
    >
      <line x1="34" x2="34" y1="14" y2="206" stroke="var(--line)" />
      <text x="20" y="110" fontSize="10" fill="var(--muted)" textAnchor="middle" transform="rotate(-90 20 110)">
        Energi
      </text>
      {upper.map((energy, i) => (
        <line key={`u${i}`} x1="52" x2="190" y1={y(energy)} y2={y(energy)} stroke="var(--muted)" strokeWidth="1.4" />
      ))}
      {lower.map((energy, i) => (
        <line key={`l${i}`} x1="52" x2="190" y1={y(energy)} y2={y(energy)} stroke="var(--accent)" strokeWidth="1.8" />
      ))}
      <text x="198" y={y(1) + 3} fontSize="10" fill="var(--muted)">
        {isBand ? "Pita konduksi" : "Tingkat atas"}
      </text>
      <text x="198" y={y(1) + 15} fontSize="9" fill="var(--muted)">
        (kosong)
      </text>
      <text x="198" y={y(-1) + 3} fontSize="10" fill="var(--accent)">
        {isBand ? "Pita valensi" : "Tingkat bawah"}
      </text>
      <text x="198" y={y(-1) + 15} fontSize="9" fill="var(--accent)">
        (terisi elektron)
      </text>
      {isBand && (
        <>
          <line x1="121" x2="121" y1={gapTop + 3} y2={gapBottom - 3} stroke="var(--warm)" strokeWidth="1.5" />
          <text x="127" y={(gapTop + gapBottom) / 2 + 3} fontSize="10" fontWeight="700" fill="var(--warm)">
            celah pita
          </text>
        </>
      )}
    </svg>
  );
}

export default function BandFormation() {
  const [count, setCount] = useState(2);
  const [spacing, setSpacing] = useState(FAR);
  const [rotate, setRotate] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  const atoms = layout(count, spacing);
  const perSide = count === 27 ? 3 : count === 1 ? 1 : 2;
  const extent = (perSide - 1) * spacing + 2;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-2">
        <div className="relative aspect-square bg-[#0b1020]">
          <SceneCanvas
            distance={extent * 1.9 + 3}
            autoRotate={rotate && !reducedMotion}
            label={`${count} atom dengan jarak antaratom ${spacing.toFixed(1)}`}
          >
            {atoms.map((position, i) => (
              <group key={i} position={position}>
                <mesh>
                  <sphereGeometry args={[0.2, 24, 24]} />
                  <meshStandardMaterial color="#e2536b" roughness={0.4} />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.95, 32, 32]} />
                  <meshBasicMaterial color="#8296ff" transparent opacity={0.16} depthWrite={false} />
                </mesh>
              </group>
            ))}
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:aspect-auto">
          <EnergyDiagram count={count} spacing={spacing} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Jumlah atom">
          {COUNTS.map((value) => (
            <Chip key={value} active={value === count} onClick={() => setCount(value)}>
              {value}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Jarak antaratom"
          value={spacing}
          min={NEAR}
          max={FAR}
          step={0.05}
          onChange={setSpacing}
          display={spacing > 3 ? "Jauh" : spacing > 2 ? "Sedang" : "Dekat"}
        />
        {!reducedMotion && (
          <ControlRow label="Tampilan">
            <Chip active={rotate} onClick={() => setRotate((v) => !v)}>
              Putar otomatis
            </Chip>
          </ControlRow>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Kiri: inti atom (merah) dan awan elektron terluarnya (biru). Kanan:
        tingkat energi yang tersedia. Geser jarak ke “Dekat” sampai awan
        elektron saling tumpang-tindih dan perhatikan tingkat energinya
        memecah.
      </figcaption>
    </figure>
  );
}
