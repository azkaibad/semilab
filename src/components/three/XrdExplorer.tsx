"use client";

import { useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider, Stat } from "./controls";

/** Wavelength of copper K-alpha X-rays, in ångström. */
const WAVELENGTH = 1.5406;
const MIN = 20;
const MAX = 90;

/** Lattice constant in Å and the allowed reflections with rough relative intensities. */
const MATERIALS: { label: string; a: number; peaks: [string, number, number][] }[] = [
  { label: "Silikon", a: 5.431, peaks: [["111", 3, 100], ["220", 8, 55], ["311", 11, 30], ["400", 16, 6], ["331", 19, 11]] },
  { label: "Aluminium", a: 4.0495, peaks: [["111", 3, 100], ["200", 4, 47], ["220", 8, 22], ["311", 11, 24]] },
  { label: "Emas", a: 4.0782, peaks: [["111", 3, 100], ["200", 4, 52], ["220", 8, 32], ["311", 11, 36]] },
];

const radians = (degrees: number) => (degrees * Math.PI) / 180;

function peakList(material: number) {
  const { a, peaks } = MATERIALS[material];
  return peaks.map(([name, sum, intensity]) => {
    const spacing = a / Math.sqrt(sum);
    return { name, spacing, intensity, angle: (2 * Math.asin(WAVELENGTH / (2 * spacing)) * 180) / Math.PI };
  });
}

/** Diffracted intensity (0 to 100) at a detector angle, for crystallites of the given size in nm. */
function intensityAt(material: number, size: number, twoTheta: number) {
  return peakList(material).reduce((total, peak) => {
    // Scherrer broadening plus a small instrument width, in degrees.
    const width =
      ((0.9 * WAVELENGTH) / (size * 10 * Math.cos(radians(peak.angle / 2)))) * (180 / Math.PI) + 0.1;
    const sigma = width / 2.355;
    return total + peak.intensity * Math.exp(-((twoTheta - peak.angle) ** 2) / (2 * sigma * sigma));
  }, 0);
}

function Beam({ angle, side, y, strength }: { angle: number; side: 1 | -1; y: number; strength: number }) {
  const length = 3.4;
  return (
    <group position={[0, y, 0]} rotation={[0, 0, side * angle]}>
      <mesh position={[(side * length) / 2, 0, 0]}>
        <boxGeometry args={[length, 0.035, 0.035]} />
        <meshBasicMaterial color="#facc15" transparent opacity={strength} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Crystal({ theta, strength }: { theta: number; strength: number }) {
  const planes = [0, -0.55, -1.1, -1.65];
  return (
    <group position={[0, 0.2, 0]}>
      {planes.map((y) =>
        Array.from({ length: 9 }, (_, i) =>
          [-0.5, 0.5].map((z) => (
            <mesh key={`${y}-${i}-${z}`} position={[(i - 4) * 0.55, y, z]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial color="#8892b8" metalness={0.4} roughness={0.4} />
            </mesh>
          )),
        ),
      )}
      {planes.slice(0, 2).map((y) => (
        <group key={y}>
          <Beam angle={theta} side={-1} y={y} strength={1} />
          <Beam angle={theta} side={1} y={y} strength={0.12 + strength * 0.88} />
        </group>
      ))}
      <mesh position={[-3.3 * Math.cos(theta), 3.3 * Math.sin(theta) - 0.27, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#f5a524" />
      </mesh>
      <mesh position={[3.3 * Math.cos(theta), 3.3 * Math.sin(theta) - 0.27, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={strength * 1.5} />
      </mesh>
      <TextSprite text="sumber sinar-X" position={[-3.3 * Math.cos(theta), 3.3 * Math.sin(theta) + 0.25, 0]} height={0.24} color="#f5a524" />
      <TextSprite text="detektor" position={[3.3 * Math.cos(theta), 3.3 * Math.sin(theta) + 0.25, 0]} height={0.24} color="#34d399" />
      <TextSprite text="bidang atom" position={[0, -2.1, 0]} height={0.24} color="#aab4d4" />
    </group>
  );
}

function Pattern({ material, size, twoTheta }: { material: number; size: number; twoTheta: number }) {
  const x = (angle: number) => 40 + ((angle - MIN) / (MAX - MIN)) * 244;
  const y = (value: number) => 150 - (Math.min(value, 105) / 105) * 130;
  const path = Array.from({ length: 351 }, (_, i) => {
    const angle = MIN + (i / 350) * (MAX - MIN);
    return `${i === 0 ? "M" : "L"}${x(angle).toFixed(1)},${y(intensityAt(material, size, angle)).toFixed(1)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Pola difraksi ${MATERIALS[material].label}: intensitas terhadap sudut dua theta, dengan penanda di ${twoTheta.toFixed(1)} derajat`}
      className="h-full w-full"
    >
      <line x1="40" x2="284" y1="150" y2="150" stroke="var(--line)" />
      <line x1="40" x2="40" y1="16" y2="150" stroke="var(--line)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.8" />
      {peakList(material).map((peak) => (
        <text key={peak.name} x={x(peak.angle)} y={y(peak.intensity) - 5} textAnchor="middle" fontSize="8" fill="var(--muted)">
          ({peak.name})
        </text>
      ))}
      <line x1={x(twoTheta)} x2={x(twoTheta)} y1="16" y2="150" stroke="var(--warm)" strokeWidth="1.4" />
      {[20, 40, 60, 80].map((angle) => (
        <text key={angle} x={x(angle)} y="164" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {angle}°
        </text>
      ))}
      <text x="162" y="180" textAnchor="middle" fontSize="9" fill="var(--muted)">
        sudut detektor 2θ
      </text>
      <text x="44" y="12" fontSize="9" fill="var(--muted)">
        intensitas
      </text>
    </svg>
  );
}

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export default function XrdExplorer() {
  const [material, setMaterial] = useState(0);
  const [twoTheta, setTwoTheta] = useState(28.4);
  const [size, setSize] = useState(40);

  const peaks = peakList(material);
  const intensity = intensityAt(material, size, twoTheta);
  const nearest = peaks.reduce((best, peak) =>
    Math.abs(peak.angle - twoTheta) < Math.abs(best.angle - twoTheta) ? peak : best,
  );
  const onPeak = intensity > nearest.intensity * 0.5;
  // Plane spacing that would satisfy Bragg's law at the current angle.
  const probed = WAVELENGTH / (2 * Math.sin(radians(twoTheta / 2)));

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid sm:grid-cols-5">
        <div className="relative aspect-[4/3] bg-[#0b1020] sm:col-span-3">
          <SceneCanvas
            direction={[0.1, 0.15, 1]}
            distance={9.5}
            label={`Sinar-X dipantulkan bidang-bidang atom pada sudut theta ${format(twoTheta / 2, 1)} derajat. ${onPeak ? "Pantulan saling menguatkan" : "Pantulan saling meniadakan"}`}
          >
            <Crystal theta={radians(twoTheta / 2)} strength={Math.min(1, intensity / 100)} />
          </SceneCanvas>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
            Seret untuk memutar
          </p>
        </div>
        <div className="aspect-[4/3] bg-bg p-2 sm:col-span-2 sm:aspect-auto">
          <Pattern material={material} size={size} twoTheta={twoTheta} />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Bahan">
          {MATERIALS.map((item, i) => (
            <Chip
              key={item.label}
              active={i === material}
              onClick={() => {
                setMaterial(i);
                setTwoTheta(peakList(i)[0].angle);
              }}
            >
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Sudut 2θ"
          value={twoTheta}
          min={MIN}
          max={MAX}
          step={0.1}
          onChange={setTwoTheta}
          display={`${format(twoTheta, 1)}°`}
        />
        <ControlRow label="Lompat ke puncak">
          {peaks.map((peak) => (
            <Chip
              key={peak.name}
              active={Math.abs(peak.angle - twoTheta) < 0.06}
              onClick={() => setTwoTheta(peak.angle)}
            >
              ({peak.name})
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Ukuran kristalit"
          value={size}
          min={5}
          max={100}
          step={5}
          onChange={setSize}
          display={`${size} nm`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Keadaan" value={onPeak ? "Saling menguatkan" : "Saling meniadakan"} />
          <Stat label="Jarak bidang yang cocok" value={`${format(probed, 3)} Å`} />
          <Stat
            label={`Bidang (${nearest.name}) terdekat`}
            value={`${format(nearest.spacing, 3)} Å di ${format(nearest.angle, 1)}°`}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Sinar-X tembaga K-alfa, 1,5406 Å. Model 3D skematis: jarak bidangnya
        tetap dan tidak berskala. Tinggi puncak adalah nilai umum untuk serbuk,
        dan pada film tipis bisa sangat berbeda karena butirnya cenderung
        searah.
      </figcaption>
    </figure>
  );
}
