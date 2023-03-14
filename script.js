const apiEndpoint = "/api/move";
const squares = document.querySelectorAll(".square");
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let turn = "X";
let gameOver = false;

function displayBoard() {
  for (let i = 0; i < squares.length; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    squares[i].textContent = board[row][col];
  }
}

function makeMove(square) {
  if (gameOver) {
    return;
  }
  let index = square.id.split("-")[1];
  let row = Math.floor(index / 3);
  let col = index % 3;
  if (board[row][col] !== "") {
    return;
  }
  board[row][col] = turn;
  square.textContent = turn;
  checkWinner();
  if (!gameOver) {
    getComputerMove();
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      gameOver = true;
      alert(board[i][0] + " wins!");
      return;
    }
    if (board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      gameOver = true;
      alert(board[0][i] + " wins!");
      return;
    }
  }
  if (board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    gameOver = true;
    alert(board[0][0] + " wins!");
    return;
  }
  if (board[0][2] !== "" && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    gameOver = true;
    alert(board[0][2] + " wins!");
    return;
  }
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }
  if (isDraw) {
    gameOver = true;
    alert("It's a draw!");
  }
}

function getComputerMove() {
  fetch("http://localhost:8080/api/bot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(board)
  })
    .then(response => response.json())
    .then(data => {
      let row = data.row;
      let col = data.col;
      board[row][col] = "O";
      let squareIndex = row * 3 + col;
      let square = squares[squareIndex];
      square.textContent = "O";
      checkWinner();
    });
}

squares.forEach(square => {
  square.addEventListener("click", () => {
    makeMove(square);
  });
});

displayBoard();
