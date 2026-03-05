function startLevel3(container, onComplete) {

    container.innerHTML = `
      <h3>Dodge the Obstacles ⚡</h3>
      <p>Move your character to avoid the falling obstacles!</p>
      <div id="playArea3" style="position: relative; width: 300px; height: 400px; margin: auto; border: 2px solid #ff4da6; overflow: hidden; border-radius: 15px;"></div>
      <p id="timer3">Time: 20</p>
    `;
  
    const playArea = document.getElementById("playArea3");
    const timerDisplay = document.getElementById("timer3");
  
    let timeLeft = 20; // seconds
    let obstacles = [];
    let gameInterval;
    let spawnInterval;
    let timerInterval;
  
    // Character (slightly smaller to increase difficulty)
    const character = document.createElement("div");
    character.style.position = "absolute";
    character.style.width = "30px"; // smaller
    character.style.height = "30px";
    character.style.bottom = "0";
    character.style.left = "135px";
    character.style.background = "#ff4da6";
    character.style.borderRadius = "10px";
    playArea.appendChild(character);
  
    // Spawn obstacles
    function createObstacle() {
      const obs = document.createElement("div");
      obs.style.position = "absolute";
      const size = 20 + Math.random()*15; // random sizes 20–35
      obs.style.width = size + "px";
      obs.style.height = size + "px";
      obs.style.top = "-40px";
      obs.style.left = Math.random() * (300 - size) + "px";
      obs.style.background = "#ff1e4d";
      obs.style.borderRadius = "50%";
      playArea.appendChild(obs);
      obstacles.push({el: obs, speed: 2 + Math.random() * 3}); // faster
    }
  
    spawnInterval = setInterval(createObstacle, 600); // spawn more often
  
    // Movement
    const moveHandler = (e) => {
      const rect = playArea.getBoundingClientRect();
      let x = e.clientX - rect.left - 15;
      if (x < 0) x = 0;
      if (x > 270) x = 270;
      character.style.left = x + "px";
    };
  
    const touchHandler = (e) => {
      const rect = playArea.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left - 15;
      if (x < 0) x = 0;
      if (x > 270) x = 270;
      character.style.left = x + "px";
    };
  
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("touchmove", touchHandler);
  
    // Game loop
    function update() {
      obstacles.forEach((obsObj, index) => {
        let top = parseFloat(obsObj.el.style.top);
        top += obsObj.speed;
        obsObj.el.style.top = top + "px";
  
        // Collision detection
        const charX = parseFloat(character.style.left);
        const charY = 370;
        const charSize = 30;
        if (
          top + parseFloat(obsObj.el.style.height) > charY &&
          top < charY + charSize &&
          parseFloat(obsObj.el.style.left) + parseFloat(obsObj.el.style.width) > charX &&
          parseFloat(obsObj.el.style.left) < charX + charSize
        ) {
          // Hit detected
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
  
        // Remove off-screen obstacles
        if (top > 400) {
          obsObj.el.remove();
          obstacles.splice(index,1);
        }
      });
  
      gameInterval = requestAnimationFrame(update);
    }
  
    gameInterval = requestAnimationFrame(update);
  
    // Timer countdown
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = `Time: ${timeLeft}`;
  
      if (timeLeft <= 0) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        cancelAnimationFrame(gameInterval);
        obstacles.forEach(o => o.el.remove());
        obstacles = [];
        window.removeEventListener("mousemove", moveHandler);
        window.removeEventListener("touchmove", touchHandler);
        onComplete();
      }
    }, 1000);
  }