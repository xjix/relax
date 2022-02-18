/**
 * schedule a task to run on nextTick
 *
 * @alias module:microTask
 * @async
 * @param {function} fn
 * @alias module:microTask
 */
const microTask = (fn) => new Promise((resolve, reject) => {
  try {
    resolve(fn())
  } catch (err) {
    reject(err)
  }
})
/**
 * @module microTask
 */
export default microTask
