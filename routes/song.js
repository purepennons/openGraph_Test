var express = require('express');

var Tools = require('../js_modules/Tools.js');

var router = express.Router();
var tools = new Tools();
/* GET users listing. */
router.get('/:cover_id', function(req, res) {
  var options = {
	  hostname: 'api2.karaokecloud.com',
	  port: 80,
	  path: '/cover/id' + '?token=fetlbngl1jca4hqtebnmghuta25h7yemc98nvo9w8l7a4w5i9slJWEvgxVzY&cover_id=' + req.params.cover_id + '&cache=undefined',
	  method: 'GET'
	};

	tools.httpRequest(options, function(data){
		var obj = JSON.parse(data);
		if(obj.status === 'success'){
			console.log(obj.data);	
			//res.send('Success');
			res.render('song', 
				{ 
					title: 'test', 
					artisName: obj.data.song.Title
				});
		} else{
			res.send('Fail to get the song');
		}
	});
	

});



module.exports = router;
