const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'sockjs-client': 'sockjs-client',
        'webstomp-client': 'webstomp-client',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.jdoodle.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/v1/stomp': '/v1/stomp',  // WebSocket proxy
          '^/api/v1/execute': '/v1/execute',  // REST API proxy
          '^/api/v1/auth-token': '/v1/auth-token' // Auth Token
        },
      },
    },
  },
})
