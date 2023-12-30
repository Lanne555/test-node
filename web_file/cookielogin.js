import Swal from 'sweetalert2'

// or via CommonJS
const Swal = require('sweetalert2')

function process(){
    let usernameinput = document.getElementById(username).value;
    let passwordinput = document.getElementById(password).value;
    if(username !== "admin" && password !== "00001234"){
        Swal.fire({
          title: "Password",
          text: "password is correct",
          icon: "success"
        });
    }
    else{
        Swal.fire({
          title: "Password",
          text: "password is incorrect",
          icon: "error"
        }); 
    }
}





function ccookie() {
    // code 
    document.cookie = "typeuser=1";
}


