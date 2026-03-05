function startLevel13(container, onComplete){

  container.innerHTML = `
  <style>
    .wrapper{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      height:420px;
      font-family:sans-serif;
      text-align:center;
    }

    .numbers{
      display:flex;
      gap:20px;
      margin-top:30px;
      font-size:28px;
    }

    .num{
      background:#1f2442;
      color:white;
      padding:15px 20px;
      border-radius:10px;
      cursor:pointer;
      transition:0.2s;
    }

    .num:hover{
      transform:scale(1.1);
    }
  </style>

  <div class="wrapper">
    <h2>Tap the smallest number</h2>
    <div>Lives: <span id="lives">❤️❤️❤️</span></div>
    <div class="numbers" id="numbers"></div>
  </div>
  `;

  const numbersDiv = document.getElementById("numbers");
  const livesEl = document.getElementById("lives");

  let lives = 3;

  function updateLives(){
    livesEl.textContent = "❤️".repeat(lives);
  }

  function loseLife(){
    lives--;
    updateLives();
    if(lives<=0){
      alert("Game Over 😈 You reacted too fast.");
      startLevel13(container,onComplete);
    }
  }

  // First set
  let nums = [];
  while(nums.length < 6){
    let n = Math.floor(Math.random()*9)+1;
    if(!nums.includes(n)) nums.push(n);
  }

  const originalNums = [...nums];
  const smallest = Math.min(...originalNums);

  function render(arr){
    numbersDiv.innerHTML="";
    arr.forEach(n=>{
      const div=document.createElement("div");
      div.className="num";
      div.textContent=n;

      div.onclick=()=>{
        if(n === smallest){
          onComplete();
        }else{
          loseLife();
        }
      };

      numbersDiv.appendChild(div);
    });
  }

  render(nums);

  // Change numbers after 2 sec
  setTimeout(()=>{
    nums = nums.sort(()=>Math.random()-0.5);
    render(nums);
  },2000);

  // Change again after 4 sec
  setTimeout(()=>{
    nums = nums.map(()=>Math.floor(Math.random()*9)+1);
    render(nums);
  },1000);

  updateLives();
}