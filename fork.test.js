/* global describe, test, expect */

import range from 'lodash/range'
import fork from './fork'

describe('async-utils/fork', async () => {
  test('execute a series of async tasks', async () => {
    const result = await fork(1, [
      async (n) => n + 1,
      async (n) => n + 1,
      async (n) => n + 1
    ])
    expect(result).toEqual(4)
  })

  test('execute one async task', async () => {
    const result = await fork(1, [
      async (n) => n + 1
    ])
    expect(result).toEqual(2)
  })

  test('blow up when an error is encountered', async () => {
    expect.assertions(1)
    try {
      await fork(1, [
        async () => {
          throw new Error('something broke dog')
        }
      ])
    } catch (e) {
      expect(e).toMatchObject({message: 'something broke dog'})
    }
  })

  test('works with large chains of operations', async () => {
    expect.assertions(1)
    const result = await fork(1, range(1, 100000).map(() => async (n) => n + 1))
    expect(result).toEqual(100000)
  })
})
