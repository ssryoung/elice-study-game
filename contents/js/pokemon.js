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

const pokemonName = {
  names: [
    "이상해씨",
    "이상해풀",
    "이상해꽃",
    "파이리",
    "리자드",
    "리자몽",
    "꼬부기",
    "어니부기",
    "거북왕",
    "캐터피",
    "단데기",
    "버터플",
    "뿔충이",
    "딱충이",
    "독침붕",
    "구구",
    "피죤",
    "피죤투",
    "꼬렛",
    "레트라",
    "깨비참",
    "깨비드릴조",
    "아보",
    "아보크",
    "피카츄",
    "라이츄",
    "모래두지",
    "고지",
    "니드런♀",
    "니드리노",
    "니드런♂",
    "니드리노",
    "니드킹",
    "삐삐",
    "픽시",
    "식스테일",
    "나인테일",
    "나인테일",
    "푸린",
    "푸크린",
    "주뱃",
    "골뱃",
    "뚜벅쵸",
    "냄새꼬",
    "라플레시아",
    "파라스",
    "파라섹트",
    "콘팡",
    "도나리",
    "디그다",
    "닥트리오",
    "나옹",
    "페르시온",
    "고라파덕",
    "골덕",
    "망키",
    "성원숭",
    "가디",
    "윈디",
    "발챙이",
    "슈륙챙이",
    "강챙이",
    "케이시",
    "윤겔라",
    "후딘",
    "알통몬",
    "근육몬",
    "괴력몬",
    "모다피",
    "우츠동",
    "우츠보트",
    "왕눈해",
    "독파리",
    "꼬마돌",
    "데구리",
    "딱구리",
    "포니타",
    "날쌩마",
    "야돈",
    "야도란",
    "코일",
    "레어코일",
    "파오리",
    "두두",
    "두트리오",
    "쥬쥬",
    "쥬레곤",
    "질퍽이",
    "질뻐기",
    "셀러",
    "파르셀",
    "고오스",
    "고우스트",
    "팬텀",
    "롱스톤",
    "슬리프",
    "슬리퍼",
    "크랩",
    "킹크랩",
    "찌리리공",
    "붐볼",
    "아라리",
    "나시",
    "탕구리",
    "텅구리",
    "시라소몬",
    "홍수몬",
    "내루미",
    "또가스",
    "또도가스",
    "뿔카노",
    "코뿌리",
    "럭키",
    "덩쿠리",
    "캥카",
    "쏘드라",
    "시드라",
    "콘치",
    "왕콘치",
    "별가사리",
    "아쿠스타",
    "마임맨",
    "스라크",
    "루주라",
    "에레브",
    "마그마",
    "쁘사이저",
    "켄타로스",
    "잉어킹",
    "갸라도스",
    "라프라스",
    "메타몽",
    "이브이",
    "샤미드",
    "쥬피썬더",
    "부스터",
    "폴리곤",
    "암나이트",
    "암스타",
    "투구",
    "투구푸스",
    "프테라",
    "잠만보",
    "프리져",
    "썬더",
    "파이어",
    "미뇽",
    "신뇽",
    "망나뇽",
    "뮤츠",
    "뮤",
  ],
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
//모달창에 컨테이너 하나씩 추가되는 부분.
const pokeContainer = document.querySelector("#container");
const pokeURL = "/contents/img/sprites/";

for (let i = 1; i < 152; i++) {
  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon"); //포켓몬에 클래스 추가
  const number = document.createElement("span");
  const newImg = document.createElement("img");

  number.innerHTML = `#${i} ${pokemonName["names"][i - 1]}`;
  newImg.src = `${pokeURL}${i}.gif`;
  pokemon.appendChild(newImg);
  pokemon.appendChild(number);
  pokeContainer.appendChild(pokemon);
}
//처음 접속시 모달


//승리 및 패배시 결과 모달창

// 랜덤 디지몬 획득 알고리즘

//효과음 재생하는 함수

function playSound() {
  soundElem.src = "/contents/sound/pop.mp3";
  soundElem.play();

  if (soundElem.paused) {
    soundElem.play();
  } else {
    soundElem.pause();
    soundElem.currentTime = 0;
    soundElem.play();
  }
}
