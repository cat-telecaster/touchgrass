const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    contentScript: path.resolve(__dirname, "..", "src", "content", "index.ts"),
    background: path.resolve(__dirname, "..", "src", "background", "index.ts"),
    react: path.resolve(__dirname, "..", "src", "react", "index.tsx")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src", "index.html"),
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "manifest.json"),
        to: path.resolve(__dirname, "dist"),
      }]
    }),
  ],
};
