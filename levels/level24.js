function startLevel24(container, onComplete){

container.innerHTML = `
<div class="level-card">
  <h2 class="level-title">Level 24 – Reaction Tap</h2>
  <p class="level-subtitle">Test your reflexes</p>
  <div class="level-game-area">
<style>
.reaction-wrapper{
  text-align:center;
  font-family:Segoe UI, sans-serif;
}

.reaction-box{
  width:320px;
  height:220px;
  margin:30px auto;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  font-weight:bold;
  border-radius:12px;
  cursor:pointer;
  user-select:none;
  transition:0.2s;
}

.waiting{
  background:#ff4d4d;
  color:white;
}

.ready{
  background:#4CAF50;
  color:white;
}

.info{
  margin-top:15px;
  font-size:16px;
}

.result{
  margin-top:15px;
  font-size:18px;
  font-weight:bold;
}
</style>

<div class="reaction-wrapper">
  <h2>⚡ Level 24 – Reaction Tap</h2>
  <div>Wait for GREEN then click fast!</div>
  <div class="reaction-box waiting" id="reactionBox">
    Wait for green...
  </div>
  <div class="info" id="roundInfo">Round 1 / 5</div>
  <div class="result" id="result"></div>
</div>
  </div>
</div>
`;

const box = container.querySelector("#reactionBox");
const roundInfo = container.querySelector("#roundInfo");
const result = container.querySelector("#result");

let round = 1;
const maxRounds = 5;
let startTime = 0;
let timeout;
let reactionTimes = [];
let ready = false;

function startRound(){

  ready = false;
  box.className = "reaction-box waiting";
  box.textContent = "Wait for green...";
  result.textContent = "";
  roundInfo.textContent = "Round " + round + " / " + maxRounds;

  const randomDelay = 1500 + Math.random()*2000;

  timeout = setTimeout(()=>{
    ready = true;
    box.className = "reaction-box ready";
    box.textContent = "CLICK!";
    startTime = Date.now();
  }, randomDelay);
}

box.onclick = function(){

  if(!ready){
    clearTimeout(timeout);
    result.textContent = "❌ Too Early! Restarting...";
    round = 1;
    reactionTimes = [];
    setTimeout(startRound,1500);
    return;
  }

  const reaction = Date.now() - startTime;
  reactionTimes.push(reaction);

  if(round === maxRounds){

    const avg = Math.round(
      reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length
    );

    result.textContent = "🔥 Completed! Avg Reaction: " + avg + " ms";

    if(onComplete) onComplete();
    return;
  }

  round++;
  result.textContent = "Reaction: " + reaction + " ms";
  setTimeout(startRound,1200);
};

startRound();

}