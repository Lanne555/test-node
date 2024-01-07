// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDarYSGjrUUaXK3G4inO4HzPoCB0cN6GkE",
    authDomain: "ai-pdfchat.firebaseapp.com",
    databaseURL: "https://ai-pdfchat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ai-pdfchat",
    storageBucket: "ai-pdfchat.appspot.com",
    messagingSenderId: "904432794713",
    appId: "1:904432794713:web:c07566d8873ead81aac548",
    measurementId: "G-9GKQR3LJMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export function registerUser(emailInput, passwordInput, studentIDInput, nameInput) {
    return createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then(async (credentials) => {
            alert("Register success");
            var ref = doc(db, " ",credentials.user.uid);

            await setDoc(ref, {
                Email:emailInput,
                StudentID: studentIDInput,
                NameInput: nameInput,
                
            });
        })
        .catch(error => {
            alert(`Registration failed: ${error.message}`);
        });
}

MainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Retrieve input values
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('PasswordInput').value;
    let studentIDInput = document.getElementById('StudentIDInput').value;
    let nameInput = document.getElementById('NameInput').value;

    // Call the registerUser function
    registerUser(emailInput, passwordInput, studentIDInput, nameInput);
});
