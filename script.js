// these lines select DOM elements: the game board , all cell elements and score displays for X and O player
let board = document.getElementById('board');
let cells = document.querySelectorAll('.cell');
let xScoreDisplay = document.getElementById('xScore');
let oScoreDisplay = document.getElementById('oScore');

// Here, we initialize variables for the current player, autoplay functionality, and scores.
let currentPlayer = 'X';
let autoplayInterval;
let autoplayEnabled = false;    // Sets the initial state of autoplay to disabled. 

// Initialize scores for both players to zero.
let xScore = 0;
let oScore = 0;

// This array defines all possible winning combinations in Tic-Tac-Toe.
let winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

// Starts autoplay if not already enabled, setting an interval for computer moves.
function startAutoplay() {
  if (!autoplayEnabled) {
    autoplayEnabled = true;
    autoplayInterval = setInterval(computerMove, 500);
  }
}

// Stops autoplay by clearing the interval and disabling the flag.
function stopAutoplay() {
  autoplayEnabled = false;
  clearInterval(autoplayInterval);
}

// Makes a random move for the computer by selecting an empty cell.
function computerMove() {
  let emptyCells = Array.from(cells).filter(cell => !cell.textContent);
  if (emptyCells.length === 0) return;
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = currentPlayer;
  checkWinner();
  togglePlayer();
}

// Switches the current player between 'X' and 'O'.
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Checks for a winner or tie, updates scores, and resets the board if the game is over.
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


// Resets both players' scores to zero and updates the display.
function resetScores() {
  xScore = 0;
  oScore = 0;
  xScoreDisplay.textContent = xScore;
  oScoreDisplay.textContent = oScore;
}

// Completely resets the game, including scores, autoplay, and board.
function resetGame() {
  resetScores();
  stopAutoplay();
  resetBoard();
}

// Clears the board, removes winner highlights, and resets the current player to 'X'.
function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  currentPlayer = 'X';
}

// Handles player moves when a cell is clicked, updates game state, and triggers computer move if autoplay is enabled.
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
