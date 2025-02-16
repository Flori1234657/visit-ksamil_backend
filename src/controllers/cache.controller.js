import { cache } from "../app.js";

export const deleteAllCache = async (__, res) => {
  try {
    cache.flushAll(); // Clears all cached entries

    console.log("Cache successfully cleared");
    res.status(200).send("Cache successfully cleared");
  } catch (error) {
    console.log(`Cache clearing failed with the error message: ${error}`);
    res.status(500).send("Failed to clear the cache");
  }
};
