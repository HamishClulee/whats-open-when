import fs from "fs";
import luxon from "luxon";
import path from "path";
class ApiController {
  raw;

  constructor() {
    this.raw = JSON.parse(
      fs.readFileSync(path.resolve("restaurant_data.json"))
    );
  }

  /**
   * Finds the restaurants open at the specified time.
   *
   * @param {luxon.DateTime} time
   * @returns {Array<string>} The names of the restaurants open at the specified
   * time. The order of the elements in this array is alphabetical.
   */
  getRestaurantsOpenAtDayAndTime(req, res) {
    const { day, time } = req.body;

    res.status(200).send({ restaurants: [day, time] });
  }
}

export const apiController = new ApiController();
