import { K_B } from "./semiconductor";

const Q = 1.602e-19;
/** Permittivity of silicon, F/cm. */
const EPS_SI = 11.7 * 8.854e-14;
const NI = 1.0e10;
/** Thermal voltage kT/q at 300 K, in volts. */
export const V_T = K_B * 300;

export type Junction = {
  /** Built-in potential, V. */
  builtIn: number;
  /** Barrier the carriers see at this bias, V. */
  barrier: number;
  /** Depletion width, µm. */
  width: number;
  /** Peak electric field, V/cm. */
  peakField: number;
  /** Diode current, A. */
  current: number;
};

/**
 * Abrupt, symmetric silicon p-n junction (N_A = N_D = doping) at 300 K.
 * Bias is positive when the p side is connected to the positive terminal.
 */
export function junction(doping: number, bias: number): Junction {
  const builtIn = V_T * Math.log((doping * doping) / (NI * NI));
  const barrier = Math.max(0.02, builtIn - bias);
  const widthCm = Math.sqrt(((2 * EPS_SI) / Q) * (2 / doping) * barrier);
  const saturation = 1e-12 * (1e16 / doping);
  return {
    builtIn,
    barrier,
    width: widthCm * 1e4,
    peakField: (2 * barrier) / widthCm,
    current: saturation * (Math.exp(bias / V_T) - 1),
  };
}

/** Formats a current in amperes with a sensible prefix. */
export function formatCurrent(amps: number) {
  const size = Math.abs(amps);
  const units: [number, string][] = [
    [1, "A"],
    [1e-3, "mA"],
    [1e-6, "µA"],
    [1e-9, "nA"],
    [1e-12, "pA"],
    [1e-15, "fA"],
  ];
  if (size < 1e-16) return "0 A";
  const [scale, unit] = units.find(([s]) => size >= s) ?? units[units.length - 1];
  const value = amps / scale;
  return `${value.toLocaleString("id-ID", {
    maximumFractionDigits: Math.abs(value) < 10 ? 2 : 1,
  })} ${unit}`;
}
