function startLevel39(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 39 – Memory Tiles</h2>
    <p class="level-subtitle">Quickly tap the highlighted tiles</p>
    <div class="level-game-area">
    <style>
    .quicktap-game{
      width: 400px;
      margin: 30px auto;
      text-align:center;
      font-family:'Segoe UI',sans-serif;
      background:#222;
      padding:15px;
      border-radius:15px;
      box-shadow:0 5px 15px rgba(0,0,0,0.5);
      color:white;
    }
    .grid{
      display:grid;
      grid-template-columns: repeat(3, 100px);
      grid-gap: 15px;
      justify-content:center;
      margin-top:20px;
    }
    .grid-btn{
      width:100px;
      height:100px;
      border-radius:15px;
      background:#444;
      cursor:pointer;
      transition:0.2s;
    }
    .active{
      background: #ffb3cc !important;
      box-shadow: 0 0 10px #ffb3cc;
    }
    .message{
      margin-top:15px;
      font-weight:bold;
      min-height:20px;
    }
    </style>

    <div class="quicktap-game">
      <h3>Level 39 – Quick Tap Challenge</h3>
      <div class="grid" id="grid"></div>
      <div class="message" id="message"></div>
      <div>Score: <span id="score">0</span>/15</div>
    </div>
    </div>
  </div>
  `;

  const gridEl = container.querySelector("#grid");
  const messageEl = container.querySelector("#message");
  const scoreEl = container.querySelector("#score");

  const gridSize = 3;
  const totalButtons = gridSize*gridSize;
  const buttons = [];
  let score = 0;
  const maxScore = 15;
  let activeIndex = -1;
  let intervalTime = 1000;

  // create buttons
  for(let i=0;i<totalButtons;i++){
    const btn = document.createElement("div");
    btn.className="grid-btn";
    gridEl.appendChild(btn);
    buttons.push(btn);

    btn.onclick = ()=>{
      if(i === activeIndex){
        score++;
        scoreEl.textContent = score;
        messageEl.style.color="#a3ffb3"; // pastel green
        messageEl.textContent="✅ Correct!";
        btn.classList.remove("active");
        activeIndex=-1;
        speedUp();
        if(score >= maxScore){
          clearInterval(intervalId);
          setTimeout(()=>{
            alert("🎉 Level Completed!");
            if(onComplete) onComplete();
          },300);
        }
      } else {
        messageEl.style.color="#ff8080"; // pastel red
        messageEl.textContent="❌ Wrong! Try next!";
      }
    }
  }

  function flashButton(){
    if(activeIndex>=0) buttons[activeIndex].classList.remove("active");
    activeIndex = Math.floor(Math.random()*totalButtons);
    buttons[activeIndex].classList.add("active");
  }

  function speedUp(){
    if(intervalTime > 400){
      intervalTime -= 50;
      clearInterval(intervalId);
      intervalId = setInterval(flashButton, intervalTime);
    }
  }

  let intervalId = setInterval(flashButton, intervalTime);
  flashButton();
}