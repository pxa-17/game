function startLevel29(container, onComplete) {
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 29 – Speed Typing</h2>
    <p class="level-subtitle">Type the words quickly</p>
    <div class="level-game-area">
  <style>
    .speed-typing-card{
      width: 600px;
      margin: 30px auto;
      padding: 25px;
      background: #fdf0f5;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      text-align: center;
      font-family:'Segoe UI',sans-serif;
    }
    .timer{
      font-size: 20px;
      color:#ff1a66;
      margin-bottom: 15px;
    }
    .input-word{
      width: 80%;
      font-size: 24px;
      padding: 10px;
      border-radius: 8px;
      border:1px solid #ffb3cc;
      outline:none;
      text-align:center;
    }
    .start-btn{
      padding: 10px 20px;
      margin: 15px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
    }
    .start-btn:hover{
      background:#ff1a66;
    }
    .message{
      margin-top: 15px;
      font-weight:bold;
      min-height:20px;
    }
    .scoreboard{
      margin-top:20px;
      font-size:18px;
      font-weight:bold;
      color:#333;
    }
  </style>

  <div class="speed-typing-card">
    <h3>⌨️ Level 29 – Speed Typing ⌨️</h3>
    <div class="timer" id="timer">Time: 0s</div>
    <input type="text" class="input-word" id="inputWord" disabled placeholder="" />
    <br>
    <button class="start-btn" id="startBtn">Start Game</button>
    <div class="message" id="message"></div>
    <div class="scoreboard" id="scoreboard"></div>
  </div>
    </div>
  </div>
  `;

const words = [
  "ENTHRALL",
  "FONDNESS",
  "ADULATION",
  "TENDER",
  "DEVOTION",
  "SWEETHEART",
  "AFFECTION",
  "ENCHANTED",
  "BELOVED",
  "INFATUATION",
  "ADORATION",
  "ROMANCE",
  "TREASURE",
  "CHARMING",
  "PASSIONATE",
  "LOYALTY",
  "ALLURE",
  "CAPTIVATE",
  "HEARTFELT",
  "HEARTSTRINGS"
];

  let wordSequence = [];
  let currentIndex = 0;
  let score = 0;
  let timerInterval;
  let startTime;
  let totalTime = 0;

  const inputEl = container.querySelector("#inputWord");
  const timerEl = container.querySelector("#timer");
  const startBtn = container.querySelector("#startBtn");
  const messageEl = container.querySelector("#message");
  const scoreboardEl = container.querySelector("#scoreboard");

  startBtn.onclick = startGame;

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startGame() {
    // Shuffle word sequence
    wordSequence = shuffleArray([...words]);
    currentIndex = 0;
    score = 0;
    totalTime = 0;
    messageEl.textContent = "";
    startBtn.disabled = true;

    // Enable input
    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.placeholder = wordSequence[currentIndex];
    inputEl.focus();

    updateScoreboard();
    startWordTimer();
  }

  function startWordTimer() {
    clearInterval(timerInterval);
    let word = wordSequence[currentIndex];
    let timeLeft = 5 + Math.floor(word.length / 2); // seconds per word
    timerEl.textContent = `Time: ${timeLeft}s`;
    startTime = Date.now();

    timerInterval = setInterval(() => {
      timerEl.textContent = `Time: ${timeLeft}s`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        messageEl.style.color = "red";
        messageEl.textContent = "⏰ Time's up! Restarting...";
        setTimeout(startGame, 1000);
      }
    }, 1000);
  }

  inputEl.onkeydown = function(e) {
    if(e.key === "Enter") {
      checkWord();
    }
  }

  function checkWord() {
    const typed = inputEl.value.trim();
    clearInterval(timerInterval);

    if (typed.toUpperCase() === wordSequence[currentIndex].toUpperCase()) {
      const timeTaken = (Date.now() - startTime) / 1000;
      totalTime += timeTaken;
      score++;
      messageEl.style.color = "green";
      messageEl.textContent = `✅ Correct! Time: ${timeTaken.toFixed(2)}s`;
      currentIndex++;

      if(currentIndex >= wordSequence.length){
        inputEl.disabled = true;
        messageEl.style.color = "blue";
        messageEl.textContent = `🎉 Level Completed! Total Time: ${totalTime.toFixed(2)}s`;
        startBtn.disabled = false;
        if(onComplete) onComplete();
        return;
      }

      // Next word
      inputEl.value = "";
      inputEl.placeholder = wordSequence[currentIndex];
      inputEl.focus();
      startWordTimer();
      updateScoreboard();
    } else {
      // Wrong -> restart
      messageEl.style.color = "red";
      messageEl.textContent = "❌ Wrong word! Restarting...";
      setTimeout(startGame, 1000);
    }
  }

  function updateScoreboard() {
    scoreboardEl.textContent = `Words Correct: ${score} / ${wordSequence.length}`;
  }
}