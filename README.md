# Visit Ksamil Backend Server

This is a simple backend server built with **Express** and **Firebase Firestore** that serves data needed to run Visit Ksamil website. The server fetches the data from Firestore and supports pagination, allowing users to request a limited number of data per request.

## Features

- **Fetch data**: Get all data stored in Firestore articles,attractions.
- **Post data**: Post subscriptions data in Firestore.
- **Pagination support**: Fetch data in pages (e.g., 3 articles per page).
- **Environment variables**: Store sensitive data like API keys and configuration securely.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express**: Web framework for Node.js to handle API routes.
- **Firebase Firestore**: NoSQL database to store articles.
- **CORS**: Middleware for enabling cross-origin requests.

## Installation

Follow these steps to set up the project locally.

1. Clone this repository:

   ```bash
   git clone https://github.com/Flori1234657/visit-ksamil_backend.git
   cd visit-ksamil_backend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a .env file in the root directory and add your Firebase configuration:

   ```bash
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id

   ```

4. Run the server locally:
   ```bash
   npm start
   ```

## API Endpoints

- **GET /articles || attractions**
- **GET /articles/paginated?limitSize=3**: Fetches articles with pagination. By specifying the limitSize query parameter, you can control how many articles are fetched per page.
- **GET /articles/paginated?limitSize=3&lastDoc=article3**: Fetches the next set of articles starting from the document with ID article3.
- **GET /articles/:id**: Fetch only a single article.
- **POST /subscribe**
- **DELETE /clear-cache/flush-all**: Clear server cache, provide also the **x-api-key** at headers

## Author -- Florian Dollani
