let a = "JY"
console.log(a);

// 读写文件
//fs是file-system    文件系统   
//node  操作文件   需要引入  fs模块  fs中有具体操作文件的api

//1、引入fs模块
const fs = require('fs');

//2、读取文件
//参数 1、文件路径 2、回调函数 
//回调函数参数   第一个：error  错误对象   第二个：data  读取数据    


// 错误读取演示
// fs.readFile('../testsdsd.txt', (error, data) => {  
//     if (error) {
//         console.log('读取文件失败', error);
//         return false;
//     }
// })

//正确演示
fs.readFile('../test.txt', (error, data) => {
    console.log(data.toString());
})

//3、写文件 （原来文件内容会被清空，也就是新写入的内容替换源文件内容）
//三个参数  1.文件路径  2.写入内容  3.回调函数
fs.writeFile('../test.txt', '这是我使用node写入的内容', (error) => {
    console.log('写入成功！');
})