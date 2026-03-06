function startLevel3(container, onComplete) {

    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 3 – Dodge Obstacles ⚡</h2>
        <p class="level-subtitle">Move your character to avoid the falling obstacles!</p>
        <div class="level-game-area">
          <div id="playArea3" style="position: relative; width: 100%; max-width: 300px; height: 350px; margin: auto; border: none; overflow: hidden; border-radius: 12px; background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);"></div>
        </div>
        <div class="level-stats">
          <span>Time: <strong id="timer3">20</strong>s</span>
        </div>
      </div>
    `;
  
    const playArea = document.getElementById("playArea3");
    const timerDisplay = document.getElementById("timer3");
  
    let timeLeft = 20;
    let obstacles = [];
    let gameInterval;
    let spawnInterval;
    let timerInterval;
  
    const character = document.createElement("div");
    character.style.position = "absolute";
    character.style.width = "30px";
    character.style.height = "30px";
    character.style.bottom = "10px";
    character.style.left = "135px";
    character.style.background = "linear-gradient(135deg, #ff4da6, #ff85c1)";
    character.style.borderRadius = "10px";
    character.style.boxShadow = "0 0 15px rgba(255, 77, 166, 0.6)";
    playArea.appendChild(character);
  
    function createObstacle() {
      const obs = document.createElement("div");
      obs.style.position = "absolute";
      const size = 20 + Math.random() * 15;
      obs.style.width = size + "px";
      obs.style.height = size + "px";
      obs.style.top = "-40px";
      obs.style.left = Math.random() * (300 - size) + "px";
      obs.style.background = "linear-gradient(135deg, #ff1e4d, #ff6b6b)";
      obs.style.borderRadius = "50%";
      obs.style.boxShadow = "0 0 10px rgba(255, 30, 77, 0.5)";
      playArea.appendChild(obs);
      obstacles.push({el: obs, speed: 2 + Math.random() * 3});
    }
  
    spawnInterval = setInterval(createObstacle, 600);
  
    const moveHandler = (e) => {
      const rect = playArea.getBoundingClientRect();
      let x = e.clientX - rect.left - 15;
      if (x < 0) x = 0;
      if (x > playArea.offsetWidth - 30) x = playArea.offsetWidth - 30;
      character.style.left = x + "px";
    };
  
    const touchHandler = (e) => {
      const rect = playArea.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left - 15;
      if (x < 0) x = 0;
      if (x > playArea.offsetWidth - 30) x = playArea.offsetWidth - 30;
      character.style.left = x + "px";
    };
  
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("touchmove", touchHandler);
  
    function update() {
      obstacles.forEach((obsObj, index) => {
        let top = parseFloat(obsObj.el.style.top);
        top += obsObj.speed;
        obsObj.el.style.top = top + "px";
  
        const charX = parseFloat(character.style.left);
        const charY = playArea.offsetHeight - 40;
        const charSize = 30;
        if (
          top + parseFloat(obsObj.el.style.height) > charY &&
          top < charY + charSize &&
          parseFloat(obsObj.el.style.left) + parseFloat(obsObj.el.style.width) > charX &&
          parseFloat(obsObj.el.style.left) < charX + charSize
        ) {
          clearInterval(spawnInterval);
          clearInterval(timerInterval);
          cancelAnimationFrame(gameInterval);
          obstacles.forEach(o => o.el.remove());
          obstacles = [];
          window.removeEventListener("mousemove", moveHandler);
          window.removeEventListener("touchmove", touchHandler);
          alert("Oops! You got hit. Try again!");
          startLevel3(container, onComplete);
        }
  
        if (top > playArea.offsetHeight) {
          obsObj.el.remove();
          obstacles.splice(index, 1);
        }
      });
  
      gameInterval = requestAnimationFrame(update);
    }
  
    gameInterval = requestAnimationFrame(update);
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = timeLeft;
      
      if (timeLeft <= 10) {
        timerDisplay.classList.add("timer-warning");
      }
  
      if (timeLeft <= 0) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        cancelAnimationFrame(gameInterval);
        obstacles.forEach(o => o.el.remove());
        obstacles = [];
        window.removeEventListener("mousemove", moveHandler);
        window.removeEventListener("touchmove", touchHandler);
        timerDisplay.classList.remove("timer-warning");
        onComplete();
      }
    }, 1000);
  }
