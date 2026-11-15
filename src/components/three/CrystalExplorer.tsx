"use client";

import { useState } from "react";
import {
  PLANES,
  STRUCTURES,
  type PlaneId,
  type StructureId,
} from "@/lib/lattice";
import { usePrefersReducedMotion } from "@/lib/progress";
import { LatticeView } from "./LatticeView";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, SceneFrame, Stat } from "./controls";

type Props = {
  /** "structures" compares unit cells; "planes" explores Miller planes in silicon. */
  mode: "structures" | "planes";
};

export default function CrystalExplorer({ mode }: Props) {
  const [structure, setStructure] = useState<StructureId>("diamond");
  const [cells, setCells] = useState(mode === "planes" ? 2 : 1);
  const [plane, setPlane] = useState<PlaneId | null>(
    mode === "planes" ? "100" : null,
  );
  const [showBonds, setShowBonds] = useState(true);
  const [rotate, setRotate] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  const info = STRUCTURES.find((s) => s.id === structure) ?? STRUCTURES[3];
  const planeInfo = PLANES.find((p) => p.id === plane);

  return (
    <SceneFrame
      canvas={
        <SceneCanvas
          distance={cells * 2.9 + 1.4}
          autoRotate={rotate && !reducedMotion}
          label={
            mode === "planes"
              ? `Kisi silikon dengan bidang (${plane ?? "tidak ada"})`
              : `Kisi kristal ${info.name}, ${cells} sel satuan per sisi`
          }
        >
          <LatticeView
            structure={structure}
            cells={cells}
            showBonds={showBonds}
            plane={plane}
          />
        </SceneCanvas>
      }
      caption={
        mode === "planes"
          ? "Bidang jingga adalah bidang kristal yang dipilih. Atom yang terletak tepat di bidang itu ikut berwarna jingga."
          : "Garis biru menandai batas sel satuan. Batang abu-abu menghubungkan atom dengan tetangga terdekatnya."
      }
    >
      {mode === "structures" && (
        <ControlRow label="Struktur">
          {STRUCTURES.map((s) => (
            <Chip
              key={s.id}
              active={s.id === structure}
              onClick={() => setStructure(s.id)}
            >
              {s.name}
            </Chip>
          ))}
        </ControlRow>
      )}

      {mode === "planes" && (
        <ControlRow label="Bidang">
          {PLANES.map((p) => (
            <Chip key={p.id} active={p.id === plane} onClick={() => setPlane(p.id)}>
              ({p.id})
            </Chip>
          ))}
          <Chip active={plane === null} onClick={() => setPlane(null)}>
            Tanpa bidang
          </Chip>
        </ControlRow>
      )}

      <ControlRow label="Ukuran">
        {[1, 2, 3].map((n) => (
          <Chip key={n} active={n === cells} onClick={() => setCells(n)}>
            {n} × {n} × {n} sel
          </Chip>
        ))}
      </ControlRow>

      <ControlRow label="Tampilan">
        <Chip active={showBonds} onClick={() => setShowBonds((v) => !v)}>
          Ikatan
        </Chip>
        {!reducedMotion && (
          <Chip active={rotate} onClick={() => setRotate((v) => !v)}>
            Putar otomatis
          </Chip>
        )}
      </ControlRow>

      {mode === "structures" ? (
        <>
          <p className="text-sm text-muted">{info.note}</p>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Atom per sel satuan" value={info.atomsPerCell} />
            <Stat label="Tetangga terdekat" value={info.neighbors} />
            <Stat label="Ruang terisi" value={info.packing} />
            <Stat label="Contoh" value={<span className="text-sm">{info.examples}</span>} />
          </dl>
        </>
      ) : (
        <p className="text-sm text-muted">
          {planeInfo
            ? planeInfo.description
            : "Pilih salah satu bidang untuk melihat cara bidang itu memotong kristal."}
        </p>
      )}
    </SceneFrame>
  );
}
