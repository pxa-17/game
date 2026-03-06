function startLevel15(container, onComplete){

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 15 – Love Breaker 💖</h2>
      <p class="level-subtitle">Break all the hearts!</p>
      <div class="level-game-area">
        <canvas id="game" width="300" height="380" style="width:100%; max-width:300px; display:block; margin:0 auto; border-radius:12px;"></canvas>
      </div>
    </div>
  `;

  const canvas = container.querySelector("#game");
  const ctx = canvas.getContext("2d");

  const paddle = {
    width:80,
    height:14,
    x:110,
    y:360
  };

  const ball = {
    x:150,
    y:180,
    radius:6,
    dx:3,
    dy:-3
  };

  const rows = 4;
  const cols = 5;
  const brickWidth = 50;
  const brickHeight = 18;
  const brickPadding = 8;
  const brickOffsetTop = 35;
  const brickOffsetLeft = 15;

  let bricks = [];
  let running = true;

  function createBricks(){
    bricks = [];
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        bricks.push({
          x: brickOffsetLeft + c*(brickWidth+brickPadding),
          y: brickOffsetTop + r*(brickHeight+brickPadding),
          status:1
        });
      }
    }
  }

  function drawHeart(x,y,width,height){
    ctx.fillStyle="#ff6fa5";
    ctx.beginPath();
    ctx.moveTo(x + width/2, y + height);
    ctx.bezierCurveTo(x + width, y + height/2, x + width, y, x + width/2, y + height/3);
    ctx.bezierCurveTo(x, y, x, y + height/2, x + width/2, y + height);
    ctx.fill();
  }

  function drawBricks(){
    bricks.forEach(brick=>{
      if(brick.status){
        drawHeart(brick.x,brick.y,brickWidth,brickHeight);
      }
    });
  }

  function drawPaddle(){
    ctx.fillStyle="#ff4f8b";
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);
  }

  function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="#ff99c8";
    ctx.fill();
    ctx.closePath();
  }

  function collisionDetection(){
    bricks.forEach(brick=>{
      if(brick.status){
        if(ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight){
          ball.dy *= -1;
          brick.status = 0;
        }
      }
    });
    if(bricks.every(b=>b.status===0)){
      running = false;
      setTimeout(()=>onComplete(),600);
    }
  }

  function update(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
      ball.dx *= -1;
    }
    if(ball.y - ball.radius < 0){
      ball.dy *= -1;
    }
    if(ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width){
      ball.dy *= -1;
    }
    if(ball.y + ball.radius > canvas.height){
      restart();
    }
    collisionDetection();
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<8;i++){
      ctx.fillStyle="rgba(255,182,193,0.3)";
      ctx.beginPath();
      ctx.arc(Math.random()*300,Math.random()*380,2,0,Math.PI*2);
      ctx.fill();
    }
    drawBricks();
    drawPaddle();
    drawBall();
  }

  function gameLoop(){
    if(!running) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  function restart(){
    createBricks();
    ball.x = 150;
    ball.y = 180;
    ball.dx = 3;
    ball.dy = -3;
  }

  canvas.addEventListener("mousemove",(e)=>{
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.width/2;
    if(paddle.x<0) paddle.x=0;
    if(paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
  });

  createBricks();
  gameLoop();
}
