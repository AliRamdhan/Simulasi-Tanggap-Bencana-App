import React from "react";
import { Header } from "../components/partials/Header";
import { Footer } from "../components/partials/Footer";
export const GuideEvacuation = () => {
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen px-8">
        <div>Apa yang Dilakukan Ketika Terjadi Gempa</div>
        <div>
          <div>
            Ketika terjadi gempa bumi, reaksi cepat dan tindakan yang tepat
            dapat menyelamatkan nyawa dan mengurangi risiko cedera. Berikut ini
            adalah langkah-langkah penting yang perlu Anda ketahui:
          </div>
          <div>
            <div>### 1. Tetap Tenang</div>
            <div>
              Cobalah untuk tetap tenang dan menjaga ketenangan. Ini adalah
              langkah pertama yang penting dalam menghadapi situasi darurat.
            </div>
          </div>
          <div>
            <div>### 2. Cari Perlindungan</div>
            <ul>
              <li>
                Jika Anda berada di dalam bangunan, segera cari perlindungan di
                bawah meja atau permukaan yang kokoh. Hindari jendela, kaca,
                atau benda-benda yang dapat pecah.
              </li>
              <li>
                Jika Anda berada di luar ruangan, hindari bangunan, tiang
                listrik, dan objek-objek besar yang dapat roboh.
              </li>
            </ul>
          </div>
          <div>
            <div>### 3. Jika Anda di dalam Mobil</div>
            <div>
              <ul>
                <li>- Hentikan mobil dan tetap di dalamnya.</li>
                <li>
                  - Hindari berada di dekat bangunan, jembatan, dan benda yang
                  dapat roboh.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div>### 4. Hindari Lift</div>
            <div>
              Jangan gunakan lift selama atau setelah gempa. Lift dapat terjebak
              dan berhenti secara tiba-tiba.
            </div>
          </div>
          <div>
            <div>### 5. Jika Anda di Kawasan Berisiko Tsunami</div>
            <div>
              Jika gempa bumi terjadi di dekat pantai, segera pindah ke daerah
              yang lebih tinggi. Gempa bisa menyebabkan tsunami.
            </div>
          </div>
          <div>
            <div>### 6. Setelah Gempa</div>
            <div>
              <ul>
                <li>
                  - Periksa diri Anda sendiri dan orang-orang di sekitar Anda
                  untuk cedera.
                </li>
                <li>
                  - Matikan gas, listrik, dan air jika diperlukan untuk
                  menghindari kebocoran dan kebakaran.
                </li>
                <li>
                  - Periksa rumah atau bangunan tempat Anda tinggal untuk
                  kerusakan yang mungkin membahayakan keselamatan Anda.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div>### 7. Tetap Siaga</div>
            <div>
              <ul>
                <li>
                  - Ingatlah bahwa gempa susulan bisa terjadi setelah gempa
                  utama. Tetap waspada dan berhati-hati.
                </li>
                <li>
                  - Dengarkan informasi dari otoritas setempat melalui radio,
                  televisi, atau ponsel untuk mendapatkan informasi terbaru dan
                  petunjuk evakuasi jika diperlukan.
                </li>
              </ul>
            </div>
            <div>
              <div>### 8. Hubungi Keluarga dan Teman</div>
              <div>
                - Hubungi keluarga dan teman-teman untuk memberi tahu mereka
                bahwa Anda aman.
              </div>
            </div>
            <div>
              <div>### 9. Bersiap untuk Evakuasi</div>
              <div>
                - Jika Anda diinstruksikan oleh otoritas setempat untuk
                mengungsi, segera persiapkan tas darurat yang berisi makanan,
                air, pakaian, obat-obatan, dan barang penting lainnya.
              </div>
            </div>
            <div>
              <div>### 10. Bantu Sesama</div>
              <div>
                - Jika Anda mampu, bantu orang lain yang membutuhkan bantuan,
                terutama yang terluka atau lanjut usia.
              </div>
            </div>
            Ingatlah bahwa gempa bumi bisa terjadi tiba-tiba dan tanpa
            peringatan, jadi penting untuk selalu memiliki rencana darurat dan
            menyadari tindakan yang harus diambil saat terjadi gempa.
          </div>
        </div>
        <div>
          <div className="w-full text-center">
            <div>
              Simulasikan diri dengan mengikuti simulasi dalam tanggap lab
            </div>
            <button
              type="button"
              class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Simulasi 
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
