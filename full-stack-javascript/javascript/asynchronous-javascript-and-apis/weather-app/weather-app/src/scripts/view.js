class View {
  constructor() {
    this.page = document.querySelector("#root");

    this.forecastHTML = document.createElement("p");

    this.page.append(this.forecastHTML);
  }

  displayForecast = (forecastJSON) => {
    this.forecastHTML.innerText = forecastJSON;
  };
}

export { View };
