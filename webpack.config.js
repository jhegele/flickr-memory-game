var path = require('path');

module.exports = {
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    entry: ['babel-polyfill', './bundle/index.js'],
    output: {
    filename: 'bundle.js',
        path: path.resolve(__dirname, './app/static/js')
    }
};