import { CvdExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { AldCycle } from "@/components/widgets/AldCycle";
import { StepCoverage } from "@/components/widgets/StepCoverage";

export const objectives = [
  "Menjelaskan tahap-tahap deposisi kimia dan bedanya dari PVD",
  "Menjelaskan dua hal yang bisa membatasi laju tumbuh pada CVD",
  "Membedakan LPCVD dan PECVD",
  "Menjelaskan sifat membatasi diri pada ALD dan arti epitaksi",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa beda mendasar CVD dari PVD?",
    options: [
      "CVD tidak butuh substrat",
      "Pada CVD, film terbentuk dari reaksi kimia gas di permukaan substrat",
      "CVD selalu berlangsung pada suhu ruang",
      "CVD hanya bisa membuat logam",
    ],
    answer: 1,
    explanation:
      "Bahan film tidak dibawa sebagai atom dari sumber padat. Yang dibawa adalah gas, dan filmnya baru terbentuk saat gas itu bereaksi di permukaan.",
  },
  {
    question: "Apa keunggulan utama PECVD dibanding LPCVD?",
    options: [
      "Filmnya selalu lebih murni",
      "Tidak membutuhkan gas",
      "Bisa berlangsung pada suhu jauh lebih rendah, karena energi reaksinya dipasok plasma",
      "Melapisi parit dengan lebih rata",
    ],
    answer: 2,
    explanation:
      "Plasma memecah molekul gas menjadi pecahan yang reaktif, sehingga reaksi berjalan pada 200 sampai 400 °C. Ini penting kalau di wafer sudah ada logam yang tidak tahan panas.",
  },
  {
    question: "Apa arti sifat membatasi diri pada ALD?",
    options: [
      "Tiap pulsa gas berhenti bereaksi sendiri setelah permukaan penuh, sehingga tiap siklus menambah tepat satu lapis",
      "Alatnya mati sendiri setelah selesai",
      "Film berhenti tumbuh setelah tebal tertentu",
      "Gas habis dengan sendirinya",
    ],
    answer: 0,
    explanation:
      "Karena reaksinya berhenti sendiri, tebal film tidak bergantung pada lamanya pulsa atau banyaknya gas. Tebal hanya ditentukan jumlah siklus.",
  },
  {
    question: "Pada LPCVD dengan suhu yang relatif rendah, apa yang membatasi laju tumbuh?",
    options: [
      "Kecepatan pompa",
      "Pasokan gas ke permukaan",
      "Ukuran wafer",
      "Kecepatan reaksi di permukaan",
    ],
    answer: 3,
    explanation:
      "Gas tersedia berlebih, jadi lajunya ditentukan oleh reaksi, yang bergantung kuat pada suhu. Selama suhu seragam, tebal film seragam di semua wafer.",
  },
  {
    question: "Apa yang dimaksud epitaksi?",
    options: [
      "Menumbuhkan film amorf pada suhu rendah",
      "Menumbuhkan film kristal tunggal yang meneruskan susunan atom substratnya",
      "Membuang lapisan dengan plasma",
      "Melapisi wafer dengan cairan",
    ],
    answer: 1,
    explanation:
      "Substrat kristal tunggal berperan sebagai cetakan. Atom film menempati posisi yang meneruskan kisi substrat, sehingga film ikut menjadi kristal tunggal.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gagasan" title="Menumbuhkan film dari gas">
        <p>
          Pada PVD, atom bahan film dibawa langsung dari sumber padat. Pada{" "}
          <Term>deposisi kimia</Term>, disingkat CVD dari{" "}
          <em>chemical vapor deposition</em>, yang dibawa ke substrat adalah
          gas. Gas itu, yang disebut <Term>prekursor</Term>, mengandung unsur
          yang diinginkan. Film baru terbentuk saat prekursor bereaksi di
          permukaan substrat yang panas.
        </p>
        <p>Contoh paling sederhana adalah polisilikon dari gas silana:</p>
        <Formula block tex="\text{SiH}_4\,(\text{gas}) \;\longrightarrow\; \text{Si}\,(\text{padat}) + 2\,\text{H}_2\,(\text{gas})" />
        <p>
          Silikon tertinggal sebagai film, dan hidrogen terbuang lewat pompa.
          Dengan mengganti gasnya, bahan lain bisa ditumbuhkan:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Film</th>
                <th>Gas yang dipakai</th>
                <th>Kegunaan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Polisilikon</td>
                <td>Silana</td>
                <td>Gate transistor, sel surya</td>
              </tr>
              <tr>
                <td>Silikon dioksida</td>
                <td>Silana dan oksigen, atau TEOS</td>
                <td>Isolator antarlapisan</td>
              </tr>
              <tr>
                <td>Silikon nitrida</td>
                <td>Diklorosilana dan amonia</td>
                <td>Pelindung, masker, isolator</td>
              </tr>
              <tr>
                <td>Tungsten</td>
                <td>Tungsten heksafluorida dan hidrogen</td>
                <td>Pengisi lubang kontak</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Setiap proses CVD melewati tahap-tahap yang sama:</p>
        <ol>
          <li>Gas prekursor dialirkan ke dalam ruang.</li>
          <li>Molekul gas berdifusi menuju permukaan substrat.</li>
          <li>Molekul menempel di permukaan.</li>
          <li>Reaksi kimia terjadi, dan atom film menetap.</li>
          <li>Gas hasil samping lepas dari permukaan dan dipompa keluar.</li>
        </ol>
        <Callout kind="penting">
          <p>
            Banyak gas prekursor berbahaya. Silana terbakar sendiri saat
            terkena udara, dan beberapa gas lain beracun atau korosif. Alat CVD
            selalu dilengkapi lemari gas tertutup, detektor kebocoran, dan
            pengolah gas buang.
          </p>
        </Callout>
      </Section>

      <Section id="laju" title="Apa yang membatasi laju tumbuh">
        <p>
          Tahap-tahap tadi berlangsung berurutan, sehingga laju keseluruhan
          ditentukan oleh tahap yang paling lambat. Ada dua kemungkinan, dan
          suhu menentukan yang mana. Ubah suhu tungku pada model di bawah.
        </p>
        <CvdExplorer />
        <ul>
          <li>
            <Term>Dibatasi reaksi permukaan.</Term> Pada suhu lebih rendah,
            reaksi berjalan lambat dan gas tersedia berlebih. Laju naik
            eksponensial terhadap suhu, dengan bentuk{" "}
            <Formula tex="\exp(-E_a/kT)" /> yang sudah kita temui berkali-kali.
          </li>
          <li>
            <Term>Dibatasi pasokan gas.</Term> Pada suhu tinggi, reaksi
            berlangsung begitu cepat sehingga setiap molekul yang sampai
            langsung bereaksi. Laju ditentukan oleh seberapa cepat gas bisa
            sampai ke permukaan, dan hampir tidak bergantung pada suhu.
          </li>
        </ul>
        <p>
          Pembedaan ini menentukan rancangan alat. Di daerah yang dibatasi
          reaksi, yang perlu dijaga hanya keseragaman suhu, dan itu mudah.
          Wafer bisa disusun rapat berdiri berjajar, seratus atau lebih dalam
          satu tabung. Di daerah yang dibatasi pasokan gas, aliran gas harus
          sama di setiap titik pada wafer, sehingga wafer biasanya diproses
          satu per satu.
        </p>
      </Section>

      <Section id="lpcvd" title="LPCVD">
        <p>
          <Term>LPCVD</Term>, CVD tekanan rendah, adalah alat pada model tadi:
          tabung kuarsa di dalam tungku, dipompa sampai sekitar 0,1 sampai 1
          mbar, dengan suhu 550 sampai 850 °C.
        </p>
        <p>
          Tekanan rendah dipilih karena memperpanjang jalan bebas rata-rata
          molekul gas. Gas menyebar jauh lebih mudah ke celah sempit di antara
          wafer, sehingga proses tetap dibatasi reaksi walaupun wafer disusun
          rapat.
        </p>
        <p>
          Film LPCVD rapat, murni, dan sangat seragam, dan melapisi dinding
          parit hampir sama tebal dengan permukaan atas. Kelemahannya adalah
          suhunya. Aluminium meleleh pada 660 °C, jadi LPCVD tidak bisa dipakai
          setelah lapisan logam terpasang di wafer.
        </p>
      </Section>

      <Section id="pecvd" title="PECVD">
        <p>
          <Term>PECVD</Term>, CVD dengan bantuan plasma, menjawab masalah suhu
          itu. Energi untuk memecah molekul prekursor tidak diambil dari panas
          substrat, melainkan dari plasma, sama seperti plasma pada sputtering
          di Bab 13. Elektron di dalam plasma menumbuk molekul gas dan
          memecahnya menjadi pecahan yang sangat reaktif, yang langsung
          bereaksi begitu menyentuh permukaan.
        </p>
        <p>
          Hasilnya, film bisa ditumbuhkan pada 200 sampai 400 °C. Itu cukup
          rendah untuk wafer yang sudah berlogam, dan untuk substrat kaca pada
          layar dan sel surya.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>LPCVD</th>
                <th>PECVD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sumber energi reaksi</td>
                <td>Panas</td>
                <td>Plasma</td>
              </tr>
              <tr>
                <td>Suhu</td>
                <td>550 sampai 850 °C</td>
                <td>200 sampai 400 °C</td>
              </tr>
              <tr>
                <td>Laju tumbuh</td>
                <td>Lambat</td>
                <td>Cepat</td>
              </tr>
              <tr>
                <td>Mutu film</td>
                <td>Rapat dan murni</td>
                <td>Kurang rapat, mengandung hidrogen</td>
              </tr>
              <tr>
                <td>Pelapisan dinding parit</td>
                <td>Sangat baik</td>
                <td>Sedang</td>
              </tr>
              <tr>
                <td>Jumlah wafer sekali proses</td>
                <td>Banyak</td>
                <td>Satu atau beberapa</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Pada PECVD, stress film bisa diatur dari tarik sampai tekan dengan
          mengubah daya dan frekuensi plasma. Kemampuan ini berguna untuk
          mengatasi masalah stress yang dibahas di Bab 12.
        </p>
      </Section>

      <Section id="ald" title="ALD: satu lapis atom setiap siklus">
        <p>
          <Term>ALD</Term>, deposisi lapisan atom, adalah bentuk khusus CVD.
          Pada CVD biasa, semua gas dialirkan bersamaan dan film tumbuh terus
          selama gas mengalir. Pada ALD, dua gas prekursor dialirkan
          bergantian dan tidak pernah bertemu di dalam ruang. Jalankan
          siklusnya selangkah demi selangkah:
        </p>
        <AldCycle />
        <p>
          Kuncinya ada pada langkah pertama dan ketiga. Setiap prekursor hanya
          bisa bereaksi dengan permukaan, tidak dengan dirinya sendiri. Begitu
          semua tempat di permukaan terisi, reaksi berhenti, berapa pun
          banyaknya gas yang masih dialirkan. Sifat ini disebut{" "}
          <Term>membatasi diri</Term>, dan dari sifat inilah semua keunggulan
          ALD berasal:
        </p>
        <ul>
          <li>
            <Term>Tebal diatur dengan menghitung.</Term> Setiap siklus menambah
            tebal yang sama, sekitar 0,1 nm. Seratus siklus menghasilkan 10 nm,
            tanpa perlu alat pemantau tebal.
          </li>
          <li>
            <Term>Seragam di mana-mana.</Term> Gas menjangkau semua permukaan,
            dan setiap permukaan hanya menerima satu lapis. Dinding parit yang
            dalamnya seratus kali lebarnya pun terlapisi sama tebal.
          </li>
          <li>
            <Term>Tanpa lubang.</Term> Film setipis 1 atau 2 nm sudah menutup
            sempurna.
          </li>
        </ul>
        <p>
          Kelemahannya adalah kecepatan. Satu siklus makan waktu beberapa
          detik, sehingga film 10 nm bisa butuh beberapa menit sampai setengah
          jam. ALD dipakai di tempat yang menuntut tebal sangat tipis dan
          sangat tepat. Contoh terpentingnya adalah lapisan{" "}
          <Formula tex="\text{HfO}_2" /> setebal 1,5 nm pada gate transistor
          modern, yang kita lihat di Bab 10.
        </p>
        <p>Bandingkan kelima metode pada parit yang sama:</p>
        <StepCoverage methods={["evaporasi", "sputtering", "pecvd", "lpcvd", "ald"]} />
      </Section>

      <Section id="epitaksi" title="Epitaksi">
        <p>
          Film CVD biasanya polikristal atau amorf. Tetapi kalau substratnya
          kristal tunggal yang bersih dan suhunya cukup tinggi, atom yang
          mendarat punya cukup gerak untuk menempati posisi yang meneruskan
          kisi substrat. Film yang tumbuh ikut menjadi kristal tunggal.
          Pertumbuhan seperti ini disebut <Term>epitaksi</Term>. Ini adalah
          mode lapis demi lapis dari Bab 12 dalam bentuknya yang paling
          sempurna.
        </p>
        <ul>
          <li>
            <Term>Homoepitaksi</Term>: film dan substrat dari bahan yang sama,
            misalnya silikon di atas silikon pada 1.000 sampai 1.200 °C.
            Gunanya adalah mendapat lapisan dengan kadar doping yang berbeda
            dan lebih terkendali daripada wafernya.
          </li>
          <li>
            <Term>Heteroepitaksi</Term>: film dan substrat dari bahan berbeda,
            misalnya galium nitrida di atas safir untuk LED biru. Jarak atom
            keduanya harus cukup dekat. Kalau selisihnya besar, regangan
            menumpuk dan film dipenuhi cacat.
          </li>
        </ul>
        <p>Dua alat utamanya:</p>
        <ul>
          <li>
            <Term>MOCVD</Term>, CVD dengan prekursor logam-organik. Inilah
            alat yang membuat hampir semua LED dan laser semikonduktor.
          </li>
          <li>
            <Term>MBE</Term>, epitaksi berkas molekul. Ini sebenarnya metode
            PVD: unsur-unsur murni diuapkan perlahan di dalam vakum ultra
            tinggi, dengan laju sekitar satu lapis atom per detik. MBE memberi
            kendali paling halus, dan banyak dipakai dalam penelitian.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Hampir semua chip modern dibangun di atas lapisan epitaksi, bukan
            langsung di atas wafer. Wafer berfungsi sebagai penopang dan
            cetakan kristal, sedangkan transistor dibuat di lapisan epitaksi
            setebal beberapa mikrometer di atasnya.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Pada CVD, gas prekursor bereaksi di permukaan substrat yang panas. Unsur yang diinginkan tertinggal sebagai film, dan hasil sampingnya dipompa keluar.",
            "Laju tumbuh dibatasi reaksi permukaan pada suhu rendah dan dibatasi pasokan gas pada suhu tinggi.",
            "LPCVD memakai panas dan tekanan rendah: filmnya rapat dan seragam, tetapi suhunya tinggi. PECVD memakai plasma: suhunya rendah, tetapi filmnya kurang rapat.",
            "ALD mengalirkan dua prekursor bergantian. Tiap reaksi membatasi diri, sehingga tiap siklus menambah satu lapis dan tebal diatur dengan menghitung siklus.",
            "Epitaksi menumbuhkan film kristal tunggal yang meneruskan kisi substratnya, dengan MOCVD atau MBE.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="cvd-dan-ald" questions={questions} />
      </Section>
    </>
  );
}
