function startLevel1(container, onComplete) {

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 1 – Collect Stars ⭐</h2>
      <p class="level-subtitle">Click the falling stars before time runs out!</p>
      <div class="level-game-area">
        <div id="playArea" style="position: relative; width: 100%; max-width: 300px; height: 350px; margin: auto; border: none; overflow: hidden; border-radius: 12px; background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);"></div>
      </div>
      <div class="level-stats">
        <span>Score: <strong id="score">0</strong> / 10</span>
        <span>Time: <strong id="timer">20</strong>s</span>
      </div>
    </div>
  `;

  const playArea = document.getElementById("playArea");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let score = 0;
  const targetScore = 10;
  let timeLeft = 20;

  function createStar() {
    const star = document.createElement("div");
    star.innerText = "⭐";
    star.style.position = "absolute";
    star.style.fontSize = "30px";
    star.style.left = Math.random() * (playArea.offsetWidth - 40) + "px";
    star.style.top = "-40px";
    star.style.cursor = "pointer";
    star.style.transition = "transform 0.1s";
    playArea.appendChild(star);

    const speed = 2 + Math.random() * 2;

    const fall = setInterval(() => {
      let top = parseFloat(star.style.top);
      top += speed;
      star.style.top = top + "px";

      if (top > playArea.offsetHeight) {
        clearInterval(fall);
        star.remove();
      }
    }, 20);

    star.onclick = () => {
      clearInterval(fall);
      star.remove();
      score++;
      scoreDisplay.innerText = score;
      scoreDisplay.classList.add("score-animate");
      setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);

      if (score >= targetScore) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        onComplete();
      }
    };
  }

  const spawnInterval = setInterval(createStar, 800);

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    
    if (timeLeft <= 10) {
      timerDisplay.classList.add("timer-warning");
    }

    if (timeLeft <= 0) {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
      timerDisplay.classList.remove("timer-warning");
      alert("Time's up! Try again 💖");
      startLevel1(container, onComplete);
    }
  }, 1000);
}
