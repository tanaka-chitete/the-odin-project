const ZERO = "0";
const ONE = "1";
const TWO = "2";
const THREE = "3";
const FOUR = "4";
const FIVE = "5";
const SIX = "6";
const SEVEN = "7";
const EIGHT = "8";
const NINE = "9";
const DIVIDE = "÷";
const TIMES = "×";
const MINUS = "−";
const PLUS = "+";
const EQUALS = "=";
const CLEAR = "C";

function configureKeys() {
  let currentState = transitionToState0(PLUS, 0, 0);

  const keys = document.querySelectorAll(".keys *");
  keys.forEach(key => {
    key.addEventListener("click", function() {
      currentState = currentState.transition(this);
    });
  });
}

function configureDisplay() {
  const display = document.querySelector(".display");
  display.textContent = 0;
}

function updateDisplay(operand) {
  const display = document.querySelector(".display");
  display.textContent = operand.toString().slice(0, 9);
}

function updateOperand(operand, digit) {
  return (10 * operand) + Number(digit);
}

function evaluate(operation, operand1, operand2) {
  let result;
  switch (operation) {
    case DIVIDE:
      result = operand1 / operand2;
      break;
    case TIMES:
      result = operand1 * operand2;
      break;
    case MINUS:
      result = operand1 - operand2;
      break;
    case PLUS:
      result = operand1 + operand2;
      break;
    default:
      console.error(`Error: "${operation}" is an unrecognised operation`);
      result = Infinity;
  }

  return result;
}

function transitionToState0(operation, operand1, operand2) {
  console.log("state0");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
          this.operand1 = updateOperand(this.operand1, key.innerHTML);
          updateDisplay(this.operand1);
          nextTransition = transitionToState0;
          break;
        case DIVIDE:
          this.operation = key.innerHTML;
          nextTransition = transitionToState2;
          break;
        case TIMES:
        case MINUS:
        case PLUS:
          this.operation = key.innerHTML;
          nextTransition = transitionToState1;
          break;
        case EQUALS:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          nextTransition = transitionToState4;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          updateDisplay(0);
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function transitionToState1(operation, operand1, operand2) {
  console.log("state1");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
          this.operand2 = updateOperand(this.operand2, key.innerHTML);
          updateDisplay(this.operand2);
          nextTransition = transitionToState1;
          break;
        case DIVIDE:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState2;
          break;
        case TIMES:
        case MINUS:
        case PLUS:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState1;
          break;
        case EQUALS:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          nextTransition = transitionToState4;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          updateDisplay(0);
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function transitionToState2(operation, operand1, operand2) {
  console.log("state2");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
          nextTransition = transitionToState2;
          break;
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
          this.operand2 = updateOperand(this.operand2, key.innerHTML);
          updateDisplay(this.operand2);
          nextTransition = transitionToState3;
          break;
        case DIVIDE:
        case TIMES:
        case MINUS:
        case PLUS:
        case EQUALS:
          updateDisplay(NaN);
          nextTransition = transitionToError;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function transitionToState3(operation, operand1, operand2) {
  console.log("state3");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
          this.operand2 = updateOperand(this.operand2, key.innerHTML);
          updateDisplay(this.operand2);
          nextTransition = transitionToState3;
          break;
        case DIVIDE:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState2;
          break;
        case TIMES:
        case MINUS:
        case PLUS:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState1;
          break;
        case EQUALS:
          this.operand1 = evaluate(this.operation, this.operand1, 
            this.operand2);
          updateDisplay(this.operand1);
          nextTransition = transitionToState4;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function transitionToState4(operation, operand1, operand2) {
  console.log("state4");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
          this.operation = PLUS;
          this.operand1 = updateOperand(0, key.innerHTML);
          this.operand2 = 0;
          updateDisplay(this.operand1);
          nextTransition = transitionToState0;
          break;
        case DIVIDE:
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState2;
          break;
        case TIMES:
        case MINUS:
        case PLUS:
          this.operation = key.innerHTML;
          this.operand2 = 0;
          nextTransition = transitionToState1;
          break;
        case EQUALS:
          nextTransition = transitionToState4;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          updateDisplay(this.operand1);
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function transitionToError(operation, operand1, operand2) {
  console.log("error");
  return {
    operation: operation,
    operand1: operand1,
    operand2: operand2,
    transition (key) {
      let nextTransition;
      switch (key.innerHTML) {
        case ZERO:
        case ONE:
        case TWO:
        case THREE:
        case FOUR:
        case FIVE:
        case SIX:
        case SEVEN:
        case EIGHT:
        case NINE:
        case DIVIDE:
        case TIMES:
        case MINUS:
        case PLUS:
        case EQUALS:
          nextTransition = transitionToError;
          break;
        case CLEAR:
          this.operation = PLUS;
          this.operand1 = 0;
          this.operand2 = 0;
          updateDisplay(0);
          nextTransition = transitionToState0;
          break;
        default:
          console.error(`Error: "${key.innerHTML}" is an unrecognised key`);
          nextTransition = transitionToError;
          break;
      };

      return nextTransition(this.operation, this.operand1, this.operand2);
    }
  };
}

function main() {
  configureKeys();
  configureDisplay();
}

main();