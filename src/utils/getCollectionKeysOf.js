// eslint-disable-next-line no-unused-vars
import { Schema } from 'mongoose';

/**
 * @param {Schema} schema - mongoose schema
 * @returns {string[]} an array of all the Mongodb collection's field names
 */
export const getCollectionKeysOf = schema => Object.keys(schema.tree);
