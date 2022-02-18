const microTask = require('./microTask')

const defer = (fn) => new Promise((resolve) => setTimeout(() => resolve(), 10))

const logError = (err) => console.error(err)

const Queue = {
  create (options = {}) {
    const concurrency = options.concurrency || 2
    const next = options.next || defer
    const onError = options.onError || logError
    let queue = []
    let active = 0
    const runTasks = () => {
      if (active < concurrency) {
        active++
        const task = queue.shift()
        if (task) {
          microTask(task).then(() => {
            active--
            next().then(() => runTasks())
          }).catch((err) => {
            onError(err)
            next().then(() => runTasks())
          })
        } else {
          active--
        }
      }
    }
    return {
      push (fn) {
        queue.push(fn)
        return runTasks()
      }
    }
  }
}

module.exports = Queue
