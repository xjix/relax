export default async (collection, fn) => {
  const ps = collection.map(async (value) => {
    const result = await fn(value)
    return result
  })
  return Promise.all(ps)
}
