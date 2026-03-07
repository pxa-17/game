function startLevel7(container, onComplete){
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 7 – Balloon Pop 🎈</h2>
        <p class="level-subtitle">Pop the colorful balloons before time runs out!</p>
        <div class="level-game-area">
          <div id="balloonArea" style="position:relative; width:100%; max-width:300px; height:380px; margin:auto; border:none; border-radius:12px; overflow:hidden; background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%); touch-action: none;"></div>
        </div>
        <div class="level-stats">
          <span>Score: <strong id="score7">0</strong> / 20</span>
          <span>Time: <strong id="timer7">20</strong>s</span>
        </div>
      </div>
    `;
  
    const balloonArea = container.querySelector("#balloonArea");
    const scoreDisplay = container.querySelector("#score7");
    const timerDisplay = container.querySelector("#timer7");
  
    const colors = ["#ff4da6", "#ffd700", "#1e90ff", "#32cd32", "#ff6b6b", "#9b59b6"];
    const targetScore = 20;
    let score = 0;
    let timeLeft = 20;
    let spawnInterval;
    let timerInterval;
  
    function createBalloon() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const balloon = document.createElement("div");
      balloon.style.cssText = `
        width: 45px;
        height: 55px;
        background: ${color};
        border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
        position: absolute;
        cursor: pointer;
        box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
        left: ${Math.random() * (balloonArea.offsetWidth - 50)}px;
        bottom: -60px;
      `;
  
      // Add string
      const string = document.createElement("div");
      string.style.cssText = `
        width: 2px;
        height: 25px;
        background: rgba(0,0,0,0.3);
        margin: 0 auto;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
      `;
      balloon.appendChild(string);
  
      balloonArea.appendChild(balloon);
  
      // Pop on click/touch
      balloon.addEventListener("click", () => popBalloon(balloon));
      balloon.addEventListener("touchstart", (e) => {
        e.preventDefault();
        popBalloon(balloon);
      });
  
      // Animate balloon up
      const duration = 3 + Math.random() * 2;
      balloon.style.transition = `bottom ${duration}s linear`;
      
      setTimeout(() => {
        balloon.style.bottom = balloonArea.offsetHeight + 60 + "px";
      }, 50);
  
      // Remove balloon after it flies away
      setTimeout(() => {
        if(balloon.parentNode) {
          balloon.remove();
        }
      }, duration * 1000 + 100);
    }
  
    function popBalloon(balloon) {
      if(!balloon.parentNode) return;
      
      balloon.remove();
      score++;
      scoreDisplay.innerText = score;
      scoreDisplay.classList.add("score-animate");
      setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);
      
      if(score >= targetScore) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        if(onComplete) onComplete();
      }
    }
  
    spawnInterval = setInterval(createBalloon, 600);
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = timeLeft;
      
      if(timeLeft <= 10) {
        timerDisplay.classList.add("timer-warning");
      }
      
      if(timeLeft <= 0) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        timerDisplay.classList.remove("timer-warning");
        alert("Time's up! Try again!");
        startLevel7(container, onComplete);
      }
    }, 1000);
  }
