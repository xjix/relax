const isBoolean = require('lodash/isBoolean')
const isNil = require('lodash/isNil')
const isNumber = require('lodash/isNumber')
const isString = require('lodash/isString')
/**
 * checks a value to see if it is a primitive
 * @param {*} value
 * @return {boolean}
 * @ignore
 */
const isPrimitive = (value) => isNumber(value) || isString(value) || isBoolean(value) || isNil(value)
module.exports = isPrimitive
