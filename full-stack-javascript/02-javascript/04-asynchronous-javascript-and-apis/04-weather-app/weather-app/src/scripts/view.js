class View {
  constructor() {
    this.page = document.querySelector("#root");

    this.weatherDataHTML = document.createElement("p");

    this.page.append(this.weatherDataHTML);
  }

  displayWeatherData = (weatherDataJSON) => {
    this.weatherDataHTML.innerText = weatherDataJSON;
  };
}

export { View };
