const webpack = require("webpack");

console.log(__dirname);

var appConfiguration = require(`./configuration/${process.argv[4]}.json`);

var plugins = [new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL
  },

  CONFIGURATION: JSON.stringify(appConfiguration),
  APPLICATIONVERSION: JSON.stringify(appConfiguration.applicationVersion)
}),
];

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: [/node_modules/, /public\/libs/, /libs/],
      }
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    plugins: plugins,
  },
  devServer: { https: false },
}

