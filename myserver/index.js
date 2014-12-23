var express=require('express')
var mongojs=require('mongojs')
var app = require('express')();
var dateFormat = require('dateformat');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var db = mongojs('my_server',['std']);
var dbsave =mongojs('my_server',['st']);
var dbtime =mongojs('my_server',['time']);

var nodemailer = require('nodemailer');

var lastRfcard = {};
var ndate = {};  
var now={};
var time={};
var savelast ={};

app.use(express.static(__dirname+'/public'));


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pattymsk@gmail.com',
        pass: 'everypatty8'
    }
});

io.emit('some event', { for: 'everyone' });

app.use(bodyParser.json())
app.get('/', function(req, res){
  res.redirect('/showrt.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/api/std',function(req,res){
	db.std.find({},function(err,data){
	res.send(data);	
	});
	
});

//for static
app.get('/api/time',function(req,res){
	dbtime.time.find({},function(err,data){
	res.send(data);
	console.log("Connect /api/time");
	});
});

app.post('/api/show',function(req,res){		
	lastRfcard=req.body
	now = new Date();
	ndate = dateFormat(now, "d/m/yyyy");
	console.log(ndate);
	savetime();
	console.log(lastRfcard);
	io.emit('sendRF', lastRfcard.name);
	io.emit('book:reflesh',lastRfcard);
	res.send(savelast)
	if(now.getHours()>8){;
		transporter.sendMail({
		    from: 'pattymsk@gmail.com',
		   	to: lastRfcard.EMAIL,
		    subject: 'Late ',
		    text: 'You are LATE'
		    
		});
		console.log("Send Mail");
	}
});


app.get('/api/findsavetime',function(req,res){
	dbsave.st.find({},function(err,savetime){
	res.send(savetime);	
	});

});


app.get('/api/show',function(req,res){
	res.send(savelast);
});

app.get('/api/main',function(req,res){
	res.redirect('/main.html');
})

app.post('/api/std',function(req,res){
    db.std.insert(req.body,function(err,docs){   //query database keep data in database
           res.send(docs);
           io.emit('std:refresh');  //broadcast to all client
      });
});


function savetime(){
	savelast ={	RFID:lastRfcard.RFID,
				ID:lastRfcard.ID,
				NAME:lastRfcard.NAME,
				DATE:ndate,
				TIME:{HOUR:now.getHours(),
					  MINUTE:now.getMinutes(),
					  SECOND:now.getSeconds()}}
	dbsave.st.insert(savelast);
}

