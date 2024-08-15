const board = (function() {
  function createCell() {
    let symbol = "";

    const drawSymbol = (player) => symbol = player;

    const getSymbol = () => symbol;

    return {
      drawSymbol,
      getSymbol,
    };
  }

  const rows = 3;
  const board = [];
  
  for (let i = 0; i < rows; i++) {
    board[i] = new Array();
    for (let j = 0; j < columns; j++) {
      board[i].push(createCell());
    }
  }

  const getBoard = () => board;

  const getCell = (row, column) => getBoard()[row][column];

  const drawSymbol = (row, column, symbol) => {
    // A symbol has already been drawn in this cell
    if (board[row][column]) {
      return false;
    }

    board[row][column] = symbol;

    return true;
  };

  
  return {
    getBoard,
    getCell,
    drawSymbol
  };
})();

function createPlayer(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  
  const getName = () => name;
  
  const getSymbol = () => symbol;
  
  return {
    getName,
    getSymbol
  };
}

const controller = (function(board, player1, player2) {
  // create player objects here
  // Do they even need to be their own module?
  // Make this an IIFE (rename to Controller)
  let activePlayer = player1;
  
  function switchPlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  function getActivePlayer() {
    return activePlayer;
  }
  
  function startRound() {
    console.log(board.getBoard());
    console.log(`${getActivePlayer().getName()}'s turn.`);
  }
  
  const playRound = (row, column) => {
    if (board.drawSymbol(row, column, getActivePlayer().getSymbol())) {
      console.log(`Drew ${getActivePlayer().getSymbol()}'s symbol at (${column}, ${row})`);
    } else {
      console.log(`Invalid move ${getActivePlayer().getName()}!`)
      startRound();
      return false;
    }
    
    if (determineWinner(row, column)) {
      console.log(`${getActivePlayer().getName()} wins!`);
      return true;
    } else {
      switchPlayer();
      startRound();
      return false;
    }
  };
  
  function determineWinner() { // TODO: Refactor this mess
    function checkRow(row) {
      return (
        board.getCell(row, 0).getSymbol() === board.getCell(row, 1).getSymbol() &&
        board.getCell(row, 1).getSymbol() === board.getCell(row, 2).getSymbol()
      );
    }
  
    function checkColumn(column) {
      return (
        board.getCell(0, column).getSymbol() === board.getCell(1, column).getSymbol() && 
        board.getCell(1, column).getSymbol() === board.getCell(2, column).getSymbol()
      );
    }
  
    function checkDiagonal(startRow, step) {
      return (
        board.getCell(startRow, 0).getSymbol() === board.getCell(startRow + step, 1).getSymbol() &&
        board.getCell(startRow + step, 1).getSymbol() === board.getCell(startRow + step + step, 1).getSymbol()
      )
    }

    if (checkRow(0)) {
      return true;
    }

    if (checkRow(1)) {
      return true;
    }

    if (checkRow(2)) {
      return true;
    }

    if (checkColumn(0)) {
      return true;
    }

    if (checkColumn(1)) {
      return true;
    }

    if (checkColumn(2)) {
      return true;
    }

    if (checkDiagonal(0, 1)) {
      return true;
    }

    if (checkDiagonal(2, -1)) {
      return true;
    }
  }
  
  return {
    playRound,
    getActivePlayer
  };
})(board, player1, player2);


while (true) {

}
// controller = createController(Players, board)
// controller.playRound() should return a boolean indicating the winner? if any?
// have doWhile loop which represents the game