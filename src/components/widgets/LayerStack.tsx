"use client";

import { useState } from "react";
import { Chip, ControlRow } from "@/components/three/controls";

type Layer = { name: string; role: string; thickness: string; nm: number; color: string };

/** Layers are listed from the top surface down to the substrate. */
const STACKS: { name: string; note: string; layers: Layer[] }[] = [
  {
    name: "Lensa antipantul",
    note: "Tebal tiap lapisan dipilih agar pantulan cahaya dari batas-batas lapisan saling meniadakan.",
    layers: [
      { name: "Lapisan anti-air", role: "Menolak air dan minyak", thickness: "5 nm", nm: 5, color: "#7dd3fc" },
      { name: "SiO₂", role: "Indeks bias rendah", thickness: "90 nm", nm: 90, color: "#a5b4fc" },
      { name: "TiO₂", role: "Indeks bias tinggi", thickness: "110 nm", nm: 110, color: "#f0abfc" },
      { name: "SiO₂", role: "Indeks bias rendah", thickness: "30 nm", nm: 30, color: "#a5b4fc" },
      { name: "TiO₂", role: "Indeks bias tinggi", thickness: "15 nm", nm: 15, color: "#f0abfc" },
      { name: "Lapisan keras", role: "Tahan gores", thickness: "3 µm", nm: 3000, color: "#94a3b8" },
      { name: "Lensa plastik", role: "Substrat", thickness: "2 mm", nm: 2e6, color: "#475569" },
    ],
  },
  {
    name: "Sel surya film tipis",
    note: "Seluruh lapisan aktifnya hanya sekitar 3 µm, kira-kira seperenam puluh tebal sel surya silikon biasa.",
    layers: [
      { name: "ZnO:Al", role: "Elektroda tembus cahaya", thickness: "300 nm", nm: 300, color: "#7dd3fc" },
      { name: "CdS", role: "Sisi n sambungan", thickness: "50 nm", nm: 50, color: "#fde047" },
      { name: "CIGS", role: "Penyerap cahaya, sisi p", thickness: "2 µm", nm: 2000, color: "#64748b" },
      { name: "Molibdenum", role: "Elektroda belakang", thickness: "500 nm", nm: 500, color: "#cbd5e1" },
      { name: "Kaca", role: "Substrat", thickness: "3 mm", nm: 3e6, color: "#475569" },
    ],
  },
  {
    name: "Transistor layar (TFT)",
    note: "Setiap piksel layar punya transistor seperti ini, dibuat langsung di atas kaca.",
    layers: [
      { name: "SiO₂", role: "Pelindung", thickness: "300 nm", nm: 300, color: "#a5b4fc" },
      { name: "Logam source dan drain", role: "Kontak", thickness: "200 nm", nm: 200, color: "#cbd5e1" },
      { name: "IGZO", role: "Kanal semikonduktor", thickness: "40 nm", nm: 40, color: "#34d399" },
      { name: "SiNₓ", role: "Isolator gate", thickness: "300 nm", nm: 300, color: "#f0abfc" },
      { name: "Logam gate", role: "Elektroda gate", thickness: "200 nm", nm: 200, color: "#cbd5e1" },
      { name: "Kaca", role: "Substrat", thickness: "0,5 mm", nm: 5e5, color: "#475569" },
    ],
  },
  {
    name: "Gate transistor chip",
    note: "Lapisan HfO₂ di sini hanya setebal kira-kira delapan lapis atom, dan dibuat dengan ALD (Bab 14).",
    layers: [
      { name: "Tungsten", role: "Logam pengisi gate", thickness: "50 nm", nm: 50, color: "#cbd5e1" },
      { name: "TiN", role: "Logam pengatur tegangan ambang", thickness: "3 nm", nm: 3, color: "#fbbf24" },
      { name: "HfO₂", role: "Isolator gate", thickness: "1,5 nm", nm: 1.5, color: "#f0abfc" },
      { name: "SiO₂", role: "Lapisan antarmuka", thickness: "0,5 nm", nm: 0.5, color: "#a5b4fc" },
      { name: "Silikon", role: "Substrat dan kanal", thickness: "775 µm", nm: 7.75e5, color: "#475569" },
    ],
  },
];

export function LayerStack() {
  const [index, setIndex] = useState(0);
  const stack = STACKS[index];

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="bg-bg p-4 sm:p-6">
        <ol className="mx-auto max-w-xl" aria-label={`Susunan lapisan ${stack.name}, dari permukaan ke substrat`}>
          {stack.layers.map((layer, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 border-b border-black/30 px-3 text-sm text-slate-950"
              style={{
                background: layer.color,
                minHeight: 26 + Math.log10(layer.nm + 1) * 7,
                color: layer.role === "Substrat" || layer.role === "Substrat dan kanal" || layer.name === "CIGS" ? "#f8fafc" : undefined,
              }}
            >
              <span>
                <strong>{layer.name}</strong> · {layer.role}
              </span>
              <span className="shrink-0 font-semibold tabular-nums">{layer.thickness}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <ControlRow label="Contoh">
          {STACKS.map((item, i) => (
            <Chip key={item.name} active={i === index} onClick={() => setIndex(i)}>
              {item.name}
            </Chip>
          ))}
        </ControlRow>
        <p className="text-sm text-muted">{stack.note}</p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Tinggi tiap baris tidak berskala. Kalau digambar berskala, semua
        lapisan tipis akan lebih tipis daripada satu garis di atas substratnya.
        Angka ketebalan adalah nilai yang umum.
      </figcaption>
    </figure>
  );
}
