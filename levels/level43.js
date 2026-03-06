function startLevel43(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 43 – Sequence Memory</h2>
    <p class="level-subtitle">Remember and repeat the emoji sequence</p>
    <div class="level-game-area">
    <style>
    .emoji-memory-game{
      width: 400px;
      margin: 30px auto;
      font-family:'Segoe UI',sans-serif;
      background:#222;
      padding:15px;
      border-radius:15px;
      color:white;
      text-align:center;
    }
    .sequence-display{
      font-size:30px;
      margin: 15px 0;
      min-height:50px;
    }
    .emoji-pool{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      margin-top:10px;
    }
    .emoji-btn{
      font-size:28px;
      margin:5px;
      padding:10px;
      cursor:pointer;
      background:#444;
      border-radius:10px;
      transition:0.2s;
    }
    .emoji-btn:hover{
      background:#555;
    }
    .message{
      margin-top:15px;
      font-weight:bold;
      min-height:20px;
    }
    .counter{
      margin-top:5px;
      color:#a3ffb3;
      font-weight:bold;
    }
    </style>

    <div class="emoji-memory-game">
      <h3>Level 43 – Emoji Sequence Memory</h3>
      <div class="counter" id="counter">Correct Sequences: 0 / 5</div>
      <div class="sequence-display" id="sequenceDisplay"></div>
      <div class="emoji-pool" id="emojiPool"></div>
      <div class="message" id="message"></div>
    </div>
    </div>
  </div>
  `;

  const sequenceDisplay = container.querySelector("#sequenceDisplay");
  const emojiPool = container.querySelector("#emojiPool");
  const messageEl = container.querySelector("#message");
  const counterEl = container.querySelector("#counter");

  const emojis = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"];
  const sequenceLength = 5; // fixed length
  let sequence = [];
  let userSequence = [];
  let correctCount = 0;
  let isShowing = false;

  // generate random sequence
  function generateSequence(){
    sequence = [];
    for(let i=0;i<sequenceLength;i++){
      sequence.push(emojis[Math.floor(Math.random()*emojis.length)]);
    }
  }

  // show full sequence at once
  function showSequence(){
    userSequence = [];
    isShowing = true;
    sequenceDisplay.textContent = sequence.join(" ");
    messageEl.textContent = "Memorize the sequence!";
    setTimeout(()=>{
      sequenceDisplay.textContent = "❓";
      messageEl.textContent = "Reproduce the sequence!";
      isShowing = false;
    }, 3000); // show full sequence for 3 seconds
  }

  // create emoji buttons
  emojiPool.innerHTML = "";
  emojis.forEach(e=>{
    const btn = document.createElement("div");
    btn.className="emoji-btn";
    btn.textContent=e;
    btn.onclick = ()=>{
      if(isShowing) return; // cannot click during display
      userSequence.push(e);
      sequenceDisplay.textContent = userSequence.join(" ");
      const idx = userSequence.length-1;

      if(userSequence[idx] !== sequence[idx]){
        // wrong guess resets everything
        messageEl.textContent="❌ Wrong! Count reset!";
        correctCount = 0;
        counterEl.textContent = `Correct Sequences: ${correctCount} / 5`;
        generateSequence();
        setTimeout(showSequence,800);
        return;
      }

      if(userSequence.length === sequence.length){
        correctCount++;
        counterEl.textContent = `Correct Sequences: ${correctCount} / 5`;
        if(correctCount >= 5){
          messageEl.textContent="🎉 Level Complete!";
          setTimeout(()=>{ if(onComplete) onComplete(); },500);
        } else{
          messageEl.textContent="✅ Correct! Next sequence.";
          generateSequence();
          setTimeout(showSequence,800);
        }
      }
    };
    emojiPool.appendChild(btn);
  });

  // initialize first sequence
  generateSequence();
  showSequence();
}