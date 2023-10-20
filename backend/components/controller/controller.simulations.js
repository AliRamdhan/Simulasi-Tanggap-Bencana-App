const Type = require("../model/model.simulation");

const getAllTypeSimulations = async (req, res) => {
  try {
    const types = await Type.find();
    return res
      .status(200)
      .json({ message: "List All TypeSimulations", Type: types });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createOneTypeSimulations = async (req, res) => {
  const { simulationName } = req.body;
  const simulationPicture = req.file;
  try {
    const type = await new Type({
      simulationName: simulationName,
      simulationPicture: simulationPicture.filename,
    }).save();
    return res
      .status(200)
      .json({ message: "Type Simulations was created succesfully", type });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeOneTypeSimulations = async (req, res) => {
  try {
    const type = await Type.deleteOne({ _id: req.params.typeId });
    return res.status(200).json({ message: "Type was succesfully removed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTypeSimulations,
  createOneTypeSimulations,
  removeOneTypeSimulations,
};
