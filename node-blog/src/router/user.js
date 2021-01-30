const loginChick = require('../controller/user')
const handleUserRouter = (req, res) =>{
	const method = req.method 

	if (method=="POST" && req.path=='/api/user/login') {
		const {userName,password} = req.body
	
	}
}

module.exports = handleUserRouter