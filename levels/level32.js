function startLevel32(container, onComplete){
  container.innerHTML = `
    <div class="level-card">
      <h2 class="level-title">Level 32 – Unlock Reward</h2>
      <p class="level-subtitle">Enter the code to reveal your reward</p>
      <div class="level-game-area">
      <style>
      .level-card-inner{
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
        padding: 25px;
        background:#fdf0f5;
        border-radius:15px;
        box-shadow:0 10px 25px rgba(0,0,0,0.15);
        font-family:'Segoe UI',sans-serif;
        text-align:center;
      }
      .instructions{
        font-size:16px;
        margin-bottom:10px;
        color:#ff4d88;
        font-weight:bold;
      }
      .hint{
        font-size:14px;
        color:#555;
        margin-bottom:15px;
        font-style:italic;
      }
      .code-input{
        width:150px;
        font-size:18px;
        padding:10px;
        text-align:center;
        border-radius:8px;
        border:2px solid #ffb3cc;
        margin-bottom:15px;
        text-transform: uppercase;
      }
      .submit-btn{
        padding:12px 25px;
        border:none;
        border-radius:25px;
        background:linear-gradient(135deg, #ff4da6, #ff85c1);
        color:white;
        font-weight:bold;
        cursor:pointer;
      }
      .submit-btn:hover{
        background:linear-gradient(135deg, #e60078, #ff4da6);
      }
      .image-container{
        position: relative;
        width: 100%;
        max-width: 350px;
        margin: 15px auto;
        height: 250px;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .slide-door{
        position: absolute;
        top:0; left:0;
        width:100%; height:100%;
        background:#444;
        z-index:2;
        transition: transform 1s ease-in-out;
        border-radius: 12px;
      }
      .slide-door.open{
        transform: translateY(-100%);
      }
      .reward-image{
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        display:block;
      }
      </style>

      <div class="level-card-inner">
        <div class="instructions">Enter the correct word to reveal the reward image!</div>
        <div class="hint">💡 Hint: It is the first day of the week.</div>
        <input type="text" id="codeInput" class="code-input" maxlength="10" placeholder="Enter code">
        <br>
        <button class="submit-btn" id="submitBtn">Submit</button>
        
        <div class="image-container">
          <img id="rewardImage" class="reward-image" src="./images/img32.PNG" alt="Reward">
          <div class="slide-door" id="slideDoor"></div>
        </div>
      </div>
      </div>
    </div>
  `;

  const codeInput = container.querySelector("#codeInput");
  const submitBtn = container.querySelector("#submitBtn");
  const slideDoor = container.querySelector("#slideDoor");

  const correctCode = "MONDAY";
  const displayDuration = 3000; // 3 seconds

  submitBtn.onclick = ()=>{
    const code = codeInput.value.trim().toUpperCase();
    if(code === correctCode){
      slideDoor.classList.add("open"); // Slide up

      // Disable input and button
      codeInput.disabled = true;
      submitBtn.disabled = true;

      // Wait for door animation + display duration before completing level
      setTimeout(()=>{
        if(onComplete) onComplete();
      }, 1000 + displayDuration);
    } else {
      codeInput.value = "";
      codeInput.focus();
    }
  }

  // Enter key support
  codeInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      submitBtn.click();
    }
  });
}