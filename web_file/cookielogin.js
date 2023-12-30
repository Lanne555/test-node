var cookie1 = document.getElementsByClassName("cookie");
var btnc = document.getElementsByClassName("btnc");
var btnd = document.getElementsByClassName("btnd");


function ccookie() {
    // code 
    document.cookie="typeuser=1";
    var cokie = 1;
    document.getElementById("cookie").innerHTML = "cookie is on";
  }

function dcookie() {
    // code 
    document.cookie="typeuser=0";
    var cokie = 0;
    document.getElementById("cookie").innerHTML = "cookie is off";
  }
