/* global jest, test, describe, expect */

const Queue = require('../Queue')
const range = require('lodash/range')

describe('Queue', () => {
  test('execute a task', () => {
    expect.assertions(1)
    const queue = Queue.create()
    const task = jest.fn()
    queue.push(task)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(expect(task).toHaveBeenCalledTimes(1))
      }, 20)
    })
  })

  test('execute multiple tasks', () => {
    expect.assertions(10)
    const queue = Queue.create()
    let tasks = []
    range(0, 10).forEach((i) => {
      const task = jest.fn()
      tasks.push(task)
      queue.push(task)
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        let promises = []
        tasks.forEach((task) => {
          promises.push(expect(task).toHaveBeenCalledTimes(1))
        })
        resolve(Promise.all(promises))
      }, 200)
    })
  })

  test('support custom "time to do more work" functions', () => {
    expect.assertions(2)
    const next = jest.fn()
    next.mockImplementation(() => {
      return new Promise((resolve) => resolve())
    })
    const queue = Queue.create({next})
    const task = jest.fn()
    queue.push(task)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Promise.all([
          expect(task).toHaveBeenCalledTimes(1),
          expect(next).toHaveBeenCalled()
        ]))
      }, 20)
    })
  })

  test('exceptions do not interrupt processing, support custom error handling', () => {
    expect.assertions(5)
    let err
    const onError = jest.fn()
    onError.mockImplementation((ex) => {
      err = ex
    })
    const queue = Queue.create({onError})
    const task = jest.fn()
    const errTask = jest.fn()
    errTask.mockImplementation(() => {
      throw new Error('i asplode')
    })
    queue.push(errTask)
    queue.push(task)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Promise.all([
          expect(err).toBeDefined(),
          expect(err).toMatchObject({
            message: 'i asplode'
          }),
          expect(task).toHaveBeenCalledTimes(1),
          expect(errTask).toHaveBeenCalledTimes(1),
          expect(onError).toHaveBeenCalled()
        ]))
      }, 50)
    })
  })
})
