const map = require('./map')
/**
 * @param {array} collection
 * @param {function(value)} fn
 * @alias module:forEach
 */
function forEach(collection, fn) {
  return map(collection, fn).then(() => collection)
}
/**
 * @module forEach
 */
module.exports = forEach
