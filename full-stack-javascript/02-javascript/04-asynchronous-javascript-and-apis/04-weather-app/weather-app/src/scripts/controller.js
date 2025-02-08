class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindToOnSummaryGotten(this.onSummaryGotten);
  }

  onSearch = (location) => {
    this.model.getForecast(location);
  };

  onSummaryGotten = (summary) => {
    this.view.displaySummary(summary);
  };
}

export { Controller };
