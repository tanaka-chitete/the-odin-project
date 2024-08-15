const board = (function() {
  function createCell() {
    let symbol = undefined;

    const drawSymbol = (inSymbol) => symbol = inSymbol;

    const getSymbol = () => symbol;

    return {
      drawSymbol,
      getSymbol,
    };
  }

  const rows = 3;
  const board = [];
  let numSymbols = 0;
  
  for (let i = 0; i < rows; i++) {
    board[i] = new Array();
    for (let j = 0; j < rows; j++) {
      board[i].push(createCell());
    }
  }

  const getBoard = () => board;

  const getCell = (row, column) => getBoard()[row][column];

  const printBoard = () => {
    console.table(getBoard().map((row) => row.map((cell) => cell.getSymbol())));
  }

  const isFull = () => numSymbols >= 9;

  const drawSymbol = (row, column, symbol) => {
    if (board[row][column].getSymbol()) {
      return false;
    }

    board[row][column].drawSymbol(symbol);
    numSymbols++;
  };

  return {
    getBoard,
    getCell,
    isFull,
    printBoard,
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
  let activePlayer = player1;
  
  function switchPlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  function getActivePlayer() {
    return activePlayer;
  }
  
  const playRound = (row, column) => {
    if (!board.getCell(row, column).getSymbol()) {
      board.drawSymbol(row, column, getActivePlayer().getSymbol());
      console.log(`Drew ${getActivePlayer().getName()}'s symbol.`);
      board.printBoard();

      if (determineWinner(getActivePlayer().getSymbol())) { // TODO: Check if specific player won!
        console.log(`${getActivePlayer().getName()} wins!`);
        return true;
      } else if (board.isFull()) {
        console.log("It's a tie!");
        return true;
      } else {
        switchPlayer();
        console.log(`${getActivePlayer().getName()}'s turn.`);
        return false;
      }
    } else {
      console.log(`That square is taken, ${getActivePlayer().getName()}!`);
      return false;
    }
  };

  const startGame = () => {
    let end;
    do {
      const row = Number(prompt("Row to draw symbol: ")); // TODO: Implement error-handling
      const column = Number(prompt("Column to draw symbol: ")); // TODO: Implement error-handling
      end = playRound(row, column);
    } while(!end);
  }

  function determineWinner(symbol) { // TODO: Refactor this mess
    function checkRow(row) {
      return (
        board.getCell(row, 0).getSymbol() === symbol &&
        board.getCell(row, 1).getSymbol() === symbol &&
        board.getCell(row, 2).getSymbol() === symbol
      );
    }
  
    function checkColumn(column) {
      return (
        board.getCell(0, column).getSymbol() === symbol && 
        board.getCell(1, column).getSymbol() === symbol && 
        board.getCell(2, column).getSymbol() === symbol
      );
    }
  
    function checkDiagonal(startRow, step) {
      return (
        board.getCell(startRow, 0).getSymbol() === symbol &&
        board.getCell(startRow + step, 1).getSymbol() === symbol &&
        board.getCell(startRow + step + step, 2).getSymbol() === symbol
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
  
  return { startGame };
})(board, createPlayer("player1", "x"), createPlayer("player2", "o"));
