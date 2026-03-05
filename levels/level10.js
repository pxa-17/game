function startLevel10(container, onComplete){
    container.innerHTML = `
      <h3>Level 10: Sliding Puzzle 🧩</h3>
      <p>Arrange the pieces to complete the image!</p>
      <div id="puzzleWrapper" style="width:320px; margin:auto; text-align:center;">
        <div id="puzzleArea" style="position:relative; width:300px; height:300px; margin:auto; border:2px solid #ff4da6;"></div>
        <button id="resetPuzzle" style="margin-top:10px; padding:8px 16px; background:#ff4da6; color:#fff; border:none; border-radius:5px; cursor:pointer;">Reset Puzzle</button>
      </div>
    `;
  
    const puzzleArea = document.getElementById("puzzleArea");
    const resetBtn = document.getElementById("resetPuzzle");
    const size = 3;
    const pieceSize = 100;
    const pieces = [];
    const empty = {x:size-1, y:size-1};
  
    function createPuzzle(){
      puzzleArea.innerHTML = "";
      pieces.length = 0;
  
      // Create pieces
      for(let y=0;y<size;y++){
        for(let x=0;x<size;x++){
          if(x===empty.x && y===empty.y) continue;
          const piece = document.createElement("div");
          piece.style.width = pieceSize + "px";
          piece.style.height = pieceSize + "px";
          piece.style.position = "absolute";
          piece.style.left = x*pieceSize + "px";
          piece.style.top = y*pieceSize + "px";
          piece.style.backgroundImage = "url('image/img10.png')";
          piece.style.backgroundSize = (size*pieceSize) + "px " + (size*pieceSize) + "px";
          piece.style.backgroundPosition = `-${x*pieceSize}px -${y*pieceSize}px`;
          piece.style.border = "1px solid #fff";
          piece.style.cursor = "pointer";
          puzzleArea.appendChild(piece);
          piece.dataset.x = x;
          piece.dataset.y = y;
          piece.dataset.originalX = x;
          piece.dataset.originalY = y;
          pieces.push(piece);
        }
      }
  
      // Shuffle using valid moves to ensure solvable puzzle
      for(let i=0;i<100;i++){
        const movable = pieces.filter(p=>{
          const px = parseInt(p.dataset.x);
          const py = parseInt(p.dataset.y);
          return (Math.abs(px-empty.x)+Math.abs(py-empty.y))===1;
        });
        const p = movable[Math.floor(Math.random()*movable.length)];
        const px = parseInt(p.dataset.x);
        const py = parseInt(p.dataset.y);
  
        // Swap with empty
        p.dataset.x = empty.x;
        p.dataset.y = empty.y;
        p.style.left = empty.x*pieceSize + "px";
        p.style.top = empty.y*pieceSize + "px";
        empty.x = px;
        empty.y = py;
      }
  
      // Click to move
      pieces.forEach(p=>{
        p.onclick = ()=>{
          const px = parseInt(p.dataset.x);
          const py = parseInt(p.dataset.y);
          if(Math.abs(px-empty.x)+Math.abs(py-empty.y)===1){
            // swap
            const tempX = px;
            const tempY = py;
            p.dataset.x = empty.x;
            p.dataset.y = empty.y;
            p.style.left = empty.x*pieceSize + "px";
            p.style.top = empty.y*pieceSize + "px";
            empty.x = tempX;
            empty.y = tempY;
  
            // Check solved
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
  
    // Reset button
    resetBtn.onclick = ()=> createPuzzle();
  }