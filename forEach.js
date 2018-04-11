import map from './map'

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
export default async (collection, fn) => {
  return map(collection, fn).then(() => Promise.resolve(collection))
}
