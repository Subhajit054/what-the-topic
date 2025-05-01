const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const resultDiv = document.getElementById("resultText");

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  });

function startScan() {
  const topic = document.getElementById("searchTopic").value.toLowerCase();
  resultDiv.innerText = "Scanning...";
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  Tesseract.recognize(canvas, 'eng')
    .then(({ data: { text } }) => {
      const scannedText = text.toLowerCase();
      if (scannedText.includes(topic)) {
        resultDiv.innerText = `✅ Topic found: "${topic}"`;
      } else {
        resultDiv.innerText = `❌ Topic not found. Please flip the page.`;
        speechSynthesis.speak(new SpeechSynthesisUtterance("Please flip the page and scan again."));
      }
    });
}
