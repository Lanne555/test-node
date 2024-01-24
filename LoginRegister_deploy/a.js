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
  

          let SHEET_ID = '1GAHSaMvzSp6-GeIIJc8rZdz99peBoo0Qu8CBOy70euU';
          let SHEET_TITLE = 'university';
          let SHEET_RANGE = 'A1:E208';
          let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;
          let Logo_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${'logo'}&range=${'A1:B22'}`;
          let R1_grade, R2_grade, R3_grade; // Declare variables in a higher scope
          
          fetch(FULL_URL)
              .then(res => res.text())
              .then(rep => {
                  let data1 = JSON.parse(rep.substr(47).slice(0, -2));
                  console.log(data1);
                  // Assign values to the variables in the higher scope
                  ({ R1_grade, R2_grade, R3_grade } = populateDropdowns(data1));
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
           async function comparedisplay(R1,R2,R3){
              let x = (((5 * R1_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
              let gpax = ((UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61)/UserInfo.Current).toFixed(2);
            
              if(x>4){
                x =4
                console.log(x)
                return x;
              }
              console.log(zerocount)
              Currentpage.innerText = `GPAX ปัจจุบัน`+gpax;
              changeTextColorBasedOnGoal(UserInfo.G41,x,G41);
              changeTextColorBasedOnGoal(UserInfo.G42,x,G42);
              changeTextColorBasedOnGoal(UserInfo.G51,x,G51);
              changeTextColorBasedOnGoal(UserInfo.G52,x,G52);
              changeTextColorBasedOnGoal(UserInfo.G61,x, G61);
              changeTextColorBasedOnGoal(UserInfo.G62,x, G62);
             
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
              if (R1_grade ===0){
                  Check_R1.innerText= "ไม่มีประกาศ"; 
              }
              
              if (R2_grade===0){
                  
              
                  Check_R2.innerText="ไม่มีประกาศ";
              }
              if (R3_grade==0){
                  Check_R3.innerText= "ไม่มีประกาศ"; 
              }
              if(x=='-Infinity'|| x =='Infinity' ){
                  alert("ข้อมูลไม่ถูกต้อง กรุณากรอกเกรดตามจำนวนที่มีอยู่")
                  Currentpage.innerText = `GPAX ปัจจุบันผิดพลาด`;
                  location.replace('b.html');
              }else{
                  Currentpage.innerText = `GPAX ปัจจุบัน : `+gpax;
              }
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
                          UserInfo.G61 = 0;   
                  }else if(UserInfo.Current==3){
                          G61_Goal.innerText = x;
                          G52_Goal.innerText = x;
                          G51_Goal.innerText = 'ได้รับแล้ว'
                          G42_Goal.innerText = 'ได้รับแล้ว'
                          G41_Goal.innerText = 'ได้รับแล้ว'
                          UserInfo.G61 = 0;  
                          UserInfo.G52 = 0;  
                  }else if(UserInfo.Current==2){
                          G61_Goal.innerText = x;
                          G52_Goal.innerText = x;
                          G51_Goal.innerText = x;
                          G42_Goal.innerText = 'ได้รับแล้ว'
                          G41_Goal.innerText = 'ได้รับแล้ว'
                          UserInfo.G61 = 0;  
                          UserInfo.G52 = 0;  
                          UserInfo.G51 = 0;  
                  }else if(UserInfo.Current==1){
                      UserInfo.G61 = 0;  
                      UserInfo.G52 = 0;  
                      UserInfo.G51 = 0;  
                      UserInfo.G42 = 0;  
                      G61_Goal.innerText = x;
                      G52_Goal.innerText = x;
                      G51_Goal.innerText = x;
                      G42_Goal.innerText = x; 
                      G41_Goal.innerText = 'ได้รับแล้ว'
                          
                        
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
          console.log(UserInfo.Current)
                 
          const ApperG41 = UserInfo.G41.toFixed(2);
          const ApperG42 = UserInfo.G42.toFixed(2);
          const ApperG51 = UserInfo.G51.toFixed(2);
          const ApperG52 = UserInfo.G52.toFixed(2);
          const ApperG61 = UserInfo.G61.toFixed(2);
          const ApperG62 = UserInfo.G62.toFixed(2);
          G41.innerText = ApperG41
          G42.innerText =  ApperG42;
          G51.innerText =  ApperG51;
          G52.innerText =  ApperG52;
          G61.innerText =  ApperG61;
          G62.innerText =  ApperG62;
          console.log(zerocount   )
              let y = (((5 * R1_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
              let w = (((5 * R2_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);
              let e = (((5 * R3_grade)-(UserInfo.G41+UserInfo.G42+UserInfo.G51+UserInfo.G52+UserInfo.G61))/zerocount).toFixed(2);// You can change this to any constant value you want.
              function changeTextColorBasedOnGoal(actualGPA, goalGPA, goalElement) {
                if (actualGPA >= goalGPA|| actualGPA==4)  {
                    goalElement.style.color = ' greenyellow'; // Change to green if goal achieved
                } 
                    else if((actualGPA-goalGPA)>=-0.5){
                    goalElement.style.color='yellow';
                }else{
                    goalElement.style.color='red';
                }
              }
              function graph(a) {
                 if(a>4){
                    a =4
                 }
                 return a;
              }
              
              const constantNumber = graph(y);
              const constantNumber1 = graph(w);
              const constantNumber2 = graph(e);
              const data = {
                  labels: ['ม.4 เทอม1', 'ม.4 เทอม2', 'ม.5 เทอม1', 'ม.5 เทอม2', 'ม.6 เทอม1'],
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
                          pointRadius: 15,
                          pointHoverRadius: 20,
                      },
                      {
                          label: 'ขั้นตํ่าเทอมถัดไปPortfolio',
                          data: Array(5).fill(constantNumber), // Creates an array with constantNumber repeated 6 times
                          borderColor: 'green',
                          fill: false,
                          pointRadius: 10,
                          pointHoverRadius: 20,
                          borderDash: [5, 5], // Optional: makes the line dashed
                      },
                      {
                          label: 'ขั้นตํ่าเทอมถัดไปQuota',
                          data: Array(5).fill(constantNumber1), // Creates an array with constantNumber repeated 6 times
                          borderColor: 'blue',
                          fill: false,
                          pointRadius: 10,
                          pointHoverRadius: 20,
                          borderDash: [20, 20], // Optional: makes the line dashed
                      },
                      {
                          label: 'ขั้นตํ่าเทอมถัดไปAdmission',
                          data: Array(5).fill(constantNumber2)  , // Creates an array with constantNumber repeated 6 times
                          borderColor: 'purple',
                          pointRadius: 10,
                          pointHoverRadius: 20,
                          fill: false,
                          borderDash: [40, 40], // Optional: makes the line dashed
                          
                      },
                  ],
              };
              Chart.defaults.font.size = 20;
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
                              text: (ctx) => 'สถิติเกรดเฉลี่ยของชั้นมัธยมปลาย',
                              font:{
                                  size: 30,
                                  
                              }
                              
                              
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
        let data2 = JSON.parse(rep.substr(47).slice(0,-2));
        console.log(data2)
        Univer_logo(data2)
      });
      function Univer_logo(data){
          var filteredData = data.table.rows.filter(row => row.c[0].v === UserInfo.University );
          
          let Uni_img = filteredData.length > 0 ? filteredData[0].c[1].v : '';
          if (Uni_logo !== null && Uni_logo !== undefined) {
              // Image element exists
              console.log("Image is defined");
          } else {
              // Image element is undefined or does not exist
             Uni_logo.src = 'https://firebasestorage.googleapis.com/v0/b/ai-pdfchat.appspot.com/o/University_logo%2FTpo.jpg?alt=media&token=3d4eddda-72bb-46a5-bcdb-71ef32011355'
          }
          
          Uni_logo.src = Uni_img;
          console.log(Uni_img)
          if(Uni_img = ''){
            console.log("lost")
          }    
          
      }
  let zerocount =0;
  if (UserInfo.G41 == 0) {
       zerocount=zerocount+1};
  if (UserInfo.G42 == 0) {zerocount=zerocount+1};
  if (UserInfo.G51 == 0) {zerocount=zerocount+1};
  if (UserInfo.G52 == 0){zerocount=zerocount+1};
  if (UserInfo.G61 == 0) {zerocount=zerocount+1};


  //console.log(UserUni.uniname)

 

  
  if(UserInfo.University === undefined){
      UserInfo.University="ยังไม่ได้กำหนดมหาวิทยาลัย"
  }
  if(UserInfo.Faculty === undefined){
      UserInfo.Faculty="ยังไม่ได้กำหนดคณะ"
  }
  
  MSG.innerText = `Name : ${UserInfo.NameInput}`;      
  Idap.innerText = `StudentID : ${UserInfo.StudentID}`;
 
  
  console.log(UserInfo) 

  
 
  Unicall.innerText = UserInfo.University;
  Faccall.innerText = UserInfo.Faculty

  
  
  Compare.style.color ='gold'
  //HumanQ.innerHTML =`User : ${UserAi.text}`;  
  //Botres.innerHTML = `AI : ${UserAi.summary}`  
  
// Add this function to your existing JavaScript code


// Usage of the function for each goal

let signoutBtn = document.getElementById('signout_bu');
let signout1 = () => {
  sessionStorage.removeItem("user-creds");
  sessionStorage.removeItem("user-info");
  window.location.href = 'Login.html';
}
signoutBtn.addEventListener('click', signout1);


    if (isNaN(UserInfo.Current)) {
      Currentpage.innerText="XX.XX"
    }









  





  

    

