function startLevel37(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 37 – Potion Brew</h2>
    <p class="level-subtitle">Mix ingredients in the correct order</p>
    <div class="level-game-area">
    <style>
    .potion-lab{
      max-width:600px;
      width:100%;
      margin:30px auto;
      text-align:center;
      font-family:'Segoe UI',sans-serif;
      background:#ffffff;
      padding:25px;
      border-radius:15px;
      box-shadow:0 8px 20px rgba(0,0,0,0.08);
      display:flex;
      flex-direction:column;
      align-items:center;
      box-sizing:border-box;
    }

    .ingredients{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      align-items:center;
      gap:15px;
      margin-top:20px;
      max-width:100%;
    }

    .ingredient-btn{
      width:80px;
      height:80px;
      font-size:32px;
      cursor:pointer;
      border-radius:12px;
      border:none;
      background:linear-gradient(145deg,#ff7aa5,#ff4d88);
      color:#fff;
      transition:all 0.2s ease;
      box-shadow:0 4px 10px rgba(0,0,0,0.15);
    }

    .ingredient-btn:hover{
      transform:scale(1.12);
      box-shadow:0 6px 14px rgba(0,0,0,0.2);
    }

    .current-sequence{
      margin-top:20px;
      font-size:26px;
      min-height:35px;
      color:#ff4d88;
      font-weight:bold;
      letter-spacing:5px;
    }

    .message{
      margin-top:12px;
      min-height:22px;
      font-weight:bold;
      font-size:16px;
      color:#333;
    }
    </style>

    <div class="potion-lab">
      <h3>Level 37 – Potion Mixing Lab</h3>
      <div class="ingredients" id="ingredientsContainer"></div>
      <div class="current-sequence" id="currentSequence"></div>
      <div class="message" id="message"></div>
    </div>
    </div>
  </div>
  `;

  const ingredientsContainer = container.querySelector("#ingredientsContainer");
  const currentSequenceEl = container.querySelector("#currentSequence");
  const messageEl = container.querySelector("#message");

  // Ingredient symbols
  const ingredients = ["🍄","🌿","💧","🔥","✨","🍋"];
  // Correct sequence to brew potion
  let correctSequence = ["🌿","💧","🔥","🍄","✨"];

  let playerSequence = [];

  // Shuffle ingredients to make it harder
  function shuffleArray(array){
    return array.sort(()=>Math.random()-0.5);
  }

  function setupIngredients(){
    ingredientsContainer.innerHTML="";
    shuffleArray(ingredients).forEach(ing=>{
      const btn = document.createElement("button");
      btn.className="ingredient-btn";
      btn.textContent=ing;
      btn.onclick=()=>{
        playerSequence.push(ing);
        currentSequenceEl.textContent = playerSequence.join(" ");
        checkSequence();
      }
      ingredientsContainer.appendChild(btn);
    });
    playerSequence = [];
    currentSequenceEl.textContent = "";
    messageEl.textContent = "";
  }

  function checkSequence(){
    const idx = playerSequence.length-1;
    if(playerSequence[idx] !== correctSequence[idx]){
      messageEl.style.color="red";
      messageEl.textContent="❌ Wrong! Resetting ingredients...";
      setTimeout(()=>{
        setupIngredients();
      },1000);
      return;
    }
    if(playerSequence.length === correctSequence.length){
      messageEl.style.color="green";
      messageEl.textContent="✅ Potion Brewed Successfully!";
      setTimeout(()=>{
        alert("🎉 Level Completed!");
        if(onComplete) onComplete();
      },500);
    }
  }

  setupIngredients();
}