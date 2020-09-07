// 搭建web服务器
// node中提供了一个核心模块  http   作用是创建编写服务器

// 1. 加载http  核心模块

const http = require('http');


function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

//  创建htpp Web 服务器   返回一个Server实例
// 客户端发起数据请求
// 服务器接收请求   处理请求  反馈数据（发送响应）
const server = http.createServer();
//注册request请求事件，当客户端发送请求，就会自动触发服务器的request请求事件，然后执行第二个参数回调函数
// 请求事件处理函数接收两个参数 1.request 请求对象  2.response 详情对象
// request  请求对象：请求对象可以用来获取客户端的一些请求信息，例如路径、请求头信息
// response 响应对象：响应对象可以给客户端发送响应消息。
server.on('request', (request, response) => {
    console.log(`收到客户端请求，请求路径为：${request.url}`); //request.url = '/a/b/c/d' 为端口号后面的内容   例：http://localhost:3000/a/b/c/d  
    let tiem = new Date();
    let date = dateFormat("YYYY-mm-dd HH:MM:SS", tiem);
    //response对象有一个方法：write 可以给客户端发送响应数据
    // write可以使用多次，但最后一次一定要使用end来结束响应，否则客户端会一直等待。
    let content = "",
        url = request.url; //request.url  获取到的是端口号后面的路径。 
    switch (url) {
        case '/':
            content = "首页";
            break;
        case '/login':
            content = "登陆";
            break;
        case '/register':
            content = "注册";
            break;
        case '/haha':
            content = "哈哈哈";
            break;
        default:
            content = "404";
            break;
    }
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.write('');
    // response.write('');
    response.end(`<head><meta charset="utf-8"/><body>
    <h1 style="width: 840px; margin: 300px auto;">
    hello，这是一个由
    <span style="color: #f00;">node.js</span>
    搭建的服务器，创建连接成功。并对你说这样一句话："早睡早起身体好！"
    <p>${date}</p>
    <p>${content}</>
    </h1>
    </body></head>`);

})

//网络通讯需要绑定端口号
server.listen(3000, () => {
    console.log('node服务启动成功，可通过：http://172.31.240.82:3000 进行访问');
});


//ip地址定位计算机
//端口号定位服务器
//所有需要联网的软件都会开启一个端口号
//在一台计算机中可以同时开启多个服务，但要确保端口号不能重复占用