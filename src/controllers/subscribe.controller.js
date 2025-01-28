import { saveSubscription } from "../services/firestore.service.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Attempt to save the subscription
    const result = await saveSubscription(email);

    // If successful, return a success response
    return res
      .status(200)
      .json({ message: "Subscription successful!", result });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    // If the error is due to duplicate subscription
    if (error.message === "You are already subscribed to the newsletter.") {
      return res.status(409).json({ message: "You are already subscribed!" });
    }

    // Return a generic error response
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
