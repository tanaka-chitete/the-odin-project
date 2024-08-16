const board = (function() {
  const rows = 3;
  const array = [];
  let numSymbols = 0;
  
  for (let i = 0; i < rows; i++) {
    array[i] = new Array();
    for (let j = 0; j < rows; j++) {
      array[i].push(undefined);
    }
  }

  const getArray = () => array;

  const getCell = (row, column) => {
    if (row >= 3 || column >= 3) {
      return undefined;
    }
    
    getArray()[row][column];
  };

  const isFull = () => numSymbols >= 9;

  const drawSymbol = (row, column, symbol) => {
    if (array[row][column]) {
      return false;
    }

    array[row][column] = symbol;
    numSymbols++;
  };

  return {
    getArray,
    getCell,
    isFull,
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

const view = (function() {
  const displayArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j]) {
          console.log(array[i][j]);
          const cell = document.querySelector(`.board__cell[data-row="${i}"][data-column="${j}"]`);
          console.log(cell);
          const symbol = document.createElement("p");
          symbol.setAttribute("class", "board__cell-symbol");
          symbol.textContent = array[i][j];
          console.log(symbol);
          cell.appendChild(symbol);
        }
      }
    }
  };

  return { displayArray };
})();

const controller = (function(board, player1, player2, view) {
  let activePlayer = player1;
  
  function switchPlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  function getActivePlayer() {
    return activePlayer;
  }
  
  const playRound = (row, column) => {
    if (!board.getCell(row, column)) {
      board.drawSymbol(row, column, getActivePlayer().getSymbol());
      console.log(`Drew ${getActivePlayer().getName()}'s symbol.`);
      view.displayArray(board.getArray());

      if (determineWinner(getActivePlayer())) { // TODO: Check if specific player won!
        console.log(`${getActivePlayer().getName()} wins!`);
        return true;
      }
      
      if (board.isFull()) {
        console.log("It's a tie!");
        return true;
      }

      switchPlayer();
      console.log(`${getActivePlayer().getName()}'s turn.`);
      return false;
    } else {
      console.log(`That square is taken, ${getActivePlayer().getName()}!`);
      return false;
    }
  };

  const startGame = () => {
    let end;
    do {
      // THIS PROMPT IS PREVENTING THE DOM FROM UPDATING
      const row = Number(prompt("Row to draw symbol: ")); // TODO: Implement error-handling
      const column = Number(prompt("Column to draw symbol: ")); // TODO: Implement error-handling
      end = playRound(row, column);
    } while(!end);
  }

  function determineWinner(symbol) { // TODO: Refactor this mess
    function checkRow(row) {
      return (
        board.getCell(row, 0) === symbol &&
        board.getCell(row, 1) === symbol &&
        board.getCell(row, 2) === symbol
      );
    }
  
    function checkColumn(column) {
      return (
        board.getCell(0, column) === symbol && 
        board.getCell(1, column) === symbol && 
        board.getCell(2, column) === symbol
      );
    }
  
    function checkDiagonal(startRow, step) {
      return (
        board.getCell(startRow, 0) === symbol &&
        board.getCell(startRow + step, 1) === symbol &&
        board.getCell(startRow + step + step, 2) === symbol
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
})(board, createPlayer("player1", "x"), createPlayer("player2", "o"), view);