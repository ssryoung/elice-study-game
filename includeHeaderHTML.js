let z, file, xhttp;
let divEls = document.getElementById("header");
file = "/contents/header.html";

xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    divEls.innerHTML = xhttp.responseText;
  }
};
xhttp.open("GET", file, true);
xhttp.send();
