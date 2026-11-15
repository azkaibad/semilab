import { PvdExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { StepCoverage } from "@/components/widgets/StepCoverage";

export const objectives = [
  "Menjelaskan tiga tahap yang sama pada semua proses PVD",
  "Membedakan evaporasi termal dan evaporasi e-beam",
  "Menjelaskan cara kerja sputtering DC, RF, dan magnetron",
  "Memilih antara evaporasi dan sputtering untuk suatu kebutuhan",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa ciri utama deposisi fisik (PVD)?",
    options: [
      "Atom bahan padat dipindahkan ke substrat tanpa reaksi kimia",
      "Film terbentuk dari reaksi gas di permukaan substrat",
      "Bahan dilarutkan lalu dikeringkan",
      "Substrat dicelupkan ke logam cair",
    ],
    answer: 0,
    explanation:
      "Pada PVD bahan sumber dan bahan film sama. Yang berubah hanya wujud dan tempatnya: padat, menjadi uap, lalu padat lagi di substrat.",
  },
  {
    question: "Apa kelebihan evaporasi e-beam dibanding evaporasi termal?",
    options: [
      "Tidak membutuhkan vakum",
      "Alatnya lebih sederhana",
      "Bisa menguapkan bahan bertitik leleh tinggi, dan hasilnya lebih murni",
      "Melapisi dinding parit dengan lebih baik",
    ],
    answer: 2,
    explanation:
      "Berkas elektron hanya memanaskan satu titik pada bahan, sedangkan krusibelnya tetap dingin. Wadah tidak ikut menguap dan tidak mencemari film.",
  },
  {
    question: "Pada sputtering, apa yang melepaskan atom dari target?",
    options: [
      "Panas dari filamen",
      "Tumbukan ion argon berenergi tinggi",
      "Reaksi kimia dengan gas",
      "Berkas elektron",
    ],
    answer: 1,
    explanation:
      "Ion argon dari plasma dipercepat ke target dan memukul lepas atom-atomnya, seperti bola putih memecah susunan bola biliar.",
  },
  {
    question: "Jenis sputtering mana yang dibutuhkan untuk target isolator seperti SiO₂?",
    options: ["DC", "Evaporasi termal", "Tanpa plasma", "RF"],
    answer: 3,
    explanation:
      "Pada tegangan searah, muatan positif menumpuk di permukaan target isolator dan menolak ion berikutnya. Tegangan bolak-balik frekuensi radio menetralkan muatan itu pada setiap siklus.",
  },
  {
    question: "Apa fungsi magnet pada magnetron sputtering?",
    options: [
      "Menjebak elektron di dekat target sehingga plasma lebih rapat dan laju deposisi naik",
      "Menarik atom logam ke substrat",
      "Mendinginkan target",
      "Menggantikan gas argon",
    ],
    answer: 0,
    explanation:
      "Elektron yang terjebak berputar-putar di dekat target dan mengionkan jauh lebih banyak atom argon. Lebih banyak ion berarti lebih banyak atom target yang terlepas.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gagasan" title="Gagasan dasar PVD">
        <p>
          <Term>Deposisi fisik</Term>, disingkat PVD dari{" "}
          <em>physical vapor deposition</em>, adalah keluarga metode yang
          memindahkan atom dari sebongkah bahan padat ke permukaan substrat.
          Tidak ada reaksi kimia. Bahan sumber dan bahan film adalah bahan
          yang sama. Semua proses PVD punya tiga tahap:
        </p>
        <ol>
          <li>
            <Term>Melepaskan atom dari sumber.</Term> Dengan panas (evaporasi)
            atau dengan tumbukan ion (sputtering).
          </li>
          <li>
            <Term>Mengangkut atom melalui vakum.</Term> Di sini bekal dari Bab
            11 dipakai.
          </li>
          <li>
            <Term>Menumbuhkan film di substrat.</Term> Di sini bekal dari Bab
            12 dipakai.
          </li>
        </ol>
        <p>
          Pilih metode pada model di bawah, lalu ubah dayanya. Bandingkan arah
          gerak atom pada evaporasi dan pada sputtering.
        </p>
        <PvdExplorer />
      </Section>

      <Section id="evaporasi-termal" title="Evaporasi termal">
        <p>
          Cara paling sederhana untuk melepaskan atom adalah memanaskan bahan
          sampai menguap. Bahan diletakkan di atas wadah kecil dari logam tahan
          panas, biasanya tungsten, molibdenum, atau tantalum, yang disebut{" "}
          <Term>perahu</Term>. Arus listrik puluhan sampai ratusan ampere
          dialirkan melalui perahu itu sampai berpijar.
        </p>
        <p>
          Setiap bahan punya <Term>tekanan uap</Term> yang naik sangat tajam
          terhadap suhu. Deposisi berjalan dengan laju yang berguna saat
          tekanan uap bahan mencapai kira-kira <Formula tex="10^{-2}" /> mbar.
          Untuk aluminium itu terjadi di sekitar 1.200 °C, dan untuk emas di
          sekitar 1.400 °C. Karena hubungannya eksponensial, perubahan kecil
          pada daya pemanas mengubah laju deposisi dengan besar.
        </p>
        <p>
          Di dalam vakum tinggi, atom yang menguap terbang lurus. Akibatnya
          tebal film mengikuti <Term>hukum kosinus</Term>: bagian substrat
          yang tepat di atas sumber menerima paling banyak atom, dan bagian
          tepi menerima lebih sedikit. Untuk meratakan tebal, substrat dipasang
          jauh dari sumber dan diputar selama deposisi.
        </p>
        <p>Keterbatasannya:</p>
        <ul>
          <li>
            Bahan bertitik leleh tinggi seperti tungsten, tantalum, dan
            kebanyakan oksida tidak bisa diuapkan, karena perahunya akan ikut
            menguap.
          </li>
          <li>
            Perahu yang panas bisa bereaksi dengan bahan atau mencemari film.
          </li>
          <li>
            Paduan sulit diuapkan dengan komposisi tetap. Unsur dengan tekanan
            uap lebih tinggi menguap lebih dulu, sehingga komposisi film
            berubah selama deposisi.
          </li>
        </ul>
      </Section>

      <Section id="e-beam" title="Evaporasi e-beam">
        <p>
          <Term>Evaporasi berkas elektron</Term> mengatasi keterbatasan itu
          dengan memanaskan bahan secara langsung. Sebuah filamen melepaskan
          elektron, yang dipercepat dengan tegangan sekitar 10 kV. Medan magnet
          membelokkan berkas itu membentuk busur 270° sampai menghantam
          permukaan bahan.
        </p>
        <p>
          Busur itu bukan hiasan. Filamen ditaruh di bawah dan tersembunyi dari
          sumber, agar uap bahan tidak melapisi filamen dan memendekkan
          umurnya.
        </p>
        <p>
          Daya beberapa kilowatt terpusat pada titik selebar beberapa
          milimeter. Hanya titik itu yang meleleh. Krusibel tembaga di
          bawahnya didinginkan air, sehingga bahan yang bersentuhan dengan
          krusibel tetap padat. Bahan itu praktis meleleh di dalam wadah dari
          bahannya sendiri.
        </p>
        <p>Akibatnya:</p>
        <ul>
          <li>
            Hampir semua bahan bisa diuapkan, termasuk titanium, platina,
            tungsten, dan oksida.
          </li>
          <li>Film lebih murni, karena wadahnya tidak ikut panas.</li>
          <li>
            Laju deposisi bisa tinggi dan mudah diatur lewat arus berkas.
          </li>
          <li>
            Satu alat bisa memuat beberapa krusibel berisi bahan berbeda,
            sehingga beberapa lapisan bisa ditumbuhkan berurutan tanpa membuka
            vakum. Contohnya lapisan perekat titanium disusul emas.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Elektron yang menghantam bahan juga menghasilkan sinar-X. Dosisnya
            kecil, tetapi bisa merusak lapisan oksida gate yang peka. Itu salah
            satu alasan industri chip lebih memilih sputtering untuk lapisan
            logam.
          </p>
        </Callout>
        <p>
          Pada kedua jenis evaporasi, laju deposisi dipantau dengan{" "}
          <Term>kristal kuarsa</Term> yang dipasang di dekat substrat. Kristal
          itu bergetar pada frekuensi tertentu, dan frekuensinya turun sedikit
          setiap kali ada massa yang menempel. Dari perubahan frekuensi, tebal
          film bisa diketahui sampai ketelitian di bawah satu nanometer selama
          deposisi berlangsung.
        </p>
      </Section>

      <Section id="sputtering" title="Sputtering">
        <p>
          <Term>Sputtering</Term> melepaskan atom dengan tumbukan, bukan dengan
          panas. Urutannya:
        </p>
        <ol>
          <li>
            Ruang dipompa sampai vakum tinggi, lalu diisi gas argon sampai
            sekitar <Formula tex="10^{-3}" /> sampai <Formula tex="10^{-2}" />{" "}
            mbar.
          </li>
          <li>
            Bahan yang ingin dilapiskan, disebut <Term>target</Term>, diberi
            tegangan negatif beberapa ratus volt.
          </li>
          <li>
            Medan listrik mengionkan argon dan membentuk{" "}
            <Term>plasma</Term>: campuran ion positif dan elektron bebas yang
            berpendar.
          </li>
          <li>
            Ion argon positif tertarik ke target dan menghantamnya dengan
            energi ratusan elektronvolt.
          </li>
          <li>
            Tumbukan itu memukul lepas atom target, yang lalu terbang ke
            substrat.
          </li>
        </ol>
        <Callout kind="analogi">
          <p>
            Bola putih yang dipukul keras ke susunan bola biliar membuat bola
            lain terpental ke segala arah. Ion argon adalah bola putihnya, dan
            atom target adalah bola yang terpental.
          </p>
        </Callout>
        <p>
          Argon dipilih karena tidak bereaksi dengan apa pun, cukup berat untuk
          memukul dengan kuat, dan murah. Jumlah atom target yang lepas untuk
          setiap ion yang datang disebut <Term>sputter yield</Term>, biasanya
          antara 0,5 dan 3.
        </p>
        <p>Ada tiga jenis, sesuai cara plasma dibangkitkan:</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Jenis</th>
                <th>Cara kerja</th>
                <th>Dipakai untuk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DC</td>
                <td>Tegangan searah pada target</td>
                <td>Target yang menghantar listrik</td>
              </tr>
              <tr>
                <td>RF</td>
                <td>Tegangan bolak-balik 13,56 MHz</td>
                <td>Target isolator: oksida, nitrida</td>
              </tr>
              <tr>
                <td>Magnetron</td>
                <td>Magnet di balik target menjebak elektron</td>
                <td>Hampir semua pemakaian, karena lajunya tinggi</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Sputtering DC gagal pada target isolator karena ion positif yang
          menumpuk di permukaan tidak bisa dialirkan pergi. Muatan itu menolak
          ion berikutnya, dan plasma padam. Pada sputtering RF, polaritas
          berbalik jutaan kali per detik. Elektron yang ringan sempat
          menetralkan permukaan pada setiap setengah siklus, sedangkan ion yang
          berat tidak sempat berbalik arah.
        </p>
        <p>
          Magnetron bisa dipadukan dengan DC maupun RF. Medan magnet memaksa
          elektron berputar-putar di dekat permukaan target, sehingga satu
          elektron mengionkan jauh lebih banyak atom argon sebelum hilang.
          Hasilnya laju deposisi naik kira-kira sepuluh kali, dan substrat
          tidak ikut terpanaskan oleh elektron. Hampir semua alat sputtering
          sekarang adalah magnetron.
        </p>
        <Callout kind="penting">
          <p>
            Kalau gas reaktif seperti nitrogen atau oksigen dicampurkan ke
            argon, atom logam yang terlepas bereaksi dengannya dan film yang
            terbentuk adalah senyawa. Titanium yang disputter dalam campuran
            argon dan nitrogen menghasilkan titanium nitrida. Cara ini disebut{" "}
            <Term>sputtering reaktif</Term>.
          </p>
        </Callout>
      </Section>

      <Section id="perbandingan" title="Evaporasi atau sputtering">
        <p>
          Dua perbedaan mendasar menentukan hampir semua sifat lainnya. Pada
          evaporasi, atom terbang lurus dan tiba dengan energi rendah. Pada
          sputtering, atom tiba dari banyak arah dengan energi puluhan kali
          lebih tinggi. Lihat akibatnya pada sebuah parit:
        </p>
        <StepCoverage methods={["evaporasi", "sputtering"]} />
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Evaporasi</th>
                <th>Sputtering</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tekanan kerja</td>
                <td>
                  di bawah <Formula tex="10^{-5}" /> mbar
                </td>
                <td>
                  <Formula tex="10^{-3}" /> sampai <Formula tex="10^{-2}" /> mbar
                </td>
              </tr>
              <tr>
                <td>Energi atom saat tiba</td>
                <td>0,1 sampai 0,2 eV</td>
                <td>beberapa eV</td>
              </tr>
              <tr>
                <td>Adhesi dan kerapatan film</td>
                <td>Cukup</td>
                <td>Lebih baik, karena atom tiba dengan energi lebih tinggi</td>
              </tr>
              <tr>
                <td>Pelapisan dinding tegak</td>
                <td>Buruk</td>
                <td>Sedang</td>
              </tr>
              <tr>
                <td>Paduan dan senyawa</td>
                <td>Komposisi sulit dijaga</td>
                <td>Komposisi film mengikuti komposisi target</td>
              </tr>
              <tr>
                <td>Kemurnian</td>
                <td>Sangat baik pada vakum tinggi</td>
                <td>Baik, sedikit argon bisa ikut tertanam</td>
              </tr>
              <tr>
                <td>Luas substrat</td>
                <td>Terbatas</td>
                <td>Bisa sangat besar, sampai kaca jendela</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Evaporasi umum di laboratorium penelitian: alatnya sederhana, filmnya
          murni, dan sifat arah lurusnya cocok untuk lift-off. Sputtering
          menguasai industri: seragam pada substrat besar, cocok untuk paduan
          dan senyawa, dan mudah diulang dari satu wafer ke wafer berikutnya.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "PVD memindahkan atom dari sumber padat ke substrat melalui vakum, tanpa reaksi kimia.",
            "Evaporasi termal memanaskan bahan di atas perahu logam. Sederhana, tetapi terbatas pada bahan yang mudah menguap.",
            "Evaporasi e-beam memanaskan satu titik pada bahan dengan berkas elektron. Cocok untuk hampir semua bahan dan hasilnya lebih murni.",
            "Sputtering memukul lepas atom target dengan ion argon dari plasma. DC untuk target penghantar, RF untuk isolator, dan magnetron untuk laju tinggi.",
            "Atom evaporasi terbang lurus dengan energi rendah. Atom sputtering datang dari banyak arah dengan energi lebih tinggi, sehingga adhesi dan pelapisan dindingnya lebih baik.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="pvd" questions={questions} />
      </Section>
    </>
  );
}
