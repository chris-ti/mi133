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
        use: ['babel-loader']
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
    contentBase: './dist'
  }

};
