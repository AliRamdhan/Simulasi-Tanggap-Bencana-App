const {
  getAllListDisaster,
  getDetailsOneDisaster,
  createOneDisaster,
  getAllListOptionChoice,
  createOneOptionChoiceSchema,
  createNextOneOptionChoiceSchema,
  getDisasterOfType,
} = require("../controller/controller.disaster.scenario.crud");
const router = require("express").Router();
const upload = require("../../middleware/middleware.multer");
router.get("/disaster", getAllListDisaster);
router.get("/disaster/:disasterId", getDetailsOneDisaster);
router.get("/disaster/all/:typeId", getDisasterOfType);
router.post(
  "/disaster/create",
  upload.uploadDisaster.single("disasterPicture"),
  createOneDisaster
);
router.get("/disaster/option/all/:disasterId", getAllListOptionChoice);
router.post(
  "/disaster/option/create",
  upload.uploadOutcome.single("optionPictureOutcome"),
  createOneOptionChoiceSchema
);
router.post("/disaster/next-option/create", createNextOneOptionChoiceSchema);

module.exports = router;
