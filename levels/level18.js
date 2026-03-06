function startLevel18(container, onComplete){
  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 18 – Candy Match 🍭</h2>
      <p class="level-subtitle">Match 3 or more candies!</p>
      <div class="level-game-area">
        <canvas id="candyGame" width="280" height="280" style="width:100%; max-width:280px; display:block; margin:0 auto; border-radius:12px; background:#fbeff9;"></canvas>
      </div>
      <div class="level-stats">
        <span>Score: <strong id="score">0</strong> / 180</span>
      </div>
    </div>
  `;

  const canvas = container.querySelector("#candyGame");
  const ctx = canvas.getContext("2d");
  const scoreEl = container.querySelector("#score");

  const ROWS = 7;
  const COLS = 7;
  const SIZE = 40;
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
    ctx.clearRect(0,0,280,280);
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.font="24px Segoe UI Emoji";
    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        if(grid[r][c]!==null){
          ctx.fillText(grid[r][c].emoji, c*SIZE + SIZE/2, r*SIZE + SIZE/2);
        }
      }
    }
    if(selected){
      ctx.strokeStyle="#ff4da6";
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
    const matches = findMatches();
    if(matches.length===0) return false;
    matches.forEach(m=>{
      grid[m.row][m.col]=null;
      score++;
    });
    scoreEl.textContent = score;
    if(score >= 180){
      gameStopped = true;
      setTimeout(()=>onComplete(),100);
      return false;
    }
    return true;
  }

  function collapseGridStep(){
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

  initGrid();
  drawGrid();
}
