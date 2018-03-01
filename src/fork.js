import to from './to'

const exec = async (predicate, fn, rest) => {
  const [err, result] = await to(fn(predicate))
  if (err) {
    throw err
  } else {
    if (rest.length === 0) {
      return result
    } else {
      const next = rest.pop()
      return exec(result, next, rest)
    }
  }
}

/**
 * execute a chain of async operations using the return value of each function
 * as the argument for the next
 *
 * @param {any} predicate
 * @param {function[]} fns
 * @return {any}
 * @alias module:fork
 */
const fork = async (predicate, fns = []) => {
  const [err, result] = await to(exec(predicate, fns[0], fns.slice(1).reverse()))
  if (err) {
    throw err
  } else {
    return result
  }
}

/**
 * @module fork
 */
export default fork
