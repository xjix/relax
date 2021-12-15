const checksum = require('./checksum')
const clone = require('lodash/cloneDeep')
const get = require('lodash/get')
const isNumber = require('lodash/isNumber')
const isPromise = require('./isPromise')
const toString = require('lodash/toString')
/**
 * @param {function} identity - returns a unique key for each input
 * @param {function} fn
 * @param {array} args
 * @ignore
 */
const getKey = (identity, fn, args) => identity([ fn.name, fn.toString(), args ])
/**
 * cache namespace cosntructor
 * the passed `identity` function is used to track which function made a
 * particular call so it can be associated with the cache. by default, memoize
 * uses the included checksum function.
 * @param {function} [identity] - optional identity function
 * @link module:checksum
 */
function Memoize(identity = null) {
  // memcache ;)
  let cache = {}
  /**
   * @param {string} key
   * @param {string} cacheGroup
   * @ignore
   */
  const getItem = (key, cacheGroup) => {
    return get(cache, `['${cacheGroup}']['${key}']`)
  }
  /**
   * @param {string} key
   * @param {string} cacheGroup
   * @ignore
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
          // console.warn('[memoize] callee rejected, invalidating cache..')
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
  memoize.clear = function clear(cacheGroup) {
    if (cacheGroup) {
      this.cache[cacheGroup] = {}
    } else {
      for (let group of Object.keys(this.cache)) {
        if (group) {
          this.clear(group)
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
  return memoize
}
/**
 * @module memoize
 */
module.exports = Memoize
