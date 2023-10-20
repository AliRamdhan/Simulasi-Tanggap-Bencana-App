import React, { useEffect, useState } from "react";
import Landing from "../images/landing1.png";
import LandingBg from "../images/landing4.jpg";
import Alam from "../images/alam.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Header } from "../components/partials/Header";
import { Footer } from "../components/partials/Footer";
import { API } from "../context/API";
import calculate from "../context/Calculate";
import Default from "../images/user.png";

export const Welcome = () => {
  const [disasters, setDisasters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [weathers, setWeathers] = useState(null);
  const [earthquakes, setEartquakes] = useState(null);
  const [positions, setPositions] = useState(null);
  const [startDate, setStartDate] = useState("2023-9-1");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [distance, setDistance] = useState("");
  const simulasiName = "Simulasi Bencana";
  const direction_mapping = {
    N: "Utara",
    NE: "Timur Laut",
    E: "Timur",
    SE: "Tenggara",
    S: "Selatan",
    SW: "Barat Daya",
    W: "Barat",
    NW: "Barat Laut",
    WSW: "Barat-Barat Daya",
    SSW: "Selatan-Selatan Barat",
    NNW: "Utara-Utara Barat",
    NNE: "Utara-Utara Timur",
    SSE: "Selatan-Selatan Timur",
    ESE: "Timur-Timur Tenggara",
    ENE: "Timur-Timur Laut",
    WNW: "Barat-Barat Laut",
  };
  useEffect(() => {
    API.getListSimulations(simulasiName).then((data) => {
      setDisasters(data);
    });
    // getArticles();
    API.getArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && !weathers) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositions({
            latitude: latitude,
            longitude: longitude,
          });
          API.getWeatherData3rdPartybyLotandLan(latitude, longitude).then(
            (data) => {
              setWeathers({
                current: {
                  current_weather_city: data.current_weather_city,
                  current_weather_description: data.current_weather_description,
                  current_weather_icon: data.current_weather_icon,
                  current_weather_temp: data.current_weather_temp,
                },
                forecast: data.forecast_weather_data,
              });
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [startDate, endDate, weathers]);

  useEffect(() => {
    API.getEarthquakeData3rdParty(startDate, endDate).then((data) => {
      setEartquakes(data.Earthquake.features[0]);
    });
    if (
      earthquakes &&
      positions &&
      positions.latitude &&
      positions.longitude &&
      !distance
    ) {
      const earthquakeDistance = calculate(
        positions.latitude,
        positions.longitude,
        earthquakes.geometry.coordinates[1],
        earthquakes.geometry.coordinates[0]
      );
      setDistance(earthquakeDistance.toFixed(2));
    }
  }, [earthquakes, positions, distance]);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen">
        <div className="w-full h-[90vh] flex justify-center items-center">
          <div className="w-3/5 h-full">
            <div className="w-full h-full containerLanding">
              <img
                src={Landing}
                alt=""
                className="w-[720px] h-[450px] absolute"
              />
              <img src={LandingBg} alt="" className="h-[800px] w-full" />
            </div>
          </div>

          <div className="w-2/5 h-full flex flex-col justify-center pr-8">
            <div className="text-6xl font-bold mb-2">Virtual Simulation</div>
            <div className="text-2xl font-semibold mb-12 pl-2">
              Bencana Tidak Kenal Waktu. Persiapkan Diri Anda dengan Simulasi
              Kami yang menarik dan efektif.
            </div>
            <button
              type="button"
              className="ml-2 py-2.5 px-5 text-lg font-medium text-white focus:outline-none rounded-lg border border-gray-200 bg-gray-700"
            >
              Simulasi Sekarang
            </button>
          </div>
        </div>
        <div className="w-full relative">
          <div className="w-full text-3xl font-semibold mb-4 px-8">
            Jika terjadi...
          </div>
          <div className="w-full flex items-center gap-8 text-2xl font-bold pl-16">
            {disasters.map((bencana, index) => (
              <Link
                to={`/simulasi/${bencana.disasterType.simulationName}/${bencana._id}`}
                key={index}
              >
                <div className="w-72 h-72 text-center flex flex-col justify-center items-center gap-8 border-2 bg-white shadow-md rounded-lg cursor-pointer pt-4">
                  <div>{bencana.disasterTitle}</div>
                  <img
                    src={`http://localhost:5000/images/disaster/${bencana.disasterPicture}`}
                    alt={bencana.disasterTitle}
                    className="w-full h-full rounded-b-lg"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-screen px-8 mt-8">
          <div className="w-full mb-8">
            <div className="text-3xl font-semibold">Statistik</div>
            <div className="w-full flex justify-center">
              {weathers && (
                <div className="w-3/5">
                  <div className="w-full flex justify-between pr-8 text-lg font-medium">
                    <div className="">Prakiraan Cuaca</div>
                    <div className="">
                      0 dago bandung{" "}
                      <span className="text-blue-600">ubah lokasi</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center mt-4">
                    <div className="w-5/6 flex justify-around items-center bg-white shadow-md border-2 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-semibold">
                          {weathers.current.current_weather_city}
                        </div>
                        <div className="text-sm font-medium">
                          {new Date().toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="flex flex-col items-center justify-center">
                            <img
                              src={`https://openweathermap.org/img/wn/${weathers.current.current_weather_icon}.png`}
                              alt="Weather Icon"
                              className="w-24 h-24"
                            />
                            <div className="text-lg font-semibold">
                              {
                                weathers.current
                                  .currentcurrent_weather_description
                              }
                            </div>
                          </div>
                          <div className="text-5xl font-bold">
                            {weathers.current.current_weather_temp}°
                          </div>
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
              )}
              {earthquakes && (
                <div className="w-3/5">
                  <div className="text-lg font-medium px-8">Gempa Terkini</div>
                  <div className="w-full flex flex-col justify-center items-center mt-4">
                    <div className="w-full text-center bg-white shadow-md border-2 rounded-lg p-2">
                      <div className="w-full flex justify-around items-center">
                        <div className="w-full text-center">
                          <div className="text-2xl font-semibold">
                            <div>
                              {earthquakes.properties.place.split(" of ")[1]}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {new Date(
                              earthquakes.properties.time
                            ).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="w-full text-left font-medium">
                          <div>Magnitudo : {earthquakes.properties.mag}</div>
                          <div>
                            Depth : {earthquakes.geometry.coordinates[2]}{" "}
                            <span> kilometers dibawah laut</span>
                          </div>
                          <div className="text-base">
                            Pukul :
                            <span className="ml-1">
                              {new Date(
                                earthquakes.properties.time
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="font-medium mt-6">
                        <div>
                          {earthquakes.properties.place.split(" WSW of ")[0]}
                          <span className="mx-1">
                            {
                              direction_mapping[
                                earthquakes.properties.place.split(" ", 3)[2]
                              ]
                            }
                          </span>
                          {earthquakes.properties.place.split(" of ")[1]}
                        </div>
                        <div>{distance} KM Jauh dari Anda</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-full">
            <div className="text-3xl font-semibold mb-3">Blog or News</div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {articles
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort articles by createdAt in descending order
                .slice(0, 4)
                .slice(0, 4)
                .map((article, index) => (
                  <article
                    className="flex flex-col bg-white shadow-xl border-2"
                    key={index}
                  >
                    <Link to={`/articles/${article._id}`}>
                      <img
                        alt=""
                        className="object-cover w-full h-52 dark:bg-gray-500"
                        src={`http://localhost:5000/images/article/${article.articlePicture}`}
                      />
                    </Link>
                    <div className="flex flex-col flex-1 p-4">
                      {article.articleType && article.articleTopic && (
                        <div
                          to={`/article-all-genre`}
                          className="text-xs tracking-wider uppercase dark:text-violet-400 flex items-center gap-2"
                        >
                          <Link
                            to={`/articles/type/${article.articleType}`}
                            className="hover:underline"
                          >
                            {article.articleType}
                          </Link>
                          <span className="text-lg"> • </span>
                          <Link
                            to={`/articles/topic/${article.articleTopic}`}
                            className="hover:underline"
                          >
                            {article.articleTopic}
                          </Link>
                        </div>
                      )}
                      <h3 className="flex-1 py-2 text-xl font-semibold leading-normal">
                        <Link to={`/articles/${article._id}`}>
                          {article.articleTitle}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center justify-between pt-3 space-x-2 text-xs font-medium">
                        <span className="flex items-center">
                          <img
                            src={Default}
                            alt="profile tanggap lab"
                            className="w-4 h-4 border rounded-full mr-2"
                          />
                          <p className="text-sm">{article.articleAuthor}</p>
                        </span>
                        <span>
                          {new Date(article.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            <div className="w-full text-right text-blue-600 text-base font-medium py-2">
              <Link to="/articles">See all</Link>
            </div>
          </div>
          <div className="fixed bottom-8 right-6">
            <Link to="/evakuasi">
              <div className="bg-white shadow-md border-2 p-4 rounded-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faHandshakeAngle} className="w-8 h-8" />
                <span className="text-2xl font-bold">Simulasi Evakuasi</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
