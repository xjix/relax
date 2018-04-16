const microTask = require('./microTask')

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
module.exports = (collection = [], fn) => {
  const ps = collection.map((value) => microTask(() => fn(value)))
  return Promise.all(ps)
}
