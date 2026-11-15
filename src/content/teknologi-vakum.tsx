import { VacuumExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";

export const objectives = [
  "Menjelaskan tiga alasan deposisi membutuhkan vakum",
  "Mengubah tekanan antara pascal, milibar, dan torr, serta mengenali daerah vakum",
  "Menghubungkan tekanan dengan jalan bebas rata-rata molekul gas",
  "Memilih pompa dan alat ukur yang sesuai untuk suatu rentang tekanan",
];

const questions: QuizQuestion[] = [
  {
    question: "Tekanan udara di permukaan laut kira-kira sama dengan…",
    options: ["1 mbar", "100 mbar", "1.013 mbar", "760 mbar"],
    answer: 2,
    explanation:
      "Satu atmosfer adalah 101.325 Pa, yaitu 1.013 mbar atau 760 Torr.",
  },
  {
    question: "Kalau tekanan diturunkan menjadi seperseribunya, jalan bebas rata-rata menjadi…",
    options: [
      "seribu kali lebih panjang",
      "seribu kali lebih pendek",
      "tetap",
      "sejuta kali lebih panjang",
    ],
    answer: 0,
    explanation:
      "Jalan bebas rata-rata berbanding terbalik dengan tekanan. Makin sedikit molekul, makin jauh jarak antartabrakan.",
  },
  {
    question: "Kenapa evaporasi dilakukan di bawah kira-kira 10⁻⁴ mbar?",
    options: [
      "Agar sumbernya cepat dingin",
      "Agar atom uap sampai ke substrat tanpa menabrak molekul gas",
      "Agar substrat tidak bergerak",
      "Agar pompa bekerja lebih ringan",
    ],
    answer: 1,
    explanation:
      "Pada tekanan itu jalan bebas rata-rata sudah lebih panjang daripada jarak sumber ke substrat, sehingga atom terbang lurus.",
  },
  {
    question: "Pompa turbomolekuler tidak bisa bekerja mulai dari tekanan atmosfer. Apa yang dibutuhkannya?",
    options: [
      "Pemanas ruang",
      "Alat ukur ionisasi",
      "Gas argon",
      "Pompa kasar yang menurunkan tekanan lebih dulu dan menampung buangannya",
    ],
    answer: 3,
    explanation:
      "Pompa vakum tinggi selalu dipasangkan dengan pompa kasar, yang disebut pompa pendukung.",
  },
  {
    question: "Alat ukur mana yang cocok untuk tekanan 10⁻⁸ mbar?",
    options: [
      "Pirani",
      "Manometer kapasitansi",
      "Alat ukur ionisasi, misalnya Bayard-Alpert",
      "Barometer raksa",
    ],
    answer: 2,
    explanation:
      "Pada tekanan serendah itu gaya dan hantaran panas gas terlalu kecil untuk diukur. Yang masih bisa dihitung adalah ion yang terbentuk dari molekul gas.",
  },
];

export function Body() {
  return (
    <>
      <Section id="kenapa-vakum" title="Kenapa perlu ruang hampa">
        <p>
          Udara di sekitar kita sangat padat menurut ukuran atom. Setiap
          sentimeter kubik berisi sekitar <Formula tex="2{,}5 \times 10^{19}" />{" "}
          molekul yang terus bertabrakan. Untuk menumbuhkan lapisan yang
          tebalnya dihitung dalam lapis atom, kepadatan itu menimbulkan tiga
          masalah:
        </p>
        <ul>
          <li>
            <Term>Atom tidak sampai ke substrat.</Term> Atom yang diuapkan dari
            sumber akan menabrak molekul udara setelah menempuh kurang dari
            sepersepuluh mikrometer, lalu berbelok ke arah acak.
          </li>
          <li>
            <Term>Film tercemar.</Term> Oksigen dan uap air bereaksi dengan
            hampir semua logam panas. Molekul gas juga ikut tertanam di dalam
            film yang sedang tumbuh.
          </li>
          <li>
            <Term>Proses tidak terkendali.</Term> Sputtering dan banyak proses
            CVD memakai plasma atau campuran gas dengan takaran tertentu. Itu
            hanya mungkin kalau udara dibuang dulu, lalu gas yang diinginkan
            dimasukkan dalam jumlah terukur.
          </li>
        </ul>
        <p>
          <Term>Vakum</Term> berarti ruang dengan tekanan gas jauh di bawah
          tekanan atmosfer. Vakum tidak pernah benar-benar kosong. Pada vakum
          terbaik di laboratorium pun masih ada jutaan molekul per sentimeter
          kubik.
        </p>
      </Section>

      <Section id="tekanan" title="Tekanan dan satuannya">
        <p>
          Tekanan gas berasal dari tumbukan molekul pada dinding. Makin sedikit
          molekul, makin rendah tekanannya. Pada suhu tetap, tekanan berbanding
          lurus dengan jumlah molekul per volume:
        </p>
        <Formula block tex="P = n\,k\,T" />
        <p>Tiga satuan dipakai sehari-hari di bidang vakum:</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Satuan</th>
                <th>1 atmosfer =</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pascal (Pa)</td>
                <td>101.325 Pa</td>
                <td>Satuan SI</td>
              </tr>
              <tr>
                <td>Milibar (mbar)</td>
                <td>1.013 mbar</td>
                <td>1 mbar = 100 Pa. Umum di Eropa dan Asia</td>
              </tr>
              <tr>
                <td>Torr</td>
                <td>760 Torr</td>
                <td>1 Torr ≈ 1,33 mbar. Umum di Amerika</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Torr dan milibar hampir sama besar, jadi untuk perkiraan kasar
          keduanya sering dianggap setara. Bab ini memakai milibar. Rentang
          tekanan yang dipakai sangat lebar, lebih dari tiga belas orde
          besaran, sehingga dibagi menjadi beberapa daerah:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Daerah</th>
                <th>Tekanan (mbar)</th>
                <th>Contoh pemakaian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vakum kasar</td>
                <td>1.000 sampai 1</td>
                <td>Pengemasan, penjepit vakum</td>
              </tr>
              <tr>
                <td>Vakum menengah</td>
                <td>
                  1 sampai <Formula tex="10^{-3}" />
                </td>
                <td>Sputtering, CVD tekanan rendah, etching plasma</td>
              </tr>
              <tr>
                <td>Vakum tinggi</td>
                <td>
                  <Formula tex="10^{-3}" /> sampai <Formula tex="10^{-8}" />
                </td>
                <td>Evaporasi, implantasi ion, mikroskop elektron</td>
              </tr>
              <tr>
                <td>Vakum ultra tinggi</td>
                <td>
                  di bawah <Formula tex="10^{-8}" />
                </td>
                <td>Epitaksi berkas molekul, analisis permukaan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="jalan-bebas" title="Jalan bebas rata-rata">
        <p>
          <Term>Jalan bebas rata-rata</Term> adalah jarak rata-rata yang
          ditempuh sebuah molekul gas di antara dua tabrakan. Inilah besaran
          terpenting di bab ini. Rumusnya:
        </p>
        <Formula block tex="\lambda = \frac{kT}{\sqrt{2}\,\pi d^{2} P}" />
        <p>
          dengan <Formula tex="d" /> diameter molekul. Yang perlu diingat
          adalah bentuknya: jalan bebas rata-rata berbanding terbalik dengan
          tekanan. Untuk udara pada suhu ruang ada rumus praktis yang mudah
          dihafal:
        </p>
        <Formula block tex="\lambda\ (\text{cm}) \approx \frac{6{,}6 \times 10^{-3}}{P\ (\text{mbar})}" />
        <p>
          Turunkan tekanan pada model di bawah. Perhatikan atom jingga dari
          sumber uap: kapan atom itu mulai sampai ke substrat, dan kapan
          lintasannya menjadi lurus.
        </p>
        <VacuumExplorer />
        <p>Dari model itu terlihat tiga keadaan:</p>
        <ul>
          <li>
            Pada tekanan atmosfer, jalan bebas rata-rata hanya sekitar 65 nm.
            Atom uap tidak pernah meninggalkan daerah di sekitar sumber.
          </li>
          <li>
            Di sekitar <Formula tex="10^{-3}" /> mbar, jalan bebas rata-rata
            beberapa sentimeter. Atom sampai ke substrat, tetapi setelah
            beberapa kali berbelok. Sputtering bekerja di daerah ini.
          </li>
          <li>
            Di bawah <Formula tex="10^{-4}" /> mbar, jalan bebas rata-rata
            sudah lebih panjang daripada ukuran ruang. Atom terbang lurus dari
            sumber ke substrat. Evaporasi membutuhkan keadaan ini.
          </li>
        </ul>
        <Callout kind="analogi">
          <p>
            Berjalan melintasi pasar yang penuh sesak, Anda menabrak orang
            setiap satu atau dua langkah. Di lapangan kosong pada tengah malam,
            Anda bisa berjalan lurus dari ujung ke ujung. Memompa ruang vakum
            sama dengan mengosongkan pasar itu.
          </p>
        </Callout>
      </Section>

      <Section id="kemurnian" title="Seberapa cepat permukaan tercemar">
        <p>
          Alasan kedua, kemurnian, juga bisa dihitung. Molekul gas sisa terus
          menghujani setiap permukaan di dalam ruang. Waktu yang dibutuhkan
          untuk menutupi permukaan bersih dengan satu lapis molekul gas, kalau
          semua molekul yang datang menempel, kira-kira:
        </p>
        <Formula block tex="t\ (\text{detik}) \approx \frac{3{,}5 \times 10^{-6}}{P\ (\text{mbar})}" />
        <p>
          Pada <Formula tex="10^{-6}" /> mbar, tekanan yang umum untuk
          evaporasi, hasilnya sekitar 3 detik. Film biasanya tumbuh dengan
          laju sekitar satu lapis atom per detik. Artinya molekul gas sisa
          datang ke permukaan hampir sesering atom film itu sendiri.
        </p>
        <p>
          Untungnya tidak semua molekul gas menempel, dan gas sisa yang utama
          bisa dipilih agar tidak reaktif. Tetapi hitungan ini menjelaskan dua
          hal: kenapa film yang sangat murni membutuhkan vakum ultra tinggi,
          dan kenapa menumbuhkan film dengan cepat membantu kemurniannya.
        </p>
      </Section>

      <Section id="pompa" title="Pompa vakum">
        <p>
          Tidak ada satu pompa yang bisa bekerja dari tekanan atmosfer sampai
          vakum tinggi. Penyebabnya adalah perilaku gas yang berubah. Pada
          tekanan tinggi, molekul saling bertabrakan dan gas mengalir seperti
          cairan, sehingga bisa disedot. Pada tekanan rendah, molekul hampir
          tidak pernah bertemu satu sama lain dan hanya memantul dari dinding
          ke dinding. Gas seperti itu tidak bisa disedot. Pompa hanya bisa
          menangkap molekul yang kebetulan masuk ke dalamnya.
        </p>
        <p>Karena itu sistem vakum selalu memakai dua tahap.</p>
        <p>
          <Term>Pompa kasar</Term> bekerja dari tekanan atmosfer sampai
          sekitar <Formula tex="10^{-2}" /> atau <Formula tex="10^{-3}" /> mbar
          dengan cara memerangkap gas, memampatkannya, lalu membuangnya:
        </p>
        <ul>
          <li>
            <Term>Rotary vane.</Term> Bilah berputar di dalam rumah berisi
            oli. Murah dan tangguh, tetapi uap olinya bisa mencemari ruang.
          </li>
          <li>
            <Term>Scroll.</Term> Dua spiral yang saling mengunci. Tanpa oli,
            sehingga bersih.
          </li>
          <li>
            <Term>Roots.</Term> Dua rotor berbentuk angka delapan. Lajunya
            besar, dan dipasang di antara pompa kasar dan ruang.
          </li>
        </ul>
        <p>
          <Term>Pompa vakum tinggi</Term> mengambil alih dari sana:
        </p>
        <ul>
          <li>
            <Term>Turbomolekuler.</Term> Sudu-sudu berputar puluhan ribu
            putaran per menit dan memukul molekul gas ke arah keluar. Bersih
            dan paling umum dipakai sekarang.
          </li>
          <li>
            <Term>Difusi.</Term> Semburan uap oli menyeret molekul gas ke
            bawah. Sederhana dan tanpa bagian bergerak, tetapi berisiko
            mencemari ruang dengan oli.
          </li>
          <li>
            <Term>Kryo.</Term> Permukaan yang didinginkan sampai sekitar 15 K
            membekukan gas yang menyentuhnya. Sangat bersih, tetapi perlu
            dikosongkan secara berkala.
          </li>
          <li>
            <Term>Ion.</Term> Gas diionkan lalu ditanamkan ke pelat titanium.
            Tanpa getaran dan dipakai untuk vakum ultra tinggi.
          </li>
        </ul>
        <Callout kind="penting">
          <p>
            Pompa turbomolekuler dan pompa difusi tidak membuang gas ke udara
            luar. Keduanya membuang ke sebuah pompa kasar yang terus menyala
            di belakangnya, yang disebut <Term>pompa pendukung</Term>.
            Menyalakan pompa vakum tinggi pada tekanan atmosfer bisa
            merusaknya.
          </p>
        </Callout>
      </Section>

      <Section id="alat-ukur" title="Alat ukur vakum">
        <p>
          Alat ukur menghadapi masalah yang sama dengan pompa: tidak ada satu
          alat yang menjangkau seluruh rentang. Tiap jenis mengukur sifat gas
          yang berbeda.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Alat ukur</th>
                <th>Yang diukur</th>
                <th>Rentang (mbar)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manometer kapasitansi</td>
                <td>Lenturan membran tipis akibat gaya tekan gas</td>
                <td>
                  1.000 sampai <Formula tex="10^{-4}" />
                </td>
              </tr>
              <tr>
                <td>Pirani</td>
                <td>Panas yang dibawa pergi oleh gas dari kawat panas</td>
                <td>
                  100 sampai <Formula tex="10^{-4}" />
                </td>
              </tr>
              <tr>
                <td>Penning (katode dingin)</td>
                <td>Arus ion dari lucutan listrik di dalam medan magnet</td>
                <td>
                  <Formula tex="10^{-2}" /> sampai <Formula tex="10^{-9}" />
                </td>
              </tr>
              <tr>
                <td>Bayard-Alpert (katode panas)</td>
                <td>Arus ion yang dibentuk oleh elektron dari filamen</td>
                <td>
                  <Formula tex="10^{-3}" /> sampai <Formula tex="10^{-11}" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Manometer kapasitansi mengukur gaya secara langsung, jadi hasilnya
          tidak bergantung pada jenis gas. Tiga alat lainnya mengukur secara
          tidak langsung, sehingga pembacaannya bergantung pada jenis gas dan
          biasanya dikalibrasi untuk nitrogen. Sistem vakum hampir selalu
          memasang dua alat ukur: satu untuk tahap kasar dan satu untuk vakum
          tinggi.
        </p>
      </Section>

      <Section id="praktik" title="Memompa ruang dalam praktik">
        <p>Urutan memompa sebuah ruang deposisi biasanya seperti ini:</p>
        <ol>
          <li>
            Pompa kasar menurunkan tekanan dari atmosfer sampai sekitar{" "}
            <Formula tex="10^{-2}" /> mbar. Ini hanya butuh beberapa menit,
            karena yang dibuang adalah gas yang mengisi ruang.
          </li>
          <li>
            Katup ke pompa vakum tinggi dibuka. Tekanan turun cepat sampai
            sekitar <Formula tex="10^{-5}" /> mbar.
          </li>
          <li>
            Setelah itu penurunannya sangat lambat, dan bisa makan waktu
            berjam-jam untuk turun satu orde lagi.
          </li>
        </ol>
        <p>
          Yang menahan pada tahap ketiga bukan gas di dalam ruang, melainkan
          molekul yang menempel di dinding. Selama ruang terbuka, uap air dari
          udara melapisi semua permukaan logam. Di dalam vakum, lapisan itu
          lepas sedikit demi sedikit. Peristiwa ini disebut{" "}
          <Term>outgassing</Term>, dan pada vakum tinggi inilah sumber gas
          yang utama.
        </p>
        <p>Beberapa kebiasaan kerja berasal dari sini:</p>
        <ul>
          <li>
            Bagian dalam ruang tidak disentuh dengan tangan telanjang. Minyak
            dari sidik jari menguap perlahan selama berhari-hari.
          </li>
          <li>
            Ruang dibuka sesingkat mungkin dan diisi nitrogen kering saat
            dibuka, bukan udara lembap.
          </li>
          <li>
            Untuk vakum ultra tinggi, seluruh ruang dipanaskan sampai sekitar
            150 °C selama sehari atau lebih sambil dipompa, agar air di
            dinding lepas lebih cepat. Langkah ini disebut bake-out.
          </li>
          <li>
            Sambungan memakai cincin karet untuk vakum tinggi, dan gasket
            tembaga untuk vakum ultra tinggi karena karet sendiri melepaskan
            gas.
          </li>
        </ul>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Deposisi butuh vakum agar atom sampai ke substrat, agar film tidak tercemar, dan agar gas proses bisa ditakar.",
            "1 atmosfer = 101.325 Pa = 1.013 mbar = 760 Torr. Daerah vakum: kasar, menengah, tinggi, dan ultra tinggi.",
            "Jalan bebas rata-rata berbanding terbalik dengan tekanan: λ (cm) ≈ 6,6 × 10⁻³ / P (mbar). Di bawah 10⁻⁴ mbar atom terbang lurus dari sumber ke substrat.",
            "Pada 10⁻⁶ mbar, permukaan bersih tertutup satu lapis molekul gas dalam beberapa detik.",
            "Sistem vakum memakai pompa kasar dan pompa vakum tinggi secara berurutan, serta alat ukur yang berbeda untuk tiap rentang.",
            "Pada vakum tinggi, sumber gas yang utama adalah outgassing dari dinding, terutama uap air.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="teknologi-vakum" questions={questions} />
      </Section>
    </>
  );
}
