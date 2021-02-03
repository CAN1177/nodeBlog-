const login = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel");
const {set, get} = require("../db/redis")


const handleUserRouter = (req, res) =>{
	const method = req.method 
	if (method=="POST" && req.path=='/api/user/login') {
		const {username,password} = req.body
		let result = login(username,password)
		return result.then((data)=>{
			if(data.username) {
				//设置session
				req.session.username = data.username
				req.session.realname = data.realname
				// 把session同步到redis中
				set(req.sessionId, req.session)
				console.log('req.session: ', req.session);
				return new SuccessModel();
			}
			return new ErrorModel("login fail");
		})
	
	}
}

module.exports = handleUserRouter