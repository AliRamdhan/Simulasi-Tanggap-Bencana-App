import React, { useEffect, useState } from "react";
import { Header } from "../../components/partials/Header";
import { Footer } from "../../components/partials/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../context/API";
const simulasis = [
  {
    name: "Simulasi Bencana",
  },
  {
    name: "Simulasi Evakuasi Bencana",
  },
];
export const Simulations = () => {
  const [simulations, setSimulations] = useState([]);
  useEffect(() => {
    API.getTypeSimulations().then((data) => {
      setSimulations(data);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full h-[64vh]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-4/6">
            <div className="w-full flex justify-center items-center gap-8">
              {simulations.map((simulasi) => (
                <Link
                  to={`/simulasi/${simulasi.simulationName}`}
                  className="w-full h-56"
                >
                  <div className="w-full h-56 bg-white shadow-md border-2 rounded-xl p-4 flex justify-center items-center">
                    <div className="text-3xl font-bold">
                      {simulasi.simulationName}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
