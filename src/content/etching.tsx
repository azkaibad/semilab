import { RieExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { EtchProfile } from "@/components/widgets/EtchProfile";

export const objectives = [
  "Menjelaskan arti laju etch, selektivitas, dan anisotropi",
  "Membedakan etch isotropik dan anisotropik serta akibatnya pada bentuk pola",
  "Menjelaskan cara kerja wet etch dan dry etch",
  "Menjelaskan kenapa RIE menghasilkan dinding tegak",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa ciri etch isotropik?",
    options: [
      "Memakan bahan sama cepat ke segala arah, sehingga terjadi undercut di bawah masker",
      "Hanya memakan bahan ke arah bawah",
      "Tidak memakan bahan sama sekali",
      "Hanya bekerja pada logam",
    ],
    answer: 0,
    explanation:
      "Karena lajunya sama ke semua arah, etch merambat ke samping di bawah resist sejauh kedalamannya.",
  },
  {
    question: "Kenapa RIE menghasilkan dinding yang tegak?",
    options: [
      "Karena suhunya rendah",
      "Karena memakai cairan yang kental",
      "Karena ion jatuh tegak lurus ke wafer dan mempercepat etch hanya di dasar pola",
      "Karena resistnya lebih tebal",
    ],
    answer: 2,
    explanation:
      "Medan listrik di atas wafer mempercepat ion lurus ke bawah. Dasar pola dihantam ion, sedangkan dinding hampir tidak.",
  },
  {
    question: "Apa arti selektivitas?",
    options: [
      "Kecepatan etch dalam nm per menit",
      "Perbandingan laju etch bahan yang dituju terhadap laju etch bahan lain",
      "Kemiringan dinding hasil etch",
      "Keseragaman etch di seluruh wafer",
    ],
    answer: 1,
    explanation:
      "Selektivitas 20 : 1 terhadap resist berarti film termakan dua puluh kali lebih cepat daripada resist yang melindunginya.",
  },
  {
    question: "Kenapa wet etch isotropik tidak cocok untuk pola yang sangat kecil?",
    options: [
      "Karena cairannya mahal",
      "Karena terlalu lambat",
      "Karena tidak bisa dihentikan",
      "Karena undercut-nya sebesar tebal film, sehingga pola melebar atau hilang",
    ],
    answer: 3,
    explanation:
      "Untuk film 500 nm, pola melebar sekitar 1 µm. Garis yang lebarnya di bawah itu akan habis termakan dari samping.",
  },
  {
    question: "Bagaimana proses Bosch membuat parit yang sangat dalam dan tegak?",
    options: [
      "Dengan bergantian antara langkah etch dan langkah melapisi dinding dengan polimer pelindung",
      "Dengan memakai asam yang sangat pekat",
      "Dengan memanaskan wafer sampai 1.000 °C",
      "Dengan memutar wafer",
    ],
    answer: 0,
    explanation:
      "Lapisan polimer melindungi dinding. Ion menghapus polimer hanya di dasar parit, sehingga langkah etch berikutnya hanya memakan ke bawah.",
  },
];

export function Body() {
  return (
    <>
      <Section id="gagasan" title="Membuang bahan mengikuti pola">
        <p>
          Litografi di Bab 18 meninggalkan pola resist di atas film. Langkah
          berikutnya adalah <Term>etching</Term>: membuang film di tempat yang
          tidak terlindungi resist, sehingga pola berpindah dari resist ke
          film.
        </p>
        <p>Mutu sebuah proses etch dinilai dari empat hal:</p>
        <ul>
          <li>
            <Term>Laju etch</Term>, tebal bahan yang terbuang per satuan
            waktu, biasanya dalam nm per menit.
          </li>
          <li>
            <Term>Selektivitas</Term>, perbandingan laju etch bahan yang
            dituju terhadap bahan lain yang seharusnya tidak termakan, yaitu
            resist di atas dan lapisan di bawah.
          </li>
          <li>
            <Term>Anisotropi</Term>, seberapa jauh etch hanya bekerja ke arah
            bawah dan tidak ke samping.
          </li>
          <li>
            <Term>Keseragaman</Term>, seberapa sama hasilnya di tengah dan di
            tepi wafer.
          </li>
        </ul>
      </Section>

      <Section id="profil" title="Isotropik dan anisotropik">
        <p>
          Etch <Term>isotropik</Term> memakan bahan sama cepat ke segala arah.
          Etch <Term>anisotropik</Term> memakan lebih cepat ke satu arah,
          idealnya hanya ke bawah. Anisotropi dinyatakan dengan angka:
        </p>
        <Formula block tex="A = 1 - \frac{\text{laju ke samping}}{\text{laju ke bawah}}" />
        <p>
          Nilai 0 berarti isotropik penuh, dan nilai 1 berarti dinding tegak
          sempurna. Ubah nilainya pada alat di bawah, lalu coba perpanjang
          waktu etch melewati 100%.
        </p>
        <EtchProfile />
        <p>Dua hal penting terlihat di sana.</p>
        <p>
          <Term>Undercut.</Term> Pada etch isotropik, bahan di bawah tepi
          resist ikut termakan sejauh kedalaman etch. Film setebal 500 nm
          berarti bukaan melebar sekitar 1 µm. Kalau polanya selebar 10 µm, itu
          tidak masalah. Kalau polanya selebar 1 µm, pola itu rusak. Inilah
          alasan pola kecil membutuhkan etch anisotropik.
        </p>
        <p>
          <Term>Over-etch.</Term> Tebal film dan laju etch tidak pernah persis
          sama di seluruh wafer. Supaya film habis di semua tempat, etch
          sengaja diteruskan 10 sampai 30% lebih lama. Selama waktu tambahan
          itu, bagian yang sudah habis filmnya terus terpapar. Selektivitas
          yang tinggi terhadap lapisan di bawahnya menentukan apakah lapisan
          itu selamat.
        </p>
      </Section>

      <Section id="wet" title="Wet etch">
        <p>
          <Term>Wet etch</Term> memakai larutan kimia. Wafer dicelupkan, bahan
          yang terbuka bereaksi dan larut, lalu wafer dibilas dengan air
          deionisasi.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Bahan</th>
                <th>Larutan</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Silikon dioksida</td>
                <td>HF yang disangga amonium fluorida (BOE)</td>
                <td>Tidak memakan silikon, selektivitasnya sangat tinggi</td>
              </tr>
              <tr>
                <td>Silikon nitrida</td>
                <td>Asam fosfat panas, 160 °C</td>
                <td>Selektif terhadap oksida</td>
              </tr>
              <tr>
                <td>Aluminium</td>
                <td>Campuran asam fosfat, asetat, dan nitrat</td>
                <td>Umum untuk jalur logam yang lebar</td>
              </tr>
              <tr>
                <td>Silikon</td>
                <td>Kalium hidroksida (KOH)</td>
                <td>Anisotropik, mengikuti bidang kristal</td>
              </tr>
              <tr>
                <td>Emas</td>
                <td>Larutan iodin dan kalium iodida</td>
                <td>Dipakai kalau lift-off tidak memungkinkan</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Kelebihan wet etch adalah selektivitasnya, yang bisa mencapai
          ratusan banding satu karena reaksinya murni kimia. Alatnya juga
          murah, dan banyak wafer bisa diproses sekaligus. Kelemahannya, hampir
          semua wet etch bersifat isotropik.
        </p>
        <Callout kind="catatan">
          <p>
            Etch silikon dengan KOH adalah pengecualian yang menarik. Larutan
            ini memakan bidang kristal (100) ratusan kali lebih cepat daripada
            bidang (111), yang atomnya tersusun paling rapat. Pada wafer (100),
            hasilnya adalah lubang berbentuk limas terbalik dengan dinding
            miring tepat 54,7°, sudut antara kedua bidang itu. Bidang-bidang
            dari Bab 2 muncul sebagai bentuk nyata. Cara ini dipakai untuk
            membuat membran dan struktur mekanik kecil.
          </p>
        </Callout>
      </Section>

      <Section id="dry" title="Dry etch dan plasma">
        <p>
          <Term>Dry etch</Term> memakai plasma, bukan cairan. Gas yang
          mengandung fluor atau klor dialirkan ke ruang vakum dan diubah
          menjadi plasma dengan daya frekuensi radio, seperti pada sputtering
          dan PECVD. Plasma itu menghasilkan dua jenis pelaku:
        </p>
        <ul>
          <li>
            <Term>Radikal</Term>, yaitu atom atau pecahan molekul netral yang
            sangat reaktif, misalnya atom fluor. Radikal bergerak ke segala
            arah dan bereaksi secara kimia dengan permukaan. Hasil reaksinya
            adalah gas yang dipompa keluar. Sifatnya selektif tetapi isotropik.
          </li>
          <li>
            <Term>Ion</Term>, yang dipercepat medan listrik lurus ke arah
            wafer. Ion memukul permukaan secara fisik, seperti pada sputtering.
            Sifatnya berarah tetapi tidak selektif.
          </li>
        </ul>
        <RieExplorer />
        <p>
          Dengan mengatur perbandingan kedua pelaku itu, didapat tiga jenis
          proses:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Proses</th>
                <th>Pelaku utama</th>
                <th>Anisotropi</th>
                <th>Selektivitas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plasma etch</td>
                <td>Radikal</td>
                <td>Rendah</td>
                <td>Tinggi</td>
              </tr>
              <tr>
                <td>RIE</td>
                <td>Radikal dan ion bersama-sama</td>
                <td>Tinggi</td>
                <td>Sedang sampai tinggi</td>
              </tr>
              <tr>
                <td>Ion milling</td>
                <td>Ion saja</td>
                <td>Sangat tinggi</td>
                <td>Rendah</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="rie" title="RIE: kimia dan ion bekerja sama">
        <p>
          <Term>RIE</Term>, <em>reactive ion etching</em>, adalah proses etch
          yang paling banyak dipakai. Wafer diletakkan di elektrode yang
          dialiri daya frekuensi radio. Di atas wafer terbentuk lapisan tipis
          dengan medan listrik kuat, yang mempercepat ion tegak lurus ke
          permukaan.
        </p>
        <p>
          Hal yang membuat RIE istimewa adalah kerja sama kedua pelakunya.
          Radikal saja memakan silikon dengan lambat. Ion saja juga lambat.
          Keduanya bersama-sama memakan sepuluh kali lebih cepat atau lebih,
          karena hantaman ion memutus ikatan di permukaan dan melepaskan hasil
          reaksi yang menempel.
        </p>
        <p>
          Dari situ dinding tegak muncul dengan sendirinya. Ion jatuh lurus ke
          bawah, sehingga dasar pola terus dihantam dan termakan cepat.
          Dinding hampir tidak pernah terkena ion, jadi di sana hanya ada etch
          kimia yang lambat. Banyak proses juga sengaja menambahkan gas yang
          membentuk lapisan polimer tipis di semua permukaan. Di dasar,
          lapisan itu langsung terhapus ion. Di dinding, lapisan itu bertahan
          dan melindungi. Cara ini disebut <Term>pasivasi dinding</Term>.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Bahan yang dietsa</th>
                <th>Gas yang umum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Silikon</td>
                <td>SF₆, atau Cl₂ dan HBr</td>
              </tr>
              <tr>
                <td>Silikon dioksida</td>
                <td>CF₄, CHF₃</td>
              </tr>
              <tr>
                <td>Silikon nitrida</td>
                <td>CF₄ dengan O₂, atau CHF₃</td>
              </tr>
              <tr>
                <td>Aluminium</td>
                <td>Cl₂ dan BCl₃</td>
              </tr>
              <tr>
                <td>Resist dan bahan organik</td>
                <td>O₂</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Baris terakhir adalah cara resist dilepas setelah etching selesai.
          Plasma oksigen membakar resist menjadi karbon dioksida dan uap air,
          dan langkah ini disebut <Term>ashing</Term>.
        </p>
        <p>
          Kapan etch harus dihentikan? Plasma memancarkan cahaya dengan warna
          yang khas untuk tiap zat di dalamnya. Saat film habis dan lapisan di
          bawahnya mulai terbuka, susunan gas di dalam plasma berubah, dan
          warnanya ikut berubah. Alat memantau cahaya itu dan menghentikan
          proses pada saat yang tepat. Cara ini disebut{" "}
          <Term>deteksi titik akhir</Term>.
        </p>
      </Section>

      <Section id="drie" title="Etch dalam: proses Bosch">
        <p>
          Sensor gerak, mikrofon, dan sambungan tembus wafer membutuhkan parit
          sedalam puluhan sampai ratusan mikrometer dengan dinding tegak. RIE
          biasa tidak sanggup, karena resist habis jauh sebelum kedalaman itu
          tercapai. Jawabannya adalah <Term>DRIE</Term>, RIE dalam, dengan{" "}
          <Term>proses Bosch</Term> yang mengulang dua langkah setiap beberapa
          detik:
        </p>
        <ol>
          <li>
            <Term>Etch.</Term> Plasma SF₆ memakan silikon dengan cepat dan
            hampir isotropik, tetapi hanya sebentar.
          </li>
          <li>
            <Term>Pasivasi.</Term> Plasma C₄F₈ melapisi semua permukaan dengan
            polimer sejenis teflon.
          </li>
        </ol>
        <p>
          Pada langkah etch berikutnya, ion menghapus polimer di dasar parit,
          dan silikon di sana termakan lagi. Polimer di dinding bertahan.
          Hasilnya parit dengan perbandingan kedalaman terhadap lebar lebih
          dari 20, dengan dinding yang bergelombang halus akibat pergantian
          langkah itu.
        </p>
      </Section>

      <Section id="perbandingan" title="Wet atau dry">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Wet etch</th>
                <th>Dry etch (RIE)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bentuk dinding</td>
                <td>Membulat, ada undercut</td>
                <td>Tegak</td>
              </tr>
              <tr>
                <td>Selektivitas</td>
                <td>Sangat tinggi</td>
                <td>Sedang sampai tinggi</td>
              </tr>
              <tr>
                <td>Pola terkecil</td>
                <td>Beberapa mikrometer</td>
                <td>Nanometer</td>
              </tr>
              <tr>
                <td>Kerusakan pada permukaan</td>
                <td>Tidak ada</td>
                <td>Ada, akibat hantaman ion</td>
              </tr>
              <tr>
                <td>Biaya alat</td>
                <td>Rendah</td>
                <td>Tinggi</td>
              </tr>
              <tr>
                <td>Jumlah wafer sekali proses</td>
                <td>Banyak</td>
                <td>Biasanya satu</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Keduanya tetap dipakai. Dry etch mengerjakan semua pola yang
          ukurannya kritis. Wet etch dipakai untuk pembersihan, untuk membuang
          seluruh lapisan tanpa pola, dan untuk pola besar yang tidak menuntut
          dinding tegak.
        </p>
      </Section>

      <Section id="penutup-bagian" title="Penutup Bagian D">
        <p>
          Dengan bab ini, kotak perkakas fabrikasi sudah lengkap: wafer yang
          bersih, oksidasi, doping, deposisi dari Bagian C, litografi, dan
          etching. Setiap devais, sesederhana atau serumit apa pun, dibuat
          dengan mengulang perkakas yang sama dalam urutan yang berbeda.
        </p>
        <p>
          Yang belum kita bahas adalah cara mengetahui hasilnya. Tebal film,
          bentuk pola, susunan kristal, dan sifat listrik tidak bisa dilihat
          dengan mata. Bagian E membahas alat ukurnya, lalu merangkai semuanya
          dalam satu proyek akhir.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Etching memindahkan pola dari resist ke film. Mutunya dinilai dari laju etch, selektivitas, anisotropi, dan keseragaman.",
            "Etch isotropik menghasilkan undercut sebesar kedalamannya. Pola kecil membutuhkan etch anisotropik.",
            "Wet etch memakai larutan: sangat selektif dan murah, tetapi hampir selalu isotropik.",
            "Dry etch memakai plasma. Radikal bekerja secara kimia ke segala arah, dan ion bekerja secara fisik ke arah bawah.",
            "RIE menggabungkan keduanya: ion yang jatuh tegak lurus mempercepat etch hanya di dasar pola, sehingga dindingnya tegak.",
            "Proses Bosch bergantian antara etch dan pasivasi dinding untuk membuat parit yang sangat dalam.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="etching" questions={questions} />
      </Section>
    </>
  );
}
