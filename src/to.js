/**
 * @param {Promise} promise
 * @return {Promise}
 * @alias module:to
 */
const to = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err, undefined])
}

/**
 * @module to
 */
export default to