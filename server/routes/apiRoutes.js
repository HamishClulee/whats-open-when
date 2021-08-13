import * as express from "express";
import { apiController } from "../controllers/apiController.js";

/**
 * Sets all contained routes at url prefix
 * ===> /api
 */
class ApiRoutes {
  apiRoutes = express.Router();

  constructor(app) {
    this.apiRoutes.post(
      "/get-open-restaurants-by-day-and-time",
      apiController.getRestaurantsOpenAtDayAndTime
    );
    app.use("/api", this.apiRoutes);
  }
}

export default ApiRoutes;
