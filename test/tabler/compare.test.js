import { getTablerFieldsComparison_ } from "@/tablers/fieldscomparison/allfieldscompare";
import { getTablerFieldComparison_ } from "@/tablers/fieldscomparison/fieldcompare";
import { test, expect } from "vitest";

/** @typedef {import("@/tablers/getSchema").SheetFieldSchema} SheetFieldSchema */

// Sample Objects
/** @type {SheetFieldSchema[]} */
const fieldsNew = [
  {
    column_index: 0,
    database_value: "product_id",
    original_value: "product_id",
    is_generic_header: false,
    type: "string",
    string_like_type: "int",
    size: 2,
    precision: 2,
    scale: 0,
  },
  {
    column_index: 1,
    database_value: "product_name",
    original_value: "product_name",
    is_generic_header: false,
    type: "string",
    string_like_type: "string",
    size: 15,
    precision: 0,
    scale: 0,
  },
  {
    column_index: 3,
    database_value: "units_sold",
    original_value: "units_sold",
    is_generic_header: false,
    type: "string",
    string_like_type: "int",
    size: 3,
    precision: 3,
    scale: 0,
  },
  {
    column_index: 4,
    database_value: "revenue",
    original_value: "revenue",
    is_generic_header: false,
    type: "string",
    string_like_type: "string",
    size: 7,
    precision: 0,
    scale: 0,
  },
  {
    column_index: 5,
    database_value: "profit",
    original_value: "profit",
    is_generic_header: false,
    type: "string",
    string_like_type: "string",
    size: 6,
    precision: 0,
    scale: 0,
  },
  {
    column_index: 6,
    database_value: "date_sold",
    original_value: "date_sold",
    is_generic_header: false,
    type: "string",
    string_like_type: "date",
    size: 10,
    precision: 0,
    scale: 0,
  },
];

/** @type {SheetFieldSchema[]} */
const fieldsOld = [
  {
    column_index: 0,
    database_value: "product_id",
    original_value: "product_id",
    is_generic_header: false,
    type: "string",
    string_like_type: "int",
    size: 2,
    precision: 2,
    scale: 0,
  },
  {
    column_index: 1,
    database_value: "product_name",
    original_value: "product_name",
    is_generic_header: false,
    type: "string",
    string_like_type: "string",
    size: 15,
    precision: 0,
    scale: 0,
  },
  {
    column_index: 3,
    database_value: "units_sold",
    original_value: "units_sold",
    is_generic_header: false,
    type: "string",
    string_like_type: "int",
    size: 3,
    precision: 3,
    scale: 0,
  },
];

// Required functions (paste your functions here before writing the tests)

test("getTablerFieldComparison_ should correctly compare fields", () => {
  /** @type {SheetFieldSchema} */
  const fieldBase = {
    column_index: 3,
    database_value: "units_sold",
    original_value: "units_sold",
    is_generic_header: false,
    type: "string",
    string_like_type: "int",
    size: 3,
    precision: 3,
    scale: 0,
  };

  const comparison = getTablerFieldComparison_(fieldBase, fieldsOld);
  expect(comparison).toEqual({
    name: "units_sold",
    is_found: true,
    base_type: "int",
    compare_type: "int",
    types_match: true,
  });
});

test("getTablerFieldsComparison_ should correctly compare field arrays", () => {
  const result = getTablerFieldsComparison_(fieldsNew, fieldsOld);

  expect(result).toEqual({
    names_are_same: false,
    types_are_same: true,
    field_types_differences: [],
    not_in_new_field_names: [],
    not_in_new_fields: [],
    not_in_old_field_names: ["revenue", "profit", "date_sold"],
    not_in_old_fields: [
      {
        column_index: 4,
        database_value: "revenue",
        original_value: "revenue",
        is_generic_header: false,
        type: "string",
        string_like_type: "string",
        size: 7,
        precision: 0,
        scale: 0,
      },
      {
        column_index: 5,
        database_value: "profit",
        original_value: "profit",
        is_generic_header: false,
        type: "string",
        string_like_type: "string",
        size: 6,
        precision: 0,
        scale: 0,
      },
      {
        column_index: 6,
        database_value: "date_sold",
        original_value: "date_sold",
        is_generic_header: false,
        type: "string",
        string_like_type: "date",
        size: 10,
        precision: 0,
        scale: 0,
      },
    ],
  });
});

const copy = JSON.parse(JSON.stringify(fieldsNew));
copy[0].string_like_type = "date";

const oldCopy = JSON.parse(JSON.stringify(fieldsOld));
/** @type {SheetFieldSchema} */
const fieldExtra = {
  column_index: 3,
  database_value: "some_number",
  original_value: "some_number",
  is_generic_header: false,
  type: "string",
  string_like_type: "int",
  size: 3,
  precision: 3,
  scale: 0,
};
oldCopy.push(fieldExtra);

const result = getTablerFieldsComparison_(copy, oldCopy);

console.log("getTablerFieldsComparison_🟢🟢🟢", JSON.stringify(result));
