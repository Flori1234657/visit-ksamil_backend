import express from "express";
import { getPaginatedAttractions } from "../controllers/attractions.controller.js";

const router = express.Router();

router.get("/paginated", getPaginatedAttractions);

export default router;
