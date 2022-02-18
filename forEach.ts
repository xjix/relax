import map from './map'
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
export default forEach
