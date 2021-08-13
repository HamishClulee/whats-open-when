const fs = require("fs");
const luxon = require("luxon");

/**
 * This class takes the name of a JSON file containing details on opening hours
 * for a number of restaurants. It parses the contents of this file and then
 * provides a method for querying which restaurants are open at a specified date
 * and time. The input JSON file can be assumed to contain correctly formatted
 * data.
 *
 * All dates and times can be assumed to be in the same time zone.
 */
class Restaurants {
  constructor(jsonFilename) {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilename));

    // TODO
  }

  /**
   * Finds the restaurants open at the specified time.
   *
   * @param {luxon.DateTime} time
   * @returns {Array<string>} The names of the restaurants open at the specified
   * time. The order of the elements in this array is alphabetical.
   */
  getRestaurantsOpenAt(time) {
    // TODO

    return [];
  }
}

module.exports = Restaurants;
