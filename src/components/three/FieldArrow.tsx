"use client";

import { TextSprite } from "./TextSprite";

/** Arrow along the x axis with a label, used to show field or flow direction. */
export function FieldArrow({
  position,
  length,
  direction = 1,
  label,
  color = "#f5a524",
}: {
  position: [number, number, number];
  length: number;
  direction?: 1 | -1;
  label: string;
  color?: string;
}) {
  const head = 0.28;
  const shaft = Math.max(0.05, length - head);
  return (
    <group position={position} scale={[direction, 1, 1]}>
      <mesh position={[-head / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, shaft, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[length / 2 - head / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.11, head, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <group scale={[direction, 1, 1]}>
        <TextSprite text={label} position={[0, 0.3, 0]} height={0.26} color={color} />
      </group>
    </group>
  );
}
