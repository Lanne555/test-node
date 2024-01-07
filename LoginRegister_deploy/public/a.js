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
    let UserAi = " ";



    let Botres =document.getElementById('botres');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const analytics = getAnalytics(app);
    let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
    let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
    UserAi = JSON.parse(sessionStorage.getItem("user-ai"));
    let G41 = document.getElementById('G41');
    let MSG = document.getElementById('name')
    let Idap = document.getElementById('stuid')
    let Uni_logo = document.getElementById('uni_logo')
    let HumanQ = document.getElementById('userQ');
    let UserFac = JSON.parse(sessionStorage.getItem("user-fac"));
    let UserUni = JSON.parse(sessionStorage.getItem("user-uni"));
    let Unicall = document.getElementById('unicall');
    let Faccall = document.getElementById('faccall');
    let G42 = document.getElementById('G42');
    let G51 = document.getElementById('G51');
    let G52 = document.getElementById('G52');
    let G61 = document.getElementById('G61');
    let G62 = document.getElementById('G62');
    let Aisubmit = document.getElementById('aichat');

    console.log(UserAi)
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
    
        export async function Sendmessage(Humantext){
        const UserCreds = JSON.parse(sessionStorage.getItem("user-creds")); 
        const Sref = doc(db,"blog",UserCreds.uid)
        let Ans =""
        await setDoc(Sref, {
            text: Humantext            
        
        });
        sessionStorage.setItem("user-ai", JSON.stringify({
            text: Humantext
            
        }));
      
        const SdocSnap = await getDoc(Sref);
        Ans = SdocSnap.data()
        console.log(Ans)
        location.reload();
        }          
    
    
    
    
    Aisubmit.addEventListener('submit',(evt) => {
        evt.preventDefault();
        let Htext = document.getElementById('humantext').value  ;
        Sendmessage(Htext);
    
        });
    
    const ApperG41 = UserInfo.G41.toFixed(2);
    const ApperG42 = UserInfo.G42.toFixed(2);
    const ApperG51 = UserInfo.G51.toFixed(2);
    const ApperG52 = UserInfo.G52.toFixed(2);
    const ApperG61 = UserInfo.G61.toFixed(2);
    const ApperG62 = UserInfo.G62.toFixed(2);
    
    MSG.innerText = `Name : ${UserInfo.NameInput}`;      
    Idap.innerText = `StudentID : ${UserInfo.StudentID}`;
    G41.innerText = ApperG41
   
    G42.innerText =  ApperG42;
    G51.innerText =  ApperG51;
    G52.innerText =  ApperG52;
    G61.innerText =  ApperG61;
    G62.innerText =  ApperG62;
    Unicall.innerText = UserUni.uniname;
    Faccall.innerText = `คณะ ${UserFac.facname}`;  
    Uni_logo.src = UserUni.logo_uni;
    HumanQ.innerHTML =`User : ${UserAi.text}`;     
  
  