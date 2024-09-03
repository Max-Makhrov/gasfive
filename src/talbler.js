import { TablerStore_ } from "./tablers/tablerstore";

/**
 * @typedef {Array<Array>} RangeValues
 */
/** @typedef {import("./tablers/getSchema").SheetTableSchema} SheetTableSchema */
/** @typedef {import("./tablers/getSchema").SheetFieldSchema} SheetFieldSchema */
/** @typedef {import("./tablers/tablerstore").TablerFieldsComparison} TablerFieldsComparison */

/**
 * @constructor
 * @param {RangeValues} values
 */
export function Tabler_(values) {
  const store = new TablerStore_(values);
  const self = this;

  /**
   * @method
   * @returns {SheetTableSchema}
   */
  self.getSchema = function () {
    return store.getSchema();
  };

  /**
   * @method
   * @param {SheetTableSchema} schema
   */
  self.setSchema = function (schema) {
    store.setSchema(schema);
  };

  /**
   * @method
   * @param {SheetTableSchema} [schema]
   */
  self.getData = function (schema) {
    if (schema) self.setSchema(schema);
    return store.getData();
  };

  /**
   * @method
   *
   * @param {SheetFieldSchema[]} fieldsToCompare
   *
   * @returns {TablerFieldsComparison}
   */
  self.compareFields = function (fieldsToCompare) {
    return store.compareFields(fieldsToCompare);
  };
}
