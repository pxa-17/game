function startLevel23(container, onComplete){

container.innerHTML = `
<div class="level-card">
  <h2 class="level-title">Level 23 – Number Memory</h2>
  <p class="level-subtitle">Remember the sequence</p>
  <div class="level-game-area">
<style>
.memory-wrapper{
  text-align:center;
  font-family:Segoe UI, sans-serif;
}

.number-display{
  font-size:42px;
  letter-spacing:8px;
  margin:25px 0;
  font-weight:bold;
  transition:0.3s;
}

input{
  padding:10px;
  font-size:18px;
  text-align:center;
  width:220px;
  margin-top:15px;
}

button{
  margin-top:15px;
  padding:8px 18px;
  border:none;
  background:#ff4d88;
  color:white;
  border-radius:6px;
  cursor:pointer;
}

.message{
  margin-top:15px;
  font-size:18px;
  font-weight:bold;
}
</style>

<div class="memory-wrapper">
  <h2>🧠 Level 23 – Number Memory</h2>
  <div id="roundInfo">Round 1</div>
  <div class="number-display" id="numberDisplay"></div>
  <input type="text" id="answerInput" placeholder="Enter number" disabled />
  <br>
  <button id="submitBtn" disabled>Submit</button>
  <div class="message" id="message"></div>
</div>
  </div>
</div>
`;

const numberDisplay = container.querySelector("#numberDisplay");
const answerInput = container.querySelector("#answerInput");
const submitBtn = container.querySelector("#submitBtn");
const message = container.querySelector("#message");
const roundInfo = container.querySelector("#roundInfo");

let round = 1;
const maxRounds = 6;
let currentNumber = "";

function generateNumber(length){
  let num="";
  for(let i=0;i<length;i++){
    num += Math.floor(Math.random()*10);
  }
  return num;
}

function startRound(){

  answerInput.value="";
  answerInput.disabled=true;
  submitBtn.disabled=true;
  message.innerHTML="";

  roundInfo.innerHTML = "Round " + round;

  const digitLength = 3 + round; // 4 → 9 digits

  let displayTime = 1700 + (round * 300);

  // 🔥 Extra time ONLY in final round
  if(round === 6){
    displayTime += 1500; 
  }

  currentNumber = generateNumber(digitLength);
  numberDisplay.innerHTML = currentNumber;

  setTimeout(()=>{
    numberDisplay.innerHTML = "●".repeat(digitLength);
    answerInput.disabled=false;
    submitBtn.disabled=false;
    answerInput.focus();
  }, displayTime);
}

function submitAnswer(){

  if(answerInput.value === currentNumber){

    if(round === maxRounds){
      message.innerHTML="🔥 Memory Master!";
      if(onComplete) onComplete();
      return;
    }

    round++;
    message.innerHTML="Correct! Next round...";
    setTimeout(startRound,1000);

  }else{
    message.innerHTML="❌ Wrong! Back to Round 1.";
    round=1;
    setTimeout(startRound,1500);
  }
}

submitBtn.onclick = submitAnswer;

answerInput.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    submitAnswer();
  }
});

startRound();

}