import express from "express";
import { getPaginatedArticles } from "../controllers/articles.controller.js";

const router = express.Router();

router.get("/paginated", getPaginatedArticles);

export default router;
