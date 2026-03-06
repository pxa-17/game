function startLevel13(container, onComplete){

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 13 – Quick Math 🔢</h2>
      <p class="level-subtitle">Tap the smallest number!</p>
      <div class="level-game-area">
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; min-height:300px;">
          <h3 style="color:#ff4da6; margin-bottom:15px;">Tap the smallest number!</h3>
          <div style="margin-bottom:20px; font-size:18px;">Lives: <span id="lives" style="color:#ff4da6;">❤️❤️❤️</span></div>
          <div id="numbers" style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center; max-width:280px;"></div>
        </div>
      </div>
    </div>
  `;

  const numbersDiv = container.querySelector("#numbers");
  const livesEl = container.querySelector("#lives");

  let lives = 3;

  function updateLives(){
    livesEl.textContent = "❤️".repeat(lives);
  }

  function loseLife(){
    lives--;
    updateLives();
    if(lives<=0){
      alert("Game Over 😈 You reacted too fast.");
      startLevel13(container,onComplete);
    }
  }

  let nums = [];
  while(nums.length < 6){
    let n = Math.floor(Math.random()*9)+1;
    if(!nums.includes(n)) nums.push(n);
  }

  const originalNums = [...nums];
  const smallest = Math.min(...originalNums);

  function render(arr){
    numbersDiv.innerHTML="";
    arr.forEach(n=>{
      const div=document.createElement("div");
      div.style.cssText = "background:linear-gradient(135deg, #1a1a2e, #16213e); color:white; padding:15px 20px; border-radius:12px; cursor:pointer; font-size:22px; font-weight:bold; transition:all 0.2s ease; box-shadow:0 4px 15px rgba(0,0,0,0.2);";
      div.textContent=n;
      div.onmouseover = () => div.style.transform = "scale(1.1)";
      div.onmouseout = () => div.style.transform = "scale(1)";

      div.onclick=()=>{
        if(n === smallest){
          onComplete();
        }else{
          loseLife();
        }
      };

      numbersDiv.appendChild(div);
    });
  }

  render(nums);

  setTimeout(()=>{
    nums = nums.sort(()=>Math.random()-0.5);
    render(nums);
  },2000);

  setTimeout(()=>{
    nums = nums.map(()=>Math.floor(Math.random()*9)+1);
    render(nums);
  },4000);

  updateLives();
}
