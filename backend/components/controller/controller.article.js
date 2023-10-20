const Article = require("../model/model.article");

const getAllListArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    return res
      .status(200)
      .json({ message: "List all article", Article: articles });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllListArticleByType = async (req, res) => {
  try {
    const articles = await Article.find({
      articleType: req.params.articleType,
    });
    return res
      .status(200)
      .json({ message: "List all article by type", Article: articles });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllListArticleByTopic = async (req, res) => {
  try {
    const articles = await Article.find({
      articleTopic: req.params.articleTopic,
    });
    return res
      .status(200)
      .json({ message: "List all article by topic", Article: articles });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDetailsOneArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.articleId });
    return res
      .status(200)
      .json({ message: "Details one article", Article: article });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createArticle = async (req, res) => {
  const { articleTitle, articleContent, articleType, articleTopic } = req.body;
  const articlePicture = req.file;
  try {
    const article = await new Article({
      articleTitle: articleTitle,
      articleContent: articleContent,
      articlePicture: articlePicture.filename,
      articleType: articleType,
      articleTopic: articleTopic,
    }).save();
    return res
      .status(200)
      .json({ message: "Created article was succesfully", article: article });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { articleTitle, articleContent } = req.body;
  const articlePicture = req.file;
  const updateFields = {};
  try {
    if (articleTitle) {
      updateFields.articleTitle = articleTitle;
    }
    if (articleContent) {
      updateFields.articleContent = articleContent;
    }
    if (articlePicture) {
      updateFields.articlePicture = articlePicture.filename;
    }
    if (articleType) {
      updateFields.articleType = articleType;
    }
    if (articleTopic) {
      updateFields.articleTopic = articleTopic;
    }

    const article = await Article.findOne({ _id: req.params.articleId });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const newArticle = await Article.updateOne(
      { _id: req.params.articleId },
      updateFields
    );
    return res
      .status(200)
      .json({ message: "article was updated", article: newArticle });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeArticle = async (req, res) => {
  try {
    const article = await Article.deleteOne({ _id: req.params.articleId });
    return res.status(200).json({ message: "article was remove successfull" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllListArticle,
  getAllListArticleByType,
  getAllListArticleByTopic,
  getDetailsOneArticle,
  createArticle,
  updateArticle,
  removeArticle,
};
