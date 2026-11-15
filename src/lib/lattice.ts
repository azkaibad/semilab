export type Vec3 = [number, number, number];
export type StructureId = "sc" | "bcc" | "fcc" | "diamond";
export type PlaneId = "100" | "110" | "111";

const FCC_BASIS: Vec3[] = [
  [0, 0, 0],
  [0, 0.5, 0.5],
  [0.5, 0, 0.5],
  [0.5, 0.5, 0],
];

const BASIS: Record<StructureId, Vec3[]> = {
  sc: [[0, 0, 0]],
  bcc: [
    [0, 0, 0],
    [0.5, 0.5, 0.5],
  ],
  fcc: FCC_BASIS,
  diamond: [
    ...FCC_BASIS,
    ...FCC_BASIS.map(([x, y, z]): Vec3 => [x + 0.25, y + 0.25, z + 0.25]),
  ],
};

/** Nearest-neighbour distance in units of the lattice constant a. */
const BOND_LENGTH: Record<StructureId, number> = {
  sc: 1,
  bcc: Math.sqrt(3) / 2,
  fcc: Math.SQRT1_2,
  diamond: Math.sqrt(3) / 4,
};

export type StructureInfo = {
  id: StructureId;
  name: string;
  atomsPerCell: number;
  neighbors: number;
  packing: string;
  examples: string;
  note: string;
};

export const STRUCTURES: StructureInfo[] = [
  {
    id: "sc",
    name: "Kubik sederhana",
    atomsPerCell: 1,
    neighbors: 6,
    packing: "52%",
    examples: "Polonium",
    note: "Atom hanya ada di delapan sudut kubus. Sangat jarang di alam karena banyak ruang kosong.",
  },
  {
    id: "bcc",
    name: "Kubik pusat badan (BCC)",
    atomsPerCell: 2,
    neighbors: 8,
    packing: "68%",
    examples: "Besi, tungsten, kromium",
    note: "Sudut kubus ditambah satu atom tepat di tengah kubus.",
  },
  {
    id: "fcc",
    name: "Kubik pusat muka (FCC)",
    atomsPerCell: 4,
    neighbors: 12,
    packing: "74%",
    examples: "Aluminium, tembaga, emas",
    note: "Sudut kubus ditambah satu atom di tengah setiap sisi. Susunan bola paling rapat.",
  },
  {
    id: "diamond",
    name: "Intan",
    atomsPerCell: 8,
    neighbors: 4,
    packing: "34%",
    examples: "Silikon, germanium, intan",
    note: "Dua kisi FCC yang digeser seperempat diagonal ruang. Setiap atom punya tepat empat tetangga.",
  },
];

export type Lattice = {
  atoms: Vec3[];
  bonds: [Vec3, Vec3][];
};

/** Atoms and nearest-neighbour bonds for n × n × n unit cells, in units of a. */
export function buildLattice(id: StructureId, n: number): Lattice {
  const seen = new Set<string>();
  const atoms: Vec3[] = [];
  const limit = n + 1e-6;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      for (let k = 0; k <= n; k++) {
        for (const [bx, by, bz] of BASIS[id]) {
          const p: Vec3 = [i + bx, j + by, k + bz];
          if (p[0] > limit || p[1] > limit || p[2] > limit) continue;
          const key = p.map((v) => v.toFixed(3)).join(",");
          if (seen.has(key)) continue;
          seen.add(key);
          atoms.push(p);
        }
      }
    }
  }

  const bonds: [Vec3, Vec3][] = [];
  const target = BOND_LENGTH[id];
  for (let a = 0; a < atoms.length; a++) {
    for (let b = a + 1; b < atoms.length; b++) {
      const d = Math.hypot(
        atoms[a][0] - atoms[b][0],
        atoms[a][1] - atoms[b][1],
        atoms[a][2] - atoms[b][2],
      );
      if (Math.abs(d - target) < 1e-3) bonds.push([atoms[a], atoms[b]]);
    }
  }

  return { atoms, bonds };
}

export type PlaneInfo = {
  id: PlaneId;
  normal: Vec3;
  description: string;
};

export const PLANES: PlaneInfo[] = [
  {
    id: "100",
    normal: [1, 0, 0],
    description:
      "Memotong sumbu x di 1 dan sejajar sumbu y dan z. Ini sisi kubus. Wafer silikon untuk rangkaian terpadu umumnya dipotong pada bidang ini.",
  },
  {
    id: "110",
    normal: [1, 1, 0],
    description:
      "Memotong sumbu x dan y di 1, sejajar sumbu z. Bidang ini membelah kubus secara diagonal.",
  },
  {
    id: "111",
    normal: [1, 1, 1],
    description:
      "Memotong ketiga sumbu di 1. Atom pada bidang ini tersusun paling rapat, membentuk pola segitiga.",
  },
];

/** Corner points of the plane h·x + k·y + l·z = n inside the cube [0, n]³. */
export function planeVertices(id: PlaneId, n: number): Vec3[] {
  switch (id) {
    case "100":
      return [
        [n, 0, 0],
        [n, n, 0],
        [n, n, n],
        [n, 0, n],
      ];
    case "110":
      return [
        [n, 0, 0],
        [0, n, 0],
        [0, n, n],
        [n, 0, n],
      ];
    case "111":
      return [
        [n, 0, 0],
        [0, n, 0],
        [0, 0, n],
      ];
  }
}

export function isOnPlane(point: Vec3, plane: PlaneInfo, n: number) {
  const [h, k, l] = plane.normal;
  return Math.abs(h * point[0] + k * point[1] + l * point[2] - n) < 1e-3;
}
