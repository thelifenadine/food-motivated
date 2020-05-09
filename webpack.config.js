var serverConfig = require('./webpack.server.js');
var browserConfig = require('./webpack.dev.js');

module.exports = [browserConfig, serverConfig];