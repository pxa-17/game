const rewardImageContainer = document.getElementById("rewardImageContainer");
const downloadBtn = document.getElementById("downloadBtn");
const continueBtn = document.getElementById("continueBtn");

function showReward(levelNumber) {
  showScreen("reward");

  rewardImageContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("rewardWrapper");

  const img = document.createElement("img");
  img.src = `images/img${levelNumber}.png`;
  img.classList.add("rewardImage");
  img.style.display = "none"; // Hide image, only allow download

  wrapper.appendChild(img);
  rewardImageContainer.appendChild(wrapper);

  downloadBtn.href = `images/img${levelNumber}.png`;
  downloadBtn.download = `img${levelNumber}.png`;
  downloadBtn.target = "_blank";

  continueBtn.onclick = () => showScreen("map");
}