
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, Savegrade} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById('msg');
let Grade = document.getElementById('grade');
let GreetHead = document.getElementById('greet');
let signoutBtn = document.getElementById('signoutbutton');



let signout = ()=>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html'
}
let CheckCreds =() =>{
    if(!sessionStorage.getItem("user-creds"))
    window.location.href  = 'login.html'
    else{
        MsgHead.innerText =   `email "${UserCreds.email}" logged in`;
        GreetHead.innerText = `คุณ ${UserInfo.NameInput + "  รหัสประจำตัว " + UserInfo.StudentID} `;
        Grade.innerText = `Grade"${UserInfo.Grade}" `;
        }
}
window.addEventListener('load',CheckCreds);
signoutBtn.addEventListener('click',signout);

export function Save_grade(gradedata) {
    return Savegrade(auth, gradedata)
        .then(async (credentials) => {
            alert("Register success");
            var ref = doc(db, "UserAuthList", credentials.user.uid);

            await setDoc(ref, {
                Grade: gradedata.value  
            });
        })
        .catch(error => {
            alert(`Registration failed: ${error.message}`);
        });
}
MainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Retrieve input values
    let gradedata = document.getElementById('Grade').value;

    // Call the registerUser function
    Save_grade(gradedata);
});