/**
 * type-directed pattern matching. compares input with the given types via
 * `instanceof`.
 * ```
 * const [err, result] = await to(myAsyncFn())
 * matchCase(err,
 *   [TypeError, () => {
 *     // handle TypeError
 *   }],
 *   [HttpError, () => {
 *     // handle HttpError
 *   }]
 *   () => {
 *     // ifNoneMatch, handle result
 *   }
 * )
 * ```
 * @param {*} input
 * @param {...function[]} patterns - types to match against, and their
 * corresponding handlers.
 * @alias module:matchCase
 * @async
 */
const matchCase = function () {
  const args = Array.prototype.slice.call(arguments)
  const input = args[0]
  for (let [i, pattern] of Object.entries(types.slice(1))) {
    if (
      (i === args.length) &&
      (typeof pattern === 'function')
    ) {
      return pattern()
    } else if (
      (typeof pattern === 'object') &&
      (pattern.length === 2)
    ) {
      const [Type, handler] = pattern
      if (input instanceof Type) {
        return handler()
      }
    }
  }
}
/**
 * @module matchCase
 */
module.exports = matchCase
