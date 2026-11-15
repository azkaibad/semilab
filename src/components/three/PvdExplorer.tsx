"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/lib/lattice";
import { usePrefersReducedMotion } from "@/lib/progress";
import { SceneCanvas } from "./SceneCanvas";
import { TextSprite } from "./TextSprite";
import { Chip, ControlRow, Slider, Stat } from "./controls";

const HX = 1.6;
const HY = 1.5;
const HZ = 1.2;
const SOURCE_Y = -HY + 0.22;
const ATOMS = 60;
const IONS = 26;
const RING = 0.55;
const FILM_COLOR = "#f5a524";
const ION_COLOR = "#c084fc";

type Method = "thermal" | "ebeam" | "sputter";
type Variant = "dc" | "rf" | "magnetron";
type Particle = { position: Vec3; velocity: Vec3 };

const randomUnit = (): Vec3 => {
  const v: Vec3 = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

const normalize = (v: Vec3): Vec3 => {
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

/** Random point on the part of the target that is being eroded. */
function targetPoint(magnetron: boolean): [number, number] {
  const angle = Math.random() * Math.PI * 2;
  const radius = magnetron ? RING + (Math.random() - 0.5) * 0.16 : Math.sqrt(Math.random()) * 0.85;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

function emitAtom(method: Method, magnetron: boolean): Particle {
  if (method === "sputter") {
    const [x, z] = targetPoint(magnetron);
    return {
      position: [x, SOURCE_Y, z],
      velocity: normalize([(Math.random() * 2 - 1) * 1.1, 1, (Math.random() * 2 - 1) * 1.1]),
    };
  }
  return {
    position: [0, SOURCE_Y, 0],
    velocity: normalize([(Math.random() * 2 - 1) * 0.6, 1, (Math.random() * 2 - 1) * 0.6]),
  };
}

function emitIon(magnetron: boolean): Particle {
  const [x, z] = targetPoint(magnetron);
  return {
    position: [x, SOURCE_Y + 0.25 + Math.random() * (magnetron ? 0.45 : 1.1), z],
    velocity: [0, -1, 0],
  };
}

function Particles({
  method,
  magnetron,
  power,
  moving,
}: {
  method: Method;
  magnetron: boolean;
  power: number;
  moving: boolean;
}) {
  const state = useRef<{ key: string; atoms: Particle[]; ions: Particle[] } | null>(null);
  const atomGroup = useRef<THREE.Group>(null);
  const ionGroup = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    const key = `${method}-${magnetron}`;
    if (!state.current || state.current.key !== key) {
      state.current = {
        key,
        atoms: Array.from({ length: ATOMS }, () => {
          const atom = emitAtom(method, magnetron);
          const head = Math.random() * 2.4;
          for (let axis = 0; axis < 3; axis++) atom.position[axis] += atom.velocity[axis] * head;
          return atom;
        }),
        ions: Array.from({ length: IONS }, () => emitIon(magnetron)),
      };
    }
    const delta = moving ? Math.min(rawDelta, 0.1) : 0;
    const active = Math.round(8 + power * (ATOMS - 8));
    const sputtering = method === "sputter";

    state.current.atoms.forEach((atom, i) => {
      const mesh = atomGroup.current?.children[i];
      if (!mesh) return;
      // Sputtered atoms travel through argon and get knocked off course now and then.
      if (sputtering && delta > 0 && Math.random() < delta * 1.2) {
        const kick = randomUnit();
        atom.velocity = normalize([
          atom.velocity[0] + kick[0] * 0.8,
          atom.velocity[1] + kick[1] * 0.8,
          atom.velocity[2] + kick[2] * 0.8,
        ]);
      }
      for (let axis = 0; axis < 3; axis++) atom.position[axis] += atom.velocity[axis] * delta * 1.6;
      const [x, y, z] = atom.position;
      if (Math.abs(x) > HX || y > HY - 0.1 || y < -HY || Math.abs(z) > HZ) {
        state.current!.atoms[i] = emitAtom(method, magnetron);
      }
      mesh.visible = i < active;
      mesh.position.set(...state.current!.atoms[i].position);
    });

    state.current.ions.forEach((ion, i) => {
      const mesh = ionGroup.current?.children[i];
      if (!mesh) return;
      mesh.visible = sputtering && i < Math.round(6 + power * (IONS - 6));
      if (!sputtering) return;
      ion.position[1] -= delta * 2.2;
      if (ion.position[1] < SOURCE_Y) state.current!.ions[i] = emitIon(magnetron);
      mesh.position.set(...state.current!.ions[i].position);
    });
  });

  return (
    <>
      <group ref={atomGroup}>
        {Array.from({ length: ATOMS }, (_, i) => (
          <mesh key={i} visible={false}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={FILM_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={ionGroup}>
        {Array.from({ length: IONS }, (_, i) => (
          <mesh key={i} visible={false}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color={ION_COLOR} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}

function Tool({ method, variant, power }: { method: Method; variant: Variant; power: number }) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(HX * 2, HY * 2, HZ * 2)),
    [],
  );
  const beam = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.8, -HY + 0.06, 0),
        new THREE.Vector3(-1.1, -HY + 0.5, 0),
        new THREE.Vector3(-0.65, -HY + 0.9, 0),
        new THREE.Vector3(-0.12, -HY + 0.6, 0),
        new THREE.Vector3(0, SOURCE_Y, 0),
      ]),
    [],
  );
  const magnetron = variant === "magnetron";

  return (
    <group>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#5b6690" />
      </lineSegments>
      <mesh position={[0, HY - 0.04, 0]}>
        <boxGeometry args={[2, 0.08, 1.6]} />
        <meshStandardMaterial color="#aab4d4" metalness={0.4} roughness={0.4} />
      </mesh>
      <TextSprite text="substrat" position={[0, HY + 0.3, 0]} height={0.26} color="#aab4d4" />

      {method === "thermal" && (
        <>
          <mesh position={[0, SOURCE_Y - 0.08, 0]}>
            <boxGeometry args={[1.1, 0.06, 0.32]} />
            <meshStandardMaterial color="#ffb060" emissive="#ff6a00" emissiveIntensity={0.4 + power * 2.2} />
          </mesh>
          {[-0.6, 0.6].map((x) => (
            <mesh key={x} position={[x, -HY + 0.08, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.2, 16]} />
              <meshStandardMaterial color="#c9ced9" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
          <mesh position={[0, SOURCE_Y - 0.02, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={FILM_COLOR} toneMapped={false} />
          </mesh>
          <TextSprite text="perahu tungsten" position={[0, -HY - 0.3, 0]} height={0.26} color="#ffb060" />
        </>
      )}

      {method === "ebeam" && (
        <>
          <mesh position={[0, -HY + 0.12, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.24, 28]} />
            <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, SOURCE_Y, 0]}>
            <sphereGeometry args={[0.09 + power * 0.05, 16, 16]} />
            <meshBasicMaterial color="#fff3c4" toneMapped={false} />
          </mesh>
          <mesh position={[-0.8, -HY + 0.05, 0]}>
            <boxGeometry args={[0.22, 0.1, 0.3]} />
            <meshStandardMaterial color="#ffb060" emissive="#ff6a00" emissiveIntensity={1.4} />
          </mesh>
          <mesh>
            <tubeGeometry args={[beam, 40, 0.012 + power * 0.02, 8, false]} />
            <meshBasicMaterial color="#5ad1ff" toneMapped={false} />
          </mesh>
          <TextSprite text="berkas elektron" position={[-1.05, -HY + 1.15, 0]} height={0.24} color="#5ad1ff" />
          <TextSprite text="krusibel tembaga" position={[0.2, -HY - 0.3, 0]} height={0.26} color="#d99a5b" />
        </>
      )}

      {method === "sputter" && (
        <>
          <mesh position={[0, SOURCE_Y - 0.07, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 0.12, 40]} />
            <meshStandardMaterial color="#d98b4a" metalness={0.6} roughness={0.35} />
          </mesh>
          {magnetron ? (
            <>
              <mesh position={[0, SOURCE_Y + 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[RING, 0.2, 16, 48]} />
                <meshBasicMaterial color="#a855f7" transparent opacity={0.3 + power * 0.25} depthWrite={false} />
              </mesh>
              <mesh position={[0, -HY + 0.05, 0]}>
                <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
              <mesh position={[0, -HY + 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.82, 0.07, 10, 40]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
            </>
          ) : (
            <mesh position={[0, -0.35, 0]} scale={[1.15, 0.8, 0.95]}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.1 + power * 0.12} depthWrite={false} />
            </mesh>
          )}
          <TextSprite text="plasma argon" position={[1.15, magnetron ? SOURCE_Y + 0.5 : -0.35, 0]} height={0.24} color={ION_COLOR} />
          <TextSprite text="target (katode)" position={[0, -HY - 0.3, 0]} height={0.26} color="#d98b4a" />
        </>
      )}
    </group>
  );
}

const METHODS: { id: Method; label: string }[] = [
  { id: "thermal", label: "Evaporasi termal" },
  { id: "ebeam", label: "Evaporasi e-beam" },
  { id: "sputter", label: "Sputtering" },
];
const VARIANTS: { id: Variant; label: string }[] = [
  { id: "dc", label: "DC" },
  { id: "rf", label: "RF" },
  { id: "magnetron", label: "Magnetron" },
];

const format = (value: number) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: value < 1 ? 2 : 1 });

function describe(method: Method, variant: Variant, power: number) {
  if (method === "thermal") {
    return {
      rate: 0.02 * 10 ** (power * 1.7),
      pressure: "10⁻⁶ mbar",
      energy: "sekitar 0,1 eV",
      materials: "Al, Au, Ag, Cr",
      text: "Arus listrik besar memanaskan perahu tungsten sampai bahan di atasnya meleleh dan menguap. Atom terbang lurus ke substrat. Sederhana dan murah, tetapi hanya cocok untuk bahan yang menguap di bawah kira-kira 1.500 °C.",
    };
  }
  if (method === "ebeam") {
    return {
      rate: 0.03 * 10 ** (power * 2.2),
      pressure: "10⁻⁶ mbar",
      energy: "sekitar 0,2 eV",
      materials: "Ti, Pt, W, SiO₂, hampir semua",
      text: "Berkas elektron berenergi sekitar 10 keV dibelokkan medan magnet dan menghantam satu titik pada bahan. Hanya titik itu yang meleleh, sedangkan krusibelnya didinginkan air. Bisa menguapkan bahan bertitik leleh tinggi dan hasilnya lebih murni.",
    };
  }
  if (variant === "dc") {
    return {
      rate: 0.03 + power * 0.25,
      pressure: "10⁻² mbar",
      energy: "beberapa eV",
      materials: "Logam dan penghantar lain",
      text: "Target diberi tegangan negatif beberapa ratus volt. Ion argon dari plasma tertarik ke target dan memukul lepas atom-atomnya. Hanya untuk target yang menghantar: pada target isolator muatan positif menumpuk dan plasma padam.",
    };
  }
  if (variant === "rf") {
    return {
      rate: 0.02 + power * 0.15,
      pressure: "10⁻² mbar",
      energy: "beberapa eV",
      materials: "Logam, oksida, nitrida, isolator",
      text: "Tegangan bolak-balik 13,56 MHz menggantikan tegangan searah. Pada setengah siklus positif, elektron menetralkan muatan yang menumpuk di target, sehingga target isolator pun bisa disputter. Lajunya lebih rendah daripada DC.",
    };
  }
  return {
    rate: 0.3 + power * 3,
    pressure: "10⁻³ mbar",
    energy: "beberapa eV",
    materials: "Hampir semua bahan",
    text: "Magnet di bawah target menjebak elektron di dekat permukaan target, sehingga plasma di sana jauh lebih rapat. Laju deposisi naik kira-kira sepuluh kali dan tekanan kerja bisa lebih rendah. Target terkikis membentuk alur melingkar. Inilah jenis yang dipakai di industri.",
  };
}

export default function PvdExplorer() {
  const [method, setMethod] = useState<Method>("thermal");
  const [variant, setVariant] = useState<Variant>("dc");
  const [power, setPower] = useState(0.6);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const info = describe(method, variant, power);
  const label = METHODS.find((item) => item.id === method)?.label ?? "";

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0b1020] sm:aspect-[16/9]">
        <SceneCanvas
          direction={[0.45, 0.25, 1]}
          distance={8.4}
          label={`Potongan alat ${label}: sumber di bawah, substrat di atas`}
        >
          <Tool method={method} variant={variant} power={power} />
          <Particles
            method={method}
            magnetron={variant === "magnetron"}
            power={power}
            moving={!paused && !reducedMotion}
          />
        </SceneCanvas>
        <p className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-white/55">
          Seret untuk memutar
        </p>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <ControlRow label="Metode">
          {METHODS.map((item) => (
            <Chip key={item.id} active={item.id === method} onClick={() => setMethod(item.id)}>
              {item.label}
            </Chip>
          ))}
        </ControlRow>
        {method === "sputter" && (
          <ControlRow label="Jenis">
            {VARIANTS.map((item) => (
              <Chip key={item.id} active={item.id === variant} onClick={() => setVariant(item.id)}>
                {item.label}
              </Chip>
            ))}
          </ControlRow>
        )}
        <Slider
          label="Daya"
          value={power}
          min={0.1}
          max={1}
          step={0.05}
          onChange={setPower}
          display={`${Math.round(power * 100)}%`}
        />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Laju deposisi kira-kira" value={`${format(info.rate)} nm/s`} />
          <Stat label="Tekanan kerja" value={info.pressure} />
          <Stat label="Energi atom saat tiba" value={<span className="text-sm">{info.energy}</span>} />
          <Stat label="Bahan yang cocok" value={<span className="text-sm">{info.materials}</span>} />
        </dl>
        <p className="text-sm text-muted">{info.text}</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>Titik jingga: atom bahan film</span>
          {method === "sputter" && <span>Titik ungu: ion argon</span>}
        </p>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="text-sm font-medium text-accent hover:underline"
          >
            {paused ? "Jalankan animasi" : "Jeda animasi"}
          </button>
        )}
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted sm:px-5">
        Gambar skematis, tidak berskala. Laju deposisi adalah perkiraan kasar
        untuk memperlihatkan perbandingan antarmetode, bukan data satu alat.
      </figcaption>
    </figure>
  );
}
