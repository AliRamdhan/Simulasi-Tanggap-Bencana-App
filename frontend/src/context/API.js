import axios from "axios";
export const API = {
  getArticles: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/articles");
      return response.data.Article;
    } catch (error) {
      return error.message;
    }
  },
  getArticlesByTopic : async (articleTopic) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/articles/topic/${articleTopic}`
      );
      return response.data.Article;
    } catch (error) {
      return error.message;
    }
  },
  getArticlesByType: async (articleType) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/articles/type/${articleType}`
      );
      return response.data.Article;
    } catch (error) {
      return error.message;
    }
  },
  getDetailOneArticles: async (articleId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/articles/${articleId}`
      );
      return response.data.Article;
    } catch (error) {
      return error.message;
    }
  },
  getTypeSimulations: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/types");
      return response.data.Type;
    } catch (error) {
      return error.message;
    }
  },
  getListSimulations: async (simulasiName) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/types");
      // console.log(response.data.Type);
      if (response.data.Type) {
        for (let i = 0; i < response.data.Type.length; i++) {
          if (response.data.Type[i].simulationName == simulasiName) {
            const responses = await axios.get(
              `http://localhost:5000/api/v1/disaster/all/${response.data.Type[i]._id}`
            );
            return responses.data.Disaster;
          } else {
            console.log("simulation not any");
          }
        }
      } else {
        console.log("type not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getSimulationsDetails: async (simulationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/disaster/${simulationId}`
      );
      return response.data.DisasterDetails;
    } catch (error) {
      return error.message;
    }
  },
  getWeatherData3rdPartybyCityName: async (cityName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/weather/city/${cityName}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
  getWeatherData3rdPartybyLotandLan: async (lat, lon) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/weather/coords/${lat}/${lon}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
  getEarthquakeData3rdParty: async (startDate, endDate) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/earthquake",
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
};
