const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
const startGameButton = document.getElementById('startGame');
const playerNamesInput = document.getElementById('playerNames');
const gameBoard = document.getElementById('gameBoard');
const welcomeMessage = document.getElementById('welcomeMessage');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopupButton = document.getElementById('closePopup');
let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameActive = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

startGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
closePopupButton.addEventListener('click', closePopup);

function startGame() {
  player1Name = document.getElementById('player1').value || 'Player 1';
  player2Name = document.getElementById('player2').value || 'Player 2';
  
  welcomeMessage.style.display = 'none';
  playerNamesInput.style.display = 'none';
  gameBoard.style.display = 'block';
  gameActive = true;
  currentPlayer = 'X';
  statusText.innerText = `${player1Name}'s turn (X)`;
  
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  
  boardState = ['', '', '', '', '', '', '', '', ''];
}

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] !== '' || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    endGame(false);
  } else if (boardState.every(cell => cell !== '')) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn (${currentPlayer})`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => boardState[index] === currentPlayer);
  });
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    statusText.innerText = "It's a draw!";
    winnerMessage.innerText = "It's a draw!";
  } else {
    const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
    statusText.innerText = `${winnerName} wins!`;
    winnerMessage.innerText = `${winnerName} wins!`;
  }
  
  winnerPopup.style.display = 'flex';
  createConfetti();
  createBalloons();
  restartButton.style.display = 'inline-block';
}

function closePopup() {
  winnerPopup.style.display = 'none';
  removeCelebrationEffects();
}

function restartGame() {
  startGame();
  winnerPopup.style.display = 'none';
  restartButton.style.display = 'none';
  removeCelebrationEffects();
}

// Confetti effect
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    document.body.appendChild(confetti);
  }
}

// Balloons effect
function createBalloons() {
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    balloon.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(balloon);
  }
}

// Remove confetti and balloons after celebration
function removeCelebrationEffects() {
  document.querySelectorAll('.confetti').forEach(el => el.remove());
  document.querySelectorAll('.balloon').forEach(el => el.remove());
}
 