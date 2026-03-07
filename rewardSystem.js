const rewardImageContainer = document.getElementById("rewardImageContainer");
const downloadBtn = document.getElementById("downloadBtn");
const continueBtn = document.getElementById("continueBtn");

let currentLevelNumber = 1;

function downloadImage(levelNumber) {
  fetch(`images/img${levelNumber}.png`)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `img${levelNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error('Download failed:', err);
      window.open(`images/img${levelNumber}.png`, '_blank');
    });
}

function showReward(levelNumber) {
  showScreen("reward");
  currentLevelNumber = levelNumber;

  rewardImageContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("rewardWrapper");

  const img = document.createElement("img");
  img.src = `images/img${levelNumber}.png`;
  img.classList.add("rewardImage");
  img.style.display = "none"; // Hide image, only allow download

  wrapper.appendChild(img);
  rewardImageContainer.appendChild(wrapper);

  downloadBtn.onclick = () => downloadImage(levelNumber);
  downloadBtn.href = "#";
  downloadBtn.style.pointerEvents = "auto";

  continueBtn.onclick = () => showScreen("map");
}
