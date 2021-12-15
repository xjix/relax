const MD5 = require('md5.js')
const stableStringify = require('fast-json-stable-stringify')
const paddingRegex = /=/g
/**
 * compute a the checksum of a javascript object.
 * @param {...*} obj - any javascript object
 * @return string
 * @alias module:checksum
 */
const checksum = function () {
  let result = new MD5()
  result.update(`${stableStringify([...arguments])}`)
  return result.digest('base64').replace(paddingRegex, '')
}
module.exports = checksum
