"use client";

import { useState } from "react";
import { Slider, Stat } from "@/components/three/controls";

/** Wet-film thickness in nm for a withdrawal speed in mm/min (Landau-Levich scaling). */
const thickness = (speed: number) => 20 * speed ** (2 / 3);

const format = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function DipCoating() {
  const [exponent, setExponent] = useState(1);
  const speed = 10 ** exponent;
  const nm = thickness(speed);
  // Drawn film width, exaggerated.
  const film = 1.5 + (nm / thickness(100)) * 9;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Dip coating: substrat ditarik keluar dari larutan dengan kecepatan ${format(speed, 1)} milimeter per menit, tebal lapisan ${format(nm)} nanometer`}
        className="w-full bg-bg"
      >
        <rect x="110" y="110" width="140" height="78" rx="4" fill="#1d4ed8" opacity="0.35" />
        <path d="M110,96 V188 H250 V96" fill="none" stroke="var(--muted)" strokeWidth="2" />
        <rect x={176 - film} y="28" width={film} height="84" fill="var(--warm)" />
        <rect x="184" y="28" width={film} height="84" fill="var(--warm)" />
        <rect x="176" y="20" width="8" height="150" fill="#cbd5e1" />
        <line x1="180" x2="180" y1="16" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M175,9 L180,2 L185,9" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="192" y="10" fontSize="9" fill="var(--ink)">
          ditarik ke atas
        </text>
        <text x="204" y="70" fontSize="9" fill="var(--warm)" fontWeight="700">
          lapisan basah
        </text>
        <text x="258" y="150" fontSize="9" fill="var(--muted)">
          larutan
        </text>
        <text x="100" y="60" textAnchor="end" fontSize="9" fill="#cbd5e1">
          substrat
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <Slider
          label="Kecepatan tarik"
          value={exponent}
          min={0}
          max={2}
          step={0.05}
          onChange={setExponent}
          display={`${format(speed, speed < 10 ? 1 : 0)} mm/menit`}
        />
        <dl className="grid grid-cols-2 gap-2">
          <Stat label="Tebal lapisan" value={`${format(nm)} nm`} />
          <Stat label="Waktu menarik substrat 50 mm" value={`${format(50 / speed, 1)} menit`} />
        </dl>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Makin cepat ditarik, makin banyak cairan yang ikut terbawa, sehingga
        lapisan makin tebal. Tebal lapisan pada gambar dilebih-lebihkan, dan
        angkanya adalah contoh untuk satu larutan.
      </figcaption>
    </figure>
  );
}
