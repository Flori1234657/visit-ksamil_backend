import express from "express";
import { deleteAllCache } from "../controllers/cache.controller.js";

const router = express.Router();

router.delete("/flush-all", deleteAllCache);

export default router;
