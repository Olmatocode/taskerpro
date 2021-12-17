module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/api' : {
                target: 'http://localhost:8090',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
}

