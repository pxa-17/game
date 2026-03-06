function startLevel2(container, onComplete) {

    container.innerHTML = `
      <div class="level-card">
        <h2 class="level-title">Level 2 – Memory Match 💖</h2>
        <p class="level-subtitle">Find all matching pairs!</p>
        <div class="level-game-area">
          <div class="memoryGame">
            <div class="memoryGrid" id="memoryGrid"></div>
          </div>
        </div>
        <div class="level-stats">
          <span>Pairs: <strong id="pairs">0</strong> / 6</span>
        </div>
      </div>
    `;
  
    const grid = container.querySelector("#memoryGrid");
    const pairsDisplay = container.querySelector("#pairs");
  
    const symbols = ["💖", "⭐", "🎁", "🌸", "🎵", "🍫"];
  
    let cardsData = [...symbols, ...symbols];
  
    for (let i = cardsData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
    }
  
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;
  
    cardsData.forEach((symbol) => {
      const card = document.createElement("div");
      card.classList.add("memoryCard");
  
      const inner = document.createElement("div");
      inner.classList.add("cardInner");
  
      const front = document.createElement("div");
      front.classList.add("cardFront");
  
      const back = document.createElement("div");
      back.classList.add("cardBack");
      back.innerText = symbol;
  
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
  
      card.addEventListener("click", () => {
  
        if (
          card.classList.contains("flipped") ||
          lockBoard
        ) return;
  
        card.classList.add("flipped");
        flippedCards.push({ element: card, value: symbol });
  
        if (flippedCards.length === 2) {
  
          lockBoard = true;
  
          const [first, second] = flippedCards;
  
          if (first.value === second.value) {
  
            matchedPairs++;
            pairsDisplay.innerText = matchedPairs;
            pairsDisplay.classList.add("score-animate");
            setTimeout(() => pairsDisplay.classList.remove("score-animate"), 300);
            flippedCards = [];
            lockBoard = false;
  
            if (matchedPairs === symbols.length) {
              setTimeout(() => onComplete(), 700);
            }
  
          } else {
  
            setTimeout(() => {
              first.element.classList.remove("flipped");
              second.element.classList.remove("flipped");
              flippedCards = [];
              lockBoard = false;
            }, 900);
  
          }
        }
      });
  
      grid.appendChild(card);
    });
  }
