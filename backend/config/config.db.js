const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_PORT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("database was connected"));
db.on("error", () => console.log("database was connected"));

module.exports = mongoose;
