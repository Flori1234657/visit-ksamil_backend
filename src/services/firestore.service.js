import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
  where,
} from "firebase/firestore";
import firebaseApp from "../config/firebase.config.js";

const db = getFirestore(firebaseApp);

export const fetchPaginatedArticles = async (limitSize, lastDocId = null) => {
  const articlesCollection = collection(db, "articles");

  let articlesQuery;

  if (lastDocId) {
    // Fetch the last document snapshot using the ID
    const lastDocSnapshot = await getDocs(
      query(articlesCollection, orderBy("createdAt", "desc"))
    );
    const lastDoc = lastDocSnapshot.docs.find((doc) => doc.id === lastDocId);

    if (lastDoc) {
      // Use the last document snapshot for pagination
      articlesQuery = query(
        articlesCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitSize)
      );
    } else {
      throw new Error("Invalid lastDocId provided");
    }
  } else {
    // First page of articles
    articlesQuery = query(
      articlesCollection,
      orderBy("createdAt", "desc"),
      limit(limitSize)
    );
  }

  const querySnapshot = await getDocs(articlesQuery);

  // Extract data and save the ID of the last document for next fetch
  const articles = [];
  querySnapshot.forEach((doc) => {
    articles.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Last document in this batch

  // Only return the document ID of the last document
  return { articles, lastDoc: lastVisible ? lastVisible.id : null };
};

export const fetchPaginatedAttractions = async (
  limitSize,
  lastDocId = null
) => {
  const attractionsCollection = collection(db, "attractions");

  let attractionsQuery;

  if (lastDocId) {
    // Fetch the last document snapshot using the ID
    const lastDocSnapshot = await getDocs(
      query(attractionsCollection, orderBy("createdAt", "desc"))
    );
    const lastDoc = lastDocSnapshot.docs.find((doc) => doc.id === lastDocId);

    if (lastDoc) {
      // Use the last document snapshot for pagination
      attractionsQuery = query(
        attractionsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(limitSize)
      );
    } else {
      throw new Error("Invalid lastDocId provided");
    }
  } else {
    // First page of attractions
    attractionsQuery = query(
      attractionsCollection,
      orderBy("createdAt", "desc"),
      limit(limitSize)
    );
  }

  const querySnapshot = await getDocs(attractionsQuery);

  // Extract data and save the ID of the last document for next fetch
  const attractions = [];
  querySnapshot.forEach((doc) => {
    attractions.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Last document in this batch

  // Only return the document ID of the last document
  return { attractions, lastDoc: lastVisible ? lastVisible.id : null };
};

export const saveSubscription = async (email) => {
  try {
    // Reference the "subscriptions" collection
    const subscriptionsCollection = collection(db, "subscriptions");

    // Check if the email already exists
    const emailQuery = query(
      subscriptionsCollection,
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      // If the email already exists, throw an error
      throw new Error("Email is already subscribed.");
    }

    // Add the email to the "subscriptions" collection
    const docRef = await addDoc(subscriptionsCollection, {
      email,
      subscribedAt: new Date().toISOString(),
    });

    return { id: docRef.id, email };
  } catch (error) {
    console.error("Error saving subscription:", error);

    // Customize the error message if the user is already subscribed
    if (error.message === "Email is already subscribed.") {
      throw new Error("You are already subscribed to the newsletter.");
    }

    throw new Error("Failed to save subscription.");
  }
};
