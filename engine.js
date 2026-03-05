const screens = {
    home: document.getElementById("homeScreen"),
    map: document.getElementById("mapScreen"),
    game: document.getElementById("gameScreen"),
    reward: document.getElementById("rewardScreen")
  };
  
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
  }
  
  document.getElementById("startBtn").onclick = () => showScreen("map");
  document.getElementById("backHome").onclick = () => showScreen("home");
  document.getElementById("backMap").onclick = () => showScreen("map");