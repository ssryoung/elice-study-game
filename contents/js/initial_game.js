let quiz = [
  {
    hint : "힌트없음",
    initial : "ㅈㅂㅅㅋㄹㅌ",
    answer : "자바스크립트"
  },
  {
    hint : "3주차",
    initial : "ㅇㅅㅌㅋㄹ",
    answer : "인스타클론"
  },
  {
    hint : "힌트없음",
    initial : "ㅇㄹㅅ",
    answer : "앨리스"
  },
  {
    hint : "이고잉 코치님",
    initial : "ㅇㅇㄱ",
    answer : "일억개"
  },
  {
    hint : "here",
    initial : "ㅇㅅㅎㄴㄹㅇㄱㅇ",
    answer : "이상한나라의게임"
  },
  {
    hint : "우리의 목표",
    initial : "ㄴㅋㄹㅋㅂ",
    answer : "네카라쿠배"
  },
  {
    hint : "function",
    initial : "ㅎㅅ",
    answer : "함수"
  },
  {
    hint : "[a, b, c]",
    initial : "ㅂㅇ",
    answer : "배열"
  },
  {
    hint : "setTimeout",
    initial : "ㅂㄷㄱㅎㅅ",
    answer : "비동기함수"
  },
  {
    hint : "우리집 강아지 이름",
    initial : "ㅁㄱ",
    answer : "망고"
  },
  {
    hint : "힘들어",
    initial : "ㅈㄱㄷ",
    answer : "죽겠다"
  },
  {
    hint : "window",
    initial : "ㅈㅇㄱㅊ",
    answer : "전역객체"
  },
  {
    hint : "엄마는",
    initial : "ㅇㄱㅇ",
    answer : "외계인"
  },
  {
    hint : "이것도",
    initial : "ㅁㅊㅂㅅㅈ",
    answer : "맞춰보시지"
  },
  {
    hint : "스위스의 수도",
    initial : "ㅂㄹ",
    answer : "베른"
  },
  {
    hint : "여자, 바람, 돌의 섬",
    initial : "ㅅㄷㄷ",
    answer : "삼다도"
  },
  {
    hint : "속담",
    initial : "ㄱㅇㅂㄱ",
    answer : "과유불급"
  },
  {
    hint : "시각, 청각, 후각, 미각, ㅇㅇ",
    initial : "ㅊㄱ",
    answer : "촉각"
  },
  {
    hint : "이탈리아",
    initial : "ㅍㅅㅇㅅㅌ",
    answer : "피사의사탑"
  },
  {
    hint : "영화",
    initial : "ㅌㅇㅌㄴ",
    answer : "타이타닉"
  },
  {
    hint : "배우",
    initial : "ㅁㄹㄹㅁㄹ",
    answer : "마릴린먼로"
  },
  {
    hint : "515",
    initial : "ㅅㅅㅇㄴ",
    answer : "스승의날"
  },
  {
    hint : "",
    initial : "",
    answer : ""
  },
]

let answer = document.querySelector(".answer")
let submit = document.querySelector(".submit")
let startBtn = document.querySelector(".start-btn")
let startBox = document.querySelector(".start-box")

function submitAnswer(e) {
  e.preventDefault();
  
}

function startGame(e) {
  e.preventDefault();
  startBox.style.display = "none"
}

submit.addEventListener("click", submitAnswer)
startBtn.addEventListener("click", startGame)