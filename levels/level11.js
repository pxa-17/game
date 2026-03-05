function startLevel11(container, onComplete){
  container.innerHTML = `
    <h3>Level 11: Tic Tac Toe ❌⭕ (Hard Mode)</h3>
    <p>You are X. Beat the smart computer!</p>
    <div id="tttBoard" style="
      display:grid;
      grid-template-columns:repeat(3,100px);
      grid-gap:5px;
      justify-content:center;
      margin:20px auto;">
    </div>
    <p id="tttStatus" style="text-align:center; font-weight:bold;"></p>
    <button id="tttReset" style="
      display:block;
      margin:10px auto;
      padding:8px 16px;
      background:#ff4da6;
      color:#fff;
      border:none;
      border-radius:5px;
      cursor:pointer;">
      Restart
    </button>
  `;

  const boardEl = document.getElementById("tttBoard");
  const statusEl = document.getElementById("tttStatus");
  const resetBtn = document.getElementById("tttReset");

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

    // 1️⃣ Try to win
    move = findBestMove("O");

    // 2️⃣ Block player
    if(move===null){
      move = findBestMove("X");
    }

    // 3️⃣ Take center
    if(move===null && board[4]===""){
      move = 4;
    }

    // 4️⃣ Take corner
    const corners = [0,2,6,8];
    const emptyCorners = corners.filter(i=>board[i]==="");
    if(move===null && emptyCorners.length>0){
      move = emptyCorners[Math.floor(Math.random()*emptyCorners.length)];
    }

    // 5️⃣ Random fallback
    if(move===null){
      const emptyIndexes = board
        .map((val,i)=> val==="" ? i : null)
        .filter(v=>v!==null);
      move = emptyIndexes[Math.floor(Math.random()*emptyIndexes.length)];
    }

    board[move] = "O";
    boardEl.children[move].innerText = "O";

    const result = checkWinner();
    if(result==="O"){
      statusEl.innerText = "Computer Wins! 😈";
      gameActive = false;
    } else if(result==="draw"){
      statusEl.innerText = "It's a Draw!";
      gameActive = false;
    } else {
      statusEl.innerText = "Your Turn (X)";
    }
  }

  function createBoard(){
    boardEl.innerHTML = "";
    board = ["","","","","","","","",""];
    gameActive = true;
    statusEl.innerText = "Your Turn (X)";

    for(let i=0;i<9;i++){
      const cell = document.createElement("div");
      cell.style.width = "100px";
      cell.style.height = "100px";
      cell.style.background = "#fff";
      cell.style.border = "2px solid #ff4da6";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontSize = "2rem";
      cell.style.cursor = "pointer";

      cell.addEventListener("click", ()=>{
        if(!gameActive || board[i] !== "") return;

        board[i] = "X";
        cell.innerText = "X";

        const result = checkWinner();

        if(result==="X"){
          statusEl.innerText = "You Win! 🎉";
          gameActive = false;
          setTimeout(()=> onComplete(), 800);
        } else if(result==="draw"){
          statusEl.innerText = "It's a Draw!";
          gameActive = false;
        } else {
          statusEl.innerText = "Computer's Turn...";
          setTimeout(computerMove, 400);
        }
      });

      boardEl.appendChild(cell);
    }
  }

  createBoard();
  resetBtn.onclick = createBoard;
}