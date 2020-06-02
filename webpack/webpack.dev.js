/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
});
