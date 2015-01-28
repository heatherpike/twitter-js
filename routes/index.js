

	//var express = require('express');
	var tweetBank = require('../tweetBank');
	//var router = express.Router(); 

	//var io = require('socket.io');

	// var server = app.listen(3000);
	// var io = socketio.listen(server);

module.exports = function (app, io) {
	app.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
	  console.log("hey");
	});

	app.get('/users/:name', function(req, res) {
	  //req.params.name refers to the parameters passed into the request (url typed into client - so name refers to /:name above)
	  var name = req.params.name;
	  var list = tweetBank.find( {name: name} );
	  res.render( 'index', { title: 'Twitter.js - Posts by '+name, name: name, tweets: list, showForm: true  } );
	});

	app.get('/users/:name/tweets/:id', function(req, res) {
	  var name = req.params.name;
	  var id = req.params.id; //could do parseInt on this line instead of Number below
	  var tweet = tweetBank.find( {id: Number(id) } );
	  res.render( 'index', { title: 'Twitter.js - Tweet by '+name, tweets: tweet } );
	});

	app.post('/submit', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  var allTweets = tweetBank.list();
	  var new_tweet = allTweets[allTweets.length-1];
	  io.sockets.emit('new_tweet', { });
	  res.redirect('/');
	});

};