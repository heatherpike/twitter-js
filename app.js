var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');

var app = express();

app.use('/', routes);

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use(express.static('public'));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', './views');

swig.setDefaults({ cache: false });

var port = 3000;

app.listen(port, function () {
	console.log('server listening');
});