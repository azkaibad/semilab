"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { SHELL_NAMES } from "@/lib/elements";
import { TextSprite } from "./TextSprite";

const VALENCE_COLOR = "#f5a524";
const INNER_COLOR = "#7f8db3";

export function shellRadius(index: number) {
  return 1.1 + index * 0.75;
}

function Shell({
  index,
  electrons,
  isValence,
  moving,
}: {
  index: number;
  electrons: number;
  isValence: boolean;
  moving: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const radius = shellRadius(index);
  const speed = (index % 2 === 0 ? 1 : -1) * (0.5 / (index + 1));

  useFrame((_, delta) => {
    if (moving && group.current) group.current.rotation.z += delta * speed;
  });

  const color = isValence ? VALENCE_COLOR : INNER_COLOR;

  return (
    <>
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={isValence ? 0.7 : 0.35} />
      </mesh>
      <group ref={group}>
        {Array.from({ length: electrons }, (_, i) => {
          const angle = (i / electrons) * Math.PI * 2 + index * 0.4;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            >
              <sphereGeometry args={[isValence ? 0.11 : 0.075, 20, 20]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isValence ? 0.6 : 0.15}
              />
            </mesh>
          );
        })}
      </group>
      <TextSprite
        text={SHELL_NAMES[index]}
        position={[0, -radius, 0]}
        height={0.26}
        color={isValence ? "#1b1300" : "#b7c2e0"}
        background={isValence ? VALENCE_COLOR : "#1c2540"}
      />
    </>
  );
}

export function AtomView({
  shells,
  protons,
  moving,
}: {
  shells: number[];
  protons: number;
  moving: boolean;
}) {
  return (
    <group rotation={[-0.95, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#e2536b" roughness={0.4} />
      </mesh>
      <TextSprite text={`${protons}+`} height={0.3} />
      {shells.map((electrons, index) => (
        <Shell
          key={index}
          index={index}
          electrons={electrons}
          isValence={index === shells.length - 1}
          moving={moving}
        />
      ))}
    </group>
  );
}
