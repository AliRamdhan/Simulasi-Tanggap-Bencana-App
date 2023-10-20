const {
  getAllListArticle,
  getAllListArticleByType,
  getAllListArticleByTopic,
  getDetailsOneArticle,
  createArticle,
  updateArticle,
  removeArticle,
} = require("../controller/controller.article");
const router = require("express").Router();
const { uploadArticle } = require("../../middleware/middleware.multer");
router.get("/articles", getAllListArticle);
router.get("/articles/:articleId", getDetailsOneArticle);
router.get("/articles/type/:articleType", getAllListArticleByType);
router.get("/articles/topic/:articleTopic", getAllListArticleByTopic);
router.post(
  "/articles/create",
  uploadArticle.single("articlePicture"),
  createArticle
);
router.patch(
  "/articles/update/:articleId",
  uploadArticle.single("articlePicture"),
  updateArticle
);
router.delete("/articles/remove/:articleId", removeArticle);

module.exports = router;
