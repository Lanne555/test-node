// script.js
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
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MSG = document.getElementById('name1')
let Idap = document.getElementById('stuid1')
let G41_Goal = document.getElementById('G41_Goal');



console.log(typeof Gradevar)
console.log( UserInfo.G42_Goal)

MSG.innerText = `Name : ${UserInfo.NameInput}`;      
Idap.innerText = `StudentID : ${UserInfo.StudentID}`;


export async function Addgrade(Gradevar1,Gradevar2,Gradevar3,Gradevar4,Gradevar5,Gradevar6,UniversityDB,FacultyDB,CurrentDB) {
    try{
        const UserCreds = JSON.parse(sessionStorage.getItem("user-creds")); // Move this inside the function
        const ref = doc(db, "UserAuthList", UserCreds.uid);
        await updateDoc(ref, {
            G41: Gradevar1,
            G42: Gradevar2,
            G51: Gradevar3,
            G52: Gradevar4,
            G61: Gradevar5,
            G62: Gradevar6,
            University: UniversityDB,
            Faculty: UniversityDB+"-"+FacultyDB,
            Current: Number(CurrentDB)
        });
        const docSnap = await getDoc(ref);
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
            G41_Goal: docSnap.data().G41_Goal,
            G42_Goal: docSnap.data().G42_Goal,
            University: docSnap.data().University,
            Faculty: docSnap.data().Faculty,
            Current: docSnap.data.Current
        }
        ));
        location.replace('a.html');
    } catch(error){
        alert("กรอกไม่ครบ");
    }

}

const gradeForm = document.getElementById('editgrade'); // Update this to match your form's actual ID

gradeForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    let Gradevar41 = Number(document.getElementById('gpa41').value);
    let Gradevar42 = Number(document.getElementById('gpa42').value);
    let Gradevar51 = Number(document.getElementById('gpa51').value);
    let Gradevar52 = Number(document.getElementById('gpa52').value);
    let Gradevar61 = Number(document.getElementById('gpa61').value);
    let Gradevar62 = Number(document.getElementById('gpa62').value);
    let University = document.getElementById("dropdown").value;
    let Faculty1 = document.getElementById("dropdown2").value;
    let currentterm = document.getElementById("dropdown3").value;
     Addgrade(Gradevar41,Gradevar42,Gradevar51,Gradevar52,Gradevar61,Gradevar62,University,Faculty1,currentterm);
    
});

