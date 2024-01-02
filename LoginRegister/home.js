import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc ,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

export  async function  Addgrade(Gradevar) {
    alert("Grade fun");
    //return createUserWithEmailAndPassword(auth, Gradevar)
    const ref = doc(db, "UserAuthList", UserCreds.uid);
    await updateDoc(ref, {
        Grade: Gradevar
      });
      const docSnap = await getDoc(ref);
      //alert("Grade Success Refresh now!")
      sessionStorage.setItem("user-info", JSON.stringify({
        StudentID: docSnap.data().StudentID,
        NameInput: docSnap.data().NameInput,
        Grade: docSnap.data().Grade
    }
    ));
    window.location.href  = 'home.html'
    
}
const gardebutton = document.getElementById('gardebutton');
    
gardebutton.addEventListener('click', () => {
    // Retrieve input value when gardebutton is pressed
    let Gradevar = document.getElementById('GradeInput').value;
    alert("Press")
    // Call the Addgrade function with the retrieved value
    Addgrade(Gradevar);
});
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById('msg');
let GreetHead = document.getElementById('greet');
let Number = document.getElementById('number');
let signoutBtn = document.getElementById('signoutbutton');
let gradeinputBtn = document.getElementById('gardebutton');
let signout = ()=>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html'
}
//let gradeBtn =()=>{
//    let user = firebase.auth().currentUser;    
  //  console.log(user);
   // if (user) {
    //    console.log(db.collection("UserAuthList").doc(user.uid))
    //} else {
      //  alert('user not logged in')
    //}
//}
let CheckCreds =() =>{
    if(!sessionStorage.getItem("user-creds"))
    window.location.href  = 'login.html'
    else{
        MsgHead.innerText =   `email "${UserCreds.email}" logged in`;
        GreetHead.innerText = `คุณ ${UserInfo.NameInput + "  รหัสประจำตัว " + UserInfo.StudentID} `;
        Number.innerText = `Grade : ${UserInfo.Grade}`;
    }
}
window.addEventListener('load',CheckCreds);
signoutBtn.addEventListener('click',signout);
