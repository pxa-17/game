// levels/level5.js
function startLevel5(container, onComplete) {
    container.innerHTML = `
      <h3>Level 5: Timed Reaction ⚡</h3>
      <p>Click the flashing hearts as fast as you can!</p>
      <div id="reactionArea" style="position: relative; width: 300px; height: 300px; margin:auto; border: 2px solid #ff4da6; border-radius:15px;"></div>
      <p id="score5">Score: 0</p>
      <p id="timer5">Time: 20</p>
    `;
  
    const area = document.getElementById("reactionArea");
    const scoreDisplay = document.getElementById("score5");
    const timerDisplay = document.getElementById("timer5");
    let score = 0;
    const targetScore = 10;
    let timeLeft = 20;
    let flashTimeout;
  
    function showHeart() {
      const heart = document.createElement("div");
      heart.innerText = "❤️";
      heart.style.position = "absolute";
      heart.style.fontSize = "32px";
      heart.style.left = Math.random() * 260 + "px";
      heart.style.top = Math.random() * 260 + "px";
      heart.style.cursor = "pointer";
      area.appendChild(heart);
  
      heart.onclick = () => {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        heart.remove();
        if(score >= targetScore){
          clearTimeout(flashTimeout);
          clearInterval(timerInterval);
          onComplete();
        }
      };
  
      // Remove after short time
      setTimeout(()=>heart.remove(), 1000);
      flashTimeout = setTimeout(showHeart, 500 + Math.random()*1000);
    }
  
    showHeart();
  
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = `Time: ${timeLeft}`;
      if(timeLeft<=0){
        clearTimeout(flashTimeout);
        clearInterval(timerInterval);
        alert("Time's up! Try again!");
        startLevel5(container, onComplete);
      }
    },1000);
  }