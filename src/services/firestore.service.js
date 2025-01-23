import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
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
