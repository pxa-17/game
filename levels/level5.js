function startLevel5(container, onComplete) {
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 5 – Timed Reaction ⚡</h2>
        <p class="level-subtitle">Click the flashing hearts as fast as you can!</p>
        <div class="level-game-area">
          <div id="reactionArea" style="position: relative; width: 100%; max-width: 300px; height: 300px; margin: auto; border: none; overflow: hidden; border-radius: 12px; background: linear-gradient(135deg, #1a1a2e, #16213e);"></div>
        </div>
        <div class="level-stats">
          <span>Score: <strong id="score5">0</strong> / 10</span>
          <span>Time: <strong id="timer5">20</strong>s</span>
        </div>
      </div>
    `;
  
    const area = container.querySelector("#reactionArea");
    const scoreDisplay = container.querySelector("#score5");
    const timerDisplay = container.querySelector("#timer5");
    let score = 0;
    const targetScore = 10;
    let timeLeft = 20;
    let flashTimeout;
  
    function showHeart() {
      const heart = document.createElement("div");
      heart.innerText = "❤️";
      heart.style.position = "absolute";
      heart.style.fontSize = "32px";
      heart.style.left = Math.random() * (area.offsetWidth - 40) + "px";
      heart.style.top = Math.random() * (area.offsetHeight - 40) + "px";
      heart.style.cursor = "pointer";
      heart.style.animation = "pulse 0.5s ease";
      area.appendChild(heart);
  
      heart.onclick = () => {
        score++;
        scoreDisplay.innerText = score;
        scoreDisplay.classList.add("score-animate");
        setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);
        heart.remove();
        if(score >= targetScore){
          clearTimeout(flashTimeout);
          clearInterval(timerInterval);
          onComplete();
        }
      };
  
      setTimeout(()=>heart.remove(), 1000);
      flashTimeout = setTimeout(showHeart, 500 + Math.random()*1000);
    }
  
    showHeart();
  
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = timeLeft;
      
      if (timeLeft <= 10) {
        timerDisplay.classList.add("timer-warning");
      }
      
      if(timeLeft<=0){
        clearTimeout(flashTimeout);
        clearInterval(timerInterval);
        timerDisplay.classList.remove("timer-warning");
        alert("Time's up! Try again!");
        startLevel5(container, onComplete);
      }
    },1000);
  }
