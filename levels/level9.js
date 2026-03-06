function startLevel9(container, onComplete){
    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 9 – Hit the Targets 🎯</h2>
        <p class="level-subtitle">Click moving targets 10 times to win!</p>
        <div class="level-game-area">
          <div id="targetArea" style="width:100%; max-width:300px; height:300px; margin:auto; border:none; border-radius:12px; position:relative; background: linear-gradient(135deg, #1a1a2e, #16213e);"></div>
        </div>
        <div class="level-stats">
          <span>Score: <strong id="score9">0</strong> / 10</span>
        </div>
      </div>
    `;
    
    const area = container.querySelector("#targetArea");
    const scoreDisplay = container.querySelector("#score9");
    let score = 0;
    const targetScore = 10;
  
    function spawnTarget(){
      const t = document.createElement("div");
      t.style.width="35px";
      t.style.height="35px";
      t.style.background="linear-gradient(135deg, #ff1e4d, #ff6b6b)";
      t.style.position="absolute";
      t.style.borderRadius="50%";
      t.style.boxShadow="0 0 15px rgba(255, 30, 77, 0.6)";
      t.style.top=Math.random()*(area.offsetHeight-40)+"px";
      t.style.left=Math.random()*(area.offsetWidth-40)+"px";
      t.style.cursor="pointer";
      t.style.transition="transform 0.1s";
      area.appendChild(t);
  
      t.onclick=()=>{
        score++;
        scoreDisplay.innerText = score;
        scoreDisplay.classList.add("score-animate");
        setTimeout(() => scoreDisplay.classList.remove("score-animate"), 300);
        t.remove();
        if(score>=targetScore) onComplete();
      };
  
      setTimeout(()=>t.remove(), 1500);
    }
  
    setInterval(spawnTarget, 700);
  }
