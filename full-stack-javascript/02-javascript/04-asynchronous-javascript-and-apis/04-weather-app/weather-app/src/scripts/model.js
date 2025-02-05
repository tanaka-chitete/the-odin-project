// import { format } from "date-fns";

import { CACHED_FORECAST } from "./constants";

// const TIME_WINDOW_IN_DAYS = 9;
// const DATE_FORMAT = "yyyy-MM-dd";
// const API_KEY = "ULLZAVP98LHVZBLKNFM5PZGCM";

class Model {
  fetchForecast = () => {
    this.onForecastFetched(CACHED_FORECAST["resolvedAddress"]);
  };

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

  bindToOnForecastFetched = (callback) => {
    this.onForecastFetched = callback;
  };
}

export { Model };
