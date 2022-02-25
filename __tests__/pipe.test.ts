/* global describe, test, expect */
import range from 'lodash/range'
import pipe from '../pipe'
describe('async-utils/pipe', () => {
  test('execute a series of async tasks', async () => {
    const result = await pipe(1, [
      (n) => n + 1,
      (n) => n + 1,
      (n) => n + 1
    ])
    expect(result).toEqual(4)
  })
  test('execute one async task', async () => {
    const result = await pipe(1, [
      (n) => n + 1
    ])
    expect(result).toEqual(2)
  })
  test('blow up when an error is encountered', async () => {
    expect.assertions(1)
    try {
      await pipe(1, [
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
    const result = await pipe(1, range(1, 100000).map(() => (n) => n + 1))
    expect(result).toEqual(100000)
  })
  test('handles empty function lists', async () => {
    expect.assertions(1)
    const result = await pipe(1, [])
    expect(result).toBe(1)
  })
})
