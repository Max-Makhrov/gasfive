/**
 * @typedef {import("./getSchema").SheetTableSchema} SheetTableSchema
 * @typedef {import("./getSchema").SchemaDimensions} SchemaDimensions
 */

/**
 * @param {SheetTableSchema} schema
 * @returns {SchemaDimensions}
 */
export function getSchemaDimensions_(schema) {
  var missingRowsCount = schema.skipped_row_indexes.length;
  var totalRowsCount = schema.row_data_ends - schema.row_data_starts + 1;
  var columnsCount = schema.fields.length;
  return {
    num_columns: columnsCount,
    num_rows: totalRowsCount - missingRowsCount,
  };
}
