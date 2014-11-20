var express=require('express')
var mongojs=require('mongojs')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var db = mongojs('my_server',['std']);


var lastRfcard = {};

app.use(express.static(__dirname+'/public'));

io.emit('some event', { for: 'everyone' });

app.use(bodyParser.json())
app.get('/', function(req, res){
  res.redirect('/showrt.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/api/std',function(req,res){
	db.std.find({},function(err,books){
	res.send(books);	
	});
	
});

app.post('/api/show',function(req,res){		
	lastRfcard=req.body
	console.log(lastRfcard);	
	io.emit('sendRF', lastRfcard.name);
	io.emit('book:reflesh',lastRfcard);
});


app.get('/api/show',function(req,res){
	res.send(lastRfcard);
});

app.get('/api/main',function(req,res){
	res.redirect('/main.html');
})
