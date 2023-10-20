import React, { useEffect, useState } from "react";
import Dua from "../../images/b.jpg";
import Tiga from "../../images/nonalam.png";
import { API } from "../../context/API";
import { useParams } from "react-router-dom";
export const DetailsSimulations = () => {
  const [simulation, setSimulation] = useState("");
  const { simulasiName, simulasiId } = useParams();
  useEffect(() => {
    API.getSimulationsDetails(simulasiId).then((data) => {
      setSimulation(data);
    });
  }, [simulasiId]);
  return (
    <div className="w-full h-screen">
      <div className="w-full flex h-full">
        {simulation ? (
          <>
            <div className="w-4/6 h-full flex justify-center items-center relative">
              <div className="absolute top-16 left-20">
                <div className="h-full relative rounded-xl border-2 rounded-xl">
                  <div>
                    <img
                      src={`http://localhost:5000/images/disaster/${simulation.disasterPicture}`}
                      alt={simulation.disasterTitle}
                      className="w-[400px] h-[280px] object-fit rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-56 right-20">
                <div className="h-full relative rounded-xl border-2 rounded-xl">
                  <div>
                    <img
                      src={Dua}
                      alt="https://www.pngegg.com/en/png-nllal/download"
                      className="w-[360px] h-[300px] object-fit rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-56">
                <div className="h-full relative rounded-xl border-2 rounded-xl">
                  <div>
                    <img
                      src={Dua}
                      alt="https://www.pngegg.com/en/png-nllal/download"
                      className="w-[280px] h-[300px] object-fit rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5 p-4 mt-16">
              <div className="text-6xl font-bold">
                Bencana <span>{simulation.disasterTitle}</span>
              </div>
              <div className="text-xl font-semibold mt-8">
                <p> Description</p>{" "}
                <p className="text-lg font-medium">
                  {simulation.disasterDescription}
                </p>
              </div>
              <div className="text-xl font-medium mt-8">
                "Siapkan dirimu untuk menghadapi kekuatan alam yang luar biasa!
                Rasakan sensasi Bencana Gempa Simulasi yang tak terlupakan.
                Kesiapanmu akan menjadi kunci kelangsungan hidup. Yakin diri?
                Tekan tombol 'Mulai Simulasi' sekarang!"
              </div>
              <div className="w-full text-center p-8">
                <button
                  type="button"
                  className="py-2.5 px-8 mr-2 mb-2 text-xl font-medium text-gray-900 rounded-lg bg-gray-700 border-2 text-white tracking-widest font-sans"
                >
                  Mulai Simulasi
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>simulation tidak ditemukan</div>
        )}
      </div>
    </div>
  );
};
