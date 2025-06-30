// Access camera
const video = document.getElementById('video');
const canvas = document.getElementById('snapshot');
const statusText = document.getElementById('scanStatus');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    statusText.textContent = "❌ Could not access camera.";
    console.error("Camera error:", error);
  });

document.getElementById('scanBtn').addEventListener('click', () => {
  statusText.textContent = "🔍 Scanning iris...";
  setTimeout(() => {
    // Fake capture (screenshot of video)
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    statusText.textContent = "✅ Iris scan successful!";
  }, 2000); // simulate 2 sec scan delay
});
