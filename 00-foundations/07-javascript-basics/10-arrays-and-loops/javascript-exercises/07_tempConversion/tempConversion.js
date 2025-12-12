const convertToCelsius = function(tempInFahrenheit) {
  let tempInCelsius = tempInFahrenheit - 32;
  tempInCelsius *= (5 / 9);
  // toFixed() returns a string so number conversion is necessary
  tempInCelsius = Number(tempInCelsius.toFixed(1));

  return tempInCelsius;
};

const convertToFahrenheit = function(tempInCelsius) {
  let tempInFahrenheit = tempInCelsius * (9 / 5);
  tempInFahrenheit += 32;
  // toFixed() returns a string so number conversion is necessary
  tempInFahrenheit = Number(tempInFahrenheit.toFixed(1));

  return tempInFahrenheit;
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
