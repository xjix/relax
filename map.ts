import microTask from './microTask'
/**
 * @param {array} collection
 * @param {function(value)} fn
 * @alias module:map
 */
export default function map(collection = [], fn) {
  let ps = []
  for (let value of collection) {
    ps.push(
      microTask(() => fn(value))
    )
  }
  return Promise.all(ps)
}
