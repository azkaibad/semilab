"use client";

import { useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Slider, Stat } from "./controls";

const COLUMNS = 16;
const WIDTH = 0.4;
const DEPTH = 2;
const columnX = (i: number) => (i - (COLUMNS - 1) / 2) * WIDTH;

const isField = (i: number) => i < 3 || i > 12;
const isGate = (i: number) => i >= 6 && i <= 9;
const isContact = (i: number) => i === 4 || i === 11;
const isMetal = (i: number) => (i >= 3 && i <= 5) || (i >= 10 && i <= 12);

const COLORS = {
  field: "#7dd3fc",
  gateOxide: "#e0f2fe",
  poly: "#f472b6",
  insulator: "#a5b4fc",
  metal: "#e2e8f0",
};

const STEPS = [
  {
    title: "1. Wafer bersih",
    tool: "Bangku basah",
    chapter: "Bab 16",
    setting: "Silikon tipe-p (100), 1–10 Ω·cm, pembersihan RCA",
    check: "Tidak ada partikel dan noda di bawah lampu sorot",
    text: "Titik awalnya wafer tipe-p. Substrat inilah yang nanti menjadi badan transistor, tempat kanal terbentuk.",
  },
  {
    title: "2. Oksida medan",
    tool: "Tungku oksidasi basah",
    chapter: "Bab 17",
    setting: "1.000 °C, uap air, sekitar 2 jam, tebal 500 nm",
    check: "Tebal oksida dengan ellipsometer, atau dari warnanya",
    text: "Oksida tebal ditumbuhkan di seluruh wafer. Lapisan ini akan memisahkan satu transistor dari transistor di sebelahnya.",
  },
  {
    title: "3. Mask 1: daerah aktif",
    tool: "Litografi, lalu wet etch BOE",
    chapter: "Bab 18 dan 19",
    setting: "Resist positif, etch oksida sampai silikon terbuka",
    check: "Pola di mikroskop, dan air tidak lagi membasahi silikon yang terbuka",
    text: "Oksida medan dibuka di tempat transistor akan dibuat. Wet etch cukup di sini, karena polanya lebar dan selektivitasnya terhadap silikon sangat tinggi.",
  },
  {
    title: "4. Oksida gate",
    tool: "Tungku oksidasi kering",
    chapter: "Bab 17",
    setting: "900 °C, oksigen kering, tebal 20 nm",
    check: "Tebal dengan ellipsometer",
    text: "Ini lapisan paling menentukan dalam seluruh proses. Wafer dibersihkan tepat sebelum masuk tungku, dan oksida kering dipilih karena mutunya.",
  },
  {
    title: "5. Polisilikon",
    tool: "LPCVD",
    chapter: "Bab 14",
    setting: "620 °C, gas silana, tebal 300 nm, didoping fosfor",
    check: "Tebal, dan hambatan lembar dengan four-point probe",
    text: "Polisilikon dilapiskan langsung setelah oksida gate, sebelum oksida itu sempat tercemar. Lapisan ini akan menjadi gate.",
  },
  {
    title: "6. Mask 2: gate",
    tool: "Litografi, lalu RIE",
    chapter: "Bab 18 dan 19",
    setting: "RIE dengan gas klor, berhenti di oksida gate",
    check: "Lebar gate dengan SEM",
    text: "Polisilikon dibentuk menjadi gate. Lebar gate menentukan panjang kanal, jadi di sini dibutuhkan dinding tegak dari RIE.",
  },
  {
    title: "7. Implantasi source dan drain",
    tool: "Ion implanter",
    chapter: "Bab 17",
    setting: "Arsen, 80 keV, dosis 5 × 10¹⁵ cm⁻²",
    check: "Dosis dari arus berkas yang tercatat",
    text: "Tidak ada mask di langkah ini. Gate dan oksida medan sendiri yang menahan ion, sehingga source dan drain terbentuk tepat di kedua tepi gate. Cara ini disebut self-aligned.",
  },
  {
    title: "8. Annealing",
    tool: "Annealing termal cepat",
    chapter: "Bab 17",
    setting: "1.000 °C selama 10 detik, dalam nitrogen",
    check: "Hambatan lembar source dan drain",
    text: "Kerusakan kristal diperbaiki dan arsen diaktifkan. Dopan merambat sedikit ke bawah tepi gate, sehingga kanal tersambung ke source dan drain.",
  },
  {
    title: "9. Oksida isolasi",
    tool: "PECVD",
    chapter: "Bab 14",
    setting: "350 °C, tebal 400 nm",
    check: "Tebal dengan ellipsometer",
    text: "Seluruh permukaan ditutup isolator, supaya logam nanti hanya menyentuh silikon di tempat yang sengaja dibuka.",
  },
  {
    title: "10. Mask 3: lubang kontak",
    tool: "Litografi, lalu RIE",
    chapter: "Bab 18 dan 19",
    setting: "RIE dengan gas CHF₃, berhenti di silikon",
    check: "Lubang terbuka penuh, diperiksa dengan mikroskop atau SEM",
    text: "Lubang dibuat menembus isolator sampai ke source dan drain. Lubang untuk gate ada di bagian lain transistor, di luar potongan ini.",
  },
  {
    title: "11. Aluminium",
    tool: "Sputtering magnetron",
    chapter: "Bab 13",
    setting: "Aluminium, tebal 500 nm",
    check: "Tebal dengan profilometer, hambatan lembar dengan four-point probe",
    text: "Aluminium dilapiskan ke seluruh permukaan dan mengisi lubang kontak. Sputtering dipilih karena melapisi dinding lubang lebih baik daripada evaporasi.",
  },
  {
    title: "12. Mask 4: jalur logam",
    tool: "Litografi, lalu RIE atau wet etch",
    chapter: "Bab 18 dan 19",
    setting: "Etch aluminium, berhenti di oksida",
    check: "Jalur tidak putus dan tidak saling tersambung",
    text: "Aluminium dipisahkan menjadi kontak source dan kontak drain. Tanpa langkah ini, semua terminal terhubung singkat.",
  },
  {
    title: "13. Sinter dan uji listrik",
    tool: "Tungku, lalu stasiun probe",
    chapter: "Bab 9 dan 21",
    setting: "400 °C selama 30 menit dalam gas pembentuk",
    check: "Kurva arus drain terhadap tegangan gate dan tegangan drain",
    text: "Pemanasan ringan memperbaiki sambungan antara aluminium dan silikon. Lalu jarum-jarum probe ditempelkan ke kontak, dan transistor dinyalakan untuk pertama kali.",
  },
];

function CrossSection({ step }: { step: number }) {
  const length = COLUMNS * WIDTH;
  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[length, 0.9, DEPTH]} />
        <meshStandardMaterial color="#6b4a63" roughness={0.7} />
      </mesh>
      {Array.from({ length: COLUMNS }, (_, i) => {
        // Layers on this column, from the silicon surface upwards.
        const layers: [number, string][] = [];
        if (step >= 1 && (step < 2 || isField(i))) layers.push([0.4, COLORS.field]);
        if (step >= 3 && !isField(i) && (step < 5 || isGate(i))) layers.push([0.06, COLORS.gateOxide]);
        if (step >= 4 && (step < 5 || isGate(i))) layers.push([0.3, COLORS.poly]);
        if (step >= 8 && (step < 9 || !isContact(i))) layers.push([0.3, COLORS.insulator]);
        if (step >= 10 && (step < 11 || isMetal(i))) {
          // In a contact hole the metal also fills the missing insulator.
          layers.push([isContact(i) ? 0.55 : 0.25, COLORS.metal]);
        }
        const doped = step >= 6 && !isField(i) && !isGate(i);
        let base = 0;
        return (
          <group key={i} position={[columnX(i), 0, 0]}>
            {doped && (
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[WIDTH + 0.002, step >= 7 ? 0.24 : 0.16, DEPTH + 0.01]} />
                <meshStandardMaterial color={step >= 7 ? "#34d399" : "#86efac"} roughness={0.6} />
              </mesh>
            )}
            {layers.map(([height, color], index) => {
              const y = base + height / 2;
              base += height;
              return (
                <mesh key={index} position={[0, y, 0]}>
                  <boxGeometry args={[WIDTH, height, DEPTH]} />
                  <meshStandardMaterial
                    color={color}
                    roughness={0.45}
                    metalness={color === COLORS.metal ? 0.25 : 0}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
      <TextSprite text="substrat tipe-p" position={[0, -0.6, DEPTH / 2 + 0.05]} height={0.24} color="#f3c9e0" />
      {step >= 6 && (
        <>
          <TextSprite text="n⁺" position={[columnX(4), -0.1, DEPTH / 2 + 0.06]} height={0.2} color="#06281c" />
          <TextSprite text="n⁺" position={[columnX(11), -0.1, DEPTH / 2 + 0.06]} height={0.2} color="#06281c" />
        </>
      )}
      {step >= 11 && (
        <>
          <TextSprite text="Source" position={[columnX(4), 1.35, 0]} height={0.26} />
          <TextSprite text="Drain" position={[columnX(11), 1.35, 0]} height={0.26} />
        </>
      )}
      {step >= 5 && <TextSprite text="Gate" position={[0, step >= 8 ? 1.0 : 0.7, 0]} height={0.26} color="#f9a8d4" />}
    </group>
  );
}

export default function ProcessFlowExplorer() {
  const [step, setStep] = useState(0);
  const last = STEPS.length - 1;
  const current = STEPS[step];
  const masks = [2, 5, 9, 11].filter((index) => index <= step).length;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.3, 0.35, 1]}
          distance={9}
          label={`Potongan melintang MOSFET pada langkah ${current.title}`}
        >
          <CrossSection step={step} />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="font-semibold">{current.title}</p>
          <p className="mt-1 text-sm text-muted">{current.text}</p>
        </div>
        <Slider
          label="Langkah"
          value={step}
          min={0}
          max={last}
          step={1}
          onChange={setStep}
          display={`${step + 1} dari ${STEPS.length}`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Alat" value={<span className="text-sm">{current.tool}</span>} />
          <Stat label="Dibahas di" value={<span className="text-sm">{current.chapter}</span>} />
          <Stat label="Pengaturan" value={<span className="text-sm">{current.setting}</span>} />
          <Stat label="Pemeriksaan" value={<span className="text-sm">{current.check}</span>} />
        </dl>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent disabled:opacity-40"
          >
            Langkah sebelumnya
          </button>
          <button
            type="button"
            disabled={step === last}
            onClick={() => setStep((value) => Math.min(last, value + 1))}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent disabled:opacity-40"
          >
            Langkah berikutnya
          </button>
          <span className="text-sm text-muted">Mask terpakai: {masks} dari 4</span>
        </div>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Biru muda: oksida medan</span>
          <span>Merah muda: polisilikon</span>
          <span>Hijau: source dan drain</span>
          <span>Ungu muda: oksida isolasi</span>
          <span>Perak: aluminium</span>
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Potongan melintang skematis, tidak berskala. Oksida gate setebal 20 nm
        digambar jauh lebih tebal agar terlihat. Angka pengaturan adalah contoh
        yang wajar untuk proses pendidikan, bukan resep satu laboratorium.
      </figcaption>
    </figure>
  );
}
