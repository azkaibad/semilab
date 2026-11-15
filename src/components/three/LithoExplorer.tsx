"use client";

import { useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider } from "./controls";

/** True where the mask is clear and light passes through. */
const OPEN = [false, false, true, true, false, false, false, true, true, true, false, false];
const WIDTH = 0.5;
const DEPTH = 2;
const FILM = 0.25;
const RESIST = 0.35;
const MASK_Y = 1.5;
const columnX = (i: number) => (i - (OPEN.length - 1) / 2) * WIDTH;

const STEPS = [
  {
    title: "1. Wafer dengan lapisan film",
    text: "Titik awalnya adalah wafer yang seluruh permukaannya tertutup film, di sini silikon dioksida. Tujuannya membuang film itu hanya di tempat tertentu.",
  },
  {
    title: "2. Pelapisan resist",
    text: "Photoresist dilapiskan dengan spin coating (Bab 15) sampai setebal kira-kira 1 µm. Resist adalah polimer yang sifat larutnya berubah saat terkena cahaya.",
  },
  {
    title: "3. Soft bake",
    text: "Wafer dipanaskan sekitar 90 sampai 110 °C selama satu menit untuk mengusir sisa pelarut. Resist mengeras dan menempel lebih kuat.",
  },
  {
    title: "4. Penjajaran mask",
    text: "Mask, yaitu pelat kaca dengan pola krom yang menahan cahaya, diletakkan di atas wafer. Posisinya disejajarkan dengan pola dari langkah sebelumnya, dengan ketelitian jauh di bawah satu mikrometer.",
  },
  {
    title: "5. Penyinaran",
    text: "Cahaya ultraungu disorotkan lewat mask. Resist di bawah bagian mask yang bening tersinari dan berubah secara kimia. Resist di bawah krom tidak berubah.",
  },
  {
    title: "6. Pengembangan",
    text: "Wafer dibilas dengan larutan developer, yang melarutkan sebagian resist. Sekarang pola mask sudah berpindah ke resist.",
  },
  {
    title: "7. Etching",
    text: "Film yang tidak terlindungi resist dibuang dengan etching (Bab 19). Resist melindungi film di bawahnya.",
  },
  {
    title: "8. Pelepasan resist",
    text: "Resist yang tersisa dilepas dengan pelarut atau plasma oksigen. Pola sudah berpindah ke film, dan wafer siap untuk langkah berikutnya.",
  },
];

function Wafer({ step, positive }: { step: number; positive: boolean }) {
  const length = OPEN.length * WIDTH;
  // After development, resist remains where the developer did not dissolve it.
  const resistLeft = (open: boolean) => step < 5 || (positive ? !open : open);

  return (
    <group position={[0, -0.6, 0]}>
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[length, 0.7, DEPTH]} />
        <meshStandardMaterial color="#5b6690" roughness={0.6} />
      </mesh>
      {OPEN.map((open, i) => {
        const hasResist = step >= 1 && step <= 6 && resistLeft(open);
        const hasFilm = step < 6 || resistLeft(open);
        const exposed = step >= 4 && open;
        return (
          <group key={i} position={[columnX(i), 0, 0]}>
            {hasFilm && (
              <mesh position={[0, FILM / 2, 0]}>
                <boxGeometry args={[WIDTH, FILM, DEPTH]} />
                <meshStandardMaterial color="#7dd3fc" roughness={0.4} />
              </mesh>
            )}
            {hasResist && (
              <mesh position={[0, FILM + RESIST / 2, 0]}>
                <boxGeometry args={[WIDTH, RESIST, DEPTH]} />
                <meshStandardMaterial
                  color={exposed ? "#a855f7" : step === 1 ? "#fb7185" : "#e11d48"}
                  roughness={0.5}
                />
              </mesh>
            )}
            {(step === 3 || step === 4) && !open && (
              <mesh position={[0, MASK_Y - 0.07, 0]}>
                <boxGeometry args={[WIDTH, 0.06, DEPTH]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
              </mesh>
            )}
            {step === 4 && open && (
              <mesh position={[0, (MASK_Y + FILM + RESIST) / 2, 0]}>
                <boxGeometry args={[WIDTH, MASK_Y - FILM - RESIST - 0.1, DEPTH]} />
                <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} depthWrite={false} />
              </mesh>
            )}
          </group>
        );
      })}
      {(step === 3 || step === 4) && (
        <mesh position={[0, MASK_Y, 0]}>
          <boxGeometry args={[length + 0.4, 0.08, DEPTH + 0.3]} />
          <meshStandardMaterial color="#bfe3ff" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      )}
      {step === 4 && (
        <mesh position={[0, MASK_Y + 0.45, 0]}>
          <boxGeometry args={[length, 0.8, DEPTH]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} depthWrite={false} />
        </mesh>
      )}
      {step === 4 && (
        <TextSprite text="cahaya ultraungu" position={[0, MASK_Y + 1.15, 0]} height={0.28} color="#c4b5fd" />
      )}
      {step === 3 && <TextSprite text="mask" position={[0, MASK_Y + 0.4, 0]} height={0.28} color="#bfe3ff" />}
      <TextSprite text="silikon" position={[0, -0.4, DEPTH / 2 + 0.05]} height={0.24} color="#e2e8f0" />
    </group>
  );
}

export default function LithoExplorer() {
  const [step, setStep] = useState(0);
  const [positive, setPositive] = useState(true);
  const last = STEPS.length - 1;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.35, 0.45, 1]}
          distance={9}
          label={`Fotolitografi, ${STEPS[step].title}, resist ${positive ? "positif" : "negatif"}`}
        >
          <Wafer step={step} positive={positive} />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="font-semibold">{STEPS[step].title}</p>
          <p className="mt-1 text-sm text-muted">{STEPS[step].text}</p>
          {step >= 5 && (
            <p className="mt-1 text-sm text-muted">
              {positive
                ? "Resist positif: bagian yang tersinari menjadi mudah larut, sehingga pola pada resist sama dengan pola krom pada mask."
                : "Resist negatif: bagian yang tersinari mengeras dan tidak larut, sehingga pola pada resist adalah kebalikan pola krom pada mask."}
            </p>
          )}
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
        <ControlRow label="Jenis resist">
          <Chip active={positive} onClick={() => setPositive(true)}>
            Positif
          </Chip>
          <Chip active={!positive} onClick={() => setPositive(false)}>
            Negatif
          </Chip>
        </ControlRow>
        <div className="flex flex-wrap gap-2">
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
        </div>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Biru muda: film SiO₂</span>
          <span>Merah: resist</span>
          <span>Ungu: resist yang tersinari</span>
          <span>Gelap: krom pada mask</span>
        </p>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Potongan kecil wafer, tidak berskala. Pada wafer sungguhan, resist
        setebal kira-kira 1 µm berada di atas wafer setebal 700 µm.
      </figcaption>
    </figure>
  );
}
