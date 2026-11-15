"use client";

import { useState } from "react";
import { formatCurrent, junction, V_T } from "@/lib/junction";
import { usePrefersReducedMotion } from "@/lib/progress";
import { Scientific } from "@/lib/semiconductor";
import { JunctionScene } from "./JunctionScene";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const DOPINGS = [1e15, 1e16, 1e17];
const V_MIN = -2;
const V_MAX = 0.75;
const PX_PER_EV = 28;
const GAP = 1.12;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

function BandDiagram({ doping, bias }: { doping: number; bias: number }) {
  const { builtIn, width } = junction(doping, bias);
  const step = builtIn - bias;
  const half = Math.min(90, 7 + width * 30);
  const conductionN = 120;
  // 0 on the p side, 1 on the n side, smooth across the depletion region.
  const blend = (x: number) => {
    const t = Math.min(1, Math.max(0, (x - (150 - half)) / (2 * half)));
    return t * t * (3 - 2 * t);
  };
  const band = (offset: number) =>
    Array.from({ length: 131 }, (_, i) => {
      const x = 20 + i * 2;
      const y = conductionN - step * PX_PER_EV * (1 - blend(x)) + offset;
      return `${i === 0 ? "M" : "L"}${x},${y.toFixed(1)}`;
    }).join(" ");

  const fermiN = conductionN + 0.2 * PX_PER_EV;
  const fermiP = fermiN + bias * PX_PER_EV;

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Diagram pita sambungan p-n dengan penghalang ${format(step)} elektronvolt`}
      className="w-full"
    >
      <rect x={150 - half} y="8" width={half * 2} height="184" fill="var(--warm)" opacity="0.08" />
      <path d={band(0)} fill="none" stroke="var(--muted)" strokeWidth="2.2" />
      <path d={band(GAP * PX_PER_EV)} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
      <line x1="20" x2={150 - half} y1={fermiP} y2={fermiP} stroke="var(--warm)" strokeDasharray="5 4" strokeWidth="1.5" />
      <line x1={150 + half} x2="280" y1={fermiN} y2={fermiN} stroke="var(--warm)" strokeDasharray="5 4" strokeWidth="1.5" />
      <text x="24" y="190" fontSize="10" fill="var(--muted)">
        sisi p
      </text>
      <text x="276" y="190" textAnchor="end" fontSize="10" fill="var(--muted)">
        sisi n
      </text>
      <text x="276" y={conductionN - 6} textAnchor="end" fontSize="9" fill="var(--muted)">
        pita konduksi
      </text>
      <text x="276" y={conductionN + GAP * PX_PER_EV + 12} textAnchor="end" fontSize="9" fill="var(--accent)">
        pita valensi
      </text>
      <text x="150" y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--warm)">
        penghalang {format(step)} eV
      </text>
    </svg>
  );
}

function CurrentCurve({ doping, bias }: { doping: number; bias: number }) {
  const x = (v: number) => 30 + ((v - V_MIN) / (V_MAX - V_MIN)) * 250;
  const y = (amps: number) => 160 - Math.min(0.11, amps) * 1300;
  const path = Array.from({ length: 221 }, (_, i) => {
    const v = V_MIN + (i / 220) * (V_MAX - V_MIN);
    return `${i === 0 ? "M" : "L"}${x(v).toFixed(1)},${y(junction(doping, v).current).toFixed(1)}`;
  }).join(" ");
  const now = junction(doping, bias).current;

  return (
    <svg
      viewBox="0 0 300 200"
      role="img"
      aria-label={`Kurva arus terhadap tegangan dioda. Pada ${format(bias)} volt arusnya ${formatCurrent(now)}`}
      className="w-full"
    >
      <line x1="30" x2="280" y1="160" y2="160" stroke="var(--line)" />
      <line x1={x(0)} x2={x(0)} y1="14" y2="184" stroke="var(--line)" />
      <path d={path} fill="none" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx={x(bias)} cy={y(now)} r="5" fill="var(--warm)" />
      <text x="280" y="190" textAnchor="end" fontSize="9" fill="var(--muted)">
        tegangan (V)
      </text>
      <text x={x(0) + 5} y="20" fontSize="9" fill="var(--muted)">
        arus
      </text>
      {[-2, -1, 0.5].map((v) => (
        <text key={v} x={x(v)} y="174" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {format(v)}
        </text>
      ))}
      <text x={x(0) - 5} y={y(0.1) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
        100 mA
      </text>
      <text x="36" y="150" fontSize="9" fill="var(--muted)">
        bias mundur
      </text>
      <text x={x(0) + 8} y="150" fontSize="9" fill="var(--muted)">
        bias maju
      </text>
    </svg>
  );
}

export default function JunctionExplorer() {
  const [bias, setBias] = useState(0);
  const [doping, setDoping] = useState(1e16);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const state = junction(doping, bias);
  const equilibrium = junction(doping, 0);
  const halfWidth = Math.min(3.4, Math.max(0.12, 0.8 * (state.width / equilibrium.width))) ;
  const crossing = Math.min(1, Math.exp((bias - state.builtIn) / 0.06)) * 0.5;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/8]">
        <SceneCanvas
          direction={[0.25, 0.35, 1]}
          distance={9.5}
          label={`Sambungan p-n pada tegangan ${format(bias)} volt dengan lebar deplesi ${format(state.width, 3)} mikrometer`}
        >
          <JunctionScene
            halfWidth={halfWidth}
            crossing={crossing}
            fieldStrength={Math.min(1, state.barrier / 2.5)}
            moving={!paused && !reducedMotion}
          />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>

      <div className="grid gap-2 bg-bg p-2 sm:grid-cols-2">
        <BandDiagram doping={doping} bias={bias} />
        <CurrentCurve doping={doping} bias={bias} />
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Tegangan"
          value={bias}
          min={V_MIN}
          max={V_MAX}
          step={0.05}
          onChange={setBias}
          display={`${format(bias)} V · ${
            bias > 0 ? "bias maju" : bias < 0 ? "bias mundur" : "setimbang"
          }`}
        />
        <ControlRow label="Doping tiap sisi">
          {DOPINGS.map((value) => (
            <Chip key={value} active={value === doping} onClick={() => setDoping(value)}>
              <Scientific value={value} /> cm⁻³
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Potensial bawaan" value={`${format(state.builtIn)} V`} />
          <Stat label="Lebar deplesi" value={`${format(state.width, 3)} µm`} />
          <Stat
            label="Medan puncak"
            value={
              <>
                <Scientific value={state.peakField} /> V/cm
              </>
            }
          />
          <Stat label="Arus" value={formatCurrent(state.current)} />
        </dl>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Bola biru: elektron</span>
          <span>Cincin jingga: hole</span>
          <span>Kubus merah muda: ion akseptor (−)</span>
          <span>Kubus hijau: ion donor (+)</span>
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
        Sambungan silikon simetris pada 300 K. Lebar daerah deplesi pada model
        3D digambar relatif terhadap keadaan setimbang, dan tegangan termalnya{" "}
        {format(V_T * 1000, 1)} mV.
      </figcaption>
    </figure>
  );
}
