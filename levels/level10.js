function startLevel10(container, onComplete){
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 10 – Sliding Puzzle 🧩</h2>
        <p class="level-subtitle">Arrange the pieces to complete the image!</p>
        <div class="level-game-area">
          <div id="puzzleWrapper" style="width:320px; margin:auto; text-align:center;">
            <div id="puzzleArea" style="position:relative; width:300px; height:300px; margin:auto; border:2px solid #ff4da6; border-radius:12px; overflow:hidden; background:#f0f0f0;"></div>
            <button class="restart-btn" id="resetPuzzle" style="margin-top:15px;">Reset Puzzle</button>
          </div>
        </div>
        <div class="level-stats">
          <span>Click tiles to slide</span>
        </div>
      </div>
    `;
  
    const puzzleArea = container.querySelector("#puzzleArea");
    const resetBtn = container.querySelector("#resetPuzzle");
    const size = 3;
    const pieceSize = 100;
    const pieces = [];
    const empty = {x:size-1, y:size-1};
  
    function createPuzzle(){
      puzzleArea.innerHTML = "";
      pieces.length = 0;
  
      for(let y=0;y<size;y++){
        for(let x=0;x<size;x++){
          if(x===empty.x && y===empty.y) continue;
          const piece = document.createElement("div");
          piece.style.width = pieceSize + "px";
          piece.style.height = pieceSize + "px";
          piece.style.position = "absolute";
          piece.style.left = x*pieceSize + "px";
          piece.style.top = y*pieceSize + "px";
          piece.style.backgroundImage = "url('images/img10.png')";
          piece.style.backgroundSize = (size*pieceSize) + "px " + (size*pieceSize) + "px";
          piece.style.backgroundPosition = `-${x*pieceSize}px -${y*pieceSize}px`;
          piece.style.border = "1px solid rgba(255,255,255,0.5)";
          piece.style.cursor = "pointer";
          piece.style.transition = "all 0.15s ease";
          puzzleArea.appendChild(piece);
          piece.dataset.x = x;
          piece.dataset.y = y;
          piece.dataset.originalX = x;
          piece.dataset.originalY = y;
          pieces.push(piece);
        }
      }
  
      for(let i=0;i<100;i++){
        const movable = pieces.filter(p=>{
          const px = parseInt(p.dataset.x);
          const py = parseInt(p.dataset.y);
          return (Math.abs(px-empty.x)+Math.abs(py-empty.y))===1;
        });
        const p = movable[Math.floor(Math.random()*movable.length)];
        const px = parseInt(p.dataset.x);
        const py = parseInt(p.dataset.y);
  
        p.dataset.x = empty.x;
        p.dataset.y = empty.y;
        p.style.left = empty.x*pieceSize + "px";
        p.style.top = empty.y*pieceSize + "px";
        empty.x = px;
        empty.y = py;
      }
  
      pieces.forEach(p=>{
        p.onclick = ()=>{
          const px = parseInt(p.dataset.x);
          const py = parseInt(p.dataset.y);
          if(Math.abs(px-empty.x)+Math.abs(py-empty.y)===1){
            const tempX = px;
            const tempY = py;
            p.dataset.x = empty.x;
            p.dataset.y = empty.y;
            p.style.left = empty.x*pieceSize + "px";
            p.style.top = empty.y*pieceSize + "px";
            empty.x = tempX;
            empty.y = tempY;
  
            let solved = true;
            pieces.forEach(piece=>{
              if(parseInt(piece.dataset.x)!=parseInt(piece.dataset.originalX) || parseInt(piece.dataset.y)!=parseInt(piece.dataset.originalY)){
                solved=false;
              }
            });
  
            if(solved){
              alert("Puzzle Completed! 🎉");
              onComplete();
            }
          }
        }
      });
    }
  
    createPuzzle();
    resetBtn.onclick = ()=> createPuzzle();
  }
