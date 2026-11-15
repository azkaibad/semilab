/**
 * Approximate sRGB colour of light whose spectrum is given as a function of
 * wavelength in nm, returning values from 0 to 1. Uses simple bell-shaped
 * sensitivities, so the result is a rough impression, not colorimetry.
 */
export function spectrumToColor(spectrum: (nm: number) => number, gain = 1) {
  const sum = [0, 0, 0];
  const norm = [0, 0, 0];
  for (let nm = 380; nm <= 780; nm += 5) {
    const weights = [
      Math.exp(-(((nm - 600) / 45) ** 2)) + 0.25 * Math.exp(-(((nm - 440) / 25) ** 2)),
      Math.exp(-(((nm - 545) / 45) ** 2)),
      Math.exp(-(((nm - 450) / 30) ** 2)),
    ];
    const value = spectrum(nm);
    weights.forEach((weight, i) => {
      sum[i] += value * weight;
      norm[i] += weight;
    });
  }
  const channel = (i: number) =>
    Math.round(255 * Math.min(1, Math.max(0, (sum[i] / norm[i]) * gain)) ** (1 / 2.2));
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}
