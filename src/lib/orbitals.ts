export type OrbitalId = "1s" | "2s" | "2p" | "sp3";

export type OrbitalInfo = {
  id: OrbitalId;
  name: string;
  /** Half-width of the sampled cube, in Bohr radii. */
  range: number;
  note: string;
};

export const ORBITALS: OrbitalInfo[] = [
  {
    id: "1s",
    name: "1s",
    range: 4,
    note: "Berbentuk bola dan paling rapat di dekat inti. Inilah satu-satunya orbital di kulit K.",
  },
  {
    id: "2s",
    name: "2s",
    range: 11,
    note: "Juga berbentuk bola tetapi lebih besar, dengan lapisan kosong di dalamnya. Aktifkan “Irisan tengah” untuk melihat lapisan itu.",
  },
  {
    id: "2p",
    name: "2p",
    range: 10,
    note: "Dua cuping yang berseberangan, dengan peluang nol tepat di inti. Ada tiga orbital 2p yang arahnya saling tegak lurus.",
  },
  {
    id: "sp3",
    name: "Hibrida sp³",
    range: 10,
    note: "Satu orbital s dan tiga orbital p bercampur menjadi empat orbital yang setara. Keempatnya mengarah ke sudut tetrahedron, persis seperti arah ikatan silikon di Bab 2. Tiap warna menandai daerah tempat satu orbital paling kuat.",
  },
];

const SP3_DIRECTIONS = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
];

const SP3_COLORS = [
  [0.3, 0.42, 1.0],
  [1.0, 0.6, 0.05],
  [0.1, 0.85, 0.45],
  [1.0, 0.25, 0.35],
];

const SINGLE_COLOR = [0.35, 0.5, 1.0];

/** Hydrogen-like wavefunction (not normalised), lengths in Bohr radii. */
function psi(id: OrbitalId, x: number, y: number, z: number, lobe: number) {
  const r = Math.sqrt(x * x + y * y + z * z);
  switch (id) {
    case "1s":
      return Math.exp(-r);
    case "2s":
      return (2 - r) * Math.exp(-r / 2);
    case "2p":
      return y * Math.exp(-r / 2);
    case "sp3": {
      const [dx, dy, dz] = SP3_DIRECTIONS[lobe];
      return 0.5 * (2 - r - (dx * x + dy * y + dz * z)) * Math.exp(-r / 2);
    }
  }
}

/** Small deterministic random generator, so every visit draws the same cloud. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Cloud = { positions: Float32Array; colors: Float32Array };

/**
 * Points drawn with probability proportional to |ψ|²: where the cloud is
 * dense, the electron is likely to be found.
 */
export function sampleOrbital(info: OrbitalInfo, count: number, cut: boolean): Cloud {
  const random = mulberry32(12345);
  const lobes = info.id === "sp3" ? 4 : 1;
  const perLobe = Math.floor(count / lobes);
  const positions: number[] = [];
  const colors: number[] = [];
  const R = info.range;
  const point = () => (random() * 2 - 1) * R;
  // In slice mode only a thin slab through the nucleus is sampled.
  const depth = () => (cut ? point() * 0.04 : point());
  const density = (x: number, y: number, z: number, lobe: number) =>
    psi(info.id, x, y, z, lobe) ** 2;

  for (let lobe = 0; lobe < lobes; lobe++) {
    let peak = density(0, 0, 0, lobe);
    for (let i = 0; i < 20000; i++) {
      peak = Math.max(peak, density(point(), point(), depth(), lobe));
    }
    peak *= 1.2;

    const color = lobes > 1 ? SP3_COLORS[lobe] : SINGLE_COLOR;
    let accepted = 0;
    for (let tries = 0; accepted < perLobe && tries < 6_000_000; tries++) {
      const x = point();
      const y = point();
      const z = depth();
      const value = density(x, y, z, lobe);
      if (random() * peak > value) continue;
      // The four hybrids overlap heavily. Each one is drawn only where it is
      // the strongest of the four, so its lobe stays recognisable.
      if (lobes > 1) {
        let strongest = true;
        for (let other = 0; other < lobes && strongest; other++) {
          if (other !== lobe && density(x, y, z, other) > value) strongest = false;
        }
        if (!strongest) continue;
      }
      accepted++;
      positions.push(x, y, z);
      colors.push(color[0], color[1], color[2]);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}
