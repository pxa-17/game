function startLevel35(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 35 – Simon Says</h2>
    <p class="level-subtitle">Follow the pattern to complete the challenge</p>
    <div class="level-game-area">
    <style>
    .platformer-game{
      max-width: 800px;
      width: 100%;
      margin: 30px auto;
      background: #111;
      padding: 20px;
      border-radius: 15px;
      text-align:center;
      font-family:'Segoe UI',sans-serif;
      color:#fff;
      overflow: hidden;
      box-sizing: border-box;
    }
    #platformerCanvas{
      display:block;
      margin:0 auto;
      background:#222;
      border:2px solid #ff6f91;
      border-radius:10px;
      max-width:100%;
      height:auto;
    }
    canvas{
      display:block;
      margin: 0 auto;
      background: #222;
      border: 2px solid #ff6f91;
      border-radius: 10px;
    }
    </style>

    <div class="platformer-game">
      <h3>Level 35 – Ultimate Nightmare Platformer</h3>
      <canvas id="platformerCanvas" width="800" height="400"></canvas>
    </div>
    </div>
  </div>
  `;

  const canvas = container.querySelector("#platformerCanvas");
  const ctx = canvas.getContext("2d");

  const prince = {x:50, y:350, w:30, h:30, dy:0, jump:false, color:"👑"};
  const gravity = 0.7;
  const wind = 0.3;

  // Corrected platforms with reachable path
  const platforms = [
    {x:0, y:380, w:200, h:20, dx:0, type:'static', visible:true, timer:0},
    {x:220, y:320, w:120, h:20, dx:1.5, type:'moving', visible:true, timer:0},
    {x:360, y:260, w:120, h:20, dx:-1.5, type:'moving', visible:true, timer:0},
    {x:500, y:200, w:120, h:20, dx:1, type:'moving', visible:true, timer:0},
    {x:640, y:140, w:120, h:20, dx:0, type:'disappearing', visible:true, timer:0, cycle:60},
  ];

  const spikes = [
    {x:200, y:380, w:50, h:20},
    {x:450, y:260, w:50, h:20},
    {x:610, y:200, w:60, h:20},
    {x:350, y:150, w:50, h:20},
  ];

  const princess = {x:720, y:70, w:30, h:30, emoji:"👸"};
  const keys = {left:false, right:false, up:false};

  document.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft") keys.left=true;
    if(e.key==="ArrowRight") keys.right=true;
    if(e.key==="ArrowUp") keys.up=true;
  });

  document.addEventListener("keyup", e=>{
    if(e.key==="ArrowLeft") keys.left=false;
    if(e.key==="ArrowRight") keys.right=false;
    if(e.key==="ArrowUp") keys.up=false;
  });

  function resetPrince(){
    prince.x=50;
    prince.y=350;
    prince.dy=0;
    prince.jump=false;
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    platforms.forEach(p=>{
      if(p.visible){
        ctx.fillStyle=p.type==='disappearing' ? '#aaffc3' : '#ff7aa5';
        ctx.fillRect(p.x,p.y,p.w,p.h);
      }
    });

    spikes.forEach(s=>{
      ctx.fillStyle="red";
      ctx.fillRect(s.x,s.y,s.w,s.h);
    });

    ctx.font=prince.w+"px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(prince.color, prince.x+prince.w/2, prince.y+prince.h/2);

    ctx.font=princess.w+"px Arial";
    ctx.fillText(princess.emoji, princess.x+princess.w/2, princess.y+princess.h/2);
  }

  function update(){
    let movingHorizontally = false;
    if(keys.left){ prince.x -=3; movingHorizontally=true; }
    if(keys.right){ prince.x +=3; movingHorizontally=true; }

    prince.dy += gravity;
    prince.y += prince.dy;

    let onPlatform=false;

    platforms.forEach(p=>{
      if(p.type==='disappearing'){
        p.timer = (p.timer+1) % p.cycle;
        p.visible = p.timer < p.cycle/2;
      }

      if(p.visible && prince.x + prince.w > p.x && prince.x < p.x + p.w &&
         prince.y + prince.h > p.y && prince.y + prince.h < p.y + p.h + prince.dy){
           prince.y = p.y - prince.h;
           prince.dy = 0;
           onPlatform=true;
           prince.jump=false;

           if(!movingHorizontally){
             prince.x += p.dx;
           }
      }

      if(p.type==='moving'){
        p.x += p.dx;
        if(p.x<0 || p.x+p.w>canvas.width) p.dx*=-1;
      }
    });

    if(!onPlatform){
      prince.x += wind;
    }

    if(keys.up && !prince.jump && onPlatform){
      prince.dy=-12;
      prince.jump=true;
    }

    spikes.forEach(s=>{
      if(prince.x + prince.w > s.x && prince.x < s.x + s.w &&
         prince.y + prince.h > s.y && prince.y < s.y + s.h){
           resetPrince();
      }
    });

    if(prince.y > canvas.height){
      resetPrince();
    }

    if(prince.x + prince.w > princess.x && prince.x < princess.x + princess.w &&
       prince.y + prince.h > princess.y && prince.y < princess.y + princess.h){
         setTimeout(()=>{
           alert("🎉 Level Completed!");
           if(onComplete) onComplete();
         },100);
         return;
    }

    draw();
    requestAnimationFrame(update);
  }

  update();
}