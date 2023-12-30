import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const port = 3000;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXiugat6JBWNZwzmvVUHQLD4TNuo7oVZE",
  authDomain: "aichat-405615.firebaseapp.com",
  projectId: "aichat-405615",
  storageBucket: "aichat-405615.appspot.com",
  messagingSenderId: "488569947854",
  appId: "1:488569947854:web:b5fb87aefcb7116e63b29f",
  measurementId: "G-YTZLH338LQ"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, "./web_file/")));

app.get("/", (req, res) => {
  res.send('error');
});

app.listen(port, () => {
  console.log(chalk.green("listening on port %d", port));
});

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'profile_user');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

// Call the asynchronous function inside an async block or function
(async () => {
  const citiesCol = await getCities(db);
  console.log(citiesCol);
})();
