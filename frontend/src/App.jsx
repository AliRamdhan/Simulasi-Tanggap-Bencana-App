import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./screen/Welcome";
import { ArticleAll } from "./screen/ArticleAll";
import { ArticleDetails } from "./screen/ArticleDetails";
import { ArticleAllType } from "./screen/ArticleAllType";
import { ArticleAllTopic } from "./screen/ArticleAllTopic";
import { Evacuation } from "./screen/Evacuation";
import { GuideEvacuation } from "./screen/GuideEvacuation";
import { Simulations } from "./screen/simulations/Simulations";
import { ListSimulations } from "./screen/simulations/ListSimulations";
import { DetailsSimulations } from "./screen/simulations/DetailsSimulations";
import Data from "./screen/DataStatistik";
import PlaySimulations from "./screen/simulations/PlaySimulations";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/articles" element={<ArticleAll />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
        <Route
          path="/articles/type/:articleType"
          element={<ArticleAllType />}
        />
        <Route
          path="/articles/topic/:articleTopic"
          element={<ArticleAllTopic />}
        />
        <Route path="/evakuasi" element={<Evacuation />} />
        <Route path="/guide/:disasterId" element={<GuideEvacuation />} />
        <Route path="/simulasi" element={<Simulations />} />
        <Route path="/simulasi/:simulasiName" element={<ListSimulations />} />
        <Route
          path="/simulasi/:simulasiName/:simulasiId"
          element={<DetailsSimulations />}
        />
        <Route
          path="/play/:simulasiName/:simulasiId"
          element={<PlaySimulations />}
        />
        {/* <Route path="" element={<Statistik />} /> */}
        <Route path="/statistik" element={<Data />} />
      </Routes>
    </Router>
  );
}
