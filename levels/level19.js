function startLevel19(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 19 – Word Search</h2>
    <p class="level-subtitle">Find the hidden words from clues</p>
    <div class="level-game-area" style="overflow:auto; max-height:65vh;">
  <style>
    .wordsearch-container{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      align-items:flex-start;
      gap:15px;
      font-family:'Segoe UI',sans-serif;
      padding:10px;
      min-width:max-content;
    }

    .grid{
      display:grid;
      grid-template-columns:repeat(20, 26px);
      grid-template-rows:repeat(12, 26px);
      gap:1px;
      background:#ff4da6;
      border-radius:6px;
      user-select:none;
      flex-shrink:0;
    }

    @media (min-width: 600px) {
      .grid{
        grid-template-columns:repeat(20, 30px);
        grid-template-rows:repeat(12, 30px);
      }
    }

    .cell{
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:bold;
      font-size:10px;
      background:#fff;
      cursor:pointer;
      color:#333;
      transition:0.1s;
    }

    @media (min-width: 600px) {
      .cell{font-size:12px;}
    }

    .cell.selected{
      background:#ff4da6;
      color:white;
    }

    .cell.permanent{
      background:#4caf50;
      color:white;
    }

    .word-list{
      min-width:200px;
      max-width:300px;
    }

    .word-list h3{
      color:#ff4da6;
      font-size:14px;
      margin:0 0 8px 0;
    }

    .word-list ul{
      list-style:none;
      padding:0;
      margin:0;
      display:flex;
      flex-wrap:wrap;
      gap:6px;
    }

    .word-list li{
      font-size:10px;
      background:linear-gradient(135deg, #fff5f8, #ffe6f0);
      padding:5px 8px;
      border-radius:10px;
      color:#6b5b7a;
    }

    @media (min-width: 600px) {
      .word-list li{font-size:11px;}
    }

    .word-list li.found{
      text-decoration:line-through;
      opacity:0.5;
      background:#e0e0e0;
    }
  </style>

  <div class="wordsearch-container">
    <div class="grid" id="wordGrid"></div>
    <div class="word-list">
      <h3>Clues</h3>
      <ul id="wordList"></ul>
    </div>
  </div>
    </div>
  </div>
  `;

  const COLS = 20;
  const ROWS = 12;
  const wordGrid = container.querySelector("#wordGrid");
  const wordListEl = container.querySelector("#wordList");

  const words = [
    {word:"HEART", clue:"Place where we feel all emotions"},
    {word:"HUG", clue:"A warm embrace"},
    {word:"KISS", clue:"A gentle peck on lips"},
    {word:"MOURN", clue:"That voice when we love"},
    {word:"VALENTINE", clue:"You Celebrating for the First Time"},
    {word:"TRUST", clue:"We have this in each other"},
    {word:"LOYAL", clue:"We are always this to each other"},
    {word:"FLIRT", clue:"Playful attraction"},
    {word:"CARE", clue:"We do this for each other, every moment, every day, every second"},
    {word:"ROMANCE", clue:"Love story or affair"},
    {word:"DATES", clue:"Time spent together"},
    {word:"CHOCOLATES", clue:"Our all time favorite treat"},
    {word:"AHMEDABAD", clue:"Most memorable and special place for us"},
    {word:"CONCERT", clue:"Live music performance we attended"},
    {word:"FOOD", clue:"We both love to eat together"},
    {word:"COFFEE", clue:"My all time craving"},
    {word:"KUMBALGARH", clue:"From where it all started"}
  ];

  let grid = Array.from({length: ROWS}, () => Array(COLS).fill(""));
  let foundWords = new Set();

  const directions = [[0,1],[1,0],[1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]];

  function placeWords(){
    words.forEach(({word})=>{
      const w = word.toUpperCase();
      let placed = false;
      let attempts = 0;
      while(!placed && attempts < 100){
        attempts++;
        const dir = directions[Math.floor(Math.random()*directions.length)];
        const row = Math.floor(Math.random()*(ROWS - w.length));
        const col = Math.floor(Math.random()*(COLS - w.length));
        let fits = true;
        for(let i=0;i<w.length;i++){
          let r = row + dir[0]*i;
          let c = col + dir[1]*i;
          if(r<0||r>=ROWS||c<0||c>=COLS){ fits=false; break; }
          if(grid[r][c]!=="" && grid[r][c]!==w[i]){ fits=false; break; }
        }
        if(fits){
          for(let i=0;i<w.length;i++){
            let r = row + dir[0]*i;
            let c = col + dir[1]*i;
            grid[r][c] = w[i];
          }
          placed = true;
        }
      }
    });
    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        if(grid[r][c]=="") grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random()*26));
      }
    }
  }

  placeWords();

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const div = document.createElement("div");
      div.className = "cell";
      div.dataset.row = r;
      div.dataset.col = c;
      div.textContent = grid[r][c];
      wordGrid.appendChild(div);
    }
  }

  words.forEach(({clue, word})=>{
    const li = document.createElement("li");
    li.textContent = clue;
    li.dataset.word = word.toUpperCase();
    wordListEl.appendChild(li);
  });

  let selecting=false, selectedCells=[], startCell=null;

  function resetSelection(){
    selectedCells.forEach(c=>c.classList.remove("selected"));
    selectedCells=[]; selecting=false;
  }

  function isStraightLine(r1,c1,r2,c2){
    const dr = r2 - r1, dc = c2 - c1;
    if(dr === 0) return [0, Math.sign(dc)];
    if(dc === 0) return [Math.sign(dr), 0];
    if(Math.abs(dr) === Math.abs(dc)) return [Math.sign(dr), Math.sign(dc)];
    return null;
  }

  function checkWord(){
    const letters = selectedCells.map(c=>c.textContent).join("");
    const lettersRev = letters.split("").reverse().join("");
    let matched = null;
    wordListEl.querySelectorAll("li").forEach(li=>{
      const w = li.dataset.word;
      if(!foundWords.has(w) && (letters===w || lettersRev===w)){
        matched = w;
        li.classList.add("found");
        foundWords.add(w);
      }
    });
    if(matched){
      selectedCells.forEach(c=>{ c.classList.remove("selected"); c.classList.add("permanent"); });
    } else { resetSelection(); }
    if(foundWords.size === words.length){
      setTimeout(()=>{ alert("Level Complete!"); if(onComplete) onComplete(); },200);
    }
    selectedCells=[]; selecting=false;
  }

  wordGrid.addEventListener("mousedown",e=>{
    if(e.target.classList.contains("cell")){
      selecting=true; startCell=e.target; selectedCells=[e.target]; e.target.classList.add("selected");
    }
  });

  wordGrid.addEventListener("mouseover",e=>{
    if(!selecting || !e.target.classList.contains("cell")) return;
    const r1=parseInt(startCell.dataset.row), c1=parseInt(startCell.dataset.col);
    const r2=parseInt(e.target.dataset.row), c2=parseInt(e.target.dataset.col);
    const dir = isStraightLine(r1,c1,r2,c2);
    if(!dir) return;
    resetSelection(); selecting=true; selectedCells=[];
    let r=r1, c=c1;
    while(true){
      const cell = wordGrid.querySelector(`[data-row='${r}'][data-col='${c}']`);
      if(cell){ selectedCells.push(cell); cell.classList.add("selected"); }
      if(r===r2 && c===c2) break;
      r+=dir[0]; c+=dir[1];
      if(r>=ROWS || c>=COLS) break;
    }
  });

  document.addEventListener("mouseup",()=>{ if(selecting) checkWord(); });

  // Touch support
  let touchStartCell = null;
  wordGrid.addEventListener("touchstart",e=>{
    if(e.target.classList.contains("cell")){
      e.preventDefault();
      touchStartCell = e.target; selecting=true; selectedCells=[e.target]; e.target.classList.add("selected");
    }
  },{passive:false});

  wordGrid.addEventListener("touchmove",e=>{
    if(!selecting || !touchStartCell) return;
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if(element && element.classList.contains("cell")){
      const r1=parseInt(touchStartCell.dataset.row), c1=parseInt(touchStartCell.dataset.col);
      const r2=parseInt(element.dataset.row), c2=parseInt(element.dataset.col);
      const dir = isStraightLine(r1,c1,r2,c2);
      if(!dir) return;
      resetSelection(); selecting=true; selectedCells=[];
      let r=r1, c=c1;
      while(true){
        const cell = wordGrid.querySelector(`[data-row='${r}'][data-col='${c}']`);
        if(cell){ selectedCells.push(cell); cell.classList.add("selected"); }
        if(r===r2 && c===c2) break;
        r+=dir[0]; c+=dir[1];
        if(r>=ROWS || c>=COLS) break;
      }
    }
  },{passive:false});

  wordGrid.addEventListener("touchend",()=>{ if(selecting){ checkWord(); touchStartCell=null; } });
}
