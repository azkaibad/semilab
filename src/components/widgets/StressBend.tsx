"use client";

import { useState } from "react";
import { Chip, ControlRow, Slider } from "@/components/three/controls";

export function StressBend() {
  const [tensile, setTensile] = useState(true);
  const [amount, setAmount] = useState(0.6);

  // Positive sag puts the middle lower than the edges (a bowl shape).
  const sag = (tensile ? 1 : -1) * amount * 26;
  const curve = (y: number) => `M50,${y} Q180,${y + sag * 2} 310,${y}`;
  const base = 78 - sag / 2;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <svg
        viewBox="0 0 360 150"
        role="img"
        aria-label={`Wafer melengkung akibat stress ${tensile ? "tarik" : "tekan"} pada film: ${
          tensile ? "tepinya terangkat seperti mangkuk" : "tengahnya terangkat seperti kubah"
        }`}
        className="w-full bg-bg"
      >
        <path d={curve(base)} fill="none" stroke="#475569" strokeWidth="16" />
        <path d={curve(base - 10.5)} fill="none" stroke="var(--warm)" strokeWidth="5" />
        <text x="180" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--warm)">
          {tensile ? "film ingin menyusut" : "film ingin memuai"}
        </text>
        <text x="180" y="140" textAnchor="middle" fontSize="9" fill="var(--muted)">
          substrat (lengkungan sangat dilebih-lebihkan)
        </text>
      </svg>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Jenis stress">
          <Chip active={tensile} onClick={() => setTensile(true)}>
            Tarik
          </Chip>
          <Chip active={!tensile} onClick={() => setTensile(false)}>
            Tekan
          </Chip>
        </ControlRow>
        <Slider
          label="Besar stress"
          value={amount}
          min={0}
          max={1}
          step={0.05}
          onChange={setAmount}
          display={amount === 0 ? "Nol" : amount < 0.4 ? "Kecil" : amount < 0.75 ? "Sedang" : "Besar"}
        />
        <p className="text-sm text-muted">
          {tensile
            ? "Stress tarik: film tertahan dalam keadaan teregang dan menarik tepi wafer ke atas. Kalau terlalu besar, film retak."
            : "Stress tekan: film tertahan dalam keadaan terhimpit dan mendorong wafer melengkung seperti kubah. Kalau terlalu besar, film menggelembung lalu terkelupas."}
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Lengkungan wafer yang sebenarnya hanya beberapa mikrometer sampai
        puluhan mikrometer, tetapi cukup untuk diukur dan dipakai menghitung
        stress film.
      </figcaption>
    </figure>
  );
}
