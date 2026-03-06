function startLevel18(container, onComplete){
  container.innerHTML = `
  <style>
    .candy-wrap{
      display:flex;
      flex-direction:column;
      align-items:center;
      font-family:'Segoe UI',sans-serif;
      padding:20px;
    }
    canvas{
      background:#fbeff9;
      border-radius:10px;
      box-shadow:0 4px 10px rgba(0,0,0,0.2);
    }
    h2{
      color:#ff6b81;
      margin-bottom:10px;
    }
  </style>

  <div class="candy-wrap">
    <h2>🍭 Level 18 – Candy Match 🍭</h2>
    <canvas id="candyGame" width="400" height="400"></canvas>
    <div style="color:#333;font-size:16px;margin-top:10px;">Score: <span id="score">0</span></div>
  </div>
  `;

  const canvas = document.getElementById("candyGame");
  const ctx = canvas.getContext("2d");
  const scoreEl = container.querySelector("#score");

  const ROWS = 8;
  const COLS = 8;
  const SIZE = 50;
  const candies = ["🍎","🍒","🍊","🍇","🍉","🍬"];
  let grid = [];
  let selected = null;
  let score = 0;
  let animating = false;
  let gameStopped = false;

  function initGrid(){
    grid = [];
    for(let r=0;r<ROWS;r++){
      let row = [];
      for(let c=0;c<COLS;c++){
        row.push({emoji:candies[Math.floor(Math.random()*candies.length)]});
      }
      grid.push(row);
    }
  }

  function drawGrid(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.font="30px Segoe UI Emoji";

    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        if(grid[r][c]!==null){
          ctx.fillText(grid[r][c].emoji, c*SIZE + SIZE/2, r*SIZE + SIZE/2);
          ctx.strokeStyle="#ffffff33";
          ctx.strokeRect(c*SIZE, r*SIZE, SIZE, SIZE);
        }
      }
    }

    if(selected){
      ctx.strokeStyle="white";
      ctx.lineWidth=3;
      ctx.strokeRect(selected.col*SIZE, selected.row*SIZE, SIZE, SIZE);
    }
  }

  function swap(a,b){
    let temp = grid[a.row][a.col];
    grid[a.row][a.col] = grid[b.row][b.col];
    grid[b.row][b.col] = temp;
  }

  function findMatches(){
    let matches = [];
    // horizontal
    for(let r=0;r<ROWS;r++){
      let count=1;
      for(let c=1;c<COLS;c++){
        if(grid[r][c] && grid[r][c-1] && grid[r][c].emoji===grid[r][c-1].emoji){
          count++;
        } else {
          if(count>=3){
            for(let k=0;k<count;k++) matches.push({row:r,col:c-1-k});
          }
          count=1;
        }
      }
      if(count>=3){
        for(let k=0;k<count;k++) matches.push({row:r,col:COLS-1-k});
      }
    }

    // vertical
    for(let c=0;c<COLS;c++){
      let count=1;
      for(let r=1;r<ROWS;r++){
        if(grid[r][c] && grid[r-1][c] && grid[r][c].emoji===grid[r-1][c].emoji){
          count++;
        } else {
          if(count>=3){
            for(let k=0;k<count;k++) matches.push({row:r-1-k,col:c});
          }
          count=1;
        }
      }
      if(count>=3){
        for(let k=0;k<count;k++) matches.push({row:ROWS-1-k,col:c});
      }
    }
    return matches;
  }

  function removeMatchesStep(){
    if(gameStopped) return false;
    const matches = findMatches();
    if(matches.length===0) return false;

    matches.forEach(m=>{
      grid[m.row][m.col]=null;
      score++;
    });

    scoreEl.textContent = score;

    if(score >= 180){
      gameStopped = true;
      setTimeout(()=>{
        alert("🎉 Score reached 180! Level Complete! 🎉");
        if(onComplete) onComplete();
      },100);
      return false;
    }

    return true;
  }

  function collapseGridStep(){
    if(gameStopped) return false;
    let moved=false;
    for(let c=0;c<COLS;c++){
      for(let r=ROWS-1;r>=0;r--){
        if(grid[r][c]===null){
          for(let k=r-1;k>=0;k--){
            if(grid[k][c]!==null){
              grid[r][c]=grid[k][c];
              grid[k][c]=null;
              moved=true;
              break;
            }
          }
        }
      }

      for(let r=0;r<ROWS;r++){
        if(grid[r][c]===null){
          grid[r][c]={emoji:candies[Math.floor(Math.random()*candies.length)]};
          moved=true;
        }
      }
    }
    return moved;
  }

  function animateMatches(){
    if(gameStopped) return;
    if(removeMatchesStep() || collapseGridStep()){
      drawGrid();
      requestAnimationFrame(animateMatches);
    } else {
      animating=false;
    }
  }

  canvas.addEventListener("click",(e)=>{
    if(animating || gameStopped) return;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left)/SIZE);
    const row = Math.floor((e.clientY - rect.top)/SIZE);

    if(!selected){
      selected={row,col};
    } else {
      if(Math.abs(selected.row-row)+Math.abs(selected.col-col)===1){
        swap(selected,{row,col});
        if(findMatches().length>0){
          animating=true;
          animateMatches();
        } else {
          swap(selected,{row,col});
        }
      }
      selected=null;
    }
    drawGrid();
  });

  function gameLoop(){
    if(!gameStopped) requestAnimationFrame(gameLoop);
    drawGrid();
  }

  initGrid();
  drawGrid();
  gameLoop();
}