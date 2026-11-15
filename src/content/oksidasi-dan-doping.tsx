import { ImplantExplorer } from "@/components/three/lazy";
import { Callout, Formula, Section, Summary, Term } from "@/components/ui/parts";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { OxidationCalculator } from "@/components/widgets/OxidationCalculator";

export const objectives = [
  "Menjelaskan oksidasi termal dan beda oksidasi kering dan basah",
  "Menjelaskan kenapa pertumbuhan oksida melambat saat oksidanya menebal",
  "Membedakan doping dengan difusi dan dengan implantasi ion",
  "Menjelaskan peran energi, dosis, dan annealing pada implantasi",
];

const questions: QuizQuestion[] = [
  {
    question: "Apa beda oksidasi basah dan oksidasi kering?",
    options: [
      "Oksidasi basah lebih cepat, sedangkan oksidasi kering menghasilkan oksida yang lebih rapat",
      "Oksidasi kering lebih cepat",
      "Oksidasi basah dilakukan pada suhu ruang",
      "Tidak ada bedanya",
    ],
    answer: 0,
    explanation:
      "Molekul air lebih mudah larut dan bergerak di dalam oksida daripada molekul oksigen. Oksida kering tumbuh lambat tetapi mutunya paling baik, sehingga dipakai untuk oksida gate.",
  },
  {
    question: "Untuk menumbuhkan oksida setebal 100 nm, berapa tebal silikon yang terpakai?",
    options: ["0 nm", "100 nm", "Sekitar 46 nm", "Sekitar 200 nm"],
    answer: 2,
    explanation:
      "Oksidasi termal mengubah silikon wafer menjadi oksida. Sekitar 46% tebal oksida berasal dari silikon yang terpakai, dan sisanya adalah pemuaian ke atas.",
  },
  {
    question: "Kenapa pertumbuhan oksida melambat saat oksidanya sudah tebal?",
    options: [
      "Karena silikonnya habis",
      "Karena oksidan harus berdifusi menembus oksida yang makin tebal untuk sampai ke silikon",
      "Karena suhunya turun sendiri",
      "Karena oksida menguap",
    ],
    answer: 1,
    explanation:
      "Reaksi terjadi di batas antara oksida dan silikon. Makin tebal oksida, makin jauh perjalanan oksidan, sehingga tebal hanya naik sebanding akar waktu.",
  },
  {
    question: "Pada implantasi ion, apa yang menentukan kedalaman dopan?",
    options: ["Dosis", "Suhu wafer", "Lama penyinaran", "Energi ion"],
    answer: 3,
    explanation:
      "Energi menentukan seberapa dalam ion menembus sebelum berhenti. Dosis, yang diatur lewat arus berkas dan waktu, menentukan jumlah dopannya.",
  },
  {
    question: "Kenapa wafer harus di-anneal setelah implantasi?",
    options: [
      "Untuk memperbaiki kerusakan kristal dan menempatkan dopan di posisi kisi agar aktif",
      "Untuk membersihkan permukaan",
      "Untuk menambah dosis",
      "Untuk mendinginkan wafer",
    ],
    answer: 0,
    explanation:
      "Ion yang menghantam merusak susunan kristal, dan dopan yang berhenti di sela-sela kisi tidak menyumbang pembawa muatan. Pemanasan memulihkan kristal dan memindahkan dopan ke posisi atom silikon.",
  },
];

export function Body() {
  return (
    <>
      <Section id="oksida" title="Oksida silikon">
        <p>
          Salah satu alasan terbesar silikon menguasai industri adalah
          oksidanya. Silikon yang dipanaskan dalam oksigen menumbuhkan lapisan
          silikon dioksida yang rapat, stabil, menempel sangat kuat, dan
          merupakan isolator yang sangat baik. Germanium dan galium arsenida
          tidak punya oksida sebaik itu.
        </p>
        <p>Oksida ini dipakai untuk banyak hal di dalam sebuah devais:</p>
        <ul>
          <li>
            <Term>Oksida gate</Term>, isolator tipis di antara gate dan kanal
            MOSFET.
          </li>
          <li>
            <Term>Isolasi</Term>, pemisah antara satu transistor dan
            transistor di sebelahnya.
          </li>
          <li>
            <Term>Masker</Term>, pelindung yang menahan dopan atau zat etsa di
            tempat yang tidak diinginkan.
          </li>
          <li>
            <Term>Pasivasi</Term>, lapisan yang mengikat ikatan-ikatan
            menggantung di permukaan silikon sehingga permukaannya tenang
            secara listrik.
          </li>
        </ul>
        <p>
          Silikon yang dibiarkan di udara pada suhu ruang pun menumbuhkan
          oksida, tetapi hanya setebal 1 sampai 2 nm lalu berhenti. Lapisan
          ini disebut <Term>oksida alami</Term>, dan inilah yang dibuang
          dengan celupan HF di Bab 16.
        </p>
      </Section>

      <Section id="oksidasi-termal" title="Oksidasi termal">
        <p>
          Untuk oksida yang lebih tebal dan terkendali, wafer dipanaskan pada
          800 sampai 1.200 °C di dalam tungku tabung kuarsa, alat yang sama
          bentuknya dengan tungku LPCVD di Bab 14. Ada dua pilihan gas:
        </p>
        <Formula block tex="\text{Si} + \text{O}_2 \;\longrightarrow\; \text{SiO}_2 \qquad \text{(oksidasi kering)}" />
        <Formula block tex="\text{Si} + 2\,\text{H}_2\text{O} \;\longrightarrow\; \text{SiO}_2 + 2\,\text{H}_2 \qquad \text{(oksidasi basah)}" />
        <p>
          Bedanya dari CVD penting untuk dipahami. Pada CVD, kedua unsur film
          datang dari gas, dan film menumpuk di atas permukaan. Pada oksidasi
          termal, silikonnya berasal dari wafer itu sendiri. Oksida tumbuh ke
          dalam wafer sekaligus ke atas. Coba hitung pada alat di bawah.
        </p>
        <OxidationCalculator />
        <p>Tiga hal terlihat dari hitungan itu.</p>
        <p>
          <Term>Silikon terpakai.</Term> Untuk setiap 100 nm oksida, sekitar 46
          nm silikon berubah menjadi oksida. Batas antara oksida dan silikon
          terus bergerak ke dalam wafer, sehingga selalu terbentuk di dalam
          kristal yang bersih, bukan di permukaan lama yang terpapar udara.
          Itu sebabnya mutu antarmukanya sangat baik.
        </p>
        <p>
          <Term>Basah jauh lebih cepat.</Term> Pada 1.000 °C selama satu jam,
          oksidasi basah menghasilkan sekitar 300 nm, sedangkan oksidasi
          kering hanya beberapa puluh nanometer. Oksida kering lebih rapat dan
          lebih tahan tegangan, jadi dipakai untuk oksida gate yang tipis.
          Oksida basah dipakai untuk lapisan tebal seperti isolasi dan masker.
        </p>
        <p>
          <Term>Pertumbuhan melambat.</Term> Reaksi terjadi di batas oksida
          dan silikon, jadi oksidan harus menembus oksida yang sudah ada. Hal
          ini dirangkum oleh <Term>model Deal-Grove</Term>:
        </p>
        <Formula block tex="x^2 + A\,x = B\,t" />
        <p>
          dengan <Formula tex="x" /> tebal oksida dan <Formula tex="t" />{" "}
          waktu. Persamaan ini punya dua keadaan batas:
        </p>
        <ul>
          <li>
            Saat oksida masih tipis, suku <Formula tex="A\,x" /> yang
            menentukan. Tebal naik sebanding waktu, dan lajunya dibatasi
            reaksi di antarmuka.
          </li>
          <li>
            Saat oksida sudah tebal, suku <Formula tex="x^2" /> yang
            menentukan. Tebal hanya naik sebanding akar waktu, karena lajunya
            dibatasi difusi oksidan lewat oksida. Untuk menggandakan tebal,
            waktunya harus empat kali.
          </li>
        </ul>
        <p>
          Pola dua batas ini sama dengan yang kita temui pada CVD di Bab 14:
          dua tahap yang berurutan, dan yang lebih lambat menentukan laju.
        </p>
        <Callout kind="catatan">
          <p>
            Wafer beroksida tampak berwarna-warni, dan warnanya bergantung
            pada tebal oksida: sekitar 100 nm tampak ungu, 200 nm tampak
            kuning keemasan, dan 300 nm tampak biru. Ini interferensi yang
            dibahas di Bab 10. Teknisi berpengalaman bisa menaksir tebal
            oksida hanya dari warnanya.
          </p>
        </Callout>
      </Section>

      <Section id="difusi" title="Doping dengan difusi">
        <p>
          Wafer sudah didoping merata sejak ditarik dari lelehan. Untuk membuat
          devais, kita perlu daerah-daerah kecil dengan jenis dan kadar doping
          yang berbeda, misalnya source dan drain tipe-n di dalam substrat
          tipe-p. Ada dua cara memasukkan dopan ke tempat tertentu.
        </p>
        <p>
          Cara yang lebih lama adalah <Term>difusi termal</Term>. Wafer
          dipanaskan pada 900 sampai 1.100 °C di dalam gas yang mengandung
          dopan. Atom dopan masuk dari permukaan dan merambat ke dalam, dari
          konsentrasi tinggi ke rendah, sama seperti difusi pembawa muatan di
          Bab 7. Daerah yang tidak boleh terdoping ditutup oksida, yang
          menahan dopan.
        </p>
        <p>Jarak yang ditempuh dopan selama waktu t kira-kira</p>
        <Formula block tex="L \approx 2\sqrt{D\,t}, \qquad D = D_0 \exp\!\left(-\frac{E_a}{kT}\right)" />
        <p>
          Koefisien difusi <Formula tex="D" /> naik sangat tajam terhadap
          suhu, jadi suhu tungku harus dijaga sangat teliti. Biasanya difusi
          dilakukan dalam dua tahap: tahap pertama yang singkat memasukkan
          sejumlah dopan ke lapisan tipis di permukaan, lalu tahap kedua tanpa
          sumber dopan mendorongnya lebih dalam.
        </p>
        <p>Difusi punya tiga kelemahan:</p>
        <ul>
          <li>
            Konsentrasi tertinggi selalu di permukaan, dan bentuk profilnya
            tidak bisa dipilih.
          </li>
          <li>
            Dopan juga merambat ke samping di bawah tepi masker, sehingga
            daerah terdoping lebih lebar daripada bukaannya.
          </li>
          <li>
            Jumlah dopan sulit diatur dengan teliti, terutama untuk dosis
            kecil.
          </li>
        </ul>
      </Section>

      <Section id="implantasi" title="Implantasi ion">
        <p>
          <Term>Implantasi ion</Term> mengatasi ketiganya dengan cara yang
          sama sekali berbeda. Atom dopan diionkan, dipercepat dengan tegangan
          tinggi, lalu ditembakkan ke wafer. Ion menembus masuk, kehilangan
          energi lewat tumbukan, dan berhenti pada kedalaman tertentu.
        </p>
        <ImplantExplorer />
        <p>Alatnya terdiri dari lima bagian, sesuai urutan pada model:</p>
        <ol>
          <li>
            <Term>Sumber ion.</Term> Gas yang mengandung dopan diionkan
            menjadi plasma.
          </li>
          <li>
            <Term>Magnet penyaring.</Term> Medan magnet membelokkan ion. Ion
            dengan massa berbeda berbelok dengan jari-jari berbeda, sehingga
            hanya ion yang diinginkan yang lolos melalui celah. Inilah yang
            membuat berkasnya sangat murni.
          </li>
          <li>
            <Term>Pemercepat.</Term> Tegangan tinggi mempercepat ion sampai
            energi yang dipilih, biasanya 1 sampai 200 keV.
          </li>
          <li>
            <Term>Pemindai.</Term> Berkas disapukan merata ke seluruh wafer.
          </li>
          <li>
            <Term>Wafer.</Term> Arus listrik yang dibawa ion diukur, sehingga
            jumlah ion yang masuk dihitung secara langsung.
          </li>
        </ol>
        <p>Dua tombol pengatur yang saling terpisah:</p>
        <ul>
          <li>
            <Term>Energi</Term> menentukan kedalaman. Kedalaman rata-rata ion
            berhenti disebut <Term>jangkauan terproyeksi</Term>. Ion ringan
            seperti boron menembus lebih dalam daripada ion berat seperti
            arsen pada energi yang sama.
          </li>
          <li>
            <Term>Dosis</Term>, jumlah ion per satuan luas, menentukan
            banyaknya dopan. Karena dihitung dari arus dan waktu, dosis bisa
            diatur dengan ketelitian sekitar 1% pada rentang yang sangat
            lebar.
          </li>
        </ul>
        <p>
          Profil hasilnya berbentuk lonceng dengan puncak di bawah permukaan,
          bukan di permukaan. Implantasi juga berlangsung pada suhu rendah,
          sehingga photoresist bisa dipakai sebagai masker, dan ion masuk
          hampir tegak lurus sehingga rambatan ke samping kecil.
        </p>
      </Section>

      <Section id="annealing" title="Annealing">
        <p>Implantasi punya harga yang harus dibayar. Setelah implantasi:</p>
        <ul>
          <li>
            Kristal rusak. Setiap ion menabrak ribuan atom silikon keluar dari
            tempatnya. Pada dosis tinggi, lapisan permukaan bisa menjadi amorf
            sepenuhnya.
          </li>
          <li>
            Dopan belum aktif. Kebanyakan ion berhenti di sela-sela kisi.
            Dopan hanya menyumbang elektron atau hole kalau menempati posisi
            atom silikon, seperti yang kita lihat di Bab 6.
          </li>
        </ul>
        <p>
          Keduanya diperbaiki dengan <Term>annealing</Term>, yaitu pemanasan
          setelah implantasi. Pada suhu tinggi, atom silikon kembali tersusun
          mengikuti kristal yang masih utuh di bawahnya, dan atom dopan ikut
          masuk ke posisi kisi.
        </p>
        <p>
          Tetapi suhu tinggi juga membuat dopan berdifusi dan profilnya
          melebar. Geser pengatur annealing pada model tadi untuk melihatnya.
          Pada devais modern yang sambungannya sangat dangkal, pelebaran itu
          harus ditekan. Jalan keluarnya adalah{" "}
          <Term>annealing termal cepat</Term>: wafer dipanaskan dengan lampu
          sampai sekitar 1.000 °C hanya selama beberapa detik. Waktu sesingkat
          itu cukup untuk memulihkan kristal dan mengaktifkan dopan, tetapi
          tidak cukup bagi dopan untuk berpindah jauh.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Difusi</th>
                <th>Implantasi ion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Suhu proses</td>
                <td>900 sampai 1.100 °C</td>
                <td>Suhu ruang, lalu annealing</td>
              </tr>
              <tr>
                <td>Kendali jumlah dopan</td>
                <td>Sedang</td>
                <td>Sangat teliti</td>
              </tr>
              <tr>
                <td>Letak puncak konsentrasi</td>
                <td>Di permukaan</td>
                <td>Di bawah permukaan, diatur lewat energi</td>
              </tr>
              <tr>
                <td>Rambatan ke samping</td>
                <td>Besar</td>
                <td>Kecil</td>
              </tr>
              <tr>
                <td>Masker</td>
                <td>Oksida atau nitrida</td>
                <td>Photoresist, oksida, atau logam</td>
              </tr>
              <tr>
                <td>Kerusakan kristal</td>
                <td>Tidak ada</td>
                <td>Ada, diperbaiki dengan annealing</td>
              </tr>
              <tr>
                <td>Biaya alat</td>
                <td>Rendah</td>
                <td>Tinggi</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Industri chip memakai implantasi untuk hampir semua langkah doping.
          Difusi masih dipakai di tempat yang tidak menuntut ketelitian
          setinggi itu, misalnya pada pembuatan sel surya silikon.
        </p>
      </Section>

      <Section id="rangkuman" title="Rangkuman">
        <Summary
          points={[
            "Oksidasi termal menumbuhkan silikon dioksida dari silikon wafer itu sendiri. Sekitar 46% tebal oksida berasal dari silikon yang terpakai.",
            "Oksidasi kering lambat tetapi bermutu tinggi, untuk oksida gate. Oksidasi basah cepat, untuk oksida tebal.",
            "Model Deal-Grove: tebal naik sebanding waktu saat oksida tipis, dan sebanding akar waktu saat oksida tebal.",
            "Difusi memasukkan dopan dari permukaan pada suhu tinggi. Sederhana, tetapi profil dan jumlah dopannya sulit diatur.",
            "Implantasi ion menembakkan ion dopan ke wafer. Energi menentukan kedalaman, dan dosis menentukan jumlah dopan.",
            "Annealing memperbaiki kerusakan kristal dan mengaktifkan dopan. Annealing termal cepat menekan pelebaran profil.",
          ]}
        />
      </Section>

      <Section id="kuis" title="Kuis">
        <Quiz slug="oksidasi-dan-doping" questions={questions} />
      </Section>
    </>
  );
}
