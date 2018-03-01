/**
 * @param {array} collection
 * @param {function(value)} fn
 * @see {@link https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838}
 */
export default async (collection, fn) => {
  const ps = collection.map(async (value) => {
    const result = await fn(value)
    return result
  })
  return Promise.all(ps)
}
