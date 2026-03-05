// levels/level9.js
function startLevel9(container,onComplete){
    container.innerHTML = `
      <h3>Level 9: Hit the Targets 🎯</h3>
      <p>Click moving targets 10 times to win!</p>
      <div id="targetArea" style="width:300px;height:300px;margin:auto;border:2px solid #ff4da6;position:relative;"></div>
      <p id="score9">Score:0</p>
    `;
    const area = document.getElementById("targetArea");
    const scoreDisplay = document.getElementById("score9");
    let score=0;
    const targetScore=10;
  
    function spawnTarget(){
      const t = document.createElement("div");
      t.style.width="30px";
      t.style.height="30px";
      t.style.background="#ff1e4d";
      t.style.position="absolute";
      t.style.borderRadius="50%";
      t.style.top=Math.random()*270+"px";
      t.style.left=Math.random()*270+"px";
      area.appendChild(t);
  
      t.onclick=()=>{
        score++;
        scoreDisplay.innerText="Score:"+score;
        t.remove();
        if(score>=targetScore) onComplete();
      };
  
      setTimeout(()=>t.remove(),1500);
    }
  
    setInterval(spawnTarget,700);
  }