"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { Scientific } from "@/lib/semiconductor";

const Q = 1.602e-19;
/** Sample thickness, m. */
const THICKNESS = 500e-6;

const format = (value: number) =>
  value.toLocaleString("id-ID", { maximumSignificantDigits: 3 });

export function HallEffect() {
  const [holes, setHoles] = useState(false);
  const [exponent, setExponent] = useState(15);
  const [field, setField] = useState(0.5);
  const [current, setCurrent] = useState(1);

  const density = 10 ** exponent;
  const magnitude = (current * 1e-3 * field) / (Q * density * 1e6 * THICKNESS);
  const voltage = holes ? magnitude : -magnitude;
  const millivolts = voltage * 1000;
  // Both carrier types are pushed to the same edge; only their charge differs.
  const sign = holes ? "+" : "−";
  const carrier = holes ? "var(--warm)" : "#5ad1ff";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 180"
        role="img"
        aria-label={`Efek Hall pada sampel tipe-${holes ? "p" : "n"}: pembawa muatan terdorong ke tepi atas, dan tegangan Hall bernilai ${holes ? "positif" : "negatif"}`}
        className="w-full bg-bg"
      >
        <rect x="70" y="56" width="220" height="80" rx="4" fill="#475569" />
        <text x="180" y="150" textAnchor="middle" fontSize="9" fill="var(--muted)">
          arus I →
        </text>
        <line x1="30" x2="70" y1="96" y2="96" stroke="var(--accent)" strokeWidth="2" />
        <line x1="290" x2="330" y1="96" y2="96" stroke="var(--accent)" strokeWidth="2" />
        {[100, 150, 200, 250].map((x) => (
          <g key={x}>
            <circle cx={x} cy="110" r="7" fill="none" stroke="#c084fc" strokeWidth="1.4" />
            <path d={`M${x - 4},106 L${x + 4},114 M${x + 4},106 L${x - 4},114`} stroke="#c084fc" strokeWidth="1.4" />
          </g>
        ))}
        <text x="180" y="170" textAnchor="middle" fontSize="9" fill="#c084fc">
          medan magnet B masuk ke layar
        </text>
        {[95, 130, 165, 200, 235, 270].map((x) => (
          <g key={x}>
            <circle cx={x} cy="66" r="6" fill={carrier} opacity={Math.min(1, 0.35 + field)} />
            <text x={x} y="69.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">
              {sign}
            </text>
          </g>
        ))}
        <path d="M276,56 V40 H316 V150 H276 V136" fill="none" stroke="#34d399" strokeWidth="1.4" />
        <rect x="296" y="72" width="40" height="20" rx="4" fill="var(--bg)" stroke="#34d399" />
        <text x="316" y="86" textAnchor="middle" fontSize="9" fill="#34d399">
          V Hall
        </text>
        <text x="76" y="50" fontSize="9" fill={carrier}>
          {holes ? "hole" : "elektron"} menumpuk di tepi ini
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Sampel">
          <Chip active={!holes} onClick={() => setHoles(false)}>
            Tipe-n
          </Chip>
          <Chip active={holes} onClick={() => setHoles(true)}>
            Tipe-p
          </Chip>
        </ControlRow>
        <Slider
          label="Konsentrasi pembawa"
          value={exponent}
          min={14}
          max={19}
          step={0.25}
          onChange={setExponent}
          display={
            <>
              <Scientific value={density} /> cm⁻³
            </>
          }
        />
        <Slider
          label="Medan magnet"
          value={field}
          min={0}
          max={1}
          step={0.05}
          onChange={setField}
          display={`${format(field)} T`}
        />
        <Slider
          label="Arus"
          value={current}
          min={0.1}
          max={10}
          step={0.1}
          onChange={setCurrent}
          display={`${format(current)} mA`}
        />
        <dl className="grid grid-cols-2 gap-2">
          <Stat
            label="Tegangan Hall"
            value={
              Math.abs(millivolts) >= 0.1
                ? `${format(millivolts)} mV`
                : `${format(millivolts * 1000)} µV`
            }
          />
          <Stat
            label="Arti tandanya"
            value={field === 0 ? "—" : holes ? "Positif: pembawanya hole" : "Negatif: pembawanya elektron"}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Sampel setebal 500 µm. Elektron dan hole terdorong ke tepi yang sama,
        karena arah gerak dan muatannya sama-sama berlawanan. Tepi itu menjadi
        negatif pada tipe-n dan positif pada tipe-p.
      </figcaption>
    </figure>
  );
}
