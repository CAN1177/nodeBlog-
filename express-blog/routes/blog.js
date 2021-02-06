var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
	res.json({
		error:0,
		data: [1,23,3]
	})
});
router.get('/details', function(req, res, next) {
	res.json({
		error:0,
		data: [1,23,3]
	})
});
module.exports = router;
