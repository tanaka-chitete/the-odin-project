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
    
    return getArray()[row][column];
  };

  const isFull = () => numValues >= (numRows ** 2);

  return {
    getArray,
    setValue,
    getValue,
    isFull
  };
}

function createGameController(
  player1Name = "Player 1", 
  player2Name = "Player 2"
) {
  const board = createBoard();
  let over = false;
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

  let currentPlayer = players[0];
  message = `${currentPlayer.name}'s turn`
  
  const playTurn = (row, column) => {
    if (!over) {
      board.setValue(row, column, currentPlayer.symbol);
      
      if (findTrio(currentPlayer.symbol)) {
        message = `${currentPlayer.name} wins!`;
        over = true;
      } else if (board.isFull()) {
        message = "It's a tie!";
        over = true;
      } else {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        message = `${currentPlayer.name}'s turn`
      }
    }
  };

  const getMessage = () => message;

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

    // Checks column 0
    if (isTrio(0, 1, 0, 0)) {
      return true;
    }

    // Checks column 1
    if (isTrio(0, 1, 1, 0)) {
      return true;
    }

    // Checks column 2
    if (isTrio(0, 1, 2, 0)) {
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

    return false;
  }

  return { 
    playTurn,
    getMessage,
    getBoard: board.getArray 
  };
}

function createDisplayController() {
  const gameController = createGameController();

  function updateDisplay() {
    const messageH1 = document.querySelector(".message__text");
    messageH1.textContent = gameController.getMessage();

    boardArray = gameController.getBoard();
    boardArray.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        const cellButton = document.querySelector(
          `.board__cell[data-row="${rowIndex}"][data-column="${columnIndex}"]`
        );

        cellButton.textContent = cellValue;
      });
    });
  }
  
  const cellButtons = [...document.querySelectorAll(".board__cell")];
  cellButtons.forEach((cellButton) => {
    cellButton.addEventListener("click", () => {
      gameController.playTurn(
        cellButton.dataset.row, 
        cellButton.dataset.column
      );
      updateDisplay();
    }, { 
      once: true // Prevents users from drawing on occupied cells
    });
  });

  const restartButton = document.querySelector(".restart__button");
  restartButton.addEventListener("click", () => createDisplayController());

  // Updates display for the first time
  updateDisplay();
}

createDisplayController();