// Import statements remain the same
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

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
                
                console.log("True");
                sessionStorage.setItem("user-info", JSON.stringify({
                    StudentID: docSnap.data().StudentID,
                    NameInput: docSnap.data().NameInput,
                    Grade: docSnap.data().Grade,
                    G41: docSnap.data().G41,
                    G42: docSnap.data().G42,
                    G51: docSnap.data().G51,
                    G52: docSnap.data().G52,
                    G61: docSnap.data().G61,
                    G62: docSnap.data().G62,
                }));
                
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                location.replace('a.html');
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
