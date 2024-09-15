let board = document.getElementById('board');
let cells = document.querySelectorAll('.cell');
let xScoreDisplay = document.getElementById('xScore');
let oScoreDisplay = document.getElementById('oScore');
let currentPlayer = 'X';
let autoplayInterval;
let autoplayEnabled = false;
let xScore = 0;
let oScore = 0;
let winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

function startAutoplay() {
  if (!autoplayEnabled) {
    autoplayEnabled = true;
    autoplayInterval = setInterval(computerMove, 500);
  }
}

function stopAutoplay() {
  autoplayEnabled = false;
  clearInterval(autoplayInterval);
}

function computerMove() {
  let emptyCells = Array.from(cells).filter(cell => !cell.textContent);
  if (emptyCells.length === 0) return;
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = currentPlayer;
  checkWinner();
  togglePlayer();
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  for (let combo of winningCombos) {
    let [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      if (currentPlayer === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
      } else {
        oScore++;
        oScoreDisplay.textContent = oScore;
      }
      setTimeout(() => {
        alert(`${cells[a].textContent} wins!`);
        resetBoard();
      }, 100);
      return;
    }
  }
  if (!Array.from(cells).some(cell => !cell.textContent)) {
    alert("It's a tie!");
    resetBoard();
  }
}

function resetScores() {
  xScore = 0;
  oScore = 0;
  xScoreDisplay.textContent = xScore;
  oScoreDisplay.textContent = oScore;
}

function resetGame() {
  resetScores();
  stopAutoplay();
  resetBoard();
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  currentPlayer = 'X';
}

board.addEventListener('click', function(event) {
  if (autoplayEnabled) return;
  if (event.target.classList.contains('cell') && !event.target.textContent) {
    event.target.textContent = currentPlayer;
    checkWinner();
    togglePlayer();
    if (autoplayEnabled) {
      setTimeout(computerMove, 500);
    }
  }
});
