"use client";

import { useState } from "react";
import { ELEMENTS, SHELL_NAMES } from "@/lib/elements";
import { usePrefersReducedMotion } from "@/lib/progress";
import { AtomView, shellRadius } from "./AtomView";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, SceneFrame, Stat } from "./controls";

export default function AtomExplorer() {
  const [symbol, setSymbol] = useState("Si");
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const element = ELEMENTS.find((e) => e.symbol === symbol) ?? ELEMENTS[3];
  const valence = element.shells[element.shells.length - 1];
  const outer = shellRadius(element.shells.length - 1) + 0.4;

  return (
    <SceneFrame
      canvas={
        <SceneCanvas
          direction={[0, 0, 1]}
          distance={outer * 3.2}
          label={`Model kulit atom ${element.name}: ${element.shells.join(", ")} elektron per kulit`}
        >
          <AtomView
            shells={element.shells}
            protons={element.number}
            moving={!paused && !reducedMotion}
          />
        </SceneCanvas>
      }
      caption="Model kulit: inti merah di tengah, elektron mengelilinginya. Elektron jingga adalah elektron valensi."
    >
      <ControlRow label="Pilih unsur">
        {ELEMENTS.map((e) => (
          <Chip
            key={e.symbol}
            active={e.symbol === symbol}
            onClick={() => setSymbol(e.symbol)}
            title={e.name}
          >
            {e.symbol}
          </Chip>
        ))}
      </ControlRow>

      <div>
        <p className="text-lg font-semibold">
          {element.name}{" "}
          <span className="text-sm font-normal text-muted">· {element.group}</span>
        </p>
        <p className="mt-1 text-sm text-muted">{element.role}</p>
      </div>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Nomor atom" value={element.number} />
        <Stat label="Jumlah elektron" value={element.number} />
        <Stat
          label="Isi tiap kulit"
          value={element.shells
            .map((count, i) => `${SHELL_NAMES[i]} ${count}`)
            .join(" · ")}
        />
        <Stat label="Elektron valensi" value={valence} />
      </dl>

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
