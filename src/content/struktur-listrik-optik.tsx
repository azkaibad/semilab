import { XrdExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FourPointProbe } from "@/components/widgets/FourPointProbe";
import { HallEffect } from "@/components/widgets/HallEffect";
import { UvVisSpectrum } from "@/components/widgets/UvVisSpectrum";

export const objectives = [
  "Menjelaskan hukum Bragg dan membaca pola difraksi sinar-X",
  "Menghitung hambatan lembar dan resistivitas dari pengukuran four-point probe",
  "Menjelaskan apa yang diperoleh dari pengukuran efek Hall",
  "Menentukan celah pita dari spektrum UV-Vis",
];

const questions: QuizQuestion[] = [
  {
    question: "Mana bunyi hukum Bragg?",
    options: [
      "nλ = 2d sin θ",
      "V = I × R",
      "E = hν",
      "ρ = R × t",
    ],
    answer: 0,
    explanation:
      "Pantulan dari bidang-bidang atom yang berjarak d saling menguatkan hanya kalau selisih lintasannya, 2d sin θ, sama dengan kelipatan bulat panjang gelombang.",
  },
  {
    question: "Apa arti puncak XRD yang lebar?",
    options: [
      "Filmnya sangat tebal",
      "Sinar-X terlalu kuat",
      "Kristalitnya sangat kecil",
      "Filmnya kristal tunggal",
    ],
    answer: 2,
    explanation:
      "Kristalit kecil hanya punya sedikit bidang atom, sehingga pantulan tidak saling meniadakan dengan tajam di sekitar sudut Bragg. Hubungannya dinyatakan oleh persamaan Scherrer.",
  },
  {
    question: "Kenapa pengukuran resistivitas memakai empat jarum, bukan dua?",
    options: [
      "Agar arusnya lebih besar",
      "Agar hambatan kontak dan kabel tidak ikut terukur",
      "Agar sampel tidak rusak",
      "Agar bisa mengukur isolator",
    ],
    answer: 1,
    explanation:
      "Tegangan diukur lewat jarum yang hampir tidak dialiri arus, jadi tidak ada penurunan tegangan di kontaknya. Yang terbaca hanya tegangan di dalam film.",
  },
  {
    question: "Apa yang ditunjukkan oleh tanda tegangan Hall?",
    options: [
      "Tebal sampel",
      "Suhu sampel",
      "Celah pita",
      "Jenis pembawa muatan: elektron atau hole",
    ],
    answer: 3,
    explanation:
      "Elektron dan hole terdorong ke tepi yang sama, tetapi muatannya berlawanan, sehingga tanda tegangannya terbalik.",
  },
  {
    question: "Sebuah film mulai menyerap cahaya pada panjang gelombang di bawah 400 nm. Berapa kira-kira celah pitanya?",
    options: ["3,1 eV", "1,1 eV", "0,4 eV", "4,0 eV"],
    answer: 0,
    explanation: "Celah pita kira-kira 1240 dibagi panjang gelombang tepi serapan dalam nanometer: 1240 / 400 = 3,1 eV.",
  },
];

export function Body() {
  return (
    <>
      <Section id="tiga-pertanyaan" title="Tiga pertanyaan berikutnya">
        <p>
          Bab 20 menjawab berapa tebal sebuah film dan seperti apa
          permukaannya. Tetapi dua film dengan tebal dan permukaan yang sama
          bisa berperilaku sangat berbeda. Bab ini membahas tiga pertanyaan
          yang menentukan apakah sebuah film berguna:
        </p>
        <ul>
          <li>
            <Term>Struktur.</Term> Apakah filmnya kristal atau amorf? Fase apa
            yang terbentuk, dan seberapa besar butirnya? Dijawab dengan
            difraksi sinar-X.
          </li>
          <li>
            <Term>Listrik.</Term> Berapa resistivitasnya, apa jenis pembawa
            muatannya, dan berapa banyak? Dijawab dengan four-point probe dan
            efek Hall.
          </li>
          <li>
            <Term>Optik.</Term> Cahaya apa yang diserap dan diteruskan, dan
            berapa celah pitanya? Dijawab dengan spektroskopi UV-Vis.
          </li>
        </ul>
        <p>
          Ketiganya menghubungkan kembali hasil fabrikasi dengan fisika di
          Bagian A dan B: kisi kristal, pembawa muatan, dan celah pita.
        </p>
      </Section>

      <Section id="xrd" title="Difraksi sinar-X">
        <p>
          Di Bab 2 kita melihat atom dalam kristal tersusun dalam bidang-bidang
          sejajar dengan jarak tertentu. Jarak itu beberapa ångström, terlalu
          kecil untuk dilihat mikroskop. Tetapi sinar-X punya panjang gelombang
          sebesar itu juga, sehingga bidang-bidang atom memantulkannya dengan
          cara yang bisa diukur.
        </p>
        <p>
          Setiap bidang atom memantulkan sebagian kecil sinar-X. Pantulan dari
          bidang kedua menempuh lintasan lebih panjang daripada pantulan dari
          bidang pertama, dengan selisih <Formula tex="2d\sin\theta" />. Kalau
          selisih itu tepat sebesar kelipatan panjang gelombang, semua pantulan
          saling menguatkan dan muncul berkas yang kuat. Pada sudut lain,
          pantulan dari ribuan bidang saling meniadakan. Inilah{" "}
          <Term>hukum Bragg</Term>:
        </p>
        <Formula block tex="n\lambda = 2d\sin\theta" />
        <p>
          dengan <Formula tex="d" /> jarak antarbidang,{" "}
          <Formula tex="\theta" /> sudut antara sinar dan bidang, dan{" "}
          <Formula tex="n" /> bilangan bulat. Geser sudut pada model di bawah
          dan cari tempat detektor menyala.
        </p>
        <XrdExplorer />
        <p>
          Alat <Term>XRD</Term> memutar sumber dan detektor sambil mencatat
          kuat pantulan. Hasilnya adalah <Term>pola difraksi</Term>: grafik
          intensitas terhadap sudut <Formula tex="2\theta" />, dengan
          puncak-puncak tajam. Dari pola itu didapat banyak hal:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Ciri pada pola</th>
                <th>Yang diketahui</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ada puncak tajam atau tidak</td>
                <td>Film kristal atau amorf. Film amorf hanya memberi gundukan lebar</td>
              </tr>
              <tr>
                <td>Letak puncak</td>
                <td>Jarak antarbidang, dan dari situ bahan serta fasenya</td>
              </tr>
              <tr>
                <td>Pergeseran letak puncak</td>
                <td>Regangan: kisi yang tertarik atau terhimpit menggeser puncak</td>
              </tr>
              <tr>
                <td>Lebar puncak</td>
                <td>Ukuran kristalit</td>
              </tr>
              <tr>
                <td>Perbandingan tinggi puncak</td>
                <td>Arah butir yang dominan, disebut tekstur</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Letak puncak bekerja seperti sidik jari. Setiap bahan dan setiap fase
          punya susunan puncak yang khas, dan pola yang terukur dicocokkan
          dengan basis data. Cara ini bisa membedakan, misalnya, dua fase
          titanium dioksida yang rumus kimianya sama tetapi susunan atomnya
          berbeda.
        </p>
        <p>
          Lebar puncak berhubungan dengan ukuran kristalit lewat{" "}
          <Term>persamaan Scherrer</Term>:
        </p>
        <Formula block tex="L = \frac{0{,}9\,\lambda}{\beta\cos\theta}" />
        <p>
          dengan <Formula tex="\beta" /> lebar puncak pada setengah tingginya,
          dalam radian. Makin kecil kristalit, makin lebar puncaknya. Coba
          kecilkan ukuran kristalit pada model. Persamaan ini berguna untuk
          kristalit di bawah kira-kira 100 nm. Di atas itu, lebar puncak lebih
          ditentukan oleh alatnya.
        </p>
        <Callout kind="catatan">
          <p>
            Pada film tipis, sinar-X menembus jauh lebih dalam daripada tebal
            film, sehingga sinyal dari substrat bisa menenggelamkan sinyal
            film. Jalan keluarnya adalah menyorotkan sinar dengan sudut sangat
            landai, sekitar 1°, supaya sinar menempuh jalan panjang di dalam
            film. Cara ini disebut XRD sudut landai.
          </p>
        </Callout>
      </Section>

      <Section id="four-point" title="Four-point probe">
        <p>
          Cara paling sederhana mengukur hambatan adalah menempelkan dua jarum
          dan membaca ohmmeter. Untuk film tipis, cara itu memberi angka yang
          salah. Yang terbaca adalah jumlah hambatan film, hambatan kabel, dan
          hambatan di titik sentuh jarum. Hambatan sentuh itu sering lebih
          besar daripada hambatan filmnya sendiri.
        </p>
        <p>
          <Term>Four-point probe</Term> memisahkan tugas. Empat jarum disusun
          sejajar dengan jarak sama. Arus dialirkan lewat dua jarum luar, dan
          tegangan diukur di antara dua jarum dalam. Voltmeter hampir tidak
          menarik arus, jadi tidak ada penurunan tegangan di titik sentuh kedua
          jarum dalam. Yang terbaca murni tegangan di dalam film.
        </p>
        <FourPointProbe />
        <p>
          Untuk film yang jauh lebih tipis daripada jarak antarjarum, hasilnya
          dinyatakan sebagai <Term>hambatan lembar</Term>:
        </p>
        <Formula block tex="R_s = \frac{\pi}{\ln 2}\cdot\frac{V}{I} \approx 4{,}532\,\frac{V}{I}" />
        <p>
          Satuannya ditulis ohm per persegi, Ω/□. Namanya berasal dari sifat
          yang praktis: sebuah persegi dari film itu punya hambatan yang sama
          dari sisi ke sisi, berapa pun ukuran perseginya. Hambatan sebuah
          jalur tinggal dihitung dari jumlah persegi di sepanjang jalur itu.
        </p>
        <p>Kalau tebal film diketahui, resistivitasnya adalah</p>
        <Formula block tex="\rho = R_s \cdot t" />
        <p>
          Inilah hubungan dengan Bab 7. Resistivitas yang terukur mencerminkan
          hasil kali konsentrasi pembawa dan mobilitasnya. Untuk wafer silikon,
          resistivitas langsung menunjukkan kadar dopingnya. Untuk film logam,
          resistivitas yang lebih tinggi daripada nilai bahan pejalnya
          menandakan butir yang kecil, pengotor, atau rongga.
        </p>
      </Section>

      <Section id="hall" title="Efek Hall">
        <p>
          Four-point probe memberi resistivitas, yaitu gabungan dua besaran:
          berapa banyak pembawa muatan dan seberapa lincah mereka. Film dengan
          sedikit pembawa yang lincah dan film dengan banyak pembawa yang
          lamban bisa punya resistivitas sama. Four-point probe juga tidak
          memberi tahu apakah pembawanya elektron atau hole.{" "}
          <Term>Efek Hall</Term> memisahkan semuanya.
        </p>
        <p>
          Arus dialirkan sepanjang sampel, dan medan magnet dipasang tegak
          lurus terhadapnya. Muatan yang bergerak di dalam medan magnet
          dibelokkan ke samping. Pembawa menumpuk di satu tepi sampel sampai
          medan listrik yang ditimbulkannya mengimbangi gaya magnet. Tegangan
          melintang yang muncul disebut <Term>tegangan Hall</Term>:
        </p>
        <Formula block tex="V_H = \frac{I\,B}{q\,n\,t}" />
        <HallEffect />
        <p>Dari satu pengukuran ini didapat tiga hal:</p>
        <ul>
          <li>
            <Term>Jenis pembawa</Term>, dari tanda tegangannya. Ini cara baku
            untuk memastikan sebuah film tipe-n atau tipe-p.
          </li>
          <li>
            <Term>Konsentrasi pembawa</Term>, dari besar tegangannya. Makin
            sedikit pembawa, makin besar tegangan Hall, karena tiap pembawa
            harus bergerak lebih cepat untuk membawa arus yang sama.
          </li>
          <li>
            <Term>Mobilitas</Term>, dengan menggabungkan konsentrasi itu dengan
            resistivitas: <Formula tex="\mu = 1/(q\,n\,\rho)" />.
          </li>
        </ul>
        <p>
          Dalam praktik, sampel film berbentuk persegi dengan empat kontak di
          sudutnya, dan resistivitas serta tegangan Hall diukur dengan kontak
          yang sama. Susunan ini disebut <Term>metode van der Pauw</Term>.
        </p>
      </Section>

      <Section id="uv-vis" title="Spektroskopi UV-Vis">
        <p>
          <Term>Spektrofotometer UV-Vis</Term> menyorotkan cahaya dari
          ultraungu sampai inframerah dekat melalui film, satu panjang
          gelombang demi satu, dan mengukur bagian yang diteruskan. Hasilnya
          adalah spektrum transmisi.
        </p>
        <p>
          Dari Bab 4, semikonduktor hanya menyerap foton yang energinya
          melebihi celah pita. Foton berenergi lebih rendah lewat begitu saja.
          Jadi spektrum transmisi sebuah film semikonduktor punya tebing: di
          satu sisi cahaya diteruskan, di sisi lain diserap. Letak tebing itu,
          yang disebut <Term>tepi serapan</Term>, langsung memberi celah pita:
        </p>
        <Formula block tex="E_g\ (\text{eV}) \approx \frac{1240}{\lambda_{\text{tepi}}\ (\text{nm})}" />
        <UvVisSpectrum />
        <p>
          Rumus yang sama sudah kita pakai untuk warna LED di Bab 9, hanya
          arahnya dibalik. Letak tepi serapan juga menjelaskan warna film:
        </p>
        <ul>
          <li>
            Tepi di ultraungu berarti semua cahaya tampak diteruskan, dan film
            tampak bening. Itu sebabnya ZnO dan ITO dipakai sebagai elektroda
            tembus cahaya.
          </li>
          <li>
            Tepi di tengah daerah tampak berarti biru dan ungu diserap, dan
            film tampak kuning atau jingga.
          </li>
          <li>
            Tepi di inframerah berarti semua cahaya tampak diserap, dan film
            tampak gelap. Itulah yang diinginkan dari lapisan penyerap sel
            surya.
          </li>
        </ul>
        <p>
          Untuk hasil yang lebih teliti, data diolah menjadi{" "}
          <Term>plot Tauc</Term>. Koefisien serapan dihitung dari transmisi dan
          tebal film, lalu besaran <Formula tex="(\alpha h\nu)^2" /> digambar
          terhadap energi foton. Untuk bahan bercelah langsung, hasilnya garis
          lurus di dekat tepi, dan perpanjangan garis itu memotong sumbu energi
          tepat di celah pita.
        </p>
        <Callout kind="catatan">
          <p>
            Spektrum film yang sebenarnya punya riak naik turun di daerah yang
            tembus cahaya. Itu interferensi yang sama dengan di Bab 20, dan
            dari jarak antarriaknya tebal film bisa dihitung. Satu pengukuran
            UV-Vis memberi celah pita dan tebal sekaligus.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "XRD memakai hukum Bragg, nλ = 2d sin θ. Letak puncak menunjukkan bahan dan fase, dan lebarnya menunjukkan ukuran kristalit.",
            "Four-point probe mengalirkan arus lewat dua jarum luar dan mengukur tegangan di dua jarum dalam, sehingga hambatan kontak tidak ikut terukur.",
            "Hambatan lembar Rs = 4,532 V/I dalam Ω/□, dan resistivitas ρ = Rs × t.",
            "Efek Hall memberi jenis pembawa dari tanda tegangannya, konsentrasi dari besarnya, dan mobilitas bila digabung dengan resistivitas.",
            "Spektrum UV-Vis menunjukkan tepi serapan. Celah pita kira-kira 1240 dibagi panjang gelombang tepi dalam nanometer.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="struktur-listrik-optik" questions={questions} />
      </Section>
    </>
  );
}
