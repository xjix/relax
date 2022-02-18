/**
 * @param {*} value
 * @return {boolean}
 * @ignore
 * @alias module:isPromise
 */
const isPromise = (value) => (value instanceof Promise)
module.exports = isPromise
