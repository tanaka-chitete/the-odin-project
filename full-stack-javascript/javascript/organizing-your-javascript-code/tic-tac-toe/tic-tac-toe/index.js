function createBoard() {
  const numRows = 3;
  const array = [];
  let numValues = 0;
  
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
    numValues++;
  };

  const getValue = (row, column) => {
    if (row >= numRows || column >= numRows) {
      return "";
    }
    
    getArray()[row][column];
  };

  const isFull = () => numValues >= (numRows ** 2);

  return {
    getArray,
    setValue,
    getValue,
    isFull
  };
}

function createController(player1Name = "Player 1", player2Name = "Player 2") {
  const board = createBoard();

  const players = [
    {
      name: player1Name,
      symbol: "x"
    },
    {
      name: player2Name,
      symbol: "o"
    }
  ];

  let activePlayer = players[0];
  
  function changeTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  
  const getActivePlayer = () => activePlayer;

  const startTurn = () => {
    console.table(board.getArray());
    console.log(`${getActivePlayer().name}'s turn.`);
  }
  
  const playTurn = (row, column) => {
    board.setValue(row, column, getActivePlayer().symbol);
    view.displayArray(board.getArray());
    console.log(`Drew ${getActivePlayer().name}'s symbol at row ${row}, column ${column}.`);
    
    if (findTrio(getActivePlayer().symbol)) {
      console.log(`${getActivePlayer().name} wins!`);
    }
    
    if (board.isFull()) {
      console.log("It's a tie!");
    }
    
    changeTurn();
    startTurn();
  };

  function findTrio(symbol) {
    function isTrio(row, rowStep, column, columnStep) {
      return (
        board.getValue(row, column) === symbol &&
        board.getValue(row + rowStep, column + columnStep) === symbol &&
        board.getValue(row + (2 * rowStep), column + (2 * columnStep)) === symbol
      );
    }

    // Checks row 0
    if (isTrio(0, 0, 0, 1)) {
      return true;
    }

    // Checks row 1
    if (isTrio(1, 0, 0, 1)) {
      return true;
    }

    // Checks row 2
    if (isTrio(2, 0, 0, 1)) {
      return true;
    }

    // Checks column 1
    if (isTrio(0, 1, 0, 0)) {
      return true;
    }

    // Checks column 2
    if (isTrio(0, 2, 0, 0)) {
      return true;
    }

    // Checks column 3
    if (isTrio(0, 3, 0, 0)) {
      return true;
    }

    // Checks top-left to bottom-right diagonal
    if (isTrio(0, 1, 0, 1)) {
      return true;
    }

    // Checks bottom-left to top-right diagonal
    if (isTrio(2, -1, 0, 1)) {
      return true;
    }
  }

  return { 
    playTurn,
    getCurrentPlayer,
    getBoard: board.getBoard 
  };
}