const comPanel = document.querySelector("#comPanel");
const startBtn = document.querySelector("#start");
const endBtn = document.querySelector("#end");
const comImg = comPanel.querySelector("#comImg");
let src = ["scissors", "rock", "paper"];

let imageIndex = 0;
//TODO ::
//가위바위보 구현
//스타트 버튼이 눌리면 함수 실행


//컴퓨터 이미지 회전 애니메이션
function rpc() {
    startBtn.value="sad";
    document.querySelector("#comImg").src = `../img/${src[imageIndex]}.gif`;
    imageIndex++;
    if (imageIndex >= src.length) {
        imageIndex = 0;
    }
}
let nIntervalId;

function changeImage() {
    if (!nIntervalId) {
        nIntervalId = setInterval(rpc, 100);
    }
}

function stopChangeImage() {
    clearInterval(nIntervalId);
    nIntervalId = null;
}
startBtn.addEventListener("click", changeImage);
endBtn.addEventListener("click", stopChangeImage);