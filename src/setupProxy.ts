const proxy = require('http-proxy-middleware');

module.exports = function setProxy(app: any) {
    app.use(proxy('/api', {
        // target: 'http://localhost:9090',  // 开发使用
        target: 'http://8.130.29.92:9090', // 发布使用
        pathRewrite: {
            '^/api': '/',
        },
    }));
};

export {}
