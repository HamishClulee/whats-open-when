import axios from "axios";

export default class Api {
  API_URL = "http://localhost:2999/api";
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: this.API_URL,
    });
  }

  commsCheck() {
    return this.axios.post("/comms-check");
  }
}
