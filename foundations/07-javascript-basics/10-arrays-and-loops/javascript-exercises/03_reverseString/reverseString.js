const reverseString = function(string) {
  let characters = string.split("");
  let reversedCharacters = characters.reverse();
  let reversedString = reversedCharacters.join("");
  return reversedString;
};

// Do not edit below this line
module.exports = reverseString;
