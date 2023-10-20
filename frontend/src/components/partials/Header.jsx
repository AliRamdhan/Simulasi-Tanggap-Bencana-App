import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="w-full h-16 flex justify-center items-center border-b-2">
      <div className="w-full text-center text-4xl font-bold">Tanggap Lab</div>
      <div className="w-full">
        <ul className="w-full flex justify-around items-center text-lg font-semibold px-16">
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <Link to={`/simulasi`}>
            <li>Simulasi</li>
          </Link>
          <Link to={`/statistik`}>
            <li>Statistik</li>
          </Link>
          <Link to={`/articles`}>
            <li>Article</li>
          </Link>          
        </ul>
      </div>
      <div></div>
    </div>
  );
};
