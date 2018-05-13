const express = require('express');
const path = require('path');
const config = require('../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const cors = require('cors');


const app = express();
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

app.use(cors());


const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
});

const port = 3000;
app.listen(port, (error) => {
    if (error) throw error;
    console.log('React JS server listening on port', port);
});
