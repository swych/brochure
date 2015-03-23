var connect = require('connect');
var serveStatic = require('serve-static');
var PATH = require('path');

var serverPath = PATH.join(__dirname,'build');
var port = 9001;

connect().use(serveStatic(serverPath)).listen(port);
console.log('Listening on port '+port);