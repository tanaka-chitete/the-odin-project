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

  const drawSymbol = (row, column, symbol) => {
    // A symbol has already been drawn in this cell
    if (board[row][column]) {
      return false;
    }

    board[row][column] = symbol;

    return true;
  };

  const determineWinner = () => {
    // checkRow
    // checkColumn
    // checkDiagonal
    function checkRow(row) {
      return (
        getBoard()[row][0].getSymbol() === getBoard()[row][1].getSymbol() &&
        getBoard()[row][1].getSymbol() === getBoard()[row][2].getSymbol()
      );
    }

    function checkColumn(column) {
      return (
        getBoard()[0][column].getSymbol() === getBoard()[1][column].getSymbol() &&
        getBoard()[1][column].getSymbol() === getBoard()[2][column].getSymbol()
      );
    }

    function checkDiagonal(startRow, step) {
      return (
        getBoard()[startRow][0].getSymbol() === getBoard()[startRow + step][1].getSymbol() &&
        getBoard()[startRow + step][1].getSymbol() === getBoard()[startRow + step + step][1].getSymbol()
      )
    }
  };

  return {
    getBoard,
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

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => activePlayer;

  const startRound = () => {
    console.log(board.getBoard());
    console.log(`${getActivePlayer().getName()}'s turn.`);
  };

  const playRound = (row, column) => {
    if (board.drawSymbol(row, column, getActivePlayer().getSymbol())) {
      console.log(`Drew ${getActivePlayer().getSymbol()}'s symbol at (${column}, ${row})`);
    } else {
      console.log(`Invalid move ${getActivePlayer().getName()}!`)
      startRound();
      return false;
    }

    if (board.determineWinner(row, column)) {
      console.log(`${getActivePlayer().getName()} wins!`);
      return true;
    } else {
      switchPlayer();
      startRound();
      return false;
    }
  };

  return {
    playRound,
    getActivePlayer
  };
})(board, player1, player2);



// controller = createController(Players, board)
// controller.playRound() should return a boolean indicating the winner? if any?
// have doWhile loop which represents the game