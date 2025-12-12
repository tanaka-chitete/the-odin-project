import { format } from "date-fns";

const API_KEY = "ULLZAVP98LHVZBLKNFM5PZGCM";
const DATE_FORMAT = "yyyy-MM-dd";
const DAY_FORMAT = "EEEE";
const HOUR_FORMAT = "haaa";
const SECONDS_TO_MILLISECONDS_MULTIPLIER = 1_000;
const TIME_FORMAT = "h:mmaaa";
const TIME_WINDOW_IN_DAYS = 14;
const UNIT_GROUP = "metric";

class Model {
  async fetchForecast(location) {
    const startDate = format(
      new Date(
        new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS - 2)
      ),
      DATE_FORMAT
    );
    const endDate = format(new Date(), DATE_FORMAT);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=${UNIT_GROUP}&key=${API_KEY}`,
        { mode: "cors" }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const forecast = await response.json();

      this.processForecast(forecast);
    } catch (error) {
      console.log(error);
      this.onErrorOccurred(`Unable to get forecast for "${location}"`);
    }
  }

  // fetchForecast = (location) => {
  //   const startDate = format(
  //     new Date(
  //       new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS - 2)
  //     ),
  //     DATE_FORMAT
  //   );
  //   const endDate = format(new Date(), DATE_FORMAT);

  //   fetch(
  //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=${UNIT_GROUP}&key=${API_KEY}`,
  //     { mode: "cors" }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.text().then((errorMessage) => {
  //           throw new Error(errorMessage);
  //         });
  //       }

  //       return response.json();
  //     })
  //     .then((forecast) => this.processForecast(forecast))
  //     .catch((error) => {
  //       console.log(error);
  //       this.onErrorOccurred(`Unable to get forecast for "${location}"`);
  //     });
  // };

  processForecast(forecast) {
    const summary = this.getSummary(forecast);
    const dayForecast = this.getDayForecast(forecast);
    const fortnightForecast = this.getFortnightForecast(forecast);
    const feelsLike = this.getFeelsLike(forecast);
    const uvIndex = this.getUvIndex(forecast);
    const windSpeed = this.getWindSpeed(forecast);
    const visibility = this.getVisibility(forecast);
    const sunriseTime = this.getSunriseTime(forecast);
    const sunsetTime = this.getSunsetTime(forecast);

    this.onSummaryGotten(summary);
    this.onDayForecastGotten(dayForecast);
    this.onFortnightForecastGotten(fortnightForecast);
    this.onFeelsLikeGotten(feelsLike);
    this.onUvIndexGotten(uvIndex);
    this.onWindSpeedGotten(windSpeed);
    this.onVisibilityGotten(visibility);
    this.onSunriseTimeGotten(sunriseTime);
    this.onSunsetTimeGotten(sunsetTime);
  }

  getSummary(forecast) {
    const summary = {
      location: forecast.resolvedAddress,
      temp: this.formatTemp(forecast.currentConditions.temp),
      conditions: forecast.currentConditions.conditions,
    };

    return summary;
  }

  getDayForecast(forecast) {
    const extendedHourForecasts = forecast.days.at(-1).hours;

    const simplifiedHourForecasts = extendedHourForecasts.map(
      (extendedHourForecast) => {
        const simplifiedHourForecast = {
          hour: this.formatTime(
            extendedHourForecast.datetimeEpoch,
            HOUR_FORMAT
          ),
          icon: this.formatIcon(extendedHourForecast.icon),
          temp: this.formatTemp(extendedHourForecast.temp),
        };

        return simplifiedHourForecast;
      }
    );

    const dayForecast = {
      description: forecast.description,
      hourForecasts: simplifiedHourForecasts,
    };

    return dayForecast;
  }

  getFortnightForecast(forecast) {
    const extendedDayForecasts = forecast.days;
    const simplifiedDayForecasts = extendedDayForecasts.map(
      (extendedDayForecast) => {
        const simplifiedDayForecast = {
          day: this.formatTime(extendedDayForecast.datetimeEpoch, DAY_FORMAT),
          icon: this.formatIcon(extendedDayForecast.icon),
          minTemp: `L:${this.formatTemp(extendedDayForecast.tempmin)}`,
          maxTemp: `H:${this.formatTemp(extendedDayForecast.tempmax)}`,
        };

        return simplifiedDayForecast;
      }
    );

    return simplifiedDayForecasts;
  }

  getFeelsLike(forecast) {
    return this.formatTemp(forecast.currentConditions.feelslike);
  }

  getUvIndex(forecast) {
    return forecast.currentConditions.uvindex;
  }

  getWindSpeed(forecast) {
    return this.formatSpeed(forecast.currentConditions.windspeed);
  }

  getVisibility(forecast) {
    return this.formatDistance(forecast.currentConditions.visibility);
  }

  getSunriseTime(forecast) {
    return this.formatTime(
      forecast.currentConditions.sunriseEpoch,
      TIME_FORMAT
    );
  }

  getSunsetTime(forecast) {
    return this.formatTime(forecast.currentConditions.sunsetEpoch, TIME_FORMAT);
  }

  formatTemp(temp) {
    return `${Math.round(temp)}°`;
  }

  formatTime(epochTime, timeFormat) {
    return format(
      new Date(epochTime * SECONDS_TO_MILLISECONDS_MULTIPLIER),
      timeFormat
    );
  }

  formatIcon(icon) {
    let formattedIcon;

    switch (icon) {
      case "snow":
        formattedIcon = "snowing";
        break;
      case "rain":
        formattedIcon = "rainy";
        break;
      case "fog":
        formattedIcon = "foggy";
        break;
      case "cloudy":
        formattedIcon = "cloud";
        break;
      case "partly-cloudy-day":
        formattedIcon = "partly_cloudy_day";
        break;
      case "partly-cloudy-night":
        formattedIcon = "partly_cloudy_night";
        break;
      case "clear-day":
        formattedIcon = "clear_day";
        break;
      case "clear-night":
        formattedIcon = "bedtime";
        break;
      default:
        formattedIcon = "error";
    }

    return formattedIcon;
  }

  formatSpeed(speed) {
    return `${Math.round(speed)} km/h`;
  }

  formatDistance(distance) {
    return `${distance} km`;
  }

  bindToOnSummaryGotten = (callback) => {
    this.onSummaryGotten = callback;
  };

  bindToOnDayForecastGotten = (callback) => {
    this.onDayForecastGotten = callback;
  };

  bindToOnFortnightForecastGotten = (callback) => {
    this.onFortnightForecastGotten = callback;
  };

  bindToOnFeelsLikeGotten = (callback) => {
    this.onFeelsLikeGotten = callback;
  };

  bindToOnUvIndexGotten = (callback) => {
    this.onUvIndexGotten = callback;
  };

  bindToOnWindSpeedGotten = (callback) => {
    this.onWindSpeedGotten = callback;
  };

  bindToOnVisibilityGotten = (callback) => {
    this.onVisibilityGotten = callback;
  };

  bindToOnSunriseTimeGotten = (callback) => {
    this.onSunriseTimeGotten = callback;
  };

  bindToOnSunsetTimeGotten = (callback) => {
    this.onSunsetTimeGotten = callback;
  };

  bindToOnErrorOccurred = (callback) => {
    this.onErrorOccurred = callback;
  };
}

export { Model };
