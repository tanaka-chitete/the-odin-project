class View {
  constructor() {
    this.summaryHTML = {
      location: document.querySelector(".summary__location"),
      temperature: document.querySelector(".summary__temperature"),
      conditions: document.querySelector(".summary__conditions"),
    };

    this.dayForecastHTML = {
      description: document.querySelector(
        ".tile_type_day-forecast > .tile__heading"
      ),
      hourForecasts: [
        ...document.querySelectorAll(".tile_type_day-forecast .hour-forecast"),
      ],
    };
  }

  displaySummary = (summaryJSON) => {
    this.summaryHTML.location.innerText = summaryJSON.location;
    this.summaryHTML.temperature.innerText = summaryJSON.temperature;
    this.summaryHTML.conditions.innerText = summaryJSON.conditions;
  };

  displayDayForecast = (dayForecastJSON) => {
    this.dayForecastHTML.description.innerText = dayForecastJSON.description;
    this.dayForecastHTML.hourForecasts.forEach((hourForecastHTML, index) => {
      const time = hourForecastHTML.querySelector(".hour-forecast__time");
      time.innerText = dayForecastJSON.hourForecasts[index].time;
      const icon = hourForecastHTML.querySelector(".hour-forecast__icon");
      icon.innerText = dayForecastJSON.hourForecasts[index].icon;
      const temperature = hourForecastHTML.querySelector(
        ".hour-forecast__temperature"
      );
      temperature.innerText = dayForecastJSON.hourForecasts[index].temperature;
    });
  };
}

export { View };
