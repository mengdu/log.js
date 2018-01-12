/**
* Get callsites from the V8 stack trace API
* reutrn stack
* stack.getTypeName()
* stack.getFunctionName()
* stack.getMethodName()
* stack.getFileName()
* stack.getLineNumber()
* stack.getColumnNumber()
* stack.getEvalOrigin()
**/
const callsites = function () {
  var orig = Error.prepareStackTrace
  Error.prepareStackTrace = function (_, stack) {return stack}
  var err = new Error()
  Error.captureStackTrace(err, arguments.callee)
  Error.prepareStackTrace = orig
  return err.stack[0]
}

module.exports = callsites
