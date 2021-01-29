const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user')

const serverHeader = (req,res) => {
	// 返回格式
	res.setHeader('Content-Type', 'application/json');

	// 处理路径path
	const url = req.url;
  req.path = url.split("?")[0];

	//处理blog路由
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}

	// 处理user路由
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end( JSON.stringify(userData))
		return
	}


	// 未命中路由
	res.writeHead(404,{'Content-type': 'text/plain'})
	res.write('404 not found')
	res.end()

}

module.exports =serverHeader