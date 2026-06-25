// DOM ELEMENTS
const numberDisplay = document.getElementById("number-display");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");
const timerDisplay = document.getElementById("timer");

const fizzBtn = document.getElementById("fizz-btn");
const buzzBtn = document.getElementById("buzz-btn");
const fizzbuzzBtn = document.getElementById("fizzbuzz-btn");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const pauseBtn = document.getElementById("pause-btn");

// AUDIO
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong = document.getElementById("sfx-wrong");
const sfxClick = document.getElementById("sfx-click");

// GAME STATE
let currentNumber = 1;
let score = 0;
let streak = 0;
let isPaused = false;

let timeLeft = 30;
let timerInterval = null;

// ARCADE MODE: random number that is ALWAYS fizz, buzz, or fizzbuzz
function getRandomNumber() {
  let n;
  do {
    n = Math.floor(Math.random() * 100) + 1; // 1–100
  } while (n % 3 !== 0 && n % 5 !== 0); // reject pure "number" cases
  return n;
}

// UPDATE UI
function updateDisplay() {
  numberDisplay.textContent = currentNumber;
  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;

  numberDisplay.classList.remove("bounce");
  void numberDisplay.offsetWidth;
  numberDisplay.classList.add("bounce");
}

// FEEDBACK
function showFeedback(msg, color) {
  feedback.textContent = msg;
  feedback.style.color = color;
}

// SOUND
function playCorrect() { if (!sfxCorrect) return; sfxCorrect.currentTime = 0; sfxCorrect.play().catch(() => {}); }
function playWrong() { if (!sfxWrong) return; sfxWrong.currentTime = 0; sfxWrong.play().catch(() => {}); }
function playClick() { if (!sfxClick) return; sfxClick.currentTime = 0; sfxClick.play().catch(() => {}); }

// TIMER
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (isPaused) return;

    timeLeft--;
    timerDisplay.textContent = timeLeft;

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

  fizzBtn.disabled = true;
  buzzBtn.disabled = true;
  fizzbuzzBtn.disabled = true;

  alert(`Game Over!\nScore: ${score}\nBest Streak: ${streak}`);
}

// CHECK ANSWER (ARCADE MODE)
function checkAnswer(answer) {
  if (isPaused) return;
  playClick();

  const isFizz = currentNumber % 3 === 0;
  const isBuzz = currentNumber % 5 === 0;
  const correctAnswer =
    isFizz && isBuzz ? "fizzbuzz" :
    isFizz ? "fizz" :
    "buzz"; // "number" never occurs in arcade mode

  if (answer === correctAnswer) {
    score++;
    streak++;
    playCorrect();
    showFeedback("Correct!", "green");

    currentNumber = getRandomNumber();
    updateDisplay();
  } else {
    streak = 0;
    playWrong();
    showFeedback("Try again!", "red");
  }
}

// START GAME
function startGame() {
  score = 0;
  streak = 0;
  timeLeft = 30;
  isPaused = false;
  pauseBtn.textContent = "Pause";

  fizzBtn.disabled = false;
  buzzBtn.disabled = false;
  fizzbuzzBtn.disabled = false;

  currentNumber = getRandomNumber();
  timerDisplay.textContent = timeLeft;
  updateDisplay();

  startScreen.style.display = "none";
  startTimer();
}

// RESET GAME
function resetGame() {
  score = 0;
  streak = 0;
  timeLeft = 30;
  isPaused = false;
  pauseBtn.textContent = "Pause";

  fizzBtn.disabled = false;
  buzzBtn.disabled = false;
  fizzbuzzBtn.disabled = false;

  currentNumber = getRandomNumber();
  timerDisplay.textContent = timeLeft;
  updateDisplay();
  showFeedback("Game reset!", "#1976d2");

  clearInterval(timerInterval);
  startTimer();
}

// PAUSE / RESUME
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
