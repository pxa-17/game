function startLevel6(container, onComplete) {
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 6 – Mini Maze 🌀</h2>
        <p class="level-subtitle">Use arrow keys or swipe to reach the goal!</p>
        <div class="level-game-area">
          <div id="mazeArea" style="position: relative; width: 300px; height: 300px; margin: auto; border: none; background: linear-gradient(135deg, #ffe6f0, #fff0f5); border-radius: 15px; overflow: hidden;"></div>
        </div>
        <div class="level-stats">
          <span>Reach the 🏆</span>
        </div>
      </div>
    `;
  
    const mazeArea = container.querySelector("#mazeArea");
    const cellSize = 50;
    const rows = 6, cols = 6;
    const maze = [];
  
    for(let r=0;r<rows;r++){
      maze[r] = [];
      for(let c=0;c<cols;c++){
        const cell = document.createElement("div");
        cell.style.width = cellSize+"px";
        cell.style.height = cellSize+"px";
        cell.style.position="absolute";
        cell.style.left = c*cellSize+"px";
        cell.style.top = r*cellSize+"px";
        cell.style.border = "1px solid rgba(255, 77, 166, 0.2)";
        cell.style.background = (Math.random()<0.2)? "linear-gradient(135deg, #ff4da6, #ff85c1)":"transparent";
        mazeArea.appendChild(cell);
        maze[r][c] = {cell, wall: (Math.random()<0.2)};
      }
    }
  
    const player = document.createElement("div");
    player.style.width = cellSize-12+"px";
    player.style.height = cellSize-12+"px";
    player.style.position = "absolute";
    player.style.left = "6px";
    player.style.top = "6px";
    player.style.background = "linear-gradient(135deg, #ff4da6, #ff85c1)";
    player.style.borderRadius = "8px";
    player.style.boxShadow = "0 0 15px rgba(255, 77, 166, 0.6)";
    player.style.transition = "all 0.15s ease";
    mazeArea.appendChild(player);
    let playerPos = {r:0, c:0};
  
    const goal = document.createElement("div");
    goal.style.width = cellSize-4+"px";
    goal.style.height = cellSize-4+"px";
    goal.style.position = "absolute";
    goal.style.left = (cols-1)*cellSize+2+"px";
    goal.style.top = (rows-1)*cellSize+2+"px";
    goal.style.background = "linear-gradient(135deg, #ffd700, #ffed4a)";
    goal.style.borderRadius = "8px";
    goal.style.display = "flex";
    goal.style.alignItems = "center";
    goal.style.justifyContent = "center";
    goal.style.fontSize = "20px";
    goal.innerText = "🏆";
    mazeArea.appendChild(goal);
  
    function movePlayer(dr, dc){
      let nr = playerPos.r+dr;
      let nc = playerPos.c+dc;
      if(nr>=0 && nr<rows && nc>=0 && nc<cols && !maze[nr][nc].wall){
        playerPos.r = nr;
        playerPos.c = nc;
        player.style.left = nc*cellSize+6+"px";
        player.style.top = nr*cellSize+6+"px";
        if(nr===rows-1 && nc===cols-1){
          onComplete();
        }
      }
    }
  
    window.addEventListener("keydown",(e)=>{
      switch(e.key){
        case "ArrowUp": movePlayer(-1,0); break;
        case "ArrowDown": movePlayer(1,0); break;
        case "ArrowLeft": movePlayer(0,-1); break;
        case "ArrowRight": movePlayer(0,1); break;
      }
    });
  }
