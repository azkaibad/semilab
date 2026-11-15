"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider, Stat } from "@/components/three/controls";
import { K_B, MATERIALS, Scientific } from "@/lib/semiconductor";

const SILICON = MATERIALS[0];
const KT = K_B * 300;
const PX_PER_EV = 125;
const EC_Y = 40;
const EV_Y = EC_Y + SILICON.gap * PX_PER_EV;
const MID_Y = (EC_Y + EV_Y) / 2;
/** Ionisation energy of phosphorus and boron in silicon, in eV. */
const DOPANT_LEVEL = 0.045;

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function DopingCalculator() {
  const [type, setType] = useState<"n" | "p">("n");
  const [exponent, setExponent] = useState(16);

  const doping = 10 ** exponent;
  const majority = doping;
  const minority = SILICON.ni300 ** 2 / doping;
  const shift = KT * Math.log(doping / SILICON.ni300);
  const fermiY = type === "n" ? MID_Y - shift * PX_PER_EV : MID_Y + shift * PX_PER_EV;
  const levelY =
    type === "n" ? EC_Y + DOPANT_LEVEL * PX_PER_EV : EV_Y - DOPANT_LEVEL * PX_PER_EV;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 220"
        role="img"
        aria-label={`Diagram pita silikon tipe-${type}: level Fermi ${format(shift)} elektronvolt ${
          type === "n" ? "di atas" : "di bawah"
        } tengah celah`}
        className="w-full bg-bg"
      >
        <line x1="40" x2="250" y1={EC_Y} y2={EC_Y} stroke="var(--muted)" strokeWidth="2.5" />
        <line x1="40" x2="250" y1={EV_Y} y2={EV_Y} stroke="var(--accent)" strokeWidth="2.5" />
        <line x1="40" x2="250" y1={MID_Y} y2={MID_Y} stroke="var(--line)" strokeDasharray="3 5" />
        <line x1="60" x2="230" y1={levelY} y2={levelY} stroke={type === "n" ? "#34d399" : "#f472b6"} strokeWidth="2" strokeDasharray="10 8" />
        <line x1="40" x2="250" y1={fermiY} y2={fermiY} stroke="var(--warm)" strokeWidth="2" strokeDasharray="6 4" />

        <text x="258" y={EC_Y - 6} fontSize="10" fill="var(--muted)">
          Dasar pita konduksi
        </text>
        <text x="258" y={EV_Y + 14} fontSize="10" fill="var(--accent)">
          Puncak pita valensi
        </text>
        <text x="258" y={MID_Y + 3} fontSize="9" fill="var(--muted)">
          tengah celah
        </text>
        <text
          x="258"
          y={type === "n" ? levelY + 12 : levelY - 5}
          fontSize="9"
          fill={type === "n" ? "#34d399" : "#f472b6"}
        >
          {type === "n" ? "tingkat donor" : "tingkat akseptor"}
        </text>
        <text x="36" y={fermiY + 3} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--warm)">
          E
          <tspan baselineShift="sub" fontSize="7">
            F
          </tspan>
        </text>
      </svg>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Jenis">
          <Chip active={type === "n"} onClick={() => setType("n")}>
            Tipe-n (donor)
          </Chip>
          <Chip active={type === "p"} onClick={() => setType("p")}>
            Tipe-p (akseptor)
          </Chip>
        </ControlRow>
        <Slider
          label="Konsentrasi dopan"
          value={exponent}
          min={13}
          max={18}
          step={0.5}
          onChange={setExponent}
          display={
            <>
              <Scientific value={doping} /> cm⁻³
            </>
          }
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat
            label={type === "n" ? "Elektron (mayoritas)" : "Hole (mayoritas)"}
            value={
              <>
                <Scientific value={majority} /> cm⁻³
              </>
            }
          />
          <Stat
            label={type === "n" ? "Hole (minoritas)" : "Elektron (minoritas)"}
            value={
              <>
                <Scientific value={minority} /> cm⁻³
              </>
            }
          />
          <Stat
            label="Satu atom dopan tiap"
            value={
              <>
                <Scientific value={SILICON.atoms / doping} digits={0} /> atom Si
              </>
            }
          />
          <Stat
            label="Level Fermi"
            value={
              <span className="text-sm">
                {format(shift)} eV {type === "n" ? "di atas" : "di bawah"} tengah celah
              </span>
            }
          />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Silikon pada suhu ruang (300 K), dengan anggapan semua atom dopan sudah
        melepaskan pembawa muatannya.
      </figcaption>
    </figure>
  );
}
