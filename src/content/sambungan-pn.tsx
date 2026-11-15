import { JunctionExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";

export const objectives = [
  "Menjelaskan terbentuknya daerah deplesi dan potensial bawaan",
  "Menjelaskan keadaan setimbang sebagai keseimbangan difusi dan drift",
  "Menjelaskan pengaruh bias maju dan bias mundur",
  "Membaca kurva arus terhadap tegangan sebuah dioda",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa isi daerah deplesi?",
    options: [
      "Elektron bebas dan hole dalam jumlah besar",
      "Ion dopan yang diam, hampir tanpa pembawa muatan bebas",
      "Atom silikon tanpa dopan",
      "Ruang hampa",
    ],
    answer: 1,
    explanation:
      "Pembawa bebasnya sudah pergi dan berekombinasi. Yang tertinggal adalah ion akseptor negatif di sisi p dan ion donor positif di sisi n.",
  },
  {
    question: "Pada keadaan setimbang tanpa tegangan luar, kenapa tidak ada arus bersih?",
    options: [
      "Karena tidak ada pembawa muatan",
      "Karena arus difusi dan arus drift sama besar dan berlawanan arah",
      "Karena sambungannya isolator",
      "Karena suhunya terlalu rendah",
    ],
    answer: 1,
    explanation:
      "Difusi mendorong pembawa mayoritas menyeberang, sedangkan medan di daerah deplesi mendorong balik. Keduanya saling meniadakan.",
  },
  {
    question: "Bias maju berarti…",
    options: [
      "sisi p dihubungkan ke kutub negatif",
      "kedua sisi dihubungkan ke kutub yang sama",
      "sisi p dihubungkan ke kutub positif, sehingga penghalang turun",
      "sambungan dipanaskan",
    ],
    answer: 2,
    explanation:
      "Tegangan luar melawan potensial bawaan. Penghalang yang lebih rendah membuat jauh lebih banyak pembawa bisa menyeberang.",
  },
  {
    question: "Apa yang terjadi pada daerah deplesi saat bias mundur diperbesar?",
    options: ["Menyempit", "Melebar", "Hilang", "Tidak berubah"],
    answer: 1,
    explanation:
      "Tegangan mundur menarik pembawa mayoritas menjauhi sambungan, sehingga lebih banyak ion yang terbuka dan daerah deplesi melebar.",
  },
  {
    question: "Bagaimana arus dioda berubah terhadap tegangan pada bias maju?",
    options: [
      "Naik secara linear",
      "Tetap",
      "Turun",
      "Naik secara eksponensial",
    ],
    answer: 3,
    explanation:
      "Arus mengikuti exp(V/kT). Pada suhu ruang, arus naik sekitar sepuluh kali untuk setiap tambahan 60 mV.",
  },
];

export function Body() {
  return (
    <>
      <Section id="pertemuan" title="Saat tipe-p bertemu tipe-n">
        <p>
          Semua bab sebelumnya mengarah ke sini. Ambil sepotong silikon, buat
          satu sisinya tipe-p dan sisi lainnya tipe-n. Perbatasan keduanya
          disebut <Term>sambungan p-n</Term>, dan hampir semua devais
          semikonduktor dibangun dari satu atau lebih sambungan seperti ini.
        </p>
        <p>
          Di sisi p ada sangat banyak hole dan hampir tidak ada elektron. Di
          sisi n sebaliknya. Perbedaan konsentrasi sebesar itu memicu difusi,
          seperti yang kita pelajari di Bab 7. Hole berdifusi dari p ke n, dan
          elektron berdifusi dari n ke p.
        </p>
        <p>
          Tetapi difusi ini tidak berlangsung sampai semuanya merata.
          Penyebabnya adalah ion dopan yang kita bahas di Bab 6. Hole yang
          meninggalkan sisi p meninggalkan ion akseptor negatif yang tidak bisa
          ikut bergerak. Elektron yang meninggalkan sisi n meninggalkan ion
          donor positif. Pembawa yang menyeberang lalu bertemu pembawa lawannya
          dan berekombinasi.
        </p>
        <p>
          Hasilnya adalah lapisan tipis di sekitar perbatasan yang sudah kosong
          dari pembawa bebas dan hanya berisi ion: negatif di sisi p, positif
          di sisi n. Lapisan ini disebut <Term>daerah deplesi</Term>.
        </p>
      </Section>

      <Section id="setimbang" title="Medan bawaan dan keadaan setimbang">
        <p>
          Muatan positif di satu sisi dan negatif di sisi lain menghasilkan
          medan listrik yang mengarah dari sisi n ke sisi p. Medan ini mendorong
          hole kembali ke sisi p dan elektron kembali ke sisi n, berlawanan
          dengan arah difusi.
        </p>
        <p>
          Makin banyak pembawa yang menyeberang, makin lebar daerah deplesi dan
          makin kuat medannya, sampai dorongan drift tepat mengimbangi difusi.
          Pada titik itu tercapai <Term>keadaan setimbang</Term>: kedua aliran
          tetap ada, tetapi sama besar dan berlawanan, sehingga arus bersihnya
          nol.
        </p>
        <Callout kind="analogi">
          <p>
            Dua kolam dengan tinggi air berbeda dihubungkan pipa. Air mengalir
            dari yang tinggi ke yang rendah. Bayangkan setiap air yang pindah
            membuat sebuah bendungan di pipa itu naik sedikit. Aliran berhenti
            sendiri saat bendungan cukup tinggi, jauh sebelum kedua kolam sama
            rata.
          </p>
        </Callout>
        <p>
          Medan itu berarti ada beda potensial di antara kedua sisi walaupun
          tidak ada tegangan dari luar. Beda potensial ini disebut{" "}
          <Term>potensial bawaan</Term>:
        </p>
        <Formula block tex="V_{bi} = \frac{kT}{q} \ln\!\left(\frac{N_A N_D}{n_i^2}\right)" />
        <p>
          Untuk silikon dengan doping <Formula tex="10^{16}\ \text{cm}^{-3}" />{" "}
          di kedua sisi, hasilnya sekitar 0,72 V. Lebar daerah deplesinya
        </p>
        <Formula
          block
          tex="W = \sqrt{\frac{2\varepsilon_s}{q}\left(\frac{1}{N_A} + \frac{1}{N_D}\right)\left(V_{bi} - V\right)}"
        />
        <p>
          dengan <Formula tex="V" /> tegangan luar, yang dibahas sebentar lagi.
          Pada contoh tadi lebarnya sekitar 0,43 µm. Makin berat dopingnya,
          makin sempit daerah deplesinya, karena ion yang dibutuhkan untuk
          membangun medan yang sama sudah tersedia dalam jarak yang lebih
          pendek.
        </p>
        <Callout kind="catatan">
          <p>
            Potensial bawaan tidak bisa diukur dengan menempelkan voltmeter ke
            kedua ujung dioda. Di sambungan antara silikon dan kabel logam
            muncul beda potensial lain yang tepat meniadakannya. Kalau tidak
            begitu, dioda akan menjadi sumber energi gratis.
          </p>
        </Callout>
      </Section>

      <Section id="bias" title="Bias maju dan bias mundur">
        <p>
          Sekarang beri tegangan dari luar. Geser tegangan pada model di bawah
          ke kanan dan ke kiri, dan perhatikan tiga hal sekaligus: lebar daerah
          deplesi, tinggi penghalang pada diagram pita, dan posisi titik pada
          kurva arus.
        </p>
        <JunctionExplorer />
        <p>
          <Term>Bias maju</Term> berarti sisi p dihubungkan ke kutub positif.
          Tegangan luar melawan potensial bawaan, sehingga penghalang turun
          menjadi <Formula tex="V_{bi} - V" /> dan daerah deplesi menyempit.
          Jumlah pembawa yang punya cukup energi untuk melompati penghalang
          naik secara eksponensial, dan arus besar mengalir. Hole masuk ke sisi
          n dan elektron masuk ke sisi p, lalu berekombinasi di sana.
        </p>
        <p>
          <Term>Bias mundur</Term> berarti sisi p dihubungkan ke kutub negatif.
          Tegangan luar menambah penghalang dan menarik pembawa mayoritas
          menjauhi sambungan, sehingga daerah deplesi melebar. Pembawa
          mayoritas tidak bisa menyeberang. Yang mengalir hanya arus sangat
          kecil dari pembawa minoritas yang kebetulan sampai di tepi daerah
          deplesi dan tersapu medan.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Bias maju</th>
                <th>Bias mundur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sisi p terhubung ke</td>
                <td>Kutub positif</td>
                <td>Kutub negatif</td>
              </tr>
              <tr>
                <td>Penghalang</td>
                <td>Turun</td>
                <td>Naik</td>
              </tr>
              <tr>
                <td>Daerah deplesi</td>
                <td>Menyempit</td>
                <td>Melebar</td>
              </tr>
              <tr>
                <td>Arus</td>
                <td>Besar, naik eksponensial</td>
                <td>Sangat kecil, hampir tetap</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="kurva-iv" title="Persamaan dioda">
        <p>Kedua keadaan itu dirangkum oleh satu persamaan:</p>
        <Formula
          block
          tex="I = I_s\left[\exp\!\left(\frac{qV}{kT}\right) - 1\right]"
        />
        <p>
          <Formula tex="I_s" /> disebut <Term>arus jenuh mundur</Term>, yang
          nilainya sangat kecil. Besaran <Formula tex="kT/q" /> adalah tegangan
          termal, sekitar 26 mV pada suhu ruang. Dari persamaan ini:
        </p>
        <ul>
          <li>
            Pada bias maju, suku eksponensial menguasai. Arus naik sekitar
            sepuluh kali untuk setiap tambahan 60 mV.
          </li>
          <li>
            Pada bias mundur, suku eksponensial hilang dan arus tertahan di{" "}
            <Formula tex="-I_s" />.
          </li>
        </ul>
        <p>
          Karena kenaikannya sangat curam, pada skala biasa kurvanya tampak
          seperti punya “tegangan nyala”: hampir tidak ada arus sampai sekitar
          0,6 sampai 0,7 V untuk silikon, lalu arus naik sangat cepat. Angka
          0,7 V yang sering disebut di pelajaran elektronika berasal dari sini.
          Itu bukan tetapan alam, melainkan akibat bentuk eksponensial dan
          skala arus yang kita pakai.
        </p>
        <Callout kind="penting">
          <p>
            Sambungan p-n melewatkan arus ke satu arah dan menahannya ke arah
            sebaliknya. Sifat satu arah inilah yang dipakai untuk mengubah arus
            bolak-balik menjadi arus searah, dan devaisnya disebut dioda.
          </p>
        </Callout>
      </Section>

      <Section id="batas" title="Dua hal di luar model ideal">
        <ul>
          <li>
            <Term>Tembus (breakdown).</Term> Kalau bias mundur terus
            diperbesar, medan di daerah deplesi akhirnya cukup kuat untuk
            melepaskan pembawa baru secara beruntun, dan arus mundur naik
            tajam. Tegangan tembus makin rendah kalau dopingnya makin berat.
            Dioda Zener sengaja dirancang untuk bekerja di daerah ini sebagai
            penstabil tegangan.
          </li>
          <li>
            <Term>Kapasitansi.</Term> Daerah deplesi adalah lapisan tanpa
            pembawa bebas yang diapit dua daerah penghantar, sama seperti
            kapasitor. Karena lebarnya berubah terhadap tegangan,
            kapasitansinya juga berubah. Sifat ini dipakai pada rangkaian
            penala frekuensi, dan juga dipakai untuk mengukur profil doping.
          </li>
        </ul>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Di sambungan p-n, pembawa mayoritas berdifusi ke seberang dan meninggalkan ion dopan yang diam. Daerah berisi ion tanpa pembawa bebas ini disebut daerah deplesi.",
            "Ion-ion itu menghasilkan medan dari sisi n ke sisi p dan potensial bawaan, sekitar 0,7 V untuk silikon.",
            "Pada keadaan setimbang, arus difusi dan arus drift saling meniadakan.",
            "Bias maju menurunkan penghalang dan menyempitkan daerah deplesi, sehingga arus naik eksponensial. Bias mundur melakukan sebaliknya dan hanya menyisakan arus sangat kecil.",
            "Persamaan dioda: I = Iₛ [exp(qV/kT) − 1].",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="sambungan-pn" questions={questions} />
      </Section>
    </>
  );
}
