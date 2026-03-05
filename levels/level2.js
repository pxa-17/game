function startLevel2(container, onComplete) {

    container.innerHTML = `
      <div class="memoryGame">
        <h3>Match All the Symbols 💖</h3>
        <div class="memoryGrid"></div>
      </div>
    `;
  
    const grid = container.querySelector(".memoryGrid");
  
    // 6 matching pairs
    const symbols = ["💖", "⭐", "🎁", "🌸", "🎵", "🍫"];
  
    // Duplicate for pairs
    let cardsData = [...symbols, ...symbols];
  
    // Proper Fisher-Yates shuffle
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