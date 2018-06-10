const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './components/App.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
          use: [
              {
                  loader: 'babel-loader',
                  options: {
                      presets: ['react','stage-3']
                  }
              }
          ],
      },{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url'
        }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
      new HtmlWebpackPlugin({template: __dirname + '/index.html'})
  ],
  devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      proxy: {
          "/api": {
              target: "http://localhost:4200/api",
              pathRewrite: {"^/api": ""},
          }
      }
  }

};
