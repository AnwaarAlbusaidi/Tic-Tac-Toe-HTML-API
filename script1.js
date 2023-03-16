const boardCells = document.querySelectorAll('.board-cell');
const currentPlayer = document.querySelector('#current-player');
const winner = document.querySelector('.winner');
const newGameBtn = document.querySelector('#new-game-btn');
let isHumanPlayerTurn = true;
currentPlayer.textContent = 'X';
winner.textContent = '';
// Define the game board as 1D array of empty strings
let board =  ["", "", "","", "", "","", "", ""];


// Add event listeners to each cell in the board
boardCells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
async function handleCellClick(event) {
  if (winner.textContent !== '') return; // If the game has ended, do nothing

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
  console.log(winner) ;
  console.log(winner.textContent) ;
  console.log(" checkGameEnd() is called after player");

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

// Check if the game has ended
function checkGameEnd() {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  let winnerSymbol = '';

  for (let i = 0; i < winningPatterns.length; i++) {
    let [a, b, c] = winningPatterns[i];
    if (boardCells[a].textContent !== '' &&
        boardCells[a].textContent === boardCells[b].textContent &&
        boardCells[b].textContent === boardCells[c].textContent) {
          winnerSymbol = boardCells[a].textContent;
          break;
    }
  }

  if (winnerSymbol !== '') {
    if (winnerSymbol === 'O') {
      winner.textContent =' player O wins!';
    } else {
      winner.textContent =' Player X wins!';
    }
  } else if (isBoardFull()) {
    winner.textContent = "It's a tie!";
  }
  winner.style.display = 'block';
}

function isBoardFull() {
  for (let i = 0; i < boardCells.length; i++) {
    if (boardCells[i].textContent === '') {
      return false; // If any cell is empty, the board is not full
    }
  }
  return true; // If no empty cells are found, the board is full
}


// Add event listener to the new game button
newGameBtn.addEventListener('click', () => {
  boardCells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer.textContent = 'X';
  winner.textContent = '';
  isHumanPlayerTurn = true;
});
