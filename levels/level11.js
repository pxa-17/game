function startLevel11(container, onComplete){
  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 11 – Tic Tac Toe ❌⭕</h2>
      <p class="level-subtitle">You are X. Beat the smart computer!</p>
      <div class="level-game-area">
        <div id="tttBoard" style="display:grid; grid-template-columns:repeat(3,90px); grid-gap:8px; justify-content:center; margin:10px auto;"></div>
        <p id="tttStatus" style="text-align:center; font-weight:bold; margin:10px 0; color:#6b5b7a;"></p>
        <button class="restart-btn" id="tttReset" style="display:block; margin:10px auto;">Restart</button>
      </div>
    </div>
  `;

  const boardEl = container.querySelector("#tttBoard");
  const statusEl = container.querySelector("#tttStatus");
  const resetBtn = container.querySelector("#tttReset");

  let board = ["","","","","","","","",""];
  let gameActive = true;

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner(){
    for(let pattern of winPatterns){
      const [a,b,c] = pattern;
      if(board[a] && board[a]===board[b] && board[a]===board[c]){
        return board[a];
      }
    }
    return board.includes("") ? null : "draw";
  }

  function findBestMove(player){
    for(let pattern of winPatterns){
      const [a,b,c] = pattern;
      const values = [board[a], board[b], board[c]];
      if(values.filter(v=>v===player).length===2 && values.includes("")){
        if(board[a]==="") return a;
        if(board[b]==="") return b;
        if(board[c]==="") return c;
      }
    }
    return null;
  }

  function computerMove(){
    if(!gameActive) return;
    let move = null;
    move = findBestMove("O");
    if(move===null){
      move = findBestMove("X");
    }
    if(move===null && board[4]===""){
      move = 4;
    }
    const corners = [0,2,6,8];
    const emptyCorners = corners.filter(i=>board[i]==="");
    if(move===null && emptyCorners.length>0){
      move = emptyCorners[Math.floor(Math.random()*emptyCorners.length)];
    }
    if(move===null){
      const emptyIndexes = board.map((val,i)=> val==="" ? i : null).filter(v=>v!==null);
      move = emptyIndexes[Math.floor(Math.random()*emptyIndexes.length)];
    }

    board[move] = "O";
    boardEl.children[move].innerText = "O";

    const result = checkWinner();
    if(result==="O"){
      statusEl.innerText = "Computer Wins! 😈";
      statusEl.style.color = "#f44336";
      gameActive = false;
    } else if(result==="draw"){
      statusEl.innerText = "It's a Draw!";
      gameActive = false;
    } else {
      statusEl.innerText = "Your Turn (X)";
      statusEl.style.color = "#4caf50";
    }
  }

  function createBoard(){
    boardEl.innerHTML = "";
    board = ["","","","","","","","",""];
    gameActive = true;
    statusEl.innerText = "Your Turn (X)";
    statusEl.style.color = "#4caf50";

    for(let i=0;i<9;i++){
      const cell = document.createElement("div");
      cell.style.width = "90px";
      cell.style.height = "90px";
      cell.style.background = "linear-gradient(135deg, #fff5f8, #ffe6f0)";
      cell.style.border = "2px solid #ff4da6";
      cell.style.borderRadius = "12px";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontSize = "2.5rem";
      cell.style.cursor = "pointer";
      cell.style.transition = "all 0.2s ease";

      cell.addEventListener("click", ()=>{
        if(!gameActive || board[i] !== "") return;
        board[i] = "X";
        cell.innerText = "X";
        cell.style.color = "#ff4da6";

        const result = checkWinner();
        if(result==="X"){
          statusEl.innerText = "You Win! 🎉";
          statusEl.style.color = "#4caf50";
          gameActive = false;
          setTimeout(()=> onComplete(), 800);
        } else if(result==="draw"){
          statusEl.innerText = "It's a Draw!";
          gameActive = false;
        } else {
          statusEl.innerText = "Computer's Turn...";
          statusEl.style.color = "#6b5b7a";
          setTimeout(computerMove, 400);
        }
      });

      boardEl.appendChild(cell);
    }
  }

  createBoard();
  resetBtn.onclick = createBoard;
}
