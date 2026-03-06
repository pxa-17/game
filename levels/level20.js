function startLevel20(container, onComplete){

  container.innerHTML = `
  <style>
    .quiz-container{
      font-family:'Segoe UI',sans-serif;
      max-width:600px;
      margin:auto;
      padding:30px;
      background:#fff0f5;
      border-radius:15px;
      box-shadow:0 10px 25px rgba(0,0,0,0.1);
      text-align:center;
    }

    .quiz-container h2{
      color:#ff4d88;
      margin-bottom:10px;
    }

    .question{
      font-size:18px;
      margin:20px 0;
      font-weight:600;
    }

    .options{
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    .option-btn{
      padding:10px;
      border:none;
      border-radius:8px;
      cursor:pointer;
      background:#ffe6f0;
      font-weight:500;
      transition:0.2s;
    }

    .option-btn:hover{
      background:#ffb3cc;
    }

    .progress{
      margin-top:15px;
      font-size:14px;
      color:#555;
    }

    .result{
      font-size:20px;
      margin-top:20px;
      font-weight:bold;
    }

    .restart-btn{
      margin-top:20px;
      padding:10px 20px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      cursor:pointer;
    }
  </style>

  <div class="quiz-container">
    <h2>🔥 Level 20 – No Mistakes Allowed 🔥</h2>
    <div class="question" id="question"></div>
    <div class="options" id="options"></div>
    <div class="progress" id="progress"></div>
    <div class="result" id="result"></div>
  </div>
  `;

  const baseQuestions = [

    {q:"Who gets more possessive?", options:["You","Me","Both","We hide it well"], answer:0},
    {q:"First time we hold hand?", options:["23/10/2025","16/11/2025","23/09/2025","15/12/2025"], answer:2},
    {q:"What part of me do you stare at the most?", options:["Lips","Eyes","Neck","Everything"], answer:1},
    {q:"Who initiates the intense eye contact?", options:["Me","You","Both","It just happens"], answer:1},
    {q:"What makes the tension rise instantly?", options:["Close distance","Whispering","Touch","All of it"], answer:3},
    {q:"Who flirts more aggressively?", options:["You","Me","Both equally","Depends on mood"], answer:0},
    {q:"What makes it hard to behave normally?", options:["Your closeness","Your smile","Your voice","Your stare"], answer:0},
    {q:"If we are alone, what happens first?", options:["Kiss","Teasing","Eye contact","Long hug"], answer:1},
    {q:"Who loses control first?", options:["You","Me","Both","No one admits"], answer:0},
    {q:"What’s the most distracting thing about me?", options:["Smile","Touch","Voice","Lips"], answer:3},
    {q:"What kind of vibe do we give?", options:["Dangerous chemistry","Soft romance","Chaotic energy","Mysterious tension"], answer:1},
    {q:"What makes the heartbeat go faster?", options:["Soft touch","Slow whisper","Close hug","All of these"], answer:0},
    {q:"Who enjoys teasing more?", options:["You","Me","Both","We compete"], answer:0},
    {q:"What’s our most intense moment usually filled with?", options:["Silence","Teasing","Fast Breathing","Smirking"], answer:2},
    {q:"What makes jealousy look attractive?", options:["My tone","My eyes","My reaction","My silence"], answer:2},
    {q:"If tension builds up, who breaks it?", options:["You","Me","We don’t","Depends on mood"], answer:0},
    {q:"What’s the most irresistible thing about me?", options:["Confidence","Lips","Energy","Eyes"], answer:1},
    {q:"Who enjoys being closer?", options:["You","Me","Both","Distance is illegal"], answer:0},
    {q:"What makes our chemistry dangerous?", options:["Touch","Eye contact","Teasing","All of it"], answer:3},
    {q:"What scares others about us?", options:["Our intensity","Our bond","Our possessiveness","Nothing scares us"], answer:1}

  ];

  // Shuffle function
  function shuffle(array){
    return array.sort(()=>Math.random()-0.5);
  }

  let questions = shuffle([...baseQuestions]);
  let current = 0;

  const questionEl = container.querySelector("#question");
  const optionsEl = container.querySelector("#options");
  const progressEl = container.querySelector("#progress");
  const resultEl = container.querySelector("#result");

  function loadQuestion(){
    const q = questions[current];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = "";

    q.options.forEach((opt,index)=>{
      const btn = document.createElement("button");
      btn.className="option-btn";
      btn.textContent = opt;
      btn.onclick = ()=>selectAnswer(index);
      optionsEl.appendChild(btn);
    });

    progressEl.textContent = `Question ${current+1} of ${questions.length}`;
  }

  function selectAnswer(index){

    if(index !== questions[current].answer){
      // WRONG ANSWER → RESTART WITH SHUFFLE
      resultEl.innerHTML = `
        ❌ Wrong Answer! Starting Again...<br><br>
      `;
      setTimeout(()=>{
        startLevel20(container, onComplete);
      }, 1500);
      return;
    }

    current++;

    if(current < questions.length){
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult(){
    questionEl.style.display="none";
    optionsEl.style.display="none";
    progressEl.style.display="none";

    resultEl.innerHTML = `
      🔥 PERFECT SCORE 🔥<br><br>
      🎉 You completed Level 20 without a single mistake! 🎉
      <br><br>
      <button class="restart-btn" onclick="startLevel20(container, onComplete)">Play Again</button>
    `;

    if(onComplete){
      onComplete();
    }
  }

  loadQuestion();
}