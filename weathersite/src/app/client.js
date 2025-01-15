import axios from "axios";
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
        `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=rain,showers,snowfall,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum&timezone=GMT`
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
