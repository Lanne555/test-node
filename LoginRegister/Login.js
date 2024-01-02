// Import statements remain the same
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCXiugat6JBWNZwzmvVUHQLD4TNuo7oVZE",
    authDomain: "aichat-405615.firebaseapp.com",
    projectId: "aichat-405615",
    storageBucket: "aichat-405615.appspot.com",
    messagingSenderId: "488569947854",
    appId: "1:488569947854:web:b5fb87aefcb7116e63b29f",
    measurementId: "G-YTZLH338LQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export function signInUser(emailInput, passwordInput) {
    return signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then(async (credentials) => {
            var ref = doc(db, "UserAuthList", credentials.user.uid);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                alert("Login success!!");
                console.log("True");
                sessionStorage.setItem("user-info", JSON.stringify({
                    StudentID: docSnap.data().StudentID,
                    NameInput: docSnap.data().NameInput,
                    Grade: docSnap.data().Grade
                }));
                alert(credentials.user.uid)
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.open('home.html', '_self');
            }
        })
        .catch((error) => {
            alert("Email or Password incorrect!!");
        });
}

// Assuming MainForm is an HTML form element with the ID "MainForm"
const MainForm = document.getElementById('MainForm');

if (MainForm) {
    MainForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        let emailInput = document.getElementById('emailInput').value;
        let passwordInput = document.getElementById('PasswordInput').value;

        // Call the signInUser function with user input
        signInUser(emailInput, passwordInput);
    });
} else {
    console.error("MainForm not found in the HTML");
}
