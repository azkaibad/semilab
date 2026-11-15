import { BandFormation } from "@/components/three/lazy";
import { DirectIndirect } from "@/components/ui/DirectIndirect";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { BandCompare } from "@/components/widgets/BandCompare";

export const objectives = [
  "Menjelaskan bagaimana tingkat energi atom berubah menjadi pita energi",
  "Membedakan pita valensi, pita konduksi, dan celah pita",
  "Menjelaskan beda konduktor, semikonduktor, dan isolator dari diagram pitanya",
  "Menghubungkan celah pita dengan cahaya yang diserap atau dipancarkan",
  "Membedakan celah langsung dan tak langsung",
];

const questions: QuizQuestion[] = [
  {
    question:
      "Kalau N atom yang sama didekatkan sampai membentuk kristal, satu tingkat energi atom berubah menjadi…",
    options: [
      "satu tingkat yang sama",
      "N tingkat yang sangat berdekatan",
      "dua tingkat",
      "tidak ada tingkat sama sekali",
    ],
    answer: 1,
    explanation:
      "Prinsip Pauli memaksa tingkat itu memecah menjadi N tingkat. Karena N sangat besar, tingkat-tingkat itu membentuk pita.",
  },
  {
    question: "Apa yang dimaksud celah pita (band gap)?",
    options: [
      "Jarak antara dua atom",
      "Rentang energi yang tidak punya keadaan untuk ditempati elektron",
      "Ruang kosong di dalam kristal",
      "Ketebalan pita valensi",
    ],
    answer: 1,
    explanation:
      "Celah pita adalah rentang energi terlarang di antara puncak pita valensi dan dasar pita konduksi.",
  },
  {
    question: "Kenapa pita valensi yang terisi penuh tidak menghantarkan arus?",
    options: [
      "Karena elektronnya tidak bermuatan",
      "Karena elektronnya terlalu berat",
      "Karena tidak ada keadaan kosong untuk ditempati elektron yang ingin berpindah",
      "Karena elektronnya terlalu jauh dari inti",
    ],
    answer: 2,
    explanation:
      "Agar arus mengalir, elektron harus berpindah ke keadaan lain. Di pita yang penuh, semua keadaan sudah terisi.",
  },
  {
    question: "Berapa celah pita silikon pada suhu ruang?",
    options: ["0,026 eV", "0,66 eV", "1,12 eV", "9 eV"],
    answer: 2,
    explanation:
      "Sekitar 1,12 eV, kira-kira 43 kali energi termal pada suhu ruang.",
  },
  {
    question: "Kenapa LED dibuat dari bahan seperti GaAs atau GaN, bukan silikon?",
    options: [
      "Karena silikon terlalu mahal",
      "Karena silikon tidak punya celah pita",
      "Karena silikon terlalu keras",
      "Karena celah pita silikon tak langsung, sehingga jarang memancarkan cahaya",
    ],
    answer: 3,
    explanation:
      "Pada celah tak langsung, elektron butuh bantuan getaran kisi untuk turun, dan energinya lebih sering menjadi panas daripada cahaya.",
  },
];

export function Body() {
  return (
    <>
      <Section id="dari-atom-ke-pita" title="Dari tingkat energi menjadi pita">
        <p>
          Bab 3 berakhir dengan satu atom yang tingkat energinya tajam dan
          terpisah-pisah. Sekarang dekatkan dua atom yang sama. Saat awan
          elektron terluarnya mulai tumpang-tindih, kedua atom itu menjadi satu
          sistem. Prinsip Pauli melarang elektron dari kedua atom menempati
          keadaan yang sama, sehingga tiap tingkat energi memecah menjadi dua:
          satu sedikit lebih rendah, satu sedikit lebih tinggi.
        </p>
        <p>
          Dengan empat atom, tiap tingkat memecah menjadi empat. Dengan{" "}
          <Formula tex="N" /> atom, menjadi <Formula tex="N" /> tingkat. Coba
          sendiri pada model di bawah: mulai dari dua atom, geser jaraknya
          sampai dekat, lalu tambah jumlah atomnya.
        </p>
        <BandFormation />
        <p>
          Satu sentimeter kubik silikon berisi sekitar{" "}
          <Formula tex="5 \times 10^{22}" /> atom, angka yang kita hitung di
          Bab 2. Tingkat sebanyak itu berjejal dalam rentang beberapa eV saja,
          sehingga jarak antar-tingkatnya terlalu kecil untuk dibedakan.
          Kumpulan tingkat yang praktis bersambung ini disebut{" "}
          <Term>pita energi</Term>.
        </p>
        <Callout kind="analogi">
          <p>
            Satu orang yang bernyanyi menghasilkan satu nada yang jelas. Seribu
            orang yang menyanyikan nada yang hampir sama, masing-masing sedikit
            berbeda, terdengar sebagai satu rentang nada yang bersambung.
          </p>
        </Callout>
        <p>
          Di antara dua pita bisa tersisa rentang energi yang tidak punya
          keadaan sama sekali. Rentang ini disebut <Term>celah pita</Term> atau{" "}
          <em>band gap</em>, dilambangkan <Formula tex="E_g" />. Elektron tidak
          bisa memiliki energi di dalam celah itu.
        </p>
        <Callout kind="catatan">
          <p>
            Model di atas memakai rantai atom sederhana agar polanya terlihat
            jelas. Pada silikon yang sebenarnya, kedua pita berasal dari orbital
            hibrida sp³: gabungan yang saling menguatkan menjadi pita bawah, dan
            gabungan yang saling melemahkan menjadi pita atas. Kesimpulannya
            sama: dua pita yang dipisahkan sebuah celah.
          </p>
        </Callout>
      </Section>

      <Section id="valensi-konduksi" title="Pita valensi dan pita konduksi">
        <p>Dari semua pita, hanya dua yang menentukan sifat listrik bahan:</p>
        <ul>
          <li>
            <Term>Pita valensi</Term>, pita tertinggi yang terisi elektron. Pita
            ini berasal dari elektron valensi yang membentuk ikatan antaratom.
          </li>
          <li>
            <Term>Pita konduksi</Term>, pita kosong tepat di atasnya. Elektron
            di pita ini sudah lepas dari ikatan dan bebas bergerak di seluruh
            kristal.
          </li>
        </ul>
        <p>
          Pada silikon murni di suhu sangat rendah, pita valensi terisi penuh
          dan pita konduksi kosong. Kedua keadaan itu sama-sama tidak
          menghantarkan arus. Pita yang kosong tidak punya elektron untuk
          bergerak. Pita yang penuh punya banyak elektron, tetapi tidak ada
          keadaan kosong yang bisa dituju, sehingga tidak ada yang bisa
          berpindah.
        </p>
        <Callout kind="analogi">
          <p>
            Gedung parkir dua lantai. Lantai bawah penuh sesak sehingga tidak
            ada mobil yang bisa bergerak. Lantai atas kosong sehingga tidak ada
            mobil yang bergerak di sana juga. Lalu lintas baru terjadi kalau
            satu mobil naik ke lantai atas: mobil itu bebas bergerak, dan tempat
            kosong yang ditinggalkannya memberi ruang gerak di lantai bawah.
          </p>
        </Callout>
        <p>
          Jadi agar silikon menghantarkan arus, elektron harus naik dari pita
          valensi ke pita konduksi, dan untuk itu butuh energi paling sedikit
          sebesar <Formula tex="E_g" />. Tempat kosong yang ditinggalkan di
          pita valensi disebut hole dan dibahas di Bab 5.
        </p>
      </Section>

      <Section id="tiga-jenis-bahan" title="Konduktor, semikonduktor, dan isolator">
        <p>
          Beda ketiga jenis bahan ini terletak pada diagram pitanya. Pilih bahan
          di bawah dan bandingkan lebar celahnya.
        </p>
        <BandCompare />
        <ul>
          <li>
            <Term>Konduktor.</Term> Pita terluarnya hanya terisi sebagian, atau
            pita valensi dan konduksinya bertumpang-tindih. Elektron selalu
            punya keadaan kosong di dekatnya.
          </li>
          <li>
            <Term>Isolator.</Term> Celah pitanya lebar, beberapa eV atau lebih.
            Praktis tidak ada elektron yang bisa menyeberang.
          </li>
          <li>
            <Term>Semikonduktor.</Term> Celah pitanya sedang, sekitar 0,5 sampai
            3,5 eV. Jumlah elektron di pita konduksi kecil, tetapi bisa diatur
            dengan suhu, cahaya, doping, dan tegangan.
          </li>
        </ul>
        <p>
          Ukuran pembandingnya adalah energi termal. Pada suhu ruang, getaran
          atom memberi elektron energi sekitar
        </p>
        <Formula block tex="kT \approx 0{,}026\ \text{eV} \quad (T = 300\ \text{K})" />
        <p>
          Celah pita silikon 1,12 eV, kira-kira 43 kali lebih besar. Karena itu
          hanya sebagian sangat kecil elektron silikon yang berhasil naik pada
          suhu ruang. Batas antara semikonduktor dan isolator sendiri tidak
          tajam; yang membedakan adalah apakah jumlah elektronnya masih bisa
          dikendalikan secara praktis.
        </p>
        <Callout kind="penting">
          <p>
            Kemampuan untuk diatur inilah yang membuat semikonduktor berguna.
            Konduktor selalu menghantar dan isolator tidak pernah menghantar.
            Semikonduktor bisa dibuat menghantar atau tidak sesuai kebutuhan,
            dan itulah cara kerja sebuah sakelar.
          </p>
        </Callout>
      </Section>

      <Section id="cahaya" title="Celah pita dan cahaya">
        <p>
          Cahaya datang dalam paket energi yang disebut foton. Energi satu foton
          bergantung pada panjang gelombangnya:
        </p>
        <Formula
          block
          tex="E = \frac{hc}{\lambda} \quad\Rightarrow\quad E\ (\text{eV}) \approx \frac{1240}{\lambda\ (\text{nm})}"
        />
        <p>
          Foton hanya bisa diserap kalau energinya cukup untuk mengangkat
          elektron menyeberangi celah, yaitu <Formula tex="E \ge E_g" />. Foton
          yang energinya kurang akan lewat begitu saja. Dari sini beberapa hal
          sehari-hari bisa dijelaskan:
        </p>
        <ul>
          <li>
            Silikon menyerap cahaya dengan panjang gelombang di bawah sekitar
            1.100 nm, termasuk seluruh cahaya tampak. Karena itu silikon tampak
            gelap dan cocok untuk sel surya.
          </li>
          <li>
            Kaca (SiO₂) punya celah sekitar 9 eV. Foton cahaya tampak hanya
            berenergi 1,7 sampai 3,3 eV, jadi tidak diserap. Karena itu kaca
            bening.
          </li>
          <li>
            Proses sebaliknya juga terjadi: elektron yang turun dari pita
            konduksi ke pita valensi melepaskan energi sebesar{" "}
            <Formula tex="E_g" />. Pada bahan yang tepat, energi itu keluar
            sebagai cahaya, dan warnanya ditentukan oleh celah pitanya. Ini
            prinsip kerja LED.
          </li>
        </ul>
      </Section>

      <Section id="langsung-tak-langsung" title="Celah langsung dan tak langsung">
        <p>
          Tidak semua semikonduktor bisa memancarkan cahaya dengan baik.
          Penyebabnya ada pada besaran kedua yang dimiliki elektron dalam
          kristal selain energi, yaitu momentum kristal, dilambangkan{" "}
          <Formula tex="k" />. Saat elektron berpindah pita, energi dan momentum
          sama-sama harus kekal.
        </p>
        <DirectIndirect />
        <p>
          Foton membawa energi yang besar tetapi momentum yang sangat kecil.
          Pada <Term>celah langsung</Term>, elektron bisa turun tanpa mengubah
          momentumnya, jadi cukup dengan memancarkan satu foton. Pada{" "}
          <Term>celah tak langsung</Term>, elektron juga harus mengubah
          momentumnya, dan itu hanya bisa terjadi dengan bantuan getaran kisi
          kristal. Proses yang butuh dua hal sekaligus jauh lebih jarang
          terjadi, sehingga energinya lebih sering terbuang sebagai panas.
        </p>
        <p>
          Silikon bercelah tak langsung. Itu sebabnya silikon menguasai dunia
          chip dan sel surya, sedangkan LED dan laser dibuat dari bahan
          bercelah langsung seperti GaAs dan GaN.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Saat N atom membentuk kristal, tiap tingkat energi atom memecah menjadi N tingkat yang sangat rapat, yaitu pita energi.",
            "Pita valensi adalah pita tertinggi yang terisi. Pita konduksi adalah pita kosong di atasnya. Di antaranya ada celah pita Eg.",
            "Pita yang penuh dan pita yang kosong sama-sama tidak menghantarkan arus.",
            "Konduktor tidak punya celah, isolator punya celah lebar, semikonduktor punya celah sedang. Celah pita silikon 1,12 eV, sekitar 43 kali energi termal suhu ruang.",
            "Foton diserap kalau energinya minimal Eg, dengan E (eV) ≈ 1240 / λ (nm).",
            "Bahan bercelah langsung seperti GaAs efisien memancarkan cahaya. Silikon bercelah tak langsung.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="pita-energi" questions={questions} />
      </Section>
    </>
  );
}
