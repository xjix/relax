type Pattern = [Function, Function] | Function
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
 * corresponding handlers.
 * @alias module:matchCase
 * @async
 */
const matchCase = function (input, ...patterns: Pattern[]) {
  for (let maybePattern of patterns) {
    if (typeof maybePattern === 'function') {
      const ifNoneMatch = maybePattern
      return ifNoneMatch()
    } else {
      const [ Type, handler ] = maybePattern
      if (input instanceof Type) {
        return handler()
      }
    }
  }
}
/**
 * @module matchCase
 */
export default matchCase
