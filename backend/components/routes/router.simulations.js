const {
  getAllTypeSimulations,
  createOneTypeSimulations,
  removeOneTypeSimulations,
} = require("../controller/controller.simulations");
const router = require("express").Router();
const { uploadType } = require("../../middleware/middleware.multer");
router.get("/types", getAllTypeSimulations);
router.post(
  "/types/create",
  uploadType.single("typeSimulationPicture"),
  createOneTypeSimulations
);
router.delete("/types/delete", removeOneTypeSimulations);

module.exports = router;
