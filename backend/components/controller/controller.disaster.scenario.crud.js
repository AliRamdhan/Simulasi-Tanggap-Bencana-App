const Disaster = require("../model/model.disaster.scenario");
const OptionScenario = require("../model/model.option.disaster.scenario");
const Type = require("../model/model.simulation");

const getAllListDisaster = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    return res
      .status(200)
      .json({ message: "List All Disaster", Disaster: disasters });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDisasterOfType = async (req, res) => {
  try {
    const disaster = await Disaster.find({
      disasterType: req.params.typeId,
    }).populate("disasterType");
    return res
      .status(200)
      .json({ message: "List disasters by type", Disaster: disaster });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDetailsOneDisaster = async (req, res) => {
  try {
    const disaster = await Disaster.findById(req.params.disasterId);
    return res
      .status(200)
      .json({ message: "Details disaster", DisasterDetails: disaster });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createOneDisaster = async (req, res) => {
  const { disasterTitle, disasterDescription, disasterType } = req.body;
  const disasterPicture = req.file;
  try {
    const disasterExist = await Disaster.findOne({
      disasterTitle: disasterTitle,
    });
    if (disasterExist) {
      return res.status(201).json({ message: "Disaster title have used" });
    }
    const disasterTypeSimulations = await Type.findOne({
      _id: disasterType,
    });
    if (!disasterTypeSimulations) {
      return res
        .status(404)
        .json({ message: "Disaster type simulations not found" });
    }
    const disaster = await new Disaster({
      disasterTitle: disasterTitle,
      disasterDescription: disasterDescription,
      disasterPicture: disasterPicture.filename,
      disasterType: disasterTypeSimulations,
    }).save();

    // if (disasterInitialOptions) {
    //   const disasterInitialOptionsExist = await OptionScenario.findOne({
    //     _id: disasterInitialOptions,
    //   });
    //   if (!disasterInitialOptionsExist) {
    //     return res.status(404).json({ message: "Option was not found" });
    //   } else {
    //     disaster.disasterInitialOptions = disasterInitialOptions;
    //     await disaster.save();
    //   }
    // }
    return res.status(200).json({
      message: "Disaster was created succesfully",
      Disaster: disaster,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllListOptionChoice = async (req, res) => {
  try {
    const optionChoice = await OptionScenario.find({
      optionDisaster: req.params.disasterId,
    }).populate("nextOptions", "optionText");
    return res
      .status(200)
      .json({ message: "List Option Choice All", OptionChoice: optionChoice });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createOneOptionChoiceSchema = async (req, res) => {
  const { optionText, optionTextOutcome, optionDisaster } = req.body;
  const optionPictureOutcome = req.file;
  try {
    const disaster = await Disaster.findOne({ _id: optionDisaster });
    if (!disaster) {
      res.status(404).json({ message: "Disaster not found" });
    }
    const options = await new OptionScenario({
      optionText: optionText,
      optionTextOutcome: optionTextOutcome,
      optionPictureOutcome: optionPictureOutcome.filename,
      optionDisaster: disaster,
    }).save();
    return res.status(200).json({
      message: "Option scenario created succesfully",
      options: options,
    });
  } catch (error) {
    return res.status(400).json({ erorr: error.message });
  }
};

const createNextOneOptionChoiceSchema = async (req, res) => {
  const { optionId, nextOptionId } = req.body;
  try {
    // Find the option document based on the provided optionId
    const option = await OptionScenario.findById(optionId);
    const nextOption = await OptionScenario.findById(nextOptionId);
    if (!option) {
      return res.status(404).json({ error: "Option not found" });
    }
    if (!nextOption) {
      return res.status(404).json({ error: "Next Option not found" });
    }
    option.nextOptions.push(nextOption);
    // Save the updated original option
    await option.save();

    return res
      .status(200)
      .json({ message: "Next choice added successfully", Option: option });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllListDisaster,
  getDetailsOneDisaster,
  createOneDisaster,
  getAllListOptionChoice,
  createOneOptionChoiceSchema,
  createNextOneOptionChoiceSchema,
  getDisasterOfType,
};
