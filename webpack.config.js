const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map', //for development envt, not for production
    entry: ['webpack-hot-middleware/client', './client/client.js'],
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node-modules/,
            query: {
                presets: ['react', 'es2015', 'react-hmre'],
            },
            plugins: ['transform-object-rest-spread'],
        }],
    },
    output: {
        path: require('path').resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

}