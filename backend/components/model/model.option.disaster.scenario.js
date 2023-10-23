const mongoose = require("mongoose");

const optionSchema = mongoose.model("optionsScenario", {
  optionText: {
    type: String,
    required: true,
  },
  optionTextOutcome: {
    type: String,
  },
  optionPictureOutcome: {
    type: String,
  },
  optionDisaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "disasterScenario", // Reference to the Choice collection
  },
  nextOptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "optionsScenario", // Reference to the Choice collection
    },
  ],
});

module.exports = optionSchema;
