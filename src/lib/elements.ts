export type ElementInfo = {
  symbol: string;
  name: string;
  number: number;
  shells: number[];
  group: string;
  role: string;
};

export const SHELL_NAMES = ["K", "L", "M", "N"];

export const ELEMENTS: ElementInfo[] = [
  {
    symbol: "H",
    name: "Hidrogen",
    number: 1,
    shells: [1],
    group: "Golongan I",
    role: "Atom paling sederhana: satu proton, satu elektron. Titik awal yang baik untuk melihat pola.",
  },
  {
    symbol: "B",
    name: "Boron",
    number: 5,
    shells: [2, 3],
    group: "Golongan III",
    role: "Tiga elektron valensi, kurang satu dibanding silikon. Dipakai sebagai dopan tipe-p.",
  },
  {
    symbol: "C",
    name: "Karbon",
    number: 6,
    shells: [2, 4],
    group: "Golongan IV",
    role: "Empat elektron valensi seperti silikon. Dalam bentuk intan, susunan kristalnya sama dengan silikon.",
  },
  {
    symbol: "Si",
    name: "Silikon",
    number: 14,
    shells: [2, 8, 4],
    group: "Golongan IV",
    role: "Bahan utama industri semikonduktor. Empat elektron valensinya membentuk empat ikatan.",
  },
  {
    symbol: "P",
    name: "Fosfor",
    number: 15,
    shells: [2, 8, 5],
    group: "Golongan V",
    role: "Lima elektron valensi, lebih satu dibanding silikon. Dipakai sebagai dopan tipe-n.",
  },
  {
    symbol: "Ga",
    name: "Galium",
    number: 31,
    shells: [2, 8, 18, 3],
    group: "Golongan III",
    role: "Berpasangan dengan arsen membentuk GaAs, bahan LED dan laser.",
  },
  {
    symbol: "Ge",
    name: "Germanium",
    number: 32,
    shells: [2, 8, 18, 4],
    group: "Golongan IV",
    role: "Bahan transistor pertama pada tahun 1947, sebelum digantikan silikon.",
  },
  {
    symbol: "As",
    name: "Arsen",
    number: 33,
    shells: [2, 8, 18, 5],
    group: "Golongan V",
    role: "Dopan tipe-n untuk silikon, dan pasangan galium dalam GaAs.",
  },
];
