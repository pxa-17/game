function startLevel25(container, onComplete){

function initGame(){

container.innerHTML = `
<style>
.game-wrapper{
  display:flex;
  justify-content:center;
  padding:30px 0;
  font-family:Segoe UI, sans-serif;
  background:linear-gradient(135deg,#e6ecf3,#d7e1ec);
}

.game-card{
  background:white;
  width:850px;
  border-radius:20px;
  box-shadow:0 20px 50px rgba(0,0,0,0.15);
  padding:25px;
  box-sizing:border-box;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:15px;
}

.level-title{
  font-weight:700;
  font-size:18px;
}

/* PERFECT STATS ALIGNMENT */
.stats{
  display:flex;
  align-items:center;
  gap:30px;
  font-weight:600;
  font-size:16px;
}

.stat-box{
  display:flex;
  align-items:center;
  gap:6px;
}

.object-list{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:20px;
  padding:12px 0;
  margin-bottom:15px;
  background:#f5f8fc;
  border-radius:12px;
}

.object-list span{
  opacity:0.4;
  font-size:20px;
}

.object-list .found{
  opacity:1;
  color:#27ae60;
  text-decoration:line-through;
}

.scene-viewport{
  width:100%;
  height:400px;
  overflow:auto;
  border-radius:12px;
  border:1px solid #ccc;
  background:#eef3f9;
}

.scene{
  display:grid;
  grid-template-columns:repeat(25, 60px);
  grid-template-rows:repeat(18, 60px);
  gap:6px;
  padding:12px;
}

.cell{
  width:60px;
  height:60px;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:26px;
  border-radius:8px;
  cursor:pointer;
  transition:0.2s;
  user-select:none;
}

.cell:hover{
  background:#dde7f2;
}

.cell.found{
  background:#c8f7dc;
}

.cell.wrong{
  background:#ffd6d6;
}

.result{
  margin-top:15px;
  text-align:center;
  font-weight:600;
  font-size:16px;
}
</style>

<div class="game-wrapper">
  <div class="game-card">

    <div class="header">
      <div class="level-title">🔎 Level 25 – Advanced Hidden Objects</div>

      <div class="stats">
        <div class="stat-box">⏳ <span id="time">60</span>s</div>
        <div class="stat-box">❤️ <span id="lives">3</span></div>
        <div class="stat-box">⭐ <span id="score">0</span></div>
      </div>
    </div>

    <div class="object-list" id="list"></div>

    <div class="scene-viewport">
      <div class="scene" id="scene"></div>
    </div>

    <div class="result" id="result"></div>

  </div>
</div>
`;

const scene = container.querySelector("#scene");
const list = container.querySelector("#list");
const result = container.querySelector("#result");

const timeDisplay = container.querySelector("#time");
const livesDisplay = container.querySelector("#lives");
const scoreDisplay = container.querySelector("#score");

const rows = 18;
const cols = 25;
const total = rows * cols;

const targets = ["★","☂","♞","☯","✈","☀","⚓","♛","☕","🎵"];
const distractors = ["✦","✧","✩","☆","✪","✫","✬","✭","✮"];

let lives = 3;
let score = 0;
let time = 60;
let foundCount = 0;

/* OBJECT LIST */
targets.forEach(t=>{
  const span = document.createElement("span");
  span.textContent = t;
  span.dataset.item = t;
  list.appendChild(span);
});

/* GRID */
for(let i=0;i<total;i++){
  const cell = document.createElement("div");
  cell.className="cell";
  cell.textContent = distractors[Math.floor(Math.random()*distractors.length)];
  scene.appendChild(cell);
}

/* PLACE TARGETS */
targets.forEach(target=>{
  let placed=false;
  while(!placed){
    let index=Math.floor(Math.random()*total);
    if(!scene.children[index].dataset.target){
      scene.children[index].textContent=target;
      scene.children[index].dataset.target="true";
      placed=true;
    }
  }
});

/* CLICK LOGIC */
scene.querySelectorAll(".cell").forEach(cell=>{
  cell.addEventListener("click",()=>{
    if(cell.dataset.target==="true" && !cell.classList.contains("found")){
      cell.classList.add("found");

      const item=list.querySelector(`[data-item="${cell.textContent}"]`);
      if(item) item.classList.add("found");

      score+=10;
      foundCount++;
      scoreDisplay.textContent=score;

      if(foundCount===targets.length){
        clearInterval(timer);
        result.textContent="🎉 Level Completed!";
        if(onComplete) onComplete();
      }

    }else if(!cell.classList.contains("found")){
      cell.classList.add("wrong");
      setTimeout(()=>cell.classList.remove("wrong"),300);

      lives--;
      livesDisplay.textContent=lives;

      if(lives===0){
        clearInterval(timer);
        setTimeout(initGame,1000); // Restart
      }
    }
  });
});

/* TIMER */
const timer=setInterval(()=>{
  time--;
  timeDisplay.textContent=time;

  if(time===0){
    clearInterval(timer);
    setTimeout(initGame,1000); // Restart automatically
  }

},1000);

}

initGame();
}