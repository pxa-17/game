function startLevel7(container, onComplete){
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 7 – Balloon Pop 🎈</h2>
        <p class="level-subtitle">Pop the colorful balloons before time runs out!</p>
        <div class="level-game-area">
          <div id="balloonArea" style="position:relative; width:100%; max-width:300px; height:380px; margin:auto; border:none; border-radius:12px; overflow:hidden; background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%);"></div>
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
  
    const colors = ["#ff4da6","#ffd700","#1e90ff","#32cd32","#ff6b6b","#9b59b6"];
    const targetScore = 20;
    let score = 0;
    let timeLeft = 20;
  
    function createBalloon(){
      const color = colors[Math.floor(Math.random()*colors.length)];
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.background = color;
      balloon.style.left = Math.random() * (balloonArea.offsetWidth - 40) + "px";
      balloon.style.bottom = "-50px";
  
      const string = document.createElement("div");
      string.classList.add("balloon-string");
      balloon.appendChild(string);
  
      balloonArea.appendChild(balloon);
  
      balloon.addEventListener("click", ()=> popBalloon(balloon));
      balloon.addEventListener("touchstart", ()=> popBalloon(balloon));
  
      const duration = 5 + Math.random()*2;
      balloon.style.transition = `bottom ${duration}s linear`;
      setTimeout(()=>{ balloon.style.bottom = balloonArea.offsetHeight + 50 + "px"; }, 50);
  
      setTimeout(()=>{ balloon.remove(); }, duration*1000 + 100);
    }
  
    function popBalloon(balloon){
      balloon.remove();
      score++;
      scoreDisplay.innerText = score;
      scoreDisplay.classList.add("score-animate");
      setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);
      if(score >= targetScore){
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        onComplete();
      }
    }
  
    const spawnInterval = setInterval(createBalloon, 900);
  
    const timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.innerText = timeLeft;
      if (timeLeft <= 10) {
        timerDisplay.classList.add("timer-warning");
      }
      if(timeLeft<=0){
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        timerDisplay.classList.remove("timer-warning");
        alert("Time's up! Try again!");
        startLevel7(container,onComplete);
      }
    },1000);
  }
