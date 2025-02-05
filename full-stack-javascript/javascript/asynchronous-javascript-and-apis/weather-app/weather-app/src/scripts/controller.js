class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindToOnForecastFetched(this.onFetchedForecast);
  }

  handleSearch = (location) => {
    this.model.fetchForecast(location);
  };

  onFetchedForecast = (forecast) => {
    this.view.displayForecast(forecast);
  };
}

export { Controller };
