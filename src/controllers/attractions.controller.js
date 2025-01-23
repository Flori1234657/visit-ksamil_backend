import { fetchPaginatedAttractions } from "../services/firestore.service.js";

export const getPaginatedAttractions = async (req, res) => {
  try {
    const { limitSize = 3, lastDocId } = req.query; // Use `lastDocId` instead of the full `lastDoc`
    const { attractions, lastDoc } = await fetchPaginatedAttractions(
      Number(limitSize),
      lastDocId
    );

    res.json({ attractions, lastDoc }); // Return attractions and the lightweight lastDoc (only the ID)
  } catch (error) {
    console.error("Error fetching paginated attractions:", error);
    res.status(500).send("Internal Server Error");
  }
};
