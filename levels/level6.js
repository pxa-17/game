function startLevel6(container, onComplete) {
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 6 – Mini Maze 🌀</h2>
        <p class="level-subtitle">Use arrow keys or swipe to reach the goal!</p>
        <div class="level-game-area">
          <div id="mazeArea" style="position: relative; width: 100%; max-width: 300px; height: 300px; margin: auto; border: none; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 15px; overflow: hidden; touch-action: none;"></div>
        </div>
        <div class="level-stats">
          <span>Reach the 🏆</span>
        </div>
        <button class="restart-btn" id="restartMaze" style="margin-top: 15px;">New Maze</button>
      </div>
    `;
  
    const mazeArea = container.querySelector("#mazeArea");
    const restartBtn = container.querySelector("#restartMaze");
    const cellSize = 50;
    const rows = 6, cols = 6;
    let maze = [];
  
    // Generate a simple solvable maze
    function generateMaze() {
      // Initialize all cells as passages (false = passage, true = wall)
      maze = [];
      for(let r = 0; r < rows; r++) {
        maze[r] = [];
        for(let c = 0; c < cols; c++) {
          maze[r][c] = false;
        }
      }
  
      // Add random walls (30% density)
      for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
          // Keep start area (top-left 2x2) and goal area (bottom-right 2x2) clear
          if((r <= 1 && c <= 1) || (r >= rows - 2 && c >= cols - 2)) {
            maze[r][c] = false;
          } else {
            maze[r][c] = Math.random() < 0.30;
          }
        }
      }
    }
  
    // BFS to check if path exists from start to goal
    function isSolvable() {
      const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
      const queue = [{ r: 0, c: 0 }];
      visited[0][0] = true;
      
      const directions = [
        { r: -1, c: 0 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
        { r: 0, c: 1 }
      ];
      
      while(queue.length > 0) {
        const current = queue.shift();
        
        if(current.r === rows - 1 && current.c === cols - 1) {
          return true;
        }
        
        for(const dir of directions) {
          const nr = current.r + dir.r;
          const nc = current.c + dir.c;
          
          if(nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
             !visited[nr][nc] && !maze[nr][nc]) {
            visited[nr][nc] = true;
            queue.push({ r: nr, c: nc });
          }
        }
      }
      
      return false;
    }
  
    // Generate until solvable
    function generateSolvableMaze() {
      let solvable = false;
      let attempts = 0;
      
      while(!solvable && attempts < 50) {
        generateMaze();
        solvable = isSolvable();
        attempts++;
      }
    }
  
    // Render the maze
    function renderMaze() {
      mazeArea.innerHTML = '';
      
      // Draw cells
      for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
          const cell = document.createElement("div");
          cell.style.width = cellSize + "px";
          cell.style.height = cellSize + "px";
          cell.style.position = "absolute";
          cell.style.left = c * cellSize + "px";
          cell.style.top = r * cellSize + "px";
          
          if(maze[r][c]) {
            // Wall - pink gradient
            cell.style.background = "linear-gradient(135deg, #ff4da6, #ff85c1)";
            cell.style.borderRadius = "6px";
            cell.style.boxShadow = "0 0 8px rgba(255, 77, 166, 0.4)";
          } else {
            // Passage - subtle border
            cell.style.border = "1px solid rgba(255, 77, 166, 0.12)";
          }
          
          mazeArea.appendChild(cell);
        }
      }
  
      // Add player (green)
      const player = document.createElement("div");
      player.id = "mazePlayer";
      player.style.width = (cellSize - 12) + "px";
      player.style.height = (cellSize - 12) + "px";
      player.style.position = "absolute";
      player.style.left = "6px";
      player.style.top = "6px";
      player.style.background = "linear-gradient(135deg, #00ff88, #00cc6a)";
      player.style.borderRadius = "8px";
      player.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.7)";
      player.style.transition = "all 0.1s ease";
      player.style.zIndex = "10";
      mazeArea.appendChild(player);
  
      // Add goal (trophy)
      const goal = document.createElement("div");
      goal.style.width = (cellSize - 10) + "px";
      goal.style.height = (cellSize - 10) + "px";
      goal.style.position = "absolute";
      goal.style.left = (cols - 1) * cellSize + 5 + "px";
      goal.style.top = (rows - 1) * cellSize + 5 + "px";
      goal.style.background = "linear-gradient(135deg, #ffd700, #ffed4a)";
      goal.style.borderRadius = "8px";
      goal.style.display = "flex";
      goal.style.alignItems = "center";
      goal.style.justifyContent = "center";
      goal.style.fontSize = "22px";
      goal.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
      goal.style.zIndex = "5";
      goal.innerText = "🏆";
      mazeArea.appendChild(goal);
    }
  
    let playerPos = { r: 0, c: 0 };
    let gameActive = true;
  
    function movePlayer(dr, dc) {
      if(!gameActive) return;
      
      const player = document.getElementById("mazePlayer");
      if(!player) return;
      
      let nr = playerPos.r + dr;
      let nc = playerPos.c + dc;
      
      // Check bounds
      if(nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;
      
      // Check wall collision
      if(maze[nr][nc]) {
        // Hit wall - shake effect
        player.style.transform = "scale(0.85)";
        player.style.background = "linear-gradient(135deg, #ff4444, #ff6666)";
        setTimeout(() => {
          player.style.transform = "scale(1)";
          player.style.background = "linear-gradient(135deg, #00ff88, #00cc6a)";
        }, 80);
        return;
      }
      
      // Move player
      playerPos.r = nr;
      playerPos.c = nc;
      player.style.left = nc * cellSize + 6 + "px";
      player.style.top = nr * cellSize + 6 + "px";
      
      // Check win
      if(nr === rows - 1 && nc === cols - 1) {
        gameActive = false;
        player.style.background = "linear-gradient(135deg, #4caf50, #66bb6a)";
        player.style.boxShadow = "0 0 25px rgba(76, 175, 80, 0.8)";
        setTimeout(() => {
          if(onComplete) onComplete();
        }, 300);
      }
    }
  
    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
      }
      
      switch(e.key) {
        case "ArrowUp": case "w": case "W":
          movePlayer(-1, 0); break;
        case "ArrowDown": case "s": case "S":
          movePlayer(1, 0); break;
        case "ArrowLeft": case "a": case "A":
          movePlayer(0, -1); break;
        case "ArrowRight": case "d": case "D":
          movePlayer(0, 1); break;
      }
    });
  
    // Touch/Swipe controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 30;
  
    mazeArea.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      e.preventDefault();
    }, { passive: false });
  
    mazeArea.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      
      if(Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if(Math.abs(diffX) > minSwipeDistance) {
          movePlayer(0, diffX > 0 ? 1 : -1);
        }
      } else {
        // Vertical swipe
        if(Math.abs(diffY) > minSwipeDistance) {
          movePlayer(diffY > 0 ? 1 : -1, 0);
        }
      }
      e.preventDefault();
    }, { passive: false });
  
    // Restart button
    function restartGame() {
      playerPos = { r: 0, c: 0 };
      gameActive = true;
      generateSolvableMaze();
      renderMaze();
    }
  
    restartBtn.onclick = restartGame;
  
    // Initialize game
    generateSolvableMaze();
    renderMaze();
  }
