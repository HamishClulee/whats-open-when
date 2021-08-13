import axios from "axios";

export default class Api {
  API_URL = "http://localhost:2999/api";
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: this.API_URL,
    });
  }

  getOpenRestaurantsByDayAndTime({ day, time }) {
    return this.axios.post("/get-open-restaurants-by-day-and-time", {
      day,
      time,
    });
  }
}
