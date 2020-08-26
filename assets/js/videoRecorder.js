const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;


const handleVideoData = e => {
    console.log("handleVideoData:" + e.data);
    const { data: videoFile } = e;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const stopRecording = () => {
    console.log("stop recording");
    if (videoRecorder.state != "inactive") {
        videoRecorder.stop();
    }
    recordBtn.removeEventListener("click", stopRecording);

    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
    console.log("startRecording");
    videoRecorder = new MediaRecorder(streamObject);
    // videoRecorder.start(1000);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData); // null;
    //videoRecorder.ondataavailable = handleVideoData;

    recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });

        console.log(stream); // stream ㅈㅏ체는 볼 수 없다. 010001이런식으로 데이터가 생성되어있는 형태라고 말하심. stream 은  srcObject에 오브젝트로 담아야 한다고 하심.
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();

        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = "⚠️ can't record";
        // recordBtn.removeEventListener("click", startRecording);
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
};

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    console.log("recorder init~~~");
    init();
}