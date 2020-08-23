const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function exitFullScreen() {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
    document.exitFullscreen();

    // if (document.exitFullscreen) {
    //     document.exitFullscreen();
    // } else if (document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    // } else if (document.webkitExitFullscreen) {
    //     document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    // }
}

function goFullScreen() {
    videoContainer.requestFullscreen();

    // if (videoContainer.requestFullscreen) {
    //     videoContainer.requestFullscreen();
    // } else if (videoContainer.mozRequestFullScreen) {
    //     videoContainer.mozRequestFullScreen();
    // } else if (videoContainer.webkitRequestFullscreen) {
    //     videoContainer.webkitRequestFullscreen();
    // } else if (videoContainer.msRequestFullscreen) {
    //     videoContainer.msRequestFullscreen();
    // }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (totalSeconds) => {
    const secondsNumber = parseInt(totalSeconds, 10);

    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let seconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
    const totalTimeString = formatDate(videoPlayer.duration);
    console.log("[totalTimeString]" + totalTimeString);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function init() {
    console.log("??????");
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);

    if (videoPlayer.readyState >= 0) {
        console.log("... what happend..?");
        setTotalTime();
    }
}

if (videoContainer) {
    console.log("...................");
    init(); //왜 이런 방식으로 하는지 이해하자 
    console.log("...................22222");
}