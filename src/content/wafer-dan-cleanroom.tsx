import { CzochralskiExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { CleanroomClass } from "@/components/widgets/CleanroomClass";

export const objectives = [
  "Menjelaskan jalan dari pasir sampai silikon dengan kemurnian elektronik",
  "Menjelaskan penarikan kristal Czochralski dan pembuatan wafer dari ingot",
  "Menjelaskan kenapa fabrikasi membutuhkan cleanroom dan arti kelasnya",
  "Menyebutkan langkah pembersihan wafer dan apa yang dibuang tiap langkah",
];

const questions: QuizQuestion[] = [
  {
    question: "Bagaimana kristal tunggal silikon dibuat dengan metode Czochralski?",
    options: [
      "Serbuk silikon dipadatkan dengan tekanan tinggi",
      "Benih kristal dicelupkan ke lelehan silikon lalu ditarik perlahan sambil diputar",
      "Gas silana diendapkan di atas kaca",
      "Lelehan silikon dituang ke cetakan dan didinginkan cepat",
    ],
    answer: 1,
    explanation:
      "Atom dari lelehan membeku di ujung benih dan mengikuti susunan kristalnya, sehingga seluruh ingot menjadi satu kristal.",
  },
  {
    question: "Seberapa murni silikon yang dipakai untuk chip?",
    options: ["99%", "99,9%", "Sekitar 99,9999999% atau lebih", "Tepat 100%"],
    answer: 2,
    explanation:
      "Silikon kelas elektronik punya paling banyak sekitar satu atom pengotor per satu miliar atom silikon. Itu perlu karena doping yang disengaja pun hanya beberapa atom per sejuta.",
  },
  {
    question: "Kenapa fabrikasi dilakukan di cleanroom?",
    options: [
      "Karena partikel debu lebih besar daripada fitur yang dibuat dan bisa merusak devais",
      "Agar suhunya lebih dingin",
      "Agar wafer tidak terkena cahaya matahari",
      "Agar alatnya tidak berisik",
    ],
    answer: 0,
    explanation:
      "Sebutir debu berukuran 1 µm bisa menutupi ratusan transistor, menghalangi cahaya saat litografi, atau membuat lubang pada film.",
  },
  {
    question: "Mana yang benar tentang ruang ISO 5 dan ISO 7?",
    options: [
      "Keduanya sama bersih",
      "ISO 7 lebih bersih",
      "ISO 5 sepuluh kali lebih bersih",
      "ISO 5 seratus kali lebih bersih",
    ],
    answer: 3,
    explanation:
      "Setiap turun satu kelas, batas jumlah partikel turun sepuluh kali. Selisih dua kelas berarti seratus kali.",
  },
  {
    question: "Apa peran asam fluorida (HF) encer dalam pembersihan wafer?",
    options: [
      "Membuang sisa bahan organik",
      "Melarutkan lapisan oksida tipis di permukaan silikon",
      "Mengeringkan wafer",
      "Menambahkan dopan",
    ],
    answer: 1,
    explanation:
      "HF melarutkan silikon dioksida tetapi tidak silikon, sehingga meninggalkan permukaan silikon yang bersih dan bebas oksida.",
  },
];

export function Body() {
  return (
    <>
      <Section id="dari-pasir" title="Dari pasir ke silikon murni">
        <p>
          Bagian D mengikuti perjalanan sebuah wafer melewati langkah-langkah
          fabrikasi. Perjalanan itu dimulai sebelum wafernya ada.
        </p>
        <p>
          Silikon adalah unsur terbanyak kedua di kerak bumi, tetapi selalu
          terikat dengan oksigen sebagai silika, bahan utama pasir kuarsa.
          Pemurniannya berlangsung dalam dua tahap besar.
        </p>
        <ol>
          <li>
            <Term>Silikon metalurgi.</Term> Kuarsa dipanaskan bersama karbon
            di dalam tungku busur listrik pada sekitar 2.000 °C. Karbon
            mengambil oksigennya:
            <Formula block tex="\text{SiO}_2 + 2\,\text{C} \;\longrightarrow\; \text{Si} + 2\,\text{CO}" />
            Hasilnya silikon dengan kemurnian sekitar 98 sampai 99%. Itu cukup
            untuk paduan aluminium, tetapi masih sangat jauh dari cukup untuk
            elektronik.
          </li>
          <li>
            <Term>Silikon kelas elektronik.</Term> Silikon metalurgi
            direaksikan dengan hidrogen klorida menjadi triklorosilana, cairan
            yang mendidih pada 32 °C. Cairan ini dimurnikan dengan distilasi
            berulang, lalu diuraikan kembali menjadi silikon di atas batang
            silikon panas. Proses ini adalah CVD dari Bab 14 dalam ukuran
            raksasa.
          </li>
        </ol>
        <p>
          Hasil akhirnya adalah polisilikon dengan kemurnian 99,9999999%,
          biasa disebut sembilan angka sembilan, atau lebih tinggi lagi.
          Artinya paling banyak satu atom pengotor di antara satu miliar atom
          silikon.
        </p>
        <Callout kind="penting">
          <p>
            Kemurnian setinggi itu bukan berlebihan. Dari Bab 6, doping yang
            ringan hanya sekitar satu atom dopan per sepuluh juta atom
            silikon. Bahan awal harus jauh lebih bersih daripada itu, supaya
            sifat listriknya ditentukan oleh dopan yang sengaja ditambahkan,
            bukan oleh pengotor.
          </p>
        </Callout>
      </Section>

      <Section id="czochralski" title="Menarik kristal tunggal">
        <p>
          Polisilikon sudah murni, tetapi masih tersusun dari banyak butir
          kecil. Devais membutuhkan kristal tunggal. Cara yang dipakai untuk
          hampir semua wafer adalah <Term>metode Czochralski</Term>, dinamai
          menurut penemunya. Jalankan prosesnya pada model di bawah.
        </p>
        <CzochralskiExplorer />
        <p>
          Polisilikon dilelehkan di dalam krusibel kuarsa pada sedikit di atas
          titik leleh silikon, 1.414 °C. Dopan ditambahkan ke lelehan dalam
          takaran yang tepat, sehingga seluruh ingot langsung menjadi tipe-p
          atau tipe-n. Lalu sebuah <Term>benih</Term>, yaitu potongan kecil
          kristal tunggal dengan arah kristal yang diinginkan, dicelupkan dan
          ditarik perlahan sambil diputar.
        </p>
        <p>
          Atom dari lelehan membeku di ujung benih dan menempati posisi yang
          meneruskan susunan kristalnya. Ingot seberat ratusan kilogram itu
          seluruhnya meniru benih yang hanya sebesar pensil. Benih dan krusibel
          diputar berlawanan arah agar suhu dan dopan merata.
        </p>
        <Callout kind="analogi">
          <p>
            Lilin dibuat dengan mencelupkan sumbu ke lilin cair berkali-kali
            sampai menebal. Penarikan Czochralski mirip, tetapi hanya satu
            kali celup dan satu tarikan panjang yang sangat pelan, sehingga
            setiap atom sempat menempati tempat yang benar.
          </p>
        </Callout>
        <p>
          Untuk keperluan yang menuntut kemurnian lebih tinggi lagi, misalnya
          devais daya, dipakai <Term>metode zona mengambang</Term>. Batang
          polisilikon dilelehkan sebagian oleh kumparan pemanas yang digeser
          dari ujung ke ujung, tanpa krusibel. Karena lelehan tidak menyentuh
          wadah apa pun, tidak ada oksigen dari kuarsa yang ikut larut.
        </p>
      </Section>

      <Section id="wafer" title="Dari ingot menjadi wafer">
        <p>Ingot yang sudah jadi diolah melalui serangkaian langkah mekanik:</p>
        <ol>
          <li>
            <Term>Penggerindaan.</Term> Ingot dibubut sampai diameternya tepat,
            lalu diberi tanda arah kristal: sisi rata (<em>flat</em>) pada
            wafer kecil, atau takik kecil (<em>notch</em>) pada wafer 200 mm
            ke atas.
          </li>
          <li>
            <Term>Pengirisan.</Term> Gergaji kawat memotong ingot menjadi
            ratusan keping sekaligus.
          </li>
          <li>
            <Term>Perataan dan etsa.</Term> Kedua sisi digosok sampai rata,
            lalu lapisan yang rusak akibat gergaji dilarutkan secara kimia.
          </li>
          <li>
            <Term>Pemolesan.</Term> Satu sisi dipoles dengan gabungan gosokan
            mekanik dan reaksi kimia sampai menjadi cermin. Kekasaran
            permukaannya di bawah satu nanometer, hanya beberapa lapis atom.
          </li>
        </ol>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Diameter</th>
                <th>Tebal</th>
                <th>Dipakai untuk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 mm (4 inci)</td>
                <td>525 µm</td>
                <td>Laboratorium penelitian dan pendidikan</td>
              </tr>
              <tr>
                <td>150 mm (6 inci)</td>
                <td>675 µm</td>
                <td>Devais daya, sensor, MEMS</td>
              </tr>
              <tr>
                <td>200 mm (8 inci)</td>
                <td>725 µm</td>
                <td>Chip analog, sensor, mikrokontroler</td>
              </tr>
              <tr>
                <td>300 mm (12 inci)</td>
                <td>775 µm</td>
                <td>Prosesor dan memori</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Wafer yang lebih besar memuat lebih banyak chip dalam satu kali
          proses, sehingga biaya per chip turun. Wafer juga dibuat lebih tebal
          seiring diameternya agar tidak melengkung atau pecah. Label wafer
          menyebut empat hal yang sudah kita pelajari: diameter, arah kristal
          seperti (100), jenis dopan, dan resistivitas.
        </p>
      </Section>

      <Section id="cleanroom" title="Cleanroom">
        <p>
          Udara di ruangan biasa mengandung puluhan juta partikel per meter
          kubik: debu, serat kain, serpihan kulit, dan asap. Sebagian besar
          berukuran antara 0,1 dan 10 µm. Bandingkan dengan ukuran yang kita
          kerjakan: film setebal 100 nm dan pola selebar di bawah 1 µm.
        </p>
        <p>
          Satu partikel yang mendarat di wafer bisa menghalangi cahaya saat
          litografi, membuat lubang pada film, atau menghubungkan dua jalur
          logam yang seharusnya terpisah. Karena itu fabrikasi dilakukan di{" "}
          <Term>cleanroom</Term>, ruangan yang jumlah partikel udaranya
          dikendalikan.
        </p>
        <CleanroomClass />
        <p>Cleanroom dijaga bersih dengan beberapa cara sekaligus:</p>
        <ul>
          <li>
            <Term>Penyaringan.</Term> Udara dialirkan melalui filter HEPA atau
            ULPA di langit-langit, yang menahan lebih dari 99,97% partikel
            berukuran 0,3 µm.
          </li>
          <li>
            <Term>Aliran laminar.</Term> Udara mengalir lurus dari
            langit-langit ke lantai berlubang tanpa berputar-putar, sehingga
            partikel yang muncul langsung tersapu ke bawah.
          </li>
          <li>
            <Term>Tekanan lebih.</Term> Tekanan di dalam sedikit lebih tinggi
            daripada di luar. Saat pintu dibuka, udara mengalir keluar, bukan
            masuk.
          </li>
          <li>
            <Term>Pakaian khusus.</Term> Manusia adalah sumber partikel
            terbesar: orang yang sedang berjalan melepaskan jutaan partikel
            per menit. Baju terusan, tudung, masker, sarung tangan, dan sepatu
            khusus dipakai untuk melindungi wafer dari manusia, bukan
            sebaliknya.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Ruang litografi di cleanroom diterangi lampu kuning. Photoresist
            peka terhadap cahaya biru dan ultraungu, dan lampu putih biasa
            mengandung keduanya. Cahaya kuning aman bagi resist. Ini dibahas
            lagi di Bab 18.
          </p>
        </Callout>
        <p>
          Selain partikel, cleanroom juga mengendalikan suhu, biasanya 21 °C
          dengan simpangan di bawah satu derajat, kelembapan sekitar 45%,
          getaran, dan listrik statis.
        </p>
      </Section>

      <Section id="pembersihan" title="Pembersihan wafer">
        <p>
          Wafer yang tampak mengilap pun membawa pengotor: partikel, lapisan
          tipis bahan organik, jejak logam, dan oksida tipis yang tumbuh
          sendiri di udara. Wafer dibersihkan sebelum setiap langkah suhu
          tinggi, karena pada suhu tinggi pengotor di permukaan akan masuk ke
          dalam silikon. Urutan baku yang dipakai disebut{" "}
          <Term>pembersihan RCA</Term>:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Langkah</th>
                <th>Larutan</th>
                <th>Yang dibuang</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SC-1</td>
                <td>Amonia, hidrogen peroksida, dan air pada 75 °C</td>
                <td>Bahan organik dan partikel</td>
              </tr>
              <tr>
                <td>Celup HF</td>
                <td>Asam fluorida encer</td>
                <td>Oksida tipis di permukaan</td>
              </tr>
              <tr>
                <td>SC-2</td>
                <td>Asam klorida, hidrogen peroksida, dan air pada 75 °C</td>
                <td>Jejak logam</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Di antara setiap langkah, wafer dibilas dengan{" "}
          <Term>air deionisasi</Term>, air yang ion-ionnya sudah dibuang
          sampai resistivitasnya 18 MΩ·cm. Air keran tidak bisa dipakai karena
          meninggalkan natrium dan logam lain. Terakhir, wafer dikeringkan
          dengan diputar atau dengan semburan nitrogen.
        </p>
        <p>
          Untuk kotoran organik yang berat, seperti sisa photoresist, dipakai
          campuran asam sulfat dan hidrogen peroksida yang disebut{" "}
          <Term>larutan piranha</Term>. Di laboratorium, pembersihan ringan
          sering cukup dengan aseton, lalu isopropanol, lalu air deionisasi.
        </p>
        <Callout kind="penting">
          <p>
            Asam fluorida sangat berbahaya. Asam ini menembus kulit tanpa rasa
            sakit pada awalnya, lalu merusak jaringan dan tulang di bawahnya,
            dan paparan yang luas bisa mematikan. HF hanya boleh dipakai
            setelah pelatihan khusus, dengan pelindung lengkap, di dalam lemari
            asam, dan dengan gel kalsium glukonat tersedia di dekatnya.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Kuarsa direduksi menjadi silikon metalurgi, lalu dimurnikan lewat triklorosilana menjadi polisilikon dengan kemurnian sembilan angka sembilan.",
            "Metode Czochralski menarik kristal tunggal dari lelehan dengan benih: leher, bahu, badan, lalu ekor.",
            "Ingot digerinda, diiris, diratakan, dan dipoles menjadi wafer. Diameter yang umum adalah 100 sampai 300 mm.",
            "Cleanroom mengendalikan jumlah partikel dengan filter, aliran laminar, tekanan lebih, dan pakaian khusus. Setiap turun satu kelas ISO, partikel berkurang sepuluh kali.",
            "Pembersihan RCA membuang bahan organik dan partikel (SC-1), oksida (HF), dan logam (SC-2), dengan bilasan air deionisasi di antaranya.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="wafer-dan-cleanroom" questions={questions} />
      </Section>
    </>
  );
}
