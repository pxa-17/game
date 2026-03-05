function startLevel14(container, onComplete){

  container.innerHTML = `
  <style>
    .wrapper{
      display:flex;
      flex-direction:column;
      align-items:center;
      font-family:sans-serif;
      text-align:center;
      padding:20px;
    }

    .word{
      font-size:32px;
      letter-spacing:10px;
      margin:20px 0;
    }

    .letters{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      max-width:420px;
      justify-content:center;
    }

    .letter{
      padding:8px 12px;
      background:#1f2442;
      color:white;
      border-radius:6px;
      cursor:pointer;
      font-size:14px;
      transition:0.2s;
    }

    .letter:hover{
      background:#2e3570;
    }

    .letter.disabled{
      background:#444;
      pointer-events:none;
    }

    .lives{
      font-size:28px;
      margin:20px 0;
      min-height:40px;
    }
  </style>

  <div class="wrapper">
    <h2>Guess the word</h2>
    <div class="lives" id="lives"></div>
    <div class="word" id="word"></div>
    <div class="letters" id="letters"></div>
  </div>
  `;

  const words = ["FOREVER","DESTINY","JOURNEY","PROMISE","LOYALTY"];
  const secret = words[Math.floor(Math.random()*words.length)];

  const wordEl = document.getElementById("word");
  const lettersDiv = document.getElementById("letters");
  const livesEl = document.getElementById("lives");

  let guessed = [];
  let wrong = 0;
  const maxWrong = 6; // ❤️ 6 Hearts

  function renderWord(){
    wordEl.textContent = secret
      .split("")
      .map(letter => guessed.includes(letter) ? letter : "_")
      .join(" ");
  }

  function updateLives(){
    const livesLeft = maxWrong - wrong;

    livesEl.innerHTML =
      "Lives: " +
      "❤️".repeat(livesLeft) +
      "🖤".repeat(wrong);
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
    div.className = "letter";
    div.textContent = letter;

    div.onclick = ()=>{
      div.classList.add("disabled");

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