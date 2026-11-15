import { GrowthExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { StressBend } from "@/components/widgets/StressBend";

export const objectives = [
  "Menjelaskan tahap-tahap dari atom mendarat sampai film menutup substrat",
  "Menjelaskan pengaruh suhu substrat terhadap difusi permukaan dan mutu film",
  "Membedakan tiga mode pertumbuhan film",
  "Menjelaskan asal stress pada film dan cara menjaga adhesi",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa yang dimaksud adatom?",
    options: [
      "Atom substrat yang terlepas",
      "Atom yang sudah menempel di permukaan tetapi masih bisa berpindah",
      "Atom gas sisa di ruang vakum",
      "Atom di tengah film yang sudah jadi",
    ],
    answer: 1,
    explanation:
      "Adatom terikat ke permukaan, tetapi belum menetap. Energi termal masih bisa membuatnya melompat ke tempat di sebelahnya.",
  },
  {
    question: "Apa akibat menaikkan suhu substrat selama deposisi?",
    options: [
      "Adatom berpindah lebih jauh, sehingga film lebih rapat dan butirnya lebih besar",
      "Adatom langsung diam di tempat mendarat",
      "Film selalu menjadi amorf",
      "Tidak ada pengaruhnya",
    ],
    answer: 0,
    explanation:
      "Difusi permukaan naik tajam terhadap suhu. Adatom sempat menemukan tempat yang ikatannya paling kuat sebelum tertimbun atom berikutnya.",
  },
  {
    question: "Kapan film tumbuh dalam mode pulau (Volmer–Weber)?",
    options: [
      "Saat atom film terikat lebih kuat ke substrat daripada ke sesamanya",
      "Saat suhu substrat sangat tinggi",
      "Saat atom film terikat lebih kuat ke sesamanya daripada ke substrat",
      "Saat tekanan ruang terlalu tinggi",
    ],
    answer: 2,
    explanation:
      "Atom yang lebih suka sesamanya akan berkumpul menjadi gundukan dan membiarkan substrat terbuka. Contohnya logam di atas kaca atau oksida.",
  },
  {
    question: "Apa ciri mode Stranski–Krastanov?",
    options: [
      "Pulau sejak awal",
      "Lapis demi lapis sampai selesai",
      "Film tidak menempel sama sekali",
      "Beberapa lapisan rata lebih dulu, lalu dilanjutkan pulau",
    ],
    answer: 3,
    explanation:
      "Lapisan awal menutupi substrat, tetapi regangan akibat jarak atom yang tidak cocok menumpuk sampai pertumbuhan pulau menjadi lebih hemat energi.",
  },
  {
    question: "Untuk apa lapisan tipis titanium atau kromium dipasang di bawah lapisan emas?",
    options: [
      "Agar emas lebih mengilap",
      "Sebagai lapisan perekat, karena emas sulit menempel langsung pada kaca atau oksida",
      "Agar emas lebih menghantar",
      "Agar lapisannya lebih tebal",
    ],
    answer: 1,
    explanation:
      "Titanium dan kromium berikatan kuat dengan oksigen di permukaan oksida, dan sekaligus berikatan baik dengan emas di atasnya.",
  },
];

export function Body() {
  return (
    <>
      <Section id="mendarat" title="Atom mendarat">
        <p>
          Bab 11 mengantar atom dari sumber sampai ke substrat. Bab ini
          membahas apa yang terjadi sesudahnya. Urutan kejadiannya sama untuk
          hampir semua metode deposisi, jadi memahaminya sekali berguna untuk
          semua bab berikutnya.
        </p>
        <p>
          Atom yang tiba di permukaan bisa langsung memantul, atau kehilangan
          cukup energi sehingga tertahan. Menempelnya atom ke permukaan disebut{" "}
          <Term>adsorpsi</Term>, dan ada dua tingkat kekuatannya:
        </p>
        <ul>
          <li>
            <Term>Fisisorpsi</Term>: atom hanya tertahan oleh gaya tarik lemah
            antaratom, tanpa membentuk ikatan kimia. Atom mudah lepas lagi.
          </li>
          <li>
            <Term>Kemisorpsi</Term>: atom membentuk ikatan kimia dengan atom
            permukaan. Ikatannya kuat.
          </li>
        </ul>
        <p>
          Atom yang sudah menempel tetapi belum menetap disebut{" "}
          <Term>adatom</Term>. Adatom punya tiga kemungkinan nasib: lepas
          kembali ke ruang vakum (<Term>desorpsi</Term>), berpindah di
          permukaan, atau bergabung dengan atom lain dan menetap. Perbandingan
          antara atom yang akhirnya menetap dan atom yang datang disebut{" "}
          <Term>koefisien lekat</Term>.
        </p>
      </Section>

      <Section id="difusi-permukaan" title="Difusi permukaan">
        <p>
          Permukaan substrat, dilihat oleh sebuah adatom, tidak rata. Ada
          cekungan di antara atom-atom permukaan tempat adatom duduk, dan ada
          punggungan yang harus dilewati untuk pindah ke cekungan sebelah.
          Energi termal sesekali cukup untuk melompati punggungan itu. Gerak
          melompat acak ini disebut <Term>difusi permukaan</Term>.
        </p>
        <p>Laju lompatannya naik sangat tajam terhadap suhu:</p>
        <Formula block tex="D_s = D_0 \exp\!\left(-\frac{E_d}{kT}\right)" />
        <p>
          dengan <Formula tex="E_d" /> tinggi penghalang antarcekungan. Bentuk
          eksponensial yang sama sudah muncul di Bab 5 untuk jumlah pembawa
          muatan.
        </p>
        <p>
          Seberapa jauh adatom sempat berjalan menentukan mutu film. Adatom
          yang sempat berkeliling akan menemukan tempat dengan ikatan terkuat,
          misalnya di tepi sebuah teras atom, dan film tumbuh rapat serta
          teratur. Adatom yang langsung tertimbun atom berikutnya akan terkunci
          di tempat ia mendarat, dan film menjadi berongga serta tidak teratur.
        </p>
        <Callout kind="penting">
          <p>
            Dua tombol pengatur terpenting dalam deposisi adalah{" "}
            <Term>suhu substrat</Term> dan <Term>laju deposisi</Term>. Suhu
            lebih tinggi memberi adatom lebih banyak lompatan. Laju lebih
            rendah memberi adatom lebih banyak waktu sebelum tertimbun.
          </p>
        </Callout>
      </Section>

      <Section id="nukleasi" title="Nukleasi: dari atom menjadi film">
        <p>
          Satu adatom sendirian mudah lepas lagi. Dua atau tiga adatom yang
          bertemu membentuk gugus kecil yang lebih stabil, karena mereka saling
          mengikat. Tetapi gugus yang terlalu kecil masih bisa bubar. Baru di
          atas ukuran tertentu, yang disebut <Term>inti kritis</Term>, sebuah
          gugus lebih mungkin tumbuh daripada bubar. Terbentuknya inti yang
          stabil disebut <Term>nukleasi</Term>.
        </p>
        <p>Dari sana film terbentuk melalui empat tahap:</p>
        <ol>
          <li>
            <Term>Nukleasi.</Term> Inti-inti stabil muncul di banyak tempat,
            terutama di cacat permukaan dan tepi teras.
          </li>
          <li>
            <Term>Pertumbuhan pulau.</Term> Tiap inti menangkap adatom di
            sekitarnya dan membesar.
          </li>
          <li>
            <Term>Koalesensi.</Term> Pulau-pulau yang bersentuhan menyatu.
          </li>
          <li>
            <Term>Film kontinu.</Term> Celah yang tersisa terisi, dan film
            menutupi seluruh substrat.
          </li>
        </ol>
        <p>
          Akibat praktisnya: film yang sangat tipis sering belum menyambung.
          Lapisan logam setebal beberapa nanometer di atas kaca bisa masih
          berupa pulau-pulau terpisah, sehingga tidak menghantarkan listrik
          walaupun bahannya logam. Tempat pulau-pulau bertemu menjadi{" "}
          <Term>batas butir</Term>, yang sudah dikenalkan di Bab 2.
        </p>
      </Section>

      <Section id="mode" title="Tiga mode pertumbuhan">
        <p>
          Apakah film tumbuh rata atau berpulau ditentukan oleh satu
          pertanyaan: adatom lebih suka menempel ke substrat, atau ke
          sesamanya? Ada tiga jawaban, dan masing-masing dinamai menurut
          penelitinya. Coba ketiganya pada model di bawah, lalu turunkan suhu
          substrat dan tumbuhkan ulang.
        </p>
        <GrowthExplorer />
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Syarat</th>
                <th>Contoh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lapis demi lapis (Frank–van der Merwe)</td>
                <td>Ikatan film ke substrat lebih kuat, dan jarak atomnya cocok</td>
                <td>Silikon di atas silikon</td>
              </tr>
              <tr>
                <td>Pulau (Volmer–Weber)</td>
                <td>Ikatan antaratom film lebih kuat daripada ke substrat</td>
                <td>Emas atau perak di atas kaca</td>
              </tr>
              <tr>
                <td>Lapisan lalu pulau (Stranski–Krastanov)</td>
                <td>Ikatan ke substrat kuat, tetapi jarak atomnya tidak cocok</td>
                <td>Germanium di atas silikon</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Syarat itu biasa ditulis dengan <Term>energi permukaan</Term>, yaitu
          energi yang dibutuhkan untuk membuat satu satuan luas permukaan.
          Film membasahi substrat dan tumbuh rata kalau
        </p>
        <Formula block tex="\gamma_{\text{substrat}} \;\ge\; \gamma_{\text{film}} + \gamma_{\text{antarmuka}}" />
        <p>
          Artinya menutupi substrat dengan film menurunkan energi total. Kalau
          tidak terpenuhi, film lebih hemat energi dengan menggumpal.
        </p>
        <Callout kind="analogi">
          <p>
            Air di atas kaca bersih menyebar menjadi lapisan rata. Air di atas
            daun talas atau permukaan berlilin menggumpal menjadi butiran.
            Airnya sama. Yang berbeda adalah seberapa kuat air tertarik ke
            permukaan di bawahnya dibanding ke air itu sendiri.
          </p>
        </Callout>
        <p>
          Pada model, perhatikan juga pengaruh suhu. Dengan suhu substrat
          rendah, ketiga mode menghasilkan permukaan kasar yang mirip, karena
          atom menetap di tempat ia jatuh dan tidak sempat memilih. Aturan
          energi baru terlihat hasilnya kalau adatom punya cukup gerak.
        </p>
      </Section>

      <Section id="mikrostruktur" title="Mikrostruktur film">
        <p>
          Film hasil deposisi umumnya polikristal: tersusun dari butir-butir
          kecil yang masing-masing berasal dari satu inti. Bentuk dan ukuran
          butir terutama ditentukan oleh perbandingan suhu substrat terhadap
          titik leleh bahan film, keduanya dalam kelvin.
        </p>
        <ul>
          <li>
            <Term>Suhu rendah</Term>, di bawah kira-kira 0,3 kali titik leleh.
            Adatom hampir tidak bergerak. Film tumbuh sebagai kolom-kolom
            ramping dengan rongga di antaranya. Film seperti ini kurang rapat
            dan mudah menyerap uap air.
          </li>
          <li>
            <Term>Suhu menengah</Term>, antara 0,3 dan 0,5 kali titik leleh.
            Difusi permukaan cukup untuk mengisi rongga. Butirnya masih
            berbentuk kolom, tetapi rapat.
          </li>
          <li>
            <Term>Suhu tinggi</Term>, di atas 0,5 kali titik leleh. Atom di
            dalam film pun ikut bergerak. Butir membesar dan bentuknya lebih
            membulat.
          </li>
        </ul>
        <p>
          Pembagian ini dikenal sebagai <Term>model zona struktur</Term>.
          Pembagian ini juga menjelaskan kenapa logam bertitik leleh tinggi
          seperti tungsten sulit dibuat rapat pada suhu ruang, sedangkan
          aluminium mudah.
        </p>
      </Section>

      <Section id="stress" title="Stress pada film">
        <p>
          Hampir semua film berada dalam keadaan tertarik atau terhimpit,
          karena film terikat ke substrat dan tidak bebas mengubah ukurannya.
          Keadaan ini disebut <Term>stress</Term>, dan asalnya ada dua:
        </p>
        <ul>
          <li>
            <Term>Stress termal.</Term> Film ditumbuhkan pada suhu tinggi lalu
            didinginkan. Film dan substrat menyusut dengan laju berbeda, tetapi
            keduanya terikat, sehingga salah satunya tertarik.
          </li>
          <li>
            <Term>Stress intrinsik.</Term> Muncul selama pertumbuhan itu
            sendiri, misalnya saat pulau-pulau menyatu dan saling menarik,
            atau saat atom berenergi tinggi tertanam paksa ke dalam film.
          </li>
        </ul>
        <StressBend />
        <p>
          Film yang stress membengkokkan substratnya. Lengkungan itu sangat
          kecil, tetapi bisa diukur dengan pantulan laser, dan dari sana stress
          film dihitung dengan <Term>persamaan Stoney</Term>:
        </p>
        <Formula block tex="\sigma_f = \frac{E_s\, t_s^{2}}{6\,(1-\nu_s)\, t_f\, R}" />
        <p>
          dengan <Formula tex="t_s" /> dan <Formula tex="t_f" /> tebal substrat
          dan film, <Formula tex="R" /> jari-jari lengkungan,{" "}
          <Formula tex="E_s" /> modulus elastisitas substrat, dan{" "}
          <Formula tex="\nu_s" /> nisbah Poisson-nya. Yang menarik, sifat
          mekanik film sendiri tidak perlu diketahui.
        </p>
        <p>
          Stress pada film bisa mencapai ratusan megapascal sampai beberapa
          gigapascal, setara kekuatan baja. Makin tebal film, makin besar gaya
          totalnya. Itu sebabnya film yang baik-baik saja pada tebal 100 nm
          bisa retak atau terkelupas saat dibuat setebal 1 µm.
        </p>
      </Section>

      <Section id="adhesi" title="Adhesi">
        <p>
          <Term>Adhesi</Term> adalah kekuatan film menempel pada substrat.
          Film dengan sifat terbaik pun tidak berguna kalau terkelupas. Tiga
          hal yang paling berpengaruh:
        </p>
        <ul>
          <li>
            <Term>Kebersihan permukaan.</Term> Selapis tipis minyak atau air
            sudah cukup untuk memisahkan film dari substrat. Pembersihan
            sebelum deposisi adalah langkah yang paling menentukan.
          </li>
          <li>
            <Term>Jenis ikatan di antarmuka.</Term> Logam yang mudah bereaksi
            dengan oksigen, seperti titanium, kromium, dan aluminium, menempel
            kuat pada kaca dan oksida. Logam mulia seperti emas dan perak
            tidak.
          </li>
          <li>
            <Term>Stress.</Term> Stress yang besar terus-menerus mencoba
            melepaskan film dari substrat.
          </li>
        </ul>
        <p>
          Cara yang paling umum untuk menempelkan emas pada kaca atau silikon
          beroksida adalah memasang <Term>lapisan perekat</Term> lebih dulu:
          titanium atau kromium setebal 5 sampai 10 nm, langsung disusul emas
          tanpa membuka ruang vakum.
        </p>
        <Callout kind="catatan">
          <p>
            Uji adhesi yang paling sederhana adalah uji selotip. Selotip
            ditempelkan kuat-kuat pada film lalu ditarik. Kalau film ikut
            terangkat, adhesinya tidak cukup. Uji ini kasar, tetapi cepat dan
            dipakai di mana-mana.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Atom yang mendarat menjadi adatom: ia bisa lepas lagi, berpindah di permukaan, atau bergabung dengan atom lain dan menetap.",
            "Difusi permukaan naik eksponensial terhadap suhu. Suhu substrat dan laju deposisi adalah dua pengatur utama mutu film.",
            "Film terbentuk lewat nukleasi, pertumbuhan pulau, koalesensi, lalu film kontinu. Film yang sangat tipis bisa belum menyambung.",
            "Tiga mode pertumbuhan: lapis demi lapis (Frank–van der Merwe), pulau (Volmer–Weber), dan lapisan lalu pulau (Stranski–Krastanov).",
            "Mikrostruktur film bergantung pada perbandingan suhu substrat terhadap titik leleh bahan film.",
            "Film hampir selalu mengalami stress tarik atau tekan, yang bisa diukur dari lengkungan wafer. Adhesi dijaga dengan permukaan bersih dan lapisan perekat.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="pertumbuhan-film" questions={questions} />
      </Section>
    </>
  );
}
