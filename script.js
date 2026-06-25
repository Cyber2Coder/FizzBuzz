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
let roundInterval = null;
let answeredThisRound = false;

// ARCADE MODE: random number that is ALWAYS fizz, buzz, or fizzbuzz
function getRandomNumber() {
  let n;
  do {
    n = Math.floor(Math.random() * 100) + 1;
  } while (n % 3 !== 0 && n % 5 !== 0);
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
function playCorrect() { if (sfxCorrect) { sfxCorrect.currentTime = 0; sfxCorrect.play().catch(()=>{}); } }
function playWrong() { if (sfxWrong) { sfxWrong.currentTime = 0; sfxWrong.play().catch(()=>{}); } }
function playClick() { if (sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } }

// TIMER
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (isPaused) return;

    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(roundInterval);
      endGame();
    }
  }, 1000);
}

// AUTO-ADVANCE ROUND ENGINE (3 seconds)
function startRoundLoop() {
  clearInterval(roundInterval);

  roundInterval = setInterval(() => {
    if (isPaused) return;

    if (!answeredThisRound) {
      // Player missed the question
      streak = 0;
      playWrong();
      showFeedback("Missed!", "red");
    }

    // New round
    answeredThisRound = false;
    currentNumber = getRandomNumber();
    updateDisplay();

  }, 3000); // 3 seconds per round
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

// CHECK ANSWER
function checkAnswer(answer) {
  if (isPaused) return;
  if (answeredThisRound) return; // prevent double answers

  playClick();
  answeredThisRound = true;

  const isFizz = currentNumber % 3 === 0;
  const isBuzz = currentNumber % 5 === 0;
  const correctAnswer =
    isFizz && isBuzz ? "fizzbuzz" :
    isFizz ? "fizz" :
    "buzz";

  if (answer === correctAnswer) {
    score++;
    streak++;
    playCorrect();
    showFeedback("Correct!", "green");
  } else {
    streak = 0;
    playWrong();
    showFeedback("Wrong!", "red");
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
  answeredThisRound = false;

  timerDisplay.textContent = timeLeft;
  updateDisplay();

  startScreen.style.display = "none";

  startTimer();
  startRoundLoop();
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
  answeredThisRound = false;

  timerDisplay.textContent = timeLeft;
  updateDisplay();
  showFeedback("Game reset!", "#1976d2");

  clearInterval(timerInterval);
  clearInterval(roundInterval);

  startTimer();
  startRoundLoop();
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
