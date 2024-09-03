import { checkValuesIsvalidRectangle_ } from "./checkisrectangle";
import { getTheFirstSheetSchema_ } from "./getSchema";
import { getTablerDataByCoorfinates_ } from "./datagetter/getvalues";
import { getTablerFieldsComparison_ } from "./fieldscomparison/allfieldscompare";

/** @typedef {import("./getSchema").SheetTableSchema} SheetTableSchema  */
/** @typedef {import("../talbler").RangeValues} RangeValues */
/** @typedef {import("./checkisrectangle").ValuesCheckResponse} ValuesCheckResponse */
/** @typedef {import("./getSchema").SheetFieldSchema} SheetFieldSchema */
/** @typedef {import("./fieldscomparison/allfieldscompare").TablerFieldsComparison} TablerFieldsComparison */

/**
 * @constructor
 * @param {RangeValues|*} values
 */
export function TablerStore_(values) {
  const self = this;
  self.values = values;
  /** @type {ValuesCheckResponse|null} */
  self.validation = null;
  /** @type {SheetTableSchema|null} */
  self.schema = null;

  /**
   * @method
   * @returns {ValuesCheckResponse}
   */
  self.validate = function () {
    if (self.validation) return self.validation;
    self.validation = checkValuesIsvalidRectangle_(self.values);
    return self.validation;
  };

  /**
   * @method
   * @returns {SheetTableSchema|null}
   */
  self.getSchema = function () {
    if (self.schema) return self.schema;
    const validation = self.validate();
    if (!validation.is_valid) {
      return null;
    }
    const schema = getTheFirstSheetSchema_(self.values);
    self.schema = schema;
    return schema;
  };

  /**
   * @method
   * @param {SheetTableSchema|null} schema
   */
  self.setSchema = function (schema) {
    self.schema = schema;
  };

  /**
   * @method
   *
   * @returns  {Array[][]}
   */
  self.getData = function () {
    if (!self.schema) self.getSchema();
    return getTablerDataByCoorfinates_(
      self.values,
      self.schema.fields,
      self.schema.row_data_starts,
      self.schema.row_data_ends,
      self.schema.skipped_row_indexes
    );
  };

  /**
   * @method
   *
   * @param {SheetFieldSchema[]} fieldsToCompare
   *
   * @returns {TablerFieldsComparison}
   */
  self.compareFields = function (fieldsToCompare) {
    const schema = self.getSchema();
    const fields = schema.fields;
    const compare = getTablerFieldsComparison_(fieldsToCompare, fields);
    return compare;
  };
}
