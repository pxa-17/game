function startLevel46(container, onComplete) {

  container.innerHTML = `
  <div class="level-card">

    <style>

    .level-title{
      text-align:center;
      font-size:26px;
      margin-bottom:5px;
    }

    .level-subtitle{
      text-align:center;
      margin-bottom:20px;
    }

    .puzzleGrid{
      width:320px;
      height:320px;
      margin:20px auto;
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:6px;
    }

    .tile{
      background:black;
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
      font-weight:bold;
      border-radius:8px;
      cursor:pointer;
    }

    .empty{
      background:#333;
      cursor:default;
    }

    .info{
      text-align:center;
      font-weight:bold;
      margin-top:10px;
    }

    .resetBtn{
      display:block;
      margin:15px auto;
      padding:10px 22px;
      background:#ff6eb8;
      color:white;
      border:none;
      border-radius:6px;
      cursor:pointer;
    }

    .finalCard{
      max-width:650px;
      margin:40px auto;
      padding:35px;
      background:white;
      border-radius:14px;
      box-shadow:0 10px 30px rgba(0,0,0,0.2);
      line-height:1.7;
      text-align:center;
      font-family:sans-serif;
    }

    .finalCard h2{
      color:#ff4da6;
      margin-bottom:20px;
    }

    .btnRow{
      margin-top:25px;
      display:flex;
      justify-content:center;
      gap:15px;
      flex-wrap:wrap;
    }

    .downloadBtn, .homeBtn{
      padding:12px 28px;
      border:none;
      border-radius:8px;
      font-size:15px;
      cursor:pointer;
      color:white;
    }

    .downloadBtn{
      background:#ff4da6;
    }

    .homeBtn{
      background:#444;
    }

    </style>

    <h2 class="level-title">Level 46 – Final Challenge</h2>
    <p class="level-subtitle">Solve the puzzle to unlock the final message ❤️</p>

    <div class="puzzleGrid" id="grid"></div>

    <div class="info" id="info">Arrange numbers from 1 to 15</div>

    <button id="resetBtn" class="resetBtn">Reset</button>

    <div id="finalMessageArea"></div>

  </div>
  `;

  const grid = container.querySelector("#grid");
  const info = container.querySelector("#info");
  const resetBtn = container.querySelector("#resetBtn");
  const finalMessageArea = container.querySelector("#finalMessageArea");

  let numbers;

  function shuffle(){
    numbers = [...Array(15).keys()].map(n => n + 1);
    numbers.push("");
    numbers.sort(() => Math.random() - 0.5);
  }

  shuffle();

  resetBtn.onclick = () => {
    shuffle();
    render();
    info.textContent = "Arrange numbers from 1 to 15";
    finalMessageArea.innerHTML = "";
  };

  function render(){

    grid.innerHTML = "";

    numbers.forEach((num,i)=>{

      const tile = document.createElement("div");

      tile.className = num === "" ? "tile empty" : "tile";
      tile.textContent = num;

      tile.onclick = () => moveTile(i);

      grid.appendChild(tile);

    });

  }

  function moveTile(index){

    const emptyIndex = numbers.indexOf("");

    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 4,
      emptyIndex + 4
    ];

    if(validMoves.includes(index)){

      [numbers[index],numbers[emptyIndex]] =
      [numbers[emptyIndex],numbers[index]];

      render();
      checkWin();

    }

  }

  function checkWin(){

    for(let i=0;i<15;i++){
      if(numbers[i] !== i+1) return;
    }

    showFinalMessage();

  }

  function showFinalMessage(){

    finalMessageArea.innerHTML = `

      <div class="finalCard" id="finalCard">

      <h2>🎉 Happy 6 months, my Bacha ❤️</h2>

      <p>
      It’s hard to believe that it’s already been six months since we started this beautiful journey together.
      In this short time, you have become someone so incredibly special to me — someone who understands me,
      supports me, and makes my world feel warmer and brighter.
      <br><br>

      You’ve seen my happy moments, my overthinking, my moods, and my silly side,
      and yet you still choose to stay, care, and like me.
      <br><br>

      Being with you has taught me that connection isn’t just about big moments,
      it’s also about the small ones — the conversations, the laughter,
      the comfort, and simply knowing someone is there for you.
      <br><br>

      These six months with you have been full of memories that I will always treasure.
      <br><br>

      Thank you for being you, for being patient with me,
      and for making my life feel so full of happiness and love.
      <br><br>

      I’m really lucky to have you in my life ❤️
      <br><br>

      <b>Picture Abhi Baki Hai Mere Dost.</b>
      </p>

      <div class="btnRow">
        <button id="downloadBtn" class="downloadBtn">Download</button>
        <button id="homeBtn" class="homeBtn">Go to Home</button>
      </div>

      </div>
    `;

    const downloadBtn = document.getElementById("downloadBtn");
    const homeBtn = document.getElementById("homeBtn");

    downloadBtn.onclick = ()=>{
      const card = document.getElementById("finalCard");

      html2canvas(card).then(canvas=>{
        const link = document.createElement("a");
        link.download = "our_6_months.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    };

    homeBtn.onclick = ()=>{
      location.reload();
    };

    if(onComplete){
      setTimeout(onComplete,800);
    }

  }

  render();

}
