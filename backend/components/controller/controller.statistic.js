require("dotenv").config();
const axios = require("axios");

const getWeatherDataByCity = async (req, res) => {
  const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=metric&appid=${process.env.API_WEATHER_KEY}`;
  const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.cityName}&units=metric&appid=${process.env.API_WEATHER_KEY}`;

  try {
    const responseCurrent = await axios.get(apiUrlCurrent);
    const responseForecast = await axios.get(apiUrlForecast);
    // const forecastData = responseForecast.data; // Get the forecast data

    const forecastData = [];

    if (responseForecast.data && responseForecast.data.list) {
      // Loop through the forecast list and extract data for each entry
      for (const forecast of responseForecast.data.list) {
        const forecast_weather_time = forecast.dt_txt;
        const forecast_weather_icon = forecast.weather
          ? forecast.weather[0].icon
          : null;
        const forecast_weather_temp = forecast.main ? forecast.main.temp : null;
        const forecast_weather_description = forecast.weather
          ? forecast.weather[0].description
          : null;

        forecastData.push({
          forecast_weather_time,
          forecast_weather_icon,
          forecast_weather_temp,
          forecast_weather_description,
        });
      }
    }

    return res.status(200).json({
      message: "Current and Forecast Weather Data by city name",
      current_weather_city: responseCurrent.data.name,
      current_weather_icon: responseCurrent.data.weather
        ? responseCurrent.data.weather[0].icon
        : null,
      current_weather_temp: responseCurrent.data.main
        ? responseCurrent.data.main.temp
        : null,
      current_weather_description: responseCurrent.data.weather
        ? responseCurrent.data.weather[0].description
        : null,
      forecast_weather_data: forecastData,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getWeatherDataByLatandLon = async (req, res) => {
  //   const apiKey = "56255fe2435fdeb0101729f296dd3e29";
  const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&units=metric&appid=${process.env.API_WEATHER_KEY}`;
  const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&units=metric&appid=${process.env.API_WEATHER_KEY}`;

  try {
    const responseCurrent = await axios.get(apiUrlCurrent);
    const responseForecast = await axios.get(apiUrlForecast);

    const forecastData = [];

    if (responseForecast.data && responseForecast.data.list) {
      // Loop through the forecast list and extract data for each entry
      for (const forecast of responseForecast.data.list) {
        const forecast_weather_time = forecast.dt_txt;
        const forecast_weather_icon = forecast.weather
          ? forecast.weather[0].icon
          : null;
        const forecast_weather_temp = forecast.main ? forecast.main.temp : null;
        const forecast_weather_description = forecast.weather
          ? forecast.weather[0].description
          : null;

        forecastData.push({
          forecast_weather_time,
          forecast_weather_icon,
          forecast_weather_temp,
          forecast_weather_description,
        });
      }
    }
    return res.status(200).json({
      message: "Current and Forecast Weather Data by lat and lon",
      current_weather_city: responseCurrent.data.name,
      current_weather_icon: responseCurrent.data.weather
        ? responseCurrent.data.weather[0].icon
        : null,
      current_weather_temp: responseCurrent.data.main
        ? responseCurrent.data.main.temp
        : null,
      current_weather_description: responseCurrent.data.weather
        ? responseCurrent.data.weather[0].description
        : null,
      forecast_weather_data: forecastData,
    });
  } catch (error) {
    console.error(error);
  }
};

const getEarthquakeData = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const formattedStartDate = startDate ? startDate : "2023-9-1";
    const formattedEndDate = endDate
      ? endDate
      : new Date().toISOString().split("T")[0];
    const response = await axios.get(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedStartDate}&endtime=${formattedEndDate}&minmagnitude=5&minlatitude=-11&maxlatitude=6&minlongitude=95&maxlongitude=141`
    );
    return res
      .status(200)
      .json({ message: "Earthquake data", Earthquake: response.data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWeatherDataByCity,
  getWeatherDataByLatandLon,
  getEarthquakeData,
};
