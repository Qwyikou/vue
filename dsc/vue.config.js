module.exports = {
    publicPath:"./",
    devServer: {
        // host: "localhost",
        host: "0.0.0.0",
        port: "9527",
        open: true,
        proxy: {  //配置跨域请求
            "/api": {  //以后再使用数据请求的时候用 /api 代替  https://x.dscmall.cn/api
                target: "https://x.dscmall.cn/api",  //配置要代理的域名
                changeOrigin: true,  //允许跨域
                pathRewrite: {  //路径重写
                    "^/api": "",
                }
            }
        }
    }
}