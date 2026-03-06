function startLevel28(container, onComplete){

  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 27 – Balance Game</h2>
    <p class="level-subtitle">Keep the ball balanced</p>
    <div class="level-game-area">
  <style>
    .balance-card{
      width: 400px;
      margin: 50px auto;
      padding: 20px;
      background: #fdf0f5;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .plank{
      width: 250px; /* shorter plank for higher difficulty */
      height: 15px;
      background: #ffb3cc;
      margin: 150px auto 0;
      border-radius: 10px;
      position: relative;
      transform-origin: center center;
      transition: transform 0.05s linear;
    }
    .ball{
      width: 30px;
      height: 30px;
      background: #ff4d88;
      border-radius: 50%;
      position: absolute;
      top: 120px;
      left: 185px;
      transition: left 0.05s;
    }
    .score{
      margin-top:20px;
      font-size:18px;
      color:#333;
    }
    .controls{
      margin-top:20px;
      display:flex;
      justify-content:center;
      gap:20px;
    }
    .btn{
      padding:10px 20px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
      transition:0.2s;
    }
    .btn:hover{
      background:#ff1a66;
    }
  </style>

  <div class="balance-card">
    <h3>⚖️ Level 28 – Balance Game ⚖️</h3>
    <div class="plank" id="plank"></div>
    <div class="ball" id="ball"></div>
    <div class="score" id="score">Time: 0s</div>
    <div class="controls">
      <button class="btn" id="leftBtn">◀️ Left</button>
      <button class="btn" id="rightBtn">▶️ Right</button>
    </div>
  </div>
    </div>
  </div>
  `;

  const plank = container.querySelector("#plank");
  const ball = container.querySelector("#ball");
  const scoreEl = container.querySelector("#score");
  const leftBtn = container.querySelector("#leftBtn");
  const rightBtn = container.querySelector("#rightBtn");

  let plankAngle = 0;
  let ballPos = 185; 
  let velocity = 0;
  let score = 0;
  let gameOver = false;

  const keys = {left:false, right:false};
  const PLAYER_SPEED = 5;
  let tiltEffect = 0.35; // initial tilt effect
  let tiltSpeedFactor = 0.4; // initial tilt randomness

  document.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft") keys.left = true;
    if(e.key==="ArrowRight") keys.right = true;
  });
  document.addEventListener("keyup", e=>{
    if(e.key==="ArrowLeft") keys.left = false;
    if(e.key==="ArrowRight") keys.right = false;
  });

  leftBtn.addEventListener("mousedown", ()=> keys.left=true);
  leftBtn.addEventListener("mouseup", ()=> keys.left=false);
  rightBtn.addEventListener("mousedown", ()=> keys.right=true);
  rightBtn.addEventListener("mouseup", ()=> keys.right=false);

  function gameLoop(){
    if(gameOver) return;

    // Gradually increase difficulty
    tiltSpeedFactor += 0.0002; // tilt randomness increases
    tiltEffect += 0.0001; // tilt effect on ball increases

    plankAngle += (Math.random()-0.5)*tiltSpeedFactor;
    plank.style.transform = `rotate(${plankAngle}deg)`;

    // Player control
    if(keys.left) ballPos -= PLAYER_SPEED;
    if(keys.right) ballPos += PLAYER_SPEED;

    // Apply tilt effect
    ballPos += plankAngle * tiltEffect;

    // Keep ball within plank boundaries
    const plankLeft = 75; // 400 container width - 250 plank width = 150, divided by 2 = 75
    const plankRight = 75 + 250 - 30; // plank width minus ball width
    if(ballPos < plankLeft || ballPos > plankRight){
      gameOver = true;
      alert("💥 Ball fell! Try again.");
      startLevel28(container, onComplete);
      return;
    }

    ball.style.left = ballPos + "px";

    score += 0.016;
    scoreEl.textContent = `Time: ${Math.floor(score)}s`;

    if(score >= 20){
      gameOver = true;
      alert("🎉 Level Completed!");
      if(onComplete) onComplete();
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}