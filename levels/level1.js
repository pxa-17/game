function startLevel1(container, onComplete) {

  container.innerHTML = `
    <h3>Collect 10 Stars ⭐</h3>
    <div id="playArea" style="position: relative; width: 300px; height: 400px; margin: auto; border: 2px solid #ff4da6; overflow: hidden; border-radius: 15px;"></div>
    <p id="score">Score: 0</p>
    <p id="timer">Time: 20</p>
  `;

  const playArea = document.getElementById("playArea");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let score = 0;
  const targetScore = 10;
  let timeLeft = 20; // seconds

  // Spawn stars
  function createStar() {
    const star = document.createElement("div");
    star.innerText = "⭐";
    star.style.position = "absolute";
    star.style.fontSize = "30px";
    star.style.left = Math.random() * 260 + "px";
    star.style.top = "-40px";
    star.style.cursor = "pointer";
    playArea.appendChild(star);

    const speed = 2 + Math.random() * 2;

    const fall = setInterval(() => {
      let top = parseFloat(star.style.top);
      top += speed;
      star.style.top = top + "px";

      if (top > 400) {
        clearInterval(fall);
        star.remove();
      }
    }, 20);

    star.onclick = () => {
      clearInterval(fall);
      star.remove();
      score++;
      scoreDisplay.innerText = "Score: " + score;

      if (score >= targetScore) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        onComplete();
      }
    };
  }

  // Spawn stars every 800ms
  const spawnInterval = setInterval(createStar, 800);

  // Timer countdown
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);

      alert("Time's up! Try again 💖");
      startLevel1(container, onComplete); // restart level
    }
  }, 1000);
}