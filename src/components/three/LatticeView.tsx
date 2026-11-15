"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  buildLattice,
  isOnPlane,
  planeVertices,
  PLANES,
  type PlaneId,
  type StructureId,
  type Vec3,
} from "@/lib/lattice";

const ATOM_COLOR = "#9db4e6";
const PLANE_COLOR = "#f5a524";
const BOND_COLOR = "#5b6b95";

export function Atoms({
  positions,
  colors,
  radius,
}: {
  positions: Vec3[];
  colors: string[];
  radius: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    positions.forEach((p, i) => {
      matrix.makeTranslation(p[0], p[1], p[2]);
      mesh.setMatrixAt(i, matrix);
      mesh.setColorAt(i, color.set(colors[i]));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [positions, colors]);

  return (
    <instancedMesh
      key={positions.length}
      ref={ref}
      args={[undefined, undefined, positions.length]}
      frustumCulled={false}
    >
      <sphereGeometry args={[radius, 28, 28]} />
      <meshStandardMaterial roughness={0.35} metalness={0.15} />
    </instancedMesh>
  );
}

export function Bonds({ bonds, radius }: { bonds: [Vec3, Vec3][]; radius: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const up = new THREE.Vector3(0, 1, 0);
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const middle = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const matrix = new THREE.Matrix4();
    bonds.forEach(([start, end], i) => {
      a.set(...start);
      b.set(...end);
      direction.subVectors(b, a);
      const length = direction.length();
      middle.addVectors(a, b).multiplyScalar(0.5);
      rotation.setFromUnitVectors(up, direction.normalize());
      scale.set(1, length, 1);
      mesh.setMatrixAt(i, matrix.compose(middle, rotation, scale));
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [bonds]);

  if (bonds.length === 0) return null;

  return (
    <instancedMesh
      key={bonds.length}
      ref={ref}
      args={[undefined, undefined, bonds.length]}
      frustumCulled={false}
    >
      <cylinderGeometry args={[radius, radius, 1, 10]} />
      <meshStandardMaterial color={BOND_COLOR} roughness={0.6} />
    </instancedMesh>
  );
}

export function CellFrame({ n }: { n: number }) {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const push = (a: Vec3, b: Vec3) => points.push(...a, ...b);
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        push([i, j, 0], [i, j, n]);
        push([i, 0, j], [i, n, j]);
        push([0, i, j], [n, i, j]);
      }
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return result;
  }, [n]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#7c93ff" transparent opacity={0.45} />
    </lineSegments>
  );
}

function PlaneSurface({ plane, n }: { plane: PlaneId; n: number }) {
  const geometry = useMemo(() => {
    const vertices = planeVertices(plane, n);
    const result = new THREE.BufferGeometry();
    result.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices.flat(), 3),
    );
    result.setIndex(vertices.length === 4 ? [0, 1, 2, 0, 2, 3] : [0, 1, 2]);
    return result;
  }, [plane, n]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={PLANE_COLOR}
        transparent
        opacity={0.28}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

type Props = {
  structure: StructureId;
  cells: number;
  showBonds?: boolean;
  showFrame?: boolean;
  plane?: PlaneId | null;
};

export function LatticeView({
  structure,
  cells,
  showBonds = true,
  showFrame = true,
  plane = null,
}: Props) {
  const lattice = useMemo(() => buildLattice(structure, cells), [structure, cells]);

  const colors = useMemo(() => {
    const info = PLANES.find((p) => p.id === plane);
    return lattice.atoms.map((atom) =>
      info && isOnPlane(atom, info, cells) ? PLANE_COLOR : ATOM_COLOR,
    );
  }, [lattice, plane, cells]);

  const atomRadius = structure === "diamond" ? 0.085 : 0.11;
  const offset = -cells / 2;

  return (
    <group position={[offset, offset, offset]}>
      <Atoms positions={lattice.atoms} colors={colors} radius={atomRadius} />
      {showBonds && <Bonds bonds={lattice.bonds} radius={0.022} />}
      {showFrame && <CellFrame n={cells} />}
      {plane && <PlaneSurface plane={plane} n={cells} />}
    </group>
  );
}
