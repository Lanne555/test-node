// Import necessary modules
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

// Initialize the Firebase app with the configuration
const app = initializeApp({
  credential: cert(require("aichat-405615-firebase-adminsdk-7nhii-74930c2155.json")),
  ...firebaseConfig
});

// Get a Firestore instance
const db = getFirestore(app);

// Define the function to add a document to the "cities" collection
async function clickf() {
  try {
    // Data to be added to the document
    const data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };

    // Add a new document in the "cities" collection with ID 'LA'
    const res = await db.collection('cities').doc('LA').set(data);

    console.log('Document added successfully:', res);
  } catch (error) {
    console.error('Error adding document:', error);
  }
}

