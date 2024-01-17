    // script.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, doc, updateDoc, getDoc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

    let Botres =document.getElementById('botres');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const analytics = getAnalytics(app);
    let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    let MSG = document.getElementById('name')
    let Idap = document.getElementById('stuid')
    let Uni_logo = document.getElementById('uni_logo')
    let Check_R1 = document.getElementById('check_r1')
    let Check_R2 = document.getElementById('check_r2')
    let Check_R3 = document.getElementById('check_r3')
    let UserFac = JSON.parse(sessionStorage.getItem("user-fac"));
    let UserUni = JSON.parse(sessionStorage.getItem("user-uni"));
    let Unicall = document.getElementById('unicall');
    let Faccall = document.getElementById('faccall');
    let G41 = document.getElementById('G41');
    let G42 = document.getElementById('G42');
    let G51 = document.getElementById('G51');
    let G52 = document.getElementById('G52');
    let G61 = document.getElementById('G61');
    let G41_Goal = document.getElementById('G41_Goal');
    let G42_Goal = document.getElementById('G42_Goal');
    let G51_Goal = document.getElementById('G51_Goal');
    let G52_Goal = document.getElementById('G52_Goal');
    let G61_Goal = document.getElementById('G61_Goal');
    let Currentpage = document.getElementById('current');
    let G62 = document.getElementById('G62');
    let R1gpax = document.getElementById('R1gpax');
    let R2gpax = document.getElementById('R2gpax');
    let R3gpax = document.getElementById('R3gpax');
    let Compare = document.getElementById('compare');
    let signoutBtn = document.getElementById('signout');
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
                Current: docSnap.data().Current,
                G41_Goal: docSnap.data().G41_Goal,
                University: docSnap.data().University,
                Faculty: docSnap.data().Faculty,
        
            }));
           
    let zerocount =0;
    if (UserInfo.G41 == 0) {
         zerocount=zerocount+1};
    if (UserInfo.G42 == 0) {zerocount=zerocount+1};
    if (UserInfo.G51 == 0) {zerocount=zerocount+1};
    if (UserInfo.G52 == 0){zerocount=zerocount+1};
    if (UserInfo.G61 == 0) {zerocount=zerocount+1};
    if (UserInfo.G62 == 0) {zerocount=zerocount+1};

    //console.log(UserUni.uniname)
  
    try{
    const Aref = doc(db,"University",UserInfo.University,"faculty",UserInfo.Faculty );
    const AdocSnap = await getDoc(Aref);
    console.log("True");
    sessionStorage.setItem("user-fac", JSON.stringify({
            facname: AdocSnap.data().facname,
            R1: AdocSnap.data().R1,
            R2: AdocSnap.data().R2,
            R3: AdocSnap.data().R3
        }));
    }catch(error){
        alert("ข้อมูลไม่ถูกต้อง กรุณาเลือกเป้าหมายให้คณะและมหาวิทยาลัยสัมพันธ์กัน")
        location.replace('b.html');
    }
    
    const Bref = doc(db,"University",UserInfo.University);
    const BdocSnap = await getDoc(Bref);
    console.log(UserFac.R1)
    sessionStorage.setItem("user-uni", JSON.stringify({
            uniname: BdocSnap.data().uniname,
            logo_uni: BdocSnap.data().logo_uni
                        
        }));
  
    let x = (((5 * UserFac.R1)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
    let gpax = ((UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61)/UserInfo.Current).toFixed(2);
    if(x=='-Infinity'|| x =='Infinity' ){
        alert("ข้อมูลไม่ถูกต้อง กรุณากรอกเกรดตามจำนวนที่มีอยู่")
        Currentpage.innerText = `GPAX ปัจจุบันผิดพลาด`;
        location.replace('b.html');
    }else{
        Currentpage.innerText = `GPAX ปัจจุบัน : `+gpax;
    }
    const ApperG41 = UserInfo.G41.toFixed(2);
    const ApperG42 = UserInfo.G42.toFixed(2);
    const ApperG51 = UserInfo.G51.toFixed(2);
    const ApperG52 = UserInfo.G52.toFixed(2);
    const ApperG61 = UserInfo.G61.toFixed(2);
    const ApperG62 = UserInfo.G62.toFixed(2);
    const ApperR1 = UserFac.R1.toFixed(2);
    const ApperR2 = UserFac.R2.toFixed(2);
    const ApperR3 = UserFac.R3.toFixed(2);
    const compareing =x;
    
    
    MSG.innerText = `Name : ${UserInfo.NameInput}`;      
    Idap.innerText = `StudentID : ${UserInfo.StudentID}`;
    G41.innerText = ApperG41
   
    
console.log(UserInfo.Current) 
if(UserInfo.Current==5){
    G61_Goal.innerText = 'ได้รับแล้ว'
    G52_Goal.innerText = 'ได้รับแล้ว'
    G51_Goal.innerText = 'ได้รับแล้ว'
    G42_Goal.innerText = 'ได้รับแล้ว'
    G41_Goal.innerText = 'ได้รับแล้ว'    
}else if(UserInfo.Current==4){
        G61_Goal.innerText = x;
        G52_Goal.innerText = 'ได้รับแล้ว'
        G51_Goal.innerText = 'ได้รับแล้ว'
        G42_Goal.innerText = 'ได้รับแล้ว'
        G41_Goal.innerText = 'ได้รับแล้ว'
        
}else if(UserInfo.Current==3){
        G61_Goal.innerText = x;
        G52_Goal.innerText = x;
        G51_Goal.innerText = 'ได้รับแล้ว'
        G42_Goal.innerText = 'ได้รับแล้ว'
        G41_Goal.innerText = 'ได้รับแล้ว'
        
}else if(UserInfo.Current==2){
        G61_Goal.innerText = x;
        G52_Goal.innerText = x;
        G51_Goal.innerText = x;
        G42_Goal.innerText = 'ได้รับแล้ว'
        G41_Goal.innerText = 'ได้รับแล้ว'
        
}else{
        G61_Goal.innerText = x;
        G52_Goal.innerText = x;
        G51_Goal.innerText = x;
        G42_Goal.innerText = x; 
        G41_Goal.innerText = 'ได้รับแล้ว'
      
}

//CHECK 
if (gpax >= UserFac.R1){
    Check_R1.innerText= "Yes"; 
}else{
    Check_R1.innerText='No';
}
if (gpax >= UserFac.R2){
    Check_R2.innerText= "Yes"; 
}else{
    Check_R2.innerText='No';
}
if (gpax >= UserFac.R1){
    Check_R3.innerText= "Yes"; 
}else{
    Check_R3.innerText='No';
}
    Currentpage.innerText = `GPAX ปัจจุบัน`+gpax;
    G42.innerText =  ApperG42;
    G51.innerText =  ApperG51;
    G52.innerText =  ApperG52;
    G61.innerText =  ApperG61;
    G62.innerText =  ApperG62;
    Unicall.innerText = UserUni.uniname;
    Faccall.innerText = `คณะ ${UserFac.facname}`;  
    Uni_logo.src = UserUni.logo_uni;
    Check_R1.src = 
    R1gpax.innerText = ApperR1;
    R2gpax.innerText = ApperR2;
    R3gpax.innerText = ApperR3;
    Compare.innerText = 'เกรดเทอมถัดไป = '+compareing;
    Compare.style.color ='gold'
    //HumanQ.innerHTML =`User : ${UserAi.text}`;  
    //Botres.innerHTML = `AI : ${UserAi.summary}`  
    
// Add this function to your existing JavaScript code
function changeTextColorBasedOnGoal(actualGPA, goalGPA, goalElement) {
    if (actualGPA > goalGPA) {
        goalElement.style.color = ' greenyellow'; // Change to green if goal achieved
    } else if(actualGPA == goalGPA) {
        goalElement.style.color = 'yellow';   // Change to red if goal not achieved
    }else if((actualGPA-goalGPA)>=-0.5){
        goalElement.style.color='orange';
    }else{
        goalElement.style.color='red';
    }
}

// Usage of the function for each goal
changeTextColorBasedOnGoal(UserInfo.G41,x,G41);
changeTextColorBasedOnGoal(UserInfo.G42,x,G42);
changeTextColorBasedOnGoal(UserInfo.G51,x,G51);
changeTextColorBasedOnGoal(UserInfo.G52,x,G52);
changeTextColorBasedOnGoal(UserInfo.G61,x, G61);
changeTextColorBasedOnGoal(UserInfo.G62,x, G62);
let signout1 = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'Login.html';
}
signoutBtn.addEventListener('click', signout1);
