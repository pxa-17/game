function startLevel34(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 34 – Light Refraction</h2>
    <p class="level-subtitle">Use filters to change the light beam color</p>
    <div class="level-game-area">
    <style>
    .light-puzzle{
      width: 700px;
      margin: 30px auto;
      background: #1a1a1a;
      padding: 20px;
      border-radius: 15px;
      font-family:'Segoe UI',sans-serif;
      color:#fff;
      text-align:center;
    }
    .instructions{
      font-size:16px;
      color:#ff7aa5;
      font-weight:bold;
      margin-bottom:15px;
    }
    canvas{
      display:block;
      margin:0 auto;
      background:#111;
      border:2px solid #ff7aa5;
      border-radius:10px;
    }
    .filters{
      margin-top:15px;
      display:flex;
      justify-content:center;
      gap:10px;
    }
    .filter-btn{
      width:50px;
      height:50px;
      border:none;
      border-radius:8px;
      cursor:pointer;
      font-weight:bold;
      color:#fff;
      font-size:14px;
    }
    </style>

    <div class="light-puzzle">
      <h3>Level 34 – Light Beam Color Puzzle</h3>
      <div class="instructions">Click filters to place them in the beam path to match the target color!</div>
      <canvas id="beamCanvas" width="700" height="200"></canvas>
      <div class="filters" id="filters"></div>
    </div>
    </div>
  </div>
  `;

  const canvas = container.querySelector("#beamCanvas");
  const ctx = canvas.getContext("2d");
  const filtersContainer = container.querySelector("#filters");

  const beam = {x:50, y:100, color:"white", path:[]};
  const target = {x:650, y:100, color:"purple", r:20};
  const filterOptions = [
    {color:"red", name:"R"},
    {color:"blue", name:"B"},
    {color:"yellow", name:"Y"},
    {color:"green", name:"G"}
  ];

  const placedFilters = [];

  // Create filter buttons
  filterOptions.forEach(f=>{
    const btn = document.createElement("button");
    btn.className="filter-btn";
    btn.style.backgroundColor=f.color;
    btn.textContent=f.name;
    btn.onclick = ()=>{
      // Place filter in path
      if(placedFilters.length<5){ // max 5 filters
        placedFilters.push(f.color);
        draw();
      }
    }
    filtersContainer.appendChild(btn);
  });

  function applyFilters(){
    let color = "white";
    placedFilters.forEach(f=>{
      // Simplified color mixing logic
      if(color==="white") color = f;
      else if(color===f) color = f;
      else{
        // Combine different colors to produce new colors
        if((color==="red" && f==="blue")||(color==="blue" && f==="red")) color="purple";
        else if((color==="red" && f==="yellow")||(color==="yellow" && f==="red")) color="orange";
        else if((color==="blue" && f==="yellow")||(color==="yellow" && f==="blue")) color="green";
        else color=f; // fallback
      }
    });
    return color;
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw target
    ctx.fillStyle = target.color;
    ctx.beginPath();
    ctx.arc(target.x,target.y,target.r,0,Math.PI*2);
    ctx.fill();

    // Draw beam path
    ctx.strokeStyle = applyFilters();
    ctx.lineWidth=8;
    ctx.beginPath();
    ctx.moveTo(beam.x, beam.y);
    const step = (target.x - beam.x)/(placedFilters.length+1);
    for(let i=0;i<placedFilters.length;i++){
      ctx.lineTo(beam.x + step*(i+1), beam.y);
    }
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    // Check if correct
    if(applyFilters() === target.color){
      setTimeout(()=>{
        alert("🎉 Level Completed!");
        if(onComplete) onComplete();
      },200);
    }
  }

  draw();
}