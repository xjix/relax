/* global describe, test, expect */

const map = require('./map')
const range = require('lodash/range')

describe('async-utils/map', async () => {
  test('async map', async () => {
    expect.assertions(2)
    const resultA = await map([1, 2, 3], (n) => n + 1)
    const resultB = await map([1, 2, 3], (n) => n * 5)
    expect(resultA).toEqual([2, 3, 4])
    expect(resultB).toEqual([5, 10, 15])
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
})
