"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/progress";

const WIDTH = 640;
const HEIGHT = 220;
const COUNT = 420;
const BINS = 32;

export function DiffusionSim() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = !paused && !reducedMotion;
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;

    const style = getComputedStyle(element);
    const dotColor = style.getPropertyValue("--accent").trim() || "#8296ff";
    const barColor = style.getPropertyValue("--warm").trim() || "#f5a524";

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * WIDTH * 0.12,
      y: Math.random() * HEIGHT,
    }));

    let frame = 0;
    const draw = () => {
      if (runningRef.current) {
        for (const particle of particles) {
          particle.x += (Math.random() - 0.5) * 9;
          particle.y += (Math.random() - 0.5) * 9;
          if (particle.x < 0) particle.x = -particle.x;
          if (particle.x > WIDTH) particle.x = 2 * WIDTH - particle.x;
          if (particle.y < 0) particle.y = -particle.y;
          if (particle.y > HEIGHT) particle.y = 2 * HEIGHT - particle.y;
        }
      }

      context.clearRect(0, 0, WIDTH, HEIGHT);

      const bins = new Array<number>(BINS).fill(0);
      for (const particle of particles) {
        bins[Math.min(BINS - 1, Math.floor((particle.x / WIDTH) * BINS))]++;
      }
      const binWidth = WIDTH / BINS;
      context.fillStyle = barColor;
      context.globalAlpha = 0.28;
      bins.forEach((count, i) => {
        const height = Math.min(HEIGHT, (count / COUNT) * HEIGHT * 4.5);
        context.fillRect(i * binWidth, HEIGHT - height, binWidth - 1, height);
      });

      context.globalAlpha = 0.9;
      context.fillStyle = dotColor;
      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <canvas
        ref={canvas}
        width={WIDTH}
        height={HEIGHT}
        role="img"
        aria-label="Simulasi difusi: partikel yang semula berkumpul di sisi kiri perlahan menyebar merata"
        className="block w-full bg-bg"
      />
      <div className="flex flex-wrap gap-2 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
        >
          Ulangi dari awal
        </button>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="min-h-9 rounded-lg border border-line bg-bg px-3 text-sm font-medium hover:border-accent"
          >
            {paused ? "Lanjutkan" : "Jeda"}
          </button>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Titik biru adalah pembawa muatan, batang jingga adalah konsentrasinya di
        tiap posisi. Tidak ada gaya yang mendorong ke kanan. Setiap partikel
        hanya bergerak acak, tetapi hasil akhirnya tetap menyebar merata.
      </figcaption>
    </figure>
  );
}
