/** Boltzmann constant in eV/K. */
export const K_B = 8.617e-5;

export type SemiMaterial = {
  name: string;
  /** Band gap in eV near room temperature. */
  gap: number;
  /** Intrinsic carrier concentration at 300 K, per cm³. */
  ni300: number;
  /** Atoms per cm³. */
  atoms: number;
};

export const MATERIALS: SemiMaterial[] = [
  { name: "Silikon", gap: 1.12, ni300: 1.0e10, atoms: 5.0e22 },
  { name: "Germanium", gap: 0.66, ni300: 2.0e13, atoms: 4.4e22 },
  { name: "GaAs", gap: 1.42, ni300: 2.1e6, atoms: 4.4e22 },
];

/**
 * Intrinsic carrier concentration n_i(T) per cm³, scaled from its 300 K value:
 * n_i ∝ T^(3/2) · exp(−E_g / 2kT). The small change of E_g with temperature
 * is ignored.
 */
export function intrinsicDensity(material: SemiMaterial, temperature: number) {
  if (temperature <= 0) return 0;
  return (
    material.ni300 *
    (temperature / 300) ** 1.5 *
    Math.exp((-material.gap / (2 * K_B)) * (1 / temperature - 1 / 300))
  );
}

/** Fermi–Dirac occupation probability. Energies in eV. */
export function fermi(energy: number, fermiLevel: number, temperature: number) {
  if (temperature <= 0) return energy < fermiLevel ? 1 : 0;
  return 1 / (1 + Math.exp((energy - fermiLevel) / (K_B * temperature)));
}

/** Renders a number as a × 10ᵇ. */
export function Scientific({ value, digits = 1 }: { value: number; digits?: number }) {
  if (!Number.isFinite(value) || value <= 0) return <>0</>;
  let exponent = Math.floor(Math.log10(value));
  let mantissa = value / 10 ** exponent;
  if (Number(mantissa.toFixed(digits)) >= 10) {
    mantissa /= 10;
    exponent += 1;
  }
  const text = mantissa.toFixed(digits).replace(".", ",");
  return (
    <span className="whitespace-nowrap">
      {text === "1,0" ? "" : `${text} × `}10<sup>{exponent}</sup>
    </span>
  );
}
