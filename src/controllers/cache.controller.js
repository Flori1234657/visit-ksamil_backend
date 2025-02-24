import { cache } from "../app.js";

const API_KEY = process.env.CACHE_CLEAR_API_KEY || "your-secret-key";

export const deleteAllCache = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== API_KEY)
      return res.status(403).send("Forbidden: Invalid API Key");

    cache.flushAll(); // Clears all cached entries

    console.log("Cache successfully cleared");
    res.status(200).send("Cache successfully cleared");
  } catch (error) {
    console.log(`Cache clearing failed with the error message: ${error}`);
    res.status(500).send("Failed to clear the cache");
  }
};
