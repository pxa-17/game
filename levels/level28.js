function startLevel28(container, onComplete){

  container.innerHTML = `
  <style>
    .word-builder-card{
      width: 500px;
      margin: 30px auto;
      padding: 20px;
      background: #fdf0f5;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      text-align: center;
      font-family:'Segoe UI',sans-serif;
    }
    .words-remaining{
      font-size: 18px;
      margin-bottom: 10px;
      color: #ff4d88;
      font-weight: bold;
    }
    .letters{
      display:flex;
      justify-content:center;
      gap:10px;
      margin-bottom:20px;
      flex-wrap:wrap;
    }
    .letter-btn{
      width:50px;
      height:50px;
      border:none;
      border-radius:10px;
      background:#ffb3cc;
      color:white;
      font-weight:bold;
      font-size:20px;
      cursor:pointer;
      transition:0.2s;
    }
    .letter-btn:hover{
      background:#ff4d88;
    }
    .current-word{
      font-size:20px;
      margin-bottom:10px;
      min-height:30px;
    }
    .submit-btn, .delete-btn{
      padding:10px 20px;
      margin-top:10px;
      margin-right:10px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
    }
    .submit-btn:hover, .delete-btn:hover{
      background:#ff1a66;
    }
    .found-words{
      margin-top:15px;
      display:flex;
      flex-wrap:wrap;
      gap:5px;
      justify-content:center;
    }
    .found-word{
      padding:5px 10px;
      background:#ffe6f0;
      border-radius:5px;
      font-weight:bold;
    }
    .message{
      margin-top:10px;
      min-height:20px;
      font-weight:bold;
      color:#333;
    }
  </style>

  <div class="word-builder-card">
    <h3>📝 Level 28 – Word Builder 📝</h3>
    <div class="words-remaining" id="wordsRemaining"></div>
    <div class="letters" id="letters"></div>
    <div class="current-word" id="currentWord"></div>
    <button class="submit-btn" id="submitWord">Submit Word</button>
    <button class="delete-btn" id="deleteLetter">Delete Last Letter</button>
    <div class="message" id="message"></div>
    <div class="found-words" id="foundWords"></div>
  </div>
  `;

  // Word pool
  const validWords = [
    "CRUSH","CHEMISTRY","PASSION","FLAME","WHISPER",
    "SNUGGLE","ADMIRE","DESIRE","FLIRTATION","TEASE",
    "GIGGLE","SECRET","ROMANTICIZE","HEARTBEAT","BLUSH",
    "INTIMATE","SENSUAL","TENDERNESS","KISS","EMBRACE",
  ];

  // Build a set of **unique letters**
  const lettersSet = new Set();
  validWords.forEach(word=>{
    word.split("").forEach(letter=>{
      lettersSet.add(letter.toUpperCase());
    });
  });
  const letters = Array.from(lettersSet);

  let currentWord = "";
  const foundWords = [];

  const lettersContainer = container.querySelector("#letters");
  const currentWordEl = container.querySelector("#currentWord");
  const submitBtn = container.querySelector("#submitWord");
  const deleteBtn = container.querySelector("#deleteLetter");
  const messageEl = container.querySelector("#message");
  const foundWordsEl = container.querySelector("#foundWords");
  const wordsRemainingEl = container.querySelector("#wordsRemaining");

  wordsRemainingEl.textContent = `Words remaining: ${validWords.length}`;

  // Create letter buttons
  letters.forEach(letter=>{
    const btn = document.createElement("button");
    btn.className="letter-btn";
    btn.textContent = letter;
    btn.onclick = ()=>{
      currentWord += letter;
      currentWordEl.textContent = currentWord;
    }
    lettersContainer.appendChild(btn);
  });

  // Delete last letter button
  deleteBtn.onclick = ()=>{
    currentWord = currentWord.slice(0, -1);
    currentWordEl.textContent = currentWord;
  }

  // Submit word
  submitBtn.onclick = submitWord;

  // Keyboard support
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Backspace"){
      currentWord = currentWord.slice(0, -1);
      currentWordEl.textContent = currentWord;
      e.preventDefault();
    }
    if(e.key === "Enter"){
      submitWord();
    }
  });

  function submitWord(){
    if(currentWord.length < 2){
      messageEl.textContent = "Word too short!";
      return;
    }
    if(validWords.includes(currentWord.toUpperCase())){
      if(!foundWords.includes(currentWord.toUpperCase())){
        foundWords.push(currentWord.toUpperCase());
        const wordEl = document.createElement("div");
        wordEl.className="found-word";
        wordEl.textContent = currentWord.toUpperCase();
        foundWordsEl.appendChild(wordEl);
        messageEl.style.color = "green";
        messageEl.textContent = "✅ Correct!";
        wordsRemainingEl.textContent = `Words remaining: ${validWords.length - foundWords.length}`;
      } else {
        messageEl.style.color="orange";
        messageEl.textContent = "Already found!";
      }
    } else {
      messageEl.style.color="red";
      messageEl.textContent = "❌ Invalid word!";
    }
    currentWord = "";
    currentWordEl.textContent = "";

    if(foundWords.length === validWords.length){
      setTimeout(()=>{
        alert("🎉 Level Completed!");
        if(onComplete) onComplete();
      }, 200);
    }
  }
}