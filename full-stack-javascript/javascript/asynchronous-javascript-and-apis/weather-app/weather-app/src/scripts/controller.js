class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindToOnWeatherDataFetched(this.onFetchedWeatherData);
  }

  handleSearch = (location) => {
    this.model.fetchWeatherData(location);
  };

  onFetchedWeatherData = (weatherData) => {
    this.view.displayWeatherData(weatherData);
  };
}

export { Controller };
