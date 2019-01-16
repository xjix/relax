const microTask = require('./microTask')

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
module.exports = (collection = [], fn) => {
  let ps = []
  for (let value of collection) {
    ps.push(
      microTask(() => fn(value))
    )
  }
  return Promise.all(ps)
}
