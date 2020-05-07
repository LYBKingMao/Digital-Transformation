var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var session=require('express-session');
var mysql=require('mysql');
var fs=require('fs');
var nodemailer=require('nodemailer');
var tls=require('tls');
global.count=0;
global.initialarr=[];

var mailist=[              // Send to
  '',
  ''
];

var transporter=nodemailer.createTransport({
  host:"smtp.qq.com",
  port:465,
  secureConnection:true,
  auth:{
    user:'',               //your username
    pass:'',              //your password
  },
  tls:{
    secureProtocol: "TLSv1_method"
}
});

process.on('uncaughtException', function(err){                 //catch unseen error globally
  console.error(err);
});

var conn=mysql.createConnection({
  host:'localhost',
    user:'root',
    password:'root',
    database:'bji01'
});

conn.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
      maxAge:1000*60*20,
  },
}));

app.use(function(req, res, next){
  　　res.locals.user = req.session.user;
  　　var err = req.session.error;
  　　res.locals.message = '';
  　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  　　next();
  });

app.get('/', function (req, res) {
  req.session.username=null;  //delete session
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login',function(req,res){
  if(req.body.username==""||req.body.password==""){
    res.send(404);
  }else{
  conn.query('SELECT * from `user` where UserID=?', [req.body.username], function (err, result, fields) {
    var userid = JSON.parse(JSON.stringify(result[0].UserID));
    var password = JSON.parse(JSON.stringify(result[0].Password));
    if (req.body.password == password) {
      req.session.username=userid;
      res.send(200);
    } else {
      req.session.error="Invalid user";
      res.send(404);
    }
  });
}
});

app.get('/roomstatus',function(req,res){
  if(req.session.username){
    conn.query('SELECT * from `user` where UserID=?',[req.session.username],function(err,result,fields){
      conn.query('SELECT * from `Room` ',function(err,row,fields){
        var g349=JSON.parse(JSON.stringify(row[2].nine));
        var g3410=JSON.parse(JSON.stringify(row[2].ten));
        var g3411=JSON.parse(JSON.stringify(row[2].eleven));
        var g3412=JSON.parse(JSON.stringify(row[2].twelve));
        var g3413=JSON.parse(JSON.stringify(row[2].thirteen));
        var g3414=JSON.parse(JSON.stringify(row[2].fourteen));
        var g3415=JSON.parse(JSON.stringify(row[2].fifteen));
        var g3416=JSON.parse(JSON.stringify(row[2].sixteen));
        
        var g379=JSON.parse(JSON.stringify(row[3].nine));
        var g3710=JSON.parse(JSON.stringify(row[3].ten));
        var g3711=JSON.parse(JSON.stringify(row[3].eleven));
        var g3712=JSON.parse(JSON.stringify(row[3].twelve));
        var g3713=JSON.parse(JSON.stringify(row[3].thirteen));
        var g3714=JSON.parse(JSON.stringify(row[3].fourteen));
        var g3715=JSON.parse(JSON.stringify(row[3].fifteen));
        var g3716=JSON.parse(JSON.stringify(row[3].sixteen));

        var f2329=JSON.parse(JSON.stringify(row[0].nine));
        var f23210=JSON.parse(JSON.stringify(row[0].ten));
        var f23211=JSON.parse(JSON.stringify(row[0].eleven));
        var f23212=JSON.parse(JSON.stringify(row[0].twelve));
        var f23213=JSON.parse(JSON.stringify(row[0].thirteen));
        var f23214=JSON.parse(JSON.stringify(row[0].fourteen));
        var f23215=JSON.parse(JSON.stringify(row[0].fifteen));
        var f23216=JSON.parse(JSON.stringify(row[0].sixteen));

        var f2339=JSON.parse(JSON.stringify(row[1].nine));
        var f23310=JSON.parse(JSON.stringify(row[1].ten));
        var f23311=JSON.parse(JSON.stringify(row[1].eleven));
        var f23312=JSON.parse(JSON.stringify(row[1].twelve));
        var f23313=JSON.parse(JSON.stringify(row[1].thirteen));
        var f23314=JSON.parse(JSON.stringify(row[1].fourteen));
        var f23315=JSON.parse(JSON.stringify(row[1].fifteen));
        var f23316=JSON.parse(JSON.stringify(row[1].sixteen));

        var name = JSON.parse(JSON.stringify(result[0].Name));

        if (count == 0) {
          initialarr = [g349, g3410, g3411, g3412, g3413, g3414, g3415, g3416,
            g379, g3710, g3711, g3712, g3713, g3714, g3715, g3716, f2329, f23210, f23211, f23212, f23213, f23214, f23215,
            f23216, f2339, f23310, f23311, f23312, f23313, f23314, f23315, f23316];
          count++;
        } else {
          var arr = [g349, g3410, g3411, g3412, g3413, g3414, g3415, g3416,
            g379, g3710, g3711, g3712, g3713, g3714, g3715, g3716, f2329, f23210, f23211, f23212, f23213, f23214, f23215,
            f23216, f2339, f23310, f23311, f23312, f23313, f23314, f23315, f23316];
            var message=getmessage(arr);
            if(message){
              mailOpt = {
              from: '"myself" <jbb673850243@vip.qq.com>',
              to: mailist,
              subject: "Changes in room status",
              text: message,
            };
            transporter.sendMail(mailOpt, (error, info) => {
              if (error) {
                return console.log(error);
              }
            });
          }
        }
      res.render('roomstatus',{username:name,
	  g0349:g349,g03410:g3410,g03411:g3411,g03412:g3412,g03413:g3413,g03414:g3414,g03415:g3415,g03416:g3416,
	  g0379:g379,g03710:g3710,g03711:g3711,g03712:g3712,g03713:g3713,g03714:g3714,g03715:g3715,g03716:g3716,
	  f20329:f2329,f203210:f23210,f203211:f23211,f203212:f23212,f203213:f23213,f203214:f23214,f203215:f23215,f203216:f23216,
	  f20339:f2339,f203310:f23310,f203311:f23311,f203312:f23312,f203313:f23313,f203314:f23314,f203315:f23315,f203316:f23316});
    });
    });
  }else{
    res.redirect('/login');
  }
});

app.get('/heat',function(req,res){
  if(req.session.username){
    conn.query('SELECT * from `user` where UserID=?',[req.session.username],function(err,result,fields){
      var name=JSON.parse(JSON.stringify(result[0].Name));
      res.render('heat',{username:name});
    });
  }else{
    res.redirect('/login');
  }
});

app.get('/electricity',function(req,res){
  if(req.session.username){
    conn.query('SELECT * from `user` where UserID=?',[req.session.username],function(err,result,fields){
      var name=JSON.parse(JSON.stringify(result[0].Name));
      res.render('electricity',{username:name});
    });
  }else{
    res.redirect('/login');
  }
});

app.get('/occupancy',function(req,res){
  if(req.session.username){
    conn.query('SELECT * from `user` where UserID=?',[req.session.username],function(err,result,fields){
      var name=JSON.parse(JSON.stringify(result[0].Name));
      res.render('occupancy',{username:name});
    });
  }else{
    res.redirect('/login');
  }
});

app.get('/indexLogin',function(req,res){
  if(req.session.username){
    conn.query('SELECT * from `user` where UserID=?',[req.session.username],function(err,result,fields){
      var name=JSON.parse(JSON.stringify(result[0].Name));
      res.render('indexLogin',{username:name});
    });
  }else{
    res.redirect('/login');
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function getmessage(arr){
  var message=[];
  if(arr[1] != initialarr[1] || arr[2] != initialarr[2] || arr[3] != initialarr[3] || arr[4] != initialarr[4] || arr[5] != initialarr[5] || arr[6] != initialarr[6] ||
    arr[7] != initialarr[7] || arr[8] != initialarr[8]){
    message=message+"Room 0G034 status changed!\n";
  }
  if (arr[9] != initialarr[9] || arr[10] != initialarr[10] || arr[11] != initialarr[11] || arr[12] != initialarr[12] ||
    arr[13] != initialarr[13] || arr[14] != initialarr[14] || arr[15] != initialarr[15] || arr[16] != initialarr[16]) {
    message = message + "Room 0G037 status changed!\n";
  }
  if (arr[17] != initialarr[17] || arr[18] != initialarr[18] ||
    arr[19] != initialarr[19] || arr[20] != initialarr[20] || arr[21] != initialarr[21] || arr[22] != initialarr[22] ||
    arr[23] != initialarr[23] || arr[24] != initialarr[24]) {
    message = message + "Room 02032 status changed!\n";
  }
  if (arr[25] != initialarr[25] || arr[26] != initialarr[26] ||
    arr[27] != initialarr[27] || arr[28] != initialarr[28] || arr[29] != initialarr[29] || arr[30] != initialarr[30] ||
    arr[31] != initialarr[31] || arr[32] != initialarr[32]) {
    message = message + "Room 02033 status changed!\n";
  }
  initialarr = arr.concat();
  return message;
}
// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
