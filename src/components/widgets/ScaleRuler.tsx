"use client";

import { useState } from "react";
import { Slider, Stat } from "@/components/three/controls";

/** Sizes in nanometres. `row` places the label above (negative) or below the axis. */
const OBJECTS = [
  { name: "atom silikon", size: 0.235, row: -1 },
  { name: "oksida gate", size: 2, row: 1 },
  { name: "virus", size: 100, row: -1 },
  { name: "cahaya tampak", size: 550, row: 1 },
  { name: "bakteri", size: 2000, row: -2 },
  { name: "sel darah merah", size: 7000, row: 2 },
  { name: "rambut", size: 70000, row: -1 },
  { name: "tebal wafer", size: 725000, row: 1 },
];
const ROW_Y: Record<number, number> = { [-2]: 40, [-1]: 58, 1: 102, 2: 120 };
const DECADES = ["0,1 nm", "1 nm", "10 nm", "100 nm", "1 µm", "10 µm", "100 µm", "1 mm"];
const AXIS_Y = 80;

const x = (nm: number) => 30 + ((Math.log10(nm) + 1) / 7) * 300;

const format = (value: number, digits = 1) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function formatLength(nm: number) {
  if (nm < 1000) return `${format(nm, nm < 10 ? 1 : 0)} nm`;
  if (nm < 1e6) return `${format(nm / 1000, nm < 1e4 ? 1 : 0)} µm`;
  if (nm < 1e7) return `${format(nm / 1e6, 1)} mm`;
  if (nm < 1e9) return `${format(nm / 1e7, 1)} cm`;
  return `${format(nm / 1e9, 1)} m`;
}

export function ScaleRuler() {
  const [exponent, setExponent] = useState(2);
  const thickness = 10 ** exponent;
  // A wafer scaled up to a 100-storey building, about 350 m tall.
  const scaled = (thickness / 725000) * 350e9;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 152"
        role="img"
        aria-label={`Penggaris skala logaritmik dari 0,1 nanometer sampai 1 milimeter. Film setebal ${formatLength(thickness)}`}
        className="w-full bg-bg"
      >
        <line x1="30" x2="330" y1={AXIS_Y} y2={AXIS_Y} stroke="var(--line)" strokeWidth="1.5" />
        {DECADES.map((label, i) => (
          <g key={label}>
            <line x1={30 + (i / 7) * 300} x2={30 + (i / 7) * 300} y1={AXIS_Y - 3} y2={AXIS_Y + 3} stroke="var(--muted)" />
            <text x={30 + (i / 7) * 300} y="146" textAnchor="middle" fontSize="7.5" fill="var(--muted)">
              {label}
            </text>
          </g>
        ))}
        {OBJECTS.map((object) => (
          <g key={object.name}>
            <line
              x1={x(object.size)}
              x2={x(object.size)}
              y1={AXIS_Y}
              y2={ROW_Y[object.row] + (object.row < 0 ? 3 : -8)}
              stroke="var(--muted)"
              strokeWidth="0.8"
            />
            <circle cx={x(object.size)} cy={AXIS_Y} r="2.5" fill="var(--muted)" />
            <text x={x(object.size)} y={ROW_Y[object.row]} textAnchor="middle" fontSize="8" fill="var(--ink)">
              {object.name}
            </text>
          </g>
        ))}
        <line x1={x(thickness)} x2={x(thickness)} y1="22" y2="134" stroke="var(--warm)" strokeWidth="2" />
        <text
          x={x(thickness)}
          y="16"
          textAnchor={exponent > 3 ? "end" : exponent < 1 ? "start" : "middle"}
          fontSize="9"
          fontWeight="700"
          fill="var(--warm)"
        >
          film {formatLength(thickness)}
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Tebal film"
          value={exponent}
          min={0}
          max={4}
          step={0.1}
          onChange={setExponent}
          display={formatLength(thickness)}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Kira-kira setara" value={`${format(thickness / 0.25, 0)} lapis atom`} />
          <Stat label="Rambut lebih tebal" value={`${format(70000 / thickness, 0)} kali`} />
          <Stat label="Wafer lebih tebal" value={`${format(725000 / thickness, 0)} kali`} />
          <Stat label="Kalau wafer setinggi gedung 100 lantai" value={`film = ${formatLength(scaled)}`} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Sumbunya logaritmik: setiap garis berarti sepuluh kali lebih besar.
        Garis jingga adalah tebal film yang Anda pilih.
      </figcaption>
    </figure>
  );
}
