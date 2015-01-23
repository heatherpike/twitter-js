var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');

var app = express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', './views');

swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );
});

var port = 3000;

app.listen(port, function () {
	console.log('server listening');
});