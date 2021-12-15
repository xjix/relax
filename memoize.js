/** @module memoize */
import clone from 'lodash/cloneDeep'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import MD5 from 'md5.js'
import stringify from 'fast-json-stable-stringify'
import toString from 'lodash/toString'
const paddingRegex = /=/g
/**
 * @ignore
 * @return string
 */
const checksum = function () {
  let result = new MD5()
  result.update(`${stringify([...arguments])}`)
  return result.digest('base64').replace(paddingRegex, '')
}
/**
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
const isPromise = (value) => (value instanceof Promise)

// no singleton please
// memcache ;)
let cache = {}
/**
 * @ignore
 * @param {string} key
 * @param {string} cacheGroup
 */
const getItem = (key, cacheGroup) => {
  return get(cache, `['${cacheGroup}']['${key}']`)
}
/**
 * @ignore
 * @param {string} key
 * @param {string} cacheGroup
 */
const evictItem = (key, cacheGroup) => {
  if (cache[cacheGroup]) {
    delete cache[cacheGroup][key]
  } else {
    console.warn('[memoize] evicting unknown cache group member')
  }
}
/**
 * if the memoized function returns a promise, we need some special treatment so
 * we don't cache rejections
 * @ignore
 */
const setItem = (returnValue, key, cacheGroup) => {
  if (!cache[cacheGroup]) {
    cache[cacheGroup] = {}
  }
  if (isPromise(returnValue)) {
    cache[cacheGroup][key] = new Promise((resolve, reject) => {
      returnValue.then(resolve).catch((err) => {
        console.warn('[memoize] callee rejected, invalidating cache..')
        evictItem(key, cacheGroup)
        reject(err)
      })
    })
  } else {
    cache[cacheGroup][key] = returnValue
  }
  return getItem(key, cacheGroup)
}
/**
 * @ignore
 */
const setEvictItemTimer = (ttl, key, cacheGroup) => {
  setTimeout(() => {
    evictItem(key, cacheGroup)
  }, ttl)
}
/**
 * @ignore
 * @param {function} identity - returns a unique key for each input
 * @param {function} fn
 * @param {array} args
 */
const getKey = (identity, fn, args) => identity([ fn.name, fn.toString(), args ])
/**
 * cache the result of a function call in memory.
 * @param {function} fn - the function that is being memoized
 * @param {array} args - arguments that should be passed into fn
 * @param {number|{group: string, value: number}} ttl - time to live value and
 * cache group
 */
const memoize = (
  fn,
  args = [],
  ttl = 1000 * 60 * 60,
  identity = null
) => {
  const key = getKey(identity || checksum, fn, args)
  const ttlShorthand = isNumber(ttl)
  const ttlValue = (ttlShorthand) ? ttl : get(ttl, 'value')
  const cacheGroup = (ttlShorthand) ? 'root' : get(ttl, 'group')
  // console.log('[memoize]', ttl, ttlValue, cacheGroup)
  const cachedResult = getItem(key, cacheGroup)
  let result
  if (cachedResult === undefined) {
    const returnValue = fn(...args)
    result = setItem(returnValue, key, cacheGroup)
    setEvictItemTimer(ttlValue, key, cacheGroup)
  } else {
    result = cachedResult
  }
  // console.log('[memoize]', cache)
  return result
}
/**
 * evict a group of cached objects
 * @param {string} cacheGroup
 */
memoize.clear = (cacheGroup) => {
  if (cacheGroup) {
    cache[cacheGroup] = {}
  } else {
    for (let group of Object.keys(cache)) {
      if (group) {
        memoize.clear(group)
      }
    }
  }
}
/**
 * view a copy of the cache
 */
Object.defineProperty(memoize, 'cache', {
  get () {
    return clone(cache)
  }
})
export default memoize
