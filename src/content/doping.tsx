import { CarrierExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { DopingCalculator } from "@/components/widgets/DopingCalculator";

export const objectives = [
  "Menjelaskan kenapa silikon murni perlu didoping",
  "Membedakan donor dan akseptor serta tipe-n dan tipe-p",
  "Menghitung konsentrasi pembawa mayoritas dan minoritas",
  "Menjelaskan pergeseran level Fermi akibat doping",
  "Menjelaskan kenapa kristal yang didoping tetap netral",
];

const questions: QuizQuestion[] = [
  {
    question: "Atom fosfor di dalam kristal silikon berperan sebagai…",
    options: [
      "akseptor, menghasilkan hole",
      "donor, menghasilkan elektron bebas",
      "isolator",
      "pusat rekombinasi saja",
    ],
    answer: 1,
    explanation:
      "Fosfor punya lima elektron valensi. Empat dipakai berikatan dan yang kelima lepas menjadi elektron bebas.",
  },
  {
    question: "Pada silikon tipe-p, pembawa mayoritasnya adalah…",
    options: ["elektron", "hole", "ion boron", "foton"],
    answer: 1,
    explanation:
      "Akseptor seperti boron menghasilkan hole, sehingga hole jauh lebih banyak daripada elektron.",
  },
  {
    question:
      "Silikon didoping fosfor 10¹⁶ cm⁻³ pada suhu ruang (nᵢ = 10¹⁰ cm⁻³). Berapa konsentrasi hole-nya?",
    options: ["10¹⁶ cm⁻³", "10¹⁰ cm⁻³", "10⁴ cm⁻³", "0"],
    answer: 2,
    explanation: "p = nᵢ² / n = 10²⁰ / 10¹⁶ = 10⁴ cm⁻³.",
  },
  {
    question: "Ke mana level Fermi bergeser pada silikon tipe-n?",
    options: [
      "Mendekati pita konduksi",
      "Mendekati pita valensi",
      "Tetap di tengah celah",
      "Masuk ke dalam inti atom",
    ],
    answer: 0,
    explanation:
      "Makin banyak elektron di pita konduksi, makin tinggi level Fermi. Pada tipe-p arahnya sebaliknya.",
  },
  {
    question: "Kenapa silikon tipe-n secara keseluruhan tetap netral?",
    options: [
      "Karena elektron bebasnya tidak bermuatan",
      "Karena jumlah hole sama dengan jumlah elektron",
      "Karena setiap elektron bebas diimbangi satu ion donor positif yang diam di kisi",
      "Karena silikon adalah isolator",
    ],
    answer: 2,
    explanation:
      "Atom donor membawa satu proton lebih banyak daripada silikon. Setelah elektronnya lepas, atom itu menjadi ion positif yang tidak bisa bergerak.",
  },
];

export function Body() {
  return (
    <>
      <Section id="kenapa-doping" title="Kenapa silikon perlu didoping">
        <p>
          Bab 5 berakhir dengan dua kabar buruk tentang silikon murni. Pembawa
          muatannya sangat sedikit, hanya <Formula tex="10^{10}" /> per cm³,
          dan jumlah itu ditentukan oleh suhu, bukan oleh kita. Bahan seperti
          itu tidak bisa dijadikan devais.
        </p>
        <p>
          Jalan keluarnya adalah <Term>doping</Term>: sengaja mengganti
          sebagian kecil atom silikon dengan atom dari golongan lain. Takarannya
          sangat kecil. Satu atom dopan untuk setiap lima juta atom silikon
          sudah menaikkan jumlah pembawa muatan sejuta kali lipat. Semikonduktor
          yang sudah didoping disebut <Term>ekstrinsik</Term>.
        </p>
        <Callout kind="analogi">
          <p>
            Seperti garam dalam masakan: jumlahnya sangat sedikit dibanding
            bahan utamanya, tetapi mengubah rasanya sepenuhnya, dan kita bisa
            menakarnya dengan tepat.
          </p>
        </Callout>
      </Section>

      <Section id="tipe-n" title="Tipe-n: menambah elektron">
        <p>
          Ganti satu atom silikon dengan atom golongan V, misalnya fosfor.
          Fosfor punya lima elektron valensi. Empat di antaranya membentuk
          ikatan dengan empat silikon tetangga, persis seperti atom silikon
          yang digantikannya. Elektron kelima tidak punya ikatan untuk
          ditempati.
        </p>
        <p>
          Elektron kelima ini hanya terikat lemah ke atom fosfornya. Energi
          yang dibutuhkan untuk melepasnya sekitar 0,045 eV, dibandingkan
          1,12 eV untuk memutus sebuah ikatan silikon. Energi termal pada suhu
          ruang sudah cukup, sehingga praktis semua atom fosfor melepaskan
          elektron kelimanya.
        </p>
        <p>
          Atom yang menyumbang elektron disebut <Term>donor</Term>. Silikon
          yang didoping donor disebut <Term>tipe-n</Term>, dari kata negatif,
          karena pembawa muatannya didominasi elektron.
        </p>
        <CarrierExplorer mode="doping" />
      </Section>

      <Section id="tipe-p" title="Tipe-p: menambah hole">
        <p>
          Sekarang ganti atom silikon dengan atom golongan III, misalnya boron.
          Pilih “Tipe-p (boron)” pada model di atas. Boron hanya punya tiga
          elektron valensi, jadi satu dari empat ikatannya kekurangan satu
          elektron.
        </p>
        <p>
          Elektron dari ikatan tetangga mudah berpindah mengisi kekurangan itu,
          juga hanya butuh sekitar 0,045 eV. Begitu itu terjadi, kekosongannya
          berpindah ke ikatan tetangga dan menjadi hole yang bebas bergerak.
        </p>
        <p>
          Atom yang menerima elektron disebut <Term>akseptor</Term>. Silikon
          yang didoping akseptor disebut <Term>tipe-p</Term>, dari kata
          positif, karena pembawa muatannya didominasi hole.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tipe-n</th>
                <th>Tipe-p</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dopan</td>
                <td>Golongan V: P, As, Sb</td>
                <td>Golongan III: B, Al, Ga</td>
              </tr>
              <tr>
                <td>Sebutan dopan</td>
                <td>Donor</td>
                <td>Akseptor</td>
              </tr>
              <tr>
                <td>Pembawa mayoritas</td>
                <td>Elektron</td>
                <td>Hole</td>
              </tr>
              <tr>
                <td>Pembawa minoritas</td>
                <td>Hole</td>
                <td>Elektron</td>
              </tr>
              <tr>
                <td>Ion yang tertinggal</td>
                <td>Positif</td>
                <td>Negatif</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="netral" title="Kristal tetap netral">
        <p>
          Nama tipe-n dan tipe-p sering disalahpahami. Silikon tipe-n tidak
          bermuatan negatif. Atom fosfor membawa lima elektron valensi, tetapi
          intinya juga punya satu proton lebih banyak daripada silikon. Jumlah
          muatan positif dan negatif di dalam kristal tetap sama.
        </p>
        <p>
          Yang berubah adalah siapa yang bisa bergerak. Setelah elektron
          kelimanya lepas, atom fosfor menjadi ion positif yang terkunci di
          kisi. Jadi di dalam silikon tipe-n ada elektron negatif yang bebas
          bergerak dan ion donor positif yang diam. Pada tipe-p sebaliknya:
          hole positif yang bergerak dan ion akseptor negatif yang diam.
        </p>
        <Callout kind="penting">
          <p>
            Ingat baik-baik ion yang diam ini. Saat tipe-n dan tipe-p
            dipertemukan di Bab 8, pembawa yang bergerak akan pergi dari daerah
            pertemuan dan ion-ion inilah yang tertinggal. Dari sanalah medan
            listrik pada sambungan p-n berasal.
          </p>
        </Callout>
      </Section>

      <Section id="mayoritas-minoritas" title="Pembawa mayoritas dan minoritas">
        <p>
          Konsentrasi donor ditulis <Formula tex="N_D" /> dan akseptor{" "}
          <Formula tex="N_A" />. Karena praktis semua dopan melepaskan pembawa
          muatannya pada suhu ruang, pembawa mayoritas sama banyaknya dengan
          dopan:
        </p>
        <Formula
          block
          tex="n \approx N_D \ \ (\text{tipe-n}), \qquad p \approx N_A \ \ (\text{tipe-p})"
        />
        <p>
          Lalu bagaimana dengan pembawa minoritas? Menambah elektron membuat
          hole lebih sering bertemu elektron dan berekombinasi, sehingga jumlah
          hole turun. Dalam keadaan setimbang, hasil kali keduanya selalu tetap:
        </p>
        <Formula block tex="n \cdot p = n_i^2" />
        <p>
          Hubungan ini disebut <Term>hukum aksi massa</Term>. Contoh: silikon
          didoping fosfor <Formula tex="N_D = 10^{16}\ \text{cm}^{-3}" />. Maka
        </p>
        <Formula
          block
          tex="n = 10^{16}\ \text{cm}^{-3}, \qquad p = \frac{n_i^2}{n} = \frac{(10^{10})^2}{10^{16}} = 10^{4}\ \text{cm}^{-3}"
        />
        <p>
          Elektronnya sejuta kali lebih banyak daripada silikon murni, dan
          hole-nya sejuta kali lebih sedikit. Selisih mayoritas dan minoritas
          mencapai dua belas angka nol.
        </p>
        <DopingCalculator />
        <p>
          Perhatikan garis <Formula tex="E_F" /> pada diagram di atas. Pada
          tipe-n, level Fermi naik mendekati pita konduksi. Pada tipe-p, turun
          mendekati pita valensi. Makin berat dopingnya, makin jauh
          pergeserannya dari tengah celah:
        </p>
        <Formula
          block
          tex="E_F - E_i = kT \ln\!\left(\frac{N_D}{n_i}\right) \quad (\text{tipe-n})"
        />
        <p>
          dengan <Formula tex="E_i" /> posisi level Fermi pada bahan intrinsik,
          yaitu tengah celah. Jadi posisi level Fermi langsung memberi tahu
          jenis dan kadar doping suatu bahan.
        </p>
      </Section>

      <Section id="praktik" title="Doping dalam praktik">
        <p>Beberapa hal yang akan muncul lagi di bab-bab fabrikasi:</p>
        <ul>
          <li>
            <Term>Rentang doping.</Term> Biasanya antara{" "}
            <Formula tex="10^{14}" /> dan <Formula tex="10^{20}" /> atom per
            cm³. Doping ringan ditulis n⁻ atau p⁻, doping berat ditulis n⁺ atau
            p⁺.
          </li>
          <li>
            <Term>Kompensasi.</Term> Kalau donor dan akseptor ada bersamaan,
            keduanya saling meniadakan. Yang menentukan tipe bahan adalah
            selisihnya. Inilah yang memungkinkan daerah tipe-n dibuat di dalam
            wafer tipe-p, dan sebaliknya.
          </li>
          <li>
            <Term>Cara memasukkan dopan.</Term> Dopan bisa dicampurkan saat
            kristal ditumbuhkan, dimasukkan dengan difusi pada suhu tinggi,
            atau ditembakkan sebagai ion dengan implantasi ion. Ketiganya
            dibahas di Bab 16 dan 17.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Anggapan bahwa semua dopan melepaskan pembawanya tidak berlaku pada
            suhu sangat rendah, karena energi termalnya tidak cukup. Pada suhu
            sangat tinggi, pembawa intrinsik menjadi lebih banyak daripada
            dopan dan bahan kembali berperilaku seperti silikon murni. Devais
            dirancang untuk bekerja di antara kedua batas itu.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Doping adalah mengganti sebagian kecil atom silikon dengan atom golongan III atau V untuk mengatur jumlah pembawa muatan.",
            "Donor (golongan V) menyumbang elektron dan menghasilkan tipe-n. Akseptor (golongan III) menghasilkan hole dan tipe-p.",
            "Kristal tetap netral: setiap pembawa yang bergerak diimbangi satu ion dopan yang diam.",
            "Pembawa mayoritas kira-kira sama dengan konsentrasi dopan. Pembawa minoritas dihitung dari n · p = nᵢ².",
            "Level Fermi naik mendekati pita konduksi pada tipe-n dan turun mendekati pita valensi pada tipe-p.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="doping" questions={questions} />
      </Section>
    </>
  );
}
