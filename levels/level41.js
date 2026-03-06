function startLevel41(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 41 – Color Catcher</h2>
    <p class="level-subtitle">Catch the falling colored balls</p>
    <div class="level-game-area">
    <style>
    .color-catcher-game{
      width: 400px;
      margin: 30px auto;
      font-family:'Segoe UI',sans-serif;
      background:#222;
      padding:15px;
      border-radius:15px;
      color:white;
      text-align:center;
      overflow:hidden;
      position: relative;
    }
    .game-area{
      width:100%;
      height:400px;
      background:#333;
      position: relative;
      margin-top:10px;
      border-radius:10px;
      overflow:hidden;
      cursor: pointer;
    }
    .ball{
      width:40px;
      height:40px;
      border-radius:50%;
      position:absolute;
      top:0;
      transition:top 0.05s linear;
    }
    .catcher{
      width:80px;
      height:20px;
      background:#ffb3cc;
      position:absolute;
      bottom:10px;
      left:160px;
      border-radius:10px;
    }
    .status{
      margin-top:10px;
      font-weight:bold;
    }
    </style>

    <div class="color-catcher-game">
      <h3>Level 41 – Color Catcher</h3>
      <div class="status">Score: <span id="score">0</span> | Lives: <span id="lives">3</span></div>
      <div class="game-area" id="gameArea"></div>
    </div>
    </div>
  </div>
  `;

  const gameArea = container.querySelector("#gameArea");
  const scoreEl = container.querySelector("#score");
  const livesEl = container.querySelector("#lives");

  const catcher = document.createElement("div");
  catcher.className="catcher";
  gameArea.appendChild(catcher);

  const areaWidth = 400;
  const areaHeight = 400;
  let catcherX = 160;
  const catcherWidth = 80;

  const colors = ["#ff4d88","#ffd11a","#4da6ff","#a3ffb3"];
  let balls = [];
  let score = 0;
  let lives = 3;
  const targetScore = 25;
  let ballSpeed = 2;
  let gameInterval;

  // Move catcher with arrow keys
  document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft") catcherX=Math.max(0,catcherX-20);
    if(e.key==="ArrowRight") catcherX=Math.min(areaWidth-catcherWidth,catcherX+20);
    catcher.style.left=catcherX+"px";
  });

  // Move catcher with mouse / touch
  gameArea.addEventListener("mousemove",(e)=>{
    const rect = gameArea.getBoundingClientRect();
    catcherX = Math.min(Math.max(0, e.clientX - rect.left - catcherWidth/2), areaWidth-catcherWidth);
    catcher.style.left=catcherX+"px";
  });
  gameArea.addEventListener("touchmove",(e)=>{
    e.preventDefault();
    const rect = gameArea.getBoundingClientRect();
    catcherX = Math.min(Math.max(0, e.touches[0].clientX - rect.left - catcherWidth/2), areaWidth-catcherWidth);
    catcher.style.left=catcherX+"px";
  },{passive:false});

  // Create new ball
  function createBall(){
    const ball = document.createElement("div");
    ball.className="ball";
    ball.style.background=colors[Math.floor(Math.random()*colors.length)];
    ball.style.left = Math.floor(Math.random()*(areaWidth-40))+"px";
    ball.style.top="0px";
    gameArea.appendChild(ball);
    balls.push(ball);
  }

  // Game loop
  function gameLoop(){
    balls.forEach((ball,i)=>{
      let top = parseInt(ball.style.top);
      top+=ballSpeed;
      ball.style.top=top+"px";

      // Check collision with catcher
      if(top+40 >= areaHeight-10 && top+40<=areaHeight+10){
        const ballLeft = parseInt(ball.style.left);
        if(ballLeft+40 >= catcherX && ballLeft <= catcherX+catcherWidth){
          score++;
          scoreEl.textContent=score;
          gameArea.removeChild(ball);
          balls.splice(i,1);
          if(score>=targetScore){
            clearInterval(gameInterval);
            alert("🎉 Level Completed!");
            if(onComplete) onComplete();
          }
        }
      }

      // Missed ball
      if(top>areaHeight){
        gameArea.removeChild(ball);
        balls.splice(i,1);
        lives--;
        livesEl.textContent=lives;
        if(lives<=0){
          clearInterval(gameInterval);
          alert("❌ Game Over! Try Again.");
          if(onComplete) onComplete();
        }
      }
    });
  }

  // Spawn balls periodically
  setInterval(createBall,1000);

  // Start game loop
  gameInterval = setInterval(gameLoop,20);
}