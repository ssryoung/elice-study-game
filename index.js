let music = new Howl({
  src: "/contents/sound/Cute_Wiggling_Baby_Background_Music.mp3",
  autoplay: true,
  volume: 0.6,
  loop: true,
});

let currentTime = localStorage.getItem("audioCurrentTime");

// howl
//페이드 효과주기
function playBgm(currentTime) {
  if (currentTime !== undefined) {
    music.fade(0.2, 0.6, 2000);
    music.seek(currentTime);
    music.play();
  }
}

//화면이 로딩될때 bgm재생
window.onload = () => {
  playBgm(currentTime);
};

//화면이 언로딩될때 현재 time => localStorage에 저장
window.onunload = () => {
  localStorage.setItem("audioCurrentTime", music.seek());
  music.fade(0.6, 0.1, 1000);
  console.log("end music" + music.seek());
};
