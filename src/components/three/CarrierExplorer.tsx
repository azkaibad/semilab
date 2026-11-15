"use client";

import { useState } from "react";
import { intrinsicDensity, MATERIALS, Scientific } from "@/lib/semiconductor";
import { usePrefersReducedMotion } from "@/lib/progress";
import {
  CarrierLattice,
  ELECTRON_COLOR,
  HOLE_COLOR,
  type DopantKind,
} from "./CarrierLattice";
import { FieldArrow } from "./FieldArrow";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, SceneFrame, Slider, Stat } from "./controls";

const SILICON = MATERIALS[0];

/** Pairs to draw: grows with log(n_i) so the trend is visible. Not to scale. */
function pairsToDraw(temperature: number) {
  if (temperature < 150) return 0;
  const density = intrinsicDensity(SILICON, temperature);
  return Math.max(0, Math.round((Math.log10(density) - 6) * 1.2));
}

const DOPANT_TEXT: Record<DopantKind, string> = {
  none: "Silikon murni. Tidak ada pembawa muatan tambahan.",
  n: "Atom fosfor (hijau) punya lima elektron valensi. Empat dipakai untuk berikatan, dan yang kelima lepas menjadi elektron bebas. Atom fosfornya tertinggal sebagai ion positif yang diam di tempat.",
  p: "Atom boron (merah muda) hanya punya tiga elektron valensi, sehingga satu ikatannya kekurangan elektron. Kekosongan itu adalah hole, dan hole berpindah saat elektron dari ikatan tetangga mengisinya.",
};

function Legend() {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-full" style={{ background: ELECTRON_COLOR }} />
        Elektron bebas
      </span>
      <span className="flex items-center gap-2">
        <span
          className="size-3 rounded-full border-[3px]"
          style={{ borderColor: HOLE_COLOR }}
        />
        Hole
      </span>
    </p>
  );
}

export default function CarrierExplorer({
  mode,
}: {
  mode: "thermal" | "doping" | "drift";
}) {
  const [temperature, setTemperature] = useState(300);
  const [dopant, setDopant] = useState<DopantKind>(mode === "thermal" ? "none" : "n");
  const [dopantCount, setDopantCount] = useState(mode === "drift" ? 4 : 2);
  const [field, setField] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const pairs = mode === "thermal" ? pairsToDraw(temperature) : 0;

  return (
    <SceneFrame
      canvas={
        <SceneCanvas
          distance={7.4}
          label={
            mode === "thermal"
              ? `Kisi silikon pada ${temperature} kelvin dengan ${pairs} pasangan elektron dan hole`
              : `Kisi silikon dengan ${dopant === "none" ? "tanpa" : dopantCount} atom dopan`
          }
        >
          <CarrierLattice
            dopant={dopant}
            dopantCount={dopantCount}
            pairs={pairs}
            moving={!paused && !reducedMotion}
            field={mode === "drift" ? field : 0}
          />
          {mode === "drift" && field > 0 && (
            <FieldArrow position={[0, 1.45, 0]} length={0.8 + field * 1.4} label="E" />
          )}
        </SceneCanvas>
      }
      caption={
        mode === "thermal"
          ? "Jumlah pasangan yang digambar tidak berskala. Pada suhu ruang, sebenarnya hanya ada satu pasangan untuk setiap lima triliun atom silikon."
          : mode === "doping"
            ? "Setiap atom dopan menyumbang tepat satu pembawa muatan. Kepadatan dopan pada gambar jauh lebih tinggi daripada kenyataan."
            : "Panah jingga menunjukkan arah medan listrik. Pembawa yang keluar di satu sisi masuk lagi dari sisi seberangnya, seperti arus dalam rangkaian tertutup."
      }
    >
      {mode === "drift" ? (
        <>
          <ControlRow label="Pembawa">
            <Chip active={dopant === "n"} onClick={() => setDopant("n")}>
              Elektron (tipe-n)
            </Chip>
            <Chip active={dopant === "p"} onClick={() => setDopant("p")}>
              Hole (tipe-p)
            </Chip>
          </ControlRow>
          <Slider
            label="Medan listrik"
            value={field}
            min={0}
            max={1}
            step={0.05}
            onChange={setField}
            display={field === 0 ? "Nol" : field < 0.4 ? "Lemah" : field < 0.75 ? "Sedang" : "Kuat"}
          />
          <p className="text-sm text-muted">
            {field === 0
              ? "Tanpa medan, pembawa bergerak acak ke segala arah. Rata-rata perpindahannya nol, jadi tidak ada arus."
              : dopant === "n"
                ? "Elektron tetap bergerak acak, tetapi sekarang perlahan hanyut berlawanan arah medan karena muatannya negatif."
                : "Hole tetap melompat acak, tetapi sekarang lebih sering melompat searah medan karena muatannya positif."}
          </p>
        </>
      ) : mode === "thermal" ? (
        <>
          <Slider
            label="Suhu"
            value={temperature}
            min={0}
            max={600}
            step={10}
            onChange={setTemperature}
            display={`${temperature} K (${temperature - 273} °C)`}
          />
          <dl className="grid grid-cols-2 gap-2">
            <Stat label="Pasangan yang digambar" value={pairs} />
            <Stat
              label="Konsentrasi sebenarnya"
              value={
                temperature < 100 ? (
                  "Praktis nol"
                ) : (
                  <>
                    <Scientific value={intrinsicDensity(SILICON, temperature)} /> cm⁻³
                  </>
                )
              }
            />
          </dl>
        </>
      ) : (
        <>
          <ControlRow label="Jenis">
            <Chip active={dopant === "none"} onClick={() => setDopant("none")}>
              Murni
            </Chip>
            <Chip active={dopant === "n"} onClick={() => setDopant("n")}>
              Tipe-n (fosfor)
            </Chip>
            <Chip active={dopant === "p"} onClick={() => setDopant("p")}>
              Tipe-p (boron)
            </Chip>
          </ControlRow>
          {dopant !== "none" && (
            <ControlRow label="Atom dopan">
              {[1, 2, 3, 4].map((count) => (
                <Chip
                  key={count}
                  active={count === dopantCount}
                  onClick={() => setDopantCount(count)}
                >
                  {count}
                </Chip>
              ))}
            </ControlRow>
          )}
          <p className="text-sm text-muted">{DOPANT_TEXT[dopant]}</p>
        </>
      )}
      <Legend />
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="text-sm font-medium text-accent hover:underline"
        >
          {paused ? "Jalankan animasi" : "Jeda animasi"}
        </button>
      )}
    </SceneFrame>
  );
}
