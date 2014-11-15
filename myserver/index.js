var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongojs=require('mongojs')
var bodyParser = require('body-parser')
var db = mongojs('my_server',['std']);


var lastRfcard = {};

io.emit('some event', { for: 'everyone' });

app.use(bodyParser.json())
app.get('/', function(req, res){
  res.sendfile('index.html');
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
});


app.get('/api/show',function(req,res){
	res.send(lastRfcard);
})
