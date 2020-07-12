/* eslint-disable */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
let packageJson = require("../package.json");

const srcDir = "../src/";

function modifyManifestVersion(buffer) {
  var manifest = JSON.parse(buffer.toString());
  manifest.version = packageJson.version;
  return JSON.stringify(manifest, null, 2);
}

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
      patterns: [
        {
          from: path.join(__dirname, "../manifest.json"),
          to: path.join(__dirname, "../dist/manifest.json"),
          transform(content, path) {
            return modifyManifestVersion(content);
          },
        },
        { from: ".", to: "../", context: "public" },
      ],
    }),
  ],
};
