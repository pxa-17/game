function startLevel19(container, onComplete){
  container.innerHTML = `
  <style>
    .wordsearch-container{
      display:flex;
      font-family:'Segoe UI',sans-serif;
      padding:20px;
    }

    .grid{
      display:grid;
      grid-template-columns:repeat(20,30px);
      grid-template-rows:repeat(20,30px);
      gap:2px;
      background:#fce4ec;
      border-radius:10px;
      user-select:none;
    }

    .cell{
      width:30px;
      height:30px;
      text-align:center;
      line-height:30px;
      font-weight:bold;
      font-size:16px;
      background:#fff;
      border-radius:4px;
      cursor:pointer;
      color:#333;
      transition:0.2s;
    }

    .cell.selected{
      background:#ff6b81;
      color:white;
    }

    .cell.permanent{
      background:#ff85a2;
      color:white;
    }

    .word-list{
      margin-left:20px;
      max-width:320px;
    }

    .word-list h3{
      color:#ff6b81;
    }

    .word-list ul{
      list-style:none;
      padding-left:0;
      margin:0;
    }

    .word-list li{
      margin-bottom:8px;
      font-size:14px;
    }

    .word-list li.found{
      text-decoration: line-through;
      color:#4caf50;
    }
  </style>

  <div class="wordsearch-container">
    <div class="grid" id="wordGrid"></div>
    <div class="word-list">
      <h3>Find the Word from Clues</h3>
      <ul id="wordList"></ul>
    </div>
  </div>
  `;

  const GRID_SIZE = 20;
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

  let grid = Array.from({length:GRID_SIZE},()=>Array(GRID_SIZE).fill(""));
  let foundWords = new Set();

  const directions = [
    [0,1],[1,0],[1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]
  ];

  function placeWords(){
    words.forEach(({word})=>{
      const w = word.toUpperCase();
      let placed = false;

      while(!placed){
        const dir = directions[Math.floor(Math.random()*directions.length)];
        const row = Math.floor(Math.random()*GRID_SIZE);
        const col = Math.floor(Math.random()*GRID_SIZE);
        let fits = true;

        for(let i=0;i<w.length;i++){
          let r = row + dir[0]*i;
          let c = col + dir[1]*i;
          if(r<0||r>=GRID_SIZE||c<0||c>=GRID_SIZE){ fits=false; break; }
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

    for(let r=0;r<GRID_SIZE;r++){
      for(let c=0;c<GRID_SIZE;c++){
        if(grid[r][c]==""){
          grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random()*26));
        }
      }
    }
  }

  placeWords();

  let cells = [];
  for(let r=0;r<GRID_SIZE;r++){
    for(let c=0;c<GRID_SIZE;c++){
      const div = document.createElement("div");
      div.className="cell";
      div.dataset.row = r;
      div.dataset.col = c;
      div.textContent = grid[r][c];
      wordGrid.appendChild(div);
      cells.push(div);
    }
  }

  words.forEach(({clue, word})=>{
    const li = document.createElement("li");
    li.textContent = clue;
    li.dataset.word = word.toUpperCase();
    wordListEl.appendChild(li);
  });

  let selecting=false;
  let selectedCells=[];
  let startCell=null;
  let direction=null;

  function resetSelection(){
    selectedCells.forEach(c=>c.classList.remove("selected"));
    selectedCells=[];
    selecting=false;
    direction=null;
  }

  function isStraightLine(r1,c1,r2,c2){
    const dr = r2 - r1;
    const dc = c2 - c1;

    if(dr === 0) return [0, Math.sign(dc)];
    if(dc === 0) return [Math.sign(dr), 0];
    if(Math.abs(dr) === Math.abs(dc)) return [Math.sign(dr), Math.sign(dc)];

    return null;
  }

  function checkWord(){
    const letters = selectedCells.map(c=>c.textContent).join("");
    const lettersRev = letters.split("").reverse().join("");
    let matched = null;

    const lis = wordListEl.querySelectorAll("li");
    lis.forEach(li=>{
      const w = li.dataset.word;
      if(!foundWords.has(w) && (letters===w || lettersRev===w)){
        matched = w;
        li.classList.add("found");
        foundWords.add(w);
      }
    });

    if(matched){
      selectedCells.forEach(c=>{
        c.classList.remove("selected");
        c.classList.add("permanent");
      });
    } else {
      resetSelection();
    }

    if(foundWords.size === words.length){
      setTimeout(()=>{
        alert("💖 You solved all clues! Level Complete! 💖");
        if(onComplete) onComplete();
      },200);
    }

    selectedCells=[];
    selecting=false;
    direction=null;
  }

  wordGrid.addEventListener("mousedown",e=>{
    if(e.target.classList.contains("cell")){
      selecting=true;
      startCell=e.target;
      selectedCells=[e.target];
      e.target.classList.add("selected");
    }
  });

  wordGrid.addEventListener("mouseover",e=>{
    if(!selecting || !e.target.classList.contains("cell")) return;

    const r1 = parseInt(startCell.dataset.row);
    const c1 = parseInt(startCell.dataset.col);
    const r2 = parseInt(e.target.dataset.row);
    const c2 = parseInt(e.target.dataset.col);

    const dir = isStraightLine(r1,c1,r2,c2);
    if(!dir) return;

    resetSelection();
    selecting=true;
    selectedCells=[];
    direction=dir;

    let r=r1, c=c1;
    while(true){
      const cell = wordGrid.querySelector(`[data-row='${r}'][data-col='${c}']`);
      if(cell){
        selectedCells.push(cell);
        cell.classList.add("selected");
      }
      if(r===r2 && c===c2) break;
      r+=dir[0];
      c+=dir[1];
    }
  });

  document.addEventListener("mouseup",()=>{
    if(selecting){
      checkWord();
    }
  });
}