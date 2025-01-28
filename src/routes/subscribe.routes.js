import express from "express";
import { subscribeToNewsletter } from "../controllers/subscribe.controller.js";

const router = express.Router();

// POST request to handle email subscriptions
router.post("/", subscribeToNewsletter);

export default router;
