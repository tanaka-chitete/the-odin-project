const palindromes = function (string) {
  const characters = string.split("");
  
  const filteredCharacters = characters.filter(character => {
    const isLetter = new RegExp(/^[a-z]/i);
    const isNumber = new RegExp(/^[0-9]/);
    return isLetter.test(character) || isNumber.test(character); 
  });

  let palindrome = true;
  let left = 0;
  let right = filteredCharacters.length - 1;
  while (palindrome && left < right) {
    if (filteredCharacters[left].toLowerCase() !== 
    filteredCharacters[right].toLowerCase()) {
      palindrome = false;
    }

    left++;
    right--;
  }

  return palindrome;
};

// Do not edit below this line
module.exports = palindromes;
