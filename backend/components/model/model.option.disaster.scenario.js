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
  nextOptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "optionsScenario", // Reference to the Choice collection
    },
  ],
});

module.exports = optionSchema;
