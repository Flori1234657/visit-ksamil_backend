import express from "express";
import {
  getPaginatedArticles,
  getArticleById,
} from "../controllers/articles.controller.js";

const router = express.Router();

router.get("/paginated", getPaginatedArticles);
router.get("/:id", getArticleById);

export default router;
