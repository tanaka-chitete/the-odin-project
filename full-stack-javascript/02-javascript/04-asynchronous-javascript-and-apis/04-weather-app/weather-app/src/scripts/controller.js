class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindToOnSummaryGotten(this.onSummaryGotten);
    this.model.bindToOnDayForecastGotten(this.onDayForecastGotten);
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
}

export { Controller };
