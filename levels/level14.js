function startLevel14(container, onComplete){

  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 14 – Word Guess 🔤</h2>
      <p class="level-subtitle">Guess the hidden word!</p>
      <div class="level-game-area">
        <div style="display:flex; flex-direction:column; align-items:center; padding:20px; min-height:300px;">
          <div id="lives" style="font-size:22px; margin-bottom:15px;"></div>
          <div id="word" style="font-size:36px; letter-spacing:12px; margin:20px 0; font-weight:bold; color:#ff4da6;"></div>
          <div id="letters" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:320px;"></div>
        </div>
      </div>
    </div>
  `;

  const words = ["FOREVER","DESTINY","JOURNEY","PROMISE","LOYALTY"];
  const secret = words[Math.floor(Math.random()*words.length)];

  const wordEl = container.querySelector("#word");
  const lettersDiv = container.querySelector("#letters");
  const livesEl = container.querySelector("#lives");

  let guessed = [];
  let wrong = 0;
  const maxWrong = 6;

  function renderWord(){
    wordEl.textContent = secret
      .split("")
      .map(letter => guessed.includes(letter) ? letter : "_")
      .join(" ");
  }

  function updateLives(){
    const livesLeft = maxWrong - wrong;
    livesEl.innerHTML = "❤️".repeat(livesLeft) + "🖤".repeat(wrong);
  }

  function checkWin(){
    const won = secret.split("").every(letter => guessed.includes(letter));
    if(won){
      setTimeout(()=>onComplete(),500);
    }
  }

  function loseGame(){
    alert("Game Over 😈 The word was " + secret);
    startLevel14(container,onComplete);
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  alphabet.forEach(letter=>{
    const div = document.createElement("div");
    div.style.cssText = "padding:10px 14px; background:linear-gradient(135deg, #ff4da6, #ff85c1); color:white; border-radius:8px; cursor:pointer; font-weight:bold; transition:all 0.2s ease;";
    div.textContent = letter;
    div.onmouseover = () => div.style.transform = "scale(1.1)";
    div.onmouseout = () => div.style.transform = "scale(1)";

    div.onclick = ()=>{
      div.style.background = "#ccc";
      div.style.cursor = "not-allowed";

      if(secret.includes(letter)){
        guessed.push(letter);
        renderWord();
        checkWin();
      } else {
        wrong++;
        updateLives();
        if(wrong >= maxWrong){
          loseGame();
        }
      }
    };

    lettersDiv.appendChild(div);
  });

  renderWord();
  updateLives();
}
