function startLevel46(container, onComplete) {

  const size = 4;
  let tiles = [];

  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 46 – Final Challenge</h2>
    <p class="level-subtitle">Solve the 15-puzzle to complete the game</p>
    <div class="level-game-area">
    <style>

    .puzzleGrid{
      width:320px;
      height:320px;
      margin:30px auto;
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:5px;
    }

    .tile{
      background:#000;
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
      font-weight:bold;
      cursor:pointer;
      border-radius:6px;
    }

    .empty{
      background:#333;
      cursor:default;
    }

    .info{
      text-align:center;
      margin-top:10px;
      font-weight:bold;
    }

    </style>

    <div style="text-align:center;font-size:22px;font-weight:bold">
    Level 46
    </div>

    <div class="puzzleGrid" id="grid"></div>

    <div class="info" id="info">Arrange numbers from 1 to 15</div>
    </div>
  </div>
  `;

  const grid = container.querySelector("#grid");
  const info = container.querySelector("#info");

  // create shuffled tiles
  let numbers = [...Array(15).keys()].map(n => n + 1);
  numbers.push("");

  numbers.sort(() => Math.random() - 0.5);

  function render() {

    grid.innerHTML = "";

    numbers.forEach((num, i) => {

      const tile = document.createElement("div");

      tile.className = num === "" ? "tile empty" : "tile";
      tile.textContent = num;

      tile.onclick = () => moveTile(i);

      grid.appendChild(tile);

    });

  }

  function moveTile(index) {

    const emptyIndex = numbers.indexOf("");

    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 4,
      emptyIndex + 4
    ];

    if (validMoves.includes(index)) {

      [numbers[index], numbers[emptyIndex]] =
      [numbers[emptyIndex], numbers[index]];

      render();
      checkWin();

    }

  }

  function checkWin() {

    for (let i = 0; i < 15; i++) {
      if (numbers[i] !== i + 1) return;
    }

    info.textContent = "🎉 Level Complete!";

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);

  }

  render();

}