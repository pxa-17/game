function startLevel42(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 42 – Shape Match</h2>
    <p class="level-subtitle">Turn all the lights on to win</p>
    <div class="level-game-area">
    <style>
    .lights-game{
      width: 400px;
      margin: 30px auto;
      font-family:'Segoe UI',sans-serif;
      background:#222;
      padding:15px;
      border-radius:15px;
      color:white;
      text-align:center;
    }
    .instructions{
      font-size:14px;
      color:#ffd11a;
      margin-bottom:15px;
      text-align:left;
      line-height:1.4;
    }
    .grid{
      display:grid;
      grid-template-columns: repeat(5, 60px);
      grid-gap: 5px;
      justify-content:center;
      margin-top:10px;
    }
    .cell{
      width:60px;
      height:60px;
      border-radius:10px;
      background:#444;
      cursor:pointer;
      transition:0.3s;
    }
    .on{
      background:#a3ffb3;
      box-shadow: 0 0 10px #a3ffb3;
    }
    .message{
      margin-top:15px;
      font-weight:bold;
      min-height:20px;
    }
    .reset-btn{
      margin-top:10px;
      padding:6px 12px;
      border:none;
      border-radius:6px;
      background:#ffb3cc;
      color:#222;
      cursor:pointer;
      font-weight:bold;
    }
    .reset-btn:hover{
      background:#ff99aa;
    }
    </style>

    <div class="lights-game">
      <h3>Level 42 – Switch the Lights</h3>
      <div class="instructions">
        <strong>Instructions:</strong><br>
        1. Turn all tiles ON (bright pastel green).<br>
        2. Click a tile to toggle it and its adjacent tiles (up, down, left, right).<br>
        3. Plan carefully; wrong moves can undo progress.<br>
        4. Puzzle starts solvable each time.<br>
        5. Complete the level when all tiles are ON.
      </div>
      <button class="reset-btn" id="resetBtn">Reset</button>
      <div class="grid" id="grid"></div>
      <div class="message" id="message"></div>
    </div>
    </div>
  </div>
  `;

  const gridEl = container.querySelector("#grid");
  const messageEl = container.querySelector("#message");
  const resetBtn = container.querySelector("#resetBtn");
  const rows = 5;
  const cols = 5;
  const totalCells = rows*cols;
  const cells = [];

  // create grid cells
  for(let i=0;i<totalCells;i++){
    const cell = document.createElement("div");
    cell.className="cell";
    gridEl.appendChild(cell);
    cells.push(cell);
  }

  // toggle a cell on/off
  function toggle(idx){
    if(idx<0 || idx>=totalCells) return;
    cells[idx].classList.toggle("on");
  }

  // click handler
  cells.forEach((cell,idx)=>{
    cell.onclick=()=>{
      const row = Math.floor(idx/cols);
      const col = idx%cols;

      toggle(idx);
      toggle((row-1)*cols + col);
      toggle((row+1)*cols + col);
      toggle(row*cols + (col-1));
      toggle(row*cols + (col+1));

      // check completion
      const allOn = cells.every(c=>c.classList.contains("on"));
      if(allOn){
        messageEl.style.color="#a3ffb3";
        messageEl.textContent="🎉 All lights on! Level Complete!";
        setTimeout(()=>{
          if(onComplete) onComplete();
        },500);
      }
    }
  });

  // scramble puzzle starting from solved state
  function scramble(){
    // start with all on
    cells.forEach(c=>c.classList.add("on"));
    const moves = 15; // number of random moves
    for(let i=0;i<moves;i++){
      const idx = Math.floor(Math.random()*totalCells);
      const row = Math.floor(idx/cols);
      const col = idx%cols;
      toggle(idx);
      toggle((row-1)*cols + col);
      toggle((row+1)*cols + col);
      toggle(row*cols + (col-1));
      toggle(row*cols + (col+1));
    }
    messageEl.textContent="";
  }

  // Reset button
  resetBtn.onclick = scramble;

  // Initialize first solvable puzzle
  scramble();
}