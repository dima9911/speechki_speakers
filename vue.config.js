const path = require("path");

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  devServer: {
    proxy: "https://api.books.speechkit.ru",
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("Views", path.resolve(__dirname, "src/views"))
      .set("Helpers", path.resolve(__dirname, "src/helpers"));
  },
};
