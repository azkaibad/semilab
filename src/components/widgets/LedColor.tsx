"use client";

import { useState } from "react";
import { Chip, ControlRow, Stat } from "@/components/three/controls";

const MATERIALS = [
  { name: "GaAs", gap: 1.42, use: "Remote TV, sensor jarak" },
  { name: "AlGaAs", gap: 1.88, use: "Lampu indikator merah" },
  { name: "AlGaInP", gap: 2.1, use: "Lampu sein, lampu indikator kuning" },
  { name: "InGaN (hijau)", gap: 2.36, use: "Lampu lalu lintas, layar" },
  { name: "InGaN (biru)", gap: 2.76, use: "Layar, dan dasar LED putih" },
  { name: "AlGaN", gap: 4.4, use: "Sterilisasi air dan udara" },
];

/** Approximate sRGB colour of a visible wavelength in nm. */
function wavelengthToColor(nm: number) {
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm >= 380 && nm < 440) [r, g, b] = [(440 - nm) / 60, 0, 1];
  else if (nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1];
  else if (nm < 510) [r, g, b] = [0, 1, (510 - nm) / 20];
  else if (nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0];
  else if (nm < 645) [r, g, b] = [1, (645 - nm) / 65, 0];
  else if (nm <= 750) [r, g, b] = [1, 0, 0];
  const channel = (value: number) => Math.round(255 * value ** 0.8);
  return `rgb(${channel(r)}, ${channel(g)}, ${channel(b)})`;
}

const format = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits });

export function LedColor() {
  const [name, setName] = useState("InGaN (biru)");
  const material = MATERIALS.find((m) => m.name === name) ?? MATERIALS[4];
  const wavelength = 1240 / material.gap;
  const visible = wavelength >= 380 && wavelength <= 750;
  const color = visible ? wavelengthToColor(wavelength) : "transparent";
  const range = wavelength < 380 ? "Ultraungu, tidak terlihat" : wavelength > 750 ? "Inframerah, tidak terlihat" : "Cahaya tampak";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="grid place-items-center bg-[#0b1020] py-10">
        <div
          role="img"
          aria-label={`Cahaya LED ${material.name}: ${range}, ${format(wavelength, 0)} nanometer`}
          className="grid size-28 place-items-center rounded-full border border-white/25 text-center text-xs text-white/70"
          style={{
            background: color,
            boxShadow: visible ? `0 0 60px 18px ${color}` : "none",
          }}
        >
          {!visible && "tidak terlihat mata"}
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Bahan">
          {MATERIALS.map((m) => (
            <Chip key={m.name} active={m.name === name} onClick={() => setName(m.name)}>
              {m.name}
            </Chip>
          ))}
        </ControlRow>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Celah pita" value={`${format(material.gap)} eV`} />
          <Stat label="Panjang gelombang" value={`${format(wavelength, 0)} nm`} />
          <Stat label="Jenis cahaya" value={<span className="text-sm">{range}</span>} />
          <Stat label="Tegangan maju kira-kira" value={`${format(material.gap, 1)} V`} />
        </dl>
        <p className="text-sm text-muted">Dipakai untuk: {material.use}.</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Warna LED ditentukan oleh celah pita bahannya: panjang gelombang (nm) ≈
        1240 dibagi celah pita (eV). Nilai celah pita paduan bergantung pada
        komposisinya, jadi angka di sini adalah nilai yang umum.
      </figcaption>
    </figure>
  );
}
