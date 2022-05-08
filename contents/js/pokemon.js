const comPanel = document.querySelector("#comPanel");
const startBtn = document.querySelector("#start");
const endBtn = document.querySelector("#end");
const comImg = comPanel.querySelector("#comImg");
const userForm = document.querySelector("#userChoice");
const npc = document.querySelector("#npc");
const soundElem = document.querySelector("#sound");
const src = ["scissors", "rock", "paper"];
let nIntervalId; //인터벌의 id값을 저장할 변수
let imageIndex = 0;

const objRock = {
  scissors: 1, //승리시 1 비기면 0 지면 -1
  rock: 0,
  paper: -1,
};

const objScissors = {
  scissors: 0, //승리시 1 비기면 0 지면 -1
  rock: -1,
  paper: 1,
};

const objPaper = {
  scissors: -1, //승리시 1 비기면 0 지면 -1
  rock: 1,
  paper: 0,
};

let addSoundBtn = document.getElementsByClassName("btn_image");
///???질문
for (let i = 0; i < addSoundBtn.length; i++) {
  addSoundBtn[i].addEventListener(
    "mouseover",
    playSound

    // function () {
    //     soundElem.src = "/contents/pop.mp3";
    //     soundElem.play();
    //   if (soundElem.paused) {
    //     soundElem.play();
    //   } else {
    //     soundElem.pause();
    //     soundElem.currentTime = 0;
    //     soundElem.play();
    //   }
    //}
  );
}

// for (let i = 0; i < addSoundBtn.length; i++) {
//   addSoundBtn[i].addEventListener("mouseover",
//   function () {
//     let promise = document.querySelector("#sound").play();
//     if (promise !== undefined) {
//       promise
//         .then((soundElem) => {
//           console.log("sd");
//         })
//         .catch((error) => {
//           // Autoplay was prevented.
//           // Show a "Play" button so that user can start playback.
//         });
//     }
//   });

//   addSoundBtn[i].addEventListener("mouseout", function () {
//     document.querySelector("#sound").pause();
//   });
// }

//해당하는 값의 가위바위보 객체를 반환
function returnRSP(choice) {
  console.log("choice : " + choice);
  if (choice === "rock") return objRock;
  else if (choice === "scissors") return objScissors;
  else if (choice === "paper") return objPaper;
}

//TODO ::
//가위바위보 구현
//스타트 버튼이 눌리면 함수 실행
//button이 눌릴시에만 회전하도록 수정

function playRSP(e) {
  //sound재생
  //todo RANDOM값으로 이미지 변경
  if (nIntervalId) {
    stopChangeImage(); //버튼이 눌리면 멈춤
    let pcHand = src[Math.floor(Math.random() * 3)];
    comImg.src = `../img/${pcHand}.gif`; //선택된 컴퓨터 이미지로 출력

    let value = this.event.target.getAttribute("value");
    let objUser = returnRSP(value);

    console.log("pc : " + pcHand);
    console.log("userHand :" + objUser[pcHand]);

    //1 : 승리 0 : 무승부 -1 : 패배
    if (objUser[pcHand] === 1) {
      npc.innerHTML = "Win!";
    } else if (objUser[pcHand] === 0) {
      npc.innerHTML = "Draw!";
    } else if (objUser[pcHand] === -1) {
      npc.innerHTML = "Looooose";
    }
    //ToDo : checkScore
    //한번 승리할 때마다 포인트 증가.
  } else {
    changeImage();
  }
} //end palyGame

//컴퓨터 이미지 회전 애니메이션
function roulettePc() {
  document.querySelector("#comImg").src = `../img/${src[imageIndex]}.gif`; //src에 저장된 이름으로 회전
  imageIndex++; //한번 회전시마다 이미지 인덱스 ++
  if (imageIndex >= src.length) {
    //이미지 인덱스가 가위바위보 이름보다 길어지면 인덱스 값을 초기화
    imageIndex = 0;
  }
}

function changeImage() {
  if (!nIntervalId) {
    //인터벌 아이디가 비어있다면 setInterval을 재할당
    nIntervalId = setInterval(roulettePc, 100);
  }
}

function stopChangeImage() {
  //인터벌 아이디가 존재한다면 인터벌 아이디 삭제
  clearInterval(nIntervalId);
  nIntervalId = null;
}
startBtn.addEventListener("click", changeImage);

//ToDo :
//승리시 승리헀다는 문구와 함께
//포켓몬 스티커 하나 지급

//포켓몬 모달창 만들어서 포켓몬이 하나씩 추가되게

//효과음 재생하는 함수

function playSound() {
  soundElem.src = "/contents/sound/pop.mp3";
  soundElem.play();
  console.log("Asdasdas");

  if (soundElem.paused) {
    soundElem.play();
  } else {
    soundElem.pause();
    soundElem.currentTime = 0;
    soundElem.play();
  }
}
