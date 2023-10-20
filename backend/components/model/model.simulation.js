const mongoose = require("mongoose");

const typeSchema = mongoose.model("typeSimulations", {
  simulationName: {
    type: String,
  },
  simulationPicture: {
    type: String,
  },
});

module.exports = typeSchema;
