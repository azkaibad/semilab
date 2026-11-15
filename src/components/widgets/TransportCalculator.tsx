"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { K_B, Scientific } from "@/lib/semiconductor";

const Q = 1.602e-19;
/** Saturation velocity of carriers in silicon, cm/s. */
const V_SAT = 1.0e7;

/** Empirical carrier mobility in silicon at 300 K versus doping, in cm²/V·s. */
function mobility(type: "n" | "p", doping: number) {
  return type === "n"
    ? 68.5 + (1414 - 68.5) / (1 + (doping / 9.2e16) ** 0.711)
    : 44.9 + (470.5 - 44.9) / (1 + (doping / 2.23e17) ** 0.719);
}

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

const plotX = (exponent: number) => 44 + ((exponent - 14) / 5) * 290;
const plotY = (mu: number) => 178 - (mu / 1500) * 160;

function curve(type: "n" | "p") {
  return Array.from({ length: 51 }, (_, i) => {
    const exponent = 14 + (i / 50) * 5;
    return `${i === 0 ? "M" : "L"}${plotX(exponent).toFixed(1)},${plotY(
      mobility(type, 10 ** exponent),
    ).toFixed(1)}`;
  }).join(" ");
}

export function TransportCalculator() {
  const [type, setType] = useState<"n" | "p">("n");
  const [exponent, setExponent] = useState(16);
  const [fieldExponent, setFieldExponent] = useState(3);

  const doping = 10 ** exponent;
  const field = 10 ** fieldExponent;
  const mu = mobility(type, doping);
  const resistivity = 1 / (Q * doping * mu);
  const velocity = (mu * field) / (1 + (mu * field) / V_SAT);
  const diffusivity = mu * K_B * 300;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 210"
        role="img"
        aria-label={`Grafik mobilitas terhadap konsentrasi dopan. Mobilitas ${
          type === "n" ? "elektron" : "hole"
        } saat ini ${format(mu, 0)} sentimeter persegi per volt detik`}
        className="w-full bg-bg"
      >
        <line x1="44" x2="334" y1="178" y2="178" stroke="var(--line)" />
        <line x1="44" x2="44" y1="14" y2="178" stroke="var(--line)" />
        {[0, 500, 1000, 1500].map((mu0) => (
          <text key={mu0} x="38" y={plotY(mu0) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
            {mu0}
          </text>
        ))}
        {[14, 15, 16, 17, 18, 19].map((e) => (
          <text key={e} x={plotX(e)} y="192" textAnchor="middle" fontSize="9" fill="var(--muted)">
            10
            <tspan baselineShift="super" fontSize="6">
              {e}
            </tspan>
          </text>
        ))}
        <text x="189" y="206" textAnchor="middle" fontSize="9" fill="var(--muted)">
          konsentrasi dopan (cm⁻³)
        </text>
        <text x="50" y="12" fontSize="9" fill="var(--muted)">
          mobilitas (cm²/V·s)
        </text>
        <path d={curve("n")} fill="none" stroke="#5ad1ff" strokeWidth={type === "n" ? 2.5 : 1.2} opacity={type === "n" ? 1 : 0.5} />
        <path d={curve("p")} fill="none" stroke="var(--warm)" strokeWidth={type === "p" ? 2.5 : 1.2} opacity={type === "p" ? 1 : 0.5} />
        <text x="120" y={plotY(1400) - 5} fontSize="9" fill="#5ad1ff">
          elektron
        </text>
        <text x="120" y={plotY(470) - 5} fontSize="9" fill="var(--warm)">
          hole
        </text>
        <circle cx={plotX(exponent)} cy={plotY(mu)} r="5" fill="var(--ink)" />
      </svg>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Jenis">
          <Chip active={type === "n"} onClick={() => setType("n")}>
            Tipe-n
          </Chip>
          <Chip active={type === "p"} onClick={() => setType("p")}>
            Tipe-p
          </Chip>
        </ControlRow>
        <Slider
          label="Konsentrasi dopan"
          value={exponent}
          min={14}
          max={19}
          step={0.25}
          onChange={setExponent}
          display={
            <>
              <Scientific value={doping} /> cm⁻³
            </>
          }
        />
        <Slider
          label="Medan listrik"
          value={fieldExponent}
          min={1}
          max={5}
          step={0.25}
          onChange={setFieldExponent}
          display={
            <>
              <Scientific value={field} /> V/cm
            </>
          }
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Mobilitas" value={`${format(mu, 0)} cm²/V·s`} />
          <Stat
            label="Resistivitas"
            value={
              resistivity >= 0.01 ? (
                `${format(resistivity, resistivity < 1 ? 3 : 1)} Ω·cm`
              ) : (
                <>
                  <Scientific value={resistivity} /> Ω·cm
                </>
              )
            }
          />
          <Stat
            label="Kecepatan drift"
            value={
              <>
                <Scientific value={velocity} /> cm/s
              </>
            }
          />
          <Stat label="Koefisien difusi" value={`${format(diffusivity, 1)} cm²/s`} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Silikon pada 300 K. Mobilitas dihitung dari rumus empiris, dan
        kecepatan drift dibatasi kecepatan jenuh sekitar 10⁷ cm/s.
      </figcaption>
    </figure>
  );
}
