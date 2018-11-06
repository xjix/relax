/* global describe, test, expect */

const range = require('lodash/range')
const fork = require('../fork')

describe('async-utils/fork', async () => {
  test('execute a series of async tasks', async () => {
    const result = await fork(1, [
      (n) => n + 1,
      (n) => n + 1,
      (n) => n + 1
    ])
    expect(result).toEqual(4)
  })

  test('execute one async task', async () => {
    const result = await fork(1, [
      (n) => n + 1
    ])
    expect(result).toEqual(2)
  })

  test('blow up when an error is encountered', async () => {
    expect.assertions(1)
    try {
      await fork(1, [
        () => {
          throw new Error('something broke dog')
        }
      ])
    } catch (e) {
      expect(e).toMatchObject({message: 'something broke dog'})
    }
  })

  test('works with large chains of operations', async () => {
    expect.assertions(1)
    const result = await fork(1, range(1, 100000).map(() => (n) => n + 1))
    expect(result).toEqual(100000)
  })

  test('handles empty function lists', async () => {
    expect.assertions(1)
    const result = await fork(1, [])
    expect(result).toBe(1)
  })
})
