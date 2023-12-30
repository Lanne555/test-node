

function process(){
    let usernameinput = document.getElementById(username).value;
    let passwordinput = document.getElementById(password).value;
    alert(usernameinput);
    alert(passwordinput);
    if(usernameinput == "admin" && passwordinput == "00001234"){
        alert("pass");
    }
    else{
        alert("failled");
    }
}



