var debug = require('debug')('myapp');
var app = require('./app');

var http = require('http'),
	https = require('https'),
	fs = require('fs');

var hskey = fs.readFileSync('hacksparrow-key.pem');
var hscert = fs.readFileSync('hacksparrow-cert.pem');

var options = {
    key: hskey,
    cert: hscert
};

app.set('port', process.env.PORT || 3000);
//app.set('sslOptions', options);

// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });

var server = http.createServer(app).listen(8080);
var httpsServer = https.createServer(options, app).listen(8888);