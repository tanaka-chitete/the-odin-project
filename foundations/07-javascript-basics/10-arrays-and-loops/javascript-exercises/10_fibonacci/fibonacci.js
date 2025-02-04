const fibonacci = function(num) {
  num = Number(num); // num may be a string

  if (num < 0) {
    return "OOPS";
  }

  if (num === 0) {
    return 0;
  }

  let first = 1;
  let second = 1;
  for (let i = 2; i < num; i++) {
    const temp = second;
    second = second + first;
    first = temp;
  }
  return second;
};

// Do not edit below this line
module.exports = fibonacci;
