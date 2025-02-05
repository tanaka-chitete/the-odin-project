import { format } from "date-fns";

const TIME_WINDOW_IN_DAYS = 10;
const DATE_FORMAT = "yyyy-MM-dd";
const API_KEY = "CWC4TD4CJ82Z885APFYDCYEFB";

class Model {
  fetchForecast = (location) => {
    const startDate = format(
      new Date(new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS)),
      DATE_FORMAT
    );
    const endDate = format(new Date(), DATE_FORMAT);

    fetch(
      `
      https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}
    `,
      { mode: "cors" }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          this.onForecastFetched(response.json());
        } else {
          this.onForecastFetched(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
        this.onForecastFetched(error);
      });
  };

  bindToOnForecastFetched = (callback) => {
    this.onForecastFetched = callback;
  };
}

export { Model };
