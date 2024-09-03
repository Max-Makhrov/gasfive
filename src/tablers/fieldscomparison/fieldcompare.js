/** @typedef {import("../getSchema").SheetFieldSchema} SheetFieldSchema */
/** @typedef {import("@/typers/gettype").BasicDataType} BasicDataType */

/**
 * @typedef {Object} TablerFieldComparison
 * @prop {String} name
 * @prop {Boolean} is_found
 * @prop {BasicDataType} [base_type]
 * @prop {BasicDataType} [compare_type]
 * @prop {Boolean} [types_match]
 */

/**
 * @param {SheetFieldSchema} fieldBase
 * @param {SheetFieldSchema[]} fieldsToCompare
 *
 * @returns {TablerFieldComparison}
 */
export function getTablerFieldComparison_(fieldBase, fieldsToCompare) {
  let compare = fieldsToCompare.find(
    (v) => v.database_value === fieldBase.database_value
  );
  if (!compare) {
    return {
      name: fieldBase.database_value,
      is_found: false,
    };
  }

  const type1 = _getTablerFieldBestType_(fieldBase);
  const type2 = _getTablerFieldBestType_(compare);

  return {
    name: fieldBase.database_value,
    is_found: true,
    base_type: type1,
    compare_type: type2,
    types_match: type1 === type2,
  };
}

/**
 * @param {SheetFieldSchema} field
 *
 * @returns {BasicDataType}
 */
function _getTablerFieldBestType_(field) {
  if (field.type !== "string") return field.type;
  if (!field.string_like_type) return field.type;
  return field.string_like_type;
}
