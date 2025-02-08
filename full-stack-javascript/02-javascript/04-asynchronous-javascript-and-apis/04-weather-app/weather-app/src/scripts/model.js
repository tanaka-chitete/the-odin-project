import { format } from "date-fns";

import { CACHED_FORECAST } from "./cached-forecast";

// const TIME_WINDOW_IN_DAYS = 9;
// const DATE_FORMAT = "yyyy-MM-dd";
const TIME_FORMAT = "haaa";
const SECONDS_TO_MILLISECONDS_MULTIPLIER = 1_000;
// const API_KEY = "ULLZAVP98LHVZBLKNFM5PZGCM";

class Model {
  getForecast = () => {
    const forecast = CACHED_FORECAST;

    const summary = this.getSummary(forecast);
    const dayForecast = this.getDayForecast(forecast);

    this.onSummaryGotten(summary);
    this.onDayForecastGotten(dayForecast);
  };

  getSummary(forecast) {
    return {
      location: forecast.address,
      temperature: `${Math.round(forecast.currentConditions.temp)}°F`,
      conditions: forecast.currentConditions.conditions,
    };
  }

  getDayForecast(forecast) {
    const extendedHourForecasts = forecast.days.at(-1).hours;

    const simplifiedHourForecasts = extendedHourForecasts.map(
      (extendedHourForecast) => {
        const simplifiedHourForecast = {
          time: format(
            new Date(
              extendedHourForecast.datetimeEpoch *
                SECONDS_TO_MILLISECONDS_MULTIPLIER
            ),
            TIME_FORMAT
          ),
          icon: extendedHourForecast.icon,
          temperature: `${Math.round(extendedHourForecast.temp)}°F`,
        };

        return simplifiedHourForecast;
      }
    );
    console.log(simplifiedHourForecasts);

    const dayForecast = {
      description: forecast.description,
      hourForecasts: simplifiedHourForecasts,
    };

    return dayForecast;
  }

  // async fetchForecast(location) {
  //   const startDate = format(
  //     new Date(new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS)),
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

  bindToOnSummaryGotten = (callback) => {
    this.onSummaryGotten = callback;
  };

  bindToOnDayForecastGotten = (callback) => {
    this.onDayForecastGotten = callback;
  };
}

export { Model };
