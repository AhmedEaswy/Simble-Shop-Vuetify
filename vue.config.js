// const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: 'https://student.valuxapps.com/api/',
  }
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "@": path.resolve(__dirname, './src/')
  //     }
  //   }
  // }
};
