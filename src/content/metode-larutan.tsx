import { SpinCoater } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { DipCoating } from "@/components/widgets/DipCoating";

export const objectives = [
  "Menjelaskan tahap-tahap spin coating dan apa yang menentukan tebal lapisan",
  "Menjelaskan urutan proses sol-gel dari larutan sampai film oksida",
  "Menjelaskan cara kerja dip coating",
  "Membandingkan metode larutan dengan metode vakum",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang terjadi pada tebal lapisan kalau kecepatan putar spin coater dinaikkan?",
    options: ["Makin tebal", "Makin tipis", "Tidak berubah", "Menjadi tidak rata"],
    answer: 1,
    explanation:
      "Gaya sentrifugal yang lebih besar melempar lebih banyak cairan keluar dari wafer, sehingga lapisan yang tersisa lebih tipis.",
  },
  {
    question: "Kecepatan putar dinaikkan menjadi empat kali. Tebal lapisan menjadi kira-kira…",
    options: ["setengahnya", "seperempatnya", "dua kalinya", "seperenam belasnya"],
    answer: 0,
    explanation:
      "Tebal berbanding terbalik dengan akar kecepatan putar. Akar dari empat adalah dua, jadi tebalnya menjadi setengah.",
  },
  {
    question: "Urutan mana yang benar untuk proses sol-gel?",
    options: [
      "Gel, sol, pemanasan, pelapisan",
      "Pemanasan, sol, gel, pelapisan",
      "Sol, pelapisan dan pembentukan gel, pengeringan, pemanasan",
      "Pelapisan, pemanasan, sol, gel",
    ],
    answer: 2,
    explanation:
      "Larutan (sol) dilapiskan ke substrat, berubah menjadi jaringan padat berisi cairan (gel), dikeringkan, lalu dipanaskan sampai menjadi oksida yang rapat.",
  },
  {
    question: "Pada dip coating, apa akibat menarik substrat lebih cepat?",
    options: [
      "Lapisan lebih tipis",
      "Lapisan tidak terbentuk",
      "Tebal lapisan tidak berubah",
      "Lapisan lebih tebal",
    ],
    answer: 3,
    explanation:
      "Cairan yang terseret naik tidak sempat mengalir turun kembali, sehingga lebih banyak yang tertinggal di substrat.",
  },
  {
    question: "Apa kelemahan utama metode larutan dibanding metode vakum?",
    options: [
      "Alatnya jauh lebih mahal",
      "Kemurnian film dan kendali tebal untuk lapisan yang sangat tipis lebih sulit dicapai",
      "Tidak bisa dipakai untuk substrat besar",
      "Selalu membutuhkan suhu di atas 1.000 °C",
    ],
    answer: 1,
    explanation:
      "Sisa pelarut dan bahan organik bisa tertinggal di dalam film, dan lapisan beberapa nanometer sulit dibuat seragam. Sebaliknya, biaya dan kesederhanaannya adalah keunggulan.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gagasan" title="Lapisan tipis tanpa ruang vakum">
        <p>
          PVD dan CVD membutuhkan ruang vakum, pompa, dan catu daya, dengan
          harga yang mahal. Ada cara yang jauh lebih sederhana: larutkan bahan
          ke dalam cairan, lapiskan cairan itu ke substrat, lalu hilangkan
          pelarutnya. Yang tertinggal adalah lapisan tipis bahan padat.
        </p>
        <p>
          Semua <Term>metode larutan</Term> punya tiga langkah yang sama:
          membuat larutan, melapiskannya menjadi lapisan basah yang rata, lalu
          mengeringkan dan memanaskannya. Yang membedakan satu metode dari yang
          lain adalah cara melapiskan cairannya.
        </p>
        <p>
          Metode ini tidak kalah penting dari metode vakum. Lapisan photoresist
          pada setiap langkah fotolitografi (Bab 18) dibuat dengan spin
          coating, sehingga setiap chip yang pernah dibuat sudah melewati
          proses ini puluhan kali.
        </p>
      </Section>

      <Section id="spin-coating" title="Spin coating">
        <p>
          Pada <Term>spin coating</Term>, cairan diteteskan ke tengah substrat,
          lalu substrat diputar dengan kecepatan ribuan putaran per menit.
          Tekan tombol pada model di bawah, lalu coba kecepatan dan kekentalan
          yang berbeda.
        </p>
        <SpinCoater />
        <p>Prosesnya berlangsung dalam empat tahap:</p>
        <ol>
          <li>
            <Term>Penetesan.</Term> Cairan diteteskan di tengah, dalam jumlah
            yang jauh lebih banyak daripada yang akan tertinggal.
          </li>
          <li>
            <Term>Penyebaran.</Term> Substrat dipercepat. Gaya sentrifugal
            mendorong cairan ke tepi, dan lebih dari 90% cairan terlempar
            keluar.
          </li>
          <li>
            <Term>Penipisan.</Term> Lapisan yang tersisa terus mengalir ke luar
            dan menipis. Makin tipis lapisannya, makin lambat alirannya, karena
            gesekan dengan substrat makin terasa.
          </li>
          <li>
            <Term>Penguapan.</Term> Pelarut menguap dan cairan makin kental
            sampai berhenti mengalir. Tebal lapisan terkunci.
          </li>
        </ol>
        <p>
          Tebal akhir ditentukan oleh tarik-menarik antara gaya sentrifugal
          yang menipiskan dan kekentalan yang menahan. Hubungannya dengan
          kecepatan putar <Formula tex="\omega" /> adalah
        </p>
        <Formula block tex="t \;\propto\; \frac{1}{\sqrt{\omega}}" />
        <p>
          Menaikkan kecepatan putar empat kali hanya menipiskan lapisan
          menjadi setengahnya. Karena itu kecepatan putar dipakai untuk
          pengaturan halus, biasanya antara 1.000 dan 6.000 rpm. Untuk
          mengubah tebal dengan besar, yang diubah adalah kekentalan atau
          kepekatan larutannya.
        </p>
        <Callout kind="penting">
          <p>
            Tebal lapisan hampir tidak bergantung pada banyaknya cairan yang
            diteteskan atau lamanya putaran, asalkan cukup. Inilah yang membuat
            spin coating sangat mudah diulang: keseragaman tebal di seluruh
            wafer bisa lebih baik dari 1%.
          </p>
        </Callout>
        <p>Beberapa hal yang perlu diketahui dalam praktik:</p>
        <ul>
          <li>
            Di tepi wafer, tegangan permukaan menahan cairan sehingga terbentuk
            tonjolan yang disebut <Term>edge bead</Term>. Tonjolan ini biasanya
            dibuang dengan semprotan pelarut.
          </li>
          <li>
            Debu di permukaan menghalangi aliran dan meninggalkan jejak seperti
            ekor komet.
          </li>
          <li>
            Setelah diputar, lapisan dipanaskan di atas pelat panas untuk
            mengusir sisa pelarut.
          </li>
          <li>
            Spin coating hanya cocok untuk substrat yang rata dan tidak terlalu
            besar, dan sebagian besar bahannya terbuang.
          </li>
        </ul>
      </Section>

      <Section id="sol-gel" title="Sol-gel">
        <p>
          Spin coating adalah cara melapiskan. <Term>Sol-gel</Term> adalah cara
          membuat larutannya, khususnya untuk film oksida seperti{" "}
          <Formula tex="\text{SiO}_2" />, <Formula tex="\text{TiO}_2" />, dan{" "}
          <Formula tex="\text{ZnO}" />. Oksida tidak larut dalam pelarut biasa,
          jadi yang dilarutkan adalah senyawa lain yang nanti berubah menjadi
          oksida.
        </p>
        <ol>
          <li>
            <Term>Sol.</Term> Senyawa logam-organik, misalnya TEOS untuk
            silikon dioksida, dilarutkan dalam alkohol dengan sedikit air.
            Molekulnya bereaksi dengan air (hidrolisis), lalu mulai saling
            menyambung (kondensasi) menjadi partikel berukuran beberapa
            nanometer yang melayang di dalam cairan. Cairan ini disebut sol.
          </li>
          <li>
            <Term>Pelapisan.</Term> Sol dilapiskan ke substrat dengan spin
            coating atau dip coating.
          </li>
          <li>
            <Term>Gel.</Term> Saat pelarut menguap, partikel-partikel itu
            saling menyambung menjadi satu jaringan padat berpori yang masih
            berisi cairan. Inilah gel.
          </li>
          <li>
            <Term>Pengeringan.</Term> Sisa cairan diuapkan pada sekitar 100
            sampai 150 °C. Lapisan menyusut banyak.
          </li>
          <li>
            <Term>Pemanasan.</Term> Pada 300 sampai 600 °C, sisa bahan organik
            terbakar habis, pori-pori menutup, dan lapisan menjadi oksida yang
            rapat. Pada suhu lebih tinggi, lapisan mengkristal.
          </li>
        </ol>
        <Callout kind="analogi">
          <p>
            Agar-agar dimulai sebagai cairan, lalu mengeras menjadi jaringan
            padat yang masih penuh air. Kalau dikeringkan, ia menyusut menjadi
            lembaran tipis yang keras. Sol-gel melewati perubahan yang sama,
            dengan hasil akhir berupa oksida.
          </p>
        </Callout>
        <p>
          Karena lapisan menyusut banyak, lapisan yang terlalu tebal akan
          retak saat dikeringkan. Satu kali pelapisan biasanya dibatasi sampai
          sekitar 100 nm. Untuk film yang lebih tebal, pelapisan dan pemanasan
          diulang beberapa kali.
        </p>
        <p>
          Kelebihan sol-gel adalah komposisinya mudah diatur. Menambahkan
          dopan cukup dengan mencampurkan sedikit senyawa lain ke dalam
          larutan, dan pencampurannya terjadi sampai tingkat molekul.
        </p>
      </Section>

      <Section id="dip-coating" title="Dip coating">
        <p>
          Pada <Term>dip coating</Term>, substrat dicelupkan ke dalam larutan,
          lalu ditarik keluar tegak lurus dengan kecepatan tetap. Selapis
          cairan ikut terbawa di kedua sisi substrat.
        </p>
        <DipCoating />
        <p>
          Tebal lapisan ditentukan oleh perlombaan antara dua hal. Kekentalan
          cairan menyeretnya naik bersama substrat, sedangkan gravitasi dan
          tegangan permukaan menariknya turun kembali. Makin cepat substrat
          ditarik, makin sedikit waktu cairan untuk mengalir turun:
        </p>
        <Formula block tex="t \;\propto\; U^{2/3}" />
        <p>
          dengan <Formula tex="U" /> kecepatan tarik. Arah pengaruhnya
          berlawanan dengan spin coating: di sini lebih cepat berarti lebih
          tebal.
        </p>
        <p>
          Dip coating melapisi kedua sisi sekaligus, bisa dipakai untuk benda
          yang tidak rata seperti tabung dan lensa, dan hampir tidak membuang
          bahan. Syaratnya, penarikan harus sangat halus. Getaran sekecil apa
          pun meninggalkan garis-garis mendatar pada lapisan.
        </p>
      </Section>

      <Section id="lainnya" title="Cara pelapisan lain">
        <p>
          Spin coating dan dip coating sulit dipakai untuk luas besar. Untuk
          produksi, ada cara lain dengan prinsip yang sama:
        </p>
        <ul>
          <li>
            <Term>Blade coating.</Term> Sebilah pisau lurus digeser di atas
            substrat dengan celah tertentu dan meratakan cairan di belakangnya.
          </li>
          <li>
            <Term>Slot-die coating.</Term> Cairan dipompa keluar dari celah
            sempit ke atas substrat yang bergerak. Tebalnya ditentukan oleh
            laju pompa, dan hampir tidak ada bahan yang terbuang.
          </li>
          <li>
            <Term>Spray coating.</Term> Cairan disemprotkan sebagai kabut
            halus. Cocok untuk permukaan yang tidak rata.
          </li>
          <li>
            <Term>Pencetakan inkjet.</Term> Tetesan kecil ditembakkan hanya ke
            tempat yang diinginkan, sehingga pola terbentuk langsung tanpa
            fotolitografi.
          </li>
        </ul>
        <p>
          Cara-cara ini bisa dijalankan pada lembaran plastik yang bergerak
          dari gulungan ke gulungan, seperti mesin cetak koran. Dari sinilah
          harapan akan sel surya dan elektronik lentur yang murah berasal.
        </p>
      </Section>

      <Section id="perbandingan" title="Larutan atau vakum">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Metode larutan</th>
                <th>Metode vakum (PVD, CVD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Biaya alat</td>
                <td>Rendah</td>
                <td>Tinggi</td>
              </tr>
              <tr>
                <td>Kecepatan untuk luas besar</td>
                <td>Tinggi</td>
                <td>Sedang</td>
              </tr>
              <tr>
                <td>Kemurnian film</td>
                <td>Sedang, sisa pelarut dan bahan organik bisa tertinggal</td>
                <td>Tinggi</td>
              </tr>
              <tr>
                <td>Kerapatan film</td>
                <td>Sering berpori</td>
                <td>Rapat</td>
              </tr>
              <tr>
                <td>Kendali tebal di bawah 10 nm</td>
                <td>Sulit</td>
                <td>Baik, dan sangat baik dengan ALD</td>
              </tr>
              <tr>
                <td>Pelapisan parit sempit</td>
                <td>Mengisi dan meratakan, tidak mengikuti bentuk</td>
                <td>Bisa mengikuti bentuk</td>
              </tr>
              <tr>
                <td>Bahan yang cocok</td>
                <td>Polimer, oksida, bahan organik, perovskit</td>
                <td>Logam, semikonduktor, isolator bermutu tinggi</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Keduanya saling melengkapi. Bahan organik dan polimer akan rusak
          kalau diuapkan, jadi hampir selalu dilapiskan dari larutan. Lapisan
          gate dan kontak logam pada chip menuntut kemurnian yang hanya bisa
          dicapai di dalam vakum. Banyak devais memakai keduanya: sel surya
          perovskit, misalnya, punya lapisan penyerap dari larutan dan
          elektroda logam dari evaporasi.
        </p>
      </Section>

      <Section id="penutup-bagian" title="Penutup Bagian C">
        <p>
          Sekarang kita punya gambaran lengkap tentang cara membuat lapisan
          tipis: dari vakum dan pertumbuhan film sebagai dasar, sampai PVD,
          CVD, ALD, dan metode larutan sebagai alatnya.
        </p>
        <p>
          Tetapi sebuah lapisan yang menutupi seluruh wafer belum menjadi
          devais. Lapisan itu harus dibentuk menjadi pola, dan wafernya sendiri
          harus disiapkan, dioksidasi, dan didoping di tempat yang tepat.
          Itulah isi Bagian D, yang dimulai dari wafer dan ruangan tempat
          semuanya dikerjakan.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Metode larutan melapiskan bahan sebagai cairan lalu menghilangkan pelarutnya. Murah dan cepat, tanpa ruang vakum.",
            "Spin coating memutar substrat sampai cairan menipis. Tebalnya berbanding terbalik dengan akar kecepatan putar dan sangat mudah diulang.",
            "Sol-gel membuat film oksida dari larutan: sol, pelapisan, gel, pengeringan, lalu pemanasan.",
            "Dip coating menarik substrat keluar dari larutan. Makin cepat ditarik, makin tebal lapisannya.",
            "Metode larutan unggul dalam biaya dan luas, sedangkan metode vakum unggul dalam kemurnian, kerapatan, dan kendali tebal yang sangat tipis.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="metode-larutan" questions={questions} />
      </Section>
    </>
  );
}
