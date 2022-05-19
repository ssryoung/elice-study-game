let peopleNum = document.getElementsByClassName("people")[0].innerHTML;
let bumbNum = document.getElementsByClassName("bumb")[0].innerHTML;
let peopleMinus = document.getElementById("peopleMinus");
let peoplePlus = document.getElementById("peoplePlus");
let bumbMinus = document.getElementById("bumbMinus");
let bumbPlus = document.getElementById("bumbPlus");
let playbutton = document.getElementsByClassName("play_btn")[0];
let img = document.getElementsByClassName("lotImg");
let lotResult = document.getElementsByClassName("lotResult");
let ul = document.getElementsByClassName("lot_list")[0];
let result_modal = document.getElementsByClassName("result")[0];
let replay = document.getElementsByClassName("again_btn")[0];
let result_content = document.getElementsByClassName("result_content")[0];
let back = document.getElementsByClassName("background")[0];
// 사람수줄이기
function ppMinus() {
  if (peopleNum > 2) {
    peopleNum = parseInt(peopleNum) - 1;
    document.getElementsByClassName("people")[0].innerHTML = peopleNum;
    bumbNum = peopleNum - 1;
    document.getElementsByClassName("bumb")[0].innerHTML = bumbNum;

    let newPeople = document.getElementsByClassName("lot")[peopleNum];
    ul.removeChild(newPeople);
  } else {
    window.alert("더 이상 내려갈 수 없습니다.");
  }
}
// 사람수늘리기
function ppPlus() {
  if (peopleNum < 10) {
    peopleNum = parseInt(peopleNum) + 1;
    document.getElementsByClassName("people")[0].innerHTML = peopleNum;
    bumbNum = peopleNum - 1;
    document.getElementsByClassName("bumb")[0].innerHTML = bumbNum;

    let newPeople = document.createElement("li");
    newPeople.setAttribute("class", "lot");
    let newImg = document.createElement("img");
    newImg.setAttribute("class", "lotImg");
    let newdiv = document.createElement("div");
    newdiv.setAttribute("class", "lotResult");

    newPeople.appendChild(newImg);
    newPeople.appendChild(newdiv);
    ul.appendChild(newPeople);
  } else {
    window.alert("더 이상 올라갈 수 없습니다.");
  }
}

function bbMinus() {
  if (bumbNum > 1) {
    bumbNum = parseInt(bumbNum) - 1;
    document.getElementsByClassName("bumb")[0].innerHTML = bumbNum;
  } else {
    window.alert("더 이상 내려갈 수 없습니다.");
  }
}
function bbPlus() {
  if (bumbNum < 10 && peopleNum - 1 > bumbNum) {
    bumbNum = parseInt(bumbNum) + 1;
    document.getElementsByClassName("bumb")[0].innerHTML = bumbNum;
  } else {
    window.alert("더 이상 올라갈 수 없습니다.");
  }
}

// replay버튼 새로고침하기
function remove_modal() {
  location.reload();
}
let arr = [];
// 결과
function changeImg() {
  playbutton.disabled = true;
  peopleMinus.disabled = true;
  peoplePlus.disabled = true;
  bumbMinus.disabled = true;
  bumbPlus.disabled = true;
  for (i = 0; i < bumbNum; i++) {
    a = Math.floor(Math.random() * peopleNum);
    while (arr.includes(a)) {
      a = Math.floor(Math.random() * peopleNum);
    }
    arr.push(a);
  }
  for (i = 0; i < peopleNum; i++) {
    if (arr.indexOf(i) > -1) {
      img[i].className += " bombImg";
      lotResult[i].innerHTML = `${i + 1}번   꽝!`;
    } else {
      img[i].className += " passImg";
      lotResult[i].innerHTML = `${i + 1}번   통과~`;
    }
  }

  setTimeout(modal, 2500);
}

// 모달창
function modal() {
  arr.sort();
  result_arr = [];
  arr.forEach((i) => {
    result_arr.push(i + 1 + "번");
  });
  back.style.display = "block";

  result_content.innerHTML += `<h2>${result_arr} 꽝!!!</h2>`;
}

peopleMinus.addEventListener("click", ppMinus);
peoplePlus.addEventListener("click", ppPlus);
bumbMinus.addEventListener("click", bbMinus);
bumbPlus.addEventListener("click", bbPlus);
playbutton.addEventListener("click", changeImg);
replay.addEventListener("click", remove_modal);
