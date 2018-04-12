/**
 * schedule a task to run on nextTick
 *
 * @alias module:microTask
 * @async
 * @param {function} fn
 */
const microTask = (fn) => Promise.resolve().then(() => new Promise((resolve, reject) => {
  try {
    resolve(fn())
  } catch (err) {
    reject(err)
  }
}))

/**
 * @module microTask
 */
module.exports = microTask
