class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindToOnSummaryGotten(this.onSummaryGotten);
    this.model.bindToOnDayForecastGotten(this.onDayForecastGotten);
    this.model.bindToOnFortnightForecastGotten(this.onFortnightForecastGotten);
    this.model.bindToOnFeelsLikeGotten(this.onFeelsLikeGotten);
  }

  onSearch = (location) => {
    this.model.getForecast(location);
  };

  onSummaryGotten = (summary) => {
    this.view.displaySummary(summary);
  };

  onDayForecastGotten = (dayForecast) => {
    this.view.displayDayForecast(dayForecast);
  };

  onFortnightForecastGotten = (fortnightForecast) => {
    this.view.displayFortnightForecast(fortnightForecast);
  };

  onFeelsLikeGotten = (feelsLike) => {
    this.view.displayFeelsLike(feelsLike);
  };
}

export { Controller };
