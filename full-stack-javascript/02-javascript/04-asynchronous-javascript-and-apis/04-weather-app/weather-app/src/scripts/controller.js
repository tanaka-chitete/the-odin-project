class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindToOnSearch(this.onSearch);

    this.model.bindToOnSummaryGotten(this.onSummaryGotten);
    this.model.bindToOnDayForecastGotten(this.onDayForecastGotten);
    this.model.bindToOnFortnightForecastGotten(this.onFortnightForecastGotten);
    this.model.bindToOnFeelsLikeGotten(this.onFeelsLikeGotten);
    this.model.bindToOnUvIndexGotten(this.onUvIndexGotten);
    this.model.bindToOnWindSpeedGotten(this.onWindSpeedGotten);
    this.model.bindToOnVisibilityGotten(this.onVisibilityGotten);
    this.model.bindToOnSunriseTimeGotten(this.onSunriseTimeGotten);
    this.model.bindToOnSunsetTimeGotten(this.onSunsetTimeGotten);
    this.model.bindToOnErrorOccurred(this.onErrorOccurred);
  }

  onSearch = (location) => {
    this.model.fetchForecast(location);
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

  onUvIndexGotten = (uvIndex) => {
    this.view.displayUvIndex(uvIndex);
  };

  onWindSpeedGotten = (windSpeed) => {
    this.view.displayWindSpeed(windSpeed);
  };

  onVisibilityGotten = (visibility) => {
    this.view.displayVisibility(visibility);
  };

  onSunriseTimeGotten = (sunriseTime) => {
    this.view.displaySunriseTime(sunriseTime);
  };

  onSunsetTimeGotten = (sunsetTime) => {
    this.view.displaySunsetTime(sunsetTime);
  };

  onErrorOccurred = (error) => {
    this.view.displayError(error);
  };
}

export { Controller };
