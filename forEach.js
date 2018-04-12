const map = require('./map')

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
module.exports = (collection, fn) => {
  return map(collection, fn).then(() => Promise.resolve(collection))
}
