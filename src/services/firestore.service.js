import NodeCache from "node-cache";
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
  doc,
  getDoc,
} from "firebase/firestore";
import firebaseApp from "../config/firebase.config.js";

const db = getFirestore(firebaseApp);
const cache = new NodeCache({ stdTTL: 14 * 24 * 60 * 60 }); // 14 days TTL

export const fetchPaginatedArticles = async (limitSize, lastDocId = null) => {
  const cacheKey = `paginatedArticles:${limitSize}:${lastDocId || "firstPage"}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    console.log(`Cache hit for key: ${cacheKey}`);
    return cachedResult;
  }

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
  const result = { articles, lastDoc: lastVisible ? lastVisible.id : null };

  // Cache the result
  cache.set(cacheKey, result);
  console.log(`Cache set for key: ${cacheKey}`);

  // Only return the document ID of the last document
  return result;
};

export const fetchArticleById = async (articleId) => {
  const cacheKey = `article:${articleId}`;
  const cachedArticle = cache.get(cacheKey);

  if (cachedArticle) {
    console.log(`Cache hit for key: ${cacheKey}`);
    return cachedArticle;
  }

  const articleRef = doc(db, "articles", articleId);
  const articleSnapshot = await getDoc(articleRef);

  if (!articleSnapshot.exists()) {
    return null;
  }

  const article = { id: articleSnapshot.id, ...articleSnapshot.data() };

  // Cache the article
  cache.set(cacheKey, article);
  console.log(`Cache set for key: ${cacheKey}`);

  return article;
};

export const fetchPaginatedAttractions = async (
  limitSize,
  lastDocId = null
) => {
  const cacheKey = `paginatedAttractions:${limitSize}:${
    lastDocId || "firstPage"
  }`;
  const cachedAttraction = cache.get(cacheKey);

  if (cachedAttraction) {
    console.log(`Cache hit for key: ${cacheKey}`);
    return cachedAttraction;
  }

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
  const result = { attractions, lastDoc: lastVisible ? lastVisible.id : null };

  // Cache the result
  cache.set(cacheKey, result);
  console.log(`Cache set for key: ${cacheKey}`);

  // Only return the document ID of the last document
  return result;
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
