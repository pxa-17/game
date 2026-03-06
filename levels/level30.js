function startLevel30(container, onComplete){
  container.innerHTML = `
  <div class="level-card">
    <h2 class="level-title">Level 30 – Escape Room</h2>
    <p class="level-subtitle">Find the code to escape</p>
    <div class="level-game-area">
  <style>
    .escape-room{
      width: 600px;
      margin: 30px auto;
      padding: 25px;
      background:#fdf0f5;
      border-radius: 15px;
      box-shadow:0 8px 30px rgba(0,0,0,0.15);
      font-family:'Segoe UI',sans-serif;
      text-align:center;
    }
    .room-instructions{
      font-size:18px;
      margin-bottom:15px;
      color:#ff1a66;
    }
    .objects{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      gap:15px;
      margin-bottom:20px;
    }
    .object-btn{
      width:100px;
      height:100px;
      border:none;
      border-radius:12px;
      background:#ffb3cc;
      font-weight:bold;
      cursor:pointer;
      transition:0.2s;
    }
    .object-btn:hover{
      background:#ff4d88;
      color:white;
    }
    .code-input{
      width:150px;
      padding:10px;
      font-size:18px;
      text-align:center;
      border-radius:8px;
      border:1px solid #ffb3cc;
    }
    .submit-btn{
      padding:10px 20px;
      margin-left:10px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
    }
    .submit-btn:hover{
      background:#ff1a66;
    }
    .message{
      margin-top:15px;
      font-weight:bold;
      min-height:20px;
    }
  </style>

  <div class="escape-room">
    <h3>🗝️ Level 30 – Escape Room 🗝️</h3>
    <div class="room-instructions">Explore the objects and find the 4-digit code to escape!</div>
    <div class="objects" id="objects">
      <button class="object-btn">Heart</button>
      <button class="object-btn">Star</button>
      <button class="object-btn">Books</button>
      <button class="object-btn">Clock</button>
    </div>
    <input type="text" id="codeInput" class="code-input" maxlength="4" placeholder="Enter 4-digit code"/>
    <button class="submit-btn" id="submitCode">Unlock</button>
    <div class="message" id="message"></div>
  </div>
    </div>
  </div>
  `;

  const objects = container.querySelectorAll(".object-btn");
  const codeInput = container.querySelector("#codeInput");
  const submitBtn = container.querySelector("#submitCode");
  const messageEl = container.querySelector("#message");

  // Personalized escape code
  const escapeCode = "7356"; // first digit: 7 (16 → 1+6), second: 3, third:5, fourth:5 (last digit of 2025)

  // Object clues
  objects.forEach(obj=>{
    obj.onclick = ()=>{
      const id = obj.textContent;
      let clue = "";
      if(id === "Heart"){
        clue = "The first number is the number of places we visited on dates **Add the number";
      } else if(id === "Star"){
        clue = "The second number is the number of cities we visited together";
      } else if(id === "Books"){
        clue = "The third number is the number of festivals or occasions we celebrated together";
      } else if(id === "Clock"){
        clue = "The number of months we spent together";
      }
      alert(clue);
    }
  });

  submitBtn.onclick = checkCode;

  codeInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") checkCode();
  });

  function checkCode(){
    const code = codeInput.value.trim();
    if(code === escapeCode){
      messageEl.style.color = "green";
      messageEl.textContent = "🎉 Correct! You escaped the room!";
      setTimeout(()=>{
        if(onComplete) onComplete();
      }, 500);
    } else {
      messageEl.style.color = "red";
      messageEl.textContent = "❌ Wrong code! Try again!";
      codeInput.value = "";
      codeInput.focus();
    }
  }
}