function curve(centerX: number, baseY: number, opens: 1 | -1, width = 52) {
  const points = Array.from({ length: 41 }, (_, i) => {
    const t = (i - 20) / 20;
    const x = centerX + t * width;
    const y = baseY - opens * t * t * 34;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.join(" ");
}

const PANELS = [
  {
    title: "Celah langsung",
    examples: "GaAs, GaN",
    text: "Dasar pita konduksi tepat di atas puncak pita valensi. Elektron bisa turun dan langsung memancarkan cahaya.",
    conductionX: 80,
  },
  {
    title: "Celah tak langsung",
    examples: "Silikon, germanium",
    text: "Dasar pita konduksi bergeser ke samping. Elektron butuh bantuan getaran kisi untuk turun, sehingga jarang memancarkan cahaya.",
    conductionX: 118,
  },
];

export function DirectIndirect() {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {PANELS.map((panel) => {
        const indirect = panel.conductionX !== 80;
        return (
          <figure
            key={panel.title}
            className="rounded-2xl border border-line bg-surface p-4"
          >
            <svg
              viewBox="0 0 160 150"
              role="img"
              aria-label={`${panel.title}: ${panel.text}`}
              className="w-full"
            >
              <line x1="14" x2="14" y1="8" y2="138" stroke="var(--line)" />
              <line x1="14" x2="152" y1="138" y2="138" stroke="var(--line)" />
              <text x="6" y="14" fontSize="8" fill="var(--muted)">
                E
              </text>
              <text x="146" y="147" fontSize="8" fill="var(--muted)">
                k
              </text>
              {/* valence band: peak at centre */}
              <path d={curve(80, 96, -1)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
              {/* conduction band: valley */}
              <path
                d={curve(panel.conductionX, 46, 1, 38)}
                fill="none"
                stroke="var(--muted)"
                strokeWidth="2.5"
              />
              <circle cx={panel.conductionX} cy="46" r="4" fill="var(--warm)" />
              {indirect ? (
                <path
                  d={`M${panel.conductionX},52 L${panel.conductionX},70 L84,70 L80,90`}
                  fill="none"
                  stroke="var(--warm)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              ) : (
                <line x1="80" x2="80" y1="52" y2="90" stroke="var(--warm)" strokeWidth="1.5" />
              )}
              <path d="M76,86 L80,94 L84,86 Z" fill="var(--warm)" />
              <text x={panel.conductionX} y="8" textAnchor="middle" fontSize="8" fill="var(--muted)">
                pita konduksi
              </text>
              <text x="80" y="124" textAnchor="middle" fontSize="8" fill="var(--accent)">
                pita valensi
              </text>
            </svg>
            <figcaption className="mt-3">
              <p className="font-semibold">
                {panel.title}{" "}
                <span className="text-sm font-normal text-muted">
                  · {panel.examples}
                </span>
              </p>
              <p className="text-sm text-muted">{panel.text}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
