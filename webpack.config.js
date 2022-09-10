const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "client/src", "index.js"),
  output: {
    path:path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  // loaders: [
  //   {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
  //   {loader: 'style-loader!css-loader', test: /\.css$/},
  //   {loader: 'url-loader', test: /\.gif$/},
  //   {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
  // ],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client/src", "index.html"),
    }),
  ],
}