"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { buildLattice, type Vec3 } from "@/lib/lattice";
import { Atoms, Bonds, CellFrame } from "./LatticeView";
import { TextSprite } from "./TextSprite";

export type DopantKind = "none" | "n" | "p";

const CELLS = 2;
const SILICON = "#9db4e6";
const DONOR = "#34d399";
const ACCEPTOR = "#f472b6";
export const ELECTRON_COLOR = "#5ad1ff";
export const HOLE_COLOR = "#f5a524";

type Structure = {
  atoms: Vec3[];
  bonds: [Vec3, Vec3][];
  bondAtoms: [number, number][];
  bondsOfAtom: number[][];
  midpoints: Vec3[];
  /** Atoms with all four neighbours, ordered so the first few are far apart. */
  sites: number[];
};

function buildStructure(): Structure {
  const { atoms, bonds } = buildLattice("diamond", CELLS);
  const indexOf = new Map(atoms.map((atom, i) => [atom, i]));
  const bondAtoms = bonds.map(
    ([a, b]): [number, number] => [indexOf.get(a)!, indexOf.get(b)!],
  );
  const bondsOfAtom: number[][] = atoms.map(() => []);
  bondAtoms.forEach(([a, b], i) => {
    bondsOfAtom[a].push(i);
    bondsOfAtom[b].push(i);
  });
  const midpoints = bonds.map(
    ([a, b]): Vec3 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2],
  );

  const distance = (i: number, j: number) =>
    Math.hypot(
      atoms[i][0] - atoms[j][0],
      atoms[i][1] - atoms[j][1],
      atoms[i][2] - atoms[j][2],
    );
  const interior = atoms.map((_, i) => i).filter((i) => bondsOfAtom[i].length === 4);
  const sites = [interior[0]];
  while (sites.length < Math.min(6, interior.length)) {
    let best = interior[0];
    let bestGap = -1;
    for (const candidate of interior) {
      const gap = Math.min(...sites.map((site) => distance(site, candidate)));
      if (gap > bestGap) {
        bestGap = gap;
        best = candidate;
      }
    }
    sites.push(best);
  }

  return { atoms, bonds, bondAtoms, bondsOfAtom, midpoints, sites };
}

type Electron = { position: Vec3; velocity: Vec3 };
type Hole = { from: number; to: number; progress: number };
type Simulation = { key: string; electrons: Electron[]; holes: Hole[] };

const randomUnit = (): Vec3 => {
  const v: Vec3 = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

type Props = {
  dopant: DopantKind;
  dopantCount: number;
  /** Thermally generated electron–hole pairs to draw. */
  pairs: number;
  moving: boolean;
  /** Electric field strength along +x, from 0 (none) to 1 (strong). */
  field?: number;
};

export function CarrierLattice({ dopant, dopantCount, pairs, moving, field = 0 }: Props) {
  const structure = useMemo(() => buildStructure(), []);
  const dopantSites = useMemo(
    () => (dopant === "none" ? [] : structure.sites.slice(0, dopantCount)),
    [structure, dopant, dopantCount],
  );

  const colors = useMemo(
    () =>
      structure.atoms.map((_, i) =>
        dopantSites.includes(i) ? (dopant === "n" ? DONOR : ACCEPTOR) : SILICON,
      ),
    [structure, dopantSites, dopant],
  );

  const electronCount = pairs + (dopant === "n" ? dopantSites.length : 0);
  const holeCount = pairs + (dopant === "p" ? dopantSites.length : 0);
  const key = `${dopant}-${dopantSites.length}-${pairs}`;

  const simulation = useRef<Simulation | null>(null);
  const electronGroup = useRef<THREE.Group>(null);
  const holeGroup = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    const { atoms, bondAtoms, bondsOfAtom, midpoints } = structure;

    if (simulation.current?.key !== key) {
      const neighbourBond = (bond: number) => {
        const [a, b] = bondAtoms[bond];
        return pick([...bondsOfAtom[a], ...bondsOfAtom[b]].filter((i) => i !== bond));
      };
      const thermalBonds = Array.from({ length: pairs }, () =>
        Math.floor(Math.random() * midpoints.length),
      );
      const electrons: Electron[] = [
        ...(dopant === "n" ? dopantSites.map((site) => atoms[site]) : []),
        ...thermalBonds.map((bond) => midpoints[bond]),
      ].map((start) => ({ position: [...start] as Vec3, velocity: randomUnit() }));
      const holes: Hole[] = [
        ...(dopant === "p" ? dopantSites.map((site) => bondsOfAtom[site][0]) : []),
        ...thermalBonds,
      ].map((bond) => ({ from: bond, to: neighbourBond(bond), progress: Math.random() }));
      simulation.current = { key, electrons, holes };
    }

    const delta = moving ? Math.min(rawDelta, 0.05) : 0;
    const { electrons, holes } = simulation.current;

    electrons.forEach((electron, i) => {
      const { position, velocity } = electron;
      const kick = randomUnit();
      for (let axis = 0; axis < 3; axis++) {
        velocity[axis] += kick[axis] * delta * 6;
      }
      const speed = Math.hypot(...velocity) || 1;
      for (let axis = 0; axis < 3; axis++) {
        velocity[axis] /= speed;
        position[axis] += velocity[axis] * delta * 0.9;
        if (axis === 0 && field > 0) {
          // Electrons are negative: they drift against the field and re-enter
          // from the other side, like current through a wire.
          position[0] -= field * delta * 1.3;
          if (position[0] < 0) position[0] += CELLS;
          if (position[0] > CELLS) position[0] -= CELLS;
        } else if (position[axis] < 0 || position[axis] > CELLS) {
          position[axis] = Math.min(CELLS, Math.max(0, position[axis]));
          velocity[axis] *= -1;
        }
      }
      electronGroup.current?.children[i]?.position.set(...position);
    });

    holes.forEach((hole, i) => {
      hole.progress += delta / 1.1;
      if (hole.progress >= 1) {
        const [a, b] = bondAtoms[hole.to];
        const options = [...bondsOfAtom[a], ...bondsOfAtom[b]].filter(
          (bond) => bond !== hole.to && bond !== hole.from,
        );
        hole.from = hole.to;
        hole.to = pick(options);
        hole.progress = 0;
        if (field > 0 && Math.random() < 0.35 + field * 0.6) {
          // Holes are positive: they prefer the hop that goes along the field.
          const here = midpoints[hole.from][0];
          const forward = options.reduce((best, bond) =>
            midpoints[bond][0] > midpoints[best][0] ? bond : best,
          );
          if (midpoints[forward][0] > here + 0.01) {
            hole.to = forward;
          } else {
            // Reached the far side: re-enter from the near side.
            const entry = pick(
              midpoints.map((_, bond) => bond).filter((bond) => midpoints[bond][0] < 0.3),
            );
            hole.from = entry;
            hole.to = pick(
              [...bondsOfAtom[bondAtoms[entry][0]], ...bondsOfAtom[bondAtoms[entry][1]]].filter(
                (bond) => bond !== entry,
              ),
            );
          }
        }
      }
      const t = hole.progress * hole.progress * (3 - 2 * hole.progress);
      const start = midpoints[hole.from];
      const end = midpoints[hole.to];
      holeGroup.current?.children[i]?.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t,
      );
    });
  });

  const offset = -CELLS / 2;

  return (
    <group position={[offset, offset, offset]}>
      <Atoms positions={structure.atoms} colors={colors} radius={0.085} />
      <Bonds bonds={structure.bonds} radius={0.02} />
      <CellFrame n={CELLS} />

      {dopantSites.map((site) => (
        <group key={site} position={structure.atoms[site]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={dopant === "n" ? DONOR : ACCEPTOR}
              emissive={dopant === "n" ? DONOR : ACCEPTOR}
              emissiveIntensity={0.35}
            />
          </mesh>
          <TextSprite
            text={dopant === "n" ? "P" : "B"}
            position={[0, 0.27, 0]}
            height={0.2}
            color="#0b1020"
            background={dopant === "n" ? DONOR : ACCEPTOR}
          />
        </group>
      ))}

      <group ref={electronGroup} key={`e-${electronCount}`}>
        {Array.from({ length: electronCount }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshBasicMaterial color={ELECTRON_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>

      <group ref={holeGroup} key={`h-${holeCount}`}>
        {Array.from({ length: holeCount }, (_, i) => (
          <mesh key={i}>
            <torusGeometry args={[0.075, 0.022, 10, 24]} />
            <meshBasicMaterial color={HOLE_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
