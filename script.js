const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const winDialog = document.getElementById('win-dialog');
const winMessage = document.getElementById('win-message');
const closeDialogButton = document.getElementById('close-dialog');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      showWinDialog(`Player ${currentPlayer} wins!`);
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes('')) {
    showWinDialog("It's a draw!");
    gameActive = false;
  }
}

function showWinDialog(message) {
  winMessage.textContent = message;
  winDialog.classList.remove('hidden');
}

function closeWinDialog() {
  winDialog.classList.add('hidden');
  resetGame();
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Apply the neon color class
  if (currentPlayer === 'X') {
    cell.classList.add('x');
  } else {
    cell.classList.add('o');
  }

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'x', 'o');
  });
  closeWinDialog();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closeDialogButton.addEventListener('click', closeWinDialog);
