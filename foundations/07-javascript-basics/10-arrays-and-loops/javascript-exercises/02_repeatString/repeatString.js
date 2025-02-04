const ERROR = "ERROR";

const repeatString = function(string, times) {
  if (times < 0) {
    return ERROR;
  }

  let newString = "";
  for (let i = 0; i < times; i++) {
    newString += string;
  }

  return newString;
};

// Do not edit below this line
module.exports = repeatString;
