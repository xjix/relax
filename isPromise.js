/**
 * @param {*} value
 * @return {boolean}
 * @ignore
 */
const isPromise = (value) => (value instanceof Promise)
module.exports = isPromise
