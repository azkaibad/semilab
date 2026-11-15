import { AfmExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { SemInteraction } from "@/components/widgets/SemInteraction";
import { ThinFilmColor } from "@/components/widgets/ThinFilmColor";

export const objectives = [
  "Memilih alat yang tepat untuk mengukur tebal sebuah film",
  "Menjelaskan cara kerja profilometer dan pengukuran optik",
  "Menjelaskan cara SEM membentuk gambar dan sinyal apa saja yang dihasilkannya",
  "Menjelaskan cara kerja AFM dan pengaruh bentuk ujungnya",
];

const questions: QuizQuestion[] = [
  {
    question: "Alat mana yang mengukur tebal film tembus cahaya tanpa menyentuh dan tanpa merusaknya?",
    options: ["Profilometer", "Ellipsometer", "SEM penampang", "Four-point probe"],
    answer: 1,
    explanation:
      "Ellipsometer mengukur perubahan polarisasi cahaya yang dipantulkan film, lalu menghitung tebal dan indeks biasnya. Tidak ada yang menyentuh sampel.",
  },
  {
    question: "Apa yang dibutuhkan profilometer untuk mengukur tebal film?",
    options: [
      "Anak tangga antara permukaan film dan permukaan substrat",
      "Film yang tembus cahaya",
      "Ruang vakum",
      "Sampel yang menghantar listrik",
    ],
    answer: 0,
    explanation:
      "Profilometer mengukur beda tinggi. Sebagian film harus dibuang atau ditutupi saat deposisi, supaya ada tepi yang bisa dilintasi jarum.",
  },
  {
    question: "Apa akibat menaikkan tegangan pemercepat pada SEM?",
    options: [
      "Elektron menembus lebih dangkal",
      "Gambar selalu lebih tajam",
      "Elektron menembus lebih dalam, sehingga volume interaksinya membesar",
      "Sampel tidak perlu lagi di dalam vakum",
    ],
    answer: 2,
    explanation:
      "Elektron berenergi lebih tinggi menempuh jarak lebih jauh di dalam sampel. Sinyal datang dari daerah yang lebih dalam dan lebih lebar, sehingga rincian permukaan berkurang.",
  },
  {
    question: "Apa akibat ujung AFM yang tumpul?",
    options: [
      "Gambar menjadi lebih tajam",
      "Tinggi fitur terbaca dua kali lipat",
      "Tidak ada pengaruhnya",
      "Tonjolan tampak lebih lebar dan celah sempit tampak lebih dangkal daripada aslinya",
    ],
    answer: 3,
    explanation:
      "Gambar AFM adalah gabungan bentuk permukaan dan bentuk ujung. Ujung yang lebih lebar daripada sebuah celah tidak bisa mencapai dasarnya.",
  },
  {
    question: "Kenapa sampel isolator biasanya dilapisi emas atau karbon tipis sebelum dilihat dengan SEM?",
    options: [
      "Agar lebih berat",
      "Agar muatan dari berkas elektron bisa mengalir pergi dan tidak menumpuk",
      "Agar warnanya terlihat",
      "Agar sampel tidak menguap",
    ],
    answer: 1,
    explanation:
      "Elektron yang menumpuk di permukaan isolator membelokkan berkas dan membuat gambar bergeser serta berkilau tidak wajar. Lapisan penghantar tipis mengalirkannya ke tanah.",
  },
];

export function Body() {
  return (
    <>
      <Section id="kenapa" title="Mengukur yang tidak terlihat">
        <p>
          Bagian C dan D penuh dengan angka: film setebal 100 nm, oksida gate
          20 nm, pola selebar 1 µm, dinding yang tegak. Tidak satu pun bisa
          dilihat dengan mata, dan sebagian besar juga tidak dengan mikroskop
          cahaya. Bagian E membahas cara memastikan bahwa yang kita buat memang
          seperti yang kita maksud.
        </p>
        <p>
          Pengukuran film dan devais disebut <Term>karakterisasi</Term>. Bab
          ini membahas dua pertanyaan pertama yang selalu muncul: berapa
          tebalnya, dan seperti apa bentuk permukaannya. Bentuk permukaan dan
          susunan butir sebuah film disebut <Term>morfologi</Term>.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Alat</th>
                <th>Yang diukur</th>
                <th>Kelebihan</th>
                <th>Keterbatasan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Profilometer</td>
                <td>Beda tinggi</td>
                <td>Cepat, langsung, untuk bahan apa pun</td>
                <td>Butuh anak tangga, jarum menyentuh sampel</td>
              </tr>
              <tr>
                <td>Reflektometer dan ellipsometer</td>
                <td>Tebal dan indeks bias</td>
                <td>Tanpa sentuhan, sangat teliti</td>
                <td>Hanya film tembus cahaya, butuh model</td>
              </tr>
              <tr>
                <td>SEM</td>
                <td>Bentuk dan penampang</td>
                <td>Perbesaran tinggi, kedalaman fokus besar</td>
                <td>Di dalam vakum, tinggi tidak terukur langsung</td>
              </tr>
              <tr>
                <td>AFM</td>
                <td>Tinggi permukaan tiga dimensi</td>
                <td>Ketelitian tinggi di bawah 1 nm</td>
                <td>Lambat, luas pindai kecil</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="profilometer" title="Profilometer">
        <p>
          <Term>Profilometer</Term> adalah alat yang paling mudah dipahami.
          Sebuah jarum berujung intan ditempelkan ke permukaan dengan gaya yang
          sangat kecil, lalu digeser lurus. Naik turunnya jarum dicatat, dan
          hasilnya adalah grafik tinggi terhadap posisi.
        </p>
        <p>
          Untuk mengukur tebal film, jarum harus melintasi sebuah{" "}
          <Term>anak tangga</Term>: tepi tempat film berakhir dan substrat
          terlihat. Ada dua cara umum membuatnya. Sebagian substrat ditutup
          selama deposisi, misalnya dengan selotip tahan panas atau penjepit
          sampel. Atau sebagian film dibuang sesudahnya dengan litografi dan
          etching.
        </p>
        <p>
          Profilometer mengukur anak tangga dari sekitar 10 nm sampai ratusan
          mikrometer, dan bekerja untuk logam, isolator, maupun resist.
          Keterbatasannya:
        </p>
        <ul>
          <li>
            Ujung jarum berjari-jari beberapa mikrometer, jadi tidak bisa masuk
            ke celah sempit. Rincian ke samping tidak teliti, walaupun tinggi
            terukur dengan baik.
          </li>
          <li>
            Jarum bisa menggores bahan lunak seperti resist dan polimer.
          </li>
          <li>
            Wafer yang melengkung membuat garis dasar ikut melengkung, sehingga
            data harus diratakan dulu. Lengkungan itu sendiri berguna: dari
            sanalah stress film dihitung dengan persamaan Stoney di Bab 12.
          </li>
        </ul>
      </Section>

      <Section id="optik" title="Mengukur tebal dengan cahaya">
        <p>
          Film tembus cahaya bisa diukur tanpa disentuh. Dasarnya adalah
          interferensi, yang sudah disinggung di Bab 10 dan Bab 17. Cahaya
          dipantulkan sebagian oleh permukaan atas film dan sebagian oleh batas
          film dengan substrat. Kedua pantulan itu saling menguatkan pada
          panjang gelombang tertentu dan saling meniadakan pada yang lain,
          bergantung pada tebal film.
        </p>
        <ThinFilmColor />
        <p>
          Geser tebal oksida dari 0 sampai 300 nm dan perhatikan warnanya
          berubah. Itulah warna-warni wafer beroksida. Lalu teruskan ke tebal
          yang lebih besar: puncak dan lembah pada spektrum makin rapat. Dua
          alat memanfaatkan gejala ini.
        </p>
        <p>
          <Term>Reflektometer</Term> mengukur spektrum pantulan seperti pada
          grafik itu, lalu mencari tebal yang menghasilkan spektrum yang sama.
          Alatnya sederhana dan pengukurannya hanya sedetik. Cocok untuk film
          dari beberapa puluh nanometer sampai puluhan mikrometer.
        </p>
        <p>
          <Term>Ellipsometer</Term> lebih peka. Cahaya dengan polarisasi yang
          diketahui dipantulkan miring dari sampel, dan alat mengukur bagaimana
          polarisasinya berubah. Perubahan itu dinyatakan dengan dua sudut,
          yang biasa ditulis <Formula tex="\Psi" /> dan{" "}
          <Formula tex="\Delta" />. Karena yang diukur adalah perbandingan dan
          bukan kuat cahaya, hasilnya sangat teliti. Ellipsometer bisa mengukur
          film setipis di bawah 1 nm, dan memberi tebal sekaligus indeks bias.
        </p>
        <Callout kind="penting">
          <p>
            Kedua alat optik tidak mengukur tebal secara langsung. Alat
            mengukur spektrum, lalu perangkat lunak mencocokkannya dengan
            sebuah model: lapisan apa saja yang ada, urutannya, dan sifat optik
            tiap lapisan. Kalau modelnya salah, angka tebalnya juga salah
            walaupun kecocokannya tampak bagus. Hasil optik sebaiknya sesekali
            dibandingkan dengan profilometer atau penampang SEM.
          </p>
        </Callout>
      </Section>

      <Section id="sem" title="SEM: melihat dengan elektron">
        <p>
          Mikroskop cahaya tidak bisa membedakan dua titik yang jaraknya
          kurang dari kira-kira 200 nm, karena dibatasi panjang gelombang
          cahaya. Ini batas difraksi yang sama dengan di Bab 18. Elektron yang
          dipercepat punya panjang gelombang ribuan kali lebih pendek.
        </p>
        <p>
          <Term>SEM</Term>, mikroskop elektron pemindai, bekerja seperti ini.
          Elektron dilepaskan dari sebuah sumber di puncak kolom, dipercepat
          dengan tegangan 1 sampai 30 kV, lalu difokuskan oleh lensa magnet
          menjadi titik selebar beberapa nanometer. Titik itu disapukan baris
          demi baris di permukaan sampel. Di setiap posisi, detektor mencatat
          banyaknya elektron yang keluar dari sampel. Kuat sinyal itu menjadi
          terang-gelapnya satu titik pada gambar.
        </p>
        <p>
          Jadi gambar SEM bukan foto. Gambar itu adalah peta kuat sinyal
          terhadap posisi berkas. Sinyal apa yang dipakai menentukan apa yang
          terlihat:
        </p>
        <SemInteraction />
        <p>
          Elektron yang masuk tidak berhenti di permukaan. Elektron itu
          terhambur ke segala arah di dalam sampel dan mengisi daerah berbentuk
          tetesan, yang disebut <Term>volume interaksi</Term>. Ukuran volume
          ini menjelaskan sebuah pilihan yang sering membingungkan pemula:
          tegangan lebih tinggi memberi berkas lebih halus, tetapi sinyalnya
          datang dari daerah lebih dalam. Untuk melihat rincian permukaan film
          tipis, tegangan rendah, 1 sampai 5 kV, sering lebih baik.
        </p>
        <p>Dua cara SEM dipakai untuk film tipis:</p>
        <ul>
          <li>
            <Term>Tampak atas</Term>, untuk melihat butir, retakan, lubang, dan
            ukuran pola.
          </li>
          <li>
            <Term>Penampang</Term>, untuk melihat tebal tiap lapisan dan bentuk
            dinding hasil etch. Wafer dipatahkan mengikuti bidang kristalnya,
            lalu patahannya dilihat dari samping. Cara ini merusak sampel,
            tetapi memberi bukti paling langsung: tebal bisa diukur dari
            gambarnya.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Sampel isolator menimbulkan masalah. Elektron dari berkas menumpuk
            di permukaan karena tidak bisa mengalir pergi, lalu membelokkan
            berkas. Gambarnya bergeser, bergaris, dan berkilau tidak wajar.
            Jalan keluarnya adalah melapisi sampel dengan emas atau karbon
            setebal beberapa nanometer lewat sputtering, atau memakai tegangan
            rendah.
          </p>
        </Callout>
      </Section>

      <Section id="afm" title="AFM: meraba permukaan">
        <p>
          <Term>AFM</Term>, mikroskop gaya atom, tidak memakai cahaya maupun
          elektron. Alat ini meraba. Sebuah ujung yang sangat runcing, dengan
          jari-jari sekitar 10 nm, dipasang di ujung bilah lentur yang disebut{" "}
          <Term>kantilever</Term>. Saat ujung itu didekatkan ke permukaan, gaya
          antaratom melenturkan kantilever.
        </p>
        <p>
          Lenturan itu sangat kecil, jadi dibaca dengan cara yang cerdik. Sinar
          laser dipantulkan dari punggung kantilever ke detektor. Lenturan
          sekecil sepersekian nanometer menggeser titik laser di detektor cukup
          jauh untuk terukur. Sampel digeser baris demi baris oleh penggerak
          piezoelektrik, dan tinggi di setiap titik dicatat.
        </p>
        <AfmExplorer />
        <p>Ada dua cara kerja yang umum:</p>
        <ul>
          <li>
            <Term>Mode kontak.</Term> Ujung menyentuh permukaan terus-menerus.
            Sederhana, tetapi bisa menggores sampel lunak dan menumpulkan
            ujung.
          </li>
          <li>
            <Term>Mode ketuk.</Term> Kantilever digetarkan dan ujungnya hanya
            menyentuh permukaan sekejap di tiap getaran. Lebih lembut bagi
            sampel dan ujung, dan paling banyak dipakai.
          </li>
        </ul>
        <p>
          Berbeda dari SEM, AFM memberi angka tinggi yang sebenarnya di setiap
          titik. Dari data itu dihitung <Term>kekasaran</Term> permukaan, yang
          biasa dinyatakan sebagai simpangan baku tinggi dan ditulis{" "}
          <Formula tex="R_q" />. Film hasil ALD atau wafer yang dipoles punya
          kekasaran di bawah 1 nm, sedangkan film logam hasil evaporasi
          beberapa nanometer.
        </p>
        <p>
          Hal terpenting untuk diingat tentang AFM terlihat pada model di atas.
          Gambar yang dihasilkan bukan permukaan itu sendiri, melainkan
          permukaan seperti yang dirasakan oleh ujung dengan bentuk tertentu.
          Ujung yang tumpul atau rusak membuat tonjolan tampak lebih lebar,
          dan celah sempit tampak lebih dangkal. Tinggi tonjolan yang berdiri
          sendiri tetap benar, tetapi lebarnya tidak.
        </p>
      </Section>

      <Section id="memilih" title="Memilih alat">
        <p>Beberapa patokan praktis:</p>
        <ul>
          <li>
            Tebal film logam: profilometer pada anak tangga. Logam tidak tembus
            cahaya, jadi alat optik tidak bisa dipakai kecuali filmnya sangat
            tipis.
          </li>
          <li>
            Tebal oksida, nitrida, dan resist: reflektometer atau ellipsometer.
          </li>
          <li>
            Tebal lapisan di dalam tumpukan, atau bentuk dinding hasil etch:
            penampang SEM.
          </li>
          <li>Ukuran butir dan cacat pada permukaan: SEM tampak atas.</li>
          <li>Kekasaran dan tinggi fitur yang sangat kecil: AFM.</li>
        </ul>
        <p>
          Kebiasaan yang baik adalah mengukur besaran yang sama dengan dua cara
          yang berbeda prinsipnya, setidaknya sekali untuk tiap proses baru.
          Kalau keduanya cocok, angkanya bisa dipercaya.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Karakterisasi adalah pengukuran untuk memastikan hasil proses. Dua pertanyaan pertama: berapa tebalnya, dan seperti apa permukaannya.",
            "Profilometer menggeser jarum melintasi anak tangga. Cepat dan langsung, tetapi menyentuh sampel.",
            "Reflektometer dan ellipsometer memakai interferensi dan polarisasi cahaya. Tanpa sentuhan dan sangat teliti, tetapi hasilnya bergantung pada model.",
            "SEM memindai sampel dengan berkas elektron. Elektron sekunder menunjukkan bentuk permukaan, elektron terhambur balik menunjukkan beda komposisi, dan sinar-X menunjukkan unsur.",
            "AFM meraba permukaan dengan ujung runcing dan memberi peta tinggi yang sebenarnya. Bentuk ujung ikut menentukan gambar.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="ketebalan-dan-morfologi" questions={questions} />
      </Section>
    </>
  );
}
