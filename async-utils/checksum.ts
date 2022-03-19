import MD5 from 'md5.js'
import stableStringify from 'fast-json-stable-stringify'
const paddingRegex = /=/g
/**
 * compute a the checksum of a javascript object.
 * @param {...*} input - any javascript object
 * @return {string}
 * @alias module:checksum
 */
const checksum = function (...input): string {
  let result = new MD5()
  result.update(stableStringify(input))
  return result.digest('base64').replace(paddingRegex, '')
}
/**
 * @module checksum
 */
export default checksum
