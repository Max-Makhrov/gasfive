import { getTablerFieldComparison_ } from "./fieldcompare";

/** @typedef {import("../getSchema").SheetFieldSchema} SheetFieldSchema */
/** @typedef {import("@/typers/gettype").BasicDataType} BasicDataType */
/** @typedef {import("./fieldcompare").TablerFieldComparison} TablerFieldComparison */

/**
 * @typedef {Object} TablerFieldsComparison
 * @prop {Boolean} names_are_same
 * @prop {Boolean} types_are_same
 * @prop {SheetFieldSchema[]} [not_in_old_fields]
 * @prop {SheetFieldSchema[]} [not_in_new_fields]
 * @prop {String[]} [not_in_old_field_names]
 * @prop {String[]} [not_in_new_field_names]
 * @prop {TablerFieldComparison[]} [field_types_differences]
 */

/**
 * @param {SheetFieldSchema[]} fieldsNew
 * @param {SheetFieldSchema[]} fieldsOld
 *
 * @returns {TablerFieldsComparison}
 */
export function getTablerFieldsComparison_(fieldsNew, fieldsOld) {
  const comparedKeys = {}; // to save what was compared
  /** @type {SheetFieldSchema[]} */
  const notInOldFields = [];
  /** @type {SheetFieldSchema[]} */
  const notInNewFields = [];
  /** @type {String[]} */
  const notInOldFieldNames = [];
  /** @type {String[]} */
  const notInNewFieldNames = [];
  /** @type {TablerFieldComparison[]} */
  const fieldTypesDifferences = [];

  fieldsNew.forEach((f) => {
    comparedKeys[f.database_value] = true;
    const comparison = getTablerFieldComparison_(f, fieldsOld);
    if (!comparison.is_found) {
      notInOldFields.push(f);
      notInOldFieldNames.push(f.database_value);
    } else if (!comparison.types_match) {
      fieldTypesDifferences.push(comparison);
    }
  });

  fieldsOld.forEach((f) => {
    if (comparedKeys[f.database_value]) return;
    const comparison = getTablerFieldComparison_(f, fieldsNew);
    if (!comparison.is_found) {
      notInNewFields.push(f);
      notInNewFieldNames.push(f.database_value);
    } else if (!comparison.types_match) {
      fieldTypesDifferences.push(comparison);
    }
  });

  return {
    names_are_same: notInNewFields.length === 0 && notInOldFields.length === 0,
    types_are_same: fieldTypesDifferences.length === 0,
    field_types_differences: fieldTypesDifferences,
    not_in_new_field_names: notInNewFieldNames,
    not_in_new_fields: notInNewFields,
    not_in_old_field_names: notInOldFieldNames,
    not_in_old_fields: notInOldFields,
  };
}
