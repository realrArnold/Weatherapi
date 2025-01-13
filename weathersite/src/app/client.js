import axios from "axios";
const BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5085,35.6895&longitude=-0.1257,139.6917&hourly=apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,wind_speed_80m,wind_direction_80m,temperature_80m&timezone=GMT";
export class ApiClient {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject.data;
    }
    throw new Error(responseObject.statusText);
  }
  async getRequest(params = {}) {
    try {
      const response = await axios.get(`${BASE_URL}`, { params });
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
    return this.getRequest();
  }
}
