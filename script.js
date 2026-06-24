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
let timeLeft = 30;
let timerInterval = null;

let currentNumber = 1;
let score = 0;
let streak = 0;
let isPaused = false;

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
  if (isPaused) return;

function checkAnswer(answer) {
  if (isPaused) return;
  playClick();

  const isFizz = currentNumber % 3 === 0;
  const isBuzz = currentNumber % 5 === 0;
  const correctAnswer =
    isFizz && isBuzz ? "fizzbuzz" :
    isFizz ? "fizz" :
    isBuzz ? "buzz" :
    "number";

  if (answer === correctAnswer) {
    score++;
    streak++;
    playCorrect();
    showFeedback("Correct!", "green");

    currentNumber++;      // <-- THIS is your number generator
    updateDisplay();      // <-- triggers bounce animation
  } else {
    streak = 0;
    playWrong();
    showFeedback("Try again!", "red");
  }
}

  updateDisplay();


// START GAME
  isPaused = false;
  pauseBtn.textContent = "Pause";
function startGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;

  fizzBtn.disabled = false;
  buzzBtn.disabled = false;
  fizzbuzzBtn.disabled = false;

  updateDisplay();
  startScreen.style.display = "none";

  isPaused = false;
  pauseBtn.textContent = "Pause";

  startTimer();
}

// COUNTDOWN TIMER
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (isPaused) return;

    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}
// END GAME
function endGame() {
  showFeedback("Time's up!", "red");
  isPaused = true;

  // Optional: disable buttons visually
  fizzBtn.disabled = true;
  buzzBtn.disabled = true;
  fizzbuzzBtn.disabled = true;

  // Optional: show final score
  alert(`Game Over!\nYour score: ${score}\nYour best streak: ${streak}`);
}

// RESET GAME
function resetGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;

  fizzBtn.disabled = false;
  buzzBtn.disabled = false;
  fizzbuzzBtn.disabled = false;

  updateDisplay();
  showFeedback("Game reset!", "#1976d2");

  clearInterval(timerInterval);
  startTimer();
}


// PAUSE GAME
function togglePause() {
  isPaused = !isPaused;

  if (isPaused) {
    showFeedback("Paused", "#6a1b9a");
    pauseBtn.textContent = "Resume";
  } else {
    showFeedback("Game resumed!", "#1976d2");
    pauseBtn.textContent = "Pause";
  }
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", togglePause);

fizzBtn.addEventListener("click", () => checkAnswer("fizz"));
buzzBtn.addEventListener("click", () => checkAnswer("buzz"));
fizzbuzzBtn.addEventListener("click", () => checkAnswer("fizzbuzz"));
