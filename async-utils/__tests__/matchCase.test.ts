import matchCase from '../matchCase'
import to from '../to'
describe('match-case', () => {
  let myAsyncFn
  let handleTypeError
  let ifNoneMatch
  beforeEach(() => {
    myAsyncFn = jest.fn(async (f) => {
      if (!f) {
        throw new TypeError('fyuck')
      }
    })
    handleTypeError = jest.fn(() => true)
    ifNoneMatch = jest.fn(() => false)
  })
  test('example use of to', async () => {
    const [err, result] = await to(myAsyncFn())
    const returnValue = matchCase(err,
     [TypeError, handleTypeError],
     ifNoneMatch
    )
    expect(handleTypeError).toHaveBeenCalledTimes(1)
    expect(ifNoneMatch).toHaveBeenCalledTimes(0)
    expect(returnValue).toBe(true)
  })
  test('if-none-match', async () => {
    const [err, result] = await to(myAsyncFn(true))
    const returnValue = matchCase(err,
     [TypeError, handleTypeError],
     ifNoneMatch
    )
    expect(handleTypeError).toHaveBeenCalledTimes(0)
    expect(ifNoneMatch).toHaveBeenCalledTimes(1)
    expect(returnValue).toBe(false)
  })
})
