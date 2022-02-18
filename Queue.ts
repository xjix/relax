import microTask from './microTask'

const defer = (fn): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), 10))

const logError = (err) => console.error(err)

interface QueueCreateOptions {
  concurrency?: number;
  next?: Function;
  onError?: Function;
}

/**
 * @alias module:Queue
 */
const Queue = {
  create (options: QueueCreateOptions = {}) {
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
/**
 * @module Queue
 */
export default Queue
