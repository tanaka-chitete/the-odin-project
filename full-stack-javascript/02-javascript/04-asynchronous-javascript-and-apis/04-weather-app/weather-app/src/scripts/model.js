import { format } from "date-fns";

const TIME_WINDOW_IN_DAYS = 10;
const DATE_FORMAT = "yyyy-MM-dd";
const API_KEY = "ULLZAVP98LHVZBLKNFM5PZGCM";

class Model {
  async fetchWeatherData(location) {
    const startDate = format(
      new Date(new Date().setDate(new Date().getDate() - TIME_WINDOW_IN_DAYS)),
      DATE_FORMAT
    );
    const endDate = format(new Date(), DATE_FORMAT);

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}`,
        { mode: "cors" }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const weatherData = await response.json();

      this.onWeatherDataFetched(weatherData["description"]);
    } catch (error) {
      this.onWeatherDataFetched(error);
    }
  }

  // fetchWeatherData = (location) => {
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
  //     .then((data) => this.onWeatherDataFetched(data["description"]))
  //     .catch((error) => this.onWeatherDataFetched(error));
  // };

  bindToOnWeatherDataFetched = (callback) => {
    this.onWeatherDataFetched = callback;
  };
}

export { Model };
