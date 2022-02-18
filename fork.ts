exports.fork = (function () {
  console.warn('[DEPRECATION WARNING] @relax/async-utils/fork is now called pipe!')
  return require('./pipe')
}())
