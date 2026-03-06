function startLevel17(container, onComplete){

  // Clear previous intervals/animations if any
  if(container._fruitInterval) clearInterval(container._fruitInterval);
  if(container._fruitAnimation) cancelAnimationFrame(container._fruitAnimation);

  container.innerHTML = `
  <style>
    .ninja-wrap{
      display:flex;
      flex-direction:column;
      align-items:center;
      font-family:'Segoe UI',sans-serif;
      padding:20px;
    }
    canvas{
      background:linear-gradient(to bottom,#1d1d2e,#2b2b45);
      border-radius:20px;
    }
    h2{
      color:white; /* level title font white */
      margin-bottom:10px;
    }
  </style>

  <div class="ninja-wrap">
    <h2>🍉 Level 17 – Slice Frenzy 🍉</h2>
    <canvas id="game" width="500" height="500"></canvas>
  </div>
  `;

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let fruits, score, lives, mouse, slicing;
  let animationId;

  function initGame(){
    fruits = [];
    score = 0;
    lives = 3;
    mouse = {x:0,y:0};
    slicing = false;
  }

  class Fruit{
    constructor(){
      this.x = Math.random()*450 + 25;
      this.y = 520;
      this.radius = 20 + Math.random()*10;
      this.speedY = -(8 + Math.random()*3);
      this.gravity = 0.18;
      this.type = Math.random() < 0.2 ? "bomb" : "fruit";
      this.color = this.type === "bomb"
        ? "#ff4444" // bright red bomb
        : ["#ffadad","#caffbf","#a0c4ff","#d0bfff","#fff3b0"][Math.floor(Math.random()*5)];
    }

    update(){
      this.speedY += this.gravity;
      this.y += this.speedY;
    }

    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
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

  function drawScore(){
    ctx.fillStyle="white";
    ctx.font="18px Segoe UI";
    ctx.fillText("Score: "+score,20,30);
    ctx.fillText("Lives: "+lives,400,30);
  }

  function distance(x1,y1,x2,y2){
    return Math.hypot(x1-x2,y1-y2);
  }

  function gameOver(message){
    cancelAnimationFrame(animationId);
    clearInterval(container._fruitInterval);
    alert(message);
    if(confirm("Do you want to play again?")){
      startLevel17(container, onComplete);
    } else {
      if(onComplete) onComplete();
    }
  }

  function update(){
    ctx.clearRect(0,0,500,500);

    fruits.forEach((fruit,index)=>{
      fruit.update();
      fruit.draw();

      if(slicing && distance(mouse.x,mouse.y,fruit.x,fruit.y)<fruit.radius){
        if(fruit.type==="bomb"){
          gameOver("💥 You hit a bomb! Game Over!");
        } else {
          score++;
        }
        fruits.splice(index,1);
      }

      if(fruit.y > 550){
        if(fruit.type==="fruit"){
          lives--;
          if(lives <= 0){
            gameOver("💀 You lost all your lives! Game Over!");
          }
        }
        fruits.splice(index,1);
      }
    });

    drawScore();

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

    if(slicing){
      ctx.beginPath();
      ctx.arc(mouse.x,mouse.y,5,0,Math.PI*2);
      ctx.fillStyle="#ffffff";
      ctx.fill();
    }
  });

  container._fruitInterval = setInterval(spawnFruit, 1300);

  initGame();
  update();
}