function startLevel32(container, onComplete){
  container.innerHTML = `
  <style>
    .level-card{
      width: 600px;
      margin: 40px auto;
      padding: 30px;
      background:#fdf0f5;
      border-radius:15px;
      box-shadow:0 10px 25px rgba(0,0,0,0.15);
      font-family:'Segoe UI',sans-serif;
      text-align:center;
      position: relative;
    }
    .instructions{
      font-size:18px;
      margin-bottom:10px;
      color:#ff4d88;
      font-weight:bold;
    }
    .hint{
      font-size:14px;
      color:#555;
      margin-bottom:20px;
      font-style:italic;
    }
    .code-input{
      width:150px;
      font-size:20px;
      padding:10px;
      text-align:center;
      border-radius:8px;
      border:2px solid #ffb3cc;
      margin-bottom:20px;
      text-transform: uppercase;
    }
    .submit-btn{
      padding:10px 20px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
      margin-bottom:20px;
    }
    .submit-btn:hover{
      background:#ff1a66;
    }
    .image-container{
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 20px auto;
      height: 300px;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      background: #fff; /* optional background behind image */
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
      border-radius: 10px;
    }
    .slide-door.open{
      transform: translateY(-100%);
    }
    .reward-image{
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; /* ensures the full image fits inside container */
      display:block;
    }
  </style>

  <div class="level-card">
    <h3>Level 32 – Unlock Your Reward</h3>
    <div class="instructions">Enter the correct word to reveal the reward image!</div>
    <div class="hint">💡 Hint: It is the first day of the week.</div>
    <input type="text" id="codeInput" class="code-input" maxlength="10" placeholder="Enter code">
    <br>
    <button class="submit-btn" id="submitBtn">Submit</button>
    
    <div class="image-container">
      <img id="rewardImage" class="reward-image" src="images/img8.png" alt="Reward">
      <div class="slide-door" id="slideDoor"></div>
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