const mongoose = require("mongoose");
const disasterSchema = mongoose.model("disasterScenario", {
  disasterType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "typeSimulations",
  },
  disasterTitle: {
    type: String,
    required: true,
  },
  disasterDescription: {
    type: String,
    required: true,
  },
  disasterPicture: {
    type: String,
  },
  // disasterInitialOptions: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "optionsScenario", // Reference to the Choice collection
  //   },
  // ],
});

module.exports = disasterSchema;
