// levels/level6.js
function startLevel6(container, onComplete) {
    container.innerHTML = `
      <h3>Level 6: Mini Maze 🌀</h3>
      <p>Use arrow keys or swipe to reach the goal!</p>
      <div id="mazeArea" style="position: relative; width: 300px; height: 300px; margin:auto; border:2px solid #ff4da6; background:#ffe6f0;"></div>
    `;
  
    const mazeArea = document.getElementById("mazeArea");
    const cellSize = 50;
    const rows = 6, cols = 6;
    const maze = [];
  
    // Generate maze cells
    for(let r=0;r<rows;r++){
      maze[r] = [];
      for(let c=0;c<cols;c++){
        const cell = document.createElement("div");
        cell.style.width = cellSize+"px";
        cell.style.height = cellSize+"px";
        cell.style.position="absolute";
        cell.style.left = c*cellSize+"px";
        cell.style.top = r*cellSize+"px";
        cell.style.border = "1px solid #fff";
        cell.style.background = (Math.random()<0.2)? "#ff1e4d":"#ffe6f0"; // walls 20%
        mazeArea.appendChild(cell);
        maze[r][c] = {cell, wall: (Math.random()<0.2)};
      }
    }
  
    // Player
    const player = document.createElement("div");
    player.style.width = cellSize-10+"px";
    player.style.height = cellSize-10+"px";
    player.style.position = "absolute";
    player.style.left = "0px";
    player.style.top = "0px";
    player.style.background = "#ff4da6";
    player.style.borderRadius = "5px";
    mazeArea.appendChild(player);
    let playerPos = {r:0, c:0};
  
    // Goal
    const goal = document.createElement("div");
    goal.style.width = cellSize+"px";
    goal.style.height = cellSize+"px";
    goal.style.position = "absolute";
    goal.style.left = (cols-1)*cellSize+"px";
    goal.style.top = (rows-1)*cellSize+"px";
    goal.style.background = "#ffd700";
    mazeArea.appendChild(goal);
  
    function movePlayer(dr, dc){
      let nr = playerPos.r+dr;
      let nc = playerPos.c+dc;
      if(nr>=0 && nr<rows && nc>=0 && nc<cols && !maze[nr][nc].wall){
        playerPos.r = nr;
        playerPos.c = nc;
        player.style.left = nc*cellSize+5+"px";
        player.style.top = nr*cellSize+5+"px";
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