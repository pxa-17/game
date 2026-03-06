function startLevel8(container, onComplete){
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 8 – Ping Pong 🏓</h2>
        <p class="level-subtitle">Keep the ball bouncing on the paddle!</p>
        <div class="level-game-area">
          <div id="pongArea" style="position:relative; width:100%; max-width:300px; height:380px; margin:auto; border:none; border-radius:12px; overflow:hidden; background: linear-gradient(180deg, #1a1a2e, #16213e);"></div>
        </div>
        <div class="level-stats">
          <span>Score: <strong id="score8">0</strong> / 10</span>
          <span>Time: <strong id="timer8">30</strong>s</span>
        </div>
      </div>
    `;
  
    const pongArea = container.querySelector("#pongArea");
    const scoreDisplay = container.querySelector("#score8");
    const timerDisplay = container.querySelector("#timer8");
    const targetScore = 10;
  
    const areaWidth = 300;
    const areaHeight = 380;
  
    const paddle = document.createElement("div");
    paddle.style.width = "80px";
    paddle.style.height = "15px";
    paddle.style.position = "absolute";
    paddle.style.bottom = "15px";
    paddle.style.left = (areaWidth/2 - 40) + "px";
    paddle.style.background = "linear-gradient(90deg, #ff4da6, #ff85c1)";
    paddle.style.borderRadius = "8px";
    paddle.style.boxShadow = "0 0 15px rgba(255, 77, 166, 0.6)";
    pongArea.appendChild(paddle);
  
    const ball = document.createElement("div");
    ball.style.width = "20px";
    ball.style.height = "20px";
    ball.style.position = "absolute";
    ball.style.left = (areaWidth/2 - 10) + "px";
    ball.style.bottom = "50px";
    ball.style.background = "linear-gradient(135deg, #ffd700, #ffed4a)";
    ball.style.borderRadius = "50%";
    ball.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.6)";
    pongArea.appendChild(ball);
  
    let ballX = areaWidth/2 - 10;
    let ballY = 50;
    let velocityX = 3;
    let velocityY = 4;
    let score = 0;
    let timeLeft = 30;
    let lastHit = false;
  
    pongArea.addEventListener("mousemove", e=>{
      const rect = pongArea.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      paddle.style.left = Math.max(0, Math.min(areaWidth - 80, mouseX - 40)) + "px";
    });
  
    pongArea.addEventListener("touchmove", e=>{
      e.preventDefault();
      const rect = pongArea.getBoundingClientRect();
      let touchX = e.touches[0].clientX - rect.left;
      paddle.style.left = Math.max(0, Math.min(areaWidth - 80, touchX - 40)) + "px";
    });
  
    const ballInterval = setInterval(()=>{
      ballX += velocityX;
      ballY += velocityY;
  
      if(ballX <=0 || ballX >= areaWidth-20) velocityX *= -1;
      if(ballY >= areaHeight-20) velocityY *= -1;
  
      const paddleLeft = parseFloat(paddle.style.left);
      const paddleTop = parseFloat(paddle.style.bottom);
      if(ballY <= paddleTop + 15 && ballY >= paddleTop && ballX + 20 >= paddleLeft && ballX <= paddleLeft + 80){
        if(!lastHit){
          lastHit = true;
          velocityY *= -1;
          velocityX *= 1.15;
          velocityY *= 1.15;
          score++;
          scoreDisplay.innerText = score;
          scoreDisplay.classList.add("score-animate");
          setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);
  
          if(score === targetScore){
            clearInterval(ballInterval);
            clearInterval(timerInterval);
            alert("Congratulations! Level Completed 🎉");
            onComplete();
          }
        }
      } else {
        lastHit = false;
      }
  
      if(ballY <=0){
        clearInterval(ballInterval);
        clearInterval(timerInterval);
        alert("Ball missed! Try again!");
        startLevel8(container,onComplete);
      }
  
      ball.style.left = ballX + "px";
      ball.style.bottom = ballY + "px";
    },20);
  
    const timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.innerText = timeLeft;
      if (timeLeft <= 10) {
        timerDisplay.classList.add("timer-warning");
      }
      if(timeLeft<=0){
        clearInterval(ballInterval);
        clearInterval(timerInterval);
        timerDisplay.classList.remove("timer-warning");
        alert("Time's up! Level Completed!");
        onComplete();
      }
    },1000);
  }
