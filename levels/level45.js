function startLevel45(container, onComplete) {

let score = 0;
const required = 3;

container.innerHTML = `
<style>

.area{
  position:relative;
  width:420px;
  height:300px;
  margin:30px auto;
  background:#000; /* change to #fff if you want white */
  border-radius:10px;
  overflow:hidden;
}

.star{
  position:absolute;
  font-size:28px;
  cursor:pointer;
  user-select:none;
  transition:left 0.5s, top 0.5s;
}

.info{
  text-align:center;
  margin-top:10px;
  font-weight:bold;
}

</style>

<div style="text-align:center;font-size:22px;font-weight:bold">
Level 45
</div>

<div class="info" id="info">Catch the ⭐ (0/3)</div>

<div class="area" id="area"></div>
`;

const area = container.querySelector("#area");
const info = container.querySelector("#info");

let stars = [];
let correctIndex = Math.floor(Math.random() * 6);

// create stars
for (let i = 0; i < 6; i++) {

  const star = document.createElement("div");
  star.className = "star";

  star.textContent = i === correctIndex ? "⭐" : "✨";

  star.style.left = Math.random() * 380 + "px";
  star.style.top = Math.random() * 260 + "px";

  star.onclick = (e) => {

    e.stopPropagation();

    if (i === correctIndex) {

      score++;
      info.textContent = `Good! Catch again (${score}/3)`;

      if (score >= required) {

        info.textContent = "🎉 Level Complete!";

        setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);

      } else {

        resetRound();

      }

    } else {

      score = 0;
      info.textContent = "❌ Wrong! Restart (0/3)";
      resetRound();

    }

  };

  area.appendChild(star);
  stars.push(star);
}

// move stars
function moveStars() {

  stars.forEach(star => {

    const x = Math.random() * 380;
    const y = Math.random() * 260;

    star.style.left = x + "px";
    star.style.top = y + "px";

  });

}

setInterval(moveStars, 800);

// reset round
function resetRound() {

  correctIndex = Math.floor(Math.random() * stars.length);

  stars.forEach((star, index) => {
    star.textContent = index === correctIndex ? "⭐" : "✨";
  });

}

}