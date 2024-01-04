// script.js
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
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));


const ref = doc(db, "UserAuthList", UserCreds.uid);
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
        }));
function assignColorBasedOnGPA(gpa) {
    // Round GPA to two decimal places
    const roundedGPA = Math.round(gpa * 100) / 100;

    if (roundedGPA >= 3.50) {
        return 'grade-A';
    } else if (roundedGPA >= 3.00) {
        return 'grade-B';
    } else {
        return 'grade-C';
    }
}

function createGpaTable(containerId, gpaData) {
    const table = document.getElementById(containerId);

    for (const grade in gpaData) {
        if (gpaData.hasOwnProperty(grade)) {
            const gpaTerm1 = parseFloat(gpaData[grade].term1.toFixed(2));
            const gpaTerm2 = parseFloat(gpaData[grade].term2.toFixed(2));

            const colorClassTerm1 = assignColorBasedOnGPA(gpaTerm1);
            const colorClassTerm2 = assignColorBasedOnGPA(gpaTerm2);

            const row = document.createElement('tr');
            row.innerHTML = `<td>${grade}</td><td class="${colorClassTerm1}">${gpaTerm1}</td><td class="${colorClassTerm2}">${gpaTerm2}</td>`;

            table.querySelector('tbody').appendChild(row);
        }
    }
}

// GPA data for each grade
const gpaData = {
    'Grade 10': { term1: UserInfo.G41, term2: UserInfo.G42 },
    'Grade 11': { term1: UserInfo.G51, term2: UserInfo.G52 },
    'Grade 12': { term1: UserInfo.G61, term2: UserInfo.G62 }
    // Add more grades and their corresponding GPA data as needed
};


// Call the function to create the GPA table
createGpaTable('grade-table', gpaData);
