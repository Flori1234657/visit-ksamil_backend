import express from "express";
import NodeCache from "node-cache";
import cors from "cors";
import articlesRoutes from "./routes/articles.routes.js";
import attractionsRoutes from "./routes/attractions.routes.js";
import subscribeRoutes from "./routes/subscribe.routes.js";
import cacheRoutes from "./routes/cache.routes.js";

const app = express();
export const cache = new NodeCache({ stdTTL: 14 * 24 * 60 * 60 }); // 14 days TTL

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/articles", articlesRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/subscribe", subscribeRoutes);
app.use("/clear-cache", cacheRoutes);

export default app;
