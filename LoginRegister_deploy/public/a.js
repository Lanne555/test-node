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
    let G41 = document.getElementById('G41');
    let MSG = document.getElementById('name')
    let Idap = document.getElementById('stuid')
    let Uni_logo = document.getElementById('uni_logo')
    let G41_Goal = document.getElementById('G41_Goal');

    let UserFac = JSON.parse(sessionStorage.getItem("user-fac"));
    let UserUni = JSON.parse(sessionStorage.getItem("user-uni"));
    let Unicall = document.getElementById('unicall');
    let Faccall = document.getElementById('faccall');
    let G42 = document.getElementById('G42');
    let G51 = document.getElementById('G51');
    let G52 = document.getElementById('G52');
    let G61 = document.getElementById('G61');
    let G62 = document.getElementById('G62');

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
                G41_Goal: docSnap.data().G41_Goal,
                University: docSnap.data().University,
                Faculty: docSnap.data().Faculty
            }));
    
    const Aref = doc(db,"University",UserInfo.University,"faculty",UserInfo.Faculty );
    const AdocSnap = await getDoc(Aref);
    console.log("True");
        sessionStorage.setItem("user-fac", JSON.stringify({
            facname: AdocSnap.data().facname
                    
        }));

    
    const Bref = doc(db,"University",UserInfo.University);
    const BdocSnap = await getDoc(Bref);
    console.log("True");
    sessionStorage.setItem("user-uni", JSON.stringify({
            uniname: BdocSnap.data().uniname,
            logo_uni: BdocSnap.data().logo_uni
                        
        }));
        

    
    
    
    
    const ApperG41 = UserInfo.G41.toFixed(2);
    const ApperG42 = UserInfo.G42.toFixed(2);
    const ApperG51 = UserInfo.G51.toFixed(2);
    const ApperG52 = UserInfo.G52.toFixed(2);
    const ApperG61 = UserInfo.G61.toFixed(2);
    const ApperG62 = UserInfo.G62.toFixed(2);
    const ApperGoal_G41 = UserInfo.G41_Goal.toFixed(2);
    
    MSG.innerText = `Name : ${UserInfo.NameInput}`;      
    Idap.innerText = `StudentID : ${UserInfo.StudentID}`;
    G41.innerText = ApperG41
    G41_Goal.innerText = ApperGoal_G41;
    G42.innerText =  ApperG42;
    G51.innerText =  ApperG51;
    G52.innerText =  ApperG52;
    G61.innerText =  ApperG61;
    G62.innerText =  ApperG62;
    Unicall.innerText = UserUni.uniname;
    Faccall.innerText = UserFac.facname;
    Uni_logo.src = UserUni.logo_uni;