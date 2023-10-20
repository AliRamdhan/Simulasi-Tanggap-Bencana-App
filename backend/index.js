const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/config.db");
const port = process.env.PORT || 5000;
const routerAuth = require("./components/routes/router.auth");
const routerArticleCrud = require("./components/routes/router.article");
const routerScenarioCrud = require("./components/routes/router.disaster.scenario");
const routerStatisticDataAPI = require("./components/routes/router.statistic");
const routerTypeSimulationsCrud = require("./components/routes/router.simulations");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));

app.use("/api/v1", routerAuth);
app.use("/api/v1", routerArticleCrud);
app.use("/api/v1", routerScenarioCrud);
app.use("/api/v1", routerStatisticDataAPI);
app.use("/api/v1", routerTypeSimulationsCrud);

app.listen(port, () => console.log(`port connected ${port}`));
