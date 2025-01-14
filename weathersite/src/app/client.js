import axios from "axios";
const BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085,35.6895,40.7143&longitude=-0.1257,139.6917,-74.006&hourly=rain,showers,snowfall,temperature_80m&timezone=GMT";
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
        `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=rain,showers,snowfall,temperature_80m&timezone=GMT`
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
