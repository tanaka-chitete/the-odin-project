import { format } from "date-fns";

import { CACHED_FORECAST } from "./cached-forecast";

// const TIME_WINDOW_IN_DAYS = 14;
// const DATE_FORMAT = "yyyy-MM-dd";
const SECONDS_TO_MILLISECONDS_MULTIPLIER = 1_000;
const HOUR_FORMAT = "haaa";
const DAY_FORMAT = "EEEE";
const TIME_FORMAT = "h:maaa";
// const UNIT_GROUP = "metric";
// const API_KEY = "ULLZAVP98LHVZBLKNFM5PZGCM";

class Model {
  getForecast = () => {
    const forecast = CACHED_FORECAST;

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
  };

  getSummary(forecast) {
    return {
      location: forecast.address,
      temp: this.formatTemp(forecast.currentConditions.temp),
      conditions: forecast.currentConditions.conditions,
    };
  }

  getDayForecast(forecast) {
    const extendedHourForecasts = forecast.days.at(-1).hours;

    const simplifiedHourForecasts = extendedHourForecasts.map(
      (extendedHourForecast) => {
        const simplifiedHourForecast = {
          hour: this.formatDate(
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
          day: this.formatDate(extendedDayForecast.datetimeEpoch, DAY_FORMAT),
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
    return forecast.currentConditions.visibility;
  }

  getSunriseTime(forecast) {
    return this.formatDate(
      forecast.currentConditions.sunriseEpoch,
      TIME_FORMAT
    );
  }

  getSunsetTime(forecast) {
    return this.formatDate(forecast.currentConditions.sunsetEpoch, TIME_FORMAT);
  }

  // async fetchForecast(location) {
  //   const startDate = format(
  //     new Date(new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS - 1)),
  //     DATE_FORMAT
  //   );
  //   const endDate = format(new Date(), DATE_FORMAT);

  //   try {
  //     const response = await fetch(
  //       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}`,
  //       { mode: "cors" }
  //     );

  //     if (!response.ok) {
  //       throw new Error(await response.text());
  //     }

  //     const forecast = await response.json();

  //     this.onForecastFetched(forecast["resolvedAddress"]);
  //   } catch (error) {
  //     this.onForecastFetched(error);
  //   }
  // }

  // fetchForecast = (location) => {
  //   const startDate = format(
  //     new Date(new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS)),
  //     DATE_FORMAT
  //   );
  //   const endDate = format(new Date(), DATE_FORMAT);

  //   fetch(
  //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}`,
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
  //     .then((data) => this.onForecastFetched(data["resolvedAddress"]))
  //     .catch((error) => this.onForecastFetched(error));
  // };

  formatTemp(temp) {
    return `${Math.round(temp)}°F`;
  }

  formatDate(epochTime, formatString) {
    return format(
      new Date(epochTime * SECONDS_TO_MILLISECONDS_MULTIPLIER),
      formatString
    );
  }

  formatIcon(icon) {
    // Google Material icons are hyphen-delineated
    return icon.replaceAll("-", "_");
  }

  formatSpeed(speed) {
    return `${Math.round(speed)}`;
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
}

export { Model };
