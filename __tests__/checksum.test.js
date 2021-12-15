/* global test, describe, expect */
const range = require('lodash/range')
const checksum = require('../checksum')
describe('async-utils/checksum', () => {
  test('works with primitives', () => {
    const testItems = [
      'foo',
      3,
      true,
      false,
      null,
      undefined
    ]
    for (let item of testItems) {
      expect(() => {
        checksum(item)
      }).not.toThrow()
    }
  })
  test('no hash collision when swapping property names', () => {
    const A = {
      a: true,
      b: {
        c: true
      },
      d: 'asdf'
    }
    const B = {
      c: true,
      b: {
        a: true
      },
      d: 'fdsa'
    }
    const keyA = checksum(A)
    const keyB = checksum(B)
    expect(keyA).not.toBe(keyB)
  })
  test('supports passing in arbitrary arguments', () => {
    const collectionName = `${Math.random() * 10}`
    expect(
      checksum(collectionName, range(100))
    ).toBe(
      checksum(collectionName, range(100))
    )
    expect(
      checksum(collectionName, range(100))
    ).not.toBe(
      checksum(collectionName, ...range(100))
    )
  })
  test('matching objects produce the same checksum', () => {
    const A = {
      'method': 'GET',
      'params': {
        'before': '2018-12-18T22:13:36.411Z',
        'after': '2018-11-18T22:13:36.409Z'
      }
    }
    const B = {
      'method': 'GET',
      'params': {
        'before': '2018-12-18T22:13:36.411Z',
        'after': '2018-11-18T22:13:36.409Z'
      }
    }
    expect(
      checksum(A)
    ).toBe(
      checksum(B)
    )
  })
})
