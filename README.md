# log.js

log.js 是 node.js 的一个调试工具。

+ 支持彩色
+ 可以显示当前log调用脚本文件路径及行号

## api

+ log.config({debug, absolute}) 配置
+ log(string)
+ log.info(string)
+ log.success(string)
+ log.error(string)
+ log.warn(string)

# 用法

```js
const log = require('./log.js')

log('欢迎使用log.js。')

log.info('这是info提示信息')
log.success('这是success提示信息')
log.error('这是error提示信息')
log.warn('这是warn提示信息')

// 自定义log
log.addLog('test', 'cyan')

log.test('这是自定义的log')

log.addLog('debug', 'magenta')

log.debug('这是自定义的log')

```

可以运行 `demo.js` 查看效果



注：显示文件名和行号会影响js性能，上线项目请自行删掉log，或者配置debug为false

## 效果图


![截图1][1]
![截图2][2]

[1]: imgs/20170701212517.png
[2]: imgs/20170701212625.png

## 自定义log

```
log.addLog('名字', '颜色')

log.名字(str)

```

支持颜色有：
```
    white
    grey
    black
    blue
    cyan
    green
    magenta
    red
    yellow
```


## other

[colors](https://github.com/Marak/colors.js)
