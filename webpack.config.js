const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/app/application.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'application-[chunkhash].js',
    assetModuleFilename: '[name]-[hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false
              },
              sourceMap: false
            }
          }
        ]
      },

      {
        test: /\.(mp3)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'application-[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/app/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src/')
    },
    extensions: ['.ts', '.js']
  },
  target: ['web', 'es5']
}
