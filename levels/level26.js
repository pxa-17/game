function startLevel26(container, onComplete){

  const GRID_SIZE = 5;
  const TILE_SIZE = 120;
  const GAP = 4;
  const IMAGE_PATH = "images/img26.PNG";

  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 26 – Puzzle Challenge</h2>
    <p class="level-subtitle">Rotate tiles to reveal the image</p>
    <div class="level-game-area">
  <style>
    .card{
      display:inline-block;
      background:#f9f9f9;
      padding:${GAP}px;
      border-radius:15px;
      box-shadow:0 8px 30px rgba(0,0,0,0.15);
      text-align:center;
      position:relative;
    }
    .grid{
      display:grid;
      grid-template-columns: repeat(${GRID_SIZE}, ${TILE_SIZE}px);
      grid-template-rows: repeat(${GRID_SIZE}, ${TILE_SIZE}px);
      gap: ${GAP}px;
      margin-top:10px;
    }
    .tile{
      width:${TILE_SIZE}px;
      height:${TILE_SIZE}px;
      background-image: url(${IMAGE_PATH});
      background-size: ${GRID_SIZE*100}% ${GRID_SIZE*100}%;
      cursor:pointer;
      border-radius:8px;
      transition: transform 0.3s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position:relative;
      z-index:1;
    }
    .tile:hover{
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    }
    .full-image{
      position:absolute;
      top:0;
      left:0;
      width:${GRID_SIZE*TILE_SIZE + GAP*(GRID_SIZE-1)}px;
      height:${GRID_SIZE*TILE_SIZE + GAP*(GRID_SIZE-1)}px;
      border-radius:15px;
      display:none;
      z-index:2;
      transition: opacity 0.6s;
    }
  </style>

  <div class="card">
    <h3>🧩 Level 26 – Rotate to Reveal</h3>
    <p>Click tiles to rotate them and restore the image!</p>
    <div class="grid" id="grid"></div>
    <img src="${IMAGE_PATH}" class="full-image" id="fullImage" />
  </div>
    </div>
  </div>
  `;

  const grid = container.querySelector("#grid");
  const fullImage = container.querySelector("#fullImage");
  let tiles = [];

  for(let row=0; row<GRID_SIZE; row++){
    for(let col=0; col<GRID_SIZE; col++){
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.backgroundPosition = `${(col/(GRID_SIZE-1))*100}% ${(row/(GRID_SIZE-1))*100}%`;

      const rot = [0,90,180,270][Math.floor(Math.random()*4)];
      tile.dataset.rotation = rot;
      tile.dataset.correct = 0;
      tile.style.transform = `rotate(${rot}deg)`;

      tile.addEventListener("click", ()=>{
        tile.dataset.rotation = (+tile.dataset.rotation + 90) % 360;
        tile.style.transform = `rotate(${tile.dataset.rotation}deg)`;
        checkWin();
      });

      tiles.push(tile);
      grid.appendChild(tile);
    }
  }

  function checkWin(){
    if(tiles.every(t => +t.dataset.rotation === +t.dataset.correct)){
      // Reveal full image over the grid
      fullImage.style.display = "block";
      fullImage.style.opacity = "0";
      setTimeout(()=> fullImage.style.opacity = "1", 10);

      // Mark level complete
      if(onComplete) onComplete();
    }
  }
}