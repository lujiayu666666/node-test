//获取机器信息
const os = require('os');
//获取操作路径
const path = require('path');



//获取CPU信息
console.log(os.cpus());
//获取内存大小
console.log(os.totalmem());

//获取路径后缀名
console.log(path.extname('D:/a/b/c/d/hello.txt'));