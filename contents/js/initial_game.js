console.log(currentTime);
let quiz = [
  {
    hint: "힌트없음",
    initial: "ㅈㅂㅅㅋㄹㅌ",
    answer: "자바스크립트",
  },
  {
    hint: "3주차",
    initial: "ㅇㅅㅌㅋㄹ",
    answer: "인스타클론",
  },
  {
    hint: "힌트없음",
    initial: "ㅇㄹㅅ",
    answer: "앨리스",
  },
  {
    hint: "이고잉 코치님",
    initial: "ㅇㅇㄱ",
    answer: "일억개",
  },
  {
    hint: "here",
    initial: "ㅇㅅㅎㄴㄹㅇㄱㅇ",
    answer: "이상한나라의게임",
  },
  {
    hint: "우리의 목표",
    initial: "ㄴㅋㄹㅋㅂ",
    answer: "네카라쿠배",
  },
  {
    hint: "function",
    initial: "ㅎㅅ",
    answer: "함수",
  },
  {
    hint: "[a, b, c]",
    initial: "ㅂㅇ",
    answer: "배열",
  },
  {
    hint: "setTimeout",
    initial: "ㅂㄷㄱㅎㅅ",
    answer: "비동기함수",
  },
  {
    hint: "우리집 강아지 이름",
    initial: "ㅁㄱ",
    answer: "망고",
  },
  {
    hint: "힘들어",
    initial: "ㅈㄱㄷ",
    answer: "죽겠다",
  },
  {
    hint: "window",
    initial: "ㅈㅇㄱㅊ",
    answer: "전역객체",
  },
  {
    hint: "엄마는",
    initial: "ㅇㄱㅇ",
    answer: "외계인",
  },
  {
    hint: "이것도",
    initial: "ㅁㅊㅂㅅㅈ",
    answer: "맞춰보시지",
  },
  {
    hint: "스위스의 수도",
    initial: "ㅂㄹ",
    answer: "베른",
  },
  {
    hint: "여자, 바람, 돌의 섬",
    initial: "ㅅㄷㄷ",
    answer: "삼다도",
  },
  {
    hint: "사자성어",
    initial: "ㄱㅇㅂㄱ",
    answer: "과유불급",
  },
  {
    hint: "시각, 청각, 후각, 미각, ㅇㅇ",
    initial: "ㅊㄱ",
    answer: "촉각",
  },
  {
    hint: "이탈리아",
    initial: "ㅍㅅㅇㅅㅌ",
    answer: "피사의사탑",
  },
  {
    hint: "영화",
    initial: "ㅌㅇㅌㄴ",
    answer: "타이타닉",
  },
  {
    hint: "배우",
    initial: "ㅁㄹㄹㅁㄹ",
    answer: "마릴린먼로",
  },
  {
    hint: "5/15",
    initial: "ㅅㅅㅇㄴ",
    answer: "스승의날",
  },
];

// 처음 시작 박스, 시작버튼
let startBtn = document.querySelector(".start-btn");
let startBox = document.querySelector(".start-box");
startBtn.addEventListener("click", startGame);

// 게임 시작
function startGame(e) {
  e.preventDefault();

  // 시작 박스 숨김
  function hideStartBox() {
    startBox.style.display = "none";
  }
  hideStartBox();

  let hintArea = document.querySelector(".hint");
  let initial = document.querySelector(".initial");
  let answerResult = document.querySelector(".answer-result");
  let answer = document.querySelector(".answer");
  let result = document.querySelector(".result");
  let questionNum = document.querySelector(".questionNum");

  // 점수 반영
  let scoreNum = document.querySelector(".score-num");
  let judgeYou = document.querySelector(".judgeYou");
  let resultScoreNum = document.querySelector(".result-score-num");
  let score = 0;
  scoreNum.innerText = score;

  let count = 0;
  let countArr = [];
  let quizNum = 10;

  // 결과 모달창
  function resultBox() {
    resultScoreNum.innerText = score;
    if (score <= 30) {
      judgeYou.innerHTML = "Oops...";
    } else if (score > 30 && score <= 60) {
      judgeYou.innerHTML = "Try Again?";
    } else if (score > 60 && score <= 90) {
      judgeYou.innerHTML = "Well Done!";
    } else if (score === 100) {
      judgeYou.innerHTML = "Awesome!!";
      judgeYou.className = "awesome";
      setTimeout(() => {
        RestartConfetti();
      }, 1500);
    }
  }

  // 문제 번호
  questionNum.innerHTML = `Quiz <span style="font-weight:bold">${
    count + 1
  }</span>`;

  // 문제 랜덤 추출
  for (let i = 0; i < quizNum; i++) {
    let randomNum = Math.floor(Math.random() * quiz.length);
    if (countArr.indexOf(randomNum) === -1) countArr.push(randomNum); // 중복x
    else i--;
  }

  hintArea.innerText = quiz[countArr[count]].hint;
  initial.innerText = quiz[countArr[count]].initial;

  // 카운트다운
  let timer = document.querySelector(".timer-num");
  let time = 4;
  let myTimer = setInterval(countDown, 1000);
  function countDown() {
    if (time > 0) {
      timer.innerText = time;
      time--;
    } else if (time === 0) {
      timer.innerText = 0;
      showAnswer();
      setTimeout(() => {
        nextQuiz();
        if (count === quizNum) {
          result.style.display = "block";
          resultBox();
        }
      }, 1500);
    }
  }

  // 제출버튼 클릭 이벤트
  let submit = document.querySelector(".submit");
  submit.addEventListener("click", submitClick);
  // answer.addEventListener("click", countDown)

  function submitClick(e) {
    e.preventDefault();
    playGame();
  }

  // time === 0 일시 답안 노출
  function showAnswer() {
    hintArea.innerText = quiz[countArr[count]].hint;
    initial.innerText = quiz[countArr[count]].initial;
    questionNum.innerHTML = `Quiz <span style="font-weight:bold">${
      count + 1
    }</span>`;

    answerResult.innerHTML = `정답 : <span style="font-weight:bold; color:red">${
      quiz[countArr[count]].answer
    }</span>`;
    answerResult.style.display = "block";
    answer.disabled = true;
    submit.disabled = true;

    count++;
    window.clearInterval(myTimer);
  }

  // 답안 제출시 하단 텍스트 노출
  function submitAnswer() {
    if (answer.value === quiz[countArr[count]].answer && count < quizNum) {
      answerResult.innerHTML = `"<span style="font-weight:bold; color:blue">${
        quiz[countArr[count]].answer
      }</span>" 정답!`;
      answerResult.style.display = "block";
      score += 10;
      scoreNum.innerHTML = score;
      window.clearInterval(myTimer);
      answer.disabled = true;
      submit.disabled = true;
    } else if (
      answer.value !== quiz[countArr[count]].answer &&
      count < quizNum
    ) {
      answerResult.innerHTML = `정답 : <span style="font-weight:bold; color:red">${
        quiz[countArr[count]].answer
      }</span>`;
      answerResult.style.display = "block";
      window.clearInterval(myTimer);
      answer.disabled = true;
      submit.disabled = true;
    }
    // 마지막문제 후 모달창 display:block
    else if (
      answer.value === quiz[countArr[count]].answer &&
      count === quizNum
    ) {
      answerResult.innerHTML = `"<span style="font-weight:bold; color:blue">${
        quiz[countArr[count]].answer
      }</span>" 정답!`;
      answerResult.style.display = "block";
      score += 10;
      scoreNum.innerHTML = score;
      window.clearInterval(myTimer);
      result.style.display = "block";
      answer.disabled = true;
      submit.disabled = true;
    } else if (
      answer.value !== quiz[countArr[count]].answer &&
      count === quizNum
    ) {
      answerResult.innerHTML = `정답 : <span style="font-weight:bold"; color:red">${
        quiz[countArr[count]].answer
      }</span>`;
      answerResult.style.display = "block";
      window.clearInterval(myTimer);
      result.style.display = "block";
      answer.disabled = true;
      submit.disabled = true;
    }

    // 결과 모달창
    resultBox();
  }

  // 노출된 답안 숨김, 카운트다운 리셋
  function nextQuiz() {
    if (count < quizNum) {
      hintArea.innerText = quiz[countArr[count]].hint;
      initial.innerText = quiz[countArr[count]].initial;
      questionNum.innerHTML = `Quiz <span style="font-weight:bold">${
        count + 1
      }</span>`;

      answerResult.style.display = "none";
      answer.value = "";
      answer.disabled = false;
      answer.focus();
      submit.disabled = false;

      timer.innerText = 5;
      time = 4;
      window.clearInterval(myTimer);
      myTimer = window.setInterval(countDown, 1000);
    } else result.style.display = "block";
  }

  // playGame
  function playGame() {
    submitAnswer();
    // 답안 노출 후 숨기고 다음문제까지 1.5초
    setTimeout(() => {
      if (count < quizNum) count++;
      nextQuiz();
    }, 1500);
  }

  //꽃가루 이펙트 / 출처 : https://kmkblog.tistory.com/292?category=1065511
  var canvas;
  var ctx;
  var W;
  var H;
  var mp = 150; //max particles
  var particles = [];
  var angle = 0;
  var tiltAngle = 0;
  var confettiActive = true;
  var animationComplete = true;
  var deactivationTimerHandler;
  var reactivationTimerHandler;
  var animationHandler;

  // objects

  var particleColors = {
    colorOptions: [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "pink",
      "SlateBlue",
      "lightblue",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ],
    colorIndex: 0,
    colorIncrementer: 0,
    colorThreshold: 10,
    getColor: function () {
      if (this.colorIncrementer >= 10) {
        this.colorIncrementer = 0;
        this.colorIndex++;
        if (this.colorIndex >= this.colorOptions.length) {
          this.colorIndex = 0;
        }
      }
      this.colorIncrementer++;
      return this.colorOptions[this.colorIndex];
    },
  };

  function confettiParticle(color) {
    this.x = Math.random() * W; // x-coordinate
    this.y = Math.random() * H - H; //y-coordinate
    this.r = RandomFromTo(10, 15); //radius;
    this.d = Math.random() * mp + 10; //density;
    this.color = color;
    this.tilt = Math.floor(Math.random() * 10) - 10;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function () {
      ctx.beginPath();
      ctx.lineWidth = this.r / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
      return ctx.stroke();
    };
  }

  $(document).ready(function () {
    SetGlobals();
    // InitializeButton();
    //InitializeConfetti();

    $(window).resize(function () {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });
  });

  function SetGlobals() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }

  function InitializeConfetti() {
    particles = [];
    animationComplete = false;
    for (var i = 0; i < mp; i++) {
      var particleColor = particleColors.getColor();
      particles.push(new confettiParticle(particleColor));
    }
    StartConfetti();
  }

  function Draw() {
    ctx.clearRect(0, 0, W, H);
    var results = [];
    for (var i = 0; i < mp; i++) {
      (function (j) {
        results.push(particles[j].draw());
      })(i);
    }
    Update();

    return results;
  }

  function RandomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function Update() {
    var remainingFlakes = 0;
    var particle;
    angle += 0.01;
    tiltAngle += 0.1;

    for (var i = 0; i < mp; i++) {
      particle = particles[i];
      if (animationComplete) return;

      if (!confettiActive && particle.y < -15) {
        particle.y = H + 100;
        continue;
      }

      stepParticle(particle, i);

      if (particle.y <= H) {
        remainingFlakes++;
      }
      CheckForReposition(particle, i);
    }

    if (remainingFlakes === 0) {
      StopConfetti();
    }
  }

  function CheckForReposition(particle, index) {
    if (
      (particle.x > W + 20 || particle.x < -20 || particle.y > H) &&
      confettiActive
    ) {
      if (index % 5 > 0 || index % 2 == 0) {
        //66.67% of the flakes
        repositionParticle(
          particle,
          Math.random() * W,
          -10,
          Math.floor(Math.random() * 10) - 20
        );
      } else {
        if (Math.sin(angle) > 0) {
          //Enter from the left
          repositionParticle(
            particle,
            -20,
            Math.random() * H,
            Math.floor(Math.random() * 10) - 20
          );
        } else {
          //Enter from the right
          repositionParticle(
            particle,
            W + 20,
            Math.random() * H,
            Math.floor(Math.random() * 10) - 20
          );
        }
      }
    }
  }
  function stepParticle(particle, particleIndex) {
    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
    particle.x += Math.sin(angle);
    particle.tilt = Math.sin(particle.tiltAngle - particleIndex / 3) * 15;
  }

  function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
    particle.x = xCoordinate;
    particle.y = yCoordinate;
    particle.tilt = tilt;
  }

  function StartConfetti() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    (function animloop() {
      if (animationComplete) return null;
      animationHandler = requestAnimFrame(animloop);
      return Draw();
    })();
  }

  function ClearTimers() {
    clearTimeout(reactivationTimerHandler);
    clearTimeout(animationHandler);
  }

  function DeactivateConfetti() {
    confettiActive = false;
    ClearTimers();
  }

  function StopConfetti() {
    animationComplete = true;
    if (ctx == undefined) return;
    ctx.clearRect(0, 0, W, H);
  }

  function RestartConfetti() {
    ClearTimers();
    StopConfetti();
    reactivationTimerHandler = setTimeout(function () {
      confettiActive = true;
      animationComplete = false;
      InitializeConfetti();
    }, 100);
  }

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}
