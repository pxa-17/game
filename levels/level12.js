function startLevel12(container, onComplete){

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 12 – Mind Trick 🎭</h2>
      <p class="level-subtitle">Follow the instruction carefully!</p>
      <div class="level-game-area">
        <div class="wrapper" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
          <h3 id="instruction" style="color:#ff4da6; margin-bottom:15px;">Tap the BLUE button</h3>
          <div style="margin-bottom:15px; font-size:18px;">Lives: <span id="lives" style="color:#ff4da6;">❤️❤️❤️</span></div>
          
          <div class="buttons" style="display:flex; gap:15px; margin-top:15px;">
            <button class="level-btn" id="btn1" style="padding:18px 28px; font-size:16px; border-radius:12px;">RED</button>
            <button class="level-btn" id="btn2" style="padding:18px 28px; font-size:16px; border-radius:12px;">GREEN</button>
            <button class="level-btn" id="btn3" style="padding:18px 28px; font-size:16px; border-radius:12px;">BLUE</button>
          </div>
          
          <p style="margin-top:15px; color:#6b5b7a; font-style:italic; font-size:14px;">
            Instructions may change...
          </p>
        </div>
      </div>
    </div>
  `;

  let lives = 3;
  let phase = 1;

  const livesEl = container.querySelector("#lives");
  const instruction = container.querySelector("#instruction");

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

  setTimeout(()=>{
    instruction.textContent = "Do NOT tap the button labeled BLUE.";
    instruction.style.color = "#f44336";
    phase = 2;
    const buttons = container.querySelector(".buttons");
    buttons.appendChild(container.querySelector("#btn2"));
  },3000);

  container.querySelector("#btn1").onclick = ()=>{
    if(phase === 2){
      onComplete();
    }else{
      loseLife();
    }
  };

  container.querySelector("#btn2").onclick = loseLife;
  container.querySelector("#btn3").onclick = loseLife;

  const btn1 = container.querySelector("#btn1");
  const btn2 = container.querySelector("#btn2");
  const btn3 = container.querySelector("#btn3");
  
  btn1.style.background = "linear-gradient(135deg, #f44336, #ff6b6b)";
  btn2.style.background = "linear-gradient(135deg, #4caf50, #81c784)";
  btn3.style.background = "linear-gradient(135deg, #2196f3, #64b5f6)";
}
