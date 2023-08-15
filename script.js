
const openModalBtn = document.getElementById("openModalBtn");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const forwardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("backwardBtn");
const plusVolumeBtnVolumeBtn = document.getElementById("plusVolumeBtn");
const minusVolumeBtn = document.getElementById("minusVolumeBtn");
const speedSelect = document.getElementById("speedSelect");
const closeVideoModalBtn = document.getElementById("closeVideoModal");
let player;

openModalBtn.addEventListener("click", openModal);

async function openModal() {
  videoModal.style.display="block";
  if (!player) {
    player = new Vimeo.Player(videoFrame, {
      id: 76979871,
      autoplay: false,
    });

    player.on("cuepoint", onCuepoint);
  }

  const savedTime = localStorage.getItem("videoTime");
  if (savedTime) {
    const time = parseFloat(savedTime);
    await player.setCurrentTime(time);
  }
}

function onCuepoint(event) {
  localStorage.setItem("videoTime", event.seconds.toString());
}

function backwardTime(time){
  player.getCurrentTime().then((currentTime)=>{player.setCurrentTime(currentTime - time);});
}
function forwardTime(time) {
  player.getCurrentTime().then((currentTime) => {player.setCurrentTime(currentTime + time);});
}
function changeSpeed(speed) {
  player.setPlaybackRate(speed);
}
function changeVolume(change) {
  player.getVolume().then((volume) => {
    const newVolume = Math.max(0, Math.min(1, volume + change));
    player.setVolume(newVolume);
  });
}
closeVideoModalBtn.addEventListener("click", () => {
  localStorage.setItem("videoCurrentTime", videoFrame.currentTime); 
  videoModal.style.display = "none";
});

playBtn.addEventListener("click", () => player.play());
pauseBtn.addEventListener("click", () => player.pause());
forwardBtn.addEventListener("click", () => forwardTime(10));
backwardBtn.addEventListener("click", () => backwardTime(10));
speedSelect.addEventListener("change", () => changeSpeed(speedSelect.value));
plusVolumeBtnVolumeBtn.addEventListener("click", () => changeVolume(0.1));
minusVolumeBtn.addEventListener("click", () => changeVolume(-0.1));
