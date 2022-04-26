import { jsonStringify } from 'https://deno.land/x/stable_stringify@v0.2.1/jsonStringify.ts'

import {
  isArray,
  isEqual,
  isNil,
  isObject,
  clone,
  mergeWith,
  tail,
  transform
} from 'https://deno.land/x/lodash@4.17.19/lodash.js'

/**
 * replace all values in an object with `null`. used to generate the ORSet for
 * diffing operations.
 *
 * @param {Object} object
 * @return {Object}
 */
const nullify = (object) => transform(object, (result, value, key) => {
  result[key] = (isObject(value) && !isArray(value))
    ? nullify(value)
    : null
})

/**
 * @param {object} base
 * @param {object} object
 * @return {object}
 */
const difference = (base, object) => {
  const changes = (object, base) => {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key]) && !isArray(value))
          ? changes(value, base[key])
          : value
      }
    })
  }
  return (isNil(base))
    ? object
    : changes(object, base)
}

const merge = function (object, ...sources) {
  return mergeWith(object, ...sources, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue
    }
  })
}

const observedRemoveDiff = (base, object) => {
  const diff = difference(base, object)
  const inverseDiff = difference(object, base)
  const nullDiff = nullify(inverseDiff)
  const orDiff = merge({}, nullDiff, diff)
  return orDiff
}

/**
 * quickly determine if two objects differ
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 */
export const diff = (a, b) => jsonStringify(a) !== jsonStringify(b)

/**
 * @param {Object} base
 * @param {...Object} checkpoints
 * @returns {Object}
 */
export function Crdt() {
  const base = arguments[0]
  const diffs = tail(arguments).map((checkpoint) => diff(base, checkpoint))
  const patch = merge({}, ...diffs)
  return merge(clone(base), patch)
}
