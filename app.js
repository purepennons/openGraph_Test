var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var song = require('./routes/song');

var app = express();

//listen port setting
app.set('httpPort', process.env.PORT || 3000);
app.set('httpsPort', 8888);
app.set('currentUrl', 'localhost');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// check https
app.all('*', httpsCheck);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/song', song);


//middleware
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// https check
function httpsCheck(req, res, next){
  //console.log('req.secure');
  if(req.secure){
    next();
  }else{
    //var currentURL = req.get('host') + req.originalUrl;
    //console.log(req.get('host'));
    
    //res.redirect(301, 'https://' + app.get('currentUrl') + ':' + app.get('httpsPort'));
    //return;
    next();
  }
}

// app.use(function(req, res){
//     res.status(404);
//     //res.redirect('https://' + app.get('currentUrl') + ':' + app.get('httpsPort') + 'notavailable.html');
//     return;
// });

// app.use(function(req, res){
//     res.status(500);
//     //res.redirect('https://' + app.get('currentUrl') + ':' + app.get('httpsPort') + 'notavailable.html');
//     return;
// });

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
