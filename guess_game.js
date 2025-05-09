const words = ["apple", "banana", "mango", "grape", "peach", "kiwi", "orange", "watermelon", "strawberry", "Pineapple", "papaya", "blueberry", "gooseberry", "Durian", "Apricot"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 5;

console.log("Secret word:", secretWord);

const hint = document.getElementById("hint");
const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const info = document.getElementById("info");

hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;

function evaluateGuess() {
  let userGuess = input.value.trim().toLowerCase();

  if (userGuess === "") {
    attempts--;
    if (attempts > 0) {
      message.textContent = `Incorrect guess. You have ${attempts} attempts left. Try again!`;
    } else {
      message.textContent = `Game over! The secret word was '${secretWord}'.`;
      document.body.style.backgroundColor = "#ff7f7f";
      endGame();
    }
  } else if (userGuess === secretWord) {
    message.textContent = "Congratulations! You guessed the secret word!";
    document.body.style.backgroundColor = "lightgreen"; 
    endGame();
  } else {
    attempts--;
    if (attempts > 0) {
      message.textContent = `Incorrect guess. You have ${attempts} attempts left. Try again!`;
    } else {
      message.textContent = `Game over! The secret word was '${secretWord}'.`;
      document.body.style.backgroundColor = "#ff7f7f"; 
      endGame();
    }
  }

  input.value = "";
  input.focus();
}

function endGame() {
  submitBtn.disabled = true;
  input.disabled = true;
  restartBtn.style.display = "inline";
}

function resetGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  attempts = 5;
  message.textContent = "";
  info.textContent = "";
  hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
  submitBtn.disabled = false;
  input.disabled = false;
  input.value = "";
  input.focus();
  restartBtn.style.display = "none";
  document.body.style.backgroundColor = "white";
  console.clear();
  console.log("Secret word:", secretWord);
}

submitBtn.addEventListener("click", evaluateGuess);
restartBtn.addEventListener("click", resetGame);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    evaluateGuess();
  }
});
