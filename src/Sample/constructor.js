import { testJsEngine_ } from "./code";
/** @typedef {import("./type.js").EngineTest} EngineTest */

/**
 * @constructor
 *
 * @param {String} message
 */
export function BuildWithMe_(message) {
  const self = this;
  self.message = message;

  console.info("👉🏼Constructor was just created!");

  let countRuns = 0; // private

  /**
   * @method
   * @returns {EngineTest}
   */
  self.test = function () {
    countRuns++;
    return testJsEngine_(self.message);
  };

  /**
   * @returns {Number}
   */
  self.getCounter = function () {
    return countRuns;
  };
}
