import { AtomExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";

export const objectives = [
  "Menyebutkan tiga partikel penyusun atom dan perannya",
  "Menuliskan isi tiap kulit elektron untuk silikon",
  "Menjelaskan apa itu elektron valensi dan kenapa penting",
  "Membedakan unsur golongan III, IV, dan V dari jumlah elektron valensinya",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang menentukan sebuah atom termasuk unsur apa?",
    options: ["Jumlah neutron", "Jumlah proton", "Jumlah kulit elektron", "Massa atom"],
    answer: 1,
    explanation:
      "Jumlah proton disebut nomor atom. Atom dengan 14 proton selalu silikon.",
  },
  {
    question: "Berapa jumlah elektron valensi silikon?",
    options: ["2", "4", "8", "14"],
    answer: 1,
    explanation:
      "Silikon punya 14 elektron dengan susunan 2, 8, 4. Kulit terluarnya berisi 4 elektron.",
  },
  {
    question: "Berapa elektron paling banyak yang muat di kulit L (kulit kedua)?",
    options: ["2", "6", "8", "18"],
    answer: 2,
    explanation: "Kapasitas kulit ke-n adalah 2n². Untuk n = 2 hasilnya 8.",
  },
  {
    question: "Dibandingkan silikon, atom fosfor punya…",
    options: [
      "satu elektron valensi lebih sedikit",
      "jumlah elektron valensi yang sama",
      "satu elektron valensi lebih banyak",
      "satu kulit elektron lebih banyak",
    ],
    answer: 2,
    explanation:
      "Fosfor ada di golongan V dengan 5 elektron valensi, silikon di golongan IV dengan 4.",
  },
  {
    question: "Kenapa elektron valensi paling berpengaruh pada sifat listrik bahan?",
    options: [
      "Karena jumlahnya paling banyak",
      "Karena letaknya paling dekat dengan inti",
      "Karena muatannya lebih besar dari elektron lain",
      "Karena paling jauh dari inti sehingga paling mudah lepas dan berikatan",
    ],
    answer: 3,
    explanation:
      "Elektron terluar paling lemah terikat ke inti, jadi dialah yang membentuk ikatan dan bisa bergerak membawa arus.",
  },
];

export function Body() {
  return (
    <>
      <Section id="kenapa-atom" title="Kenapa mulai dari atom">
        <p>
          Sebuah chip komputer berisi miliaran transistor, dan setiap transistor
          bekerja karena kita bisa mengatur ke mana elektron bergerak di dalam
          sepotong silikon. Jadi sebelum membahas transistor, alat deposisi, atau
          lapisan tipis, kita perlu tahu dulu dari mana elektron itu berasal dan
          kenapa sebagian elektron bisa diatur sedangkan sebagian lain tidak.
          Jawabannya ada di dalam atom.
        </p>
      </Section>

      <Section id="isi-atom" title="Isi sebuah atom">
        <p>Atom tersusun dari tiga jenis partikel:</p>
        <ul>
          <li>
            <Term>Proton</Term>, bermuatan positif, berada di inti atom.
          </li>
          <li>
            <Term>Neutron</Term>, tidak bermuatan, juga berada di inti.
          </li>
          <li>
            <Term>Elektron</Term>, bermuatan negatif, berada di sekeliling inti.
          </li>
        </ul>
        <p>
          Jumlah proton disebut <Term>nomor atom</Term> dan inilah yang
          menentukan jenis unsur. Atom dengan 14 proton selalu silikon, atom
          dengan 15 proton selalu fosfor. Atom yang netral punya elektron
          sebanyak protonnya, sehingga muatan totalnya nol.
        </p>
        <p>
          Hampir seluruh massa atom ada di inti: satu proton kira-kira 1.836 kali
          lebih berat daripada satu elektron. Ukurannya justru terbalik. Inti
          sekitar seratus ribu kali lebih kecil daripada atomnya, jadi sebagian
          besar volume atom adalah wilayah elektron.
        </p>
        <Callout kind="analogi">
          <p>
            Kalau atom diperbesar sampai seukuran stadion sepak bola, intinya
            hanya sebesar kelereng di titik tengah lapangan. Sisanya adalah
            ruang tempat elektron berada.
          </p>
        </Callout>
      </Section>

      <Section id="kulit-elektron" title="Kulit elektron">
        <p>
          Elektron tidak bisa memiliki energi sembarang. Elektron menempati
          tingkat-tingkat energi tertentu yang dikelompokkan menjadi{" "}
          <Term>kulit</Term>. Kulit diberi nama K, L, M, N, mulai dari yang
          paling dekat dengan inti. Makin jauh dari inti, makin tinggi energi
          elektronnya dan makin lemah ikatannya ke inti.
        </p>
        <p>
          Setiap kulit punya kapasitas. Kulit ke-<Formula tex="n" /> memuat
          paling banyak
        </p>
        <Formula block tex="N_{\text{maks}} = 2n^2" />
        <p>
          elektron: 2 untuk kulit K, 8 untuk L, 18 untuk M, dan 32 untuk N.
          Elektron mengisi kulit berenergi rendah lebih dulu.
        </p>
        <p>
          Silikon punya 14 elektron. Dua yang pertama mengisi kulit K, delapan
          berikutnya mengisi kulit L, dan empat sisanya masuk ke kulit M.
          Susunannya ditulis <Term>2, 8, 4</Term>.
        </p>
        <p>
          Coba pilih unsur lain pada model di bawah dan perhatikan bagaimana
          kulit terluarnya berubah.
        </p>
        <AtomExplorer />
        <Callout kind="catatan">
          <p>
            Gambar elektron yang mengorbit seperti planet adalah penyederhanaan.
            Elektron sebenarnya tidak punya lintasan yang pasti; yang bisa
            dihitung hanyalah peluang menemukannya di suatu tempat. Model kulit
            tetap dipakai karena jumlah elektron per kulit yang diberikannya
            benar, dan itu yang kita butuhkan sekarang. Gambaran yang lebih
            tepat dibahas di Bab 3.
          </p>
        </Callout>
      </Section>

      <Section id="elektron-valensi" title="Elektron valensi">
        <p>
          Elektron di kulit terluar disebut <Term>elektron valensi</Term>.
          Elektron di kulit dalam terikat kuat ke inti dan praktis tidak ikut
          campur. Elektron valensi berbeda: letaknya paling jauh dari inti,
          ikatannya paling lemah, dan dialah yang bersentuhan dengan atom
          tetangga.
        </p>
        <p>Akibatnya, elektron valensi menentukan dua hal:</p>
        <ul>
          <li>
            <Term>Cara atom berikatan.</Term> Silikon punya empat elektron
            valensi, sehingga membentuk empat ikatan dengan empat atom
            tetangganya. Ini dibahas di Bab 2.
          </li>
          <li>
            <Term>Sifat listrik bahan.</Term> Arus listrik adalah elektron yang
            bergerak, dan yang bisa lepas untuk bergerak hanyalah elektron
            valensi.
          </li>
        </ul>
        <Callout kind="penting">
          <p>
            Dari 14 elektron silikon, hanya 4 yang penting untuk hampir semua
            pembahasan semikonduktor. Sepuluh elektron lainnya boleh dianggap
            menyatu dengan inti.
          </p>
        </Callout>
      </Section>

      <Section id="golongan" title="Golongan III, IV, dan V">
        <p>
          Tabel periodik menyusun unsur sedemikian rupa sehingga unsur dalam
          satu kolom (golongan) punya jumlah elektron valensi yang sama. Untuk
          semikonduktor, tiga golongan ini yang paling sering muncul:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Golongan</th>
                <th>Elektron valensi</th>
                <th>Unsur</th>
                <th>Peran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>III</td>
                <td>3</td>
                <td>B, Al, Ga, In</td>
                <td>Dopan tipe-p untuk silikon</td>
              </tr>
              <tr>
                <td>IV</td>
                <td>4</td>
                <td>C, Si, Ge</td>
                <td>Bahan semikonduktor utama</td>
              </tr>
              <tr>
                <td>V</td>
                <td>5</td>
                <td>N, P, As, Sb</td>
                <td>Dopan tipe-n untuk silikon</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Selisih satu elektron valensi terlihat sepele, tetapi seluruh
          teknologi semikonduktor bertumpu pada selisih itu. Kalau satu atom
          silikon di dalam kristal diganti dengan fosfor, ada satu elektron
          berlebih yang bebas bergerak. Kalau diganti dengan boron, ada satu
          elektron yang kurang. Proses ini disebut doping dan dibahas di Bab 6.
        </p>
        <p>
          Unsur golongan III dan V juga bisa digabung menjadi senyawa
          semikonduktor, misalnya galium arsenida (GaAs). Rata-rata elektron
          valensinya tetap empat per atom, sama seperti silikon.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Atom terdiri dari inti (proton dan neutron) yang dikelilingi elektron. Jumlah proton menentukan jenis unsur.",
            "Elektron menempati kulit K, L, M, N dengan kapasitas 2, 8, 18, 32.",
            "Silikon punya 14 elektron dengan susunan 2, 8, 4.",
            "Elektron valensi adalah elektron di kulit terluar. Elektron inilah yang membentuk ikatan dan membawa arus.",
            "Golongan III punya 3 elektron valensi, golongan IV punya 4, golongan V punya 5.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="atom-dan-elektron" questions={questions} />
      </Section>
    </>
  );
}
