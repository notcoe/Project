//server

var express = require('express')
var mongojs = require('mongojs')     //incliude mongojs
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = mongojs('my_server',['book']);   //connect database

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/book',function(reg,res){      //sent data from server to app.js (pass docs) 

      db.book.find({},function(err,docs){   //query database
           res.send(docs);
 
      });     
})

var sockets = [];
app.post('/api/book',function(req,res){
    db.book.insert(req.body,function(err,docs){   //query database keep data in database
           res.send(docs);
           io.emit('book:refresh');  //broadcast to all client
      });
});

  
io.on('connection',function(socket){           //cleint connect into come will this work
      console.log('a user connected');

}); 

http.listen(3000,function(){
     console.log("server is running")

})

