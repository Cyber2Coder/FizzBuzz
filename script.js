const numberDisplay = document.getElementById("number-display");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");

const fizzBtn = document.getElementById("fizz-btn");
const buzzBtn = document.getElementById("buzz-btn");
const fizzbuzzBtn = document.getElementById("fizzbuzz-btn");

let currentNumber = 1;
let score = 0;
let streak = 0;

function updateDisplay() {
  numberDisplay.textContent = currentNumber;
  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;
}

function showFeedback(msg, color) {
  feedback.textContent = msg;
  feedback.style.color = color;
}

function checkAnswer(answer) {
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
    showFeedback("Correct!", "green");
  } else {
    streak = 0;
    showFeedback("Wrong!", "red");
  }

  currentNumber++;
  updateDisplay();
}

fizzBtn.addEventListener("click", () => checkAnswer("fizz"));
buzzBtn.addEventListener("click", () => checkAnswer("buzz"));
fizzbuzzBtn.addEventListener("click", () => checkAnswer("fizzbuzz"));

updateDisplay();
