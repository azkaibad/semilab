import { OrbitalExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { LevelFiller } from "@/components/widgets/LevelFiller";
import { StandingWave } from "@/components/widgets/StandingWave";

export const objectives = [
  "Menjelaskan kenapa energi elektron yang terkurung hanya boleh bernilai tertentu",
  "Membaca gambar awan elektron sebagai peta peluang",
  "Menuliskan konfigurasi elektron silikon dengan subkulit s dan p",
  "Menjelaskan prinsip larangan Pauli dan akibatnya",
];

const questions: QuizQuestion[] = [
  {
    question: "Kenapa elektron yang terkurung hanya boleh punya energi tertentu?",
    options: [
      "Karena elektron terlalu ringan",
      "Karena hanya gelombang yang tepat muat di ruang kurungannya yang diperbolehkan",
      "Karena inti atom menolak energi lain",
      "Karena elektron tidak bisa bergerak",
    ],
    answer: 1,
    explanation:
      "Elektron berperilaku sebagai gelombang. Seperti senar gitar, hanya gelombang berdiri tertentu yang muat, dan tiap gelombang punya energinya sendiri.",
  },
  {
    question: "Kalau kotak tempat elektron terkurung dipersempit, jarak antar-tingkat energinya…",
    options: ["mengecil", "tetap", "membesar", "menjadi nol"],
    answer: 2,
    explanation:
      "Energi berbanding terbalik dengan kuadrat lebar kotak. Kotak yang lebih sempit membuat tingkat energinya makin renggang.",
  },
  {
    question: "Apa yang digambarkan oleh awan elektron?",
    options: [
      "Lintasan yang dilalui elektron",
      "Elektron yang pecah menjadi banyak bagian",
      "Peluang menemukan elektron di tiap tempat",
      "Suhu elektron",
    ],
    answer: 2,
    explanation:
      "Bagian awan yang rapat berarti elektron lebih sering ditemukan di sana. Elektronnya tetap satu.",
  },
  {
    question: "Berapa elektron paling banyak yang bisa menempati satu orbital?",
    options: ["1", "2, dengan spin berlawanan", "6", "8"],
    answer: 1,
    explanation:
      "Prinsip larangan Pauli: tidak ada dua elektron dengan keadaan yang persis sama. Satu orbital memuat dua elektron hanya kalau spinnya berbeda.",
  },
  {
    question: "Manakah konfigurasi elektron silikon (14 elektron)?",
    options: [
      "1s² 2s² 2p⁶ 3s² 3p²",
      "1s² 2s² 2p⁶ 3s⁴",
      "1s² 2s⁸ 3s⁴",
      "1s² 2s² 2p⁸ 3s²",
    ],
    answer: 0,
    explanation:
      "Subkulit s memuat 2 elektron dan p memuat 6. Empat elektron terakhir masuk ke 3s dan 3p, itulah elektron valensinya.",
  },
];

export function Body() {
  return (
    <>
      <Section id="kenapa-kuantum" title="Kenapa perlu kuantum">
        <p>
          Di Bab 1 kita memakai gambar elektron yang mengelilingi inti seperti
          planet. Gambar itu berguna untuk menghitung elektron, tetapi tidak
          bisa menjawab dua pertanyaan penting. Pertama, kenapa energi elektron
          hanya boleh bernilai tertentu? Kedua, kenapa tiap kulit punya batas
          jumlah elektron?
        </p>
        <p>
          Jawabannya datang dari fisika kuantum. Kita tidak akan membahas
          seluruhnya. Cukup tiga gagasan, karena hanya tiga itu yang dipakai
          untuk memahami semikonduktor:
        </p>
        <ol>
          <li>Elektron berperilaku sebagai gelombang.</li>
          <li>Akibatnya, energi elektron yang terkurung bersifat diskrit.</li>
          <li>Dua elektron tidak boleh menempati keadaan yang sama.</li>
        </ol>
      </Section>

      <Section id="gelombang" title="Gagasan 1: elektron adalah gelombang">
        <p>
          Elektron bukan hanya bola kecil bermuatan. Dalam percobaan, elektron
          juga menunjukkan sifat gelombang: bisa berinterferensi dan
          terdifraksi seperti cahaya. Panjang gelombangnya ditentukan oleh
          momentumnya,
        </p>
        <Formula block tex="\lambda = \frac{h}{p}" />
        <p>
          dengan <Formula tex="h" /> tetapan Planck dan <Formula tex="p" />{" "}
          momentum. Elektron yang dipercepat oleh tegangan 1 volt punya panjang
          gelombang sekitar 1,2 nm, sebanding dengan jarak antaratom dalam
          kristal. Karena itu sifat gelombang elektron tidak bisa diabaikan di
          dalam bahan padat.
        </p>
        <p>
          Sekarang kurung gelombang itu di antara dua dinding. Gelombang harus
          bernilai nol di kedua dinding, sehingga hanya gelombang yang tepat
          muat yang bisa bertahan: setengah gelombang, satu gelombang, satu
          setengah gelombang, dan seterusnya.
        </p>
        <Callout kind="analogi">
          <p>
            Senar gitar yang dijepit di kedua ujungnya hanya bisa bergetar pada
            nada-nada tertentu. Tidak ada nada di antaranya. Elektron yang
            terkurung berperilaku sama, dan “nada” elektron adalah energinya.
          </p>
        </Callout>
        <StandingWave />
        <p>Energi tiap tingkat adalah</p>
        <Formula block tex="E_n = \frac{n^2 h^2}{8 m L^2}, \qquad n = 1, 2, 3, \dots" />
        <p>
          dengan <Formula tex="m" /> massa elektron dan <Formula tex="L" />{" "}
          lebar kotak. Ada dua hal yang perlu diingat dari rumus ini. Energi
          tidak pernah nol, dan makin sempit kotaknya, makin renggang
          tingkat-tingkat energinya.
        </p>
        <Callout kind="penting">
          <p>
            Hal kedua itu punya akibat nyata. Lapisan tipis yang tebalnya hanya
            beberapa nanometer mengurung elektron seperti kotak ini, sehingga
            sifat listrik dan optiknya berubah mengikuti ketebalan. Efek ini
            dipakai pada laser semikonduktor dan layar quantum dot.
          </p>
        </Callout>
      </Section>

      <Section id="orbital" title="Gagasan 2: tingkat energi dan orbital dalam atom">
        <p>
          Di dalam atom, elektron tidak dikurung oleh dinding melainkan oleh
          tarikan inti. Hasilnya tetap sama: hanya energi tertentu yang
          diperbolehkan. Untuk hidrogen,
        </p>
        <Formula block tex="E_n = -\frac{13{,}6\ \text{eV}}{n^2}" />
        <p>
          Tanda negatif berarti elektron terikat ke inti. Bilangan{" "}
          <Formula tex="n" /> inilah nomor kulit di Bab 1: K untuk{" "}
          <Formula tex="n = 1" />, L untuk <Formula tex="n = 2" />, dan
          seterusnya. Satuan eV (elektronvolt) adalah energi yang didapat satu
          elektron saat melewati beda tegangan 1 volt, dan akan kita pakai
          terus.
        </p>
        <p>
          Elektron bisa pindah tingkat dengan menyerap atau memancarkan cahaya
          yang energinya tepat sama dengan selisih kedua tingkat itu. Itulah
          sebabnya tiap unsur memancarkan warna cahaya yang khas.
        </p>
        <p>
          Gelombang elektron di dalam atom berbentuk tiga dimensi dan disebut{" "}
          <Term>orbital</Term>. Orbital bukan lintasan. Orbital adalah peta
          peluang: daerah tempat elektron paling mungkin ditemukan. Tiap kulit
          terdiri dari satu atau lebih <Term>subkulit</Term> dengan bentuk
          orbital yang berbeda:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Subkulit</th>
                <th>Bentuk</th>
                <th>Jumlah orbital</th>
                <th>Kapasitas elektron</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>s</td>
                <td>Bola</td>
                <td>1</td>
                <td>2</td>
              </tr>
              <tr>
                <td>p</td>
                <td>Dua cuping</td>
                <td>3</td>
                <td>6</td>
              </tr>
              <tr>
                <td>d</td>
                <td>Lebih rumit</td>
                <td>5</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Kulit K hanya punya subkulit 1s. Kulit L punya 2s dan 2p. Kulit M
          punya 3s, 3p, dan 3d.
        </p>
        <OrbitalExplorer />
        <p>
          Orbital terakhir pada model di atas penting untuk silikon. Saat
          silikon berikatan, satu orbital s dan tiga orbital p di kulit
          terluarnya bercampur menjadi empat orbital <Term>hibrida sp³</Term>{" "}
          yang setara. Keempatnya mengarah ke sudut tetrahedron, dan inilah
          asal sudut 109,5° serta struktur intan di Bab 2.
        </p>
        <Callout kind="catatan">
          <p>
            Model di atas dihitung untuk orbital kulit kedua. Pada silikon yang
            bercampur adalah orbital 3s dan 3p. Ukurannya lebih besar, tetapi
            arah keempat cupingnya sama.
          </p>
        </Callout>
      </Section>

      <Section id="pauli" title="Gagasan 3: prinsip larangan Pauli">
        <p>
          Kalau semua elektron boleh menempati tingkat energi terendah, semua
          atom akan berperilaku mirip dan tidak akan ada tabel periodik.
          Kenyataannya tidak begitu, karena berlaku{" "}
          <Term>prinsip larangan Pauli</Term>: tidak ada dua elektron yang boleh
          berada dalam keadaan yang persis sama.
        </p>
        <p>
          Elektron punya sifat bawaan bernama <Term>spin</Term> yang hanya
          punya dua nilai, biasa digambar sebagai panah ke atas dan ke bawah.
          Jadi satu orbital memuat paling banyak dua elektron, satu dengan spin
          atas dan satu dengan spin bawah. Elektron berikutnya harus naik ke
          orbital yang energinya lebih tinggi.
        </p>
        <Callout kind="analogi">
          <p>
            Bayangkan gedung dengan kamar berisi dua tempat tidur. Penghuni
            mengisi lantai paling bawah lebih dulu, dan kalau satu kamar sudah
            berisi dua orang, penghuni berikutnya harus mencari kamar lain atau
            naik ke lantai di atasnya.
          </p>
        </Callout>
        <p>
          Geser jumlah elektron di bawah dari 1 sampai 18 dan perhatikan urutan
          pengisiannya.
        </p>
        <LevelFiller />
        <p>
          Sekarang aturan <Formula tex="2n^2" /> dari Bab 1 punya penjelasan.
          Kulit ke-<Formula tex="n" /> berisi <Formula tex="n^2" /> orbital,
          dan tiap orbital memuat 2 elektron. Untuk silikon hasilnya
        </p>
        <Formula block tex="1s^2\ 2s^2\ 2p^6\ 3s^2\ 3p^2" />
        <p>
          Empat elektron di 3s dan 3p adalah elektron valensi yang kita kenal
          dari Bab 1.
        </p>
      </Section>

      <Section id="menuju-pita" title="Bekal untuk bab berikutnya">
        <p>
          Semua pembahasan di bab ini berlaku untuk satu atom yang sendirian.
          Di dalam kristal, miliaran atom berdekatan dan orbital terluarnya
          saling tumpang-tindih. Prinsip Pauli tetap berlaku untuk seluruh
          kristal, sehingga elektron dari atom yang berbeda tidak boleh
          menempati keadaan yang sama. Tingkat energi yang tadinya sama harus
          memecah. Dari situlah pita energi muncul, dan itu topik Bab 4.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Elektron berperilaku sebagai gelombang dengan panjang gelombang λ = h/p.",
            "Gelombang yang terkurung hanya bisa berbentuk gelombang berdiri tertentu, sehingga energinya diskrit. Makin sempit kurungannya, makin renggang tingkat energinya.",
            "Orbital adalah peta peluang menemukan elektron, bukan lintasan. Subkulit s berbentuk bola, p berbentuk dua cuping.",
            "Prinsip larangan Pauli: satu orbital memuat paling banyak dua elektron dengan spin berlawanan.",
            "Konfigurasi silikon adalah 1s² 2s² 2p⁶ 3s² 3p². Orbital 3s dan 3p bercampur menjadi empat hibrida sp³ yang mengarah ke sudut tetrahedron.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="kuantum-secukupnya" questions={questions} />
      </Section>
    </>
  );
}
