const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const dev = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: { static: "./dist" },
};

module.exports = merge(common, dev);
