const microTask = require('./microTask')
const map = require('lodash/map')

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
module.exports = (collection = [], fn) => {
  const ps = Array.prototype.map.call(collection, (value) => microTask(() => fn(value)))
  return Promise.all(ps)
}
