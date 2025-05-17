// eslint-disable-next-line no-unused-vars
import { Schema } from 'mongoose';
import { parseNumber } from './parseNumber.js';

/**
 * Method casts a string passed as a value parameter to primitive data type of the appropriate constructor passed as a type parameter if possible, if not method returns undefined.
 * @param {string} value - a string of primitive data type to parse
 * @param {String | Number | Boolean | Date} type - build-in constructor of the appropriate primitive data type
 * @returns {string | number | boolean | undefined | date}
 */
export const parseValueOfType = (value, type) => {
  if (![String, Number, Boolean].includes(type)) return;

  const parsers = new Map([
    [String, value => value],
    [Number, parseNumber],
    [Boolean, value => ({ true: true, false: false }?.[value])],
    [
      Date,
      value =>
        new Date(value).toString() === 'Invalid Date'
          ? undefined
          : new Date(value),
    ],
  ]);

  return parsers.get(type)(value);
};

/**
 * @param {string} param - a query parameter name of an http request
 * @param {string } value - an unparsed value of the appropriate query parameter
 * @param {Schema} schema - the mongoose schema of the approptiate collection
 * @param {string | number | boolean} [defaultValue=undefined] - the default value of the query parameter
 * @returns {string | number | boolean | undefined} a parsed parameter of an http request, can be equal to undefined if value is not a string or is not a valid value of the appropriate query parameter and the default value has been omitted
 */
export const parseParams = (param, value, schema, defaultValue) => {
  if (typeof value !== 'string') return;

  const builtInType = schema.tree?.[param]?.type;
  const parsedValue = parseValueOfType(value, builtInType);
  const validValues = schema.tree?.[param]?.enum;

  const result = !validValues
    ? parsedValue
    : validValues.includes(parsedValue)
    ? parsedValue
    : defaultValue;
  return result;
};
