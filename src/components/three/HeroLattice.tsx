"use client";

import { usePrefersReducedMotion } from "@/lib/progress";
import { LatticeView } from "./LatticeView";
import { SceneCanvas } from "./SceneCanvas";

export default function HeroLattice() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <SceneCanvas
      distance={7.4}
      autoRotate={!reducedMotion}
      label="Kisi kristal silikon yang berputar"
    >
      <LatticeView structure="diamond" cells={2} />
    </SceneCanvas>
  );
}
