function Tools(){
	var http = require('http');

	//ajax function 
	this.httpRequest = function(options, cb){
		var req = http.request(options, function(res){
			var recData = '';
			res.setEncoding('utf8');
		  
		  //receive data by chunk
		  res.on('data', function (chunk) {
		  	recData += chunk;
		  });

		  //wait all data to be received
		  res.on('end', function(){
		  	cb(recData);
		  }); 

		});
		
		req.on('error', function(e) {
	  	console.log('problem with request: ' + e.message);
		});

		req.end();
	}

}

module.exports = Tools;