// https://en.wikipedia.org/wiki/ANSI_escape_code

var debug = true
var absolute = false

var path = require('path')

var rootName = path.dirname(process.argv[1])

const style = {  
    'bold'          : ['\x1B[1m',  '\x1B[22m'],  
    'italic'        : ['\x1B[3m',  '\x1B[23m'],  
    'underline'     : ['\x1B[4m',  '\x1B[24m'],  
    'inverse'       : ['\x1B[7m',  '\x1B[27m'],  
    'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
    
    'white'         : ['\x1B[37m', '\x1B[39m'],  
    'grey'          : ['\x1B[90m', '\x1B[39m'],  
    'black'         : ['\x1B[30m', '\x1B[39m'],  
    'blue'          : ['\x1B[34m', '\x1B[39m'],  
    'cyan'          : ['\x1B[36m', '\x1B[39m'],  
    'green'         : ['\x1B[32m', '\x1B[39m'],  
    'magenta'       : ['\x1B[35m', '\x1B[39m'],  
    'red'           : ['\x1B[31m', '\x1B[39m'],
    'yellow'        : ['\x1B[33m', '\x1B[39m'],

    'whiteBG'       : ['\x1B[47m', '\x1B[49m'],  
    'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],  
    'blackBG'       : ['\x1B[40m', '\x1B[49m'],  
    'blueBG'        : ['\x1B[44m', '\x1B[49m'],  
    'cyanBG'        : ['\x1B[46m', '\x1B[49m'],  
    'greenBG'       : ['\x1B[42m', '\x1B[49m'],  
    'magentaBG'     : ['\x1B[45m', '\x1B[49m'],  
    'redBG'         : ['\x1B[41m', '\x1B[49m'],  
    'yellowBG'      : ['\x1B[43m', '\x1B[49m']  
}
// console.log('\x1B[47m\x1B[30m%s\x1B[39m\x1B[49m', 'hello') //白底黑色字


const stack = function(){
  var orig = Error.prepareStackTrace
  Error.prepareStackTrace = function (_, stack) {return stack}
  var err = new Error
  Error.captureStackTrace(err, arguments.callee)
  var stack = err.stack
  Error.prepareStackTrace = orig
  return stack
}


const objToArr = function (obj) {
  var k
  var arr = []
  for (k in obj) {
    arr.push(obj[k])
  }
  return arr
}

const getLocation = function (callsite) {
  var fileName = ''
  if (!absolute) {
    fileName = callsite.getFileName().replace(rootName, '').replace(new RegExp('^\\' + path.sep + ''), '')
  } else {
    fileName = callsite.getFileName() 
  }
  return '\x1B[90m['+ fileName +':'+ callsite.getLineNumber() +']\x1B[39m'
}

const show = function (callsite, type, args) {
  var css = style[type]
  var params = []
  var i = 0, len = args.length
  for (;i < len; i++) {
    var val = typeof args[i] === 'object' ? JSON.stringify(args[i]) : args[i]
    if (css) {
      params.push(css[0] + val + css[1])
    } else {
      params.push(val)
    }
  }
  if (callsite) {
    params.unshift(getLocation(callsite))
  }
  return console.log.apply(null, params)
}

const log = function () {
  var callsite
  if (debug) {
    callsite = stack()[1]
  }
  return show(callsite, '', arguments)
}
log.config = function (op) {
  debug = typeof op.debug === 'undefined' ? true : op.debug
  absolute = op.absolute || false
}

log.info = function () {
  var callsite
  if (debug) {
    callsite = stack()[1]
  }
  return show(callsite, 'blue', arguments)
}
log.success = function () {
  var callsite
  if (debug) {
    callsite = stack()[1]
  }
  return show(callsite, 'green', arguments)
}
log.warn = function () {
  var callsite
  if (debug) {
    callsite = stack()[1]
  }
  return show(callsite, 'yellow', arguments)
}
log.error = function () {
  var callsite
  if (debug) {
    callsite = stack()[1]
  }
  return show(callsite, 'red', arguments)
}

log.addLog = function (name, type) {
  if (!name) throw(new Error('参数1必须传！'))
  log[name] = function () {
    var callsite
    if (debug) {
      callsite = stack()[1]
    }
    return show(callsite, type, arguments)
  }
}

module.exports = log
