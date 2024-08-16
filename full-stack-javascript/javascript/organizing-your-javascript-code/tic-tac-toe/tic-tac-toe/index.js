function createBoard() {
  const numRows = 3;
  const array = [];
  let size = 0;
  
  for (let i = 0; i < numRows; i++) {
    array[i] = new Array();
    for (let j = 0; j < numRows; j++) {
      array[i].push("");
    }
  }

  const getArray = () => array;

  const setValue = (row, column, value) => {
    if (row >= numRows || column >= numRows) {
      return false;
    }

    if (array[row][column]) {
      return false;
    }

    array[row][column] = value;
    size++;
  };

  const getValue = (row, column) => {
    if (row >= numRows || column >= numRows) {
      return "";
    }
    
    getArray()[row][column];
  };

  const isFull = () => size >= 9;

  return {
    getArray,
    setValue,
    getValue,
    isFull
  };
}

function createController() {
  let activePlayer = player1;
  
  function switchPlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  function getActivePlayer() {
    return activePlayer;
  }
  
  const playRound = (row, column) => {
    if (!board.getValue(row, column)) {
      board.setValue(row, column, getActivePlayer().getSymbol());
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
        board.getValue(row, 0) === symbol &&
        board.getValue(row, 1) === symbol &&
        board.getValue(row, 2) === symbol
      );
    }
  
    function checkColumn(column) {
      return (
        board.getValue(0, column) === symbol && 
        board.getValue(1, column) === symbol && 
        board.getValue(2, column) === symbol
      );
    }
  
    function checkDiagonal(startRow, step) {
      return (
        board.getValue(startRow, 0) === symbol &&
        board.getValue(startRow + step, 1) === symbol &&
        board.getValue(startRow + step + step, 2) === symbol
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
    startGame 
  };
}