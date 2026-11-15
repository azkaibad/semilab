"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { Scientific } from "@/lib/semiconductor";

/** Resistivity in Ω·cm. */
const FILMS = [
  { label: "Aluminium", resistivity: 2.8e-6 },
  { label: "ITO", resistivity: 2e-4 },
  { label: "Polisilikon terdoping", resistivity: 1e-3 },
  { label: "Silikon 10¹⁶ cm⁻³", resistivity: 0.5 },
];

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumSignificantDigits: 3, maximumFractionDigits: digits });

function formatVoltage(volts: number) {
  if (volts >= 1) return `${format(volts)} V`;
  if (volts >= 1e-3) return `${format(volts * 1e3)} mV`;
  return `${format(volts * 1e6)} µV`;
}

export function FourPointProbe() {
  const [film, setFilm] = useState(1);
  const [thicknessExponent, setThicknessExponent] = useState(2);
  const [current, setCurrent] = useState(1);

  const thickness = 10 ** thicknessExponent;
  const { resistivity } = FILMS[film];
  const sheet = resistivity / (thickness * 1e-7);
  const voltage = (sheet * current * 1e-3) / 4.532;
  const pins = [120, 160, 200, 240];

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 170"
        role="img"
        aria-label="Empat jarum sejajar menyentuh film. Arus mengalir lewat dua jarum luar, dan tegangan diukur di antara dua jarum dalam"
        className="w-full bg-bg"
      >
        <rect x="30" y="118" width="300" height="10" fill="var(--warm)" />
        <rect x="30" y="128" width="300" height="30" fill="#475569" />
        <path d="M120,118 C120,150 240,150 240,118" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
        {pins.map((x, i) => (
          <g key={x}>
            <path d={`M${x - 4},60 L${x + 4},60 L${x},118 Z`} fill="#e2e8f0" />
            <line x1={x} x2={x} y1="60" y2="38" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x={x} y="108" textAnchor="middle" fontSize="8" fill="#0f172a">
              {i + 1}
            </text>
          </g>
        ))}
        <path d="M120,38 V16 H240 V38" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <rect x="158" y="6" width="44" height="18" rx="4" fill="var(--bg)" stroke="var(--accent)" />
        <text x="180" y="19" textAnchor="middle" fontSize="9" fill="var(--accent)">
          arus I
        </text>
        <path d="M160,38 V30 H200 V38" fill="none" stroke="#34d399" strokeWidth="1.5" />
        <rect x="166" y="32" width="28" height="16" rx="4" fill="var(--bg)" stroke="#34d399" />
        <text x="180" y="44" textAnchor="middle" fontSize="9" fill="#34d399">
          V
        </text>
        <text x="36" y="114" fontSize="9" fontWeight="700" fill="var(--warm)">
          film
        </text>
        <text x="36" y="148" fontSize="9" fill="#cbd5e1">
          substrat isolator
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Film">
          {FILMS.map((item, i) => (
            <Chip key={item.label} active={i === film} onClick={() => setFilm(i)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        <Slider
          label="Tebal film"
          value={thicknessExponent}
          min={1}
          max={3.7}
          step={0.05}
          onChange={setThicknessExponent}
          display={thickness < 1000 ? `${format(thickness, 0)} nm` : `${format(thickness / 1000)} µm`}
        />
        <Slider
          label="Arus"
          value={current}
          min={0.1}
          max={10}
          step={0.1}
          onChange={setCurrent}
          display={`${format(current, 1)} mA`}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Tegangan terbaca" value={formatVoltage(voltage)} />
          <Stat
            label="Hambatan lembar"
            value={
              sheet >= 0.01 && sheet < 1e5 ? (
                `${format(sheet)} Ω/□`
              ) : (
                <>
                  <Scientific value={sheet} /> Ω/□
                </>
              )
            }
          />
          <Stat
            label="Resistivitas"
            value={
              <>
                <Scientific value={resistivity} /> Ω·cm
              </>
            }
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Berlaku untuk film yang jauh lebih tipis daripada jarak antarjarum dan
        jauh lebih lebar daripada susunan jarumnya. Resistivitas tiap bahan
        adalah nilai yang umum.
      </figcaption>
    </figure>
  );
}
