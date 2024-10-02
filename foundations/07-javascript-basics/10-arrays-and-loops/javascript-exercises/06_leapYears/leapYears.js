const leapYears = function(year) {
  const isDivisibleBy4 = year % 4 === 0;
  const isDivisibleBy100 = year % 100 === 0;
  const isDivisibleBy400 = year % 400 === 0;

  let valid;
  if (isDivisibleBy4 && (!isDivisibleBy100 || isDivisibleBy400)) {
    valid = true;
  } else {
    valid = false;
  }

  return valid;
};

// Do not edit below this line
module.exports = leapYears;
