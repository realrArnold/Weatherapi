import axios from "axios";
const BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085,40.7143,35.6895,-33.8678,48.8534,30.0626,55.7522,39.9075,52.5244,40.4165&longitude=-0.1257,-74.006,139.6917,151.2073,2.3488,31.2497,37.6156,116.3972,13.4105,-3.7026&hourly=rain,showers,snowfall,visibility,temperature_80m";
export class ApiClient {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject.data;
    }
    throw new Error(responseObject.statusText);
  }
  async getRequest(params = {}) {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=rain,showers,snowfall,visibility,temperature_80m&timezone=GMT`
      );
      return this.responseStatusCheck(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getLocations() {
    return this.getRequest("", { results: 10 });
  }
  async getWeather({ latitude, longitude }) {
    return this.getRequest({ latitude, longitude });
  }
}
