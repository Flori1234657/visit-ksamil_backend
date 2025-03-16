import {
  fetchPaginatedArticles,
  fetchArticleBySlug,
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

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching article by SLUG:", error);
    res.status(500).send("Internal Server Error");
  }
};
