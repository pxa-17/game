function startLevel21(container, onComplete){

container.innerHTML = `
<style>
.sudoku-container{
  text-align:center;
  font-family:Segoe UI, sans-serif;
}

.sudoku-grid{
  display:grid;
  grid-template-columns:repeat(9,40px);
  grid-template-rows:repeat(9,40px);
  margin:20px auto;
  width:max-content;
}

/* Normal cells */
.cell{
  width:40px;
  height:40px;
  text-align:center;
  font-size:18px;
  border:1px solid #999;
  box-sizing:border-box;
}

.cell:focus{
  outline:none;
  background:#f0f8ff;
}

/* Fixed cells */
.fixed{
  background:#eee;
  font-weight:bold;
}

/* Wrong entry */
.error{
  background:#ffcccc !important;
}

/* 3x3 Box borders only */
.box-right{
  border-right:3px solid #444 !important;
}

.box-bottom{
  border-bottom:3px solid #444 !important;
}

.message{
  margin-top:15px;
  font-size:18px;
  font-weight:bold;
}

.restart-btn{
  margin-top:15px;
  padding:8px 15px;
  border:none;
  background:#ff4d88;
  color:white;
  border-radius:6px;
  cursor:pointer;
}
</style>

<div class="sudoku-container">
  <h2>🧠 Level 21 – Sudoku (Medium)</h2>
  <div class="sudoku-grid" id="grid"></div>
  <div class="message" id="message"></div>
  <button class="restart-btn" id="restartBtn">Restart</button>
</div>
`;

const puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

const grid = container.querySelector("#grid");
const message = container.querySelector("#message");
const restartBtn = container.querySelector("#restartBtn");

function createGrid(){
  grid.innerHTML = "";

  for(let row=0; row<9; row++){
    for(let col=0; col<9; col++){

      const input = document.createElement("input");
      input.classList.add("cell");

      /* Add thicker borders for 3x3 boxes */
      if((col+1)%3===0 && col!==8) input.classList.add("box-right");
      if((row+1)%3===0 && row!==8) input.classList.add("box-bottom");

      if(puzzle[row][col] !== 0){
        input.value = puzzle[row][col];
        input.disabled = true;
        input.classList.add("fixed");
      }else{
        input.maxLength = 1;
        input.dataset.row = row;
        input.dataset.col = col;
        input.addEventListener("input", handleInput);
      }

      grid.appendChild(input);
    }
  }
}

function handleInput(e){
  const input = e.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);
  const value = parseInt(input.value);

  input.classList.remove("error");

  if(!value || value < 1 || value > 9){
    input.value = "";
    return;
  }

  if(value !== solution[row][col]){
    input.classList.add("error");
  }

  checkWin();
}

function checkWin(){
  const cells = container.querySelectorAll(".cell");
  let completed = true;

  cells.forEach(cell=>{
    if(!cell.disabled){
      if(cell.value == "" || cell.classList.contains("error")){
        completed = false;
      }
    }
  });

  if(completed){
    message.innerHTML = "🎉 Sudoku Completed Successfully! 🎉";
    if(onComplete) onComplete();
  }
}

restartBtn.onclick = ()=> startLevel21(container, onComplete);

createGrid();
}