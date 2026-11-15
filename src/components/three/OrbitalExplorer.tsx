"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ORBITALS, sampleOrbital, type OrbitalId } from "@/lib/orbitals";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { Chip, ControlRow, SceneFrame } from "./controls";

function Cloud({ id, cut }: { id: OrbitalId; cut: boolean }) {
  const info = ORBITALS.find((o) => o.id === id) ?? ORBITALS[0];

  const geometry = useMemo(() => {
    const cloud = sampleOrbital(info, 7000, cut);
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    result.setAttribute("color", new THREE.BufferAttribute(cloud.colors, 3));
    return result;
  }, [info, cut]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          vertexColors
          size={info.range * 0.02}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <mesh>
        <sphereGeometry args={[info.range * 0.02, 16, 16]} />
        <meshBasicMaterial color="#e2536b" />
      </mesh>
    </>
  );
}

export default function OrbitalExplorer() {
  const [id, setId] = useState<OrbitalId>("1s");
  const [cut, setCut] = useState(false);
  const [rotate, setRotate] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const info = ORBITALS.find((o) => o.id === id) ?? ORBITALS[0];

  return (
    <SceneFrame
      canvas={
        <SceneCanvas
          distance={info.range * 3.1}
          autoRotate={rotate && !reducedMotion}
          label={`Awan peluang elektron untuk orbital ${info.name}`}
        >
          <Cloud id={id} cut={cut} />
        </SceneCanvas>
      }
      caption="Setiap titik adalah satu kemungkinan posisi elektron. Makin rapat titiknya, makin besar peluang elektron ditemukan di sana. Titik merah adalah inti."
    >
      <ControlRow label="Orbital">
        {ORBITALS.map((orbital) => (
          <Chip
            key={orbital.id}
            active={orbital.id === id}
            onClick={() => setId(orbital.id)}
          >
            {orbital.name}
          </Chip>
        ))}
      </ControlRow>
      <ControlRow label="Tampilan">
        <Chip active={cut} onClick={() => setCut((v) => !v)}>
          Irisan tengah
        </Chip>
        {!reducedMotion && (
          <Chip active={rotate} onClick={() => setRotate((v) => !v)}>
            Putar otomatis
          </Chip>
        )}
      </ControlRow>
      <p className="text-sm text-muted">{info.note}</p>
    </SceneFrame>
  );
}
