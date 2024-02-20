const path = require("path");

module.exports = {
  entry: "./client/app.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js[x]*$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
