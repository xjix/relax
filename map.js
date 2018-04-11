import microTask from './microTask'

/**
 * @param {array} collection
 * @param {function(value)} fn
 */
export default async (collection, fn) => {
  const ps = collection.map((value) => microTask(() => fn(value)))
  return Promise.all(ps)
}
