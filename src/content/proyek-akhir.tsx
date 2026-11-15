import { MosfetExplorer, ProcessFlowExplorer } from "@/components/three/lazy";
import { Callout, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";

export const objectives = [
  "Merangkai langkah-langkah fabrikasi menjadi satu alur proses yang utuh",
  "Menjelaskan alasan urutan langkah dan pilihan alat di tiap langkah",
  "Menentukan pemeriksaan yang perlu dilakukan setelah tiap langkah",
  "Menghubungkan hasil uji listrik dengan langkah proses yang menentukannya",
];

const questions: QuizQuestion[] = [
  {
    question: "Kenapa oksida gate ditumbuhkan dengan oksidasi kering, bukan basah?",
    options: [
      "Karena lebih cepat",
      "Karena oksida kering lebih rapat dan mutu listriknya lebih baik",
      "Karena lebih murah",
      "Karena tidak butuh tungku",
    ],
    answer: 1,
    explanation:
      "Oksida gate hanya setebal puluhan nanometer dan harus menahan medan listrik yang sangat kuat. Kecepatan tidak penting di sini, mutu yang menentukan.",
  },
  {
    question: "Pada implantasi source dan drain, apa yang berperan sebagai masker?",
    options: [
      "Photoresist dari mask ketiga",
      "Lapisan aluminium",
      "Gate polisilikon dan oksida medan",
      "Tidak ada masker, seluruh wafer terdoping",
    ],
    answer: 2,
    explanation:
      "Gate sudah berdiri saat implantasi, jadi ion hanya masuk di kedua sisinya. Source dan drain otomatis tepat di tepi gate, tanpa bergantung pada ketelitian penjajaran mask.",
  },
  {
    question: "Metode apa yang dipakai untuk melapiskan aluminium, dan kenapa?",
    options: [
      "Sputtering, karena melapisi dinding lubang kontak lebih baik daripada evaporasi",
      "Spin coating, karena murah",
      "Oksidasi termal, karena suhunya tinggi",
      "ALD, karena paling cepat",
    ],
    answer: 0,
    explanation:
      "Aluminium harus turun menutupi dinding lubang kontak tanpa terputus. Atom sputtering datang dari banyak arah, sedangkan atom evaporasi hanya dari satu arah.",
  },
  {
    question: "Berapa mask yang dipakai dalam alur proses di bab ini?",
    options: ["Satu", "Dua", "Tiga belas", "Empat"],
    answer: 3,
    explanation:
      "Daerah aktif, gate, lubang kontak, dan jalur logam. Implantasi source dan drain tidak memakai mask karena self-aligned.",
  },
  {
    question: "Langkah apa yang wajib menyusul implantasi ion?",
    options: [
      "Pelapisan resist",
      "Annealing, untuk memperbaiki kristal dan mengaktifkan dopan",
      "Wet etch",
      "Pemolesan",
    ],
    answer: 1,
    explanation:
      "Tanpa annealing, kristal di source dan drain masih rusak dan sebagian besar dopan belum menyumbang pembawa muatan.",
  },
];

export function Body() {
  return (
    <>
      <Section id="tujuan" title="Merangkai semuanya">
        <p>
          Sampai di sini setiap langkah dipelajari sendiri-sendiri. Bab
          terakhir ini merangkainya menjadi satu <Term>alur proses</Term>:
          urutan lengkap dari wafer polos sampai devais yang bisa diuji.
        </p>
        <p>
          Devais yang kita buat adalah MOSFET kanal-n, transistor yang cara
          kerjanya sudah kita pelajari di Bab 9. Pilihan ini disengaja.
          Membuat satu MOSFET memakai hampir semua yang ada di kursus ini:
          pembersihan, dua jenis oksidasi, CVD, PVD, implantasi, annealing,
          empat kali litografi, wet etch dan dry etch, serta alat ukur dari
          Bagian E.
        </p>
        <p>
          Alur di bab ini adalah versi yang disederhanakan untuk belajar,
          dengan 13 langkah dan empat mask. Proses chip modern punya ratusan
          langkah dan puluhan mask, tetapi tersusun dari jenis langkah yang
          sama.
        </p>
      </Section>

      <Section id="alur" title="Tiga belas langkah">
        <p>
          Jalankan alurnya dari awal sampai akhir. Di setiap langkah,
          perhatikan empat hal: apa yang berubah pada potongan melintang, alat
          apa yang dipakai, pengaturannya, dan bagaimana hasilnya diperiksa
          sebelum lanjut.
        </p>
        <ProcessFlowExplorer />
      </Section>

      <Section id="kenapa-urutan" title="Kenapa urutannya begitu">
        <p>
          Urutan langkah bukan kebetulan. Ada beberapa aturan yang berlaku
          untuk hampir semua alur proses, dan semuanya terlihat pada alur
          tadi.
        </p>
        <p>
          <Term>Suhu tertinggi di awal.</Term> Oksidasi medan berlangsung pada
          1.000 °C selama berjam-jam, dan itu dilakukan paling awal. Setelah
          aluminium terpasang di langkah 11, suhu tidak boleh lagi melebihi
          kira-kira 450 °C, karena aluminium akan bereaksi dengan silikon dan
          menembus sambungan. Itu sebabnya oksida isolasi di langkah 9 dibuat
          dengan PECVD yang bersuhu rendah, dan pemanasan terakhir hanya
          400 °C. Setiap langkah harus tahan terhadap semua langkah sesudahnya.
        </p>
        <p>
          <Term>Antarmuka terpenting dibuat dalam keadaan paling bersih.</Term>{" "}
          Batas antara silikon dan oksida gate menentukan mutu transistor.
          Wafer dibersihkan tepat sebelum oksidasi gate, dan polisilikon
          dilapiskan segera sesudahnya, sehingga oksida gate tidak pernah
          terkena resist atau plasma.
        </p>
        <p>
          <Term>Biarkan struktur menjajarkan dirinya sendiri.</Term> Di langkah
          7, source dan drain tidak ditentukan oleh mask, melainkan oleh gate
          yang sudah ada. Kalau memakai mask tersendiri, kesalahan penjajaran
          sekecil apa pun akan membuat gate tidak pas di antara source dan
          drain. Dengan cara <Term>self-aligned</Term>, kesalahan itu tidak
          mungkin terjadi.
        </p>
        <p>
          <Term>Pilih etch sesuai kebutuhan.</Term> Membuka daerah aktif di
          langkah 3 cukup dengan wet etch: polanya lebar, murah, dan berhenti
          sendiri di silikon. Membentuk gate di langkah 6 membutuhkan RIE,
          karena lebar gate menentukan panjang kanal dan dindingnya harus
          tegak.
        </p>
        <p>
          <Term>Periksa sebelum lanjut.</Term> Setiap langkah punya
          pemeriksaan. Kesalahan yang ketahuan di langkah 4 hanya membuang
          empat langkah kerja. Kesalahan yang sama, kalau baru ketahuan saat
          uji listrik, membuang semuanya dan sulit dilacak asalnya.
        </p>
      </Section>

      <Section id="uji" title="Uji listrik">
        <p>
          Setelah langkah terakhir, wafer dibawa ke <Term>stasiun probe</Term>.
          Jarum-jarum halus ditempelkan ke kontak source, drain, dan gate, lalu
          dihubungkan ke alat ukur. Yang diukur adalah kurva yang sama dengan
          di Bab 9. Ini transistor yang baru saja kita buat:
        </p>
        <MosfetExplorer />
        <p>
          Bentuk kurva itu menceritakan mutu prosesnya. Setiap besaran yang
          terukur bisa dilacak ke langkah tertentu:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Yang terukur</th>
                <th>Ditentukan terutama oleh</th>
                <th>Langkah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tegangan ambang</td>
                <td>Tebal oksida gate dan doping substrat</td>
                <td>1 dan 4</td>
              </tr>
              <tr>
                <td>Besar arus saat menyala</td>
                <td>Panjang kanal, tebal oksida gate, mobilitas di permukaan</td>
                <td>4 dan 6</td>
              </tr>
              <tr>
                <td>Arus bocor lewat gate</td>
                <td>Mutu dan kebersihan oksida gate</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Arus bocor saat mati</td>
                <td>Mutu sambungan source dan drain</td>
                <td>7 dan 8</td>
              </tr>
              <tr>
                <td>Hambatan seri</td>
                <td>Dosis implantasi dan mutu kontak logam</td>
                <td>7, 10, 11, dan 13</td>
              </tr>
              <tr>
                <td>Transistor terhubung singkat atau terputus</td>
                <td>Kesalahan litografi atau etching</td>
                <td>3, 6, 10, dan 12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Kalau hasilnya tidak sesuai, alat dari Bab 20 dan 21 dipakai untuk
          mencari sebabnya. Penampang SEM menunjukkan apakah lebar gate dan
          tebal lapisan sudah benar. Four-point probe pada wafer uji
          menunjukkan apakah source dan drain cukup menghantar. Inilah
          gunanya menyertakan wafer uji polos di setiap langkah: wafer itu bisa
          diukur dan dirusak tanpa mengorbankan wafer devais.
        </p>
        <Callout kind="penting">
          <p>
            Tidak semua transistor di sebuah wafer berfungsi. Perbandingan
            antara devais yang berfungsi dan jumlah seluruhnya disebut{" "}
            <Term>yield</Term>. Partikel, goresan, dan ketidakseragaman proses
            menurunkannya. Sebagian besar kerja di sebuah pabrik chip bukan
            menemukan proses baru, melainkan menjaga agar ratusan langkah yang
            sama memberi hasil yang sama, wafer demi wafer.
          </p>
        </Callout>
      </Section>

      <Section id="kilas-balik" title="Kilas balik">
        <p>Jalan yang sudah ditempuh dalam kursus ini:</p>
        <ul>
          <li>
            <Term>Bagian A.</Term> Elektron valensi, ikatan kovalen, kisi
            kristal, dan pita energi. Dari sinilah celah pita berasal.
          </li>
          <li>
            <Term>Bagian B.</Term> Elektron dan hole, doping, drift dan difusi,
            sambungan p-n, sampai MOSFET. Dari sinilah cara kerja devais
            berasal.
          </li>
          <li>
            <Term>Bagian C.</Term> Vakum, pertumbuhan film, PVD, CVD, ALD, dan
            metode larutan. Dari sinilah lapisan-lapisan devais berasal.
          </li>
          <li>
            <Term>Bagian D.</Term> Wafer, cleanroom, oksidasi, doping,
            litografi, dan etching. Dari sinilah bentuk devais berasal.
          </li>
          <li>
            <Term>Bagian E.</Term> Pengukuran tebal, bentuk, struktur, serta
            sifat listrik dan optik. Dari sinilah kita tahu bahwa hasilnya
            benar.
          </li>
        </ul>
        <p>
          Gagasan yang sama muncul berulang kali di tempat yang berbeda. Bentuk
          eksponensial <em>exp(−E/kT)</em> mengatur jumlah pembawa muatan,
          difusi dopan, laju CVD, dan laju oksidasi. Jalan bebas rata-rata
          menentukan evaporasi, sputtering, dan arah ion pada RIE. Interferensi
          menjelaskan warna oksida, lapisan antipantul, dan pengukuran tebal.
          Mengenali pola seperti ini lebih berguna daripada menghafal angka.
        </p>
      </Section>

      <Section id="selanjutnya" title="Langkah selanjutnya">
        <p>
          Kursus ini memberi peta. Untuk benar-benar bekerja di bidang ini,
          beberapa arah yang bisa ditempuh:
        </p>
        <ul>
          <li>
            <Term>Masuk ke laboratorium.</Term> Tidak ada pengganti untuk
            memegang wafer sendiri. Banyak universitas punya fasilitas
            fabrikasi yang membuka pelatihan alat.
          </li>
          <li>
            <Term>Membaca buku ajar.</Term> Setiap bab di sini adalah ringkasan
            dari satu atau beberapa bab buku ajar fisika devais dan teknologi
            fabrikasi. Angka dan rumus di kursus ini banyak yang
            disederhanakan, dan buku ajar memberi penurunan lengkapnya.
          </li>
          <li>
            <Term>Mencoba simulasi.</Term> Perangkat lunak simulasi proses dan
            devais memungkinkan Anda menjalankan alur seperti di bab ini dengan
            angka yang sebenarnya, tanpa cleanroom.
          </li>
          <li>
            <Term>Memilih satu bidang.</Term> Sel surya, LED, sensor, memori,
            dan elektronik lentur memakai dasar yang sama, tetapi
            masing-masing punya bahan dan masalahnya sendiri.
          </li>
        </ul>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Sebuah MOSFET kanal-n bisa dibuat dengan 13 langkah dan empat mask: daerah aktif, gate, lubang kontak, dan jalur logam.",
            "Langkah bersuhu tinggi dilakukan lebih dulu. Setelah logam terpasang, suhu proses dibatasi sekitar 450 °C.",
            "Source dan drain dibuat self-aligned: gate yang sudah ada menjadi masker implantasi.",
            "Setiap langkah diikuti pemeriksaan, supaya kesalahan ketahuan sedini mungkin.",
            "Setiap besaran pada kurva hasil uji listrik bisa dilacak ke langkah proses yang menentukannya.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="proyek-akhir" questions={questions} />
      </Section>
    </>
  );
}
