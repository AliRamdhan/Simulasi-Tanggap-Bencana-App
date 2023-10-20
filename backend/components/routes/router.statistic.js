const {
  getWeatherDataByCity,
  getWeatherDataByLatandLon,
  getEarthquakeData,
} = require("../controller/controller.statistic");
const router = require("express").Router();

router.get("/weather/city/:cityName", getWeatherDataByCity);
router.get("/weather/coords/:lat/:lon", getWeatherDataByLatandLon);
router.get("/earthquake", getEarthquakeData);

module.exports = router;
