var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.secure);
	if(req.secure){
		res.render('index', { title: 'Express' });
	}else{
  	res.redirect(301, 'https://localhost:8888/')
	}
});

module.exports = router;
