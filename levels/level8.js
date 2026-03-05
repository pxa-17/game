function startLevel8(container, onComplete){
    container.innerHTML = `
      <h3>Level 8: Ping Pong 🏓</h3>
      <p>Keep the ball bouncing on the paddle! Hit the ball 10 times to clear the level.</p>
      <div id="pongArea" style="position:relative; width:300px; height:400px; margin:auto; border:2px solid #ff4da6; background:#ffe6f0; overflow:hidden;"></div>
      <p id="score8">Score: 0</p>
      <p id="target8">Target Score: 10</p>
      <p id="timer8">Time: 30</p>
    `;
  
    const pongArea = document.getElementById("pongArea");
    const scoreDisplay = document.getElementById("score8");
    const timerDisplay = document.getElementById("timer8");
    const targetScore = 10;
  
    const areaWidth = 300;
    const areaHeight = 400;
  
    // Paddle
    const paddle = document.createElement("div");
    paddle.style.width = "80px";
    paddle.style.height = "15px";
    paddle.style.position = "absolute";
    paddle.style.bottom = "10px";
    paddle.style.left = (areaWidth/2 - 40) + "px";
    paddle.style.background = "#ff4da6";
    paddle.style.borderRadius = "5px";
    pongArea.appendChild(paddle);
  
    // Ball
    const ball = document.createElement("div");
    ball.style.width = "20px";
    ball.style.height = "20px";
    ball.style.position = "absolute";
    ball.style.left = (areaWidth/2 - 10) + "px";
    ball.style.bottom = "50px";
    ball.style.background = "#ffd700";
    ball.style.borderRadius = "50%";
    pongArea.appendChild(ball);
  
    let ballX = areaWidth/2 - 10;
    let ballY = 50;
    let velocityX = 3; // initial speed higher
    let velocityY = 4; // initial speed higher
    let score = 0;
    let timeLeft = 30;
    let lastHit = false; // track paddle contact
  
    // Paddle control
    pongArea.addEventListener("mousemove", e=>{
      const rect = pongArea.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      paddle.style.left = Math.max(0, Math.min(areaWidth - 80, mouseX - 40)) + "px";
    });
  
    pongArea.addEventListener("touchmove", e=>{
      const rect = pongArea.getBoundingClientRect();
      let touchX = e.touches[0].clientX - rect.left;
      paddle.style.left = Math.max(0, Math.min(areaWidth - 80, touchX - 40)) + "px";
    });
  
    // Ball movement
    const ballInterval = setInterval(()=>{
      ballX += velocityX;
      ballY += velocityY;
  
      // Bounce walls
      if(ballX <=0 || ballX >= areaWidth-20) velocityX *= -1;
      if(ballY >= areaHeight-20) velocityY *= -1;
  
      // Paddle collision
      const paddleLeft = parseFloat(paddle.style.left);
      const paddleTop = parseFloat(paddle.style.bottom);
      if(ballY <= paddleTop + 15 && ballY >= paddleTop && ballX + 20 >= paddleLeft && ballX <= paddleLeft + 80){
        if(!lastHit){ // only count once per contact
          lastHit = true;
  
          // Reverse vertical
          velocityY *= -1;
  
          // 🔹 Increase speed faster
          velocityX *= 1.15; // 15% increase per hit
          velocityY *= 1.15;
  
          score++;
          scoreDisplay.innerText = "Score: " + score;
  
          // Only complete level when target score is exactly reached
          if(score === targetScore){
            clearInterval(ballInterval);
            clearInterval(timerInterval);
            alert("Congratulations! Level Completed 🎉");
            onComplete();
          }
        }
      } else {
        lastHit = false; // reset flag when ball leaves paddle
      }
  
      // Ball missed
      if(ballY <=0){
        clearInterval(ballInterval);
        clearInterval(timerInterval);
        alert("Ball missed! Try again!");
        startLevel8(container,onComplete);
      }
  
      ball.style.left = ballX + "px";
      ball.style.bottom = ballY + "px";
    },20);
  
    // Timer
    const timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.innerText = "Time: " + timeLeft;
      if(timeLeft<=0){
        clearInterval(ballInterval);
        clearInterval(timerInterval);
        alert("Time's up! Level Completed!");
        onComplete();
      }
    },1000);
  }