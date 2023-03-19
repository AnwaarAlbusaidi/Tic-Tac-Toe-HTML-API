// Get all board cells, current player display, winner display, and new game button
const boardCells = document.querySelectorAll('.board-cell');
const currentPlayer = document.querySelector('#current-player');
const winner = document.querySelector('.winner');
const newGameBtn = document.querySelector('#new-game-btn');

// Set initial values
let isHumanPlayerTurn = true;
currentPlayer.textContent = 'X';
winner.textContent = '';

// Define the game board as 1D array of empty strings
let board = ["", "", "","", "", "","", "", ""];

// Add event listeners to each cell in the board
boardCells.forEach(cell => {
cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
async function handleCellClick(event) {
// If the game has ended, do nothing
if (winner.textContent !== '') return;

const clickedCell = event.target;
const cellIndex = clickedCell.id;

// If the cell is already occupied, do nothing
if (clickedCell.textContent !== '') return;

// If it's the human player's turn, place an 'X' symbol in the clicked cell
if (isHumanPlayerTurn) {
clickedCell.textContent = 'X';
isHumanPlayerTurn = false;

  // Update the board array
board[cellIndex] = 'X';

// Check if the game has ended
checkGameEnd();

// If the game has ended, return
if (winner.textContent !== '') return;

// Otherwise, it's the bot's turn
let url = `http://localhost:8080/api/BotMove`;
let reqConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
  body: JSON.stringify({ board })
};

// Ask the API for a valid index until one is returned
let foundValidIndex = false;
let index;
while (!foundValidIndex) {
  await fetch(url, reqConfig)
    .then(response => response.json())
    .then(data => {
      index = data.botIndex;
    });

  // Check if the returned index is valid
  let botCell = document.getElementById(index);
  if (botCell.textContent === '') {
    foundValidIndex = true;
  }
}

// Place an 'O' symbol in the bot's chosen cell
let botCell = document.getElementById(index);
botCell.textContent = 'O';
isHumanPlayerTurn = true;

// Update the board array
board[index] = 'O';

// Check if the game has ended
checkGameEnd();

  console.log(" checkGameEnd() is called after bot play");
  console.log(board);
}

}

// This function checks if the game has ended by iterating through all possible winning patterns
// in tic-tac-toe (rows, columns, and diagonals) and comparing the values of the cells in each pattern.
// If all three cells in a pattern have the same value (either X or O), that player has won the game.
// If no player has won and the board is full (i.e. there are no more empty cells), the game is a tie.
function checkGameEnd() {
  // Define all possible winning patterns
  const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  // Initialize the winner symbol as an empty string
  let winnerSymbol = '';
  
  // Iterate through all possible winning patterns
  for (let i = 0; i < winningPatterns.length; i++) {
  let [a, b, c] = winningPatterns[i];
  // If all three cells in the pattern have the same non-empty value, we have a winner
  if (boardCells[a].textContent !== '' &&
  boardCells[a].textContent === boardCells[b].textContent &&
  boardCells[b].textContent === boardCells[c].textContent) {
  // Record the winner's symbol (either X or O)
  winnerSymbol = boardCells[a].textContent;
  break;
  }
  }
  
  // If we have a winner, display the winner message
  if (winnerSymbol !== '') {
  if (winnerSymbol === 'O') {
  winner.textContent =' player O wins!';
  } else {
  winner.textContent =' Player X wins!';
  }
  }
  // If there is no winner and the board is full, the game is a tie
  else if (isBoardFull()) {
  winner.textContent = "It's a tie!";
  }
  
  // Show the winner message
  winner.style.display = 'block';
  }
  
  // This function checks if the board is full by iterating through all cells and checking if any are empty.
  // If an empty cell is found, the board is not full.
  function isBoardFull() {
  for (let i = 0; i < boardCells.length; i++) {
  if (boardCells[i].textContent === '') {
  return false; // If any cell is empty, the board is not full
  }
  }
  return true; // If no empty cells are found, the board is full
  }
  
  // This function resets the game by clearing all cells, resetting the current player to X,
  // and hiding the winner message. It is triggered when the "New Game" button is clicked.
  newGameBtn.addEventListener('click', () => {
  boardCells.forEach(cell => {
  cell.textContent = '';
  });
  currentPlayer.textContent = 'X';
  winner.textContent = '';
  isHumanPlayerTurn = true;
  board = ["", "", "","", "", "","", "", ""];
  });