import express from "express";
import {
  getPaginatedArticles,
  getArticleBySlug,
} from "../controllers/articles.controller.js";

const router = express.Router();

router.get("/paginated", getPaginatedArticles);
router.get("/:slug", getArticleBySlug);

export default router;
