function startLevel37(container, onComplete){
  container.innerHTML = `
  <style>
    .potion-lab{
      width: 600px;
      margin: 30px auto;
      text-align: center;
      font-family:'Segoe UI',sans-serif;
    }
    .ingredients{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }
    .ingredient-btn{
      width: 80px;
      height: 80px;
      font-size: 30px;
      cursor: pointer;
      border-radius: 10px;
      border: 2px solid #fff;
      background: #ffb3cc;
      color: #fff;
      transition: 0.2s;
    }
    .ingredient-btn:hover{
      transform: scale(1.1);
    }
    .current-sequence{
      margin-top: 15px;
      font-size: 24px;
      min-height: 30px;
      color:#ff4d88;
      font-weight:bold;
    }
    .message{
      margin-top: 10px;
      min-height: 20px;
      font-weight:bold;
    }
  </style>

  <div class="potion-lab">
    <h3>Level 37 – Potion Mixing Lab</h3>
    <div class="ingredients" id="ingredientsContainer"></div>
    <div class="current-sequence" id="currentSequence"></div>
    <div class="message" id="message"></div>
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