// -----------------------------
// ELEMENT REFERENCES
// -----------------------------
const numberEl = document.getElementById("current-number");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");

const btnFizz = document.getElementById("btn-fizz");
const btnBuzz = document.getElementById("btn-buzz");
const btnFizzBuzz = document.getElementById("btn-fizzbuzz");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// -----------------------------
// GAME STATE
// -----------------------------
let currentNumber = 1;
let score = 0;
let streak = 0;

// -----------------------------
// UTILITY FUNCTIONS
// -----------------------------

function startGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  updateDisplay();
  startScreen.style.display = "none";
}

function resetGame() {
  currentNumber = 1;
  score = 0;
  streak = 0;
  updateDisplay();
  showFeedback("Game reset!", "#1976d2");
}

function getFizzBuzzValue(n) {
  if (n % 15 === 0) return "fizzbuzz";
  if (n % 3 === 0) return "fizz";
  if (n % 5 === 0) return "buzz";
  return "number";
}

function updateDisplay() {
  numberEl.textContent = currentNumber;
  scoreEl.textContent = score;
  streakEl.textContent = streak;

  // bounce animation
  numberEl.classList.remove("bounce");
  void numberEl.offsetWidth; // force reflow
  numberEl.classList.add("bounce");
}

function showFeedback(message, color) {
  feedbackEl.textContent = message;
  feedbackEl.style.color = color;

  feedbackEl.classList.remove("pop");
  void feedbackEl.offsetWidth;
  feedbackEl.classList.add("pop");
}

function nextNumber() {
  currentNumber++;
  updateDisplay();
}

// -----------------------------
// GAME LOGIC
// -----------------------------
function handleChoice(choice) {
  const correct = getFizzBuzzValue(currentNumber);

  if (choice === correct) {
    score++;
    streak++;
    showFeedback("Great job!", "#2e7d32"); // green
    nextNumber();
  } else {
    streak = 0;
    showFeedback("Try again!", "#c62828"); // red
  }

  updateDisplay();
}

// -----------------------------
// BUTTON ANIMATION HELPERS
// -----------------------------
function squishButton(btn) {
  btn.classList.add("squish");
  setTimeout(() => btn.classList.remove("squish"), 150);
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

btnFizz.addEventListener("click", () => {
  squishButton(btnFizz);
  handleChoice("fizz");
});

btnBuzz.addEventListener("click", () => {
  squishButton(btnBuzz);
  handleChoice("buzz");
});

btnFizzBuzz.addEventListener("click", () => {
  squishButton(btnFizzBuzz);
  handleChoice("fizzbuzz");
});

// -----------------------------
// INITIALIZE GAME
// -----------------------------
updateDisplay();
