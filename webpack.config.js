const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your main JS file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true, // Cleans the dist folder before each build
    assetModuleFilename: 'assets/[hash][ext][query]' // For images
  },
  mode: 'development', // Change to 'production' for optimized build
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'] // Handles HTML imports (e.g. <img src=...>)
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // CSS into JS and injects to DOM
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource' // Asset Modules for images
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional: For ES6+ support
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Your base HTML file
      filename: 'index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true
  },
  devtool: 'source-map' // Optional: Helps with debugging
};

// npm install
// npm install --save-dev webpack webpack-cli webpack-dev-server \
// html-webpack-plugin html-loader css-loader style-loader \
// @babel/core @babel/preset-env babel-loader

