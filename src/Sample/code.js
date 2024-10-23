/** @typedef {import("./type.js").EngineTest} EngineTest */

import { getDefaultMessage_ } from "./type.js";

/**
 * @param {String} [message]
 *
 * @returns {EngineTest}
 */
export function testJsEngine_(message) {
  message = message || getDefaultMessage_();
  return {
    is_error: false,
    message,
  };
}
