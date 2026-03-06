function startLevel40(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 40 – Word Scramble</h2>
    <p class="level-subtitle">Navigate the maze to find the goal</p>
    <div class="level-game-area">
    <style>
    .maze-game{
      width: 480px;
      margin: 30px auto;
      font-family:'Segoe UI',sans-serif;
      background:#222;
      padding:15px;
      border-radius:15px;
      color:white;
      text-align:center;
    }
    .maze-grid{
      display:grid;
      grid-template-columns: repeat(8, 50px);
      grid-gap: 2px;
      margin:20px auto;
      justify-content:center;
    }
    .maze-cell{
      width:50px;
      height:50px;
      border-radius:5px;
      background:#444;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:24px;
      transition:0.2s;
      user-select:none;
    }
    .player{
      background:#ffb3cc;
    }
    .trap{
      background:#ff6666;
    }
    .moving-trap{
      background:#ff4d88;
    }
    .goal{
      background:#a3ffb3;
    }
    .flash{
      animation: flash 0.5s infinite alternate;
    }
    @keyframes flash{
      0%{opacity:0.6;}
      100%{opacity:1;}
    }
    .message{
      margin-top:10px;
      font-weight:bold;
      min-height:20px;
    }
    </style>

    <div class="maze-game">
      <h3>Level 40 – Ultimate Color Maze Escape</h3>
      <div class="maze-grid" id="mazeGrid"></div>
      <div class="message" id="message"></div>
      <div>Time left: <span id="timer">60</span> seconds</div>
    </div>
    </div>
  </div>
  `;

  const gridEl = container.querySelector("#mazeGrid");
  const messageEl = container.querySelector("#message");
  const timerEl = container.querySelector("#timer");

  const rows = 8;
  const cols = 8;
  const totalCells = rows*cols;

  // Maze: 0=empty, 1=trap, 2=goal, 3=moving trap
  let mazeLayout = [
    0,0,1,0,0,1,0,0,
    0,1,0,3,1,0,1,0,
    0,0,0,1,0,0,0,0,
    3,0,1,0,0,1,0,0,
    0,0,0,0,1,0,0,1,
    0,1,0,0,0,1,3,0,
    0,0,1,0,0,0,1,0,
    0,3,0,0,1,0,0,2
  ];

  const cells = [];
  let playerPos = 0;
  const movingTrapIndices = [];
  let timeLeft = 40;

  // create grid
  for(let i=0;i<totalCells;i++){
    const cell = document.createElement("div");
    cell.className="maze-cell";
    if(i===playerPos) cell.classList.add("player");
    if(mazeLayout[i]===1) cell.classList.add("trap");
    if(mazeLayout[i]===2) cell.classList.add("goal");
    if(mazeLayout[i]===3){
      cell.classList.add("moving-trap");
      movingTrapIndices.push(i);
    }
    gridEl.appendChild(cell);
    cells.push(cell);
  }

  function movePlayer(dx,dy){
    const row = Math.floor(playerPos/cols);
    const col = playerPos%cols;
    const newRow = row+dy;
    const newCol = col+dx;
    if(newRow<0 || newRow>=rows || newCol<0 || newCol>=cols) return;
    const newPos = newRow*cols + newCol;

    cells[playerPos].classList.remove("player");
    playerPos = newPos;
    cells[playerPos].classList.add("player");

    // Trap
    if(mazeLayout[playerPos]===1 || mazeLayout[playerPos]===3){
      messageEl.style.color="#ff8080";
      messageEl.textContent="❌ Trap! Back to start!";
      setTimeout(()=>{
        cells[playerPos].classList.remove("player");
        playerPos=0;
        cells[playerPos].classList.add("player");
        messageEl.textContent="";
      },500);
    }

    // Goal
    if(mazeLayout[playerPos]===2){
      messageEl.style.color="#a3ffb3";
      messageEl.textContent="🎉 You reached the princess!";
      clearInterval(timerInterval);
      clearInterval(movingTrapInterval);
      setTimeout(()=>{
        if(onComplete) onComplete();
      },500);
    }
  }

  document.addEventListener("keydown",(e)=>{
    switch(e.key){
      case "ArrowUp": movePlayer(0,-1); break;
      case "ArrowDown": movePlayer(0,1); break;
      case "ArrowLeft": movePlayer(-1,0); break;
      case "ArrowRight": movePlayer(1,0); break;
    }
  });

  // Moving traps randomly swap positions every second
  function shuffleMovingTraps(){
    for(let i=0;i<movingTrapIndices.length;i++){
      const idx = movingTrapIndices[i];
      const emptyIndices = mazeLayout.map((v,j)=>v===0? j : -1).filter(v=>v>=0);
      if(emptyIndices.length===0) return;
      const swapIdx = emptyIndices[Math.floor(Math.random()*emptyIndices.length)];
      mazeLayout[swapIdx]=3;
      mazeLayout[idx]=0;
      cells[swapIdx].classList.add("moving-trap");
      cells[idx].classList.remove("moving-trap");
      movingTrapIndices[i]=swapIdx;
    }
  }

  const movingTrapInterval = setInterval(shuffleMovingTraps,1000);

  // Timer countdown
  function countdown(){
    timeLeft--;
    timerEl.textContent=timeLeft;
    if(timeLeft<=0){
      messageEl.style.color="#ff8080";
      messageEl.textContent="⏰ Time's up! Back to start.";
      clearInterval(timerInterval);
      setTimeout(()=>{
        cells[playerPos].classList.remove("player");
        playerPos=0;
        cells[playerPos].classList.add("player");
        timeLeft=60;
        timerEl.textContent=timeLeft;
        messageEl.textContent="";
        timerInterval=setInterval(countdown,1000);
      },500);
    }
  }

  let timerInterval=setInterval(countdown,1000);
}