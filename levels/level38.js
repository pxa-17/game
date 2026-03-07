function startLevel38(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 38 – Tile Match</h2>
    <p class="level-subtitle">Match items to their shadows</p>
    <div class="level-game-area">
    <style>
    .shadow-game{
      max-width:650px;
      width:100%;
      margin:30px auto;
      font-family:'Segoe UI',sans-serif;
      text-align:center;
      background:#ffffff;
      padding:25px;
      border-radius:16px;
      box-shadow:0 10px 25px rgba(0,0,0,0.08);
      box-sizing:border-box;
    }

    .shadows-container{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:20px;
      margin-top:20px;
      flex-wrap:wrap;
    }

    .shadow{
      width:85px;
      height:85px;
      background:#f3f3f3;
      border-radius:12px;
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:48px;
      opacity:0.35;
      border:2px dashed #ddd;
      transition:0.2s;
    }

    .items-container{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:20px;
      margin-top:25px;
      flex-wrap:wrap;
    }

    .item{
      width:85px;
      height:85px;
      border-radius:12px;
      font-size:48px;
      display:flex;
      justify-content:center;
      align-items:center;
      background:linear-gradient(145deg,#ff7aa5,#ff4d88);
      color:white;
      cursor:pointer;
      user-select:none;
      position:relative;
      transition:all 0.2s ease;
      box-shadow:0 5px 12px rgba(0,0,0,0.15);
    }

    .item:hover{
      transform:scale(1.1);
      box-shadow:0 8px 18px rgba(0,0,0,0.2);
    }

    .message{
      margin-top:18px;
      font-weight:bold;
      min-height:22px;
      font-size:16px;
    }
    </style>

    <div class="shadow-game">
      <h3>Level 38 – Shadow Puzzle</h3>
      <div class="shadows-container" id="shadowsContainer"></div>
      <div class="items-container" id="itemsContainer"></div>
      <div class="message" id="message"></div>
    </div>
    </div>
  </div>
  `;

  const shadowsContainer = container.querySelector("#shadowsContainer");
  const itemsContainer = container.querySelector("#itemsContainer");
  const messageEl = container.querySelector("#message");

  // Define objects and emojis
  const objects = [
    {emoji:"🍎", name:"apple"},
    {emoji:"🍌", name:"banana"},
    {emoji:"🥕", name:"carrot"},
    {emoji:"⚽", name:"soccer"},
    {emoji:"🏀", name:"basketball"},
    {emoji:"🌽", name:"corn"}
  ];

  let matchedCount = 0;

  function shuffle(array){ return array.sort(()=>Math.random()-0.5); }

  function setupGame(){
    shadowsContainer.innerHTML="";
    itemsContainer.innerHTML="";
    messageEl.textContent="";
    matchedCount = 0;

    const shuffledObjects = shuffle([...objects]);

    // Create shadows
    shuffledObjects.forEach(obj=>{
      const shadow = document.createElement("div");
      shadow.className="shadow";
      shadow.dataset.name=obj.name;
      shadow.textContent=obj.emoji; // optional: or keep blank
      shadowsContainer.appendChild(shadow);
    });

    // Create draggable items
    const shuffledItems = shuffle([...objects]);
    shuffledItems.forEach(obj=>{
      const item = document.createElement("div");
      item.className="item";
      item.textContent=obj.emoji;
      item.dataset.name=obj.name;
      itemsContainer.appendChild(item);

      // Drag & drop
      item.onmousedown = (e)=>{
        e.preventDefault(); // Prevent text selection

        const shiftX = e.clientX - item.getBoundingClientRect().left;
        const shiftY = e.clientY - item.getBoundingClientRect().top;

        item.style.position = "absolute";
        item.style.zIndex = 1000;
        document.body.appendChild(item);

        function moveAt(pageX,pageY){
          item.style.left = pageX - shiftX + 'px';
          item.style.top = pageY - shiftY + 'px';
        }

        moveAt(e.pageX, e.pageY);

        function onMouseMove(e){
          moveAt(e.pageX,e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = ()=>{
          document.removeEventListener('mousemove', onMouseMove);
          item.onmouseup = null;

          // Check collision with shadows
          const itemRect = item.getBoundingClientRect();
          let correct=false;
          shadowsContainer.querySelectorAll(".shadow").forEach(shadow=>{
            const shadowRect = shadow.getBoundingClientRect();
            const centerX = itemRect.left + itemRect.width/2;
            const centerY = itemRect.top + itemRect.height/2;
            if(centerX > shadowRect.left && centerX < shadowRect.right &&
               centerY > shadowRect.top && centerY < shadowRect.bottom){
                 if(shadow.dataset.name === item.dataset.name){
                   correct=true;
                   shadow.style.opacity=1;
                   item.remove();
                   matchedCount++;
                 }
            }
          });

          if(correct){
            messageEl.style.color="green";
            messageEl.textContent="✅ Correct!";
          }else{
            messageEl.style.color="red";
            messageEl.textContent="❌ Wrong! Try again.";
            item.style.position="relative";
            item.style.top="0px";
            item.style.left="0px";
            item.style.zIndex=1;
            itemsContainer.appendChild(item);
          }

          if(matchedCount === objects.length){
            setTimeout(()=>{
              alert("🎉 Level Completed!");
              if(onComplete) onComplete();
            },300);
          }
        }
      }

      item.ondragstart = ()=>false;
    });
  }

  setupGame();
}