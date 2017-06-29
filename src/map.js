import map from 'lodash/map'

export default (collection, fn) => {
  return Promise.all(map(collection, (item) => new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn(item))
      } catch (e) {
        reject(e)
      }
    }, 0)
  })))
}
