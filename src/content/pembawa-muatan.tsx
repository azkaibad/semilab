import { CarrierExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FermiWidget } from "@/components/widgets/FermiWidget";

export const objectives = [
  "Menjelaskan bagaimana elektron bebas dan hole terbentuk di silikon murni",
  "Menjelaskan kenapa hole diperlakukan sebagai partikel bermuatan positif",
  "Menyebutkan konsentrasi pembawa intrinsik silikon pada suhu ruang",
  "Menjelaskan pengaruh suhu dan celah pita terhadap jumlah pembawa muatan",
  "Membaca level Fermi pada diagram pita",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang terjadi saat satu ikatan kovalen di silikon putus?",
    options: [
      "Terbentuk satu elektron bebas saja",
      "Terbentuk satu elektron bebas dan satu hole",
      "Terbentuk dua elektron bebas",
      "Atom silikon berpindah tempat",
    ],
    answer: 1,
    explanation:
      "Elektron yang lepas menjadi elektron bebas, dan tempat kosong yang ditinggalkannya di ikatan adalah hole. Keduanya selalu muncul berpasangan.",
  },
  {
    question: "Bagaimana sebuah hole berpindah?",
    options: [
      "Atom silikonnya bergeser",
      "Proton keluar dari inti",
      "Elektron dari ikatan tetangga mengisi kekosongan, sehingga kekosongan pindah ke tempat elektron itu berasal",
      "Hole tidak bisa berpindah",
    ],
    answer: 2,
    explanation:
      "Yang sebenarnya bergerak adalah elektron valensi, tetapi lebih mudah mengikuti satu kekosongan yang berpindah ke arah berlawanan.",
  },
  {
    question: "Pada semikonduktor intrinsik, hubungan jumlah elektron bebas (n) dan hole (p) adalah…",
    options: ["n jauh lebih besar dari p", "p jauh lebih besar dari n", "n = p", "n + p = 0"],
    answer: 2,
    explanation:
      "Setiap ikatan yang putus menghasilkan tepat satu elektron dan satu hole, jadi n = p = nᵢ.",
  },
  {
    question: "Berapa kira-kira konsentrasi pembawa intrinsik silikon pada suhu ruang?",
    options: ["10² cm⁻³", "10¹⁰ cm⁻³", "10²² cm⁻³", "10³⁰ cm⁻³"],
    answer: 1,
    explanation:
      "Sekitar 10¹⁰ cm⁻³, sangat kecil dibanding 5 × 10²² atom silikon per cm³.",
  },
  {
    question:
      "Pada suhu yang sama, kenapa germanium punya jauh lebih banyak pembawa intrinsik daripada silikon?",
    options: [
      "Karena atom germanium lebih berat",
      "Karena celah pita germanium lebih kecil",
      "Karena germanium bukan semikonduktor",
      "Karena germanium punya lebih banyak elektron valensi",
    ],
    answer: 1,
    explanation:
      "Jumlah pembawa bergantung secara eksponensial pada celah pita. Celah 0,66 eV jauh lebih mudah diseberangi daripada 1,12 eV.",
  },
];

export function Body() {
  return (
    <>
      <Section id="ikatan-putus" title="Saat sebuah ikatan putus">
        <p>
          Di Bab 4 kita melihat silikon dari sisi energi: pita valensi yang
          penuh, pita konduksi yang kosong, dan celah di antaranya. Sekarang
          lihat hal yang sama dari sisi kristalnya. Pita valensi yang penuh
          berarti semua elektron valensi sedang terikat dalam ikatan kovalen.
          Pita konduksi yang kosong berarti tidak ada elektron yang bebas
          berkeliaran.
        </p>
        <p>
          Atom di dalam kristal selalu bergetar, dan makin panas makin kuat
          getarannya. Sesekali getaran itu memberi satu elektron cukup energi
          untuk lepas dari ikatannya. Dua hal muncul sekaligus:
        </p>
        <ul>
          <li>
            <Term>Elektron bebas</Term>, yaitu elektron yang lepas dan sekarang
            bisa bergerak ke mana saja di dalam kristal. Di diagram pita,
            elektron ini naik ke pita konduksi.
          </li>
          <li>
            <Term>Hole</Term>, yaitu tempat kosong yang ditinggalkan di ikatan.
            Di diagram pita, ini adalah satu keadaan kosong di pita valensi.
          </li>
        </ul>
        <p>
          Geser suhu pada model di bawah mulai dari 0 K dan perhatikan kapan
          pasangan pertama muncul.
        </p>
        <CarrierExplorer mode="thermal" />
      </Section>

      <Section id="hole" title="Hole sebagai pembawa muatan">
        <p>
          Hole bukan partikel sungguhan. Hole adalah ketiadaan satu elektron.
          Tetapi hole bisa berpindah: elektron dari ikatan tetangga melompat
          mengisi kekosongan itu, dan kekosongannya pindah ke tempat elektron
          tadi berasal. Proses ini berulang terus.
        </p>
        <Callout kind="analogi">
          <p>
            Satu kursi kosong di barisan bioskop yang penuh. Kalau tiap
            penonton bergeser satu kursi ke kiri, kursi kosongnya bergerak ke
            kanan. Jauh lebih mudah mengatakan “kursi kosong pindah ke kanan”
            daripada menyebutkan perpindahan setiap penonton.
          </p>
        </Callout>
        <p>
          Itulah alasan hole diperlakukan sebagai partikel. Daripada mengikuti
          gerak sekian banyak elektron valensi, kita cukup mengikuti satu
          kekosongan. Karena daerah yang kekurangan satu elektron bermuatan
          lebih positif, hole dianggap bermuatan <Formula tex="+q" />, sama
          besar dengan muatan elektron tetapi berlawanan tanda. Di dalam medan
          listrik, hole bergerak berlawanan arah dengan elektron.
        </p>
        <Callout kind="penting">
          <p>
            Semikonduktor punya dua jenis pembawa muatan: elektron bebas yang
            negatif dan hole yang positif. Logam hanya punya elektron. Adanya
            dua jenis pembawa inilah yang memungkinkan sambungan p-n dan
            transistor.
          </p>
        </Callout>
      </Section>

      <Section id="intrinsik" title="Semikonduktor intrinsik">
        <p>
          Semikonduktor yang murni, tanpa atom asing, disebut{" "}
          <Term>intrinsik</Term>. Karena elektron bebas dan hole selalu lahir
          berpasangan, jumlahnya sama. Konsentrasi elektron ditulis{" "}
          <Formula tex="n" />, konsentrasi hole <Formula tex="p" />, dan pada
          bahan intrinsik
        </p>
        <Formula block tex="n = p = n_i" />
        <p>
          dengan <Formula tex="n_i" /> konsentrasi pembawa intrinsik. Untuk
          silikon pada suhu ruang,
        </p>
        <Formula block tex="n_i \approx 10^{10}\ \text{cm}^{-3}" />
        <p>
          Sepuluh miliar per sentimeter kubik terdengar banyak, tetapi silikon
          punya <Formula tex="5 \times 10^{22}" /> atom per sentimeter kubik.
          Artinya hanya ada satu pasangan untuk setiap lima triliun atom.
          Silikon murni pada suhu ruang adalah penghantar yang buruk.
        </p>
        <p>
          Pasangan tidak terus bertambah. Elektron bebas yang bertemu hole akan
          jatuh mengisinya, dan keduanya hilang. Proses ini disebut{" "}
          <Term>rekombinasi</Term>, kebalikan dari <Term>generasi</Term>. Pada
          suhu tetap, laju keduanya seimbang sehingga jumlah pasangan tetap.
        </p>
      </Section>

      <Section id="suhu" title="Pengaruh suhu dan celah pita">
        <p>Konsentrasi pembawa intrinsik mengikuti</p>
        <Formula
          block
          tex="n_i \propto T^{3/2} \exp\!\left(-\frac{E_g}{2kT}\right)"
        />
        <p>
          Bagian eksponensialnya yang paling menentukan. Ada dua akibat yang
          perlu diingat:
        </p>
        <ul>
          <li>
            <Term>Suhu.</Term> Kenaikan suhu yang kecil menaikkan{" "}
            <Formula tex="n_i" /> dengan tajam. Untuk silikon di sekitar suhu
            ruang, <Formula tex="n_i" /> kira-kira menjadi dua kali lipat
            setiap kenaikan 8 sampai 10 K.
          </li>
          <li>
            <Term>Celah pita.</Term> Makin kecil <Formula tex="E_g" />, makin
            banyak pembawa. Germanium punya sekitar dua ribu kali lebih banyak
            pembawa intrinsik daripada silikon pada suhu yang sama.
          </li>
        </ul>
        <FermiWidget />
        <Callout kind="penting">
          <p>
            Inilah sebabnya devais elektronik punya batas suhu kerja. Kalau
            terlalu panas, pembawa yang muncul sendiri akibat panas menjadi
            lebih banyak daripada yang sengaja kita atur, dan devais kehilangan
            kendali. Silikon bertahan sampai suhu yang lebih tinggi daripada
            germanium karena celah pitanya lebih lebar.
          </p>
        </Callout>
      </Section>

      <Section id="level-fermi" title="Level Fermi">
        <p>
          Kurva di sebelah kanan pada alat di atas adalah{" "}
          <Term>distribusi Fermi-Dirac</Term>. Kurva itu menjawab satu
          pertanyaan: kalau ada sebuah keadaan pada energi{" "}
          <Formula tex="E" />, berapa peluang keadaan itu terisi elektron?
        </p>
        <Formula
          block
          tex="f(E) = \frac{1}{1 + \exp\!\left(\dfrac{E - E_F}{kT}\right)}"
        />
        <p>
          Besaran <Formula tex="E_F" /> disebut <Term>level Fermi</Term>, yaitu
          energi tempat peluang terisi tepat setengah. Jauh di bawah level
          Fermi, keadaan hampir pasti terisi. Jauh di atasnya, hampir pasti
          kosong. Lebar daerah peralihannya beberapa kali{" "}
          <Formula tex="kT" />, sehingga makin panas makin landai.
        </p>
        <Callout kind="analogi">
          <p>
            Level Fermi seperti permukaan air di dalam bejana. Di bawah
            permukaan penuh air, di atasnya kosong. Suhu membuat permukaan itu
            beriak: sedikit air terpercik ke atas dan meninggalkan sedikit
            rongga di bawah.
          </p>
        </Callout>
        <p>
          Pada semikonduktor intrinsik, level Fermi berada hampir tepat di
          tengah celah pita. Ini masuk akal: jumlah elektron di pita konduksi
          sama dengan jumlah hole di pita valensi, jadi kurvanya harus simetris
          terhadap kedua pita.
        </p>
        <p>
          Level Fermi akan menjadi alat baca yang sangat berguna. Di Bab 6 kita
          akan melihat doping menggesernya ke atas atau ke bawah, dan dari
          posisinya saja kita bisa tahu jenis dan jumlah pembawa muatan dalam
          suatu bahan.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Ikatan kovalen yang putus menghasilkan satu elektron bebas dan satu hole.",
            "Hole adalah kekosongan elektron di pita valensi. Hole berperilaku seperti partikel bermuatan +q.",
            "Pada semikonduktor intrinsik n = p = nᵢ. Untuk silikon pada suhu ruang nᵢ ≈ 10¹⁰ cm⁻³.",
            "nᵢ naik sangat tajam terhadap suhu dan turun sangat tajam terhadap lebar celah pita.",
            "Level Fermi adalah energi dengan peluang terisi setengah. Pada bahan intrinsik letaknya di tengah celah pita.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="pembawa-muatan" questions={questions} />
      </Section>
    </>
  );
}
