document.addEventListener("DOMContentLoaded", function () {

    const homeScreen = document.getElementById("home-screen");
    const levelMap = document.getElementById("level-map");
    const gameContainer = document.getElementById("game-container");
    
    const startBtn = document.getElementById("start-btn");
    const levelsContainer = document.getElementById("levels-container");
    const levelTitle = document.getElementById("level-title");
    const gameArea = document.getElementById("game-area");
    const backBtn = document.getElementById("back-btn");
    
    let unlockedLevel = 1;
    let currentLevel = 1;
    
    // START BUTTON
    startBtn.onclick = () => {
      homeScreen.style.display = "none";
      levelMap.style.display = "block";
      gameContainer.style.display = "none";
      generateLevels();
    };
    
    // GENERATE 46 LEVEL BUTTONS
    function generateLevels() {
      levelsContainer.innerHTML = "";
    
      for (let i = 1; i <= 46; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("level-btn");
    
        if (i <= unlockedLevel) {
          btn.classList.add("unlocked");
          btn.onclick = () => openLevel(i);
        } else {
          btn.classList.add("locked");
          btn.disabled = true;
        }
    
        levelsContainer.appendChild(btn);
      }
    }
    
    // OPEN LEVEL
    function openLevel(levelNumber) {
      currentLevel = levelNumber;
      levelMap.style.display = "none";
      gameContainer.style.display = "block";
    
      levelTitle.innerText = "Level " + currentLevel;
      loadLevel(currentLevel);
    }
    
    // LOAD IMAGE FOR LEVEL
    function loadLevel(levelNumber) {
      gameArea.innerHTML = `
        <img src="images/img${levelNumber}.png" width="250"><br><br>
        <p>Click below to complete this level.</p>
        <button id="complete-btn">Complete Level</button>
      `;
    
      document.getElementById("complete-btn").onclick = completeLevel;
    }
    
    // COMPLETE LEVEL
    function completeLevel() {
      if (currentLevel === unlockedLevel && unlockedLevel < 46) {
        unlockedLevel++;
      }
    
      alert("Level Completed!");
    
      gameContainer.style.display = "none";
      levelMap.style.display = "block";
      generateLevels();
    }
    
    // BACK BUTTON
    backBtn.onclick = () => {
      gameContainer.style.display = "none";
      levelMap.style.display = "block";
    };
    
    });