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
 * @alias module:pipe
 * @async
 * @param {any} predicate
 * @param {Array<function(value)>} fns
 * @return {Promise<any>}
 */
const pipe = (predicate, fns = []) => {
  return (fns.length)
    ? spawn(
      predicate,
      fns[0],
      fns.slice(1).reverse()
    )
    .catch((err) => {
      throw err
    })
    : Promise.resolve(predicate)
}


/**
 * @module pipe
 */
module.exports = pipe
