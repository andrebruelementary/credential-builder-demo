const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    popup: './src/popup/popup.ts',
    background: './src/background/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/icons', to: 'icons' },
        { from: 'src/components/**/*.html', to: ({ context, absoluteFilename }) => {
          const relativePath = path.relative(path.join(context, 'src'), absoluteFilename);
          return relativePath;
        }},
        { from: 'src/popup/popup.css', to: 'popup.css' },
        { from: 'src/components/**/*.css', to: ({ context, absoluteFilename }) => {
          const relativePath = path.relative(path.join(context, 'src'), absoluteFilename);
          return relativePath;
        }}
      ],
    }),
  ],
};