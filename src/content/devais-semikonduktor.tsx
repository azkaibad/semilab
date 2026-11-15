import { MosfetExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { LedColor } from "@/components/widgets/LedColor";
import { SolarCellCurve } from "@/components/widgets/SolarCellCurve";

export const objectives = [
  "Menjelaskan cara kerja dioda penyearah, LED, dan sel surya dari sambungan p-n",
  "Menghubungkan warna LED dengan celah pita bahannya",
  "Membaca kurva sel surya dan menemukan titik daya maksimumnya",
  "Menjelaskan struktur MOSFET dan cara gate mengendalikan arus",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang menentukan warna cahaya sebuah LED?",
    options: [
      "Besar arus yang mengalir",
      "Warna plastik pembungkusnya",
      "Celah pita bahan semikonduktornya",
      "Ukuran chip",
    ],
    answer: 2,
    explanation:
      "Energi foton yang dipancarkan kira-kira sama dengan celah pita, dan energi foton menentukan warnanya.",
  },
  {
    question: "Pada sel surya, apa yang memisahkan elektron dan hole hasil penyinaran?",
    options: [
      "Medan listrik di daerah deplesi sambungan p-n",
      "Panas matahari",
      "Kaca pelindung",
      "Baterai di dalam sel",
    ],
    answer: 0,
    explanation:
      "Medan bawaan menyapu elektron ke sisi n dan hole ke sisi p sebelum keduanya sempat berekombinasi.",
  },
  {
    question: "Di titik mana sel surya menghasilkan daya terbesar?",
    options: [
      "Saat hubung singkat, karena arusnya terbesar",
      "Saat rangkaian terbuka, karena tegangannya terbesar",
      "Di titik daya maksimum, di antara keduanya",
      "Daya selalu sama di semua titik",
    ],
    answer: 2,
    explanation:
      "Daya adalah tegangan kali arus. Saat hubung singkat tegangannya nol, dan saat rangkaian terbuka arusnya nol.",
  },
  {
    question: "Kapan kanal pada MOSFET kanal-n terbentuk?",
    options: [
      "Saat tegangan drain nol",
      "Saat tegangan gate melebihi tegangan ambang",
      "Saat source dan drain dihubung singkat",
      "Kanal selalu ada",
    ],
    answer: 1,
    explanation:
      "Tegangan gate positif menarik elektron ke permukaan silikon di bawah oksida. Di atas tegangan ambang, elektron itu cukup banyak untuk membentuk kanal.",
  },
  {
    question: "Apa fungsi lapisan oksida di bawah gate?",
    options: [
      "Menghantarkan arus dari gate ke kanal",
      "Mendinginkan transistor",
      "Menambah kekuatan mekanik",
      "Mengisolasi gate, sehingga gate mengendalikan kanal lewat medan listrik tanpa mengalirkan arus",
    ],
    answer: 3,
    explanation:
      "Karena gate terisolasi, hampir tidak ada arus yang dibutuhkan untuk menahan transistor tetap menyala atau mati.",
  },
];

export function Body() {
  return (
    <>
      <Section id="dari-sambungan" title="Satu sambungan, banyak devais">
        <p>
          Sambungan p-n di Bab 8 bisa melakukan lebih dari sekadar melewatkan
          arus satu arah. Bergantung pada bahan dan cara pemakaiannya,
          sambungan yang sama bisa memancarkan cahaya atau mengubah cahaya
          menjadi listrik. Dengan menambahkan satu elektroda yang terisolasi,
          kita mendapatkan transistor. Bab ini membahas empat devais yang
          paling penting.
        </p>
      </Section>

      <Section id="dioda" title="Dioda penyearah">
        <p>
          Dioda adalah sambungan p-n yang diberi dua kontak. Pemakaiannya yang
          paling umum adalah <Term>penyearah</Term>: mengubah arus bolak-balik
          dari jala-jala listrik menjadi arus searah yang dibutuhkan perangkat
          elektronik. Selama setengah siklus dioda mendapat bias maju dan
          menghantar. Selama setengah siklus berikutnya dioda mendapat bias
          mundur dan menahan arus.
        </p>
        <p>
          Setiap pengisi daya ponsel dan laptop berisi dioda penyearah. Dioda
          juga dipakai sebagai pelindung, agar arus tidak mengalir ke arah yang
          salah saat baterai terpasang terbalik.
        </p>
      </Section>

      <Section id="led" title="LED: listrik menjadi cahaya">
        <p>
          Pada bias maju, elektron dari sisi n dan hole dari sisi p bertemu di
          sekitar sambungan dan berekombinasi. Setiap rekombinasi melepaskan
          energi sebesar celah pita. Pada bahan bercelah langsung, energi itu
          keluar sebagai satu foton. Itulah <Term>LED</Term>, dioda pemancar
          cahaya.
        </p>
        <p>
          Dari Bab 4, panjang gelombang foton ditentukan oleh energinya, jadi
          warna LED ditentukan oleh celah pita bahannya:
        </p>
        <Formula block tex="\lambda\ (\text{nm}) \approx \frac{1240}{E_g\ (\text{eV})}" />
        <LedColor />
        <p>
          Dua hal yang perlu dicatat. Pertama, silikon tidak dipakai untuk LED
          karena celah pitanya tak langsung. Kedua, tegangan maju LED
          kira-kira sebesar celah pitanya dalam volt, sehingga LED biru butuh
          tegangan lebih tinggi daripada LED merah.
        </p>
        <Callout kind="catatan">
          <p>
            LED putih bukan bahan dengan celah pita “putih”. Yang umum dipakai
            adalah LED biru yang dilapisi fosfor. Fosfor menyerap sebagian
            cahaya biru dan memancarkannya kembali sebagai cahaya kuning, dan
            campuran keduanya tampak putih.
          </p>
        </Callout>
      </Section>

      <Section id="sel-surya" title="Sel surya: cahaya menjadi listrik">
        <p>
          Sel surya adalah LED yang dijalankan terbalik. Foton dengan energi
          melebihi celah pita diserap dan menghasilkan pasangan elektron dan
          hole. Kalau pasangan itu terbentuk di dalam atau di dekat daerah
          deplesi, medan bawaan memisahkannya: elektron tersapu ke sisi n dan
          hole ke sisi p. Pemisahan muatan ini menghasilkan tegangan, dan kalau
          kedua sisi dihubungkan lewat beban, arus mengalir.
        </p>
        <p>
          Kurva sel surya adalah kurva dioda yang digeser oleh arus akibat
          cahaya:
        </p>
        <Formula
          block
          tex="I = I_L - I_s\left[\exp\!\left(\frac{qV}{kT}\right) - 1\right]"
        />
        <SolarCellCurve />
        <p>Tiga besaran menggambarkan sebuah sel surya:</p>
        <ul>
          <li>
            <Term>Arus hubung singkat</Term>, arus saat kedua kutub dihubungkan
            langsung. Besarnya sebanding dengan intensitas cahaya.
          </li>
          <li>
            <Term>Tegangan rangkaian terbuka</Term>, tegangan saat tidak ada
            beban. Besarnya hanya naik sedikit terhadap intensitas cahaya.
          </li>
          <li>
            <Term>Titik daya maksimum</Term>, titik kerja dengan hasil kali
            tegangan dan arus terbesar. Di kedua ujung kurva dayanya nol.
          </li>
        </ul>
        <p>
          Celah pita menentukan batas efisiensi. Foton berenergi kurang dari
          celah pita tidak diserap. Foton berenergi lebih besar diserap, tetapi
          kelebihannya terbuang sebagai panas. Celah pita silikon 1,12 eV
          cukup dekat dengan nilai terbaik untuk cahaya matahari, dan itu salah
          satu alasan silikon mendominasi sel surya.
        </p>
      </Section>

      <Section id="mosfet" title="MOSFET: sakelar yang dikendalikan tegangan">
        <p>
          <Term>MOSFET</Term> adalah transistor yang membentuk hampir semua
          chip digital. Sebuah prosesor modern berisi puluhan miliar MOSFET.
          Namanya adalah singkatan dari susunan lapisannya: logam (metal),
          oksida, semikonduktor, dan cara kerjanya dengan efek medan.
        </p>
        <p>MOSFET kanal-n terdiri dari empat bagian:</p>
        <ul>
          <li>
            <Term>Substrat</Term> tipe-p sebagai badan transistor.
          </li>
          <li>
            <Term>Source dan drain</Term>, dua daerah tipe-n berdoping berat di
            kiri dan kanan.
          </li>
          <li>
            <Term>Oksida gate</Term>, lapisan isolator yang sangat tipis di
            atas daerah di antara source dan drain.
          </li>
          <li>
            <Term>Gate</Term>, elektroda penghantar di atas oksida.
          </li>
        </ul>
        <p>
          Dari source ke drain ada dua sambungan p-n yang saling membelakangi,
          jadi tanpa tegangan gate tidak ada arus yang bisa lewat. Naikkan
          tegangan gate pada model di bawah dan perhatikan apa yang terjadi
          saat melewati 0,7 V.
        </p>
        <MosfetExplorer />
        <p>
          Gate, oksida, dan substrat membentuk kapasitor. Tegangan positif pada
          gate mendorong hole menjauh dari permukaan silikon dan menarik
          elektron mendekat. Di atas <Term>tegangan ambang</Term>, elektron di
          permukaan sudah lebih banyak daripada hole. Lapisan tipis di bawah
          oksida itu berbalik sifat dari tipe-p menjadi tipe-n. Lapisan ini
          disebut <Term>kanal</Term>, dan ia menghubungkan source ke drain.
        </p>
        <Callout kind="analogi">
          <p>
            Gate bekerja seperti keran. Tangan yang memutar keran tidak ikut
            mengalir bersama air. Tangan itu hanya mengatur seberapa lebar
            jalan air terbuka.
          </p>
        </Callout>
        <p>Setelah kanal terbentuk, ada dua daerah kerja:</p>
        <ul>
          <li>
            <Term>Linear.</Term> Saat tegangan drain kecil, arus naik sebanding
            dengan tegangan drain. Transistor berperilaku seperti resistor yang
            nilainya diatur gate.
          </li>
          <li>
            <Term>Jenuh.</Term> Saat tegangan drain melebihi selisih tegangan
            gate dan tegangan ambang, kanal terjepit di ujung drain dan arus
            berhenti naik:
          </li>
        </ul>
        <Formula block tex="I_D = \frac{k}{2}\,(V_{GS} - V_{th})^2" />
        <p>
          Sebagai sakelar digital, MOSFET hanya dipakai di dua keadaan: mati
          sebagai logika 0 dan menyala sebagai logika 1. Pasangan MOSFET
          kanal-n dan kanal-p disebut <Term>CMOS</Term>, dan hampir semua chip
          digital dibangun dengan cara ini karena hampir tidak memakai daya
          saat tidak sedang berpindah keadaan.
        </p>
        <Callout kind="penting">
          <p>
            Perhatikan betapa banyak lapisan tipis dalam satu transistor:
            oksida gate setebal beberapa nanometer, gate, kontak logam, dan
            lapisan isolator di antaranya. Kinerja transistor sangat bergantung
            pada mutu lapisan-lapisan itu. Cara membuat lapisan setipis dan
            serapi itu adalah topik Bagian C.
          </p>
        </Callout>
      </Section>

      <Section id="penutup-bagian" title="Penutup Bagian B">
        <p>
          Sampai di sini kita sudah menempuh jalan dari satu atom sampai
          transistor yang bekerja. Semuanya bertumpu pada beberapa gagasan yang
          sama: elektron valensi, celah pita, dua jenis pembawa muatan yang
          jumlahnya diatur dengan doping, serta drift dan difusi yang
          menggerakkannya.
        </p>
        <p>
          Bagian berikutnya berpindah dari cara kerja devais ke cara
          membuatnya, dimulai dari lapisan tipis dan ruang vakum tempat lapisan
          itu ditumbuhkan.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Dioda penyearah memanfaatkan sifat satu arah sambungan p-n untuk mengubah arus bolak-balik menjadi searah.",
            "LED memancarkan cahaya dari rekombinasi pada bias maju. Warnanya ditentukan celah pita: λ (nm) ≈ 1240 / Eg (eV).",
            "Sel surya memakai medan bawaan untuk memisahkan pasangan elektron dan hole hasil penyinaran. Dayanya terbesar di titik daya maksimum.",
            "MOSFET punya source, drain, oksida gate, dan gate. Tegangan gate di atas ambang membentuk kanal yang menghubungkan source dan drain.",
            "Gate terisolasi oleh oksida, sehingga mengendalikan arus lewat medan listrik tanpa mengalirkan arus sendiri.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="devais-semikonduktor" questions={questions} />
      </Section>
    </>
  );
}
