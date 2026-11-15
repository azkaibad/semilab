import { CrystalExplorer } from "@/components/three/lazy";
import { OrderIllustration } from "@/components/ui/OrderIllustration";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";

export const objectives = [
  "Menjelaskan kenapa setiap atom silikon berikatan dengan tepat empat tetangga",
  "Menghitung jumlah atom dalam satu sel satuan",
  "Mengenali struktur kubik sederhana, BCC, FCC, dan intan",
  "Membaca indeks Miller (100), (110), dan (111)",
  "Membedakan kristal tunggal, polikristal, dan amorf",
];

const questions: QuizQuestion[] = [
  {
    question: "Di dalam kristal silikon, setiap atom berikatan dengan berapa atom tetangga?",
    options: ["2", "4", "6", "8"],
    answer: 1,
    explanation:
      "Empat elektron valensi membentuk empat ikatan kovalen yang mengarah ke sudut-sudut tetrahedron.",
  },
  {
    question: "Kenapa atom di sudut kubus hanya dihitung 1/8 untuk satu sel satuan?",
    options: [
      "Karena ukurannya lebih kecil",
      "Karena hanya punya satu ikatan",
      "Karena atom itu dipakai bersama oleh delapan sel yang bertemu di sudut tersebut",
      "Karena energinya lebih rendah",
    ],
    answer: 2,
    explanation:
      "Delapan kubus bertemu di setiap sudut, jadi tiap kubus hanya mendapat seperdelapan bagian atom itu.",
  },
  {
    question: "Berapa jumlah atom dalam satu sel satuan silikon?",
    options: ["1", "2", "4", "8"],
    answer: 3,
    explanation: "8 × 1/8 dari sudut, 6 × 1/2 dari sisi, dan 4 atom utuh di dalam: total 8.",
  },
  {
    question:
      "Sebuah bidang memotong sumbu x di 1 serta sejajar dengan sumbu y dan z. Apa indeks Millernya?",
    options: ["(100)", "(110)", "(111)", "(011)"],
    answer: 0,
    explanation:
      "Titik potongnya 1, ∞, ∞. Kebalikannya 1, 0, 0, sehingga ditulis (100).",
  },
  {
    question:
      "Bahan yang tersusun dari banyak butir kristal kecil dengan arah berbeda-beda disebut…",
    options: ["Kristal tunggal", "Polikristal", "Amorf", "Epitaksi"],
    answer: 1,
    explanation:
      "Setiap butir teratur di dalamnya, tetapi arah antarbutir berbeda dan dipisahkan batas butir.",
  },
];

export function Body() {
  return (
    <>
      <Section id="ikatan-kovalen" title="Ikatan kovalen">
        <p>
          Di Bab 1 kita melihat bahwa silikon punya empat elektron valensi,
          sedangkan kulit terluarnya stabil kalau berisi delapan. Sebuah atom
          silikon tidak bisa mengambil empat elektron begitu saja dari
          tetangganya, karena tetangganya juga silikon dan sama-sama
          membutuhkannya. Jalan keluarnya adalah berbagi.
        </p>
        <p>
          Setiap atom silikon memakai satu elektron valensinya bersama satu atom
          tetangga, dan tetangga itu melakukan hal yang sama. Sepasang elektron
          yang dipakai bersama ini disebut <Term>ikatan kovalen</Term>. Dengan
          empat elektron valensi, satu atom membentuk empat ikatan ke empat
          tetangga, dan kini dikelilingi delapan elektron.
        </p>
        <Callout kind="analogi">
          <p>
            Bayangkan empat orang yang masing-masing mengulurkan satu tangan ke
            kamu, dan kamu mengulurkan empat tangan ke mereka. Setiap jabat
            tangan adalah satu ikatan: dua tangan, satu dari tiap pihak.
          </p>
        </Callout>
        <p>
          Keempat ikatan saling tolak karena sama-sama bermuatan negatif,
          sehingga mengambil posisi sejauh mungkin satu sama lain. Hasilnya
          adalah bentuk <Term>tetrahedron</Term> dengan sudut antar-ikatan
          109,5°. Bentuk inilah yang menentukan susunan kristal silikon.
        </p>
      </Section>

      <Section id="kristal" title="Kristal dan sel satuan">
        <p>
          <Term>Kristal</Term> adalah padatan yang atom-atomnya tersusun dalam
          pola yang berulang ke segala arah. Karena polanya berulang, kita tidak
          perlu menggambar seluruh kristal. Cukup gambar satu kotak kecil yang,
          kalau disalin dan ditumpuk berkali-kali, menghasilkan seluruh kristal.
          Kotak ini disebut <Term>sel satuan</Term>.
        </p>
        <Callout kind="analogi">
          <p>
            Sel satuan seperti satu ubin pada lantai bermotif. Satu ubin saja
            sudah cukup untuk mengetahui pola seluruh lantai.
          </p>
        </Callout>
        <p>
          Untuk kristal kubik, sel satuannya berbentuk kubus dan panjang sisinya
          disebut <Term>konstanta kisi</Term>, dilambangkan{" "}
          <Formula tex="a" />. Untuk silikon,
        </p>
        <Formula block tex="a = 0{,}5431\ \text{nm}" />
        <p>
          Atom di batas kubus dipakai bersama oleh sel-sel di sebelahnya, jadi
          cara menghitungnya begini:
        </p>
        <ul>
          <li>Atom di sudut dipakai delapan sel, dihitung 1/8.</li>
          <li>Atom di tengah sisi dipakai dua sel, dihitung 1/2.</li>
          <li>Atom di dalam kubus dihitung penuh.</li>
        </ul>
      </Section>

      <Section id="struktur" title="Empat struktur yang perlu dikenal">
        <p>
          Model di bawah menampilkan empat struktur kubik. Mulailah dari kubik
          sederhana, lalu BCC dan FCC, dan terakhir intan. Perbesar ukurannya
          menjadi 2 × 2 × 2 atau 3 × 3 × 3 untuk melihat pola yang berulang.
        </p>
        <CrystalExplorer mode="structures" />
        <p>
          Silikon memakai <Term>struktur intan</Term>. Struktur ini adalah FCC
          yang ditambah empat atom di dalam kubus, masing-masing berada di pusat
          sebuah tetrahedron. Jumlah atom per sel satuannya:
        </p>
        <Formula
          block
          tex="8 \times \tfrac{1}{8} + 6 \times \tfrac{1}{2} + 4 = 8\ \text{atom}"
        />
        <p>
          Dari sini kerapatan atom silikon bisa dihitung, yaitu jumlah atom
          dibagi volume sel satuan:
        </p>
        <Formula
          block
          tex="\frac{8}{a^3} = \frac{8}{(5{,}431 \times 10^{-8}\ \text{cm})^3} \approx 5 \times 10^{22}\ \text{atom/cm}^3"
        />
        <p>
          Angka ini akan sering muncul lagi, terutama saat membahas doping.
          Jarak antara dua atom yang berikatan adalah{" "}
          <Formula tex="\tfrac{\sqrt{3}}{4}a \approx 0{,}235\ \text{nm}" />.
        </p>
        <Callout kind="catatan">
          <p>
            Struktur intan hanya mengisi 34% ruang, jauh lebih renggang daripada
            FCC yang mengisi 74%. Silikon tidak tersusun serapat mungkin karena
            ikatan kovalennya punya arah yang tetap: empat tetangga, tidak
            lebih.
          </p>
        </Callout>
      </Section>

      <Section id="indeks-miller" title="Bidang kristal dan indeks Miller">
        <p>
          Kristal tidak sama ke segala arah. Kalau dipotong pada arah yang
          berbeda, susunan atom di permukaannya berbeda, dan itu memengaruhi
          laju oksidasi, laju etching, dan sifat listrik permukaan. Karena itu
          kita butuh cara menamai arah potongan. Cara yang dipakai adalah{" "}
          <Term>indeks Miller</Term>.
        </p>
        <p>Langkah menentukan indeks Miller sebuah bidang:</p>
        <ol>
          <li>
            Cari titik potong bidang dengan sumbu x, y, dan z, dalam satuan{" "}
            <Formula tex="a" />. Kalau bidang sejajar suatu sumbu, titik
            potongnya tak hingga.
          </li>
          <li>Ambil kebalikan ketiga angka itu. Kebalikan tak hingga adalah 0.</li>
          <li>Kalikan dengan bilangan yang sama sampai semuanya bulat.</li>
          <li>Tulis hasilnya dalam kurung tanpa koma: (hkl).</li>
        </ol>
        <p>
          Contoh: bidang yang memotong sumbu x di 1 dan sejajar sumbu y dan z
          punya titik potong 1, ∞, ∞. Kebalikannya 1, 0, 0, sehingga bidang itu
          disebut (100).
        </p>
        <CrystalExplorer mode="planes" />
        <Callout kind="penting">
          <p>
            Wafer silikon untuk rangkaian terpadu umumnya dipotong pada bidang
            (100), karena permukaan ini menghasilkan antarmuka silikon dengan
            oksidanya yang paling sedikit cacat. Orientasi wafer selalu tertulis
            di spesifikasinya.
          </p>
        </Callout>
      </Section>

      <Section id="keteraturan" title="Kristal tunggal, polikristal, dan amorf">
        <p>
          Tidak semua padatan teratur sempurna. Berdasarkan seberapa jauh
          keteraturannya bertahan, bahan dibagi menjadi tiga:
        </p>
        <OrderIllustration />
        <ul>
          <li>
            <Term>Kristal tunggal.</Term> Seluruh bahan adalah satu kristal.
            Wafer silikon termasuk jenis ini.
          </li>
          <li>
            <Term>Polikristal.</Term> Terdiri dari banyak butir kristal kecil.
            Di dalam tiap butir atomnya teratur, tetapi arah antarbutir berbeda.
            Perbatasan antarbutir disebut batas butir dan menghambat gerak
            elektron.
          </li>
          <li>
            <Term>Amorf.</Term> Atom masih berikatan dengan tetangganya, tetapi
            tidak ada pola yang berulang dalam jarak jauh. Kaca adalah contoh
            yang paling dikenal.
          </li>
        </ul>
        <p>
          Pembagian ini penting untuk bagian thin film nanti. Lapisan tipis yang
          dideposisi di atas substrat hampir selalu berupa polikristal atau
          amorf, dan ukuran butirnya sangat bergantung pada suhu dan cara
          deposisi. Silikon yang sama bisa menjadi wafer kristal tunggal,
          polisilikon untuk gate transistor, atau silikon amorf untuk layar dan
          sel surya lapisan tipis.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Atom silikon membentuk empat ikatan kovalen ke empat tetangga dengan susunan tetrahedron bersudut 109,5°.",
            "Kristal adalah susunan atom yang berulang. Sel satuan adalah kotak terkecil yang mewakili seluruh pola.",
            "Silikon berstruktur intan dengan 8 atom per sel satuan, konstanta kisi 0,5431 nm, dan kerapatan sekitar 5 × 10²² atom/cm³.",
            "Indeks Miller (hkl) menamai bidang kristal. Wafer silikon umumnya berorientasi (100).",
            "Bahan bisa berupa kristal tunggal, polikristal, atau amorf. Lapisan tipis biasanya polikristal atau amorf.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="ikatan-dan-kristal" questions={questions} />
      </Section>
    </>
  );
}
