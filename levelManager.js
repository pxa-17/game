const levelMap = document.getElementById("levelMap");
const levelTitle = document.getElementById("levelTitle");
const gameContainer = document.getElementById("gameContainer");

const totalLevels = 46;

// Load saved progress or default to 1
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;

function generateMap() {
  levelMap.innerHTML = "";

  for (let i = 1; i <= totalLevels; i++) {

    const levelBtn = document.createElement("div");
    levelBtn.classList.add("levelCircle");
    levelBtn.innerText = i;

    if (i > unlockedLevel) {
      levelBtn.classList.add("locked");
    } else {
      levelBtn.onclick = () => startLevel(i);
    }

    levelMap.appendChild(levelBtn);
  }
}

function startLevel(levelNumber) {

  if (levelNumber > unlockedLevel) return;

  showScreen("game");
  levelTitle.innerText = "Level " + levelNumber;
  gameContainer.innerHTML = "";

  switch (levelNumber) {
    case 1:
      startLevel1(gameContainer, () => completeLevel(1));
      break;
    case 2:
      startLevel2(gameContainer, () => completeLevel(2));
      break;
    case 3:
      startLevel3(gameContainer, () => completeLevel(3));
      break;
    case 4:
      startLevel4(gameContainer, () => completeLevel(4));
      break;
    case 5:
      startLevel5(gameContainer, () => completeLevel(5));
      break;
    case 6:
      startLevel6(gameContainer, () => completeLevel(6));
    break;
    case 7:
      startLevel7(gameContainer, () => completeLevel(7));
    break;
    case 8:
      startLevel8(gameContainer, () => completeLevel(8));
    break;
    case 9:
      startLevel9(gameContainer, () => completeLevel(9));
    break;
    case 10:
      startLevel10(gameContainer, () => completeLevel(10));
    break;
    case 11:
      startLevel11(gameContainer, () => completeLevel(11));
    break;
    case 12:
      startLevel12(gameContainer, () => completeLevel(12));
    break;
    case 13:
      startLevel13(gameContainer, () => completeLevel(13));
    break;
    case 14:
      startLevel14(gameContainer, () => completeLevel(14));
    break;
    case 15:
      startLevel15(gameContainer, () => completeLevel(15));
    break;
    case 16:
      startLevel16(gameContainer, () => completeLevel(16));
    break;
    case 17:
      startLevel17(gameContainer, () => completeLevel(17));
    break;
    case 18:
      startLevel18(gameContainer, () => completeLevel(18));
    break;
    case 19:
      startLevel19(gameContainer, () => completeLevel(19));
    break;
    case 20:
      startLevel20(gameContainer, () => completeLevel(20));
    break;
    case 21:
      startLevel21(gameContainer, () => completeLevel(21));
    break;
    case 22:
      startLevel22(gameContainer, () => completeLevel(22));
    break;
    case 23:
      startLevel23(gameContainer, () => completeLevel(23));
    break;
    case 24:
      startLevel24(gameContainer, () => completeLevel(24));
    break;
    case 25:
      startLevel25(gameContainer, () => completeLevel(25));
    break;
    case 26:
      startLevel26(gameContainer, () => completeLevel(26));
    break;
    case 27:
      startLevel27(gameContainer, () => completeLevel(27));
    break;
    case 28:
      startLevel28(gameContainer, () => completeLevel(28));
    break;
    case 29:
      startLevel29(gameContainer, () => completeLevel(29));
    break;
    case 30:
      startLevel30(gameContainer, () => completeLevel(30));
    break;
    case 31:
      startLevel31(gameContainer, () => completeLevel(31));
    break;
    case 32:
      startLevel32(gameContainer, () => completeLevel(32));
    break;
    case 33:
      startLevel33(gameContainer, () => completeLevel(33));
    break;
    case 34:
      startLevel34(gameContainer, () => completeLevel(34));
    break;
    case 35:
      startLevel35(gameContainer, () => completeLevel(35));
    break;
    case 36:
      startLevel36(gameContainer, () => completeLevel(36));
    break;
    case 37:
      startLevel37(gameContainer, () => completeLevel(37));
    break;
    case 38:
      startLevel38(gameContainer, () => completeLevel(38));
    break;
    case 39:
      startLevel39(gameContainer, () => completeLevel(39));
    break;
    case 40:
      startLevel40(gameContainer, () => completeLevel(40));
    break;
    case 41:
      startLevel41(gameContainer, () => completeLevel(41));
    break;
    case 42:
      startLevel42(gameContainer, () => completeLevel(42));
    break;
    case 43:
      startLevel43(gameContainer, () => completeLevel(43));
    break;
    case 44:
      startLevel44(gameContainer, () => completeLevel(44));
    break;
    case 45:
      startLevel45(gameContainer, () => completeLevel(45));
    break;
    case 46:
      startLevel46(gameContainer, () => completeLevel(46));
    break;   
    default:
      gameContainer.innerHTML = "<p>Level not built yet.</p>";
  }
}

function completeLevel(levelNumber) {

  // Only unlock if this is the current highest unlocked level
  if (levelNumber === unlockedLevel && unlockedLevel < totalLevels) {
    unlockedLevel++;
    localStorage.setItem("unlockedLevel", unlockedLevel);
  }

  generateMap();
  showReward(levelNumber);
}

generateMap();