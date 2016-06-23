var webpack = require('webpack');
var path = require('path');


// Webpack Config
var webpackConfig = {
  devtool: "#source-map",
  entry: {
    'angular2polyfills': [
      'ie-shim',
      'core-js/es6/symbol',
      'core-js/es6/object',
      'core-js/es6/function',
      'core-js/es6/parse-int',
      'core-js/es6/parse-float',
      'core-js/es6/number',
      'core-js/es6/math',
      'core-js/es6/string',
      'core-js/es6/date',
      'core-js/es6/array',
      'core-js/es6/regexp',
      'core-js/es6/map',
      'core-js/es6/set',
      'core-js/es6/weak-map',
      'core-js/es6/weak-set',
      'core-js/es6/typed',
      'core-js/es6/reflect',
      // 'core-js/es6/promise', // problem with firefox
      'core-js/es7/reflect',
      'zone.js/dist/zone',
      'zone.js/dist/long-stack-trace-zone',
    ],
    'angular2vendor': [
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/forms',
      '@angular/http',
      '@angular/router',
    ]
  },

  output: {
    path: './dist',
    filename: 'dll.[name].[hash].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    library: '__DLL_[name]',
  },


  plugins: [
    new webpack.DllPlugin({
      name: '[vendor]',
      path: 'dist/vendor-manifest.json',
    }),
    new webpack.DllPlugin({
      name: 'polyfills',
      path: 'dist/polyfills-manifest.json',
    }),
  ],

  module: {
      preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.resolve(__dirname, 'node_modules', 'rxjs'),
          path.resolve(__dirname, 'node_modules', '@angular'),
          path.resolve(__dirname, 'node_modules', '@ngrx'),
          path.resolve(__dirname, 'node_modules', '@angular2-material'),
        ]
      }

    ],
    loaders: [
    ]
  },

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};



module.exports = webpackConfig;
