const rewardImageContainer = document.getElementById("rewardImageContainer");
const downloadBtn = document.getElementById("downloadBtn");
const continueBtn = document.getElementById("continueBtn");

function showReward(levelNumber) {
  showScreen("reward");

  rewardImageContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("rewardWrapper");

  const img = document.createElement("img");
  img.src = `./images/img${levelNumber}.png`;
  img.classList.add("rewardImage");
  img.style.display = "none";

  wrapper.appendChild(img);
  rewardImageContainer.appendChild(wrapper);

  // Use direct download link
  downloadBtn.href = `./images/img${levelNumber}.png`;
  downloadBtn.download = `img${levelNumber}.png`;
  
  continueBtn.onclick = () => showScreen("map");
}
