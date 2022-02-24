/* global describe, test, expect, jest, beforeEach */
import cloneDeep from 'lodash/cloneDeep'
import range from 'lodash/range'
import Memoize from '../memoize'
describe('async-utils/memoize', () => {
  let memoize
  jest.useFakeTimers()
  beforeEach(() => {
    if (memoize && memoize.clear) {
      memoize.clear()
    }
    memoize = Memoize()
  })
  test('only call passed function once if the same arguments are used in subsequent calls', () => {
    const fn = jest.fn((n) => n + 1)
    const result = memoize(fn, [1])
    expect(result).toBe(
      memoize(fn, [1])
    )
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('call function again once timeout expires', () => {
    const fn = jest.fn((n) => n + 2)
    range(10).forEach(() => {
      const result = memoize(fn, [2])
      expect(result).toBe(4)
    })
    expect(fn).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    memoize(fn, [2])
    expect(fn).toHaveBeenCalledTimes(2)
  })
  test('do not cache async functions that throw', async () => {
    const fn = jest.fn((n) => {
      return new Promise((resolve, reject) => {
        if (n < 100) {
          resolve(n)
        } else {
          reject(new Error(`ERR${n}`))
        }
      })
    })
    for (let n of range(10)) {
      const result = await memoize(fn, [n])
      expect(result).toBe(n)
    }
    const cache = cloneDeep(memoize.cache)
    try {
      await memoize(fn, [200])
    } catch (err) {
      expect(err.message).toBe('ERR200')
    }
    expect(cache).toEqual(memoize.cache)
  })
  test('do not cache functions that throw', () => {
    const fn = jest.fn((n) => {
      if (n < 100) {
        return n
      } else {
        throw new Error(`ERR${n}`)
      }
    })
    range(10).forEach((n) => {
      const result = memoize(fn, [n])
      expect(result).toBe(n)
    })
    const cache = cloneDeep(memoize.cache)
    try {
      memoize(fn, [200])
    } catch (err) {
      expect(err.message).toBe('ERR200')
    }
    expect(cache).toEqual(memoize.cache)
  })
  test('support for cache groups', () => {
    const fn = jest.fn((n) => {
      if (n < 100) {
        return n
      } else {
        throw new Error(`ERR${n}`)
      }
    })
    memoize(fn, [50], 1000)
    memoize(fn, [50], { value: 1000, group: 'foo' })
    expect(fn).toHaveBeenCalledTimes(2)
    expect(memoize.cache).toMatchObject({
      root: {
        '9CN3x8zZKRkAa8ABFgwiOA': 50
      },
      foo: {
        '9CN3x8zZKRkAa8ABFgwiOA': 50
      }
    })
    memoize.clear('foo')
    expect(memoize.cache).toMatchObject({
      root: {
        '9CN3x8zZKRkAa8ABFgwiOA': 50
      },
      foo: {}
    })
    memoize(fn, [50], { value: 1000, group: 'foo' })
    memoize.clear()
    expect(memoize.cache).toMatchObject({
      root: {},
      foo: {}
    })
  })
})
