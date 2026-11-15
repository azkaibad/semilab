import { Callout, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { LayerStack } from "@/components/widgets/LayerStack";
import { ScaleRuler } from "@/components/widgets/ScaleRuler";

export const objectives = [
  "Menjelaskan apa yang dimaksud thin film dan rentang ketebalannya",
  "Membandingkan tebal film dengan benda sehari-hari",
  "Menjelaskan kenapa bahan dalam bentuk lapisan tipis berguna",
  "Menyebutkan peran dan syarat substrat",
];

const questions: QuizQuestion[] = [
  {
    question: "Berapa rentang tebal yang biasa disebut thin film?",
    options: [
      "Beberapa milimeter sampai beberapa sentimeter",
      "Beberapa nanometer sampai beberapa mikrometer",
      "Selalu tepat satu lapis atom",
      "Lebih tebal daripada wafer",
    ],
    answer: 1,
    explanation:
      "Batasnya tidak kaku, tetapi thin film umumnya setebal beberapa nanometer sampai beberapa mikrometer.",
  },
  {
    question: "Apa itu substrat?",
    options: [
      "Benda padat tempat film ditumbuhkan",
      "Gas yang dipakai untuk membuat film",
      "Lapisan paling atas dari sebuah film",
      "Alat pengukur ketebalan",
    ],
    answer: 0,
    explanation:
      "Film terlalu tipis untuk berdiri sendiri, jadi selalu ditumbuhkan di atas benda penopang yang disebut substrat.",
  },
  {
    question: "Kenapa lapisan tipis bisa tampak berwarna-warni, seperti pada gelembung sabun?",
    options: [
      "Karena bahannya mengandung zat warna",
      "Karena lapisannya panas",
      "Karena tebalnya sebanding dengan panjang gelombang cahaya, sehingga terjadi interferensi",
      "Karena lapisannya menghantarkan listrik",
    ],
    answer: 2,
    explanation:
      "Cahaya yang dipantulkan permukaan atas dan bawah lapisan saling menguatkan atau meniadakan, bergantung pada tebal lapisan dan warnanya.",
  },
  {
    question: "Film setebal 100 nm kira-kira terdiri dari berapa lapis atom?",
    options: ["Satu", "Sekitar sepuluh", "Sekitar sejuta", "Beberapa ratus"],
    answer: 3,
    explanation:
      "Jarak antarlapis atom sekitar 0,2 sampai 0,3 nm, jadi 100 nm setara kira-kira 400 lapis atom.",
  },
  {
    question: "Mana yang termasuk syarat substrat yang baik?",
    options: [
      "Permukaannya kasar agar film menempel",
      "Pemuaian termalnya mendekati pemuaian film",
      "Harus selalu terbuat dari silikon",
      "Harus lebih tipis daripada filmnya",
    ],
    answer: 1,
    explanation:
      "Kalau pemuaian film dan substrat jauh berbeda, perubahan suhu selama proses menimbulkan stress yang bisa meretakkan atau mengelupaskan film.",
  },
];

export function Body() {
  return (
    <>
      <Section id="apa-itu" title="Apa itu thin film">
        <p>
          Bagian B ditutup dengan MOSFET, yang tersusun dari lapisan-lapisan
          sangat tipis: oksida gate, gate, kontak logam. Bagian C membahas cara
          membuat lapisan seperti itu.
        </p>
        <p>
          <Term>Thin film</Term>, atau lapisan tipis, adalah lapisan bahan
          dengan tebal dari beberapa nanometer sampai beberapa mikrometer yang
          ditumbuhkan di atas sebuah benda padat. Benda penopang itu disebut{" "}
          <Term>substrat</Term>.
        </p>
        <p>
          Kata kuncinya adalah <em>ditumbuhkan</em>. Thin film tidak dibuat
          dengan menipiskan bahan tebal. Film dibangun dari bawah, atom demi
          atom atau molekul demi molekul, sampai mencapai tebal yang
          diinginkan. Proses menumbuhkan film disebut <Term>deposisi</Term>.
        </p>
        <Callout kind="analogi">
          <p>
            Embun beku di kaca jendela terbentuk dari uap air yang menempel
            sedikit demi sedikit. Tidak ada yang mengoleskannya. Deposisi
            bekerja dengan cara yang mirip, hanya saja bahan, suhu, dan
            lajunya dikendalikan dengan teliti.
          </p>
        </Callout>
      </Section>

      <Section id="skala" title="Seberapa tipis">
        <p>
          Satu nanometer adalah sepersejuta milimeter. Angka sekecil itu sulit
          dibayangkan, jadi bandingkan dengan benda yang sudah dikenal. Geser
          tebal film pada penggaris di bawah.
        </p>
        <ScaleRuler />
        <p>Beberapa patokan yang berguna untuk diingat:</p>
        <ul>
          <li>Jarak antaratom di dalam padatan sekitar 0,2 sampai 0,3 nm.</li>
          <li>
            Film 100 nm, tebal yang sangat umum, setara kira-kira 400 lapis
            atom dan 700 kali lebih tipis daripada sehelai rambut.
          </li>
          <li>
            Panjang gelombang cahaya tampak adalah 400 sampai 700 nm. Banyak
            film lebih tipis daripada itu, sehingga tidak bisa dilihat
            tebalnya dengan mikroskop cahaya.
          </li>
          <li>
            Wafer silikon setebal kira-kira 0,7 mm. Dibanding film di atasnya,
            wafer ribuan sampai ratusan ribu kali lebih tebal.
          </li>
        </ul>
      </Section>

      <Section id="kenapa" title="Kenapa dibuat tipis">
        <p>Ada empat alasan utama.</p>
        <ul>
          <li>
            <Term>Fungsinya memang butuh tipis.</Term> Oksida gate MOSFET harus
            tipis agar medan dari gate terasa kuat di kanal. Lapisan antipantul
            harus setebal seperempat panjang gelombang cahaya.
          </li>
          <li>
            <Term>Sifat bahan berubah saat tipis.</Term> Pada film yang sangat
            tipis, sebagian besar atomnya berada di permukaan atau di batas
            dengan lapisan lain. Sifat listrik, optik, dan mekaniknya bisa
            berbeda dari bahan yang sama dalam bentuk bongkahan.
          </li>
          <li>
            <Term>Lapisan bisa ditumpuk.</Term> Bahan yang berbeda, misalnya
            logam, isolator, dan semikonduktor, bisa disusun bertingkat di atas
            satu substrat. Sebuah chip modern punya puluhan lapisan.
          </li>
          <li>
            <Term>Hemat bahan.</Term> Lapisan emas setebal 100 nm di atas kaca
            memantulkan cahaya sama baiknya dengan emas pejal, dengan bahan
            yang jauh lebih sedikit.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Warna-warni pada gelembung sabun dan lapisan minyak di atas air
            berasal dari tebal lapisannya, bukan dari zat warna. Cahaya yang
            dipantulkan permukaan atas dan permukaan bawah lapisan saling
            menguatkan untuk warna tertentu dan saling meniadakan untuk warna
            lain. Efek <Term>interferensi</Term> ini dipakai untuk mengukur
            tebal film, yang dibahas di Bab 20.
          </p>
        </Callout>
      </Section>

      <Section id="substrat" title="Substrat">
        <p>
          Film setipis itu tidak bisa berdiri sendiri, jadi substrat adalah
          bagian dari setiap proses. Substrat yang umum:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Substrat</th>
                <th>Dipakai untuk</th>
                <th>Kelebihan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wafer silikon</td>
                <td>Chip, sensor, penelitian</td>
                <td>Sangat rata, sangat murni, kristal tunggal</td>
              </tr>
              <tr>
                <td>Kaca</td>
                <td>Layar, sel surya, kaca jendela berlapis</td>
                <td>Tembus cahaya, murah, bisa berukuran besar</td>
              </tr>
              <tr>
                <td>Safir</td>
                <td>LED biru dan putih</td>
                <td>Tahan suhu tinggi, kisinya cukup cocok untuk GaN</td>
              </tr>
              <tr>
                <td>Plastik</td>
                <td>Elektronik lentur, kemasan</td>
                <td>Lentur dan ringan, tetapi tidak tahan panas</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Substrat bukan sekadar alas. Substrat ikut menentukan mutu film:</p>
        <ul>
          <li>
            <Term>Kerataan dan kebersihan.</Term> Sebutir debu berukuran 1 µm
            sepuluh kali lebih tinggi daripada film 100 nm. Itu sebabnya
            pembersihan substrat selalu menjadi langkah pertama.
          </li>
          <li>
            <Term>Ketahanan suhu.</Term> Banyak proses deposisi berlangsung
            pada ratusan derajat Celsius.
          </li>
          <li>
            <Term>Pemuaian termal.</Term> Kalau film dan substrat memuai dengan
            laju berbeda, pendinginan setelah deposisi menimbulkan stress.
          </li>
          <li>
            <Term>Susunan kristal.</Term> Di atas substrat kristal tunggal yang
            jarak atomnya cocok, film bisa tumbuh meneruskan susunan kristal
            substrat. Pertumbuhan seperti ini disebut epitaksi (Bab 14).
          </li>
        </ul>
      </Section>

      <Section id="contoh" title="Thin film di sekitar kita">
        <p>
          Lapisan tipis ada di hampir semua teknologi modern, tidak hanya di
          dalam chip. Lihat susunan lapisan pada empat contoh berikut.
        </p>
        <LayerStack />
        <p>
          Contoh lain: lapisan aluminium pemantul di cermin dan kemasan
          makanan, lapisan keras titanium nitrida berwarna emas pada mata bor,
          lapisan magnetik pada hard disk, dan lapisan pemantul panas pada kaca
          gedung.
        </p>
      </Section>

      <Section id="peta" title="Peta Bagian C">
        <p>Cara membuat thin film terbagi menjadi tiga kelompok besar:</p>
        <ul>
          <li>
            <Term>Deposisi fisik (PVD).</Term> Bahan padat diuapkan atau
            ditembak sampai atomnya lepas, lalu atom itu mendarat di substrat
            (Bab 13).
          </li>
          <li>
            <Term>Deposisi kimia (CVD dan ALD).</Term> Gas bereaksi di
            permukaan substrat dan meninggalkan lapisan padat (Bab 14).
          </li>
          <li>
            <Term>Metode larutan.</Term> Bahan dilarutkan, dilapiskan sebagai
            cairan, lalu dikeringkan (Bab 15).
          </li>
        </ul>
        <p>
          Sebelum membahas alatnya, ada dua bekal yang diperlukan. Hampir semua
          PVD dan CVD berlangsung di dalam ruang hampa, jadi Bab 11 membahas
          teknologi vakum. Lalu Bab 12 membahas apa yang terjadi di permukaan
          substrat saat atom mendarat, karena itu berlaku untuk semua metode.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Thin film adalah lapisan setebal beberapa nanometer sampai beberapa mikrometer yang ditumbuhkan atom demi atom di atas substrat. Proses menumbuhkannya disebut deposisi.",
            "Film 100 nm setara kira-kira 400 lapis atom dan 700 kali lebih tipis daripada rambut.",
            "Lapisan dibuat tipis karena fungsinya menuntut begitu, karena sifat bahan berubah saat tipis, karena bisa ditumpuk, dan karena hemat bahan.",
            "Substrat menentukan mutu film lewat kerataan, kebersihan, ketahanan suhu, pemuaian termal, dan susunan kristalnya.",
            "Tiga kelompok metode: deposisi fisik (PVD), deposisi kimia (CVD dan ALD), dan metode larutan.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="pengantar-thin-film" questions={questions} />
      </Section>
    </>
  );
}
