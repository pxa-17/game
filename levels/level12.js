function startLevel12(container, onComplete){

  container.innerHTML = `
  <style>
    .wrapper{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      height:420px;
      font-family:sans-serif;
      text-align:center;
      position:relative;
    }

    .buttons{
      display:flex;
      gap:20px;
      margin-top:30px;
    }

    .btn{
      padding:15px 25px;
      border:none;
      border-radius:10px;
      color:white;
      font-size:16px;
      cursor:pointer;
      transition:all 0.3s ease;
    }

    .blue{ background:#2196f3; }
    .red{ background:#f44336; }
    .green{ background:#4caf50; }

    .warning{
      font-size:13px;
      margin-top:15px;
      color:#999;
    }
  </style>

  <div class="wrapper">
    <h2 id="instruction">Tap the BLUE button</h2>
    <div>Lives: <span id="lives">❤️❤️❤️</span></div>

    <div class="buttons">
      <button class="btn blue" id="btn1">RED</button>
      <button class="btn red" id="btn2">GREEN</button>
      <button class="btn green" id="btn3">BLUE</button>
    </div>

    <div class="warning">
      Instructions may change...
    </div>
  </div>
  `;

  let lives = 3;
  let phase = 1;

  const livesEl = document.getElementById("lives");
  const instruction = document.getElementById("instruction");

  function updateLives(){
    livesEl.textContent = "❤️".repeat(lives);
  }

  function loseLife(){
    lives--;
    updateLives();

    if(lives<=0){
      alert("You lost 😈 The mastermind wins.");
      startLevel12(container,onComplete);
    }
  }

  // After 3 seconds change instruction
  setTimeout(()=>{
    instruction.textContent = "Do NOT tap the button labeled BLUE.";
    phase = 2;

    // Shuffle button order
    const buttons = document.querySelector(".buttons");
    buttons.appendChild(document.getElementById("btn2"));
  },3000);

  document.getElementById("btn1").onclick = ()=>{
    if(phase === 2){
      // btn1 is blue colored but labeled RED
      onComplete();
    }else{
      loseLife();
    }
  };

  document.getElementById("btn2").onclick = loseLife;

  document.getElementById("btn3").onclick = loseLife;

}