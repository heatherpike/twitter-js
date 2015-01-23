var express = require( 'express' );
var morgan = require('morgan');

var app = express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.get('/', function (req, res) {
  res.send('hello, world!')
});

var port = 3000;

app.listen(port, function () {
	console.log('server listening');
});