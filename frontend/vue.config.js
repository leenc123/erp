const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  // 基础配置
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: "static",
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 2048,
        deleteOriginalAssets: false,
        minRatio: 0.8,
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#50799e',
          'text-color': '#6e6e6e',
          'border-color': '#eee',
          'nice-blue': '#f0f'

        },
      },
    },
  },
  // 只在开发环境配置 devServer
  ...(process.env.NODE_ENV === 'development' && {
    devServer: {
      proxy: {
        "/api": {
        target: "http://192.168.1.166:8000",
        changeOrigin: true,
      },
      }
    }
  })
};
