"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/lib/lattice";
import { ELECTRON_COLOR, HOLE_COLOR } from "./CarrierLattice";
import { FieldArrow } from "./FieldArrow";
import { TextSprite } from "./TextSprite";

const HALF_LENGTH = 4;
const HALF_HEIGHT = 1;
const PER_SIDE = 26;
const ACCEPTOR = "#f472b6";
const DONOR = "#34d399";

type Carrier = {
  position: Vec3;
  velocity: Vec3;
  /** Distance past the junction at which a crossed carrier recombines; 0 while at home. */
  crossed: number;
};

const randomUnit = (): Vec3 => {
  const v: Vec3 = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

function spawn(side: -1 | 1, atContact: boolean): Carrier {
  const x = atContact
    ? side * (HALF_LENGTH - 0.05)
    : side * (1.8 + Math.random() * (HALF_LENGTH - 1.9));
  return {
    position: [
      x,
      (Math.random() * 2 - 1) * HALF_HEIGHT * 0.9,
      (Math.random() * 2 - 1) * HALF_HEIGHT * 0.9,
    ],
    velocity: randomUnit(),
    crossed: 0,
  };
}

type Props = {
  /** Half of the depletion width, in scene units. */
  halfWidth: number;
  /** Chance that a carrier hitting the depletion edge gets across, 0 to 1. */
  crossing: number;
  /** Relative strength of the field in the depletion region, 0 to 1. */
  fieldStrength: number;
  moving: boolean;
};

export function JunctionScene({ halfWidth, crossing, fieldStrength, moving }: Props) {
  const carriers = useRef<{ holes: Carrier[]; electrons: Carrier[] } | null>(null);
  const holeGroup = useRef<THREE.Group>(null);
  const electronGroup = useRef<THREE.Group>(null);

  const ions = useMemo(() => {
    const list: Vec3[] = [];
    for (let i = 0; i < 9; i++)
      for (const y of [-0.6, 0, 0.6])
        for (const z of [-0.5, 0.5]) list.push([0.2 + i * 0.4, y, z]);
    return list;
  }, []);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, HALF_HEIGHT * 2, HALF_HEIGHT * 2)),
    [],
  );

  useFrame((_, rawDelta) => {
    if (!carriers.current) {
      carriers.current = {
        holes: Array.from({ length: PER_SIDE }, () => spawn(-1, false)),
        electrons: Array.from({ length: PER_SIDE }, () => spawn(1, false)),
      };
    }
    const delta = moving ? Math.min(rawDelta, 0.05) : 0;

    // `side` is the home side: -1 for holes (p region), +1 for electrons (n region).
    const step = (list: Carrier[], side: -1 | 1, group: THREE.Group | null) => {
      list.forEach((carrier, i) => {
        const { position, velocity } = carrier;
        const kick = randomUnit();
        for (let axis = 0; axis < 3; axis++) velocity[axis] += kick[axis] * delta * 5;
        const speed = Math.hypot(...velocity) || 1;
        for (let axis = 0; axis < 3; axis++) {
          velocity[axis] /= speed;
          position[axis] += velocity[axis] * delta * 1.1;
        }
        for (const axis of [1, 2]) {
          if (Math.abs(position[axis]) > HALF_HEIGHT * 0.95) {
            position[axis] = Math.sign(position[axis]) * HALF_HEIGHT * 0.95;
            velocity[axis] *= -1;
          }
        }

        // Work in a mirrored coordinate where home is always at negative u.
        let u = position[0] * -side;
        if (carrier.crossed > 0) {
          u += delta * 1.2;
          if (u > carrier.crossed || u > HALF_LENGTH) {
            list[i] = spawn(side, true);
            return;
          }
        } else {
          if (u < -HALF_LENGTH) {
            u = -HALF_LENGTH;
            velocity[0] *= -1;
          }
          if (u > -halfWidth) {
            if (delta > 0 && Math.random() < crossing) {
              carrier.crossed = halfWidth + 0.6 + Math.random() * 1.8;
            } else {
              u = -halfWidth;
              velocity[0] = side * Math.abs(velocity[0]);
            }
          }
        }
        position[0] = u * -side;
        group?.children[i]?.position.set(...position);
      });
    };

    step(carriers.current.holes, -1, holeGroup.current);
    step(carriers.current.electrons, 1, electronGroup.current);
  });

  const regionSize: Vec3 = [HALF_LENGTH, HALF_HEIGHT * 2, HALF_HEIGHT * 2];

  return (
    <group>
      <mesh position={[-HALF_LENGTH / 2, 0, 0]}>
        <boxGeometry args={regionSize} />
        <meshBasicMaterial color={ACCEPTOR} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[HALF_LENGTH / 2, 0, 0]}>
        <boxGeometry args={regionSize} />
        <meshBasicMaterial color={DONOR} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges} scale={[halfWidth * 2, 1, 1]}>
        <lineBasicMaterial color="#f5a524" />
      </lineSegments>

      {ions.map((ion, i) => (
        <group key={i} visible={ion[0] < halfWidth}>
          <mesh position={[-ion[0], ion[1], ion[2]]}>
            <boxGeometry args={[0.11, 0.11, 0.11]} />
            <meshBasicMaterial color={ACCEPTOR} toneMapped={false} />
          </mesh>
          <mesh position={ion}>
            <boxGeometry args={[0.11, 0.11, 0.11]} />
            <meshBasicMaterial color={DONOR} toneMapped={false} />
          </mesh>
        </group>
      ))}

      <group ref={holeGroup}>
        {Array.from({ length: PER_SIDE }, (_, i) => (
          <mesh key={i}>
            <torusGeometry args={[0.085, 0.026, 10, 24]} />
            <meshBasicMaterial color={HOLE_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={electronGroup}>
        {Array.from({ length: PER_SIDE }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshBasicMaterial color={ELECTRON_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>

      <FieldArrow
        position={[0, HALF_HEIGHT + 0.35, 0]}
        length={0.5 + fieldStrength * 1.3}
        direction={-1}
        label="E"
      />
      <TextSprite text="tipe-p" position={[-2.8, HALF_HEIGHT + 0.45, 0]} height={0.3} color={ACCEPTOR} />
      <TextSprite text="tipe-n" position={[2.8, HALF_HEIGHT + 0.45, 0]} height={0.3} color={DONOR} />
      <TextSprite text="daerah deplesi" position={[0, -HALF_HEIGHT - 0.4, 0]} height={0.26} color="#f5a524" />
    </group>
  );
}
