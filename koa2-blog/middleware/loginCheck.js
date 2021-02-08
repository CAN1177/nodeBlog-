const { ErrorModel, SuccessModel} = require('../model/resModel')
module.exports = async (ctx,next) =>{
	if (ctx.session.username) {
		await next()
		return
	}
	ctx.body=new ErrorModel('小爷，您还未登录！')
}