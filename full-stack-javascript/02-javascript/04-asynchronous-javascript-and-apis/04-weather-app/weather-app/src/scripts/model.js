import { format } from "date-fns";

const TIME_WINDOW_IN_DAYS = 10;
const DATE_FORMAT = "yyyy-MM-dd";
const API_KEY = "CWC4TD4CJ82Z885APFYDCYEFB";

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
        const error = await response.text();
        this.onWeatherDataFetched(error);
        return;
      }

      const weatherData = await response.json();
      this.onWeatherDataFetched(weatherData);
    } catch (error) {
      console.log(error);
      this.onWeatherDataFetched(error);
    }
  }

  bindToOnWeatherDataFetched = (callback) => {
    this.onWeatherDataFetched = callback;
  };
}

export { Model };
