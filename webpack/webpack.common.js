/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require("copy-webpack-plugin");

const srcDir = "../src/";

module.exports = {
  entry: {
    "content-script": path.join(__dirname, `${srcDir}content-script.ts`),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
    }),
  ],
};
