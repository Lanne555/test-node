// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXiugat6JBWNZwzmvVUHQLD4TNuo7oVZE",
    authDomain: "aichat-405615.firebaseapp.com",
    projectId: "aichat-405615",
    storageBucket: "aichat-405615.appspot.com",
    messagingSenderId: "488569947854",
    appId: "1:488569947854:web:b5fb87aefcb7116e63b29f",
    measurementId: "G-YTZLH338LQ"
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
            var ref = doc(db, "UserAuthList", credentials.user.uid);

            await setDoc(ref, {
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
