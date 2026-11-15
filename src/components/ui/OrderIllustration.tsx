type Point = { x: number; y: number; color: string };

const SIZE = 120;
const STEP = 15;

function hash(i: number, j: number) {
  const value = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function singleCrystal(): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      points.push({
        x: STEP / 2 + i * STEP,
        y: STEP / 2 + j * STEP,
        color: "var(--accent)",
      });
    }
  }
  return points;
}

const GRAINS = [
  { x: 28, y: 34, angle: 0.2, color: "var(--accent)" },
  { x: 92, y: 30, angle: -0.45, color: "var(--warm)" },
  { x: 40, y: 96, angle: 0.7, color: "var(--ok)" },
  { x: 96, y: 92, angle: 1.1, color: "var(--bad)" },
];

function polycrystal(): Point[] {
  const points: Point[] = [];
  GRAINS.forEach((grain, index) => {
    const cos = Math.cos(grain.angle);
    const sin = Math.sin(grain.angle);
    for (let i = -10; i <= 10; i++) {
      for (let j = -10; j <= 10; j++) {
        const x = grain.x + (i * cos - j * sin) * STEP;
        const y = grain.y + (i * sin + j * cos) * STEP;
        if (x < 5 || x > SIZE - 5 || y < 5 || y > SIZE - 5) continue;
        const distances = GRAINS.map((g) => Math.hypot(x - g.x, y - g.y));
        const nearest = distances.indexOf(Math.min(...distances));
        const margin = [...distances].sort((a, b) => a - b);
        if (nearest !== index || margin[1] - margin[0] < 5) continue;
        points.push({ x, y, color: grain.color });
      }
    }
  });
  return points;
}

function amorphous(): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      points.push({
        x: STEP / 2 + i * STEP + (hash(i, j) - 0.5) * 11,
        y: STEP / 2 + j * STEP + (hash(j + 20, i + 7) - 0.5) * 11,
        color: "var(--muted)",
      });
    }
  }
  return points;
}

const PANELS = [
  {
    title: "Kristal tunggal",
    text: "Satu pola teratur dari ujung ke ujung.",
    points: singleCrystal(),
  },
  {
    title: "Polikristal",
    text: "Banyak butir kristal kecil dengan arah berbeda-beda.",
    points: polycrystal(),
  },
  {
    title: "Amorf",
    text: "Tidak ada keteraturan jarak jauh.",
    points: amorphous(),
  },
];

export function OrderIllustration() {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-3">
      {PANELS.map((panel) => (
        <figure
          key={panel.title}
          className="rounded-2xl border border-line bg-surface p-4"
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={`${panel.title}: ${panel.text}`}
            className="w-full"
          >
            {panel.points.map((point, i) => (
              <circle
                key={i}
                cx={point.x.toFixed(2)}
                cy={point.y.toFixed(2)}
                r="3.2"
                fill={point.color}
              />
            ))}
          </svg>
          <figcaption className="mt-3">
            <p className="font-semibold">{panel.title}</p>
            <p className="text-sm text-muted">{panel.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
