const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });

        console.log(stream); // stream ㅈㅏ체는 볼 수 없다. 010001이런식으로 데이터가 생성되어있는 형태라고 말하심. stream 은  srcObject에 오브젝트로 담아야 한다고 하심.
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    } catch (error) {
        recordBtn.innerHTML = "⚠️ can't record";
        recordBtn.removeEventListener("click", startRecording);
    }
};

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
    console.log("recorder init~~~");
    init();
}