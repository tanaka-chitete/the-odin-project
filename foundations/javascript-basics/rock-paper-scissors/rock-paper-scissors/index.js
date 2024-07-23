"use strict";

function getComputerChoice() {
  let computerChoice;
  const num = Math.floor(Math.random() * 3);
  switch (num) {
    case 0:
      computerChoice = "rock";
      break;
    case 1:
      computerChoice = "paper";
      break;
    default:
      computerChoice = "scissors";
      break;
  }

  return computerChoice;
}

function getHumanChoice() {
  let humanChoice = prompt("Enter your choice: ").toLowerCase();
  if (humanChoice !== "rock" || 
    humanChoice !== "paper" || 
    humanChoice !== "scissors") {
    humanChoice = "rock";
  }

  return humanChoice;
}

function setupGame() {
  let humanScore = 0;
  let computerScore = 0;

  const playRound = (humanChoice, computerChoice) => {
    const score = document.querySelector(".score");
    const message = document.querySelector(".message");

    switch (humanChoice) {
      case "rock":
        switch (computerChoice) {
          case "rock":
            message.textContent = "It's a tie!";
            break;
          case "paper":
            message.textContent = "You lost the round!";
            computerScore++;
            break;
          default:
            message.textContent = "You won the round!";
            humanScore++;
            break;
        }
        break;
      case "paper":
        switch (computerChoice) {
          case "rock":
            message.textContent = "You won the round!";
            humanChoice++;
            break;
          case "paper":
            message.textContent = "It's a tie!";
            break;
          default:
            message.textContent = "You lost the round!";
            computerScore++;
            break;
        }
        break; 
      default:
        switch (computerChoice) {
          case "rock":
            message.textContent = "You lost the round!";
            computerScore++;
            break;
          case "paper":
            message.textContent = "You won the round!";
            humanScore++;
            break;
          default:
            message.textContent = "It's a tie!";
            break;
        }
        break;
    }

    score.textContent = `${humanScore} - ${computerScore}`;

    if (humanScore === 5) {
      message.textContent = "You won the game!";
      humanScore = 0;
      computerScore = 0;
    } else if (computerScore === 5) {
      message.textContent = "You lost the game!";
      humanScore = 0;
      computerScore = 0;
    }
  }

  const choices = document.querySelectorAll("button");
  choices.forEach(choice => {
    choice.addEventListener("click", () => {
      playRound(choice.textContent.toLowerCase(), getComputerChoice());
    })
  });
}

setupGame();