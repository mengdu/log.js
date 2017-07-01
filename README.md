# log.js

log.js 是 node.js 的一个调试工具。支持彩色，还有
最大亮点那就是可以显示输出所在行的文件路径及行号。

## api

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

## 命令

```bat
node demo.js --dev
```

*参数:*

+ `--dev` 开发模式，开发模式会出现文件名和行号 
+ `--dev-show-path` 文件名显示绝对路径

注：显示文件名和行号会影响js性能，上线项目请自行删掉log，或者不加上面两个参数，会使用console.log。

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

## 期望

其实还可以加多点功能，比如：

+ 做更多的样式配置（请看https://github.com/Marak/colors.js）
+ 增加log的打印时间

