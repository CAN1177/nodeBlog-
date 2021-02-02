const login = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel");
const queryString = require("querystring");


const handleUserRouter = (req, res) =>{
	const method = req.method 
	if (method=="GET" && req.path=='/api/user/login') {
		const {username,password} = req.query
		let result = login(username,password)
		return result.then((data)=>{
			if(data.username) {
				//设置session
				req.session.username = data.username
				req.session.realname = data.realname
				console.log('req.session: ', req.session);
				return new SuccessModel();
			}
			return new ErrorModel("login fail");
		})
	
	}
}

module.exports = handleUserRouter