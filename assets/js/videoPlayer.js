const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}
function init() {
    playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
    init(); //왜 이런 방식으로 하는지 이해하자 
}