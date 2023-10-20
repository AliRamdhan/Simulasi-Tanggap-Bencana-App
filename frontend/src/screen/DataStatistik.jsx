import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/partials/Header";
import { Footer } from "../components/partials/Footer";
import { API } from "../context/API";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
export default function Data() {
  const [weathers, setWeathers] = useState(null);
  const [city, setCity] = useState("");
  const [earthquakes, setEartquakes] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
        () => {
          console.log(error);
        }
      );
    }
    getEarthquakeData();
  }, []);

  const handleCityName = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      API.getWeatherData3rdPartybyCityName(city).then((data) => {
        setWeathers({
          current: {
            current_weather_city: data.current_weather_city,
            current_weather_description: data.current_weather_description,
            current_weather_icon: data.current_weather_icon,
            current_weather_temp: data.current_weather_temp,
          },
          forecast: data.forecast_weather_data,
        });
      });
    }
  };

  const getEarthquakeData = () => {
    const formattedStartDate = startDate ? startDate : "2023-9-1";
    const formattedEndDate = endDate
      ? endDate
      : new Date().toISOString().split("T")[0];
    API.getEarthquakeData3rdParty(formattedStartDate, formattedEndDate).then(
      (data) => {
        setEartquakes(data);
      }
    );
  };

  return (
    <div>
      <Header />

      {/* Cuaca Saat ini */}
      {weathers && (
        <div className="px-16 py-10">
          <div className="w-full flex justify-between items-center">
            <div className="text-[#231F20] font-semibold text-2xl border-b-[10px] border-[#FFD700] inline-block">
              Cuaca Saat Ini
            </div>
            <div className="flex justify-center">
              <form onSubmit={handleCityName}>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="px-4 py-2 mr-2 border-b-[1px] border-[#231F20]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFD700] border-b-[3px] border-[#231F20] p-2 text-[#231F20] hover:text-[#FFD700] hover:bg-[#231F20] duration-300 hidden"
                  >
                    Cek Cuaca
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Card */}
          <div className="py-10 flex justify-center">
            <div className="flex flex-col items-center p-8 w-96 border-2 border-[#231F20] sm:px-12 bg-white text-[#231F20]">
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {weathers.current.current_weather_city}
                  {/* nama kota */}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleString()}
                </p>
              </div>
              <img
                className="w-32 h-32"
                src={`https://openweathermap.org/img/wn/${weathers.current.current_weather_icon}.png`}
                alt="Weather Icon"
              />
              <div className="mb-2 text-3xl font-semibold">
                {weathers.current.current_weather_temp}°
              </div>
              <p className="text-gray-600">
                {weathers.current.currentcurrent_weather_description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cuaca 5 hari kedepan */}
      {weathers && weathers.forecast && (
        <div className="px-16 py-10">
          <div className="text-[#231F20] font-semibold text-2xl border-b-[10px] border-[#FFD700] inline-block mb-8">
            Cuaca 5 hari kedepan
          </div>
          <div className="w-full">
            <Swiper
              spaceBetween={15}
              slidesPerView={5}
              modules={[Navigation]}
              navigation
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {weathers.forecast.map((forecastItem, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center cursor-pointer">
                    <div className="flex flex-col items-center p-8 w-60 h-96 border-2 border-[#231F20] sm:px-12 bg-white text-[#231F20]">
                      <img
                        className="w-32 h-32 p-6"
                        src={`https://openweathermap.org/img/wn/${forecastItem.forecast_weather_icon}.png`}
                        alt="Weather Icon"
                      />

                      <p className="text-[#231F20] font-semibold text-2xl">
                        {forecastItem.forecast_weather_description}
                      </p>
                      <div className="mb-2 text-xl font-normal">
                        {forecastItem.forecast_weather_temp}°C
                      </div>

                      <div className="text-sm text-[#231F20] flex flex-col items-center mt-10">
                        {/* <p>{data.date}</p> */}
                        <span className="text-center">
                          {forecastItem.forecast_weather_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <div className="px-16 py-10">
        <div className="w-full flex justify-between items-center">
          <div className="text-[#231F20] font-semibold text-2xl border-b-[10px] border-[#FFD700] inline-block">
            Gempa Terkini
          </div>

          <div className="flex gap-8 pt-10 justify-center">
            <div className="mb-4">
              <label htmlFor="start-date" className="mr-2">
                Start Date:
              </label>
              <input
                type="date"
                value={startDate || ""}
                onChange={(event) => setStartDate(event.target.value)}
                className="px-4 py-2 mr-2 border-b-[1px] border-[#231F20]"
                id="start-date"
                placeholder="from"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end-date" className="mr-2">
                End Date:
              </label>
              <input
                type="date"
                value={endDate || ""}
                onChange={(event) => setEndDate(event.target.value)}
                className="px-4 py-2 mr-2 border-b-[1px] border-[#231F20]"
                id="end-date"
                placeholder="to"
              />
              <button
                onClick={getEarthquakeData}
                className="bg-[#FFD700] border-[3px] border-[#231F20] px-1 p-2 text-[#231F20] hover:text-[#FFD700] hover:bg-[#231F20] duration-300"
              >
                Cek Gempa
              </button>
            </div>
          </div>
        </div>
        {/* end */}

        {earthquakes && earthquakes.Earthquake ? (
          <div className="flex justify-center items-center flex-col">
            <div className="w-full flex justify-end items-end py-4">
              <div className="text-[#231F20] font-medium text-xl border-b-[10px] border-[#FFD700] inline-block">
                Jumlah case : {earthquakes.Earthquake.features.length}
              </div>
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {earthquakes.Earthquake.features.map((earthquake, index) => (
                <div key={index} className="mt-4">
                  <div className="flex bg-white transition hover:shadow-xl max-w-3xl items-center border-2 border-[#231F20]">
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="border-s border-[#231F20] p-4 sm:border-l-transparent sm:p-6">
                        <h3 className="font-bold uppercase text-lg text-[#231F20]">
                          {earthquake.properties.mag} Magnitudo
                        </h3>
                        {/* line-clamp-3 */}
                        <div className="w-full mt-2 text-lg text-[#231F20]">
                          <p>Lokasi: {earthquake.properties.place}</p>
                          <p>
                            Waktu:
                            {new Date(
                              earthquake.properties.time
                            ).toLocaleString()}
                          </p>
                          <p>
                            Depth: {earthquake.geometry.coordinates[2]}{" "}
                            kilometers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading data...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
