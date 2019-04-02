const express = require('express');
const mysql = require('mysql');
var app = express();
var server = app.listen(3000)
var io = require('socket.io').listen(server);
var http = require('http');
var host="";
var user="";
var password="";
var database = "";
var query = "";

// Create connection
// const db = mysql.createConnection({
//     host     : host,
//     user     : user,
//     password : password,
//     database : database
// });
// Connect
// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySql Connected...');
// });

// Select posts
//  app.get('/getposts', (req, res) => {
//      let sql = 'select * from usuario';
//      let query = db.query(sql, (err, results) => {
//          if(err) throw err;
//          console.log(results);
//          res.send(results);
//      });
//  });

io.on('connection', function(socket){
    console.log('Usuario conectado');
    socket.on('datos',function(data){
    host=data.ip;
    user=data.user;
    password=data.password;
    database=data.db;
    conectarseBd()
    })
    socket.on('datos2',function(data){
      sentencia = data.query;
      console.log("Query: ["+data.query+"]");
      sentenciasql();
    });

    
  });

  function conectarseBd(){
    var connection = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database  : database
    
    });
     connection2=connection
     connection2.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
        console.log('conectado con la id: ' + connection.threadId);
        
    });
   
  }


  function sentenciasql(){
    connection2.query(sentencia, function (error, results, fields, rows) {
    if (error) throw error;
    console.log(results);
    
    
    
  //   io.sockets.emit('numeroFields',fields.length)
  //   io.sockets.emit('informacion',fields)
     io.sockets.emit('resultados',results)
  //   querySelect=queryS
  //   selectFrom()
  });
}