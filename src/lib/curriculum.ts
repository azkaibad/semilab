export type Chapter = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  topics: string[];
  visual: string;
  minutes?: number;
  available: boolean;
};

export type Part = {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
};

type ChapterInput = Omit<Chapter, "number" | "available"> & {
  available?: boolean;
};

const partInputs: {
  id: string;
  title: string;
  description: string;
  chapters: ChapterInput[];
}[] = [
  {
    id: "A",
    title: "Fondasi fisika",
    description:
      "Bekal paling dasar: atom, kristal, dan asal-usul pita energi.",
    chapters: [
      {
        slug: "atom-dan-elektron",
        title: "Atom dan elektron",
        summary:
          "Isi sebuah atom, kulit elektron, dan kenapa elektron valensi menentukan segalanya.",
        topics: [
          "Proton, neutron, elektron",
          "Kulit elektron",
          "Elektron valensi",
          "Golongan III, IV, dan V",
        ],
        visual: "Model atom yang bisa diputar untuk delapan unsur penting",
        minutes: 20,
        available: true,
      },
      {
        slug: "ikatan-dan-kristal",
        title: "Ikatan dan kristal",
        summary:
          "Cara atom silikon saling berikatan dan tersusun rapi menjadi kristal.",
        topics: [
          "Ikatan kovalen",
          "Sel satuan dan konstanta kisi",
          "Struktur kubik dan intan",
          "Indeks Miller",
          "Kristal tunggal, polikristal, amorf",
        ],
        visual: "Kisi kristal 3D dengan bidang (100), (110), dan (111)",
        minutes: 30,
        available: true,
      },
      {
        slug: "kuantum-secukupnya",
        title: "Kuantum secukupnya",
        summary:
          "Tiga gagasan kuantum yang benar-benar dipakai di bab-bab berikutnya.",
        topics: [
          "Tingkat energi diskrit",
          "Prinsip larangan Pauli",
          "Sifat gelombang elektron",
        ],
        visual: "Tingkat energi yang terisi elektron satu per satu",
        minutes: 30,
        available: true,
      },
      {
        slug: "pita-energi",
        title: "Pita energi",
        summary:
          "Dari tingkat energi satu atom menjadi pita energi sebuah kristal.",
        topics: [
          "Pita valensi dan pita konduksi",
          "Band gap",
          "Konduktor, isolator, semikonduktor",
          "Celah langsung dan tak langsung",
        ],
        visual: "Atom didekatkan, tingkat energi melebar menjadi pita",
        minutes: 30,
        available: true,
      },
    ],
  },
  {
    id: "B",
    title: "Fisika semikonduktor",
    description: "Bagaimana muatan muncul, bergerak, dan dikendalikan.",
    chapters: [
      {
        slug: "pembawa-muatan",
        title: "Pembawa muatan",
        summary: "Elektron dan hole, serta pengaruh suhu terhadap jumlahnya.",
        topics: [
          "Elektron dan hole",
          "Semikonduktor intrinsik",
          "Level Fermi",
          "Pengaruh suhu",
        ],
        visual: "Slider suhu, elektron melompat ke pita konduksi",
        minutes: 30,
        available: true,
      },
      {
        slug: "doping",
        title: "Doping",
        summary:
          "Menambahkan sedikit atom asing untuk mengatur sifat listrik silikon.",
        topics: ["Tipe-n dan tipe-p", "Donor dan akseptor", "Konsentrasi doping"],
        visual: "Mengganti atom Si dengan P atau B di dalam kisi",
        minutes: 30,
        available: true,
      },
      {
        slug: "transport-muatan",
        title: "Transport muatan",
        summary: "Dua cara muatan bergerak: didorong medan dan menyebar sendiri.",
        topics: [
          "Drift dan mobilitas",
          "Difusi",
          "Resistivitas",
          "Generasi dan rekombinasi",
        ],
        visual: "Elektron bergerak saat medan listrik diberikan",
        minutes: 35,
        available: true,
      },
      {
        slug: "sambungan-pn",
        title: "Sambungan p-n",
        summary: "Jantung hampir semua devais semikonduktor.",
        topics: [
          "Daerah deplesi",
          "Potensial bawaan",
          "Bias maju dan mundur",
          "Kurva I-V",
        ],
        visual: "Slider tegangan, daerah deplesi dan kurva I-V berubah",
        minutes: 35,
        available: true,
      },
      {
        slug: "devais-semikonduktor",
        title: "Devais semikonduktor",
        summary: "Dari sambungan p-n menjadi dioda, LED, sel surya, dan MOSFET.",
        topics: ["Dioda", "LED", "Sel surya", "MOSFET"],
        visual: "Potongan melintang MOSFET, kanal terbentuk saat gate diberi tegangan",
        minutes: 40,
        available: true,
      },
    ],
  },
  {
    id: "C",
    title: "Teknologi thin film",
    description: "Membuat lapisan setipis beberapa lapis atom.",
    chapters: [
      {
        slug: "pengantar-thin-film",
        title: "Pengantar thin film",
        summary: "Apa itu lapisan tipis, seberapa tipis, dan untuk apa.",
        topics: ["Skala ketebalan", "Substrat", "Contoh penggunaan"],
        visual: "Perbandingan skala dari rambut sampai lapisan nanometer",
        minutes: 25,
        available: true,
      },
      {
        slug: "teknologi-vakum",
        title: "Teknologi vakum",
        summary: "Kenapa hampir semua proses deposisi butuh ruang hampa.",
        topics: [
          "Tekanan dan satuannya",
          "Mean free path",
          "Jenis pompa",
          "Alat ukur vakum",
        ],
        visual: "Sistem vakum lengkap, slider tekanan dan gerak molekul gas",
        minutes: 40,
        available: true,
      },
      {
        slug: "pertumbuhan-film",
        title: "Pertumbuhan film",
        summary: "Yang terjadi saat atom mendarat di permukaan substrat.",
        topics: [
          "Adsorpsi dan difusi permukaan",
          "Nukleasi",
          "Mode pertumbuhan",
          "Stress dan adhesi",
        ],
        visual: "Atom mendarat dan membentuk pulau atau lapisan",
        minutes: 40,
        available: true,
      },
      {
        slug: "pvd",
        title: "Deposisi fisik (PVD)",
        summary: "Menguapkan atau menembak material padat agar menempel di substrat.",
        topics: [
          "Evaporasi termal",
          "Evaporasi e-beam",
          "Sputtering DC, RF, dan magnetron",
        ],
        visual: "Potongan tiap alat, lengkap dengan plasma dan atom target",
        minutes: 40,
        available: true,
      },
      {
        slug: "cvd-dan-ald",
        title: "CVD dan ALD",
        summary: "Menumbuhkan lapisan dari reaksi kimia gas di permukaan.",
        topics: ["LPCVD", "PECVD", "ALD", "Epitaksi"],
        visual: "Reaktor CVD dan siklus ALD lapis demi lapis",
        minutes: 45,
        available: true,
      },
      {
        slug: "metode-larutan",
        title: "Metode larutan",
        summary: "Cara murah membuat lapisan tipis tanpa ruang vakum.",
        topics: ["Spin coating", "Sol-gel", "Dip coating"],
        visual: "Spin coater, slider rpm terhadap ketebalan",
        minutes: 35,
        available: true,
      },
    ],
  },
  {
    id: "D",
    title: "Proses fabrikasi",
    description: "Langkah-langkah mengubah wafer polos menjadi devais.",
    chapters: [
      {
        slug: "wafer-dan-cleanroom",
        title: "Wafer dan cleanroom",
        summary: "Dari pasir menjadi wafer, dan ruangan tempat wafer diproses.",
        topics: ["Penarikan kristal Czochralski", "Kelas cleanroom", "Pembersihan wafer"],
        visual: "Penarikan kristal Czochralski",
        minutes: 40,
        available: true,
      },
      {
        slug: "oksidasi-dan-doping",
        title: "Oksidasi dan doping",
        summary: "Menumbuhkan oksida dan memasukkan atom dopan ke dalam wafer.",
        topics: ["Oksidasi termal", "Difusi", "Implantasi ion", "Annealing"],
        visual: "Furnace dan ion implanter",
        minutes: 45,
        available: true,
      },
      {
        slug: "fotolitografi",
        title: "Fotolitografi",
        summary: "Mencetak pola rangkaian ke atas wafer dengan cahaya.",
        topics: ["Photoresist", "Mask", "Exposure", "Development"],
        visual: "Langkah demi langkah di atas wafer",
        minutes: 45,
        available: true,
      },
      {
        slug: "etching",
        title: "Etching",
        summary: "Membuang material secara terkendali mengikuti pola.",
        topics: ["Wet etch", "Dry etch dan RIE", "Isotropik dan anisotropik"],
        visual: "Chamber RIE dan profil hasil etch",
        minutes: 40,
        available: true,
      },
    ],
  },
  {
    id: "E",
    title: "Karakterisasi dan proyek akhir",
    description: "Mengukur hasil kerja, lalu merangkai semuanya.",
    chapters: [
      {
        slug: "ketebalan-dan-morfologi",
        title: "Ketebalan dan morfologi",
        summary: "Mengukur tebal lapisan dan melihat bentuk permukaannya.",
        topics: ["Profilometer", "Ellipsometer", "SEM", "AFM"],
        visual: "Potongan SEM dan tip AFM yang memindai permukaan",
        minutes: 45,
        available: true,
      },
      {
        slug: "struktur-listrik-optik",
        title: "Struktur, listrik, dan optik",
        summary: "Memeriksa susunan kristal serta sifat listrik dan optik lapisan.",
        topics: ["XRD", "Four-point probe", "Efek Hall", "UV-Vis"],
        visual: "Difraksi sinar-X pada kisi kristal",
        minutes: 45,
        available: true,
      },
      {
        slug: "proyek-akhir",
        title: "Proyek akhir",
        summary: "Membuat satu devais dari wafer polos sampai jadi.",
        topics: ["Alur proses lengkap", "Urutan alat", "Pemeriksaan hasil"],
        visual: "Seluruh alur proses dijalankan berurutan",
        minutes: 40,
        available: true,
      },
    ],
  },
];

let counter = 0;

export const parts: Part[] = partInputs.map((part) => ({
  ...part,
  chapters: part.chapters.map((chapter) => ({
    ...chapter,
    available: chapter.available ?? false,
    number: ++counter,
  })),
}));

export const chapters: Chapter[] = parts.flatMap((part) => part.chapters);

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getPartOf(slug: string) {
  return parts.find((part) => part.chapters.some((c) => c.slug === slug));
}

export function getNeighbors(slug: string) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
