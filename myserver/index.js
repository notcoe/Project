var express=require('express')
var mongojs=require('mongojs')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var db = mongojs('my_server',['std']);
var dbsave =mongojs('my_server',['st']);
var dbtime =mongojs('my_server',['time']);

var lastRfcard = {};
var ndate = {};
var savelast ={}

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

//for static
app.get('/api/time',function(req,res){
	dbtime.time.find({},function(err,data){
	res.send(data);	
	});
});

app.post('/api/show',function(req,res){		
	lastRfcard=req.body
	ndate = new Date();
	console.log(lastRfcard);
	savetime();
	console.log(savelast);
	io.emit('sendRF', lastRfcard.name);
	io.emit('book:reflesh',lastRfcard);

});


app.get('/api/savetime',function(req,res){
	dbsave.st.find({},function(err,savetime){
	res.send(savetime);	
	});

});


app.get('/api/show',function(req,res){
	res.send(lastRfcard);
});

app.get('/api/main',function(req,res){
	res.redirect('/main.html');
})


function savetime(){
	savelast ={	id:lastRfcard.id,
				name:lastRfcard.name,
				date:ndate}
	dbsave.st.insert(savelast);
}
