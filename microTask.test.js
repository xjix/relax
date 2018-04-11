/* global describe, test, expect */

import microTask from './microTask'

describe('microTask', () => {
  test('execute a task', () => {
    expect.assertions(1)
    return microTask(() => 'my task').then((ret) => {
      expect(ret).toBe('my task')
    })
  })

  test('handle exceptions', () => {
    expect.assertions(1)
    return microTask(() => {
      throw new Error('error')
    }).catch((e) => {
      expect(e.message).toBe('error')
    })
  })
})
