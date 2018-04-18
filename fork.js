const microTask = require('./microTask')

const spawn = (predicate, fn, rest) => microTask(() => fn(predicate))
  .then((result) => {
    if (rest.length === 0) {
      return result
    } else {
      const next = rest.pop()
      return spawn(result, next, rest)
    }
  })
  .catch((err) => {
    throw err
  })

/**
 * execute a chain of async operations using the return value of each function
 * as the argument for the next
 *
 * @alias module:fork
 * @async
 * @param {Array<function(value)>} fns
 * @param {any} predicate
 * @return {any}
 */
const fork = (predicate, fns = []) => {
  return (fns.length)
    ? spawn(
      predicate,
      fns[0],
      fns.slice(1).reverse()
    )
    .catch((err) => {
      throw err
    })
    : predicate
}


/**
 * @module fork
 */
module.exports = fork
