function startLevel16(container, onComplete){

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 16 – Flow Connect 🌸</h2>
      <p class="level-subtitle">Connect matching colors without crossing!</p>
      <div class="level-game-area">
        <canvas id="game" width="300" height="300" style="width:100%; max-width:300px; display:block; margin:0 auto; border-radius:12px; touch-action:none;"></canvas>
        <button class="restart-btn" id="resetBtn" style="display:block; margin:15px auto 0;">Reset 🔄</button>
      </div>
    </div>
  `;

  const canvas = container.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const resetBtn = container.querySelector("#resetBtn");

  const GRID = 6;
  const CELL = 50;

  const colors = {
    red: "#ffadad",
    blue: "#a0c4ff",
    green: "#caffbf",
    purple: "#d0bfff",
    yellow: "#fff3b0"
  };

  const pairs = {
    red:    [[0,4],[5,0]],
    blue:   [[0,2],[4,0]],
    green:  [[0,5],[3,3]],
    purple: [[1,4],[5,4]],
    yellow: [[4,3],[5,5]]
  };

  let grid;
  let currentColor = null;
  let paths = {};
  let currentPath = [];

  function initGrid(){
    grid = Array.from({length:GRID},()=>Array(GRID).fill(null));
    paths = {};
    for(let color in pairs){
      paths[color] = [];
      pairs[color].forEach(([r,c])=>{
        grid[r][c] = color;
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,300,300);
    for(let r=0;r<GRID;r++){
      for(let c=0;c<GRID;c++){
        ctx.fillStyle="#ffffff";
        ctx.fillRect(c*CELL, r*CELL, CELL, CELL);
        if(grid[r][c]){
          ctx.fillStyle = colors[grid[r][c]];
          ctx.fillRect(c*CELL+8, r*CELL+8, CELL-16, CELL-16);
        }
        ctx.strokeStyle="#e6d6f5";
        ctx.lineWidth=2;
        ctx.strokeRect(c*CELL, r*CELL, CELL, CELL);
      }
    }
  }

  function getCell(x,y){
    return [Math.floor(y/CELL), Math.floor(x/CELL)];
  }

  function isAdjacent(r1,c1,r2,c2){
    return Math.abs(r1-r2)+Math.abs(c1-c2) === 1;
  }

  function clearPath(color){
    paths[color].forEach(([r,c])=>{
      if(!pairs[color].some(p=>p[0]===r && p[1]===c)){
        grid[r][c] = null;
      }
    });
    paths[color] = [];
  }

  canvas.addEventListener("mousedown",(e)=>{
    const rect = canvas.getBoundingClientRect();
    const [r,c] = getCell(e.clientX - rect.left, e.clientY - rect.top);
    if(r>=0 && r<GRID && c>=0 && c<GRID && grid[r][c]){
      currentColor = grid[r][c];
      clearPath(currentColor);
      currentPath = [[r,c]];
      paths[currentColor] = [[r,c]];
    }
  });

  canvas.addEventListener("mousemove",(e)=>{
    if(!currentColor) return;
    const rect = canvas.getBoundingClientRect();
    const [r,c] = getCell(e.clientX - rect.left, e.clientY - rect.top);
    const [lastR,lastC] = currentPath[currentPath.length-1];
    if(r<0||r>=GRID||c<0||c>=GRID) return;
    if(!isAdjacent(r,c,lastR,lastC)) return;
    if(grid[r][c] && grid[r][c] !== currentColor) return;
    if(!currentPath.some(p=>p[0]===r && p[1]===c)){
      grid[r][c] = currentColor;
      currentPath.push([r,c]);
      paths[currentColor].push([r,c]);
      draw();
    }
  });

  canvas.addEventListener("mouseup",()=>{
    if(!currentColor) return;
    const end = pairs[currentColor][1];
    const last = currentPath[currentPath.length-1];
    if(last[0] !== end[0] || last[1] !== end[1]){
      clearPath(currentColor);
    }
    currentColor = null;
    currentPath = [];
    draw();
    checkWin();
  });

  function checkWin(){
    for(let r=0;r<GRID;r++){
      for(let c=0;c<GRID;c++){
        if(!grid[r][c]) return;
      }
    }
    setTimeout(()=>onComplete(),500);
  }

  resetBtn.onclick = ()=>{ initGrid(); draw(); };
  initGrid();
  draw();
}
