const log = require('./lib/log.js')

// log.config({
//   debug: false,
//   absolute: true
// })

log('欢迎使用log.js。')

// log.info('这是info提示信息')
// log.success('这是success提示信息')
// log.error('这是error提示信息')
// log.warn('这是warn提示信息')

// // 自定义log
// log.addLog('test', 'cyan')

// log.test('这是自定义的log')

// log.addLog('debug', 'magenta')

// log.debug('这是自定义的log')

// var obj = {
//   name: 'xxx',
//   arr: [1, 3]
// }
// log.info('sdf', obj, obj)

require('./demo/index')

