// require 是一种方法用来加载模块   说白了就是加载执行代码的作用
// node中有三种模块:
// 1、具名模块  例：fs、http
// 2、用户自己编写的文件模块
console.log('执行a.js文件');
// 相对路径必须添加./  否则node会将  b.js当作为node的核心文件报错
//既然是模块作用域，那如何让A模块与B模块之间通信  默认是封闭的无法访问
//require  两个作用
// 1、加载文件模块并执行里面的代码
// 2、拿到被加载文件模块中导出的接口对象

// 每个模块中提供一个对象  
// exports默认是以个空对象
let bExports = require('./b.js');

console.log('结束a.js文件');
console.log(bExports.ggg);
console.log(bExports.add(3, 7));



//在Node中没有全局作用域，只有模块中域。  也就是变量只可在自己的文件作用域内使用  内访问不到外    外访问不到内
const foo = "111";
console.log(foo);