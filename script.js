const startBtn = document.getElementById("start-btn");
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const music = document.getElementById("bg-music");

let speed = 2;
let score = 0;
let gameOver = false;

startBtn.addEventListener("click", startGame);

function startGame() {
  menuScreen.classList.remove("active");
  gameScreen.classList.add("active");
  score = 0;
  speed = 2;
  gameOver = false;
  music.currentTime = 0;
  music.play();
  setInterval(createTile, 800);
}

function createTile() {
  if (gameOver) return;

  const tile = document.createElement("div");
  tile.classList.add("tile");

  const position = Math.floor(Math.random() * 4);
  tile.style.left = `${position * 25}%`;
  tile.style.top = `-100px`;

  container.appendChild(tile);

  let top = -100;
  const fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      return;
    }

    top += speed;
    tile.style.top = `${top}px`;

    if (top > 500) {
      clearInterval(fall);
      tile.remove();
      endGame();
    }
  }, 20);

  tile.addEventListener("click", () => {
    tile.remove();
    clearInterval(fall);
    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    if (score % 5 === 0) speed += 0.5;
  });
}

function endGame() {
  gameOver = true;
  music.pause();
  alert(`🎮 Game Over! Final Score: ${score}`);
  location.reload();
}
