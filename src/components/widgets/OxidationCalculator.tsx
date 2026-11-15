"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { K_B } from "@/lib/semiconductor";

/**
 * Deal-Grove model for (100) silicon: x² + A·x = B·t.
 * Returns the oxide thickness in µm after `hours` at `celsius`.
 */
function oxide(wet: boolean, celsius: number, hours: number) {
  const kT = K_B * (celsius + 273.15);
  const parabolic = wet ? 386 * Math.exp(-0.78 / kT) : 772 * Math.exp(-1.23 / kT);
  const linear =
    (wet ? 9.7e7 * Math.exp(-2.05 / kT) : 3.71e6 * Math.exp(-2.0 / kT)) / 1.68;
  const a = parabolic / linear;
  return {
    thickness: (a / 2) * (Math.sqrt(1 + (4 * parabolic * hours) / (a * a)) - 1),
    crossover: a / 2,
  };
}

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

const formatTime = (minutes: number) =>
  minutes < 60 ? `${format(minutes)} menit` : `${format(minutes / 60, 1)} jam`;

export function OxidationCalculator() {
  const [wet, setWet] = useState(false);
  const [celsius, setCelsius] = useState(1000);
  const [exponent, setExponent] = useState(1.78);
  const minutes = 10 ** exponent;

  const { thickness, crossover } = oxide(wet, celsius, minutes / 60);
  const nm = thickness * 1000;
  // Drawn thickness, on a square-root scale so thin oxides stay visible.
  const drawn = Math.min(70, Math.sqrt(nm) * 2.4);
  const surface = 96;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 170"
        role="img"
        aria-label={`Penampang wafer dengan oksida setebal ${format(nm)} nanometer. Sekitar 46 persen tebalnya berada di bawah permukaan silikon semula`}
        className="w-full bg-bg"
      >
        <rect x="30" y={surface + drawn * 0.46} width="300" height={160 - surface - drawn * 0.46} fill="#475569" />
        <rect x="30" y={surface - drawn * 0.54} width="300" height={drawn} fill="#7dd3fc" opacity="0.85" />
        <line x1="20" x2="340" y1={surface} y2={surface} stroke="var(--warm)" strokeDasharray="5 4" strokeWidth="1.2" />
        <text x="336" y={surface - 4} textAnchor="end" fontSize="8.5" fill="var(--warm)">
          permukaan silikon semula
        </text>
        <text x="40" y={surface - drawn * 0.54 - 6} fontSize="9" fontWeight="700" fill="#7dd3fc">
          SiO₂ {format(nm)} nm
        </text>
        <text x="40" y="154" fontSize="9" fill="#cbd5e1">
          silikon
        </text>
        <text x="180" y="18" textAnchor="middle" fontSize="9" fill="var(--muted)">
          {wet ? "uap air (H₂O) ↓" : "oksigen (O₂) ↓"}
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Jenis">
          <Chip active={!wet} onClick={() => setWet(false)}>
            Kering (O₂)
          </Chip>
          <Chip active={wet} onClick={() => setWet(true)}>
            Basah (H₂O)
          </Chip>
        </ControlRow>
        <Slider
          label="Suhu"
          value={celsius}
          min={800}
          max={1200}
          step={10}
          onChange={setCelsius}
          display={`${format(celsius)} °C`}
        />
        <Slider
          label="Waktu"
          value={exponent}
          min={0.7}
          max={2.78}
          step={0.02}
          onChange={setExponent}
          display={formatTime(minutes)}
        />
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Tebal oksida" value={`${format(nm)} nm`} />
          <Stat label="Silikon yang terpakai" value={`${format(nm * 0.46)} nm`} />
          <Stat
            label="Laju dibatasi oleh"
            value={thickness < crossover ? "Reaksi di antarmuka" : "Difusi lewat oksida"}
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Dihitung dengan model Deal-Grove untuk silikon (100). Tebal oksida pada
        gambar tidak berskala. Untuk oksida kering yang sangat tipis, di bawah
        kira-kira 25 nm, model ini memberi hasil yang terlalu kecil.
      </figcaption>
    </figure>
  );
}
