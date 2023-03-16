const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    proxy: {
      "^/api": {
        target: "https://t2.hqs.link/app/18",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
});
