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
    const ctx = document.getElementById('myChart');
    
    function empty(a) {
        return a === 0 ? null : a;
    }
    
   
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
            let SHEET_ID = '1GAHSaMvzSp6-GeIIJc8rZdz99peBoo0Qu8CBOy70euU';
            let SHEET_TITLE = 'university';
            let SHEET_RANGE = 'A1:E115';
            let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;
            let Logo_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${'logo'}&range=${'A2:I4'}`;
            let R1_grade, R2_grade, R3_grade; // Declare variables in a higher scope
            
            fetch(FULL_URL)
                .then(res => res.text())
                .then(rep => {
                    let data = JSON.parse(rep.substr(47).slice(0, -2));
                    // Assign values to the variables in the higher scope
                    ({ R1_grade, R2_grade, R3_grade } = populateDropdowns(data));
                    comparedisplay(R1_grade, R2_grade, R3_grade )
                    console.log(R1_grade);
                });
            
            function populateDropdowns(data) {
                var filteredData = data.table.rows.filter(row => row.c[0].v === UserInfo.University && row.c[1].v === UserInfo.Faculty);
            
                let R1_grade = filteredData.length > 0 ? filteredData[0].c[2].v : '';
                let R2_grade = filteredData.length > 0 ? filteredData[0].c[3].v : '';
                let R3_grade = filteredData.length > 0 ? filteredData[0].c[4].v : '';
            
                return { R1_grade, R2_grade, R3_grade };
            }
            
            // Access the variables here, outside of the fetch block
            function comparedisplay(R1,R2,R3){
                let x = (((5 * R1_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
                let gpax = ((UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61)/UserInfo.Current).toFixed(2);
                Currentpage.innerText = `GPAX ปัจจุบัน`+gpax;
                changeTextColorBasedOnGoal(UserInfo.G41,x,G41);
                changeTextColorBasedOnGoal(UserInfo.G42,x,G42);
                changeTextColorBasedOnGoal(UserInfo.G51,x,G51);
                changeTextColorBasedOnGoal(UserInfo.G52,x,G52);
                changeTextColorBasedOnGoal(UserInfo.G61,x, G61);
                changeTextColorBasedOnGoal(UserInfo.G62,x, G62);
                Compare.innerText = 'เกรดเทอมถัดไป = '+x;
                if (gpax >= R1_grade){
                    Check_R1.innerText= "Yes"; 
                }else{
                    Check_R1.innerText='No';
                }
                if (gpax >= R2_grade){
                    Check_R2.innerText= "Yes"; 
                }else{
                    Check_R2.innerText='No';
                }
                if (gpax >= R3_grade){
                    Check_R3.innerText= "Yes"; 
                }else{
                    Check_R3.innerText='No';
                }    
                if(x=='-Infinity'|| x =='Infinity' ){
                    alert("ข้อมูลไม่ถูกต้อง กรุณากรอกเกรดตามจำนวนที่มีอยู่")
                    Currentpage.innerText = `GPAX ปัจจุบันผิดพลาด`;
                    location.replace('b.html');
                }else{
                    Currentpage.innerText = `GPAX ปัจจุบัน : `+gpax;
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
                    
                }
                let y = (((5 * R1_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
                let w = (((5 * R2_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
                let e = (((5 * R3_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);// You can change this to any constant value you want.
                const constantNumber = y;
                const constantNumber1 = w;
                const constantNumber2 = e;
                const data = {
                    labels: ['ม.4 เทอม1', 'ม.4 เทอม2', 'ม.5 เทอม1', 'ม.5 เทอม2', 'ม.6 เทอม1', 'ม.6 เทอม2'],
                    datasets: [
                        {
                            label: 'GPA',
                            data: [
                                empty(UserInfo.G41),
                                empty(UserInfo.G42),
                                empty(UserInfo.G51),
                                empty(UserInfo.G52),
                                empty(UserInfo.G61),
                                empty(UserInfo.G62),
                            ],
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            pointStyle: 'circle',
                            pointRadius: 10,
                            pointHoverRadius: 15,
                        },
                        {
                            label: 'เทอมถัดไปPortfolio',
                            data: Array(6).fill(constantNumber), // Creates an array with constantNumber repeated 6 times
                            borderColor: 'green',
                            fill: false,
                            borderDash: [5, 5], // Optional: makes the line dashed
                        },
                        {
                            label: 'เทอมถัดไปQuota',
                            data: Array(6).fill(constantNumber1), // Creates an array with constantNumber repeated 6 times
                            borderColor: 'blue',
                            fill: false,
                            borderDash: [20, 20], // Optional: makes the line dashed
                        },
                        {
                            label: 'เทอมถัดไปAdmission',
                            data: Array(6).fill(constantNumber2), // Creates an array with constantNumber repeated 6 times
                            borderColor: 'purple',
                            fill: false,
                            borderDash: [40, 40], // Optional: makes the line dashed
                        },
                    ],
                };
                
                new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 4,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'พัฒนาการของเกรด',
                                
                            }
                        }
                    }
                });
                
                const ApperR1 = R1.toFixed(2);
                const ApperR2 = R2.toFixed(2);
                const ApperR3 = R3.toFixed(2);
                R1gpax.innerText = ApperR1;
                R2gpax.innerText = ApperR2;
                R3gpax.innerText = ApperR3;
            }
        fetch(Logo_URL)
        .then(res => res.text())
        .then(rep => {
          let data = JSON.parse(rep.substr(47).slice(0,-2));
          console.log(data)
            Univer_logo(data)
        });
        function Univer_logo(data){
            var filteredData = data.table.rows.filter(row => row.c[0].v === UserInfo.University);
            
            let Uni_img = filteredData.length > 0 ? filteredData[0].c[1].v : '';
            Uni_logo.src = Uni_img;
            
        }
    let zerocount =0;
    if (UserInfo.G41 == 0) {
         zerocount=zerocount+1};
    if (UserInfo.G42 == 0) {zerocount=zerocount+1};
    if (UserInfo.G51 == 0) {zerocount=zerocount+1};
    if (UserInfo.G52 == 0){zerocount=zerocount+1};
    if (UserInfo.G61 == 0) {zerocount=zerocount+1};
    if (UserInfo.G62 == 0) {zerocount=zerocount+1};

    //console.log(UserUni.uniname)
  
   
  
    
    
    const ApperG41 = UserInfo.G41.toFixed(2);
    const ApperG42 = UserInfo.G42.toFixed(2);
    const ApperG51 = UserInfo.G51.toFixed(2);
    const ApperG52 = UserInfo.G52.toFixed(2);
    const ApperG61 = UserInfo.G61.toFixed(2);
    const ApperG62 = UserInfo.G62.toFixed(2);
    
    
    
    
    MSG.innerText = `Name : ${UserInfo.NameInput}`;      
    Idap.innerText = `StudentID : ${UserInfo.StudentID}`;
    G41.innerText = ApperG41
   
    
console.log(UserInfo.Current) 

    
    G42.innerText =  ApperG42;
    G51.innerText =  ApperG51;
    G52.innerText =  ApperG52;
    G61.innerText =  ApperG61;
    G62.innerText =  ApperG62;
    Unicall.innerText = UserInfo.University;
    Faccall.innerText = UserInfo.Faculty
 
    
    
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

let signoutBtn = document.getElementById('signout_bu');
let signout1 = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'Login.html';
}
signoutBtn.addEventListener('click', signout1);






  var uniDropdown = document.getElementById('uniDropdown');
  var facDropdown = document.getElementById('facDropdown');
  var R1show = document.getElementById('R1');
  var R2show = document.getElementById('R2');
  var R3show = document.getElementById('R3');
  var currentterm = document.getElementById("termDropdown");

  // Extract unique universities from the data
 

  


  let Gradevar41 = document.getElementById('gpa41')
  let Gradevar42 = document.getElementById('gpa42')
  let Gradevar51 = document.getElementById('gpa51')
  let Gradevar52 = document.getElementById('gpa52')
  let Gradevar61 = document.getElementById('gpa61')
  let Gradevar62 = document.getElementById('gpa62')
  console.log(UserInfo.G41)
  Gradevar41.value = UserInfo.G41
  Gradevar42.value = UserInfo.G42
  Gradevar51.value = UserInfo.G51
  Gradevar52.value = UserInfo.G52
  Gradevar61.value = UserInfo.G61
  Gradevar62.value = UserInfo.G62



