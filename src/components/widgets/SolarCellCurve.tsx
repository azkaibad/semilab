"use client";

import { useState } from "react";
import { Slider, Stat } from "@/components/three/controls";
import { V_T } from "@/lib/junction";

/** Photocurrent density at full sun, mA/cm². */
const J_LIGHT = 40;
/** Dark saturation current density, mA/cm². */
const J_DARK = 1e-9;
/** Power of full sunlight, mW/cm². */
const SUN_POWER = 100;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function SolarCellCurve() {
  const [sun, setSun] = useState(1);

  const light = J_LIGHT * sun;
  const currentAt = (v: number) => light - J_DARK * (Math.exp(v / V_T) - 1);
  const openCircuit = V_T * Math.log(light / J_DARK + 1);

  let bestV = 0;
  let bestPower = 0;
  for (let i = 0; i <= 700; i++) {
    const v = i / 1000;
    const power = v * currentAt(v);
    if (power > bestPower) {
      bestPower = power;
      bestV = v;
    }
  }
  const bestJ = currentAt(bestV);
  const fillFactor = bestPower / (openCircuit * light);
  const efficiency = bestPower / (SUN_POWER * sun);

  const x = (v: number) => 40 + (v / 0.7) * 280;
  const y = (j: number) => 176 - (j / 50) * 158;
  const path = Array.from({ length: 141 }, (_, i) => {
    const v = (i / 140) * 0.7;
    const j = Math.max(0, currentAt(v));
    return `${i === 0 ? "M" : "L"}${x(v).toFixed(1)},${y(j).toFixed(1)}`;
  }).join(" ");

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 210"
        role="img"
        aria-label={`Kurva arus terhadap tegangan sel surya. Daya maksimum ${format(bestPower, 1)} miliwatt per sentimeter persegi`}
        className="w-full bg-bg"
      >
        <line x1="40" x2="324" y1="176" y2="176" stroke="var(--line)" />
        <line x1="40" x2="40" y1="14" y2="176" stroke="var(--line)" />
        <rect
          x={x(0)}
          y={y(bestJ)}
          width={x(bestV) - x(0)}
          height={y(0) - y(bestJ)}
          fill="var(--warm)"
          opacity="0.18"
        />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.4" />
        <circle cx={x(bestV)} cy={y(bestJ)} r="5" fill="var(--warm)" />
        <text x={x(bestV) - 8} y={y(bestJ) - 8} textAnchor="end" fontSize="9" fontWeight="700" fill="var(--warm)">
          titik daya maksimum
        </text>
        {[0, 0.2, 0.4, 0.6].map((v) => (
          <text key={v} x={x(v)} y="190" textAnchor="middle" fontSize="9" fill="var(--muted)">
            {format(v, 1)}
          </text>
        ))}
        {[10, 20, 30, 40, 50].map((j) => (
          <text key={j} x="34" y={y(j) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
            {j}
          </text>
        ))}
        <text x="182" y="205" textAnchor="middle" fontSize="9" fill="var(--muted)">
          tegangan (V)
        </text>
        <text x="44" y="12" fontSize="9" fill="var(--muted)">
          arus (mA/cm²)
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Intensitas cahaya"
          value={sun}
          min={0.1}
          max={1.2}
          step={0.05}
          onChange={setSun}
          display={`${format(sun * 100, 0)}% matahari penuh`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Stat label="Arus hubung singkat" value={`${format(light, 1)} mA/cm²`} />
          <Stat label="Tegangan rangkaian terbuka" value={`${format(openCircuit, 3)} V`} />
          <Stat label="Daya maksimum" value={`${format(bestPower, 1)} mW/cm²`} />
          <Stat label="Faktor isi" value={format(fillFactor)} />
          <Stat label="Efisiensi" value={`${format(efficiency * 100, 1)}%`} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Sel surya silikon ideal. Luas kotak jingga adalah daya yang dihasilkan
        pada titik kerja terbaik. Sel sungguhan punya rugi-rugi tambahan dari
        hambatan dan pantulan.
      </figcaption>
    </figure>
  );
}
