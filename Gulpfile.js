var gulp = require('gulp');
//params for openshift
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var liveReloadPort = 35729

// `gulp.task()` defines task that can be run calling `gulp xyz` from the command line
// The `default` task gets called when no task name is provided to Gulp

function startExpress() {
	var debug = require('debug')('ogTest');
	var app = require('./app');
	app.set('port', server_port);
	app.set('ip_address', server_ip_address);

	var server = app.listen(app.get('port'), app.get('ip_address'), function() {
	  debug('Express server listening on port ' + server.address().port);
	});
}

var lr;
function startLivereload() { 
  lr = require('tiny-lr')();
  lr.listen(35729);
}


gulp.task('default', function () {
  console.log('Gulp and running!')
  startExpress();
  startLivereload();
});
