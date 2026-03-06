function startLevel22(container, onComplete){

container.innerHTML = `
<style>
.maze-wrapper{
  text-align:center;
  font-family:Segoe UI, sans-serif;
}

.maze-grid{
  display:grid;
  margin:20px auto;
  width:max-content;
}

.cell{
  width:22px;
  height:22px;
}

.wall{ background:#111; }
.path{ background:#f4f4f4; }

.player{
  background:#ff4d88;
  border-radius:4px;
}

.goal{
  background:#4CAF50;
  border-radius:4px;
}

.message{
  font-size:18px;
  font-weight:bold;
  margin-top:15px;
}
</style>

<div class="maze-wrapper">
  <h2>🧭 Level 22 – The Real Escape</h2>
  <p>This one is guaranteed solvable 😌</p>
  <div class="maze-grid" id="maze"></div>
  <div class="message" id="message"></div>
</div>
`;

const size = 25;
const maze = container.querySelector("#maze");
const message = container.querySelector("#message");

maze.style.gridTemplateColumns = `repeat(${size},22px)`;
maze.style.gridTemplateRows = `repeat(${size},22px)`;

// Create full wall grid
let grid = Array.from({length:size}, ()=>Array(size).fill(1));

// DFS Maze Generation (UNCHANGED)
function generateMaze(x,y){
  const directions = [
    [0,2],[0,-2],[2,0],[-2,0]
  ].sort(()=>Math.random()-0.5);

  for(const [dx,dy] of directions){
    const nx = x+dx;
    const ny = y+dy;

    if(nx>0 && ny>0 && nx<size-1 && ny<size-1 && grid[nx][ny]===1){
      grid[nx][ny]=0;
      grid[x+dx/2][y+dy/2]=0;
      generateMaze(nx,ny);
    }
  }
}

// Start carving
grid[1][1]=0;
generateMaze(1,1);

let playerPos = {row:1,col:1};
let goalPos = {row:size-2,col:size-2};

// Ensure goal is open (UNCHANGED)
grid[goalPos.row][goalPos.col]=0;

function drawMaze(){
  maze.innerHTML="";
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      const cell=document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add(grid[r][c]===1?"wall":"path");

      if(r===playerPos.row && c===playerPos.col)
        cell.classList.add("player");

      if(r===goalPos.row && c===goalPos.col)
        cell.classList.add("goal");

      maze.appendChild(cell);
    }
  }
}

function movePlayer(nr,nc){
  if(grid[nr][nc]===0){
    playerPos.row=nr;
    playerPos.col=nc;
    drawMaze();
    checkWin();
  }
}

function checkWin(){
  if(playerPos.row===goalPos.row && playerPos.col===goalPos.col){
    message.innerHTML="🔥 You Escaped the Advanced Maze!";
    document.removeEventListener("keydown",handleKey);
    if(onComplete) onComplete();
  }
}

/* 🔥 ONLY CHANGE: prevent page scroll */
function handleKey(e){

  const moves = {
    ArrowUp: [-1,0],
    ArrowDown: [1,0],
    ArrowLeft: [0,-1],
    ArrowRight: [0,1]
  };

  if(moves[e.key]){
    e.preventDefault();   // ⛔ prevents page scrolling
    const [dr,dc] = moves[e.key];
    movePlayer(playerPos.row+dr, playerPos.col+dc);
  }
}

document.addEventListener("keydown",handleKey);

drawMaze();
}