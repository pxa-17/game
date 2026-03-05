function startLevel4(container, onComplete) {

    container.innerHTML = `
      <h3>Complete the Puzzle 🧩</h3>
      <div id="puzzleArea" style="position: relative; width: 300px; height: 300px; margin: auto; border: 2px solid #ff4da6; overflow: hidden; border-radius: 15px;"></div>
    `;
  
    const puzzleArea = document.getElementById("puzzleArea");
    const gridSize = 3; // 3x3 puzzle
    const pieceSize = 100; // 300/3
    const imageSrc = "images/img4.png";
  
    // Generate pieces
    const positions = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        positions.push({x: c*pieceSize, y: r*pieceSize});
      }
    }
  
    const shuffled = [...positions].sort(() => Math.random() - 0.5);
  
    positions.forEach((pos, index) => {
      const piece = document.createElement("div");
      piece.classList.add("puzzlePiece");
      piece.style.width = pieceSize + "px";
      piece.style.height = pieceSize + "px";
      piece.style.position = "absolute";
      piece.style.left = shuffled[index].x + "px";
      piece.style.top = shuffled[index].y + "px";
      piece.style.backgroundImage = `url(${imageSrc})`;
      piece.style.backgroundSize = `${gridSize*pieceSize}px ${gridSize*pieceSize}px`;
      piece.style.backgroundPosition = `-${pos.x}px -${pos.y}px`;
      piece.style.cursor = "grab";
      piece.setAttribute("data-correct-x", pos.x);
      piece.setAttribute("data-correct-y", pos.y);
  
      puzzleArea.appendChild(piece);
  
      // Add drag & drop logic (similar to previous code)
      let offsetX, offsetY;
      piece.addEventListener("mousedown", (e) => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        piece.style.zIndex = 1000;
        piece.style.cursor = "grabbing";
  
        function onMouseMove(eMove) {
          piece.style.left = eMove.clientX - puzzleArea.getBoundingClientRect().left - offsetX + "px";
          piece.style.top = eMove.clientY - puzzleArea.getBoundingClientRect().top - offsetY + "px";
        }
  
        function onMouseUp() {
          // Snap to correct position if close
          const x = parseFloat(piece.style.left);
          const y = parseFloat(piece.style.top);
          const correctX = parseFloat(piece.getAttribute("data-correct-x"));
          const correctY = parseFloat(piece.getAttribute("data-correct-y"));
  
          if (Math.abs(x - correctX) < 15 && Math.abs(y - correctY) < 15) {
            piece.style.left = correctX + "px";
            piece.style.top = correctY + "px";
            piece.style.cursor = "default";
          }
  
          checkCompletion();
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        }
  
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      });
    });
  
    function checkCompletion() {
      const pieces = puzzleArea.querySelectorAll(".puzzlePiece");
      let completed = true;
      pieces.forEach(piece => {
        const x = parseFloat(piece.style.left);
        const y = parseFloat(piece.style.top);
        const correctX = parseFloat(piece.getAttribute("data-correct-x"));
        const correctY = parseFloat(piece.getAttribute("data-correct-y"));
        if (Math.abs(x - correctX) > 1 || Math.abs(y - correctY) > 1) completed = false;
      });
      if (completed) onComplete();
    }
  }