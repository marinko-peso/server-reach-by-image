const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: './reach.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          // https://github.com/webpack/webpack/issues/6567
          inline: false
        }
      })
    ]
  },
  resolve: {
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      }
    ]
  },
  plugins: [],
  devServer: {
    port: 3000
  }
};
