const http = require('http');
const fs = require('fs');
const template = require('art-template')

//前后端贯通我们即可为所欲为！ :)
//我们为了方便的统一处理这些静态资源，图片、css、js 所以我们把约定好的静态资源统一存放在
//static静态资源文件

const url = require('url');
//使用node内置模块url来处理用户发起的请求获取  判断他的请求路径来执行相应的操作
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


let comments = [{
    name: '测试数据',
    message: '这是一条测试数据呀~~',
    dateTime: '2020-09-18 14:23:12'
}]

http.createServer((req, res) => {
    let query = url.parse(req.url, true)
    if (query.pathname === '/') {
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }

            let htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr);
        })
    } else if (query.pathname === '/post') {
        fs.readFile('./views/post.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);

        })
    } else if (query.pathname.indexOf('/static/') === 0) {
        // 如果请求路径以static开头的，则认为你要获取某个static文件下的某个静态资源
        // 所以我们就直接可以把请求路径作为文件路径来直接进行读取
        fs.readFile('.' + req.url, (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        })
    } else if (query.pathname === "/postmessage") {
        let tiem = new Date();
        let date = dateFormat("YYYY-mm-dd HH:MM:SS", tiem);
        query.query.dateTime = date;
        console.log(query.query);

        comments.unshift(query.query)
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        })
    }

}).listen(3000, () => {
    console.log('服务已启动');

})