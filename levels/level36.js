function startLevel36(container, onComplete){
  container.innerHTML = `
  <style>
    .matching-game{
      width: 600px;
      margin: 30px auto;
      text-align: center;
      font-family:'Segoe UI',sans-serif;
    }
    .cards{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }
    .card{
      width: 120px;
      height: 60px;
      background: #ffb3cc;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      transition: 0.3s;
      user-select: none;
    }
    .card.flipped{
      background: #ff4d88;
    }
    .message{
      margin-top: 15px;
      font-weight: bold;
      min-height: 20px;
    }
    .matches-remaining{
      font-weight: bold;
      margin-top: 10px;
      color: #ff4d88;
    }
  </style>

  <div class="matching-game">
    <h3>Level 36 – Word Matching Game</h3>
    <div class="matches-remaining" id="matchesRemaining"></div>
    <div class="cards" id="cardsContainer"></div>
    <div class="message" id="message"></div>
  </div>
  `;

  const wordPairs = [
    ["Crush","Admire"],
    ["Flirt","Tease"],
    ["Romance","Passion"],
    ["Heart","Blush"],
    ["Affection","Embrace"],
    ["Whisper","Secret"],
    ["Giggle","Laugh"],
    ["Love","Flame"],
    ["Intimate","Tenderness"],
    ["Date","Adventure"]
  ];

  const cardsContainer = container.querySelector("#cardsContainer");
  const messageEl = container.querySelector("#message");
  const matchesRemainingEl = container.querySelector("#matchesRemaining");

  let flipped = [];
  let matched = [];

  function setupCards(){
    cardsContainer.innerHTML = "";
    let cards = [];
    wordPairs.forEach(pair=>{
      cards.push({word:pair[0], pairId:pair[0]});
      cards.push({word:pair[1], pairId:pair[0]});
    });
    // Shuffle
    cards.sort(()=>Math.random()-0.5);
    matched = [];
    flipped = [];
    matchesRemainingEl.textContent = `Matches remaining: ${wordPairs.length}`;

    cards.forEach((c,i)=>{
      const div = document.createElement("div");
      div.className="card";
      div.textContent = c.word;
      div.onclick = ()=>{
        if(flipped.length>=2 || div.classList.contains("flipped") || matched.includes(i)) return;
        div.classList.add("flipped");
        flipped.push({index:i, card:c, element:div});

        if(flipped.length===2){
          if(flipped[0].card.pairId === flipped[1].card.pairId){
            messageEl.style.color="green";
            messageEl.textContent="✅ Correct!";
            matched.push(flipped[0].index, flipped[1].index);
            flipped=[];
            matchesRemainingEl.textContent = `Matches remaining: ${wordPairs.length - matched.length/2}`;
            if(matched.length===cards.length){
              setTimeout(()=>{
                alert("🎉 Level Completed!");
                if(onComplete) onComplete();
              },200);
            }
          } else {
            messageEl.style.color="red";
            messageEl.textContent="❌ Wrong! Shuffling...";
            // Reset all after short delay
            setTimeout(()=>{
              setupCards(); // re-shuffle everything
              messageEl.textContent="";
            },1000);
          }
        }
      };
      cardsContainer.appendChild(div);
    });
  }

  setupCards();
}