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



console.log(UserInfo)

MSG.innerText = `Name : ${UserInfo.NameInput}`;      
Idap.innerText = `StudentID : ${UserInfo.StudentID}`;



const gradeForm = document.getElementById('editgrade'); // Update this to match your form's actual ID

gradeForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    let Gradevar41 = Number(document.getElementById('gpa41').value);
    let Gradevar42 = Number(document.getElementById('gpa42').value);
    let Gradevar51 = Number(document.getElementById('gpa51').value);
    let Gradevar52 = Number(document.getElementById('gpa52').value);
    let Gradevar61 = Number(document.getElementById('gpa61').value);
    let Gradevar62 = Number(document.getElementById('gpa62').value);
    let University = document.getElementById("uniDropdown").value;
    let Faculty1 = document.getElementById("facDropdown").value;
   
    let currentterm = document.getElementById("termDropdown").value;
    console.log(currentterm)
     Addgrade(Gradevar41,Gradevar42,Gradevar51,Gradevar52,Gradevar61,Gradevar62,University,Faculty1,currentterm);
    
});

export async function Addgrade(Gradevar1, Gradevar2, Gradevar3, Gradevar4, Gradevar5, Gradevar6, UniversityDB, FacultyDB, a) {
  try {
      // Conditions to set specific grade values to 0 based on the value of 'a'
      if (a == 5) {
          // Handle case when a is 5
      } else if (a == 4) {
          Gradevar5 = 0;
      } else if (a == 3) {
          Gradevar5 = 0;
          Gradevar4 = 0;
      } else if (a == 2) {
          Gradevar5 = 0;
          Gradevar4 = 0;
          Gradevar3 = 0;
      } else if (a == 1) {
          Gradevar5 = 0;
          Gradevar4 = 0;
          Gradevar3 = 0;
          Gradevar2 = 0;
      }

      const UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
      const ref = doc(db, "UserAuthList", UserCreds.uid);

      // Use UniversityDB and FacultyDB in the update
      await updateDoc(ref, {
          G41: Gradevar1,
          G42: Gradevar2,
          G51: Gradevar3,
          G52: Gradevar4,
          G61: Gradevar5,
          G62: Gradevar6,
          University: UniversityDB,  // Use the correct variable here
          Faculty: FacultyDB,        // Use the correct variable here
          Current: Number(termDropdown.value)
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
          Current: docSnap.data().Current,
          G41_Goal: docSnap.data().G41_Goal,
          G42_Goal: docSnap.data().G42_Goal,
          University: docSnap.data().University,
          Faculty: docSnap.data().Faculty,
      }));

      location.replace('a.html');
  } catch (error) {
      alert("กรอกไม่ครบ");
  }
}


let SHEET_ID = '1GAHSaMvzSp6-GeIIJc8rZdz99peBoo0Qu8CBOy70euU';
let SHEET_TITLE = 'university'
let SHEET_RANGE = 'A1:E208' 
let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));
    
    populateDropdowns(data);
  });

function populateDropdowns(data) {
  var uniDropdown = document.getElementById('uniDropdown');
  var facDropdown = document.getElementById('facDropdown');
  var R1show = document.getElementById('R1');
  var R2show = document.getElementById('R2');
  var R3show = document.getElementById('R3');
  var currentterm = document.getElementById("termDropdown");

  // Extract unique universities from the data
  var uniqueUni = [...new Set(data.table.rows.map(row => row.c[0].v))];

  // Populate university dropdown
  uniqueUni.forEach(uni => {
    var option = document.createElement('option');
    option.text = uni;
    uniDropdown.add(option);
  });
  currentterm.addEventListener('change', function () {
    var Term = currentterm.value;
    console.log(Term)
    displayTable(Term)
  });
  // Event listener for university dropdown
  uniDropdown.addEventListener('change', function () {
    var selectedUni = uniDropdown.value;
    console.log(selectedUni)
    populateFacDropdown(selectedUni,data);
  });

  // Event listener for faculty dropdown
  facDropdown.addEventListener('change', function () {
    var selectedUni = uniDropdown.value;
    var selectedFac = facDropdown.value;
    displayData(selectedUni, selectedFac, data);
    console.log(selectedFac)
  });

  // Initial population of faculty dropdown
  var selectedUni = uniDropdown.value;
  populateFacDropdown(selectedUni, data);
}

function populateFacDropdown(selectedUni, data) {
  var facDropdown = document.getElementById('facDropdown');
  facDropdown.options.length = 0; // Clear previous options

  // Filter data based on the selected university
  var filteredData = data.table.rows.filter(row => row.c[0].v === selectedUni);

  // Populate faculty dropdown
  filteredData.forEach(row => {
    var option = document.createElement('option');
    option.text = row.c[1].v;
    facDropdown.add(option);
  });

  // Trigger display of data when faculty dropdown is populated
  var selectedFac = facDropdown.value;
  displayData(selectedUni, selectedFac, data);
}

function displayData(selectedUni, selectedFac, data) {
  // Filter data based on the selected university and faculty
  var filteredData = data.table.rows.filter(row => row.c[0].v === selectedUni && row.c[1].v === selectedFac);
  var R1show = document.getElementById('R1');
  var R2show = document.getElementById('R2');
  var R3show = document.getElementById('R3');
  let R1_grade = filteredData.length > 0 ? filteredData[0].c[2].v : ''
  let  R2_grade = filteredData.length > 0 ? filteredData[0].c[3].v : ''
  let R3_grade = filteredData.length > 0 ? filteredData[0].c[4].v : ''
  // Display data in the corresponding elements
  //R1show.textContent = R1_grade;
  //R2show.textContent = R2_grade;
  //R3show.textContent = R3_grade;
}
function displayTable(term) {
    var tables = [];

// Store references to table elements in an array
    for (var i = 1; i <= 6; i++) {
        tables[i] = document.getElementById("table" + i);
    }

// Function to hide tables not included in the new term
    function updateTableVisibility(newTerm) {
    // Loop through all tables
    for (var i = 1; i <= tables.length; i++) {
        // Check if the table element exists
        if (tables[i]) {
            // Set the display property based on the new term value
            tables[i].style.display = i <= newTerm ? "table" : "none";
        }
    }
}

// Example: Update visibility based on a new term value (e.g., 3)
    updateTableVisibility(term  );
  }

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




  