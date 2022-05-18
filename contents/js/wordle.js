const board = document.querySelector(".wordle-board");
const buttons = document.querySelectorAll("button");
const notification = document.querySelector(".notification-container");
const result = document.querySelector(".result");
const winOrLose = result.firstElementChild;
const resAnswer = document.querySelector(".answer");
const score = document.querySelector(".score");
const btnAgain = document.querySelector(".btn_again");
// global 변수
let gameEndFlg = false;
let gameWinFlg = false;
let rowCount = 0;
let colCount = 1;
let answer = "";
let answerArr = [];
result.style.display = "none";

// 미니게임 초기화
function minigameInit() {
  wordleInit();
  removeBoard();
  createBoard();
  setAnswer();
}

// 초기값 설정
function wordleInit() {
  gameEndFlg = false;
  gameWinFlg = false;
  rowCount = 0;
  colCount = 1;
  answer = "";
  answerArr = [];
  result.style.display = "none";
}

// 정답 단어 랜덤으로 불러오기(JSON)
async function fetchAnswers() {
  const res = await fetch("../json/wordle.json");
  const data = await res.json();
  return await data.answer;
}

// 정담 단어 설정
function setAnswer() {
  fetchAnswers()
    .then((answers) => {
      const random = Math.floor(Math.random() * (answers.length - 1));
      answer = answers[random];
      return answers[random];
    })
    .then((answerWord) => {
      // 정답 단어 음절 분리
      // 깐부 => [{ㄱ,ㄱ},ㅏ,ㄴ,ㅂ,ㅜ]
      let splitAnswerArr = [];
      answerWord.split("").map((word) => {
        splitAnswerArr.push(...wordSeparate(word));
      });
      return splitAnswerArr;
    })
    .then((splitAnswerArr) => {
      // 쌍자음, 복합모음 분리
      // [{ㄱ,ㄱ},ㅏ,ㄴ,ㅂ,ㅜ] => [ㄱ,ㄱ,ㅏ,ㄴ,ㅂ,ㅜ]
      splitAnswerArr.map((arr) => {
        answerArr.push(...arr);
      });
    });
}

function removeBoard() {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
}

// wordle-board HTML
function createBoard() {
  // rows
  for (let i = 1; i <= 6; i++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("wordle-board-row");
    board.appendChild(boardRow);

    // tiles
    for (let j = 1; j <= 6; j++) {
      const boardTiles = document.createElement("div");
      boardTiles.classList.add("wordle-board-tile");
      boardRow.appendChild(boardTiles);
    }
  }
}

// tiles style, animate
// input
function tilesInputAnimate(tile) {
  tile.style.border = "2px solid rgba(195, 186, 233, 1)";
  tile.animate(
    {
      transform: ["scale(1)", "scale(1.2)", "scale(1)"],
    },
    {
      duration: 200,
    }
  );
}

// backspace
function tilesBackspaceStyle(tile) {
  tile.style.border = "2px solid rgba(195, 186, 233, 0.5)";
}

// wrong answer
function tilesWrongAnimate(tiles) {
  tiles.animate(
    {
      transform: [
        "translateX(0px)",
        "translateX(-10px)",
        "translateX(0px)",
        "translateX(10px)",
        "translateX(0px)",
      ],
    },
    {
      duration: 100,
      iterations: 2,
    }
  );
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// change tile color
// code -> 1: strike, 2: ball, 3: out
function changeTileColor(tile, code) {
  if (code === 1) {
    tile.style.backgroundColor = "rgba(195, 186, 233, 0.8)";
    tile.style.color = "rgba(255, 255, 255, 1)";
  } else if (code === 2) {
    tile.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
    tile.style.color = "rgba(195, 186, 233, 1)";
  } else {
    tile.style.backgroundColor = "rgba(128, 128, 128, 0.3)";
    tile.style.color = "rgba(195, 186, 233, 1)";
  }
}

// backspace
function inputBackspace() {
  if (colCount > 1) {
    const boardRow = document.querySelectorAll(".wordle-board-row")[rowCount];
    tilesBackspaceStyle(boardRow.children[colCount - 2]);
    boardRow.children[colCount - 2].textContent = "";
    colCount--;
  }
}

// enter
function inputEnter() {
  const boardRow = document.querySelectorAll(".wordle-board-row")[rowCount];
  if (boardRow.children[5].textContent) {
    // 입력값 배열
    let targetArr = [];
    for (let i = 0; i < boardRow.children.length; i++) {
      targetArr.push(boardRow.children[i].textContent);
    }
    // 정답 비교
    grade(targetArr);

    // 스코어 모달 오픈
    if (gameEndFlg) {
      showScore();
    }
  } else {
    tilesWrongAnimate(boardRow);
    showNotification();
  }
}

// consonant-vowel
function inputConsonantVowel(e) {
  const boardRow = document.querySelectorAll(".wordle-board-row")[rowCount];
  if (colCount <= 6) {
    tilesInputAnimate(boardRow.children[colCount - 1]);
    boardRow.children[colCount - 1].textContent = e;
    colCount++;
  }
}

// event
// keyboard buttons click handle
function handleKeyboardClick(e) {
  if (!gameEndFlg) {
    if (e.target.id == "backspace-key") {
      inputBackspace();
    } else if (e.target.id == "enter-key") {
      inputEnter();
    } else {
      inputConsonantVowel(e.target.dataset.key);
    }
  }
}

// keyboard key-down handle
function handleKeydown(e) {
  const keyCode = e.keyCode;
  if (keyCode === 8) {
    inputBackspace();
  } else if (keyCode === 13) {
    inputEnter();
  } else {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (e.keyCode !== 79 && e.keyCode !== 80) {
        const toHangul = alphabetToHangul(e.key);
        inputConsonantVowel(toHangul);
      }
    }
  }
}

// 정답 비교
function grade(wordArr) {
  const boardRow = document.querySelectorAll(".wordle-board-row")[rowCount];
  const dummyAnswerArr = answerArr.slice();
  const dummyWordArr = wordArr.slice();
  let sCount = 0;

  for (let i = 0; i < 6; i++) {
    if (answerArr[i] === wordArr[i]) {
      changeTileColor(boardRow.children[i], 1);
      sCount++;
      dummyAnswerArr[i] = "";
      dummyWordArr[i] = "";
    } else {
      for (let j = i; j < 6; j++) {
        if (dummyAnswerArr[j] === dummyWordArr[j]) {
          dummyAnswerArr[j] = "";
          dummyWordArr[j] = "";
        }
      }
      const index = dummyAnswerArr.indexOf(wordArr[i]);
      if (index > -1) {
        changeTileColor(boardRow.children[i], 2);
        dummyAnswerArr[index] = "";
        dummyWordArr[i] = "";
      } else {
        changeTileColor(boardRow.children[i], 3);
      }
    }
  }

  // 6번째 줄의 입력이 끝났을 경우 게임 종료
  if (rowCount === 5) {
    gameEndFlg = true;
  }

  // 정답일 경우 게임 종료
  if (sCount === 6) {
    gameEndFlg = true;
    gameWinFlg = true;
  } else {
    rowCount += 1;
    colCount = 1;
  }
}

// show result modal
function showScore() {
  result.style.display = "block";
  resAnswer.textContent = answer;
  if (gameWinFlg) {
    winOrLose.textContent = "You win!";
    score.textContent = `${100 - 15 * rowCount}`;
  } else {
    winOrLose.textContent = "You lose...";
    score.textContent = 0;
  }
}

// 알파벳을 한글 자모로 변경
function alphabetToHangul(input) {
  const alphabetKey = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  const hangulKey = [
    "ㅂ",
    "ㅈ",
    "ㄷ",
    "ㄱ",
    "ㅅ",
    "ㅛ",
    "ㅕ",
    "ㅑ",
    "ㅁ",
    "ㄴ",
    "ㅇ",
    "ㄹ",
    "ㅎ",
    "ㅗ",
    "ㅓ",
    "ㅏ",
    "ㅣ",
    "ㅋ",
    "ㅌ",
    "ㅊ",
    "ㅍ",
    "ㅠ",
    "ㅜ",
    "ㅡ",
    "ㅂ",
    "ㅈ",
    "ㄷ",
    "ㄱ",
    "ㅅ",
    "ㅛ",
    "ㅕ",
    "ㅑ",
    "ㅁ",
    "ㄴ",
    "ㅇ",
    "ㄹ",
    "ㅎ",
    "ㅗ",
    "ㅓ",
    "ㅏ",
    "ㅣ",
    "ㅋ",
    "ㅌ",
    "ㅊ",
    "ㅍ",
    "ㅠ",
    "ㅜ",
    "ㅡ",
  ];

  const index = alphabetKey.indexOf(input);

  return hangulKey[index];
}

// 음절 분리
function wordSeparate(word) {
  const cho = [
    "ㄱ",
    ["ㄱ", "ㄱ"],
    "ㄴ",
    "ㄷ",
    ["ㄷ", "ㄷ"],
    "ㄹ",
    "ㅁ",
    "ㅂ",
    ["ㅂ", "ㅂ"],
    "ㅅ",
    ["ㅅ", "ㅅ"],
    "ㅇ",
    "ㅈ",
    ["ㅈ", "ㅈ"],
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const jung = [
    "ㅏ",
    ["ㅏ", "ㅣ"],
    "ㅑ",
    ["ㅑ", "ㅣ"],
    "ㅓ",
    ["ㅓ", "ㅣ"],
    "ㅕ",
    ["ㅕ", "ㅣ"],
    "ㅗ",
    ["ㅗ", "ㅏ"],
    ["ㅗ", "ㅏ", "ㅣ"],
    ["ㅗ", "ㅣ"],
    "ㅛ",
    "ㅜ",
    ["ㅜ", "ㅓ"],
    ["ㅜ", "ㅓ", "ㅣ"],
    ["ㅜ", "ㅣ"],
    "ㅠ",
    "ㅡ",
    ["ㅡ", "ㅣ"],
    "ㅣ",
  ];

  const jong = [
    "",
    "ㄱ",
    ["ㄱ", "ㄱ"],
    ["ㄱ", "ㅅ"],
    "ㄴ",
    ["ㄴ", "ㅈ"],
    ["ㄴ", "ㅎ"],
    "ㄷ",
    "ㄹ",
    ["ㄹ", "ㄱ"],
    ["ㄹ", "ㅁ"],
    ["ㄹ", "ㅂ"],
    ["ㄹ", "ㅅ"],
    ["ㄹ", "ㅌ"],
    ["ㄹ", "ㅍ"],
    ["ㄹ", "ㅎ"],
    "ㅁ",
    "ㅂ",
    ["ㅂ", "ㅅ"],
    "ㅅ",
    ["ㅅ", "ㅅ"],
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const hangulUniStart = 44032;
  const wordUni = word.charCodeAt(0);

  const relative = wordUni - hangulUniStart;

  const choIndex = parseInt(relative / 588);
  const jungIndex = parseInt((relative - choIndex * 588) / 28);
  const jongIndex = parseInt(relative % 28);

  return [cho[choIndex], jung[jungIndex], jong[jongIndex]];
}

// 초기화 실행
minigameInit();

// wordle-keyboard button 클릭 이벤트
[].forEach.call(buttons, (button) => {
  button.addEventListener("click", handleKeyboardClick);
});

// keydown 이벤트
document.addEventListener("keydown", handleKeydown);

// 다시하기 버튼 이벤트
btnAgain.addEventListener("click", minigameInit);
// howl
