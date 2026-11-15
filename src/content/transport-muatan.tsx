import { CarrierExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { DiffusionSim } from "@/components/widgets/DiffusionSim";
import { TransportCalculator } from "@/components/widgets/TransportCalculator";

export const objectives = [
  "Membedakan arus drift dan arus difusi",
  "Menjelaskan arti mobilitas dan apa saja yang menurunkannya",
  "Menghitung resistivitas silikon dari konsentrasi dopannya",
  "Menjelaskan generasi, rekombinasi, dan panjang difusi",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa penyebab arus drift?",
    options: [
      "Perbedaan konsentrasi pembawa",
      "Medan listrik yang mendorong pembawa muatan",
      "Kenaikan suhu",
      "Rekombinasi",
    ],
    answer: 1,
    explanation:
      "Drift adalah gerak rata-rata pembawa akibat medan listrik. Yang disebabkan perbedaan konsentrasi adalah difusi.",
  },
  {
    question: "Di silikon, mana yang lebih besar mobilitasnya?",
    options: ["Hole", "Elektron", "Sama besar", "Bergantung pada tegangan"],
    answer: 1,
    explanation:
      "Mobilitas elektron sekitar 1.400 cm²/V·s, kira-kira tiga kali mobilitas hole yang sekitar 470 cm²/V·s.",
  },
  {
    question: "Ke arah mana pembawa muatan berdifusi?",
    options: [
      "Dari daerah berkonsentrasi rendah ke tinggi",
      "Selalu searah medan listrik",
      "Dari daerah berkonsentrasi tinggi ke rendah",
      "Tidak punya arah tertentu",
    ],
    answer: 2,
    explanation:
      "Gerak tiap partikel acak, tetapi lebih banyak partikel yang meninggalkan daerah padat daripada yang memasukinya.",
  },
  {
    question: "Apa yang terjadi pada resistivitas silikon kalau dopingnya ditambah?",
    options: [
      "Naik",
      "Turun",
      "Tetap",
      "Naik lalu turun",
    ],
    answer: 1,
    explanation:
      "Pembawa muatan bertambah jauh lebih cepat daripada penurunan mobilitasnya, sehingga resistivitas turun.",
  },
  {
    question: "Apa arti panjang difusi?",
    options: [
      "Jarak antaratom di kristal",
      "Tebal wafer",
      "Lebar daerah deplesi",
      "Jarak rata-rata yang ditempuh pembawa minoritas sebelum berekombinasi",
    ],
    answer: 3,
    explanation:
      "Panjang difusi L = √(Dτ) menentukan seberapa jauh pembawa minoritas bisa berjalan, dan ini penting untuk sel surya serta transistor.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gerak-acak" title="Pembawa muatan tidak pernah diam">
        <p>
          Bab 5 dan 6 menjawab pertanyaan berapa banyak pembawa muatan yang
          ada. Bab ini menjawab pertanyaan berikutnya: bagaimana pembawa itu
          bergerak. Arus listrik adalah muatan yang berpindah, jadi inilah yang
          menghubungkan fisika di dalam kristal dengan ampere dan ohm yang
          terukur di luar.
        </p>
        <p>
          Bahkan tanpa tegangan apa pun, elektron bebas dan hole terus bergerak
          karena energi termal. Kecepatannya pada suhu ruang sekitar{" "}
          <Formula tex="10^7" /> cm/s, kira-kira 100 km per detik. Tetapi
          geraknya acak. Pembawa menabrak atom yang bergetar atau ion dopan
          setiap sepersekian pikodetik lalu berbelok ke arah lain. Karena
          arahnya acak, perpindahan rata-ratanya nol dan tidak ada arus.
        </p>
        <p>Ada dua hal yang bisa membuat gerak acak itu punya arah:</p>
        <ul>
          <li>
            <Term>Drift</Term>: ada medan listrik yang mendorong.
          </li>
          <li>
            <Term>Difusi</Term>: ada perbedaan konsentrasi.
          </li>
        </ul>
      </Section>

      <Section id="drift" title="Drift: didorong medan listrik">
        <p>
          Beri tegangan pada sepotong silikon, maka di dalamnya muncul medan
          listrik <Formula tex="E" />. Pembawa muatan tetap bergerak acak,
          tetapi di antara dua tabrakan medan menariknya sedikit ke satu arah.
          Hasilnya adalah hanyutan pelan di atas gerak acak yang cepat. Coba
          naikkan medan pada model di bawah.
        </p>
        <CarrierExplorer mode="drift" />
        <Callout kind="analogi">
          <p>
            Kerumunan orang di pasar bergerak ke segala arah. Kalau lantainya
            sedikit miring, tiap orang tetap berjalan acak, tetapi seluruh
            kerumunan perlahan bergeser ke arah turunan.
          </p>
        </Callout>
        <p>
          Kecepatan hanyut rata-rata disebut <Term>kecepatan drift</Term>, dan
          sebanding dengan medan:
        </p>
        <Formula block tex="v_d = \mu E" />
        <p>
          Tetapan <Formula tex="\mu" /> disebut <Term>mobilitas</Term>, dengan
          satuan cm²/V·s. Mobilitas menyatakan seberapa mudah pembawa bergerak
          di dalam bahan. Untuk silikon yang didoping ringan pada suhu ruang:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Pembawa</th>
                <th>Mobilitas</th>
                <th>Arah gerak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Elektron</td>
                <td>sekitar 1.400 cm²/V·s</td>
                <td>Berlawanan arah medan</td>
              </tr>
              <tr>
                <td>Hole</td>
                <td>sekitar 470 cm²/V·s</td>
                <td>Searah medan</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Elektron sekitar tiga kali lebih lincah daripada hole. Itu sebabnya
          transistor kanal-n lebih cepat daripada kanal-p pada ukuran yang
          sama. Walaupun arah geraknya berlawanan, arus dari elektron dan hole
          searah karena muatannya juga berlawanan, sehingga keduanya saling
          menambah.
        </p>
        <p>Mobilitas turun karena dua jenis tabrakan:</p>
        <ul>
          <li>
            <Term>Getaran kisi.</Term> Makin panas, atom makin kuat bergetar
            dan makin sering menghamburkan pembawa.
          </li>
          <li>
            <Term>Ion dopan.</Term> Makin berat dopingnya, makin banyak ion
            bermuatan yang membelokkan pembawa.
          </li>
        </ul>
        <Callout kind="catatan">
          <p>
            Hubungan <Formula tex="v_d = \mu E" /> hanya berlaku untuk medan
            yang tidak terlalu kuat. Pada medan di atas kira-kira{" "}
            <Formula tex="10^4" /> V/cm, kecepatan drift di silikon berhenti
            naik dan jenuh di sekitar <Formula tex="10^7" /> cm/s. Pada
            transistor modern yang sangat pendek, keadaan jenuh ini justru yang
            biasa terjadi.
          </p>
        </Callout>
      </Section>

      <Section id="resistivitas" title="Dari mobilitas ke resistivitas">
        <p>
          Rapat arus drift adalah muatan dikali jumlah pembawa dikali
          kecepatannya. Dengan elektron dan hole sekaligus:
        </p>
        <Formula block tex="J = q\,(n\mu_n + p\mu_p)\,E = \sigma E" />
        <p>
          Besaran <Formula tex="\sigma" /> adalah <Term>konduktivitas</Term>,
          dan kebalikannya adalah <Term>resistivitas</Term>:
        </p>
        <Formula block tex="\rho = \frac{1}{\sigma} = \frac{1}{q\,(n\mu_n + p\mu_p)}" />
        <p>
          Persamaan <Formula tex="J = \sigma E" /> adalah hukum Ohm dalam
          bentuk yang berlaku di setiap titik dalam bahan. Pada bahan yang
          didoping, pembawa mayoritas jauh lebih banyak sehingga satu suku
          saja yang berarti. Contoh untuk tipe-n dengan{" "}
          <Formula tex="N_D = 10^{16}\ \text{cm}^{-3}" />:
        </p>
        <Formula
          block
          tex="\rho \approx \frac{1}{q N_D \mu_n} = \frac{1}{(1{,}6 \times 10^{-19})(10^{16})(1250)} \approx 0{,}5\ \Omega\cdot\text{cm}"
        />
        <TransportCalculator />
        <p>
          Geser konsentrasi dopan dari <Formula tex="10^{14}" /> sampai{" "}
          <Formula tex="10^{19}" />. Resistivitas berubah hampir empat orde
          besaran. Rentang selebar itu, yang diatur hanya dengan takaran
          dopan, adalah hal yang tidak dimiliki logam maupun isolator.
        </p>
        <Callout kind="penting">
          <p>
            Resistivitas adalah cara paling umum untuk menyatakan kadar doping
            sebuah wafer. Spesifikasi wafer biasanya tidak menulis konsentrasi
            dopan, melainkan misalnya “tipe-p, 1–10 Ω·cm”. Alat ukurnya, probe
            empat titik, dibahas di Bab 21.
          </p>
        </Callout>
      </Section>

      <Section id="difusi" title="Difusi: menyebar dengan sendirinya">
        <p>
          Cara kedua tidak butuh medan listrik sama sekali. Kalau pembawa
          muatan lebih padat di satu tempat daripada di tempat lain, gerak
          acaknya sendiri akan meratakan perbedaan itu.
        </p>
        <DiffusionSim />
        <p>
          Penjelasannya murni soal hitungan. Tiap partikel sama mungkinnya
          melangkah ke kiri atau ke kanan. Tetapi di perbatasan antara daerah
          padat dan daerah jarang, lebih banyak partikel yang tersedia untuk
          melangkah keluar dari daerah padat daripada yang masuk ke dalamnya.
          Aliran bersihnya selalu dari padat ke jarang.
        </p>
        <Callout kind="analogi">
          <p>
            Setetes tinta di dalam segelas air diam. Tidak ada yang mengaduk,
            tetapi lama-kelamaan warnanya merata.
          </p>
        </Callout>
        <p>
          Rapat arus difusi sebanding dengan kecuraman perubahan konsentrasi.
          Untuk elektron:
        </p>
        <Formula block tex="J_{\text{difusi}} = q\,D_n\,\frac{dn}{dx}" />
        <p>
          dengan <Formula tex="D_n" /> <Term>koefisien difusi</Term>. Drift dan
          difusi sama-sama dibatasi oleh tabrakan yang sama, jadi keduanya
          terhubung oleh <Term>hubungan Einstein</Term>:
        </p>
        <Formula block tex="\frac{D}{\mu} = \frac{kT}{q} \approx 0{,}026\ \text{V} \quad (300\ \text{K})" />
        <p>
          Untuk elektron di silikon, <Formula tex="D_n \approx 36" /> cm²/s,
          dan untuk hole <Formula tex="D_p \approx 12" /> cm²/s. Arus difusi
          hampir tidak ada di logam, tetapi sangat penting di semikonduktor
          karena konsentrasi pembawanya bisa sangat berbeda dari satu tempat ke
          tempat lain. Di Bab 8 kita akan melihat sambungan p-n bekerja dari
          tarik-menarik antara difusi dan drift.
        </p>
      </Section>

      <Section id="rekombinasi" title="Generasi dan rekombinasi">
        <p>
          Jumlah pembawa juga bisa berubah. Dua proses yang berlawanan terus
          berlangsung:
        </p>
        <ul>
          <li>
            <Term>Generasi</Term>: pasangan elektron dan hole baru terbentuk,
            karena panas atau karena cahaya yang energinya melebihi celah pita.
          </li>
          <li>
            <Term>Rekombinasi</Term>: elektron bebas jatuh mengisi hole, dan
            keduanya hilang. Energinya keluar sebagai cahaya atau panas.
          </li>
        </ul>
        <p>
          Kalau ada pembawa berlebih, misalnya setelah disinari, kelebihan itu
          tidak langsung hilang. Waktu rata-rata sebuah pembawa minoritas
          bertahan sebelum berekombinasi disebut <Term>waktu hidup</Term>,
          dilambangkan <Formula tex="\tau" />. Selama waktu itu pembawa
          berdifusi sejauh rata-rata
        </p>
        <Formula block tex="L = \sqrt{D\tau}" />
        <p>
          yang disebut <Term>panjang difusi</Term>. Contoh: elektron di silikon
          dengan waktu hidup 1 mikrodetik punya panjang difusi sekitar 60 µm.
        </p>
        <p>
          Di silikon, yang celah pitanya tak langsung, rekombinasi paling
          sering terjadi lewat cacat kristal dan atom pengotor yang menjadi
          batu loncatan di tengah celah pita. Makin bersih dan makin sempurna
          kristalnya, makin panjang waktu hidupnya.
        </p>
        <Callout kind="penting">
          <p>
            Inilah salah satu alasan fabrikasi dilakukan di cleanroom dengan
            bahan yang sangat murni. Pengotor logam dalam jumlah yang sangat
            kecil saja sudah memendekkan waktu hidup pembawa. Pada sel surya,
            pembawa yang berekombinasi sebelum sampai ke sambungan adalah
            energi yang hilang.
          </p>
        </Callout>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Pembawa muatan selalu bergerak acak karena panas. Arus baru muncul kalau gerak itu punya arah rata-rata.",
            "Drift adalah hanyutan akibat medan listrik, dengan kecepatan v = μE. Mobilitas elektron silikon sekitar 1.400 cm²/V·s dan hole sekitar 470 cm²/V·s.",
            "Resistivitas ρ = 1/(q n μ) turun tajam saat doping ditambah.",
            "Difusi adalah aliran dari daerah padat ke daerah jarang. Koefisien difusi dan mobilitas terhubung oleh D/μ = kT/q.",
            "Pembawa minoritas bertahan selama waktu hidup τ dan menempuh panjang difusi L = √(Dτ) sebelum berekombinasi.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="transport-muatan" questions={questions} />
      </Section>
    </>
  );
}
