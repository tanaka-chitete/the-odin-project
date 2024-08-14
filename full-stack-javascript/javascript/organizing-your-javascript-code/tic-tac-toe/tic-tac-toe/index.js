const Board = (function() {
  // Allows for drawing xs and os
  // Make method for draw x and draw 0?
  // or just draw?
  // Make this an IIFE (rename to Board)
  function createCell() {
    let symbol = "";

    const drawSymbol = (player) => {
      value = player;
    }

    const getSymbol = () => symbol;

    return {
      drawSymbol,
      getSymbol,
    }
  };

  const rows = 3;
  const board = [];
  
  for (let i = 0; i < rows; i++) {
    board[i] = new Array();
    for (let j = 0; j < columns; j++) {
      board[i].push(createCell())
    }
  }

  const getBoard = () => board;

  const drawSymbol = (row, column, symbol) => {
    // TODO
    // return whether the symbol was drawn
    // then later, don't allow the player to switch until a valid move has been made
    if (board[row][column]) {
      return false;
    }

    board[row][column] = symbol;

    return true;
  }

  return {
    getBoard,
    drawSymbol
  }
})();

const Players = (function(player1Name, player2Name) {
  // Make this an IIFE? (rename to Players, Players.player1, Players.player2)
  // that's probably just forcing yourself to use IIFEs
  // Remember, it's one thing adding a tool to your toolkit, its another
  // knowing when to use it
  // BUT WE ONLY WANT TWO PLAYERS!
  const players = [
    {
      name: player1Name,
      symbol: "x"
    },
    {
      name: player2Name,
      symbol: "o"
    }
  ]

  const getPlayer1 = () => players[0];

  const getPlayer2 = () => players[1];

  return {
    getPlayer1,
    getPlayer2
  }
})("Player 1", "Player 2");

const Controller = (function(Board, Players) {
  // create player objects here
  // Do they even need to be their own module?
  // Make this an IIFE (rename to Controller)
  let activePlayer = Players.getPlayer1();

  const switchPlayer = () => {
    activePlayer = activePlayer === Players.getPlayer1() ? Players.getPlayer2() : Players.getPlayer1();
  }

  const getActivePlayer = () => activePlayer;

  const startRound = () => {
    console.log(Board.getBoard());
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    if (Board.drawSymbol(row, column, getActivePlayer().symbol)) {
      console.log(`Drew ${getActivePlayer().name}'s symbol at (${column}, ${row})`);
    } else {
      console.log(`Invalid move ${getActivePlayer().name}!`)
      startRound();
      return false;
    }

    if (Board.checkWinner(row, column)) {
      console.log(`${winningPlayer} wins!`);
      return true;
    } else {
      switchPlayer();
      startRound();
      return false;
    }
  }

  return {
    playRound,
    getActivePlayer
  }
})(Board, Players);



// controller = createController(Players, Board)
// controller.playRound() should return a boolean indicating the winner? if any?
// have doWhile loop which represents the game