const LENGTH_OF_ENGLISH_ALPHABET = 26;
const ASCII_CODE_FOR_FIRST_LOWER_CASE_LETTER = 97;
const ASCII_CODE_FOR_FIRST_UPPERCASE_LETTER = 65;

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

/**
 * Represents a basic calculator.
 */
export var Calculator = {
  /**
   * Adds two numbers
   * @param {Number} number1
   * @param {Number} number2
   * @returns {Number}
   */
  add(number1, number2) {
    return number1 + number2;
  },

  /**
   * Subtracts two numbers
   * @param {Number} number1
   * @param {Number} number2
   * @returns {Number}
   */
  subtract(number1, number2) {
    return number1 - number2;
  },

  /**
   * Divides two numbers.
   * @param {Number} number1
   * @param {Number} number2
   * @returns {Number}
   */
  divide(number1, number2) {
    if (number2 === 0) {
      return undefined;
    }

    // Prevents the return of -0
    return number1 / number2 === -0 ? 0 : number1 / number2;
  },

  /**
   * Multiplies two numbers.
   * @param {Number} number1
   * @param {Number} number2
   * @returns {Number}
   */
  multiply(number1, number2) {
    // Prevents the return of -0
    return number1 * number2 === -0 ? 0 : number1 * number2;
  },
};

/**
 * Shifts each character in a string by a shift factor.
 * @param {String} plaintext
 * @param {Number} shiftFactor
 */
export function encipher(plaintext, shiftFactor) {
  /**
   * Verifies if a string is lower case, ensuring numbers are not considered.
   * Adapted from Artiphishle (https://stackoverflow.com/a/31415820/12469260)
   * @param {String} string
   * @returns {Boolean}
   */
  function isLowerCase(string) {
    return string === string.toLowerCase() && string !== string.toUpperCase();
  }

  /**
   * Verifies if a string is upper case, ensuring numbers are not considered.
   * Adapted from Artiphishle (https://stackoverflow.com/a/31415820/12469260)
   * @param {String} string
   * @returns {Boolean}
   */
  function isUpperCase(string) {
    return string === string.toUpperCase() && string !== string.toLowerCase();
  }

  /**
   * Shifts a lower case letter by a shift factor
   * @param {String} lowerCaseLetter
   * @returns {String}
   */
  function shiftLowerCaseLetter(lowerCaseLetter) {
    return String.fromCharCode(
      ((lowerCaseLetter.charCodeAt(0) -
        ASCII_CODE_FOR_FIRST_LOWER_CASE_LETTER +
        shiftFactor) %
        LENGTH_OF_ENGLISH_ALPHABET) +
        ASCII_CODE_FOR_FIRST_LOWER_CASE_LETTER
    );
  }

  /**
   * Shifts an upper case letter by a shift factor
   * @param {String} upperCaseLetter
   * @returns {String}
   */
  function shiftUpperCaseLetter(upperCaseLetter) {
    return String.fromCharCode(
      ((upperCaseLetter.charCodeAt(0) -
        ASCII_CODE_FOR_FIRST_UPPERCASE_LETTER +
        shiftFactor) %
        LENGTH_OF_ENGLISH_ALPHABET) +
        ASCII_CODE_FOR_FIRST_UPPERCASE_LETTER
    );
  }

  let ciphertext = "";

  for (let i = 0; i < plaintext.length; i++) {
    let nextCharacterForCiphertext;

    if (isLowerCase(plaintext.charAt(i))) {
      nextCharacterForCiphertext = shiftLowerCaseLetter(plaintext.charAt(i));
    } else if (isUpperCase(plaintext.charAt(i))) {
      nextCharacterForCiphertext = shiftUpperCaseLetter(plaintext.charAt(i));
    } else {
      nextCharacterForCiphertext = plaintext.charAt(i);
    }

    ciphertext += nextCharacterForCiphertext;
  }

  return ciphertext;
}
