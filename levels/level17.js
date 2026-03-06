function startLevel17(container, onComplete){

  if(container._fruitInterval) clearInterval(container._fruitInterval);
  if(container._fruitAnimation) cancelAnimationFrame(container._fruitAnimation);

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 17 – Slice Frenzy 🍉</h2>
      <p class="level-subtitle">Slice the fruits, avoid the bombs!</p>
      <div class="level-game-area">
        <canvas id="game" width="300" height="350" style="width:100%; max-width:300px; display:block; margin:0 auto; border-radius:12px; background:linear-gradient(to bottom,#1d1d2e,#2b2b45);"></canvas>
      </div>
      <div class="level-stats">
        <span>Score: <strong id="score">0</strong> / 10</span>
      </div>
    </div>
  `;

  const canvas = container.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const scoreEl = container.querySelector("#score");

  let fruits = [], score = 0, lives = 3, mouse = {x:0,y:0}, slicing = false;
  let animationId;

  function initGame(){
    fruits = [];
    score = 0;
    lives = 3;
    mouse = {x:0,y:0};
    slicing = false;
    scoreEl.textContent = "0";
  }

  class Fruit{
    constructor(){
      this.x = Math.random() * 260 + 20;
      this.y = 370;
      this.radius = 18 + Math.random() * 8;
      this.speedY = -(7 + Math.random() * 3);
      this.gravity = 0.16;
      this.type = Math.random() < 0.2 ? "bomb" : "fruit";
      this.color = this.type === "bomb" ? "#ff4444" : ["#ffadad","#caffbf","#a0c4ff","#d0bfff","#fff3b0"][Math.floor(Math.random()*5)];
    }
    update(){
      this.speedY += this.gravity;
      this.y += this.speedY;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
      if(this.type==="bomb"){
        ctx.strokeStyle="white";
        ctx.lineWidth=2;
        ctx.stroke();
      }
    }
  }

  function spawnFruit(){
    fruits.push(new Fruit());
  }

  function distance(x1,y1,x2,y2){
    return Math.hypot(x1-x2,y1-y2);
  }

  function gameOver(message){
    cancelAnimationFrame(animationId);
    clearInterval(container._fruitInterval);
    alert(message);
    startLevel17(container, onComplete);
  }

  function update(){
    ctx.clearRect(0,0,300,350);
    fruits.forEach((fruit,index)=>{
      fruit.update();
      fruit.draw();
      if(slicing && distance(mouse.x,mouse.y,fruit.x,fruit.y)<fruit.radius){
        if(fruit.type==="bomb"){
          gameOver("💥 You hit a bomb!");
        } else {
          score++;
          scoreEl.textContent = score;
          scoreEl.classList.add("score-animate");
          setTimeout(() => scoreEl.classList.remove("score-animate"), 300);
        }
        fruits.splice(index,1);
      }
      if(fruit.y > 380){
        if(fruit.type==="fruit"){
          lives--;
          if(lives <= 0) gameOver("💀 You lost all lives!");
        }
        fruits.splice(index,1);
      }
    });
    if(score >= 10){
      setTimeout(()=>onComplete(),800);
      return;
    }
    animationId = requestAnimationFrame(update);
    container._fruitAnimation = animationId;
  }

  canvas.addEventListener("mousedown",()=> slicing=true);
  canvas.addEventListener("mouseup",()=> slicing=false);
  canvas.addEventListener("mousemove",(e)=>{
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  container._fruitInterval = setInterval(spawnFruit, 1300);
  initGame();
  update();
}
