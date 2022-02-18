/**
 * simplify error checking for async processes. promotes shorter code with
 * explicit error handling up front.
 * ```
 * const [err, result] = await to(myAsyncFn())
 * if (err) {
 *   // handle error
 * } else {
 *   // happy path
 * }
 * ```
 * compared to the usual try..catch approach. these are simple contrived
 * examples, but in complex async processes the resulting code is typically
 * more linear, with less nested branches compared to the typical approach.
 * we give up the narrow error handling scope and handling errors is always
 * deferred until later by the grammar.
 * ```
 * try {
 *   const result = await myAsyncFn()
 *   // happy path
 * } catch (err) {
 *   // handle error
 * }
 * ```
 * @alias module:to
 * @async
 */
async function to<Type>(promise: Promise<Type>): Promise<[void, Type] | [Error, void]> {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    return [err, null]
  }
}
/**
 * @module to
 */
export default to
