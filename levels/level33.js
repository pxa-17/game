function startLevel33(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 33 – Color Pattern</h2>
    <p class="level-subtitle">Sort balls by color into tubes</p>
    <div class="level-game-area" style="display:flex; justify-content:center; flex-wrap:wrap;">
    <style>
    .ball-sort-card{
      width: 750px;
      max-width: 95%;
      margin: 30px auto;
      padding: 20px;
      background: #2c2c2c;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      text-align: center;
      font-family:'Segoe UI',sans-serif;
      color: #fff;
    }
    .instructions{
      font-size:18px;
      margin-bottom:10px;
      color:#ffa7c4;
      font-weight:bold;
    }
    .tubes{
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .tube{
      width: 60px;
      height: 240px;
      border: 2px solid #ffa7c4;
      border-radius: 10px;
      background: #3a3a3a;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      padding: 5px 0;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .tube:hover{
      transform: scale(1.05);
    }
    .ball{
      width: 50px;
      height: 30px;
      border-radius: 15px;
      margin: 3px 0;
      transition: all 0.2s;
      border: 1px solid #fff;
    }
    .moves{
      margin-top: 15px;
      font-weight:bold;
      color: #ffa7c4;
    }
    .restart-btn{
      margin-top: 20px;
      padding: 10px 20px;
      border:none;
      border-radius:8px;
      background:#ffa7c4;
      color:white;
      font-weight:bold;
      cursor:pointer;
    }
    .restart-btn:hover{
      background:#ff7aa5;
    }
    </style>

    <div class="ball-sort-card">
      <h3>Level 33 – Ball Sorting Tubes</h3>
      <div class="instructions">Click on a tube to select the top ball, then click another tube to move it.</div>
      <div class="tubes" id="tubes"></div>
      <div class="moves" id="moves">Moves: 0</div>
      <button class="restart-btn" id="restartBtn">Restart Level</button>
    </div>
    </div>
  </div>
  `;

  const tubesContainer = container.querySelector("#tubes");
  const movesEl = container.querySelector("#moves");
  const restartBtn = container.querySelector("#restartBtn");

  // Pastel colors
  const colors = ["#FFB3BA","#BAFFC9","#BAE1FF","#FFFFBA","#FFCBA4"];
  const ballsPerColor = 4;
  const totalTubes = colors.length + 2; // extra empty tubes for harder gameplay

  let tubes = [];
  let selectedTube = null;
  let moves = 0;

  function initGame(){
    moves = 0;
    movesEl.textContent = "Moves: 0";
    tubesContainer.innerHTML = "";
    tubes = [];

    // Create grouped balls
    let balls = [];
    colors.forEach(color=>{
      for(let i=0;i<ballsPerColor;i++){
        balls.push(color);
      }
    });

    // Shuffle balls
    balls = balls.sort(()=>Math.random()-0.5);

    // Fill tubes randomly, leaving 2 empty tubes for solving
    for(let i=0;i<totalTubes;i++){
      let tubeBalls = [];
      if(i < totalTubes - 2){
        tubeBalls.push(balls.pop());
        tubeBalls.push(balls.pop());
        tubeBalls.push(balls.pop());
        tubeBalls.push(balls.pop());
      }
      tubes.push(tubeBalls);
    }

    renderTubes();
  }

  function renderTubes(){
    tubesContainer.innerHTML = "";
    tubes.forEach((tubeBalls,tubeIndex)=>{
      const tubeEl = document.createElement("div");
      tubeEl.className = "tube";
      tubeBalls.forEach(color=>{
        const ballEl = document.createElement("div");
        ballEl.className = "ball";
        ballEl.style.backgroundColor = color;
        tubeEl.appendChild(ballEl);
      });

      tubeEl.onclick = ()=>{
        handleTubeClick(tubeIndex);
      }

      tubesContainer.appendChild(tubeEl);
    });
  }

  function handleTubeClick(index){
    if(selectedTube === null){
      if(tubes[index].length > 0){
        selectedTube = index;
      }
    } else {
      if(index !== selectedTube){
        const ballToMove = tubes[selectedTube][tubes[selectedTube].length-1];
        if(tubes[index].length === 0 || tubes[index][tubes[index].length-1] === ballToMove){
          tubes[selectedTube].pop();
          tubes[index].push(ballToMove);
          moves++;
          movesEl.textContent = "Moves: " + moves;
          renderTubes();
          checkWin();
        }
      }
      selectedTube = null;
    }
  }

  function checkWin(){
    let won = true;
    const colorMap = {}; // to track which colors are in which tube
    tubes.forEach(tube=>{
      tube.forEach(color=>{
        if(!colorMap[color]) colorMap[color] = new Set();
        colorMap[color].add(tube);
      });
    });
    // all colors should appear in exactly one tube
    for(let color in colorMap){
      if(colorMap[color].size !== 1){
        won = false;
      }
    }
    if(won){
      setTimeout(()=>{
        alert("🎉 Level Completed!");
        if(onComplete) onComplete();
      }, 200);
    }
  }

  restartBtn.onclick = initGame;

  initGame();
}