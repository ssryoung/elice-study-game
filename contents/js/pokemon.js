const comPanel = document.querySelector("#comPanel");
const endBtn = document.querySelector("#end");
const comImg = comPanel.querySelector("#comImg");
const userForm = document.querySelector("#userChoice");
const npc = document.querySelector("#npc");
const soundElem = document.querySelector("#sound");
const src = ["scissors", "rock", "paper"];
const resultBox = document.querySelector("#pokeResultBox");
const replayBtn = document.querySelector("#btnAgain");
const pokeGetBox = document.querySelector("#pokeGetBox");
const btnConfirm = document.querySelector("#btnConfirm");
const modal = document.querySelector(".modal");
const btnOpenPopup = document.querySelector(".btn-open-popup");
const pokeBook = document.querySelector("#pokemonBook");
let countPokemon = 0;
let nIntervalId; //인터벌의 id값을 저장할 변수
let imageIndex = 0;
let score = document.getElementById("score");
const btnStart = document.querySelector("#btnStart");
const objRock = {
  name: "rock",
  scissors: 1, //승리시 1 비기면 0 지면 -1
  rock: 0,
  paper: -1,
};

const objScissors = {
  name: "scissors",
  scissors: 0, //승리시 1 비기면 0 지면 -1
  rock: -1,
  paper: 1,
};

const objPaper = {
  name: "paper",
  scissors: -1, //승리시 1 비기면 0 지면 -1
  rock: 1,
  paper: 0,
};

const pokemonName = {
  myPokemon: Array.from({ length: 151 }, () => 0), //0으로 초기화 하면서 포켓몬 배열생성
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
    "밍나뇽",
    "뮤츠",
    "뮤",
  ],
};
//몇마리 남았는지 표시해주는 함수
const restNumber = [];
for (let i = 0; i < 151; i++) {
  restNumber[i] = i;
}

//랜덤 포켓몬 획득 알고리즘
//사용자가 가지지 않은 포켓몬만 뽑을 수 있다.
function getPokemon() {
  let getPoke = restNumber.splice(
    Math.floor(Math.random() * restNumber.length), //*** splice를 이용해 하나의 값만 가져올 수 있다. */
    1
  )[0]; //배열에서 랜덤으로 나온 인덱스를 삭제 ,리턴값은 뽑힌 넘버

  pokemonName.myPokemon[getPoke] = 1; //획득한 포켓몬의 획득 배열 번호를 1로 바꿈
  pokeGetBox.style.display = "block"; //포켓몬 획득 모달창 띄우기
  pokeGetBox.querySelector("img").src = `/contents/img/sprites/${
    getPoke + 1
  }.gif`;
  pokeGetBox.querySelector("span").innerHTML = `${pokemonName.names[getPoke]}`;
  score.innerHTML = ++countPokemon;
  return getPoke; // 배열인덱스 반환
}

//가위바위보 버튼이미지에 효과음 적용하는 함수
let addSoundBtn = document.getElementsByClassName("btn_image");
for (let i = 0; i < addSoundBtn.length; i++) {
  addSoundBtn[i].addEventListener("mouseover", playSound);
}

//해당하는 값의 가위바위보 객체를 반환
function returnRSP(choice) {
  if (choice === "rock") return objRock;
  else if (choice === "scissors") return objScissors;
  else if (choice === "paper") return objPaper;
}

//결과에 따라서 resultLog 모달창의 글자를 변경하는 함수
function checkScore(resultLog) {
  const npc = resultBox.querySelector("p");

  resultBox.style.display = "block";
  if (resultLog) npc.innerHTML = `${resultLog}`;
}

//TODO ::
//가위바위보 구현
async function playRSP(e) {
  if (nIntervalId) {
    //nInterverId가 있을시에만 게임동작하게 함
    await stopChangeImage(); //버튼이 눌리면 회전이미지가 멈춤
    let pcHand = src[Math.floor(Math.random() * 3)]; //컴퓨터의 손을 랜덤으로 선택
    let value = this.event.target.getAttribute("value"); //유저가 선택한 값을 받음
    let objUser = await returnRSP(value); //returnRSP에 넣어 가위바위보 객체 획득
    const resultYou = resultBox.querySelector("#resultYou");
    const resultPc = resultBox.querySelector("#resultPc");

    comImg.src = await `../img/${pcHand}.gif`; //선택된 컴퓨터 이미지 회전했던 화면에 출력

    resultYou.src = await `/contents/img/${objUser.name}.gif`; //결과창 이미지 설정
    resultPc.src = await `/contents/img/${pcHand}.gif`;
    //1 : 승리 0 : 무승부 -1 : 패배
    if (objUser[pcHand] === 1) {
      checkScore("You Win!!");
      let number = getPokemon(); //게임 승리시 포켓몬 획득 함수
      setPokemonBook(number); //얻은 포켓몬을 도감에 등록함
    } else if (objUser[pcHand] === 0) {
      checkScore("Draw~~");
    } else if (objUser[pcHand] === -1) {
      checkScore("Loooooose...");
    }
    //ToDo : checkScore
    //한번 승리할 때마다 포인트 증가.
  } else {
    changeImage(); //게임종료시 다시 회전하도록
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

async function stopChangeImage() {
  //인터벌 아이디가 존재한다면 인터벌 아이디 삭제
  await clearInterval(nIntervalId);
  nIntervalId = null;
}

//포켓몬 도감에 포켓몬이 하나씩 추가되는 부분 부분.
const resultLog = document.querySelector("#resultLog");
const pokeURL = "/contents/img/sprites/";
const pokeContainer = document.querySelector("#container");

for (let i = 0; i < 151; i++) {
  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon"); //포켓몬에 클래스 추가
  const number = document.createElement("span");
  const newImg = document.createElement("img");

  number.innerHTML = `# ${i + 1} ${pokemonName["names"][i]}`;
  newImg.src = `${pokeURL}${i + 1}.gif`;
  pokemon.appendChild(newImg);
  pokemon.appendChild(number);
  pokeContainer.appendChild(pokemon);
}

//효과음 재생하는 함수, 중간에 다시 이벤트가 발동할경우 끊었다가 다시 재생되게 구현
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

//컴퓨터 이미지 회전 애니메이션
function rpc() {
  document.querySelector("#comImg").src = `../img/${src[imageIndex]}.gif`;
  imageIndex++;
  if (imageIndex >= src.length) {
    imageIndex = 0;
  }
}

//룰렛이미지 회전하는 부분
function changeImage() {
  if (!nIntervalId) {
    nIntervalId = setInterval(rpc, 100);
  }
}

//룰렛 이미지 멈추는 부분
function stopChangeImage() {
  clearInterval(nIntervalId);
  nIntervalId = null;
}

//들어온 number로 포켓몬 도감에 등록
function setPokemonBook(number) {
  const classPokemon = document.getElementsByClassName("pokemon")[number];
  if (pokemonName.myPokemon[number] === 1) {
    classPokemon.querySelector("img").style.filter = "none";
    localStorage.setItem("inMyPokemon", JSON.stringify(pokemonName.myPokemon));
  }
}

function loadPokemon() {
  let inMyPokemon = localStorage.getItem("inMyPokemon"); //포켓몬 이름 재할당
  pokemonName.myPokemon = JSON.parse(inMyPokemon);
  console.log(pokemonName.myPokemon.includes(1));

  if (pokemonName.myPokemon.includes(1)) {
    console.log("asdsa");
    console.log(pokemonName.myPokemon.length);
    const classPokemons = document.getElementsByClassName("pokemon");
    for (let i = 0; i < pokemonName.myPokemon.length; i++) {
      if (pokemonName.myPokemon[i] === 1) {
        classPokemons[i].querySelector("img").style.filter = "none";
      }
    }
  }
}

function gameInit() {
  let localPokeCount = localStorage.getItem("pokemonCount");
  let localPokeArray = localStorage.getItem("inMyPokemon");

  if (localPokeCount === null) {
    localStorage.setItem("pokemonCount", countPokemon);
    countPokemon = 0;
  }
  if (localPokeArray === null) {
    localStorage.setItem("inMyPokemon", JSON.stringify(pokemonName.myPokemon));
  }

  countPokemon = localPokeCount;
  pokemonName.myPokemon = localPokeArray;

  score.innerHTML = countPokemon;
  loadPokemon(); //도감에 저장해둔 포켓몬을 그려주는 부분
}

//포켓몬 북 팝업 이벤트리스너
btnOpenPopup.addEventListener("click", () => {
  pokeBook.style.display = "block";
});

//다시시작 버튼 이벤트 리스너, 다시시작 누르면 룰렛 시작
replayBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  pokeGetBox.style.display = "none";
});

//포켓몬 획득시 보여주는 화면
btnConfirm.addEventListener("click", async (e) => {
  e.preventDefault();
  resultBox.style.display = "none";
  localStorage.setItem("pokemonCount", countPokemon);
  await playRSP();
});

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  const notice = document.querySelector("#modal_notice");
  notice.style.display = "none";

  gameInit();
  playRSP();
});
