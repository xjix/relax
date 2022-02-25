import microTask from './microTask'

const defer = (): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), 10))

const logError = (err) => console.error(err)

interface QueueOptions {
  concurrency?: number;
  next?: () => Promise<any>;
  onError?: (Error) => void;
}

/**
 * @alias module:Queue
 */
class Queue {
  private active = 0;
  private queue = [];
  private next = defer;
  private onError = logError;
  concurrency = 2;
  constructor(options: QueueOptions = {}) {
    this.concurrency = options.concurrency || 2
    this.next = options.next || defer
    this.onError = options.onError || logError
    this.queue = []
    this.active = 0
  }
  private runTasks() {
    if (this.active < this.concurrency) {
      this.active++
      const task = this.queue.shift()
      if (task) {
        microTask(task).then(() => {
          this.active--
          this.next().then(() => this.runTasks())
        }).catch((err) => {
          this.onError(err)
          this.next().then(() => this.runTasks())
        })
      } else {
        this.active--
      }
    }
  }
  push(fn) {
    this.queue.push(fn)
    return this.runTasks()
  }
}

/**
 * @module Queue
 */
export default Queue
