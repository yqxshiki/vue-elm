module.exports = {
  devServer: {
    open: true, //浏览器自动打开页面
    proxy: {
      //配置跨域
      '/api': {
        target: process.env.VUE_APP_URL,
        ws: true,
        changOrigin: true,
      }
    }
  }
}