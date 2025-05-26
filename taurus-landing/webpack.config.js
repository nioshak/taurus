module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
        { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
        { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
        { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
      ],
    }),
  ],

  resolve: {
    alias: {
      cesium: path.resolve(__dirname, 'node_modules/cesium'),
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },

  // 🔧 ADD THIS
  module: {
    rules: [
      // Handle regular CSS files (your own)
      {
        test: /\.css$/,
        exclude: /cesium\/Build\/Cesium\/Widgets\/widgets\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Handle Cesium’s CSS without postcss-loader
      {
        test: /cesium\/Build\/Cesium\/Widgets\/widgets\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
