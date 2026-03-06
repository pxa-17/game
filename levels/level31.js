function startLevel31(container, onComplete){
  container.innerHTML = `
  <style>
    .timeline-card{
      width: 700px;
      margin: 30px auto;
      padding: 20px;
      background: #fdf0f5;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      font-family:'Segoe UI',sans-serif;
      text-align:center;
    }
    .instructions{
      font-size:18px;
      color:#ff4d88;
      margin-bottom:15px;
      font-weight:bold;
    }
    .events{
      display:flex;
      flex-direction:column;
      gap:10px;
      margin-bottom:20px;
    }
    .event{
      padding:10px;
      background:#ffb3cc;
      border-radius:8px;
      cursor:grab;
      font-weight:bold;
      user-select:none;
    }
    .check-btn{
      padding:10px 20px;
      border:none;
      border-radius:8px;
      background:#ff4d88;
      color:white;
      font-weight:bold;
      cursor:pointer;
    }
    .check-btn:hover{
      background:#ff1a66;
    }
    .message{
      margin-top:15px;
      font-weight:bold;
      min-height:20px;
    }
  </style>

  <div class="timeline-card">
    <h3>🕒 Level 31 – Arrange Cafe Timeline 🕒</h3>
    <div class="instructions">Drag and drop the cafes to arrange them in the order we visited!</div>
    <div class="events" id="events"></div>
    <button class="check-btn" id="checkOrder">Check Order</button>
    <div class="message" id="message"></div>
  </div>
  `;

  const eventsContainer = container.querySelector("#events");
  const checkBtn = container.querySelector("#checkOrder");
  const messageEl = container.querySelector("#message");

  // Cafes in chronological order including repeated visits
  const cafes = [
    "Size Zero Roof Top",
    "Coffee Culture",
    "FBK",
    "Size Zero Roof Top",
    "Greenbelly",
    "Cheeliza",
    "Global Platter",
    "McD",
    "Dough and Doppio",
    "Lapinoz",
    "Ovens and Platter",
    "Ziora",
    "Eat Sure",
    "Blue Oven",
    "Caffoto",
    "Snowberry"
  ];

  // Shuffle cafes for display
  const shuffled = cafes
    .map((cafe, idx) => ({name: cafe, order: idx}))
    .sort(()=> Math.random() - 0.5);

  shuffled.forEach((cafeObj)=>{
    const div = document.createElement("div");
    div.className="event";
    div.draggable = true;
    div.dataset.order = cafeObj.order; // correct chronological index
    div.textContent = cafeObj.name;
    eventsContainer.appendChild(div);
  });

  let dragSrcEl = null;

  function handleDragStart(e){
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e){
    if(e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDrop(e){
    if(e.stopPropagation) e.stopPropagation();
    if(dragSrcEl != this){
      // Swap innerHTML
      const tempHTML = this.innerHTML;
      this.innerHTML = dragSrcEl.innerHTML;
      dragSrcEl.innerHTML = tempHTML;

      // Swap dataset.order
      const tempOrder = this.dataset.order;
      this.dataset.order = dragSrcEl.dataset.order;
      dragSrcEl.dataset.order = tempOrder;
    }
    return false;
  }

  function addDragAndDropHandlers(el){
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('drop', handleDrop, false);
  }

  const allEvents = container.querySelectorAll(".event");
  allEvents.forEach(addDragAndDropHandlers);

  // Check order
  checkBtn.onclick = ()=>{
    const arranged = container.querySelectorAll(".event");
    let correct = true;
    for(let i=0;i<arranged.length-1;i++){
      if(Number(arranged[i].dataset.order) > Number(arranged[i+1].dataset.order)){
        correct = false;
        break;
      }
    }
    if(correct){
      messageEl.style.color="green";
      messageEl.textContent="🎉 Perfect! Cafes arranged correctly!";
      setTimeout(()=>{
        if(onComplete) onComplete();
      },500);
    } else {
      messageEl.style.color="red";
      messageEl.textContent="❌ Wrong order! Try again!";
    }
  }
}