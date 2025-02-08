class View {
  constructor() {
    this.summaryHTML = {
      location: document.querySelector(".location"),
      temperature: document.querySelector(".temperature"),
      conditions: document.querySelector(".conditions"),
    };
  }

  displaySummary = (summaryJSON) => {
    this.summaryHTML.location.innerText = summaryJSON.location;
    this.summaryHTML.temperature.innerText = summaryJSON.temperature;
    this.summaryHTML.conditions.innerText = summaryJSON.conditions;
  };

  displayForecast = (forecast) => {
    this.forecastHTML.innerText = forecast;
  };
}

export { View };
