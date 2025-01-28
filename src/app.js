import express from "express";
import cors from "cors";
import articlesRoutes from "./routes/articles.routes.js";
import attractionsRoutes from "./routes/attractions.routes.js";
import subscribeRoutes from "./routes/subscribe.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/articles", articlesRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/subscribe", subscribeRoutes);

export default app;
