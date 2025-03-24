/**
 * Takes a string and returns it with the first character capitalised.
 * @param {String} string
 * @returns {String}
 */
export function capitalise(string) {
  return !string ? "" : string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Takes a string and returns it reversed.
 * @param {String} string
 * @returns {String}
 */
export function reverseString(string) {
  if (!string) {
    return "";
  }

  let newString = "";

  for (let character of string) {
    newString = character + newString;
  }

  return newString;
}

export var Calculator = {
  add(number1, number2) {
    return number1 + number2;
  },

  subtract(number1, number2) {
    return number1 - number2;
  },

  divide(number1, number2) {
    if (number2 === 0) {
      return undefined;
    }

    // Prevents the return of -0
    return number1 / number2 === -0 ? 0 : number1 / number2;
  },

  multiply(number1, number2) {
    // Prevents the return of -0
    return number1 * number2 === -0 ? 0 : number1 * number2;
  },
};
