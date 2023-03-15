const boardCells = document.querySelectorAll('.board-cell');
const currentPlayer = document.querySelector('#current-player');
const winner = document.querySelector('#winner');
const newGameBtn = document.querySelector('#new-game-btn');
let isHumanPlayerTurn = true;
// Define the game board as 1D array of empty strings
let board =  ["", "", "","", "", "","", "", ""];



// Add event listeners to each cell in the board
boardCells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
function handleCellClick(event) {
  if (winner.textContent !== '') return; // If the game has ended, do nothing

  const clickedCell = event.target;
  const cellIndex = clickedCell.id;
  
  // If the cell is already occupied, do nothing
  if (clickedCell.textContent !== '') return;

  // If it's the human player's turn, place an 'X' symbol in the clicked cell
  if (isHumanPlayerTurn) {
    clickedCell.textContent = 'X';
    currentPlayer.textContent = 'O';
    isHumanPlayerTurn = false;

    let url = `http://localhost:8080/api/BotMove`;
    let reqConfig ={
        method: "POST",
        headers:{ "Content-Type": "application/json;charset=UTF-8"},
        body:  JSON.stringify({board}) 
    };
     fetch(url,reqConfig)
    .then(response=> response.json())
    .then(data => {
        // Place an 'O' symbol in the bot's chosen cell
        let index = data.botIndex;
        let botCell = document.getElementById(index);
        botCell.textContent = 'O';
        currentPlayer.textContent = 'X';
        isHumanPlayerTurn = true;

        // Check if the game has ended
        checkGameEnd();
      });
  }
}
// Check if the game has ended
function checkGameEnd() {
  // Check for a winner
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (boardCells[a].textContent !== '' &&
        boardCells[a].textContent === boardCells[b].textContent &&
        boardCells[b].textContent === boardCells[c].textContent) {
      winner.textContent = boardCells[a].textContent + ' wins!';
      return;
    }
  }

  // Check for a tie
  const isBoardFull = Array.from(boardCells).every(cell => cell.textContent !== '');
  if (isBoardFull) {
    winner.textContent = 'It\'s a tie!';
  }
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
