// DOM ELEMENTS
const numberDisplay = document.getElementById("number-display");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");

const fizzBtn = document.getElementById("fizz-btn");
const buzzBtn = document.getElementById("buzz-btn");
const fizzbuzzBtn = document.getElementById("fizzbuzz-btn");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// AUDIO
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong = document.getElementById("sfx-wrong");
const sfxClick = document.getElementById("sfx-click");

// GAME STATE
let currentNumber = 1;
let score = 0;
let streak = 0;

// UPDATE UI
function updateDisplay() {
  numberDisplay.textContent = currentNumber;
  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;
  feedback.textContent = "";
}

// FEEDBACK
function showFeedback(msg, color) {
  feedback.textContent = msg;
  feedback.style.color = color;
}

// SOUND
function playCorrect() { sfxCorrect.currentTime = 0; sfxCorrect.play(); }
function playWrong() { sfxWrong.currentTime = 0; sfxWrong.play(); }
function playClick() { sfxClick.currentTime = 0; sfxClick.play(); }

// GAME LOGIC
function checkAnswer(answer) {
  playClick();

  const isFizz = currentNumber % 3 === 0;
  const isBuzz = currentNumber % 5 === 0;
  const correctAnswer =
    isFizz && isBuzz ? "fizzbuzz" :
    isFizz ? "fizz" :
    isBuzz ? "buzz" :
    "none";

  if (answer === correctAnswer) {
    score++;
    streak++;
    playCorrect();
    showFeedback("Correct!", "green");
    currentNumber++;
  } else {
    streak = 0;
    playWrong();
    showFeedback("Try again!", "red");
  }

  updateDisplay();
}

// START GAME
function startGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  updateDisplay();
  startScreen.style.display = "none";
}

// RESET GAME
function resetGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  updateDisplay();
  showFeedback("Game reset!", "#1976d2");
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

fizzBtn.addEventListener("click", () => checkAnswer("fizz"));
buzzBtn.addEventListener("click", () => checkAnswer("buzz"));
fizzbuzzBtn.addEventListener("click", () => checkAnswer("fizzbuzz"));
