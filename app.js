var express = require( 'express' );  //for installed libraries we don't need ./ but for folders we do
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');
var bodyParser = require('body-parser')

var socketio = require('socket.io');

var app = express();

var server = app.listen(3000);
var io = socketio.listen(server);



//var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

//static file server
//express.static(...) is an event handler
app.use(express.static('public'));

//custom file server example
// app.use(function (req, res, data) {
// 	require('fs').readFile(_dirname + '/public' + req.path),
// 	if (err) next();
// 	else res.send(data);
// });

routes(app, io);

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', './views');

swig.setDefaults({ cache: false });

// app.listen(port, function () {
// 	console.log('server listening');
// });