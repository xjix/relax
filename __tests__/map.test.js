/* global describe, test, expect */

const map = require('../map')
const range = require('lodash/range')

describe('async-utils/map', async () => {
  test('async map', async () => {
    expect.assertions(2)
    const resultA = await map([1, 2, 3], (n) => n + 1)
    const resultB = await map([1, 2, 3], (n) => n * 5)
    expect(resultA).toEqual([2, 3, 4])
    expect(resultB).toEqual([5, 10, 15])
  })

  test('handles arguments object', async () => {
    const fn = function () {
      expect(arguments.map).not.toBeDefined()
      expect(arguments).toHaveLength(1)
      return map(arguments, (n) => n + 1)
    }
    const result = await fn(1)
    expect(result).toEqual([2])
  })

  test('handles very large collections', async () => {
    expect.assertions(1)
    const result = await map(range(0, 1000), (n) => n + 1)
    expect(result.length).toBe(1000)
  })

  test('handles empty collections', async () => {
    const result = await map(undefined, (n) => n + 1)
    expect(result).toEqual([])
  })

  test('works with collections of objects', async () => {
    expect.assertions(3)
    const collection = [
      {
        id: 1,
        score: 1
      },
      {
        id: 2,
        score: 2
      },
      {
        id: 3,
        score: 3
      }
    ]
    const result = await map(collection, (user) => {
      return {
        ...user,
        score: user.score + 1
      }
    })
    collection.forEach((user, i) => {
      expect(result[i]).toMatchObject({
        id: i + 1,
        score: i + 2
      })
    })
  })

  test('handles async functions', async () => {
    expect.assertions(2)
    const resultA = await map([1, 2, 3], async (n) => n + 1)
    const resultB = await map([1, 2, 3], async (n) => n * 5)
    expect(resultA).toEqual([2, 3, 4])
    expect(resultB).toEqual([5, 10, 15])
  })

  test('handles nested async functions', async () => {
    const collection = [1, 2, 3]
    const addOne = async (n) => n + 1
    const timesFive = async (n) => n * 5
    const result = await map(collection, async (n) => {
      const a = await addOne(n)
      const b = await timesFive(n)
      const [x, y] = await map([a, b], async (z) => {
        const v = await timesFive(z)
        return v
      })
      return x + y
    })
    expect(result).toEqual([35, 65, 95])
  })
})
