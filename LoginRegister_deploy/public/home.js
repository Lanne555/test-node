import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export async function Addgrade(Gradevar) {
    try{
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
    } catch(error){
        alert("กรอกไม่ครบ");
    }

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
    window.location.href = 'login.html';
}

let CheckCreds = () => {
    if (!sessionStorage.getItem("user-creds"))
        
        window.location.href = 'login.html';
    else {
        MsgHead.innerText = `email "${UserCreds.email}" logged in`;
        GreetHead.innerText = `คุณ ${UserInfo.NameInput + "  รหัสประจำตัว " + UserInfo.StudentID} `;
        Number.innerText = `Grade : ${UserInfo.Grade}`;
    }
}

window.addEventListener('load', CheckCreds);
signoutBtn.addEventListener('click', signout);
