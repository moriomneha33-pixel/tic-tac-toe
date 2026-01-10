const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", cellClick);
});

function cellClick() {
  const index = this.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showResult(`🎉 Player ${currentPlayer} Wins!`);
      return;
    }
  }

  if (!board.includes("")) {
    showResult("😐 It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showResult(message) {
  gameActive = false;
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultText.textContent = message;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's Turn";

  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
}
