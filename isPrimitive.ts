import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
/**
 * checks a value to see if it is a primitive
 * @ignore
 * @alias module:isPrimitive
 */
const isPrimitive = (value: any): boolean => isNumber(value) || isString(value) || isBoolean(value) || isNil(value)
/**
 * @module isPrimitive
 */
export default isPrimitive

