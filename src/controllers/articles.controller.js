import {
  fetchPaginatedArticles,
  fetchArticleById,
} from "../services/firestore.service.js";

export const getPaginatedArticles = async (req, res) => {
  try {
    const { limitSize = 3, lastDocId } = req.query; // Use `lastDocId` instead of the full `lastDoc`
    const { articles, lastDoc } = await fetchPaginatedArticles(
      Number(limitSize),
      lastDocId
    );

    res.json({ articles, lastDoc }); // Return articles and the lightweight lastDoc (only the ID)
  } catch (error) {
    console.error("Error fetching paginated articles:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await fetchArticleById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};
