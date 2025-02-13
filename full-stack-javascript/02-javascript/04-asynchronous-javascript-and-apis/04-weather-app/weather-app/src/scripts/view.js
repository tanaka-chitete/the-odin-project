class View {
  constructor() {
    this.summaryHTML = {
      location: document.querySelector(".summary__location"),
      temp: document.querySelector(".summary__temp"),
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

    this.fortnightForecastHTML = [
      ...document.querySelectorAll(
        ".tile_type_fortnight-forecast .day-forecast"
      ),
    ];
    console.log(this.fortnightForecastHTML);
  }

  displaySummary = (summaryJSON) => {
    this.summaryHTML.location.innerText = summaryJSON.location;
    this.summaryHTML.temp.innerText = summaryJSON.temp;
    this.summaryHTML.conditions.innerText = summaryJSON.conditions;
  };

  displayDayForecast = (dayForecastJSON) => {
    this.dayForecastHTML.description.innerText = dayForecastJSON.description;
    this.dayForecastHTML.hourForecasts.forEach((hourForecastHTML, index) => {
      const hourHTML = hourForecastHTML.querySelector(".hour-forecast__hour");
      hourHTML.innerText = dayForecastJSON.hourForecasts[index].hour;
      const iconHTML = hourForecastHTML.querySelector(".hour-forecast__icon");
      iconHTML.innerText = dayForecastJSON.hourForecasts[index].icon;
      const tempHTML = hourForecastHTML.querySelector(".hour-forecast__temp");
      tempHTML.innerText = dayForecastJSON.hourForecasts[index].temp;
    });
  };

  displayFortnightForecast = (fortnightForecastJSON) => {
    this.fortnightForecastHTML.forEach((dayForecastHTML, index) => {
      const dayHTML = dayForecastHTML.querySelector(".day-forecast__day");
      dayHTML.innerText = fortnightForecastJSON[index].day;
      const iconHTML = dayForecastHTML.querySelector(
        ".material-symbols-outlined"
      );
      iconHTML.innerText = fortnightForecastJSON[index].icon;
      const minTempHTML = dayForecastHTML.querySelector(
        ".day-forecast__min-temp"
      );
      minTempHTML.innerText = fortnightForecastJSON[index].minTemp;
      const maxTempHTML = dayForecastHTML.querySelector(
        ".day-forecast__max-temp"
      );
      maxTempHTML.innerText = fortnightForecastJSON[index].maxTemp;
    });
  };
}

export { View };
