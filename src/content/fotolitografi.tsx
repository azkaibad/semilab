import { LithoExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { ResolutionCalculator } from "@/components/widgets/ResolutionCalculator";

export const objectives = [
  "Menjelaskan urutan langkah fotolitografi dari pelapisan resist sampai pola jadi",
  "Membedakan resist positif dan resist negatif",
  "Menjelaskan apa yang membatasi ukuran pola terkecil",
  "Menjelaskan teknik lift-off dan kapan dipakai",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang terjadi pada resist positif setelah disinari?",
    options: [
      "Bagian yang tersinari mengeras",
      "Bagian yang tersinari menjadi mudah larut dalam developer",
      "Seluruh resist menguap",
      "Tidak terjadi apa-apa",
    ],
    answer: 1,
    explanation:
      "Pada resist positif, cahaya mengubah bahan peka cahayanya sehingga bagian itu larut dalam developer. Yang tertinggal adalah bagian yang terlindung krom.",
  },
  {
    question: "Apa fungsi mask pada fotolitografi?",
    options: [
      "Membawa pola yang menahan cahaya di tempat tertentu",
      "Melindungi wafer dari debu",
      "Memanaskan resist",
      "Meratakan resist",
    ],
    answer: 0,
    explanation:
      "Mask adalah pelat kaca dengan pola krom. Cahaya hanya lewat di bagian yang bening, sehingga pola mask berpindah ke resist.",
  },
  {
    question: "Bagaimana cara mencetak pola yang lebih halus?",
    options: [
      "Memakai resist yang lebih tebal",
      "Menyinari lebih lama",
      "Memakai panjang gelombang yang lebih pendek atau apertur numerik yang lebih besar",
      "Memakai wafer yang lebih besar",
    ],
    answer: 2,
    explanation:
      "Menurut rumus Rayleigh, ukuran terkecil sebanding dengan panjang gelombang dan berbanding terbalik dengan apertur numerik.",
  },
  {
    question: "Kenapa ruang litografi diterangi lampu kuning?",
    options: [
      "Agar mata tidak lelah",
      "Agar wafer tampak lebih jelas",
      "Agar suhu ruangan stabil",
      "Karena resist tidak peka terhadap cahaya kuning",
    ],
    answer: 3,
    explanation:
      "Resist peka terhadap cahaya biru dan ultraungu. Cahaya kuning tidak punya cukup energi per foton untuk mengubah resist.",
  },
  {
    question: "Urutan mana yang benar?",
    options: [
      "Penyinaran, pelapisan resist, pengembangan, soft bake",
      "Pelapisan resist, soft bake, penyinaran, pengembangan",
      "Pengembangan, penyinaran, pelapisan resist, soft bake",
      "Soft bake, pengembangan, pelapisan resist, penyinaran",
    ],
    answer: 1,
    explanation:
      "Resist dilapiskan, dikeringkan dengan soft bake, disinari lewat mask, lalu dikembangkan untuk memunculkan polanya.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gagasan" title="Mencetak pola dengan cahaya">
        <p>
          Semua proses yang sudah kita pelajari bekerja pada seluruh permukaan
          wafer sekaligus. Deposisi melapisi semuanya, oksidasi mengoksidasi
          semuanya. Tetapi sebuah chip berisi miliaran bentuk kecil di tempat
          yang sangat tepat. Yang menentukan <em>di mana</em> sesuatu terjadi
          adalah <Term>fotolitografi</Term>.
        </p>
        <p>
          Gagasannya sama dengan mencetak foto dari film negatif. Wafer
          dilapisi bahan peka cahaya yang disebut <Term>photoresist</Term>,
          atau resist saja. Cahaya disorotkan melalui <Term>mask</Term> yang
          membawa pola. Di tempat yang tersinari, sifat larut resist berubah.
          Setelah dibilas dengan larutan pengembang, tertinggal pola resist
          yang melindungi sebagian wafer dan membiarkan sisanya terbuka.
        </p>
        <p>
          Pola resist itu sendiri bukan tujuan akhir. Resist adalah pelindung
          sementara untuk langkah berikutnya: etching, implantasi, atau
          deposisi. Setelah itu resist dibuang. Sebuah chip modern melewati
          siklus ini lebih dari lima puluh kali, masing-masing dengan mask
          yang berbeda.
        </p>
      </Section>

      <Section id="langkah" title="Langkah demi langkah">
        <p>
          Ikuti delapan langkah pada model di bawah. Setelah sampai di langkah
          pengembangan, ganti jenis resist dan lihat bedanya.
        </p>
        <LithoExplorer />
        <p>Beberapa langkah tambahan yang tidak digambarkan pada model:</p>
        <ul>
          <li>
            <Term>Penyiapan permukaan.</Term> Sebelum resist dilapiskan, wafer
            dipanaskan untuk mengusir air, lalu diberi uap HMDS, zat yang
            membuat resist menempel lebih baik pada oksida.
          </li>
          <li>
            <Term>Bake setelah penyinaran.</Term> Pemanasan singkat yang
            meratakan pola riak akibat pantulan cahaya di dalam resist.
          </li>
          <li>
            <Term>Hard bake.</Term> Pemanasan setelah pengembangan, sekitar 120
            °C, agar resist lebih tahan terhadap etching.
          </li>
          <li>
            <Term>Pemeriksaan.</Term> Pola diperiksa di bawah mikroskop.
            Inilah kelebihan besar litografi: kalau hasilnya buruk, resist
            bisa dilepas dan seluruh langkah diulang tanpa merusak wafer.
          </li>
        </ul>
      </Section>

      <Section id="resist" title="Resist positif dan negatif">
        <p>
          Resist terdiri dari tiga bahan: polimer sebagai badan lapisan, bahan
          peka cahaya, dan pelarut yang membuatnya bisa dilapiskan.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Resist positif</th>
                <th>Resist negatif</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bagian yang tersinari</td>
                <td>Menjadi mudah larut</td>
                <td>Mengeras, tidak larut</td>
              </tr>
              <tr>
                <td>Pola resist dibanding pola krom</td>
                <td>Sama</td>
                <td>Kebalikannya</td>
              </tr>
              <tr>
                <td>Yang terjadi akibat cahaya</td>
                <td>Bahan penghambat larut terurai</td>
                <td>Rantai polimer saling menyambung</td>
              </tr>
              <tr>
                <td>Ketajaman pola</td>
                <td>Lebih baik</td>
                <td>Sedikit mengembang saat dikembangkan</td>
              </tr>
              <tr>
                <td>Pemakaian</td>
                <td>Sebagian besar litografi</td>
                <td>Lift-off, struktur tebal dan permanen</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Resist positif lebih umum karena polanya lebih tajam. Resist negatif
          dipilih saat dibutuhkan lapisan yang tebal dan kuat, atau bentuk
          dinding yang miring ke dalam untuk lift-off.
        </p>
        <Callout kind="catatan">
          <p>
            Lampu kuning di ruang litografi berasal dari sini. Resist dirancang
            untuk peka terhadap cahaya ultraungu dan biru. Foton cahaya kuning
            tidak punya cukup energi untuk memicu reaksinya, jadi wafer yang
            sudah dilapisi resist aman dibawa-bawa di bawah lampu kuning.
          </p>
        </Callout>
      </Section>

      <Section id="penyinaran" title="Cara menyinari">
        <p>Ada tiga cara membawa pola mask ke wafer.</p>
        <ul>
          <li>
            <Term>Kontak.</Term> Mask ditekan langsung ke resist.
            Ketajamannya baik dan alatnya sederhana, tetapi mask cepat rusak
            dan kotor karena terus bersentuhan dengan resist.
          </li>
          <li>
            <Term>Proksimitas.</Term> Mask diletakkan 10 sampai 50 µm di atas
            resist. Mask lebih awet, tetapi cahaya menyebar di celah itu,
            sehingga pola terkecil hanya beberapa mikrometer.
          </li>
          <li>
            <Term>Proyeksi.</Term> Sistem lensa memproyeksikan gambar mask ke
            wafer, biasanya diperkecil empat kali. Mask tidak pernah menyentuh
            wafer, dan cacat pada mask ikut mengecil. Alatnya menyinari satu
            petak kecil, lalu menggeser wafer ke petak berikutnya, sehingga
            disebut <Term>stepper</Term>.
          </li>
        </ul>
        <p>
          Laboratorium penelitian umumnya memakai penyinaran kontak dengan alat
          yang disebut mask aligner. Semua produksi chip memakai proyeksi.
        </p>
        <p>
          Sebuah devais dibuat dari banyak lapisan pola, dan setiap lapisan
          harus tepat berada di atas lapisan sebelumnya. Kesalahan penempatan
          antarlapisan disebut <Term>overlay</Term>. Pada chip modern,
          kesalahan ini harus di bawah beberapa nanometer di seluruh wafer
          selebar 300 mm.
        </p>
      </Section>

      <Section id="resolusi" title="Batas ukuran terkecil">
        <p>
          Cahaya adalah gelombang, dan gelombang menyebar saat melewati bukaan
          sempit. Peristiwa ini disebut difraksi, dan inilah yang membatasi
          seberapa kecil pola yang bisa dicetak. Untuk sistem proyeksi,
          batasnya dinyatakan oleh <Term>rumus Rayleigh</Term>:
        </p>
        <Formula block tex="\text{CD} = k_1\,\frac{\lambda}{\text{NA}}" />
        <ul>
          <li>
            <Formula tex="\text{CD}" /> adalah ukuran garis terkecil yang bisa
            dicetak.
          </li>
          <li>
            <Formula tex="\lambda" /> adalah panjang gelombang cahaya.
          </li>
          <li>
            <Formula tex="\text{NA}" /> adalah <Term>apertur numerik</Term>{" "}
            lensa, ukuran seberapa lebar kerucut cahaya yang bisa ditangkap
            lensa.
          </li>
          <li>
            <Formula tex="k_1" /> adalah faktor yang bergantung pada proses.
            Batas fisikanya 0,25.
          </li>
        </ul>
        <ResolutionCalculator />
        <p>
          Rumus itu menunjukkan tiga jalan untuk mengecilkan pola, dan industri
          menempuh ketiganya selama puluhan tahun:
        </p>
        <ul>
          <li>
            <Term>Memendekkan panjang gelombang.</Term> Dari lampu merkuri 436
            nm dan 365 nm, ke laser excimer 248 nm dan 193 nm, sampai
            ultraungu ekstrem 13,5 nm.
          </li>
          <li>
            <Term>Memperbesar apertur numerik.</Term> Lensa dibuat makin besar.
            Pada litografi imersi, celah antara lensa dan wafer diisi air,
            sehingga apertur numerik bisa melebihi 1.
          </li>
          <li>
            <Term>Menurunkan faktor proses.</Term> Dengan mask yang bentuknya
            sengaja diubah untuk mengimbangi difraksi, dan dengan menyinari
            dua kali atau lebih untuk satu lapisan.
          </li>
        </ul>
        <p>
          Ada harga yang dibayar. <Term>Kedalaman fokus</Term>, yaitu rentang
          jarak di mana gambar masih tajam, menyusut sebanding{" "}
          <Formula tex="\lambda/\text{NA}^2" />. Makin halus polanya, makin
          rata wafer harus dibuat. Itu sebabnya permukaan wafer diratakan
          kembali dengan pemolesan setelah beberapa lapisan ditumpuk.
        </p>
        <Callout kind="penting">
          <p>
            Cahaya ultraungu ekstrem diserap oleh hampir semua bahan, termasuk
            udara dan kaca. Alat EUV tidak punya lensa. Semua optiknya adalah
            cermin berlapis banyak, masknya pun cermin, dan seluruh lintasan
            cahayanya berada di dalam vakum. Cermin itu sendiri adalah tumpukan
            puluhan pasang lapisan tipis molibdenum dan silikon, hasil
            sputtering yang kita pelajari di Bab 13.
          </p>
        </Callout>
      </Section>

      <Section id="lift-off" title="Lift-off">
        <p>
          Cara biasa untuk membuat pola logam adalah melapiskan logam, lalu
          litografi, lalu etching. Ada cara lain yang urutannya dibalik,
          disebut <Term>lift-off</Term>:
        </p>
        <ol>
          <li>
            Resist dilapiskan dan dipola lebih dulu, sehingga terbuka di
            tempat logam diinginkan.
          </li>
          <li>
            Logam dilapiskan ke seluruh permukaan dengan evaporasi. Logam
            menempel pada wafer di bagian yang terbuka, dan di atas resist di
            bagian lain.
          </li>
          <li>
            Wafer direndam dalam pelarut. Resist larut, dan logam di atasnya
            ikut terangkat. Yang tertinggal hanya logam yang menempel langsung
            pada wafer.
          </li>
        </ol>
        <p>
          Lift-off berhasil kalau logam di atas resist terputus dari logam di
          dasar bukaan. Di sinilah kelemahan evaporasi dari Bab 13 menjadi
          keunggulan: atom datang lurus dari satu arah dan tidak melapisi
          dinding resist. Sputtering, yang melapisi dinding, menyambungkan
          kedua bagian logam dan menggagalkan lift-off.
        </p>
        <p>
          Lift-off dipakai untuk logam yang sulit dietsa, seperti emas dan
          platina, dan sangat umum di laboratorium penelitian. Industri jarang
          memakainya karena serpihan logam yang terangkat bisa menempel kembali
          di wafer.
        </p>
      </Section>

      <Section id="lain" title="Litografi tanpa mask">
        <p>
          Membuat mask mahal dan lama. Untuk penelitian dan untuk membuat mask
          itu sendiri, ada cara yang menulis pola secara langsung:
        </p>
        <ul>
          <li>
            <Term>Litografi berkas elektron.</Term> Berkas elektron yang sangat
            halus menggambar pola titik demi titik pada resist. Panjang
            gelombang elektron sangat pendek, sehingga pola di bawah 10 nm
            bisa dibuat. Kelemahannya sangat lambat: menulis satu wafer penuh
            bisa makan waktu berhari-hari.
          </li>
          <li>
            <Term>Penulisan laser langsung.</Term> Sinar laser yang difokuskan
            menggambar pola. Lebih cepat daripada berkas elektron, dengan
            ukuran terkecil sekitar 1 µm.
          </li>
        </ul>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Fotolitografi memindahkan pola dari mask ke resist dengan cahaya. Resist adalah pelindung sementara untuk etching, implantasi, atau deposisi.",
            "Urutan dasarnya: pelapisan resist, soft bake, penjajaran mask, penyinaran, pengembangan, proses berikutnya, lalu pelepasan resist.",
            "Resist positif larut di bagian yang tersinari. Resist negatif mengeras di bagian yang tersinari.",
            "Ukuran terkecil dibatasi difraksi: CD = k₁λ/NA. Pola dikecilkan dengan memendekkan panjang gelombang, memperbesar apertur numerik, dan menurunkan k₁.",
            "Lift-off membuat pola logam dengan melapiskan logam di atas resist berpola lalu melarutkan resistnya. Cara ini bergantung pada sifat arah lurus evaporasi.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="fotolitografi" questions={questions} />
      </Section>
    </>
  );
}
