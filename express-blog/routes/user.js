var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {

	// 这里直接能拿到数据是因为app.js中app.use(express.json())的处理
	const { username, password } = req.body;

	res.json({
		error:0,
		data: [{
			username, password
		}]
	})
});
module.exports = router;
