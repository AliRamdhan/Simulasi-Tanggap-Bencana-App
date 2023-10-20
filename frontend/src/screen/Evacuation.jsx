import React, { useEffect, useState } from "react";
import Landing from "../images/evakuasi.jpeg";
import LandingBg from "../images/landingEvakuasi.jpeg";
import Alam from "../images/alam.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Header } from "../components/partials/Header";
import { API } from "../context/API";
import { Footer } from "../components/partials/Footer";

export const Evacuation = () => {
  const [evacuations, setEvacuations] = useState([]);
  const [articles, setArticles] = useState([]);
  const simulationName = "Simulasi Evakuasi Bencana";
  useEffect(() => {
    API.getListSimulations(simulationName).then((data) => {
      setEvacuations(data);
    });
    API.getArticles().then((data) => {
      setArticles(data);
    });
  }, [simulationName]);
  return (
    <>
      <Header />
      <div className="w-full min-h-screen">
        <div className="w-full h-[90vh] flex justify-center items-center">
          <div className="w-3/5 h-full pr-8">
            <div className="w-full h-full containerLanding">
              <img
                src={Landing}
                alt=""
                className="w-[725px] h-[450px] absolute"
              />
              <img src={LandingBg} alt="" className="h-[90vh] w-full" />
            </div>
          </div>

          <div className="w-2/5 flex flex-col justify-center -mt-20  pr-8 z-20">
            <div className="text-6xl font-bold mb-2">
              Evakuasi Virtual Simulation
            </div>
            <div className="text-2xl font-semibold mb-12 pl-2">
              Bencana Tidak Kenal Waktu. Selamatkan-lah dirimu bersama
              orang-orang yang kamu sayangi dan menjadilah relawan yang tanpa
              pamrih.
            </div>
            <button
              type="button"
              className="ml-2 py-2.5 px-5 text-lg font-medium text-white focus:outline-none rounded-lg border border-gray-200 bg-gray-700"
            >
              Evakuasi Sekarang
            </button>
          </div>
        </div>
        <div className="w-full relative mt-8">
          <div className="w-full text-3xl font-semibold mb-4 px-8">
            Jika terjadi...
          </div>
          <div className="w-full flex items-center gap-8 text-2xl font-bold pl-16">
            {evacuations.map((evacuation,index) => (
              <Link
                to={`/simulasi/${evacuation.disasterType.simulationName}/${evacuation._id}`}
                key={index}
              >
                <div className="w-72 h-72 text-center flex flex-col justify-center items-center gap-8 border-2 bg-white shadow-md rounded-lg cursor-pointer pt-4">
                  <div>{evacuation.disasterTitle}</div>
                  <img
                    src={`http://localhost:5000/images/disaster/${evacuation.disasterPicture}`}
                    alt={evacuation.disasterTitle}
                    className="w-full h-full rounded-b-lg"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-screen mt-8 px-8">
          <div className="w-full mb-8">
            <div>Statistik</div>
            <div className="w-full flex justify-center">
              <div className="w-3/5">
                <div className="w-full flex justify-between pr-8 text-lg font-medium">
                  <div className="">Prakiraan Cuaca (tanggal)</div>

                  <div className="">
                    0 dago bandung{" "}
                    <span className="text-blue-600">ubah lokasi</span>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-4">
                  <div className="w-4/5 flex justify-around items-center bg-white shadow-md border-2 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-semibold">Dago Bandung</div>
                      <div className="text-sm font-medium">
                        Selasa, 07 Juli 08:00
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <img src={Alam} alt="" className="w-24 h-24" />
                          <div className="text-lg font-semibold">
                            Sedikit Berawan
                          </div>
                        </div>
                        <div className="text-5xl font-bold">22C</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-4 gap-2 mt-4">
                    <div className="w-full bg-white shadow-md border-2 rounded-lg text-center p-2 py-4">
                      <div className="w-full flex flex-col justify-center items-center">
                        <img src={Alam} alt="" className="w-24 h-24" />
                        <div className="text-lg font-semibold">
                          Sedikit Berawan
                        </div>
                        <div className="text-md font-bold">22C</div>
                      </div>
                      <div className="mt-4 text-md font-semibold">
                        <div>12/07/2023</div>
                        <div>06:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/5">
                <div className="text-lg font-medium px-8">Gempa Terkini</div>
                <div className="w-full flex flex-col justify-center items-center mt-4">
                  <div className="w-5/6 text-center bg-white shadow-md border-2 rounded-lg p-4">
                    <div className="w-full flex justify-around items-center">
                      <div className="w-full text-center">
                        <div className="text-2xl font-semibold">
                          Dago Bandung
                        </div>
                        <div className="text-sm font-medium">
                          Selasa, 07 Juli 08:00
                        </div>
                      </div>
                      <div className="w-full text-left font-medium">
                        <div>Magnitudo: 4.7</div>
                        <div>Kepulauan batu, Indonesia</div>
                        <div>11 Juni 23 23:14 WIB</div>
                      </div>
                    </div>
                    <div className="font-medium mt-6">
                      <div>
                        Pusat gempa berada di laut 18 km Baratdaya Melonguane
                      </div>
                      <div>2712 KM Jauh dari Anda</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>Panduan Bencana</div>
        <div>Forecast cuaca && Gempa Terkini</div> */}
          <div className="w-full h-full">
            <div className="text-3xl font-semibold mb-3">Blog or News</div>
            <div className="w-full grid grid-cols-3 gap-4">
              {articles.map((article, index) => (
                <div
                  className="w-full bg-white shadow-md border-2 rounded-lg text-center"
                  key={index}
                >
                  <img
                    src={`http://localhost:5000/images/article/${article.articlePicture}`}
                    alt=""
                    className="w-full h-48 rounded-lg"
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                  />
                  <div className="text-left p-4">
                    <span className="text-sm font-semibold text-gray-800">
                      <span className="text-sm font-semibold text-gray-800">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </span>
                    <div className="w-full text-left text-2xl font-bold">
                      {article.articleTitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fixed bottom-8 right-6 z-20">
            <Link to="/">
              <div className="bg-white shadow-md border-2 p-4 rounded-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faHandshakeAngle} className="w-8 h-8" />
                <span className="text-2xl font-bold"> Simulasi Bencana</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-96">
        <Footer />
      </div>
    </>
  );
};
