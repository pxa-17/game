function startLevel7(container, onComplete){
    container.innerHTML = `
      <h3>Level 7: Balloon Pop 🎈</h3>
      <p>Pop the colorful balloons before time runs out!</p>
      <div id="balloonArea" style="position:relative; width:300px; height:400px; margin:auto; border:2px solid #ff4da6; border-radius:15px; overflow:hidden;"></div>
      <p id="score7">Score: 0</p>
      <p id="timer7">Time: 20</p>
      <style>
        .balloon {
          width: 30px;
          height: 40px;
          background: red;
          border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
          position: absolute;
          cursor: pointer;
        }
        .balloon::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 12px;
          width: 6px;
          height: 8px;
          background: inherit;
          border-radius: 2px;
        }
        .balloon-string {
          width: 2px;
          height: 15px;
          background: #555;
          position: absolute;
          bottom: -20px;
          left: 14px;
        }
      </style>
    `;
  
    const balloonArea = document.getElementById("balloonArea");
    const scoreDisplay = document.getElementById("score7");
    const timerDisplay = document.getElementById("timer7");
  
    const colors = ["#ff4da6","#ffd700","#1e90ff","#32cd32"];
    const targetScore = 20;
    let score = 0;
    let timeLeft = 20;
  
    function createBalloon(){
      const color = colors[Math.floor(Math.random()*colors.length)];
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.background = color;
      balloon.style.left = Math.random() * 270 + "px";
      balloon.style.bottom = "-50px";
  
      // string
      const string = document.createElement("div");
      string.classList.add("balloon-string");
      balloon.appendChild(string);
  
      balloonArea.appendChild(balloon);
  
      // Pop on click/touch
      balloon.addEventListener("click", ()=> popBalloon(balloon));
      balloon.addEventListener("touchstart", ()=> popBalloon(balloon));
  
      // Animate upwards
      const duration = 5 + Math.random()*2; // slower
      balloon.style.transition = `bottom ${duration}s linear`;
      setTimeout(()=>{ balloon.style.bottom = "420px"; }, 50);
  
      // Remove if reaches top
      setTimeout(()=>{ balloon.remove(); }, duration*1000 + 100);
    }
  
    function popBalloon(balloon){
      balloon.remove();
      score++;
      scoreDisplay.innerText = "Score: " + score;
      if(score >= targetScore){
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        onComplete();
      }
    }
  
    const spawnInterval = setInterval(createBalloon, 900);
  
    const timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.innerText = `Time: ${timeLeft}`;
      if(timeLeft<=0){
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        alert("Time's up! Try again!");
        startLevel7(container,onComplete);
      }
    },1000);
  }