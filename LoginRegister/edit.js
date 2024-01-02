import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export async function Addgrade(Gradevar) {
    alert("Grade fun");
    const UserCreds = JSON.parse(sessionStorage.getItem("user-creds")); // Move this inside the function
    const ref = doc(db, "UserAuthList", UserCreds.uid);
    await updateDoc(ref, {
        Grade: Gradevar
    });
    const docSnap = await getDoc(ref);
    sessionStorage.setItem("user-info", JSON.stringify({
        StudentID: docSnap.data().StudentID,
        NameInput: docSnap.data().NameInput,
        Grade: docSnap.data().Grade
    }));
    window.location.href = 'home.html';
}

const gradeForm = document.getElementById('gradeForm'); // Update this to match your form's actual ID

gradeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let Gradevar = document.getElementById('GradeInput').value;
    Addgrade(Gradevar);
});

let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById('msg');
let GreetHead = document.getElementById('greet');
let Number = document.getElementById('number');
let signoutBtn = document.getElementById('signoutbutton');

let signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'edit.html';
}

let CheckCreds = () => {
    if (!sessionStorage.getItem("user-creds")){
        window.location.href = 'login.html';
        console.log("No user")
    }
    else {
        Number.innerText = `Grade : ${UserInfo.Grade}`;
    }
    }


window.addEventListener('load', CheckCreds);
