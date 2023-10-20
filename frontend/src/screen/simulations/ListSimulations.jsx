import React, { useEffect, useState } from "react";
import { Footer } from "../../components/partials/Footer";
import { Header } from "../../components/partials/Header";
import "./simulations.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const ListSimulations = () => {
  const [simulations, setSimulations] = useState([]);
  const { simulasiName } = useParams();
  useEffect(() => {
    console.log(simulasiName);
    getListSimulations();
  }, []);
  const getListSimulations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/types");
      // console.log(response.data.Type);
      if (response.data.Type) {
        for (let i = 0; i < response.data.Type.length; i++) {
          if (response.data.Type[i].simulationName == simulasiName) {
            const responses = await axios.get(
              `http://localhost:5000/api/v1/disaster/all/${response.data.Type[i]._id}`
            );
            console.log(responses.data.Disaster);
            setSimulations(responses.data.Disaster);
            // console.log(response.data.Type[i]._id);
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
  };
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen p-8">
        <div className="w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-3 gap-8">
            {simulations.map((card, index) => (
              <div
                key={index}
                className="a space-y-4 text-center bg-white border-2 shadow-md rounded-xl relative"
              >
                <img
                  className="w-full h-72 mx-auto object-cover rounded-xl"
                  src={`http://localhost:5000/images/disaster/${card.disasterPicture}`}
                  alt={card.disasterTitle}
                  loading="lazy"
                  width="1000"
                  height="667"
                />
                <div className="d h-0 invisible w-full absolute top-16 left-0 p-4 bg-black bg-opacity-50 rounded-b-lg">
                  <div className="content">
                    <h4 className="text-2xl text-white mb-2">
                      {card.disasterTitle}
                    </h4>
                    <span className="block text-sm text-white">
                      {card.disasterDescription}
                    </span>
                    <Link to={`/simulasi/${card.disasterType.simulationName}/${card._id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 my-2">
                        Simulasi Sekarang
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
