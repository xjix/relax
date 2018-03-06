/* global describe, test, expect */

import map from './map'
import range from 'lodash/range'

describe('async-utils/map', async () => {
  test('async map', async () => {
    expect.assertions(1)
    const result = await map([1, 2, 3], async (n) => n + 1)
    expect(result).toEqual([2, 3, 4])
  })

  test('handles very large collections', async () => {
    expect.assertions(1)
    const result = await map(range(0, 1000), async (n) => n + 1)
    expect(result.length).toBe(1000)
  })
})
