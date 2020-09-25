const http = require('http');
const fs = require('fs');
const server = http.createServer();
server.on('request', (request, response) => {
    // 解决汉字乱码问题
    // response.writeHead(200, { 'Content-Type': 'text/html' });  // 普通文本
    // response.setHeader('Content-Type', 'text/html; charset=utf-8');  // html格式文本
    const url = request.url;

    switch (url) {
        case '/':
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.readFile('./static/index.html', (error, data) => {
                response.end(data);
            })
            break;
        case '/img':
            response.setHeader('Content-Type', 'image/jpeg;');
            fs.readFile('./static/西装暴徒.jpg', (error, data) => {
                if (error) {
                    content = "请求文件路径有误！"
                } else {
                    response.end(data);
                }
            })
            break;
        default:
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.end('<h1 style="color:#999; font-size:80px; margin:0 auto;">404</h1>');
            break;
    }
})

//网络通讯需要绑定端口号
server.listen(3000, () => {
    console.log('node服务启动成功，可通过：http://172.31.240.82:3000 进行访问');
});