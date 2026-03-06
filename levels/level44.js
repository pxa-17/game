function startLevel44(container, onComplete) {

  let roundsNeeded = 5;
  let currentRound = 0;

  const confusingSets = [
    ["🙂","🙃"],
    ["☺️","😊"],
    ["😂","🤣"],
    ["😳","😲"],
    ["😞","😔"],
    ["🙁","☹️"],
    ["😩","😫"],
    ["😦","😧"]
  ];

  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 44 – Color Switch</h2>
    <p class="level-subtitle">Find the odd emoji in each round</p>
    <div class="level-game-area">
    <style>
    .emoji-grid{
      display:grid;
      grid-template-columns: repeat(8, 50px);
      gap:10px;
      justify-content:center;
      margin-top:20px;
    }

    .emoji-cell{
      font-size:32px;
      cursor:pointer;
      text-align:center;
      user-select:none;
    }

    .message{
      text-align:center;
      margin-top:10px;
      font-weight:bold;
    }
    </style>

    <div style="text-align:center;font-size:22px;font-weight:bold">
      Level 44 – Spot the Odd Emoji
    </div>

    <div class="message" id="roundInfo"></div>
    <div class="emoji-grid" id="emojiGrid"></div>
    <div class="message" id="message"></div>
    </div>
  </div>
  `;

  const grid = container.querySelector("#emojiGrid");
  const message = container.querySelector("#message");
  const roundInfo = container.querySelector("#roundInfo");

  function startRound(){

    grid.innerHTML = "";
    message.textContent = "";
    roundInfo.textContent = `Round ${currentRound+1} / ${roundsNeeded}`;

    const pair = confusingSets[Math.floor(Math.random()*confusingSets.length)];

    const baseEmoji = pair[0];
    const differentEmoji = pair[1];

    const totalCells = 64;
    const differentIndex = Math.floor(Math.random()*totalCells);

    for(let i=0;i<totalCells;i++){

      const cell = document.createElement("div");
      cell.className = "emoji-cell";

      cell.textContent = i === differentIndex ? differentEmoji : baseEmoji;

      cell.onclick = () => {

        if(i === differentIndex){

          currentRound++;

          if(currentRound >= roundsNeeded){

            message.textContent = "🎉 Level Complete!";
            setTimeout(()=>{
              if(onComplete) onComplete();
            },600);

          }else{

            message.textContent = "✔ Correct! Next round...";
            setTimeout(startRound,700);

          }

        }else{

          message.textContent = "❌ Wrong! Restarting...";
          currentRound = 0;
          setTimeout(startRound,900);

        }

      };

      grid.appendChild(cell);
    }
  }

  startRound();
}